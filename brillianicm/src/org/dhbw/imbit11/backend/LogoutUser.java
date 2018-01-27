package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;


@WebServlet({"/LogoutUser"})

/**
 * Class is invoked when an usr tries to logout o the game
 * Use JSecurity to logout the current user
 * 
 * @author Mary
 */
 public class LogoutUser extends HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /**
     * Invokes the constructor of parent class (superclass) HttpServlet
     */
	public LogoutUser() {
		super();
	}   	
	
	/**
	 * (not in use for this class)
	 * Invokes the doPost method to answer to a request of a client, that is handled
	 * in the doPost method
	 * 
	 * @param request - contains the request of a client (loggout button)
	 * @param response - contains the response of the servlet
	 * 
	 * @throws ServletException - throws exception when servlet encounters difficulties
	 * @throws IOException - signals that an IO exception occured
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request,response);
	}  	
	
	/**
	 * Gets the subject associated with the user request from user that previously logged in
	 * in the same session
	 * User is logged out when subject is not empty and associated entities are removed
	 * Checks if session object is empty, when not invalidates session
	 * Forwards request and response to the URL of the UserLogin site
	 * 
	 * @param request - contains the request of the user (has to be a professor/ admin)
	 * @param response - contains the answer of the servlet
	 * 
	 * @throws ServletException - throws exception when servlet encounters difficulties
	 * @throws IOException - signals that an IO exception occured
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String url = "/LoginUser";
		
		//get the subject associated with this user request
		//If the user has previously logged in during this session then the subject will
		//be the subject authenticated at login
		Subject subject = SecurityUtils.getSubject();
		
        if (subject != null) {
        	//see:  http://jsecurity.org/api/index.html?org/jsecurity/web/DefaultWebSecurityManager.html
            subject.logout();
        }

        HttpSession session = request.getSession(false);
        if( session != null ) {
            session.invalidate();
        }        

        
        // forward the request and response to the view
        RequestDispatcher dispatcher =
             getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);   
        
	}   	  	    
}