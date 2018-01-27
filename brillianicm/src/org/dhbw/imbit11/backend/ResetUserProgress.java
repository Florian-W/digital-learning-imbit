package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

@WebServlet({"/ResetUserProgress"})

/**
 * Class is invoked when the user tries to reset its user progress
 * result.jsp (located in "frontend" directory) is calling this class
 * 
 * @author Mary, Yi Min
 *
 */
 public class ResetUserProgress extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /**
     * Invokes the constructor of parent class (superclass) javax.servlet.http.HttpServlet
     */
	public ResetUserProgress() {
		super();
	}   	
	
	/**
	 * (not in use for this class)
	 * Invokes the doPost method to answer to a request of a client, that is handled
	 * in the doPost method
	 * 
	 * @param request - contains the request of a client
	 * @param response - contains the response of the servlet
	 * 
	 * @throws IOException - signals that an IO exception occured
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}  	
	
	/**
	 * Gets the data of a current user and checks the role of a subject
	 * When the role is professor the reset_email is stored, the progress related to this 
	 * e-Mail address is reseted and the response and request is forwarded to the view
	 * of the professor
	 * Else the user id is stored, the progress related to the the user id is reseted and
	 * the response and request is forwarded to the view of the student
	 * 
	 * @param request - contains the request of a user (reset of game progress)
	 * @param response - contains the response of the servlet
	 * 
	 * @throws IOException - shows line of code where the exception is thrown
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String url;
		String email;
		
		Subject subject = SecurityUtils.getSubject();
		if(subject.hasRole("professor")){
			email = request.getParameter("reset_email");	
			url = "/Professor";
			
			
		}else{
			// get the userid of the current user
			email = (String) subject.getPrincipal();
			//System.out.println("This is username before reset: "+email);
			url = "/Student";
		}
		UserRealm realm = new UserRealm();
		try{
			 realm.resetUserProgress(email);
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