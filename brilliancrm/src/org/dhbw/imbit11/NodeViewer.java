package org.dhbw.imbit11;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URL;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;


@WebServlet("/NodeViewer")
/**
 * Loads masterfile and gives out a specific node defined by level and element(needs addition)
 * @author Mary
 *
 */
public class NodeViewer extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    /**
     * Invokes the constructor of parent class (superclass) HttpServlet
     */
    public NodeViewer() {
        super();
        // TODO Auto-generated constructor stub
    }

    String node = "Node not found.";
	File masterfile = null;
	
	/**
	 * Loads master file into the response and returns the character data to the client and
	 * gives out node that was determined in getNode()
	 * 
	 * @param request - contains the request of a client
	 * @param response - contains the response with character encoding type of the masterfile
	 * 
	 * @throws IOException - throws exception when masterfile could not be loaded
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String name = "uniqueId";
	    String uniqueId = request.getParameter(name);
	    
	    String levelreq = "level";
	    String level = request.getParameter(levelreq);
	    
	    String elementreq = "element";
	    String element = request.getParameter(elementreq);

		try {
			URL urlToFile = this.getClass().getResource("masterfile.xml");
			masterfile = new File(urlToFile.toURI());
		} catch (Exception e) {
			System.err.println("Error loading masterfile.xml");
		}
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		if (uniqueId != null) {out.print(getNode(uniqueId));}
		else
		{out.print(getNode(level,element));}
	}

		/**
		 * Searches node with level and element
		 * 
		 * @param level - defined in xml (?)
		 * @param element - element the user is at (?)
		 * 
		 * @return node - node that the method defined
		 */
		public String getNode(String level, String element) {
			// search with level and element
			String expression = "/events/event[@level ='" + level
					+ "' and @option ='" + element + "']/*";

			try {
				DocumentBuilderFactory factory = DocumentBuilderFactory
						.newInstance();
				DocumentBuilder builder = factory.newDocumentBuilder();
				Document doc = builder.parse(masterfile);
				XPathFactory xPathfactory = XPathFactory.newInstance();
				XPath xpath = xPathfactory.newXPath();
				XPathExpression expr = xpath.compile(expression);

				node = "<event>";

				NodeList nodes = (NodeList) expr.evaluate(doc,
						XPathConstants.NODESET);
				for (int i = 0; i < nodes.getLength(); i++) {
					node += nodeToString(nodes.item(i));
				}
				node += "</event>";

			} catch (SAXException | IOException e) {
				return "Error while transforming the File! "
						+ masterfile.getAbsolutePath();
			} catch (ParserConfigurationException e) {
				return "Error while parsing the File! "
						+ masterfile.getAbsolutePath();
			} catch (XPathExpressionException e) {
				return "Error while calling XPath the File! "
						+ masterfile.getAbsolutePath() + " with " + expression;
			} catch (TransformerException e) {
				return "Error while transforming XML File! "
						+ masterfile.getAbsolutePath() + " with " + expression;
			}
			return node;
		}

		/**
		 * Calls node from masterfile according to unique ID
		 * 
		 * @param uniqueId - string that identifies the node
		 * 
		 * @return node - node defined in this method
		 */
		public String getNode(String uniqueId) {
			// calls node from masterfile according to unique ID
			String expression = "/events/event[@id = '" + uniqueId + "']";

			try {
				DocumentBuilderFactory factory = DocumentBuilderFactory
						.newInstance();
				DocumentBuilder builder = factory.newDocumentBuilder();
				Document doc = builder.parse(masterfile);
				XPathFactory xPathfactory = XPathFactory.newInstance();
				XPath xpath = xPathfactory.newXPath();
				XPathExpression expr = xpath.compile(expression);

				node = "";

				NodeList nodes = (NodeList) expr.evaluate(doc,
						XPathConstants.NODESET);
				for (int i = 0; i < nodes.getLength(); i++) {
					node += nodeToString(nodes.item(i));
				}

			} catch (SAXException | IOException e) {
				return "Error while transforming the File! "
						+ masterfile.getAbsolutePath();
			} catch (ParserConfigurationException e) {
				return "Error while parsing the File! "
						+ masterfile.getAbsolutePath();
			} catch (XPathExpressionException e) {
				return "Error while calling XPath the File! "
						+ masterfile.getAbsolutePath() + " with " + expression;
			} catch (TransformerException e) {
				return "Error while transforming XML File! "
						+ masterfile.getAbsolutePath() + " with " + expression;
			}
			return node;
		}

		/**
		 * Transforms content of a specific node into a string
		 * 
		 * @param node - contains the node that was determined in the methods earlier
		 * 
		 * @return string containing the data of the xml file for a specific node
		 * 
		 * @throws TransformerException - specifies exceptional condition occured in transformation process
		 */
		private static String nodeToString(Node node) throws TransformerException {
			StringWriter buf = new StringWriter();
			Transformer xform = TransformerFactory.newInstance().newTransformer();
			xform.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
			xform.transform(new DOMSource(node), new StreamResult(buf));
			return (buf.toString());
		}
		

	/**
	 * (not in use for this method)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
