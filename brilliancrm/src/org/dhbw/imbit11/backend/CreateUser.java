package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet({ "/CreateUser" })
/**
 * Contains the doPost and doGet methods to get the parameters from the
 * register_student.jsp Assigns user to groups Admin can be created by giving
 * the parameter professor Sends the verification e-Mail to a new user Resolves
 * groupid and calculates checksum
 * 
 * @author Mary und Benste
 *
 */
public class CreateUser extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
	static final long serialVersionUID = 1L;

	/**
	 * Invokes the constructor of parent class (superclass)
	 * javax.servlet.http.HttpServlet
	 */
	public CreateUser() {
		super();
	}

	/**
	 * Implemented GET method from javax.servlet.Servlet Not in use for this
	 * particular class
	 * 
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * This method extracts the Parameters sent by register_student.jsp, checks
	 * several conditions and creates a new student user this method expects the
	 * groupid to be encoded ( first two digits: checksum; remaining digits:
	 * groupID*23) Safes parameters so they don't have to be reentered by failure
	 * Verifies if e-Mail and gender is entered, if password equals the
	 * password_repeat and changes role of user If the registration was successful
	 * the user is redirected to a landing page if not, the form is called again and
	 * an error/status message is displayed
	 * 
	 * @param request
	 *            - contains the request of a client
	 * @param response
	 *            - contains the response of the servlet
	 * 
	 * @throws ServletException
	 *             - throws exception when servlet encounters difficulties
	 * @throws IOException
	 *             - signals that IO exception occured
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");

		String groupnumber = request.getParameter("groupnumber");

		String url = "/Registration?g=" + groupnumber;

		String role = request.getParameter("role");
		String email = request.getParameter("email");
		String lastname = request.getParameter("lastname");
		String firstname = request.getParameter("firstname");
		switch (role) {
		case "student":
			url = "/Registration?g=" + groupnumber;
			break;
		// case "admin": url = createNewAdmin(request, realm, email, lastname,
		// firstname, encryptedPassword, gender); break;
		case "professor":
			url = "/Admin";
			break;

		}

		// The gender is entered on the web page from a drop down list.
		// A value of 0 implies a female, a value of 1 a male user.
		int gender = -1;
		String genderValue = request.getParameter("gender");
		// //System.out.println(genderValue);
		if (genderValue != null) {
			if (genderValue.equals("f")) {
				gender = 0;
			} else if (genderValue.equals("m")) {
				gender = 1;
			}
		}

		String password = request.getParameter("password");
		String password_repeat = request.getParameter("password_repeat");

		// setting attributes so that the user has not to reenter the data if
		// registration fails
		request.setAttribute("email", email);
		request.setAttribute("firstname", firstname);
		request.setAttribute("lastname", lastname);
		request.setAttribute("gender", gender);
		UserRealm realm = new UserRealm();

		try {

			if (email != null && !email.equals("") && firstname != null && !firstname.equals("") && lastname != null
					&& !lastname.equals("") && password != null && !password.equals("") && !email.contains("+")) {

				if (password.equals(password_repeat)) {
					// submitting query to create a new student user
					if (gender != -1) {

						if (!realm.userExists(email)) {
							// Hasing the password
							String encryptedPassword = new PasswordEncryptor().hashPassword(password);

							switch (role) {
							case "student":
								url = createNewStudent(request, realm, email, lastname, firstname, encryptedPassword,
										gender);
								break;
							// case "admin": url = createNewAdmin(request,
							// realm, email, lastname, firstname,
							// encryptedPassword, gender); break;
							case "professor":
								url = createNewProfessor(request, realm, email, lastname, firstname, encryptedPassword,
										gender);
								break;

							}

						} else {
							request.setAttribute("status", "User does already exist.");
						}

					} else {
						request.setAttribute("status", "Please select the appropriate title.");
					}
				} else {
					request.setAttribute("status", "Repeated password does not match.");
				}

			} else {
				request.setAttribute("status",
						"You have to fill in every field before submitting. \n Please do not use a +-sign in your mail address.");
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			// System.out.println("creating user failed");
		}

		// forward the request and response to the view
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);

		dispatcher.forward(request, response);

	}

	/**
	 * Assignment of a user to a group, when groupid exists creating user for this
	 * certain group if group doesn't exist error message and exception by failure
	 * 
	 * @param request
	 *            - contains the request of the client
	 * @param realm
	 *            - UserRealm object (was created after the parameters where send by
	 *            user)
	 * @param email
	 *            - contains the e-Mail of the new user
	 * @param lastname
	 *            - contains the lastname of the new user
	 * @param firstname
	 *            - contains the firstname of the new user
	 * @param encryptedPassword
	 *            - contains the encrypted password of the new user
	 * @param gender
	 *            - contains the gender of the new user
	 * 
	 * @return url - Registration URL
	 */
	protected String createNewStudent(HttpServletRequest request, UserRealm realm, String email, String lastname,
			String firstname, String encryptedPassword, int gender) {
		String groupnumber = request.getParameter("groupnumber");

		String url = "/Registration?g=" + groupnumber;

		// Check for GroupID Checksum
		if (!resolveGroupid(groupnumber).equals("false")) {
			groupnumber = resolveGroupid(groupnumber);

			// checks whether the group does exist
			try {
				if (realm.groupExists(groupnumber)) {
					// entering the new student user into database
					String unverifiedEmail = "" + Math.round(Math.random() * 100000);
					url = "/backend/registration_landing.jsp";
					realm.createNewUser(unverifiedEmail, lastname, firstname, encryptedPassword, "student", groupnumber,
							gender);
					sendConfirmationMail(email, firstname, lastname, unverifiedEmail, request);

					// attributes not needed anymore after successful
					// registration
					request.removeAttribute("email");
					request.removeAttribute("firstname");
					request.removeAttribute("lastname");
					request.removeAttribute("gender");

				} else {
					request.setAttribute("status", "You try to register for a not existing group.");
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				// System.out.println("creating user failed");
			}
		} else {

			request.setAttribute("status", "Group does not exist.");
		}
		return url;
	}

	/**
	 * Creates a new user with the parameter professor with admin rights and deletes
	 * attributes email, firstname, lastname
	 * 
	 * @param request
	 *            - contains the request of the user
	 * @param realm
	 *            - - UserRealm object (was created after the parameters where send
	 *            by user)
	 * @param email
	 *            - contains the e-Mail of the new user
	 * @param lastname
	 *            - contains the lastname of the new user
	 * @param firstname
	 *            - contains the firstname of the new user
	 * @param encryptedPassword
	 *            - contains the encrypted password of the new user
	 * @param gender
	 *            - contains the gender of the new user
	 * 
	 * @return url - URL Admin site
	 */
	protected String createNewProfessor(HttpServletRequest request, UserRealm realm, String email, String lastname,
			String firstname, String encryptedPassword, int gender) {

		String url = "/Admin";

		try {
			realm.createNewUser(email, lastname, firstname, encryptedPassword, "professor", null, gender);

			// attributes not needed anymore after successful registration
			request.removeAttribute("email");
			request.removeAttribute("firstname");
			request.removeAttribute("lastname");

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			// System.out.println("creating user failed");
		}
		return url;
	}

	/**
	 * Sends an email with a link and text to confirm the e-Mail address is valid
	 * Failure exception is thrown
	 * 
	 * @param email
	 *            - contains the e-Mail of the user, where confirmation mail is send
	 *            to
	 * @param firstname
	 *            - contains the first name of the new user
	 * @param lastname
	 *            - contains the last name of the new user
	 * @param unverifiedEmail
	 *            - contains the e-Mail address of the new user that needs
	 *            confirmation
	 * @param request
	 *            - contains the request of the user (send user information)
	 */
	protected void sendConfirmationMail(String email, String firstname, String lastname, String unverifiedEmail,
			HttpServletRequest request) {

		// email that is sent to newly created user by REGISTER
		String msgBody = "Dear " + firstname + " " + lastname
				+ ",<br><br> welcome to BrillianCRM. Please confirm your registration by clicking on the following link: <br>"
				+ request.getServletContext().getInitParameter("domain") + request.getContextPath()
				+ "/ConfirmRegistration?email=";

		msgBody += email;
		msgBody += "&ue=";
		msgBody += unverifiedEmail;
		msgBody += "<br><br> With best regards, <br><br>"
				+ "your BrillianCRM Team <br><br><br><br> Note that this is a system generated e-mail. Please do not reply.";

		try {
			MailClient mailclient = new MailClient();
			mailclient.sendMail(email, "Please confirm your registration!", msgBody, request);
		} catch (Exception e) {
			e.printStackTrace();
			// System.out.println("Sending email failed with unknown cause, sorry");
		}
	}

	/**
	 * This method resolves the groupID entered out of the encrypted groupid ( first
	 * two digits: checksum of remaining digits; remaining digits: groupID*23)
	 * 
	 * @param encryptedgroupid
	 *            - contains the encrypted groupid of a certain user
	 * 
	 * @return resolved - resolved groupid
	 */
	protected String resolveGroupid(String encryptedgroupid) {
		// works up to 4.3*10^9 groups
		// //System.out.println("Entered: "+encryptedgroupid);
		String checksum = encryptedgroupid.substring(0, 2);
		int multiplicator = 23;
		int groupid = Integer.parseInt(encryptedgroupid.substring(2));
		if (Integer.parseInt(checksum) == calculateChecksum(groupid)) {
			String resolved = "" + groupid / multiplicator;
			// //System.out.println("Returned: "+resolved);
			return resolved;

		} else {
			// //System.out.println("Returned: false");
			return "false";
		}
	}

	/**
	 * Method to calculate a checksum for the entered int
	 * 
	 * @param groupid
	 *            - contains the group id as an integer
	 * 
	 * @return ckecksum
	 */
	protected int calculateChecksum(int groupid) {
		if (groupid <= 9)
			return groupid;
		return groupid % 10 + calculateChecksum(groupid / 10);
	}
}
