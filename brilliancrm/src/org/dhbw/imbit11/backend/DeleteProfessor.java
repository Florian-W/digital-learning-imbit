package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet({"/DeleteProfessor"})

/**
 * When admin deletes a professor this class is invoked
 * 
 * @author Mary
 *
 */
 public class DeleteProfessor extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /**
     * Invokes the constructor of parent class (superclass) javax.servlet.http.HttpServlet
     */
	public DeleteProfessor() {
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
	 * Method selects the parameter delete_professor of the certain professor and deletes the UserRealm object
	 * related to this parameter and forwards the request and response to URL of the admin view
	 * Failure: exception thrown
	 * 
	 * @param request - contains the request of the user to delete a professor (has to be a professor/ admin)
	 * @param response - contains the answer of the servlet
	 * 
	 * @throws ServletException - throws exception when servlet encounters difficulties
	 * @throws IOException - shows in which line of code the IO exception occured
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String url = "/Admin";
		
		
		// get the userid of the current user
		
		String email = request.getParameter("delete_professor");
		//System.out.println("Zu loeschende Professor-Email ist " + email);		
		UserRealm realm = new UserRealm();
		try{
			 realm.deleteProfessor(email);
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
