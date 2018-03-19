package org.dhbw.imbit11;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dhbw.imbit11.backend.MailClient;
import org.dhbw.imbit11.backend.UserRealm;

@WebServlet({ "/Event", "/event.xml" })

/**
 * @author Erik
 * Servlet implementation class Event
 * Gets the request front-end, calls the	
 * EventExtractor and sends the answer to the front end
 * 
 */

public class Event extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Event() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 * Java Class which enables the WebUI to communicate with Nodes, User Settings and E-Mail Game events
	 * first of all all different parameters from the request are saved into dedicated variables. Currently this happens for all types if Events
	 * 
	 * Second an action is called based on the specified event
	 * 1. node - loads data EventExtractor for a specified node
	 * 2. loadGame - loads a list of the user progress
	 * 3. saveGame - saves the user progress based on the params provided
	 * 4. inbox - loads a data EventExtractor E-Mail
	 * 5. sent - currently does nothing
	 *  
	 * @throws IOException Input Output Error
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		//accept POST variables from UI and return xml of node
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		String id = request.getParameter("id");
		String userid = request.getParameter("userid");
		//TODO get parameters only if needed (safe only ?) #339
		int imtime = request.getParameter("imtime") == null ? 0 : Integer.parseInt(request.getParameter("imtime"));
		int imcost = request.getParameter("imcost") == null ? 0 : Integer.parseInt(request.getParameter("imcost"));
		int imqual = request.getParameter("imqual") == null ? 0 : Integer.parseInt(request.getParameter("imqual"));
		String gamePath = request.getParameter("gamePath");
		String type = request.getParameter("type");
		
		String data = "";
		ArrayList<Object> list = null;

		switch (type){
			case "node": data = new EventExtractor().getNode(id, userid); break;
			case "saveGame":{
				UserRealm userRealm = new UserRealm();
				try {
					userRealm.setUserProgress(userid, imcost, imqual, imtime, gamePath);
					userRealm.setUserCountry(userid, gamePath);
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
				break;
			}
			case "inbox": data = new EventExtractor().getMails(gamePath);break;
			case "sent": //mailDrafts = eventExtractor.getMailDrafts(gamePath);break;
			case "loadGame": {
				UserRealm userRealm = new UserRealm();
				try {
					list = userRealm.getUserProgress(userid);
					data = list.toString();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				break;
			}
			/*
			 * Philipp K.
			 * 5.3.16
			 * Added Cases that handles the certification sending and resets the KPI to 0
			 * 
			 * 1.3.18 also used for openBadge sending
			 */
			
			case "sendCertificate": {
				/*
				 * System.out.println("Space forcertifcate sendges ");
				 */
				UserRealm userRealm = new UserRealm();
				MailClient mailclient = new MailClient();
				try{
					String email = userRealm.getUserEmailByID(userid);
					list = userRealm.getUserProgress(userid);
					String lastName =  (String) list.get(0);
					String firstName = (String) list.get(1);
					imcost = (int) list.get(3);
					imqual = (int) list.get(4);
					imtime = (int) list.get(5);
					
					String path = (String) list.get(6);
					String[] arr = path.split(";");
					String countryevent = arr[arr.length-2];
					char countryID = countryevent.charAt(1);
					String country;
					switch (countryID){
						case '1': { country = "Brazil"; break;}
						case '2': { country = "Spain"; break;}
						case '3': { country = "China"; break;}
						case '4': { country = "USA"; break;}
						case '5': { country = "Sweden"; break;}
						case '6': { country = "India"; break;}
						case '7': { country = "Germany"; break;}
						case '8': { country = "Turkey"; break;}
						case '9': { country = "Australia"; break;}
						default:{ country = ""; break;}
					}
					
					String username= firstName + " " + lastName; 
					
					mailclient.sendCertificateMail(username, email, imcost, imqual, imtime, country, request);
					//userRealm.resetUserProgress(email);
				
					
				}catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				break;
			}
			/*
			 * Philipp K.
			 * 5.3.16
			 * Added Cases that returns the email of the User with the given ID 
			 */
			case "getEmail": {
				UserRealm userRealm = new UserRealm();
				try {
					data += userRealm.getUserEmailByID(userid);
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				break;
			}
			/*
			 * Philipp K.
			 * 6.3.16
			 * Added Cases that returns the global settings to the request 
			 */
			case "getSettings": {
				UserRealm userRealm = new UserRealm();
				try {
					ArrayList<Boolean> settings = userRealm.getSettings();
					data = settings.toString();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				break;
			}
			/*
			 * Philipp K.
			 * 6.3.16
			 * Added Cases that returns the certificate settings for the users group 
			 */
			case "getCertificateSettings": {
				UserRealm userRealm = new UserRealm();
				try {
					String group_id = userRealm.getUserGroupByID(userid);
					String certificate = userRealm.getCertificate(group_id);
					data = certificate;
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				break;
			}
			case "resetUserProgress": {
				UserRealm userRealm = new UserRealm();
				try {
					String email = userRealm.getUserEmailByID(userid);
					userRealm.resetUserProgress(email);
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				break;
			}
			default: response.sendError(HttpServletResponse.SC_NOT_FOUND);
		}
		response.getWriter().print(data);
	}
}
