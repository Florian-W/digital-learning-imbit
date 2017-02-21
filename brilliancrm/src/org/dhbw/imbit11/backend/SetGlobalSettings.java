package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.sql.SQLException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet({"/SetGlobalSettings"})

/**
 * This class is opened, when admin wants to change global settings. 
 * @author Oliver B.
 * @param boolean audio
 * @param boolean video
 * @param boolean tts
 * @param boolean subtitles
 */
 public class SetGlobalSettings extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /**
     * Invokes the constructor of parent class (superclass) javax.servlet.http.HttpServlet
     */
	public SetGlobalSettings() {
		super();
	}   	
	
	/**
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}  	
	
	/**
	 *function asks for parameters from admin homepage
	 *creates a new userrealm, and writes to database
	 *database owns a table for settings only
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	
		
		String url="/backend/homepage_admin.jsp";		
				
			//TODO: Validate and catch Integer to String conversion #403
		String a = request.getParameter("audio");
		String b = request.getParameter("video");
		String c = request.getParameter("tts");
		String d = request.getParameter("subtitles");
		Boolean audio=false; 
		Boolean video=false; 
		Boolean tts=false; 			
		Boolean subtitles=false;

		if ("true".equals(a)){
			audio = true;
		} else { audio = false;}
		
		if ("true".equals(b)){
			video = true;
		} else { video = false;}
		
		if ("true".equals(c)){
			tts = true;
		} else { tts = false;}
		
		if ("true".equals(d)){
			subtitles = true;
		} else { subtitles = false;}
			  
			UserRealm realm = new UserRealm();
			
			try{ 
				// ArrayList<Boolean> settings = realm.getSettings();
				
				realm.setSettings(audio, video, tts, subtitles);	
				
				request.setAttribute("status", "Progress set.");
				}
			catch(SQLException e){
				e.printStackTrace();
			
			}
		
		
	    // forward the request and response to the view
        RequestDispatcher dispatcher =
             getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);
		
	}
	
}