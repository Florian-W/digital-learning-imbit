package org.dhbw.imbit11;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet({ "/Location" })
/**
 * Class contains the doGet and doPost methods for responding with the content of the Frontend
 * "Location" with the formating of the panel, buttons, etc. to a clients response
 * 
 * @author Mary
 *
 * @version 2.0
 */
public class LocationController extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private RequestDispatcher jsp;
	
	/**
	 * Format of panel und buttons of Location panel of the brillianCRM is saved to the Object jsp
	 * after Servlet config is placed into service and Servlet Context Object created
	 */
	public void init(ServletConfig config) throws ServletException {
		ServletContext context = config.getServletContext();
		jsp = context.getRequestDispatcher("/frontend/location.jsp");
	}
	
	/**
	 * Method allows Servlet to handle a get request
	 * Format of the response is HTML with UTF-8 Encoding
	 * Server-side information of the layout of the Location panel of brillianCRM is saved to response
	 * 
	 * @param request - contains the request of a client
	 * @param response - contains the response of the servlet
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		//System.out.println("Dialog Get...");		
		jsp.include(request, response);
	}

	/**
	 * Method allows servlet to handle post requests, so client can send data
	 * of unlimited length to web server
	 * Server-side information of layout of Location panel brillianCRM is saved to response
	 * 
	 * @param request - contains the request of a client
	 * @param response - contains the response of the servlet
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		//System.out.println("Dialog Post...");
		jsp.include(request, response);
	}
}