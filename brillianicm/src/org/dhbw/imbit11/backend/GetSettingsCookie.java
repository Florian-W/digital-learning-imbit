package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.annotation.WebServlet;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import javax.servlet.http.Cookie;

@WebServlet({"/GetSettingsCookie"})

/**
 * After the User logs in he will recieve cookies for the global settings
 * @author Oliver B.
 *
 */
 public class GetSettingsCookie extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /**
     * Invokes the constructor of parent class (superclass) javax.servlet.http.HttpServlet
     */
	public GetSettingsCookie() {
		super();
	}   	
	
	/**
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}  	
	
	/**
	 *function asks for parameters from database
	 *creates a new userrealm, and requests from database
	 *database owns a table for settings only
	 *Attributes are stored in cookies and will be handled later
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	
		
		String url="/login.jsp";		
				
			//TODO: Validate and catch Integer to String conversion #403
			Boolean audio;
			Boolean video;
			Boolean tts;
			Boolean subtitles;
			UserRealm realm = new UserRealm();
			String a;
			String b;
			String c;
			String d;
			
			
			try{ 
				ArrayList<Boolean> settings = realm.getSettings();

				audio = settings.get(0);
				video = settings.get(1);
				tts = settings.get(2);
				subtitles = settings.get(3);
				
				if (audio) {
					a="true";
				} else { a="false";}
				
				if (video) {
					b="true";
				} else { b="false";}
				
				if (tts) {
					c="true";
				} else { c="false";}
				
				if (subtitles) {
					d="true";
				} else { d="false";}
				
				
				Cookie audioSettings = new Cookie("audio", a);
				Cookie videoSettings = new Cookie("video", b);
				Cookie ttsSettings = new Cookie("tts", c);
				Cookie subtitlesSettings = new Cookie("subtitles", d);
				
				audioSettings.setMaxAge(12 * 60 * 60);  // 12 hours. 
				videoSettings.setMaxAge(12 * 60 * 60);  // 12 hours. 
				ttsSettings.setMaxAge(12 * 60 * 60);  // 12 hours. 
				subtitlesSettings.setMaxAge(12 * 60 * 60);  // 12 hours. 


				response.addCookie(audioSettings);
				response.addCookie(videoSettings);
				response.addCookie(ttsSettings);
				response.addCookie(subtitlesSettings);
			
				}
			catch(SQLException e){
				e.printStackTrace();
			
			}
		
	}
}