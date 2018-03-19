package org.dhbw.imbit11.backend;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet({ "/SendRegistrationLink" })

/**
 * Class is invoked when the email with the registration link is send to a
 * client
 * 
 * @author Mary
 *
 */
public class SendRegistrationLink extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
	static final long serialVersionUID = 1L;

	/**
	 * Is now done by RegistrationPage
	 * 
	 * Saves the registration link to the request object and forwards the request
	 * and response to the backend sendRegistrationLink.jsp
	 * 
	 * @param request
	 *            - contains the request of a client (registration)
	 * @param response
	 *            - contains the response of a servlet (object that contains
	 *            registration link)
	 * 
	 * @exception ServletException
	 *                - throws exception when servlet encounters difficulties
	 * @exception IOException
	 *                - throws exception when IO error occured
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		String url = "/backend/sendRegistrationLink.jsp";

		request.setAttribute("link", request.getParameter("link"));
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);

		dispatcher.forward(request, response);

	}

	/**
	 * Gets the registration link and the recipient of the email, sends the mail to
	 * the recipient email address and forwards the request and response to the
	 * backend sendRegistrationLink.jsp
	 * 
	 * @param request
	 *            - contains the request for the registration link of a client
	 * @param response
	 *            - contains the response of the servlet
	 * 
	 * @exception ServletException
	 *                - throws exception when servlet encounters difficulties
	 * @exception IOException
	 *                - throws exception when IO error occured
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		String url = "/backend/sendRegistrationLink.jsp";

		// get the registration link and the recipient of the email from the JSP
		String link = request.getParameter("link");
		String mailAddress = request.getParameter("email");
		String username = (String) request.getAttribute("username");
		String toMail[] = new String[101];

		/*
		 * Nikolas K. 04.03.2016 Replace "," with ";"
		 * 
		 */

		String newMailAddress = mailAddress.replaceAll(",", ";");

		/*
		 * Nikolas K. 29.02.2016 Seperate the mailAddress String in single mail
		 * adresses, seperated by ";"
		 * 
		 */

		toMail = newMailAddress.split(";");

		/*
		 * Nikolas K. 29.02.2016 Send the registration mail separated to every mail
		 * address provided
		 * 
		 */

		for (int i = 0; i < toMail.length; i++) {

			// email without using HTML
			String content = "Welcome to brillianICM!<br><br> Please use the following link to register to your course: "
					+ link + "<br><br> With best regards, <br><br>"
					+ "your brillianICM team <br><br><br> Note that this is a system generated e-mail. Please do not reply.";

			// send the mail
			MailClient mailclient = new MailClient();
			mailclient.sendMail(toMail[i], "Registration Link brillianICM", content, request);
			request.setAttribute("status", "Your e-mail was sent to the entered address.");
			System.out.println("Email sent");

			// request.setAttribute("status", "Repeated password does not match.");

			// forward the request and response to the view
			if (i == 0) {
				RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
				request.setAttribute("link", request.getParameter("link"));
				dispatcher.forward(request, response);

			}

		}

	}

}