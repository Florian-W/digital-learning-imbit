package org.dhbw.imbit11.backend;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;

public class JSONCreator extends HttpServlet {

	public static jsonObject createAssertion(String recipient, String badge) {
	
	JsonBuilderFactory factory = Json.createBuilderFactory(config);	

	DateFormat today = new SimpleDateFormat("yyyy-MM-dd");
	
	JsonObject assertion = factory.createObjectBuilder()
		.add("uid", getAssertionId())
		.add("recipient", recipient)
//		.add("image", image)
		.add("issuedOn", today)
		.add("badge", badge)
//		.add("verify", factory.createObjectBuilder()
//			.add("type", "hosted")
//			.add("url", ""))
		.build();

		return assertion;
	}
	


	//Database query for defining the UID of the new Badge
	public static int getAssertionId() {

		UserRealm userRealm = new UserRealm();
		return userRealm.getBadgeAssertionID(); 

	}

}