# Development Setup Guide

This guide is optimized for setting up the development environment in Eclipse with JDK9 and Tomcat 8.5 or Tomcat 9.

## Description of the projects

The repository consists of three projects:
* brillianIDEAS
* brillianCRM
* brillianICM
brillianCRM and brillianICM are Serious Games, that are built with Java, Servlets and Java Server Pages and run in a Tomcat container.
brillianIDEAS is built in HMTL, JavaScript and jQuery and runs on an Apache HTTP Server.


## Prerequisites

In order to develop for these projects, it is recommended to install/configure the following:
* Pay attention to the Java version: 32bit and 64bit! See "java -version" in command line
* JDK 9 (don't forget to set the Environment Variables correctly)
* Eclipse IDE for Java EE developers (same bit version as your Java)
* Maven (if you want to build the project in the command line)
* XAMPP or LAMP or single installations of Apache HTTP Server, Tomcat, MySQL 


## Import GitHub Repository in Eclipse

Copy the URL in GitHub by clicking on "Clone or Download". Open the Git Perspective in Eclipse and choose this. Right click on the left side and choose "Paste the Repository Path or URI". It will prompt some windows, just finish (select all branches).
When the cloning is finished, right click on the folder and choose "Import projects". 
* In case you use a different version of Java: go to Project --> Properties --> Java Build Path and change the Java Library/ dependency/ classpath here.

## Export .WAR Files for Tomcat

When the projects are imported into Eclipse, the projects can be exported as .WAR files and deployed on a Tomcat Server:
* Right click on the project and click on Export
* Go to "Web" and "WAR file"
* Select the correct project name and a destination on your computer

## Set up Tomcat and deploy the .WAR file


Deployment of the war files: Stop Tomcat and copy the file to the tomcat/webapps folder, then start Tomcat. The option autoDeploy=true will deploy the files automatically. If not, go to the manager (IP:8080/manager/html) and click on the button start in the table row of the webapp that did not deploy.

  		
The following passwords are used in the GitHub files:
Login to 										User						Passwort
MySQL: brillianicm								brillianicm					icm@IMBIT
MySQL: brilliancrm								brilliancrm					crm@IMBIT
public/admin/dozent/student@brillianicm.com		*@brillianicm.com			Hbru
public/admin/dozent/student@brilliancrm.com		*@brilliancrm.com			Hbru
Change the passwords afterwards!!! See the CreateCB*.sql files and the context.xml files.

		


```
Give examples
```