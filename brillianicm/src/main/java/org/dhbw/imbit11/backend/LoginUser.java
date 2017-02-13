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
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import javax.servlet.http.Cookie;

@WebServlet({ "/LoginUser" })

/**
 * 
 * @author geitling
 * 
 * Class contains doGet and doPost methods: compares credentials entered by user with credentials in securityDB (inishiro)
 * and sets exceptions.  
 */
public class LoginUser extends javax.servlet.http.HttpServlet implements
		javax.servlet.Servlet {
	static final long serialVersionUID = 1L;

	/**
	 * invokes constructor of parent class (superclass): javax.servlet.http.HttpServlet
	 */
	public LoginUser() {
		super();
	}

	
	/**
	 * @param request - contains client request
	 * @param response - contains servlet response to clients request
	 * @exception IOException - throws error when IO exception occures
	 * 
	 * Client request is directed to the path saved in dispatcher object. Path directs to login
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		String url = "/login.jsp";
		RequestDispatcher dispatcher = getServletContext()
				.getRequestDispatcher(url);

		dispatcher.forward(request, response);
	}

	/**
	 * @param request - contains client request
	 * @param response - contains servlet response to clients request
	 * @exception IOException - throws error when IO exception occures
	 * 
	 * Method creates a UsernamePasswordToken by getting the username and password of the requesting user
	 * try-block runs secure: tests whether the user is admin, student or professor; if none of those exception is thrown.
	 * three possible exceptions: unknown account, incorrect credentials and the possibility 
	 * to diagnose an exception (ex.printStackTrace()).
	 * Client request is redirected to previous URL
	 * 
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");

		String url = "/login.jsp";

		// see /login.jsp for these form fields
		String username = request.getParameter("username");
		String password = request.getParameter("password");

		// create a UsernamePasswordToken using the
		// username and password provided by the user
		UsernamePasswordToken token = new UsernamePasswordToken(username,
				password);

		try {

			// get the user (aka subject) associated with
			// this request.

			Subject subject = SecurityUtils.getSubject();

			// The use of IniShiroFilter specified in web.xml
			// caused JSecurity to create the DefaultWebSecurityManager object
			// see:
			// http://jsecurity.org/api/org/jsecurity/web/DefaultWebSecurityManager.html
			// This security manager is the default for web-based applications
			// The SecurityUtils was provided that security manager
			// automatically
			// The configuration specified in web.xml caused
			// a JdbcRealm object to be provided to the SecurityManager
			// so when the login method is called that JdbcRealm
			// object will be used
			// This application uses all the other defaults
			// For example the default authentication query string is
			// "select password from users where username = ?"
			// since the database this application uses (securityDB)
			// has a users table and that table has a column named username
			// and a column named password, the default authentication query
			// string will work
			// The call to login will cause the following to occur
			// Shiro will query the database for a password associated with the
			// provided username (which is stored in token). If a password is
			// found
			// and matches the password
			// provided by the user (also stored in the token), a new Subject
			// will be created that is
			// authenticated. This subject will be bound to the session for the
			// user who made this request
			// see:
			// http://shiro.apache.org/static/current/apidocs/org/apache/shiro/authc/Authenticator.html
			// for a list of potential Exceptions that might be generated if
			// authentication fails (e.g. incorrect password, no username found)

			subject.login(token);

			// clear the information stored in the token

			token.clear();

			// add the username to the request
			request.setAttribute("username", username);

			if (subject.hasRole("admin")) {
				url = "/Admin";
			} else if (subject.hasRole("student")) {
				url = "/Student";
				//System.out.println(subject.getPrincipal());
				subject.getSession().setAttribute("student",
						subject.getPrincipal());
			} else if (subject.hasRole("professor")) {
				url = "/Professor";
			} else {
				throw new Exception();
			}
			//System.out.println("Log: " + username + " logged in successfully.");

		} catch (UnknownAccountException ex) {
			// username provided was not found
			//ex.printStackTrace(); ***commented out, Stack would otherwise fill up
			request.setAttribute("error", "Login failed! Username or password incorrect. Please retry.");

		} catch (IncorrectCredentialsException ex) {
			// password provided did not match password found in database
			// for the username provided
			//ex.printStackTrace(); ***commented out, Stack would otherwise fill up
			request.setAttribute("error", "Login failed! Username or password incorrect. Please retry.");
		}

		catch (Exception ex) {
			ex.printStackTrace();
			request.setAttribute("error", "Fatal Error! Please try again later.");
		}
		
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
	


		// forward the request and response to the view
		// RequestDispatcher included = getServletContext()
		//		.getRequestDispatcher("/GetSettingsCookie");
		// included.include(request, response);
		
		RequestDispatcher dispatcher = getServletContext()
				.getRequestDispatcher(url);
				dispatcher.forward(request, response);

	}
}