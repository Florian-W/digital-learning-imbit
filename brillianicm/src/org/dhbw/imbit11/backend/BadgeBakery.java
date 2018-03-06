package org.dhbw.imbit11.backend;

import javax.servlet.http.HttpServlet;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.SQLException;


public class BadgeBakery extends HttpServlet {

	public static ByteArrayOutputStream bakeBadge(String useremail, String country) throws IOException, SQLException {

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

		String svgLocation = getSVGString(country);
		
		FileReader svgFile = new FileReader(svgLocation);
		BufferedReader svgReader = new BufferedReader(svgFile);
		int stop = 0;
		String svgString = "";
		while(stop == 0) {
			svgString = svgString + svgReader.readLine();
			System.out.println(svgString);
			if(svgString.contains("</svg>")) {
				stop = 1;
			}
		}
//		String svgString = svgFile.toString();
//		svgFile.close();
//		svgString.replace("<![CDATA[", "<![CDATA[" + JSONCreator.createAssertion(useremail, country));
		svgString.replace("CDATA", "TESTREPLACE");
		System.out.println(svgString);
		svgFile.close();
		printc(outputStream, svgString);
		return outputStream;

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