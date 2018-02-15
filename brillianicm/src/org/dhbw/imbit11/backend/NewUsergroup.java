package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;

@WebServlet({"/NewUsergroup"})

/**
 * Class is invoked when professor wants to create a new user group
 * 
 * @author Mary
 *
 */
 public class NewUsergroup extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /**
     * Invokes the constructor of parent class (superclass) javax.servlet.http.HttpServlet
     */
	public NewUsergroup() {
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
	 * Gets the parameter groupname from the form field
	 * Creates a new UserRealm object and invokes the function createNewGroup of UserRealm.java
	 * Groupname is saved as first parameter and the E-mail that identifies the profesor is saved
	 * as second parameter
	 * Stores attribut with name success and the object "The new User Group was created" to the request
	 * Forwards the request (success/ error) to the URL of the professor site
	 * 
	 * @param request - contains the request of a professor (creating a new group)
	 * @param response - contains the response of the servlet (success/ error)
	 * 
	 * @throws ServletException - throws exception when servlet encounters difficulties
	 * @throws IOException - gives out in which line of code the error occured and stores
	 * attribut with the name error and the object "NOT SUCCESSFUL - cause not known" to the request
	 * 
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String url = "/Professor";
		
		//see /login.jsp for these form fields
		String groupname = request.getParameter("groupname");
		
		try {
			
			//get the user (aka subject) associated with this request.
			
			String subjectPrincipal = SecurityUtils.getSubject().getPrincipal().toString();

			//System.out.println("Der derzeitige Dozent ist " + subjectPrincipal);
			
			UserRealm userRealm = new UserRealm();
			userRealm.createNewGroup(groupname, subjectPrincipal);
			request.setAttribute("success", "The new User Group was created!");
		}
		
		catch (Exception ex) {
			
			ex.printStackTrace();
			
			request.setAttribute("error", "NOT SUCCESSFUL - cause not known!");
			
		}
		
		
	     // forward the request and response to the view
        RequestDispatcher dispatcher =
             getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);   
	
		
	}   	  	    
}