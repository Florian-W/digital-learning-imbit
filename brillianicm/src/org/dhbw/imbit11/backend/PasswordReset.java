package org.dhbw.imbit11.backend;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;

@WebServlet({"/ResetPassword"})

/**
 * Class is invoked when user wants to update or reset his password
 * 
 * @author Mary
 *
 */
 public class PasswordReset extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
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
	 * Checks updatePasswor Form in either admin, professor or student homepage. 
+	 * Contained data means that user wants to perform password change.
+	 * If data is filled, password change will be processed.
	 * Parameter updatePassword is not empty: Reads out role and stores depending on the role the fitting URL
	 * in the parameter url.
+	 * subject and strings are loaded. Old password will be checked via UsernamePasswordToken. 
+	 * If new entered passwords match, they will be hashed and stored in database. User will be logged out.
+	 * If Parameter updatePassword is empty: A new password is created, saved to the database
	 * and sent to the user with the message that it was successful saved to the request
	 * Request and response is sent to the view of the fitting URL
	 * If repeated password does not equal the password: request gives out an error message
	 * 
	 * @param request - contains the request of a client (updated password)
	 * @param response - contains the response of the servlet (success/ error)
	 * 
	 * @throws ServletException - throws exception when servlet encounters difficulties
	 * @throws IOException - signals that an IO exception occured and gives out line of code
	 * @throws IncorrectCredentialsException - old Password is wrong
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");

		String url;
		
		if(request.getParameter("updatePassword") != null){
			String role = request.getParameter("role");
			
			url = "/backend/homepage_"+ role +".jsp";
			if(role.equals("professor")){
				url="/Professor";
			}
			if(role.equals("admin")){
				url="/Admin";
			}
			if(role.equals("student")){
				url="/Student";
			}
			
			Subject subject = SecurityUtils.getSubject();
			String email = (String) subject.getPrincipal();
			String oldpassword = request.getParameter("oldpassword");
			String password = request.getParameter("password");
			String password_repeat = request.getParameter("password_repeat");

			try {
				UsernamePasswordToken token = new UsernamePasswordToken(email, oldpassword);
				// subject.login(token);
				token.clear(); 
				//try {	
			
			if(password.equals(password_repeat)){
				PasswordEncryptor pe = new PasswordEncryptor();
				String hashedPassword = pe.hashPassword(password);
				UserRealm realm = new UserRealm();
				try{
					realm.updatePassword(email, hashedPassword);
					url="/LogoutUser";
					// Log out after password update 
					/* if (subject != null) {
				 	//see:  http://jsecurity.org/api/index.html?org/jsecurity/web/DefaultWebSecurityManager.html
				     subject.logout();
				   }
			         HttpSession session = request.getSession(false);
			         if( session != null ) {
			          session.invalidate();
			        }     */ 
					   
					}catch(SQLException ex){
					// System.out.println("password update failed!");
					// e.printStackTrace();
					request.setAttribute("error", "SQL Connection failed");
					url = "/backend/homepage_"+ role +".jsp";
				}
			}else{
				request.setAttribute("error", "Repeated password does not match.");
			}
			} catch (IncorrectCredentialsException ex) {
				// password provided did not match password found in database
				// for the Username which is trying to do the password change
				ex.printStackTrace();
				request.setAttribute("error", "Login failed! Wrong old Password!");
				url = "/backend/homepage_"+ role +".jsp";
				
				 } catch (RuntimeException ex) {
			 	// passwords do not match each other
			  	request.setAttribute("error", "Repeated password does not match.");
			  	url = "/backend/homepage_"+ role +".jsp";
				 }
		}else{
		
			String email = request.getParameter("username");
		url="/login.jsp";
		//Create a new temporary password for the user
		String temporaryPassword = ""+ Math.round(Math.random()*100000);
		PasswordEncryptor pe = new PasswordEncryptor();
		String hashedPassword = pe.hashPassword(temporaryPassword);
		
		//Enter the temporary password in the database
		UserRealm realm = new UserRealm();
		try{
			realm.updatePassword(email, hashedPassword);

		}catch(SQLException e){
			//System.out.println("Update of Password in DB failed.");
			e.printStackTrace();
		}
		
		//Send the temporary password to the user
		String content = "Your temporary password is "
				+ temporaryPassword + ". You can change this after you logged in. \n\nGreetings, \n" +
					"your brillianCRM admin \n\n\n This is an automated email. Please do not reply.";
		MailClient mailclient = new MailClient();
		mailclient.sendMail(email, "Password Reset", content, request);
		}
		request.setAttribute("status", "Email was sent.");
	     // forward the request and response to the view
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(url);
        
        dispatcher.forward(request, response);   
	
		
	}   	  	    

}
