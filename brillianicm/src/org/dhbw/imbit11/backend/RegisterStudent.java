package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javax.servlet.annotation.WebServlet;

@WebServlet({"/Registration"})

/**
 * Class in invoked when a student registers through the link send by his professor
 * and associates the student to a certain group that was created by the professor
 * 
 * @author Mary
 *
 */
 public class RegisterStudent extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /**
     * Invokes the constructor of parent class (superclass) javax.servlet.http.HttpServlet
     */
	public RegisterStudent() {
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
	 * Gets the group a student wants register to and sets the attribute in the request
	 * to the certain group number, so data that is insert into the form register_student is
	 * associated to a certain group
	 * Forwards request and response to the URL of the student register view
	 * 
	 * @param request - contains the request of a client (register student for a certain group)
	 * @param response - contains the response of the servlet
	 * 
	 * @throws IOException - signals that an IO exception occured
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String url = "/backend/register_student.jsp";
		
		
		String group = request.getParameter("g"); 
		
		
		request.setAttribute("groupnumber", group);
		
		
	     // forward the request and response to the view
        RequestDispatcher dispatcher =
             getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);   
	
		
	}   	  	    
}