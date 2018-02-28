package org.dhbw.imbit11.backend;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;

public class JSONCreator extends HttpServlet {

	public static String createAssertion(String recipient, String badge) {
	
	JsonBuilderFactory factory = Json.createBuilderFactory(config);	

	String today = dateFormat.fromat(new SimpleDateFormat("yyyy-MM-dd"));

	
	String assertion = factory.createObjectBuilder()
		.add("uid", getAssertionId())
		.add("recipient", recipient)
//		.add("image", image)
		.add("issuedOn", today)
		.add("badge", badge)
//		.add("verify", factory.createObjectBuilder()
//			.add("type", "hosted")
//			.add("url", ""))
		.build()
		.toString();

		return assertion;
	}
	


	//Database query for defining the UID of the new Badge
	public static int getAssertionId() {

		UserRealm userRealm = new UserRealm();
		return userRealm.getBadgeAssertionID(); 

	}

}