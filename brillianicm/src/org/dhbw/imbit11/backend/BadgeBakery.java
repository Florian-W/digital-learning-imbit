package org.dhbw.imbit11.backend;

import javax.servlet.http.HttpServlet;

public class BadgeBakery extends HttpServlet {

	public static bakeBadge(String useremail, String country) {

	}

	private static String transformSVGToString(country) {
		FileReader svgReader = new FileReader();
		String svgString = "";
		switch (country){
			case "Brazil": 
				svgReader.setOrigin("Origin SVG Brazil");
				svgString = svgReader.toString();
				break;
			case "Spain": 
				svgReader.setOrigin("Origin SVG Spain");
				svgString = svgReader.toString();
				break;
			case "China": 
				svgReader.setOrigin("Origin SVG China");
				svgString = svgReader.toString();
				break;
			case "USA": 
				svgReader.setOrigin("Origin SVG USA");
				svgString = svgReader.toString();
				break;
			case "Sweden": 
				svgReader.setOrigin("Origin SVG Sweden");
				svgString = svgReader.toString();
				break;
			case "India": 
				svgReader.setOrigin("Origin SVG India");
				svgString = svgReader.toString();
				break;
			case "Germany": 
				svgReader.setOrigin("Origin SVG Germany");
				svgString = svgReader.toString();
				break;	
			case "Turkey": 
				svgReader.setOrigin("Origin SVG Turkey");
				svgString = svgReader.toString();
				break;
			case "Australia": 
				svgReader.setOrigin("Origin SVG Australia");
				svgString = svgReader.toString();
				break;
		}
		return svgString;
	}

}