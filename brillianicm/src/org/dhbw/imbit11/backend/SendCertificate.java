package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.lang.reflect.Array;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

/**
 * Servlet implementation class SendCertificate
 */
@WebServlet("/SendCertificate")
public class SendCertificate extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SendCertificate() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */

	/**
	 * Philipp K.
	 * 6.3.16
	 * Sends an certificate of the current progress to each member of a specific group 
	 * handed in by the request
	 * @param request - contains the request of a user (reset of game progress)
	 * @param response - contains the response of the servlet
	 * @exception IOException - shows line of code where the exception is thrown
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		
	
		String url= "/Professor";
		String group_id = request.getParameter("group_id");
		String group_name = request.getParameter("group_name");

		String data = "";
		char countryID;
		ArrayList<Object> list = null;
		
		UserRealm realm = new UserRealm();
		MailClient mailclient = new MailClient();
		
		try{ 
			ArrayList<String> users = realm.getUserIdsByGroupId(group_id);
			for(String userid:users){
				String email = realm.getUserEmailByID(userid);
				list = realm.getUserProgress(userid);
				
				String lastName =  (String) list.get(0);
				String firstName = (String) list.get(1);
				int imcost = (int) list.get(3);
				int imqual = (int) list.get(4);
				int imtime = (int) list.get(5);
				
				
				String path = (String) list.get(6);
				String[] arr = path.split(";");
				System.out.println(arr[arr.length-1]);
				if(arr[arr.length-1].equals("l000e000")){}
				else{
				if(arr[arr.length-1].equals("l999e999")){
				String countryevent = arr[arr.length-2];
				countryID = countryevent.charAt(1);}
				else{
					String countryevent = arr[arr.length-1];
					countryID = countryevent.charAt(1);	
				}
				
				String country;
				switch (countryID){
					case '1': { country = "Brazil"; break;}
					case '2': { country = "Spain"; break;}
					case '3': { country = "China"; break;}
					case '4': { country = "USA"; break;}
					case '5': { country = "Sweden"; break;}
					case '6': { country = "India"; break;}
					case '7': { country = "Germany"; break;}
					case '8': { country = "Turkey"; break;}
					case '9': { country = "Australia"; break;}
					default:{ country = ""; break;}
				}
				
				String username= firstName + " " + lastName; 
				mailclient.sendCertificateMail(username, email, imcost, imqual, imtime, country, request);
				}
			}
			request.setAttribute("status", "Certificate Send to group: " + group_name);
			}
		catch(SQLException e){
			e.printStackTrace();
		}			
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
	    dispatcher.forward(request, response);   
		
		}

}
