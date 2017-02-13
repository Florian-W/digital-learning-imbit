package org.dhbw.imbit11.backend;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

/*added by Christopher Krah on 2016-03-03*/
public class PDFContent extends HttpServlet {
	static final long serialVersionUID = 1L;
	
	String contentType; //for now should be either "text", "image", "line"
	String contentStream;
	long positionLeft;
	long positionBottom;
	long fontNumber;
	long fontSize;
	double thickness;
	long startx;
	long starty;
	long endx;
	long endy;
	String color;
	
	PDFContent(String type, String stream, long posL, long posB, long fontN, long fontS, double thick, long startx, long starty, long endx, long endy, String color){
		this.contentType=type;
		this.contentStream=stream;
		this.positionLeft=posL;
		this.positionBottom=posB;
		this.fontNumber=fontN;
		this.fontSize=fontS;
		this.thickness=thick;
		this.startx=startx;
		this.starty=starty;
		this.endx=endx;
		this.endy=endy;
		this.color=color;
	}
	
	//getters
	
	public String getContentType() {
		return contentType;
	}

	public String getContentStream() {
		return contentStream;
	}

	public long getPositionLeft() {
		return positionLeft;
	}

	public long getPositionBottom() {
		return positionBottom;
	}

	public long getFontNumber() {
		return fontNumber;
	}
	
	public long getFontSize() {
		return fontSize;
	}

	public double getThickness() {
		return thickness;
	}

	public long getStartx() {
		return startx;
	}

	public long getStarty() {
		return starty;
	}

	public long getEndx() {
		return endx;
	}

	public long getEndy() {
		return endy;
	}
	
	public String getColor() {
		return color;
	}
}
