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

@WebServlet({"/deleteAccount"})
/**
 * Contains the doPost and doGet methods to get the parameters from the register_student.jsp
 * Assigns user to groups
 * Admin can be created by giving the parameter professor
 * Sends the verification e-Mail to a new user
 * Resolves groupid and calculates checksum
 * 
 * @author Mary und Benste
 *
 */
 public class DeleteAccount extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
   /**
    * Invokes the constructor of parent class (superclass) javax.servlet.http.HttpServlet
    */

   public DeleteAccount() {
		super();
	}  
	/**
	 * Implemented GET method from javax.servlet.Servlet Not in use for this
	 * particular class
	 * 
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * This method extracts the Parameters sent by register_student.jsp, checks several conditions and creates a new
	 *  student user
	 *  this method expects the groupid to be encoded ( first two digits: checksum; remaining digits: groupID*23)
	 *  Safes parameters so they don't have to be reentered by failure
	 * 	Verifies if e-Mail and gender is entered, if password equals the password_repeat and changes role of user
	 *  If the registration was successful the user is redirected to a landing page
	 *  if not, the form is called again and an error/status message is displayed
	 *  
	 *  @param request - contains the request of a client
	 *  @param response - contains the response of the servlet
	 *  
	 *  @throws ServletException - throws exception when servlet encounters difficulties
	 *  @throws IOException - signals that IO exception occured
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String url = "/login.jsp";
		
		Subject subject = SecurityUtils.getSubject();
		String email = (String) subject.getPrincipal();
		
		UserRealm realm = new UserRealm();
		try{
			 realm.deleteUser(email);
		}
		catch(SQLException e){
			e.printStackTrace();
		}
		

				
		 RequestDispatcher dispatcher =
	             getServletContext().getRequestDispatcher(url);
	        
	        dispatcher.forward(request, response);
       
	}  
	
}
	

