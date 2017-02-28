package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet({"/DeleteUser"})

/**
 * When a User is deleted this class is invoked
 * 
 * @author Mary
 *
 */
 public class DeleteUser extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /**
     * Invokes the constructor of parent class (superclass) javax.servlet.http.HttpServlet
     */
	public DeleteUser() {
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
	 * @throws ServletException - throws exception when servlet encounters difficulties
	 * @throws IOException - signals that an IO exception occured
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}  	
	
	/**
	 * Method selects the parameter delete_email of the certain user and deletes the UserRealm object
	 * related to this parameter and forwards the request and response to URL of the professor view
	 * Failure: exception thrown
	 * 
	 * @param request - contains the request of the user to delete a user (has to be a professor/ admin)
	 * @param response - contains the answer of the servlet
	 * 
	 * @throws ServletException - throws exception when servlet encounters difficulties
	 * @throws IOException - Shows line of code in which the error occured
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String url = "/Professor";
		
		
		// get the userid of the current user
		
		String email = request.getParameter("delete_email");
		//System.out.println("Zu loeschende User-Email ist " + email);		
		UserRealm realm = new UserRealm();
		try{
			 realm.deleteUser(email);
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
