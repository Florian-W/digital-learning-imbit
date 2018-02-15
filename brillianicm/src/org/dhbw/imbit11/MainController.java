package org.dhbw.imbit11;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dhbw.imbit11.backend.UserRealm;

@WebServlet({ "/Main" })
/**
 * Class contains the doGet and doPost methods for responding with the content of the Frontend
 * "Mainpage" with the grid view and labels to a clients response
 * 
 * @author Mary
 *
 * @version 2.0
 */
public class MainController extends HttpServlet {
	
	/**
	 * Grid view and labels of Mainpage of the brillianCRM is saved to the Object jsp
	 * after Servlet config is placed into service and Servlet Context Object created
	 */
	private static final long serialVersionUID = 1L;
	private RequestDispatcher jsp;
	
	public void init(ServletConfig config) throws ServletException {
		ServletContext context = config.getServletContext();
		jsp = context.getRequestDispatcher("/frontend/main.jsp");
	}
	
	/**
	 * Method allows Servlet to handle a get request
	 * Format of the response is HTML with UTF-8 Encoding
	 * Server-side information of grid view and labels of Mainpage of brillianCRM is saved to response
	 * 
	 * @param request - contains the request of a client
	 * @param response - contains the response of the servlet
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		//System.out.println("Main Get...");		
		jsp.include(request, response);
	}

	/**
	 * Method allows servlet to handle post requests, so client can send data
	 * of unlimited length to web server
	 * Server-side information of Mainpage of a certain user identified by mail address is saved to response
	 * 
	 * @param request - contains the request of a client must contain username/ userid
	 * @param response - contains the response of the servlet
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		//System.out.println("Main Post...");
		
		String userid="";
		String username = request.getParameter("username");
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
		
		jsp.include(request, response);
	}
}