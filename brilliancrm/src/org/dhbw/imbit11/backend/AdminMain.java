package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.annotation.WebServlet;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet({"/Admin"})

/**
 * Class contains the doGet and doPost methods for the Admin homepage and associates
 * students to a certain professor
 * 
 * @author Mary
 *
 */
 public class AdminMain extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /**
     * Invokes the constructor of parent class (superclass) javax.servlet.http.HttpServlet
	 */
	public AdminMain() {
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
	 * Client's request is direct to path saved in the dispatcher object
	 * Path directs to the homepage of the admin
	 * The UserRealm object enables the use of the sql statements saved to the class UserRealm
	 * Exception saves the names of the students of certain professor to the UserRealm object
	 * and stores the string "professor" to the attribut professor
	 * 
	 * @param request - contains the request of a client
	 * @param response - contains the response of the servlet
	 * 
	 * @throws ServletException - throws exception when servlet encounters difficulties
	 * @throws IOException - shows line of code in which error occured
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String url = "/backend/homepage_admin.jsp";
		//created object enables the use of sql statements saved in the class UserRealm
		UserRealm userRealm = new UserRealm();
		;
		try {
			ArrayList<ArrayList<String>> professors = userRealm.getProfessors();
			request.setAttribute("professors", professors);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}		
		
	     // forward the request and response to the view
        RequestDispatcher dispatcher =
             getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);   
		
	}   	  	    
}