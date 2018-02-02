# Development Setup Guide

This guide is optimized for setting up the development environment in Eclipse with JDK9 and Tomcat 8.5 or Tomcat 9.

## Description of the projects

The repository consists of three projects:
* brillianIDEAS
* brillianCRM
* brillianICM

brillianCRM and brillianICM are Serious Games, that are built with Java, Servlets and Java Server Pages and run in a Tomcat container. In order to develop and test these projects, you need the following: Eclipse (or other Dev software), JDK9, Tomcat (8.5 or 9), MySQL database (e.g. 5.7, attention: not MariaDB!!!) and Maven.

brillianIDEAS is built in HMTL, JavaScript and jQuery and runs on an Apache HTTP Server. In order to develop and test this project, you need the following: Eclipse (or other Dev software), Apache HTTP Server and PHP. The latter two are included in XAMPP.
Unfortunately, XAMPP includes Tomcat7 and MariaDB, 


## Prerequisites

In order to develop for these projects, it is recommended to install/configure the following:

Pay attention to the Java version: 32bit and 64bit! See "java -version" in command line

JDK 9
* install for example 64bit version from Oracle
* set the Environment Variables correctly: You need JAVA_HOME, JRE_HOME and include the directory to Java/bin into your path
* check "java -version" in your command line (attention, when setting env variables, close and open the cmd terminal)
 
Eclipse IDE for Java EE developers 
* same bit version as your Java, so 64bit
* install the Eclipse Web Developer Tools
* add your Tomcat server to your Eclipse environment

Maven 
* you need Maven to build the project in the command line
* download the ZIP file for Maven and extract the folder to your desired location, e.g. C:/Dev
* Include the Maven/bin directory to your path
* check "mvn -v"

XAMPP or single installations of Apache HTTP Server and PHP
* e.g. versions Apache 2.2 and PHP7

MySQL database
* download the installer (google: Download MySQL Installer): (x86, 32-bit), MSI Installer, 18MB
* Follow the installation steps, install "server only", attention: remember your password!
* Create tables...: Go to the GitHub Repo to resources and save and use the CreateDBbrillianxxx.sql files by using the source command in MySQL, e.g. by: source C:/Dev/CreateCBbrillianCRM.sql

Tomcat
* Go to Apache Tomcat download section, e.g. download the 9.0.4 Windows 64bit ZIP
* Extract to desired location, e.g. C:/Dev
* set CATALINA_HOME variable and test starting Tomcat by executing bin/startup.bat 

### Java environment variables on macOS

There is no GUI to create or edit environment variables on macOS. One way is by editing ".bash_profile".
* Open Terminal.app and type `$ open -a TextEdit .bash_profile`
* Add the following lines to the file and save it (the second path may vary on your installation)
```
export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$PATH:/Library/Java/JavaVirtualMachines/jdk-9.0.4.jdk/Contents/Home
```
* restart Terminal.app OR switch back to it and type `$ source .bash_profile`
* type `$ printenv` to see all environment variables or `$ echo $VARNAME` for a specific one

## Import GitHub Repository in Eclipse

Copy the URL in GitHub by clicking on "Clone or Download". Open the Git Perspective in Eclipse and choose this. Right click on the left side and choose "Paste the Repository Path or URI". It will prompt some windows, just finish (select all branches).
When the cloning is finished, right click on the folder and choose "Import projects". 

* In case you use a different version of Java: go to Project --> Properties --> Java Build Path and change the Java Library/ dependency/ classpath here.
* When importing is finished, you see three new projects: digital-learning-imbit, brilliancrm, brillianicm
* The project digital-learning-imbit contains three "folders", the content for brillianIDEAS, and the two Maven projects brilliancrm and brillianicm.
* digital-learning-imbit is NO Maven project and is NOT available to run in Tomcat, because some PHP code is executed.

## Export .WAR Files for Tomcat

When the projects are imported into Eclipse, the projects can be exported as .WAR files and deployed on a Tomcat Server:

* Right click on the project (either brilliancrm or brillianicm) and click on Export
* Go to "Web" and "WAR file"
* Select the correct project name and a destination on your computer

ATTENTION: the files are around 70MB (brilliancrm) and 1.3GB (brillianicm), please check the content, it needs some .jar files in /WEB-INF/lib.

## Set up Tomcat and deploy the .WAR file


Deployment of the war files: Stop Tomcat and copy the file to the tomcat/webapps folder, then start Tomcat. The option autoDeploy=true will deploy the files automatically. If not, go to the manager (IP:8080/manager/html) and click on the button start in the table row of the webapp that did not deploy.

  		
The following passwords are used in the GitHub files:

MySQL: brillianicm   icm@IMBIT

MySQL: brilliancrm   crm@IMBIT

public/admin/dozent/student@brillianicm.com:    Hbru

public/admin/dozent/student@brilliancrm.com:	Hbru

Change the passwords afterwards!!! See the CreateCB*.sql files and the context.xml files.

		
