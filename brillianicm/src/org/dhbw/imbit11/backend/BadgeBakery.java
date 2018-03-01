package org.dhbw.imbit11.backend;

import javax.servlet.http.HttpServlet;
import java.io.ByteArrayOutputStream;
import java.io.FileReader;


public class BadgeBakery extends HttpServlet {

	public static ByteArrayOutputStream bakeBadge(String useremail, String country) {

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

		String SVG = getSVGString(country);

		printc(outputStream, badgeString);
		return outputStream;

	}

	private static String getSVGString(country) {
		String fileLocation = "";
		switch (country){
			case "Brazil": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/...badge_brazil.svg";
				svgString = svgReader.toString();
				break;
			case "Spain": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/...badge_spain.svg";
				svgString = svgReader.toString();
				break;
			case "China": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/...badge_china.svg";
				svgString = svgReader.toString();
				break;
			case "USA": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/...badge_USA.svg";
				svgString = svgReader.toString();
				break;
			case "Sweden": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/...badge_sweden.svg";
				svgString = svgReader.toString();
				break;
			case "India": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/...badge_india.svg";
				svgString = svgReader.toString();
				break;
			case "Germany": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/...badge_germany.svg";
				svgString = svgReader.toString();
				break;	
			case "Turkey": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/...badge_turkey.svg";
				svgString = svgReader.toString();
				break;
			case "Australia": 
				fileLocation = "/etc/opt/tomcat/webapps/brillianICM/WebContent/...badge_australia.svg";
				svgString = svgReader.toString();
				break;
		}
		FileReader svgReader = new FileReader(fileLocation);
		return svgReader.toString();
	}

	//Adding to the ByteArrayOutputStream
	private static void printc(ByteArrayOutputStream os, String text){
		for (int i=0; i<text.length(); i++){
			int toWrite = (byte) text.charAt(i);
			os.write(toWrite);
		}

	}

}