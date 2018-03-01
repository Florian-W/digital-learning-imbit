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

### JDK 9
* install for example 64bit version from Oracle
* set the Environment Variables correctly: You need JAVA_HOME (e.g. C:\Program Files\Java\jdk-9.0.4), JRE_HOME (e.g. C:\Program Files\Java\jre-9.0.4) and include the directory to Java/bin into your path (e.g. C:\Program Files\Java\jre-9.0.4\bin quite in the beginning of path)
* check "java -version" in your command line (attention, when setting env variables, close and open the cmd terminal)
* if you have issues in Eclipse: check the preferences of Java Runtime Environment and/or remove other Java versions
 
### Maven 
* you need Maven to build the project in the command line
* download the ZIP file for Maven and extract the folder to your desired location, e.g. C:/Dev
* Include the Maven/bin directory into your path (e.g. C:\Dev\Maven-3.5.2\bin)
* check "mvn -v"
* how to "build" Eclipse projects: open cmd, go to the folder, where the project is located (e.g. C:\Users\username\git\digital-learning-imbit\brilliancrm) and type "mvn clean install" (clean is not always necessary, it reloads all Maven dependencies a.s.o.)
* Maven is also included in Eclipse Java EE, to build here: right click on project and go to "Maven" --> "Update project...". This creates the folder target (if not present) and within it a .war file

### MySQL database ###
* download the installer (google: Download MySQL Installer): (x86, 32-bit), MSI Installer, 18MB
* Follow the installation steps, install "server only", attention: remember your password!
* Create tables...: Go to the GitHub Repo to resources and save and use the CreateDBbrillianxxx.sql files by using the source command in MySQL, e.g. by: source C:/Dev/CreateCBbrillianCRM.sql

### Tomcat
* Go to Apache Tomcat download section, e.g. download the 9.0.4 Windows 64bit ZIP
* Extract to desired location, e.g. C:/Dev
* set CATALINA_HOME variable to Tomcat folder (e.g. C:/Dev/Tomcat9 ) and test starting Tomcat by executing bin/startup.bat 
* edit the file tomcat-user.xml: in Tomcat/conf and add the following:
```
	<role rolename="manager-gui"/>
	<role rolename="manager-script"/>
	<user username="tomcat" password="password" roles="manager-gui,manager-script"/>
```

### Eclipse IDE for Java EE developers
* same bit version as your Java, so 64bit
* install the Eclipse Web Developer Tools
* add your Tomcat server to your Eclipse environment (e.g. in Window-->Preferences-->Server-->Runtime Environments), if it is not present: install Eclipse Java EE Developer Tools, you also need: Eclipse Java Web Developer Tools
* check whether you can "Run As" --> "Run on Server" (when right clicking on brilliancrm or brillianicm projects in Eclipse)

### XAMPP or single installations of Apache HTTP Server and PHP
* e.g. versions Apache 2.2 and PHP7
* Edit your php.ini file (find it in PHP folder, eg. C:\xampp\php)
Change short_open_tag from "Off" to On
```
short_open_tag=On
```
Remove semicolon before extension, where something like xsl or php_xsl is defined
```
extension=xsl
```

* Run your app on Apache: Copy the folder brillianIDEAS from C:/Users/username/git/digital-learning-imbit (or whereever you have your git repository) to the htdocs folder of Apache (in XAMPP: C:/xampp/htdocs), start Apache and open localhost/brillianIDEAS in browser


### Special: Java environment variables on macOS (similar to other Unix/Linux systems)

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

Copy the URL in GitHub by clicking on "Clone or Download". Open the Git Perspective in Eclipse. Right click on the left side and choose "Paste the Repository Path or URI". It will prompt some windows, just finish (select all branches). The download takes several minutes, depending on your internet connection (do it at home, eduroam is slow!) and consumes around 5.3 GB.
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
* OTHER ways: right click in Eclipse, go to "Maven" -->"Update projects..." OR open command line, go to project folder and run "mvn clean install"   --> The WAR file is for example C:\Users\username\git\digital-learning-imbit\brilliancrm\target\brilliancrm-2.0.0-SNAPSHOT.war

ATTENTION: the files are around 70MB (brilliancrm) and 1.3GB (brillianicm), please check the content, it needs several .jar files in /WEB-INF/lib (important: mysql-connector, shiro-web, shiro-core,...)

## Set up Tomcat and deploy the .WAR file


Deployment of the war files: Stop Tomcat and copy the file to the tomcat/webapps folder, then start Tomcat (it also workes in running Tomcat). The option autoDeploy=true will deploy the files automatically. If not, go to the manager (IP:8080/manager/html) and click on the button start in the table row of the webapp that did not deploy automatically.

  		
The following passwords are used in the GitHub files:

MySQL: brillianicm   icm@IMBIT

MySQL: brilliancrm   crm@IMBIT

public/admin/dozent/student@brillianicm.com:    Hbru

public/admin/dozent/student@brilliancrm.com:	Hbru

Change the passwords afterwards!!! See the CreateCB*.sql files and the context.xml files.

		
## Deployment of brillianIDEAS in Apache HTTP Server

Deployment here simply means: copy the folder from your git folder to the folder htdocs, start Apache and go to localhost/foldername:
* Copy the folder brillianIDEAS from C:/Users/username/git/digital-learning-imbit (or whereever you have your git repository) 
* Copy to the htdocs folder of Apache (in XAMPP: C:/xampp/htdocs), 
* start Apache 
* open localhost/brillianIDEAS in browser

