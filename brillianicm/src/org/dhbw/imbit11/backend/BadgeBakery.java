package org.dhbw.imbit11.backend;

import javax.servlet.http.HttpServlet;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;


public class BadgeBakery extends HttpServlet {
	public static byte[] bakeBadge(String useremail, String country) throws IOException, SQLException {
		ArrayList<String> lines = new ArrayList<String>();
	    String line = null;
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		String svgLocation = getSVGString(country);
		File svgFile = new File("tmp_badge.svg");
		try {
			FileReader svgFileReader = new FileReader(svgLocation);
			BufferedReader svgReader = new BufferedReader(svgFileReader);
			while ((line = svgReader.readLine()) != null) {
                if (line.contains("<![CDATA["))
                    line = line.replace("<![CDATA[", "<![CDATA[" + JSONCreator.createAssertion(useremail, country));
                lines.add(line);
            }
            svgFileReader.close();
            svgReader.close();
            
            FileWriter svgFileWriter = new FileWriter(svgFile);
            BufferedWriter svgWriter = new BufferedWriter(svgFileWriter);
            for(String s : lines) {
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
			/*
			for (int i = 0; i < svgBytes.length; i++) {
				System.out.print((char)svgBytes[i]);
			}
			*/
		} catch (FileNotFoundException e) {
			System.out.println("File not found.");
		} catch (IOException e1) {
			System.out.println("Error reading the file.");
		}
		svgFile.delete();
		return svgBytes;
    }

	private static String getSVGString(String country) {
		String fileLocation = "";
		switch (country){
			case "Brazil": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/img/badges/badge_brazil.svg";
				break;
			case "Spain": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/img/badges/badge_spain.svg";
				break;
			case "China": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/img/badges/badge_china.svg";
				break;
			case "USA": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/img/badges/badge_USA.svg";
				break;
			case "Sweden": 
				fileLocation = "badge_sweden.svg";
				break;
			case "India": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/img/badges/badge_india.svg";
				break;
			case "Germany": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/img/badges/badge_germany.svg";
				break;	
			case "Turkey": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/img/badges/badge_turkey.svg";
				break;
			case "Australia": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/img/badges/badge_australia.svg";
				break;
		}
		return fileLocation;

	}

//	Adding to the ByteArrayOutputStream
	private static void printc(ByteArrayOutputStream os, String text){
		for (int i=0; i<text.length(); i++){
			int toWrite = (byte) text.charAt(i);
			os.write(toWrite);
		}

	}

}