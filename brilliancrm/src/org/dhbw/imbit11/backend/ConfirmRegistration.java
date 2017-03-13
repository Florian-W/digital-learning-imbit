package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;

import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet({"/ConfirmRegistration"})

/**
 * Class contains the doGet method for the confirmation mail,
 * where the e-Mail of a user is verified
 * 
 * @author Mary
 *
 */
 public class ConfirmRegistration extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
     	
	/**
	 * Client's response is direct to path saved in the dispatcher object
	 * and the response forward to the view
	 * Path directs to the Registration complete site
	 * From the response object the e-Mail and the unverified e-Mail
	 * are selected and saved as strings
	 * The UserRealm object enables the use of the sql statements saved to the class UserRealm
	 * Exception changes the unidentified e-Mail to the e-Mail that is verified by the user or
	 * gives out an error
	 * 
	 * @param response - contains the response of the servlet
	 * @param request - contains the request of a client
	 * 
	 * @throws ServletException - throws exception when servlet encounters difficulties
	 * @throws IOException - shows line of code in which error occured
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String url="/backend/registration_complete.jsp";

		String email = request.getParameter("email");
		String unverifiedEmail = request.getParameter("ue");

		UserRealm realm = new UserRealm();
		try{
			realm.updateEmail(email, unverifiedEmail);
		}catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//System.out.println("confirming user failed");
			}

		// forward the request and response to the view
		RequestDispatcher dispatcher =
		     getServletContext().getRequestDispatcher(url);

		dispatcher.forward(request, response); 

		  
	}  	 	  	    
}
