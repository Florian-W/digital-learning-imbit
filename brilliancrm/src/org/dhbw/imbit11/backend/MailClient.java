package org.dhbw.imbit11.backend;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

/**
 * General Class which provides mail sending functionality
 * Usage with sendMail function as documented.
 * 
 * @author benste
 * 
 * @version 2.1
 */
public class MailClient extends HttpServlet
{
	 static final long serialVersionUID = 1L;
	 
	 	/**
	 	 * Function which sends a specified email with the installed mail system.
	 	 * 
	 	 * 
	 	 * @param toEmail recipient email address
	 	 * @param subject subject of the email
	 	 * @param content text of the mail
	 	 * @param request request object which is necessary to access context parameters defined in web.xml
	 	 */
	
		public void sendMail(String toEmail, String subject, String content, HttpServletRequest request) {
			 //Getting servlet context from request
			ServletContext sc = request.getServletContext();
			//Getting context parameters from servlet context
			final String username = sc.getInitParameter("mailuser");
			final String password = sc.getInitParameter("mailpw");
	 
			Properties props = new Properties();
			props.put("mail.smtp.auth", sc.getInitParameter("smtpauth"));
			props.put("mail.smtp.starttls.enable", sc.getInitParameter("smtptls"));
			props.put("mail.smtp.host", sc.getInitParameter("mailserver"));
			props.put("mail.smtp.port", sc.getInitParameter("mailport"));
	 
			Session session = Session.getInstance(props,
			  new javax.mail.Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(username, password);
				}
			  });
	 
			try {
	 
				Message message = new MimeMessage(session);
				message.setFrom(new InternetAddress(username));
				message.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(toEmail));
				message.setSubject(subject);
				message.setContent(content, "text/html; charset=utf-8");
			   // messageBodyPart.setText(html, "UTF-8", "html");
	 
				Transport.send(message);
	 
				//System.out.println("Done");
	 
			} catch (AddressException e) {
	        	e.printStackTrace();
				//System.out.println("Sending email failed, uncorrect address.");
	        } catch (MessagingException e) {
	        	e.printStackTrace();
				//System.out.println("Sending email failed, message could not be sent.");
		}
		}
}
