
package org.dhbw.imbit11;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dhbw.imbit11.backend.UserRealm;

import java.sql.SQLException;
import java.util.ArrayList;

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

		EventExtractor eventExtractor = new EventExtractor();
		if(type.equals("node")){			
			data = eventExtractor.getNode(id);
		}else if(type.equals("loadGame")){
			UserRealm userRealm = new UserRealm();
			try {	
				list = userRealm.getUserProgress(userid);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}else if(type.equals("saveGame")){
			UserRealm userRealm = new UserRealm();
			try {
				userRealm.setUserProgress(userid, imcost, imqual, imtime, gamePath);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}else if(type.equals("inbox")){		
			data = eventExtractor.getMails(gamePath);	
		}else if(type.equals("sent")){
			//mailDrafts = eventExtractor.getMailDrafts(gamePath);
		}	
		
		if(type.equals("loadGame")){
			response.getWriter().print(list);			
		}else{
			response.getWriter().print(data);
		}
	}
}
