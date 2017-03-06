package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;

import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;

@WebServlet({"/Professor"})

/**
 * Generates the Homepage of the professor by identifying the professor and showing
 * associated groups and students
 * 
 * @author Mary
 *
 */
 public class ProfessorMain extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
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
	 * Gets the professor associated with the request, the with the professor associated
	 * students and groups with the fiiting register links and saves to the request
	 * the groups with the parameter name "groups" and forwards request and response
	 * to the Homepage of the professor
	 * 
	 * @param request - contains the request of a client (open Main site of professor)
	 * @param response - contains the response of the servlet (success/ error)
	 * 
	 * @throws ServletException - throws exception when servlet encounters difficulties
	 * @throws IOException - signals that an IO exception occured and gives out line of code
	 * stores in the request the error message
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String url = "/backend/homepage_professor.jsp";
		
		try {
			//get the user (aka subject) associated with this request.
			String subjectPrincipal = SecurityUtils.getSubject().getPrincipal().toString();
			//System.out.println("Der derzeitige Dozent ist " + subjectPrincipal);
			
			//get students associated with the professor
			UserRealm userRealm = new UserRealm();
			ArrayList<ArrayList<String>> students = userRealm.getUsersForProfessor(subjectPrincipal);		
			request.setAttribute("students", students);
			
			//get groups associated with the professor
			
			ArrayList<ArrayList<String>> groups = userRealm.getGroupsForProfessor(subjectPrincipal);
			
 			for (int i=0; i<groups.size(); i++){
 				groups.get(i).add(calculateRegistrationlink(groups.get(i).get(0), request));
 			}
			
			request.setAttribute("groups", groups);
		}catch (Exception ex) {
			ex.printStackTrace();
			request.setAttribute("error", "NOT SUCCESSFUL - cause not known!");
		}
	     // forward the request and response to the view
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
        dispatcher.forward(request, response);   
	}
	
	/**
	 * Creates the registration link for a group out of the parameter registration link,
	 * checksumString, groupid and a settled multiplicator
	 * 
	 * @param groupidstring - contains the groupid in form of a string (generated in CreateUser)
	 * @param request - contains the request of the professor to get a registration link for
	 * a certain group
	 * 
	 * @return registrationlink - contains the made up registrationlink 
	 */
	protected String calculateRegistrationlink(String groupidstring, HttpServletRequest request){
		//works up to 4.3*10^9 groups
		String registrationlink = request.getServletContext().getInitParameter("domain")+ request.getContextPath()+"/Registration?g=";
		
		int groupid = Integer.parseInt(groupidstring);
		int multiplicator = 23;
		int checksum = calculateChecksum(groupid * multiplicator);
		String checksumString = checksum+"";
		if(checksum < 10){
			checksumString = "0"+checksum;
		}
		
		registrationlink = registrationlink + checksumString +  groupid * multiplicator; 
		
		return registrationlink;
	}
	
	/**
	 * Calculates checksum with the group id
	 * 
	 * @param groupid - contains the id of a certain group
	 * 
	 * @return checksum - calculated number
	 */
	protected int calculateChecksum (int groupid){
		if (groupid <= 9) return groupid;
		return groupid%10 + calculateChecksum(groupid/10);
	}
	
}