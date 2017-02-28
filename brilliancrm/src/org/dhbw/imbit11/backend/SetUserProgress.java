package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.annotation.WebServlet;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

@WebServlet({"/SetUserProgress"})

/**
 * Class is invoked when the user is setting his progress in hompage_student.jsp 
 * @author Philipp E.
 *
 */
 public class SetUserProgress extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /**
     * Invokes the constructor of parent class (superclass) javax.servlet.http.HttpServlet
     */
	public SetUserProgress() {
		super();
	}   	
	
	/**
	 * (not in use for this class)
	 * Invokes the doGet method to answer to a request of a client, that is handled
	 * in the doPost method
	 * @param request - contains the request of a client
	 * @param response - contains the response of the servlet
	 * @exception IOException - signals that an IO exception occured
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}  	
	
	/**
	 * Checks whether the subject is Professor or Student and does the following:
	 * For Students: Jumps to the lvlId entered in the Students Account settings (hompage_student.jsp)
	 * For Professors: Changes the lvlId of the E-Mail entered to the lvlId entered on Professors Account settings (hompage_professor.jsp)
	 * @param request - contains the request of a user (reset of game progress)
	 * @param response - contains the response of the servlet
	 * @exception IOException - shows line of code where the exception is thrown
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	
		
		String url;		
		
		Subject subject = SecurityUtils.getSubject();
		
	if(subject.hasRole("professor")){
			
			//TODO: Validate and catch Integer to String conversion #403
			String lvlId = request.getParameter("lvlId");
			String group_id = request.getParameter("group_id");
			int cost = new Integer(request.getParameter("cost"));
			int time = new Integer(request.getParameter("time"));
			int quality = new Integer(request.getParameter("quality"));
			
			UserRealm realm = new UserRealm();
			
			try{ 
				ArrayList<String> users = realm.getUserIdsByGroupId(group_id);
				for(String userid:users){
				realm.setUserProgress(userid, cost, quality, time, lvlId);	
				}
				request.setAttribute("status", "Progress set.");
				}
			catch(SQLException e){
				e.printStackTrace();
			}			
				
			
			url = "/Professor";
			
			
		}else{
			String email;
			String lvlId;
			
			// get the userid of the current user
			email = (String) subject.getPrincipal();
			lvlId = request.getParameter("lvlId");
			//System.out.println("This is username before reset: "+email);
			url = "/StudentHomepage";
			
			UserRealm realm = new UserRealm();
			try{ String userId = realm.getUserByEmail(email);
				 realm.setLvlId(userId, lvlId);
				 request.setAttribute("status", "Progress set. Re-Login now.");
			}
				
			catch(SQLException e){
				e.printStackTrace();
			}
		
		}
		
		
	    // forward the request and response to the view
        RequestDispatcher dispatcher =
             getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);
		
	}   	  	    
}