package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet({"/RegistrationPage"})

public class RegistrationPage extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
	   static final long serialVersionUID = 1L;
	   
	   protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			request.setCharacterEncoding("UTF-8");
			String url="/backend/sendRegistrationLink.jsp";
			System.out.println("New FILE");
			
			request.setAttribute("link", request.getParameter("link"));
			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
	        
	        dispatcher.forward(request, response); 
			  
		}  	
	   
	   protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			request.setCharacterEncoding("UTF-8");
			String url="/backend/sendRegistrationLink.jsp";
			
			request.setAttribute("link", request.getParameter("link"));
						
			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
	        
	        dispatcher.forward(request, response); 
			
		   
	   }
	   
}