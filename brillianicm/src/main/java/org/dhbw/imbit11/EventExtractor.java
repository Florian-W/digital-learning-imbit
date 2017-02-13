package org.dhbw.imbit11;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.net.URL;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

import org.dhbw.imbit11.backend.UserRealm;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;
/**
 * @author Erik
 * Depending on the request one ore more nodes of the game tree  are returned as a string
 * For this purpose the class generates a XPath for the particular request and
 * sends it to the game tree
 * 
 */
public class EventExtractor {

	String node = "Node not found.";
	static File masterfile = null;

	public EventExtractor() {
		// Calculate absolute workspace path
		try {
			URL urlToFile = this.getClass().getResource("masterfile.xml");
			masterfile = new File(urlToFile.toURI());
		} catch (Exception e) {
			System.err.println("Error loading masterfile.xml");
		}
	}

/*	public String getNode(String level, String element) {
		// search with level and element
		String expression = "/events/event[@level ='" + level
				+ "' and @option ='" + element + "']*//*";

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
	}*/

	public String getNode(String uniqueId) {
		String nodeAsString = "";
		Node node = null;
		try {
			node = getEventAsNode(uniqueId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			nodeAsString = nodeToString(node);
		} catch (TransformerException e) {
			e.printStackTrace();
			}
		return nodeAsString;
	}

	public String getNode(String uniqueId, String userid) {
		String nodeAsString = "";
		Node node = null;
		try {
			node = getEventAsNode(uniqueId);
			if (node.getAttributes().getNamedItem("id").getNodeValue().equalsIgnoreCase("l000e000")) markVisitedCountries(node, userid);
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			nodeAsString = nodeToString(node);
		} catch (TransformerException e) {
			e.printStackTrace();
		}
		return nodeAsString;
	}

		protected String getMails(String path){
		String nodes = "";
		String[] ids =path.split(";");
		for(String id : ids){
			String node = getNode(id);
			if(node.contains("eventtype=\"1\"")){
				nodes += node;
			}
		}
		return nodes;
	}
	
	protected String getMailDrafts(String path){
		String nodes = "";
		String[] ids =path.split(";");
		for(String id : ids){
			String node = getNode(id);
			if(node.contains("eventtype=\"2\"")){
				nodes += node;
			}
		}
		return nodes;
	}

	private static Node getEventAsNode(String uniqueId) throws Exception{
		// calls node from masterfile according to unique ID
		String expression = "/events/event[@id = '" + uniqueId + "']";
		DocumentBuilderFactory factory = DocumentBuilderFactory
				.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.parse(masterfile);
		XPathFactory xPathfactory = XPathFactory.newInstance();
		XPath xpath = xPathfactory.newXPath();
		XPathExpression expr = xpath.compile(expression);
		NodeList nodelist = (NodeList) expr.evaluate(doc,XPathConstants.NODESET);
		return nodelist.item(0);
	}

	private static String nodeToString(Node node) throws TransformerException {
		StringWriter buf = new StringWriter();
		Transformer xform = TransformerFactory.newInstance().newTransformer();
		xform.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
		xform.transform(new DOMSource(node), new StreamResult(buf));
		return (buf.toString());
	}

	private static void markVisitedCountries(Node node, String userid){
		Pattern p = Pattern.compile("l[1-7]{1}");
		UserRealm userRealm = new UserRealm();
		ArrayList<String> visitedCountries = userRealm.getVisitedCountries(userid);
		NodeList children = node.getChildNodes();
		for (int i = 0; i < children.getLength(); i++)
		{
			Node currentItem = children.item(i);
			if(currentItem.getNodeName().equalsIgnoreCase("option")){
				String href = currentItem.getAttributes().getNamedItem("href").toString();
				Matcher m = p.matcher(href);
				if (m.find()) {
					Element e = (Element) currentItem;
					if (visitedCountries.contains(m.group(0))){
						e.setAttribute("completed","true");
					}
					else{
						e.setAttribute("completed","false");
					}
				}
			}
		}
	}
}
