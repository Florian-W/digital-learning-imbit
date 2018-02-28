package org.dhbw.imbit11.backend;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.io.ByteArrayOutputStream;
import java.sql.SQLException;
import java.util.Date;

import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.servlet.http.HttpServlet;

public class JSONCreator extends HttpServlet {

	public static ByteArrayOutputStream createAssertion(String recipient, String badge) throws SQLException {
	
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

		Map<String, Object> config = new HashMap<String, Object>();
        config.put("javax.json.stream.JsonGenerator.prettyPrinting", Boolean.valueOf(true));
		JsonBuilderFactory factory = Json.createBuilderFactory(config);	

		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		
		String current_date = dateFormatter.format(date);
		
		
		//String today = DateFormat.format(new SimpleDateFormat("yyyy-MM-dd"));

	
		JsonObject assertion = factory.createObjectBuilder()
			.add("uid", getAssertionId())
			.add("recipient", recipient)
//			.add("image", image)
			.add("issuedOn", current_date)
			.add("badge", factory.createObjectBuilder()
				.add("name", getBadgeClassInfo(badge[0]))
				.add("image", getBadgeClassInfo(badge))
				.add("description", getBadgeClassInfo(badge))
				.add("criteria", getBadgeClassInfo(badge))
					)
			.add("verify", factory.createObjectBuilder()
				.add("url", "")
				.add("type", "signed"))
			.build();
		String assertionString = assertion.toString();

		printc(outputStream, assertionString);

		return outputStream;
	}
	


	//Database query for defining the UID of the new Badge
	public static int getAssertionId() throws SQLException {

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

	private static String[] getBadgeClassInfo(String badge) {
		String[] info = null;
		switch(badge){
			case "Brazil": 	
				info[0] = "brillianICM Brazil";
				info[1] = "http//:link_image_brazil";
				info[2] = "Successful completion of the ICM Brazil serious game";
				info[3] = "http//:link_criteria_page";
			case "Spain":	
				info[0] = "brillianICM Spain";
				info[1] = "http//:link_image_spain";
				info[2] = "Successful completion of the ICM Spain serious game";
				info[3] = "http//:link_criteria_page";
			case "China": 	
				info[0] = "brillianICM China";
				info[1] = "http//:link_image_china";
				info[2] = "Successful completion of the ICM China serious game";
				info[3] = "http//:link_criteria_page";
			case "USA":	
				info[0] = "brillianICM USA";
				info[1] = "http//:link_image_usa";
				info[2] = "Successful completion of the ICM USA serious game";
				info[3] = "http//:link_criteria_page";
			case "Sweden": 	
				info[0] = "brillianICM Sweden";
				info[1] = "http//:link_image_sweden";
				info[2] = "Successful completion of the ICM Sweden serious game";
				info[3] = "http//:link_criteria_page";
			case "India":	
				info[0] = "brillianICM India";
				info[1] = "http//:link_image_india";
				info[2] = "Successful completion of the ICM India serious game";
				info[3] = "http//:link_criteria_page";
			case "Germany": 	
				info[0] = "brillianICM Germany";
				info[1] = "http//:link_image_germany";
				info[2] = "Successful completion of the ICM Germany serious game";
				info[3] = "http//:link_criteria_page";
			case "Turkey":	
				info[0] = "brillianICM Turkey";
				info[1] = "http//:link_image_turkey";
				info[2] = "Successful completion of the ICM Turkey serious game";
				info[3] = "http//:link_criteria_page";
			case "Australia":	
				info[0] = "brillianICM Australia";
				info[1] = "http//:link_image_australia";
				info[2] = "Successful completion of the ICM Australia serious game";
				info[3] = "http//:link_criteria_page";
			default:
				info[0] = "brillianICM";
				info[1] = "http//:link_image";
				info[2] = "Successful completion of the ICM serious game";
				info[3] = "http//:link_criteria_page";
		}
		return info;
	}
	
}