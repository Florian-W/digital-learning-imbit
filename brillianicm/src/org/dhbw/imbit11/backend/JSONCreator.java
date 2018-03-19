package org.dhbw.imbit11.backend;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.sql.SQLException;
import java.util.Date;

import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.servlet.http.HttpServlet;


/**
 * Main openBadge class
 * Gets issuer info from the database, gets badge data, creates JSON assertion data
 * @author imbit15c
 * @date 1.3.2018
 * 
 */

public class JSONCreator extends HttpServlet {

	public static String createAssertion(String recipient, String badge) throws SQLException {
	
		UserRealm userRealm = new UserRealm();
		Map<String, Object> config = new HashMap<String, Object>();

        config.put("javax.json.stream.JsonGenerator.prettyPrinting", Boolean.valueOf(true));
		JsonBuilderFactory factory = Json.createBuilderFactory(config);	

		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		
		String current_date = dateFormatter.format(date);
		String[] info = getBadgeClassInfo(badge);
		int group = Integer.parseInt(userRealm.getUserGroupByEmail(recipient));
		String[] issuer_info = userRealm.getIssuerInfo(group);
		
		String badge_id = String.valueOf(getAssertionId());
	
		JsonObject assertion = factory.createObjectBuilder()
			.add("uid", badge_id)
			.add("recipient", recipient)
			.add("issuedOn", current_date)
			.add("badge", factory.createObjectBuilder()
				.add("name", info[0])
				.add("image", info[1])
				.add("description", info[2])
				.add("criteria", info[3])
				.add("issuer", factory.createObjectBuilder()
//					.add("org", "DHBW Mannheim")
					.add("name", issuer_info[0]) //"org" in database, change to "name"?
//					.add("description", "DHBW Mannheim - International Management for Business and Information Technology")
					.add("description", issuer_info[1])
//					.add("url", "http://www.imbit.dhbw-mannheim.de/")
					.add("url", issuer_info[2])
					.add("origin", "http://www.brilianICM.com")
				)
			)
			.add("verify", factory.createObjectBuilder()
				.add("url", "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/badges/public-key-badges.pem")
				//.add("type", "signed")
				.add("type", "hosted")
			)
			.build();
		String assertionString = assertion.toString();
		userRealm.newBadge(badge_id, recipient, current_date, info[1]);
		return assertionString;
	}

	//Database query for defining the UID of the new Badge
	public static int getAssertionId() throws SQLException {

		UserRealm userRealm = new UserRealm();
		return userRealm.getBadgeAssertionID(); 

	}

	private static String[] getBadgeClassInfo(String badge) {
		String[] info = new String[4];

		switch(badge){
			case "Brazil": 	
				info[0] = "brillianICM Brazil";
				info[1] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badge_brazil.svg";
				info[2] = "Successful completion of the ICM Brazil serious game";
				info[3] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badgeCriteriaTable.html";
				break;
			case "Spain":	
				info[0] = "brillianICM Spain";
				info[1] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badge_spain.svg";
				info[2] = "Successful completion of the ICM Spain serious game";
				info[3] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badgeCriteriaTable.html";
				break;
			case "China": 	
				info[0] = "brillianICM China";
				info[1] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badge_china.svg";
				info[2] = "Successful completion of the ICM China serious game";
				info[3] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badgeCriteriaTable.html";
				break;
			case "USA":	
				info[0] = "brillianICM USA";
				info[1] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badge_usa.svg";
				info[2] = "Successful completion of the ICM USA serious game";
				info[3] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badgeCriteriaTable.html";
				break;
			case "Sweden": 	
				info[0] = "brillianICM Sweden";
				info[1] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badge_sweden.svg";
				info[2] = "Successful completion of the ICM Sweden serious game";
				info[3] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badgeCriteriaTable.html";
				break;
			case "India":	
				info[0] = "brillianICM India";
				info[1] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badge_india.svg";
				info[2] = "Successful completion of the ICM India serious game";
				info[3] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badgeCriteriaTable.html";
				break;
			case "Germany": 	
				info[0] = "brillianICM Germany";
				info[1] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badge_germany.svg";
				info[2] = "Successful completion of the ICM Germany serious game";
				info[3] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badgeCriteriaTable.html";
				break;
			case "Turkey":	
				info[0] = "brillianICM Turkey";
				info[1] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badge_turkey.svg";
				info[2] = "Successful completion of the ICM Turkey serious game";
				info[3] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badgeCriteriaTable.html";
				break;
			case "Australia":	
				info[0] = "brillianICM Australia";
				info[1] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badge_australia.svg";
				info[2] = "Successful completion of the ICM Australia serious game";
				info[3] = "http://ec2-52-14-250-138.us-east-2.compute.amazonaws.com:8080/brillianICM/img/badges/badgeCriteriaTable.html";
				break;
			default:
				info[0] = "brillianICM";
				info[1] = "http//:link_image";
				info[2] = "Successful completion of the ICM serious game";
				info[3] = "http//:link_criteria_page";
				break;
		}
		return info;
	}
}