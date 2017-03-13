package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;

@WebServlet({"/Student"})

/**
 * Class is invoked when the main page of the game is loading (student view)
 * @author Mary
 *
 */
 public class StudentMain extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /**
     * Invokes the constructor of parent class (superclass) javax.servlet.http.HttpServlet
     */
	public StudentMain() {
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
	 * Method gets the user id of a client and loads the inherent main page (with score of a certain user
	 * identified by user id)
	 * 
	 * @param request - contains the request of a student to see the main page
	 * @param response - contains the response of the servlet (specific for user id)
	 * 
	 * @throws ServletException - throws exception when servlet encounters difficulties
	 * @throws IOException - throws exception when IO error occured
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

//		String url = "/backend/homepage_student.jsp";
		String url = "/Main";
		
		
		// get the userid of the current user
		String userid="";
		String username = SecurityUtils.getSubject().getPrincipal().toString();
//		String username = request.getParameter("username");
		//System.out.println("Username ist " + username);		
		UserRealm realm = new UserRealm();
		try{
			userid = realm.getUserByEmail(username);
		}
		catch(SQLException e){
			e.printStackTrace();
		}
		//System.out.println("User id ist: " + userid);
		request.setAttribute("userid", userid);
		
	     // forward the request and response to the view
        RequestDispatcher dispatcher =
             getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);   
		
	}   	  	    
}