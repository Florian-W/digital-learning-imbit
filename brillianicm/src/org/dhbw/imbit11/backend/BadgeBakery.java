package org.dhbw.imbit11.backend;

import javax.servlet.http.HttpServlet;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.*;

/**
 * openBadges
 * Class for baking and signing the badge .svg-files
 * @author imbit15c
 * @date 1.3.2018
 *
 */

public class BadgeBakery extends HttpServlet {
	
	public static byte[] bakeBadge(String useremail, String country) throws IOException, SQLException {
		ArrayList<String> lines = new ArrayList<String>();
		String line = null;
		String svgLocation = getSVGString(country);
		File svgFile = new File("/opt/tomcat/webapps/brillianICM/img/badges/tmp_badge.svg");
		try {
			FileReader svgFileReader = new FileReader(svgLocation);
			BufferedReader svgReader = new BufferedReader(svgFileReader);
			while ((line = svgReader.readLine()) != null) {
				if (line.contains("<![CDATA["))
//					line = line.replace("<![CDATA[", "<![CDATA[" + JSONCreator.createAssertion(useremail, country)); //created assertion without signing
					line = line.replace("<![CDATA[", "<![CDATA[" + signBadge(JSONCreator.createAssertion(useremail, country)));
				lines.add(line);
			}
			svgFileReader.close();
			svgReader.close();

			FileWriter svgFileWriter = new FileWriter(svgFile);
			BufferedWriter svgWriter = new BufferedWriter(svgFileWriter);
			for (String s : lines) {
				svgWriter.write(s);
			}
			svgWriter.flush();
			svgWriter.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		byte[] svgBytes = new byte[(int) svgFile.length()];
		try {
			FileInputStream fileInputStream = new FileInputStream(svgFile);
			fileInputStream.read(svgBytes);
//			fileInputStream.close();
		} catch (FileNotFoundException e) {
			System.out.println("File not found.");
			System.out.println("Attempting to read from file in (absolute Path): "+svgFile.getAbsolutePath());
		} catch (IOException e1) {
			System.out.println("Error reading the file.");
		}
		svgFile.delete();
		return svgBytes;
	}

	private static String getSVGString(String country) {
		String fileLocation = "";
		switch (country) {
		case "Brazil":
			fileLocation = "/opt/tomcat/webapps/brillianICM/img/badges/badge_brazil.svg";
			break;
		case "Spain":
			fileLocation = "/opt/tomcat/webapps/brillianICM/img/badges/badge_spain.svg";
			break;
		case "China":
			fileLocation = "/opt/tomcat/webapps/brillianICM/img/badges/badge_china.svg";
			break;
		case "USA":
			fileLocation = "/opt/tomcat/webapps/brillianICM/img/badges/badge_USA.svg";
			break;
		case "Sweden":
			fileLocation = "/opt/tomcat/webapps/brillianICM/img/badges/badge_sweden.svg";
			break;
		case "India":
			fileLocation = "/opt/tomcat/webapps/brillianICM/img/badges/badge_india.svg";
			break;
		case "Germany":
			fileLocation = "/opt/tomcat/webapps/brillianICM/img/badges/badge_germany.svg";
			break;
		case "Turkey":
			fileLocation = "/opt/tomcat/webapps/brillianICM/img/badges/badge_turkey.svg";
			break;
		case "Australia":
			fileLocation = "/opt/tomcat/webapps/brillianICM/img/badges/badge_australia.svg";
			break;
		}
		return fileLocation;

	}

	private static String signBadge(String assertion) throws NoSuchAlgorithmException, IOException, InvalidKeySpecException, JOSEException {

		// reading private key. Insert location of file on server here
		File privKeyFile = new File("/opt/tomcat/keys/rsapriv.der");


		// read private key DER file
		DataInputStream dis = new DataInputStream(new FileInputStream(privKeyFile));
		byte[] privKeyBytes = new byte[(int) privKeyFile.length()];
		dis.read(privKeyBytes);
		dis.close();
		KeyFactory keyFactory = KeyFactory.getInstance("RSA");

		// decode private key
		PKCS8EncodedKeySpec privSpec = new PKCS8EncodedKeySpec(privKeyBytes);
		RSAPrivateKey privKey = (RSAPrivateKey) keyFactory.generatePrivate(privSpec);

		// Create RSA-signer with the private key
		JWSSigner signer = new RSASSASigner(privKey);

		// Prepare JWS object with simple string as payload
		JWSObject jwsObject = new JWSObject(new JWSHeader.Builder(JWSAlgorithm.RS256).keyID("123").build(),
				new Payload(assertion));

		// Compute the RSA signature
		jwsObject.sign(signer);

		// To serialize to compact form, produces something like
		// eyJhbGciOiJSUzI1NiJ9.SW4gUlNBIHdlIHRydXN0IQ.IRMQENi4nJyp4er2LmZq3ivwoAjqa1uUkSBKFIX7ATndFF5ivnokXZc8u0A
		System.out.println("Signed Badge");
		return jwsObject.serialize();
	}
}