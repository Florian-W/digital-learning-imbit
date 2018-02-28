package org.dhbw.imbit11.backend;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;

public class JSONCreator extends HttpServlet {

	public static ByteArrayOutputStream createAssertion(String recipient, String badge) {
	
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

		JsonBuilderFactory factory = Json.createBuilderFactory(config);	

		String today = dateFormat.fromat(new SimpleDateFormat("yyyy-MM-dd"));

	
		JsonObject assertion = factory.createObjectBuilder()
			.add("uid", getAssertionId())
			.add("recipient", recipient)
//			.add("image", image)
			.add("issuedOn", today)
			.add("badge", getBadgeClassURL(badge))
			.add("verify", factory.createObjectBuilder()
				.add("url", "")
				.add("type", "signed"))
			.build();
		String assertionString = assertion.toString();

		printc(outputStream, assertionString);

		return outputStream;
	}
	


	//Database query for defining the UID of the new Badge
	public static int getAssertionId() {

		UserRealm userRealm = new UserRealm();
		return userRealm.getBadgeAssertionID(); 

	}

	//Adding to the ByteArrayOutputStream
	private static void printc(ByteArrayOutputStream os, String text){
		for (int i=0; i<text.length(); i++){
			int toWrite = (byte) text.charAt(i);
			os.write(toWrite);
		}

	}

	private static String getBadgeClassURL(String badge) {
		switch(badge){
			case "Brazil": 	
				return "URL_Brazil_badge_class";
				break;
			case "Spain":	
				return "URL_Spain_badge_class";
				break;
			case "China": 	
				return "URL_Brazil_badge_class";
				break;
			case "USA":	
				return "URL_Spain_badge_class";
				break;
			case "Sweden": 	
				return "URL_Brazil_badge_class";
				break;
			case "India":	
				return "URL_Spain_badge_class";
				break;
			case "Germany": 	
				return "URL_Brazil_badge_class";
				break;
			case "Turkey":	
				return "URL_Spain_badge_class";
				break;
			case "Australia":	
				return "URL_Spain_badge_class";
				break;
			default: 
				return "";
				break;
		}
	}


}