package org.dhbw.imbit11;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class UploadServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private File newFile;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		request.setCharacterEncoding("UTF-8");
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		request.setCharacterEncoding("UTF-8");

		bachupfile();
		// sendmail();
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println("<h2>Good job,</h2>");

		boolean isMultipartContent = ServletFileUpload.isMultipartContent(request);

		if (!isMultipartContent) {
			out.println("You are not trying to upload<br/>");
		} else {
			out.println("<b>new XML File uploaded</b> <br/>");
		}

		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		try {
			List<FileItem> fields = upload.parseRequest(request);
			out.println("<b>Number of files: </b>" + fields.size()
					+ "<br/><br/>");
			Iterator<FileItem> it = fields.iterator();
			if (!it.hasNext()) {
				out.println("No fields found");
				return;
			}
			out.println("<table bgcolor=\"lightgray\" border=\"8\" cellspacing=\"0\" cellpadding=\"20\"");
			while (it.hasNext()) {
				out.println("<tr>");
				FileItem fileItem = it.next();				
				boolean isFormField = fileItem.isFormField();
				if (isFormField) {
					out.println("<td>regular form field</td><td>FIELD NAME: "
							+ fileItem.getFieldName() + "<br/>STRING: "
							+ fileItem.getString());
					out.println("</td>");
				} else {
					out.println("<td><b>File-Infos<b></td>"
							+ "<td>FIELD NAME: " + fileItem.getFieldName()
							+ "<br/>NAME: " + fileItem.getName()
							+ "<br/>CONTENT TYPE: " + fileItem.getContentType()
							+ "<br/>SIZE (BYTES): " + fileItem.getSize()
							+ "<br/>TO STRING: " + fileItem.toString());
					out.println("</td>");
				}
				out.println("</tr>");
				try {
					// Copy file to backup

					URL urlToFile = this.getClass().getResource(
							"masterfile.xml");
					newFile = new File(urlToFile.toURI());
				} catch (Exception e) {
					System.err.println("Error loading masterfile.xml");
				}
				fileItem.write(newFile);
				out.println("<tr><td>" + "<b>Speicherpfad</b></td>" + "<td>"
						+ newFile.getAbsolutePath() + "</td></tr>");
			}
			out.println("</table>");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/*
	 * private void sendmail() { // automatische Mail generieren, wenn neue
	 * Masterfile geladen wird
	 * MailClient.sendMail("simon.schlephorst@gmail.com",
	 * "XML Uplaod Notification", "Neue xml Masterfile hochgeladen.");
	 * MailClient.sendMail("mariowareskhan@gmail.com",
	 * "XML Uplaod Notification", "Neue xml Masterfile hochgeladen.");
	 * MailClient.sendMail("spam@knipf.de", "XML Uplaod Notification",
	 * "Neue xml Masterfile hochgeladen."); }
	 */

	private void bachupfile() {
		try {
			URL urlToSourceFile = this.getClass().getResource("masterfile.xml");
			String urlToDestFile = this.getClass()
					.getResource("masterfile.xml").getPath();
			String fileNameDate = new SimpleDateFormat("yyyy-MM-dd-HHmm")
					.format(new Date());
			urlToDestFile = urlToDestFile + "." + fileNameDate;
			File source = new File(urlToSourceFile.toURI());
			File dest = new File(urlToDestFile);

			InputStream is = null;
			OutputStream os = null;
			try {
				is = new FileInputStream(source);
				os = new FileOutputStream(dest);
				byte[] buffer = new byte[1024];
				int length;
				while ((length = is.read(buffer)) > 0) {
					os.write(buffer, 0, length);
				}
			} finally {
				is.close();
				os.close();
			}
		} catch (Exception e) {
			System.err.println("Error loading masterfile.xml");
			e.printStackTrace();
		}

	}

}
