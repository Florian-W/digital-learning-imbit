<?xml version="1.0" encoding="UTF-8" ?>
<%@ page import="org.dhbw.imbit11.ApplicationConstants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<!-- <html xmlns="http://www.w3.org/1999/xhtml"  style="width:100%; margin:0; padding:0 ">-->
<head>
<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
<title><%=ApplicationConstants.PAGETITLE_LOGIN%></title>
<link rel="apple-touch-icon" sizes="57x57" href="images/favicons/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="114x114" href="images/favicons/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="72x72" href="images/favicons/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="144x144" href="images/favicons/logo144.png">
<link rel="apple-touch-icon" sizes="60x60" href="images/favicons/logo60.png">
<link rel="apple-touch-icon" sizes="120x120" href="images/favicons/logo120.png">
<link rel="apple-touch-icon" sizes="76x76" href="images/favicons/logo76.png">
<link rel="apple-touch-icon" sizes="152x152" href="images/favicons/logo152.png">
<link rel="icon" type="image/png" href="images/favicons/logo196.png" sizes="196x196">
<link rel="icon" type="image/png" href="images/favicons/logo160.png" sizes="160x160">
<link rel="icon" type="image/png" href="images/favicons/logo96.png" sizes="96x96">
<link rel="icon" type="image/png" href="images/favicons/logo16.png" sizes="16x16">
<link rel="icon" type="image/png" href="images/favicons/logo32.png" sizes="32x32">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-TileImage" content="images/favicons/logo144.png">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   
   <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">


    <!-- Custom CSS -->
    <link href="css/grayscale.css" rel="stylesheet">
    <link href="css/bootstrap-changes.css" rel="stylesheet"> 
    
       <!-- Overwriting Font -->
     <link href="css/font.css" rel="stylesheet">
    

<!-- <link type="text/css" rel="stylesheet" href="css/jquery.easyui.css" />
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.icon.css" />
<link rel="stylesheet" type="text/css"
	href="css/jquery.fancybox.css?v=2.1.5" media="screen" />
<link type="text/css" rel="stylesheet" href="css/master.css" /> -->

<!-- Imprint function -->
<!--  <script type="text/javascript">
	$(document).ready(function(){
		$('body').show();
		$('#imprint').bind('click', function() {
			showImprint();
		});
	});
</script>-->

<!--Framework JS -->
	<script type="text/javascript" src="js/frameworks/jquery-2.0.0.min.js"></script>
	<script type="text/javascript" src="js/frameworks/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/frameworks/jquery.fancybox.pack.js?v=2.1.5"></script>
	<script type="text/javascript" src="js/frameworks/jquery.easing.min.js"></script>
	<script type="text/javascript" src="js/frameworks/bootstrap.min.js"></script>

	
	<!--Custom JS -->	
	<script type="text/javascript" src="js/master.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript" src="js/events.js"></script>
	<script type="text/javascript" src="js/serverFunctions.js"></script>
	<script type="text/javascript" src="js/grayscale.js"></script>

	<!-- EDIT BY EANGEL ON FEB 17, 2016 -->
	<!-- Text nicht mehr zentriert, sondern linksbündig darstellen -->
	<style>
		.col-lg-8.col-lg-offset-2 {
		    text-align: left;
		    margin-left: 40px;
		    width: 100%;
		}
		
		.btn-default {
		    border: 1px solid black;
		    color: black;
		    background-color: hsl(30,90%,50%);
		    margin-top: 10px;
		    margin-right: 255px;
		}
		
		table a:not(.btn), .table a:not(.btn) {
		    text-decoration: underline;
		    margin-right: 40%;
		}
		
		element.style {
		    padding-right: 245px;
		}
		
		/*
		.container{   
			margin-left:0px;
		}
		*/
	     
		@media (min-width: 767px)
		.content-section {
		    padding-top: 220px;
		}
	</style>
	<!-- End of line -->
</head>
<body  id="page-top"  data-spy="scroll" data-target=".navbar-fixed-top">
	<script type="text/javascript" src="js/frameworks/wz_tooltip.js"></script>
    <!-- Navigation -->
       <nav class="navbar navbar-custom navbar-fixed-top" role="navigation" >
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                    <i class="fa fa-bars"></i>
                </button>
                <a class=" page-scroll" href="#page-top">
                
                    <div style="width:120px;"> <img src="img/logo_klein.png" alt="" style="width:100%">  </img></div>
                </a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <!-- EDIT BY EANGEL ON FEB 17, 2016 -->
            <!-- Removing the About, Imprint and Contact buttons -->
            <div class="collapse navbar-collapse navbar-right navbar-main-collapse">
                <ul class="nav navbar-nav">
                    <!-- Hidden li included to remove active class from about link when scrolled up past about section -->
                    <!-- 
                    <li class="hidden">
                        <a href="#page-top"></a>
                    </li>
                     
                    <li>
                        <a class="page-scroll" href="#about">About</a>
                    </li>
                     <li>
                      <a class="page-scroll" href="#imprint">Imprint</a>
                    </li>
                   
                    <li>
                        <a class="page-scroll" href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
            -->
            <!-- /.navbar-collapse -->
        <!-- </div> -->
        <!-- End of line -->
        <!-- /.container -->
    </nav>

    
   <header class="intro">
        <div class="intro intro-body">
            <div class="container">
            
             <div class="row">
                    <div class="col-md-8">
                        <h1 class="brand-heading" style="text-transform:none; text-align: left;"></h1>
                        <p class="intro-text" style="text-align: center;">The Management Game for Your<br> Intercultural Competencies</p>
                       
                       
                    </div>
                </div>
            
        
       <p style="color: red; text-align: left;">${error}</p>
       		<!-- EDIT BY MANH ON MAR 7, 2016 -->
       		<!-- Remove the old login section -->
       		   
             <form action="LoginUser" method="post" >
             <!--  
			<table style="width:30%; bottom:0px; padding:0; text-align:center">
			<tr>
				<td><input class="form-control" type="text" name="username" maxlength="50"  placeholder="Email"/></td>
			</tr>
			
			<tr>
				<td><input class="form-control" type="password" name="password" maxlength="50" placeholder="Password" /></td>
			</tr>
			
			<tr >
				<td><input class="btn btn-default"  type="submit"
					name="submit" value="Login" /></td>
			</tr>
			<tr>
				<td align="right" style="padding-right: 28px;">
					<a class="login" href='resetpw.jsp'>Forgot your password?</a>
				</td>
			</tr>
			<tr>
				<td align="right" style="padding-right: 28px;">
					<a class="login" href='/Registration?g=000' >Register</a>
				</td>				
			</tr>
		</table>
        -->
        <!-- End of line -->
             
             <!-- EDIT BY MANH ON MAR 7, 2016 -->
             <!-- Redesign of the login screen -->
		<table style="width:30%; bottom:0px; padding:0; text-align:center">
			<tr>
				<td><input class="form-control" type="text" name="username" maxlength="50"  placeholder="Email"/></td>
			</tr>
			
			<tr>
				<td><input class="form-control" type="password" name="password" maxlength="50" placeholder="Password" /></td>
			</tr>
			
			<tr >
				<td><input class="btn btn-default"  type="submit"
					name="submit" value="Login" style="width:100%"/></td>
			</tr>
			<tr>
				<td align="left">
					<a class="login" href='resetpw.jsp'>Forgot your password?</a>
				</td>
			</tr>
			<tr>
				<td align="left">
					<a class="login" href="${pageContext.request.contextPath}/Registration?g=000">Register</a>
				</td>
			</tr>
			<tr>
				<td align="left">
					<a class="login" href="badges/badgeAbout.html">More about about open badges</a>
				</td>
			</tr>
		</table>
			<!-- End of line -->
		
		</form>
      </div>  
   </div>     
    </header>
        
   <!-- About Section -->
   <!-- Update 05.03.16 von Tanja: Von Herrn Mayr genehmigtes Update von About und Imprint eingefügt. -->
   <!-- Letzte Änderung 20.03.16 von Tanja: Update Inhalt in Imprint.jsp und Login.jsp -->
   
    <section id="about" class="container content-section text-center">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2">
                <h3>The brillianCRM and brillianICM Serious Games &ndash; How Brilliant Are You?</h3>
                

<p>In spring 2014, the WIMBIT11B class of IMBIT at the Baden-Wuerttemberg Cooperative State University in Mannheim developed brillianCRM, a serious game about project management, as part of a lecture by Prof. Bendl and Prof. Mayr.
In the subsequent academic year, the WIMBIT12C class enhanced and polished brillianCRM and the WIMBIT12A,B classes started brillianICM, a new serious game about intercultural competencies based on the same game engine.
Another year passed and after 3 months of development and testing, the WIMBIT13C students are proud to present an improved next generation brillianICM with new countries and new features. <p>

<p>Our games are web-based and run in modern browsers including those on mobile devices. Good luck with our games and have fun!<p>

<p>The IMBIT study course at DHBW Mannheim was invited to the Games and Learning Alliance conference, Rome, December 2015. Frauke Mörike, academic research assistant at IMBIT, presented »The Double-Effect Approach to Serious Games in Higher Education: Students Designing and Developing Serious Games for Other Students«.
Please feel free to contact IMBIT, if you are working in the field of education and are interested in a cooperation.<p>

<h3>We, the WIMBIT 13C course, are proud to present our game:</h3>

<img src="../images/Gruppenfotos/Gruppenbild_About.png" style="width:100%">
Anil Balci, Franziska Müller, Marvin Diehl, Annalena von Rhein, Sophie Hagemann, Sabrina Weniger, Christian Marheine, Viviane Schmidt, Lena Bauer, Eansalatta Ravindren, Prof. Dr. Harald Bendl, Anne Heister, Kristin Köfler, Jennifer Malz, Robyn Dedmon, Max Kossielny, Philipp Klüter, Tanja Henkel, Yannik Riedl, Jonas Bender, Nikolas Krybus, Cora Albert, Arnold Roth, Felix Schüch, Manh Phi Nguyen, Adrian Bettag, Jan Scheerer, Florian Menzel, Astrid Beutel, Julia Hain, Christopher Krah, Joana Haase, Anastasia Reimer, Christian Heyer, Aline Ulrich, Prof. Peter Mayr
</div>
            </div>
    </section>
    
    
    <!-- Imprint Section -->
    <section id="imprint" class="container content-section text-center">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2">
                <h3>Impressum</h3>
	<div>
		Studiengang IMBIT, DHBW Mannheim
		<a href = "http://www.imbit.dhbw-mannheim.de/" target="_blank" >www.IMBIT.dhbw-mannheim.de</a> <br />
		Prof. Dr. Harald Bendl, harald.bendl@dhbw-mannheim.de<br />
		Coblitzallee 1 &ndash; 9, D-68163 Mannheim<br />
		Tel. +49 621 4105-1719, Fax -1289
	</div>
	<p>
	<h3>Haftungsausschluss</h3>
	<p>Der Autor &uuml;bernimmt keine Gew&auml;hr f&uuml;r die Aktualit&auml;t, Richtigkeit und Vollst&auml;ndigkeit der bereitgestellten Informationen auf den brillianICM-Webseiten. Haftungsanspr&uuml;che gegen den Autor, welche sich auf Sch&auml;den materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollst&auml;ndiger Informationen verursacht wurden, sind grunds&auml;tzlich ausgeschlossen, sofern seitens des Autors kein nachweislich vors&auml;tzliches oder grob fahrl&auml;ssiges Verschulden vorliegt.<br>
	Alle Angebote sind freibleibend und unverbindlich. Der Autor beh&auml;lt es sich ausdr&uuml;cklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ank&uuml;ndigung zu ver&auml;ndern, zu erg&auml;nzen, zu l&ouml;schen oder die Ver&ouml;ffentlichung zeitweise oder endg&uuml;ltig einzustellen.</p>
	
	
	<h3>Informationen über Cookies</h3>


<p>Zur Optimierung unseres Internetauftritts setzen wir Cookies ein. Es handelt sich dabei um Textdateien, die im Speicher Ihres Computers gespeichert werden. Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen. Das Speichern von Cookies können Sie verhindern, indem Sie in den Einstellungen ihres Browsers "Cookies blockieren" wählen. Dies kann aber eine Funktionseinschränkung unserer Website zur Folge haben.</p>
 
	
<h3>Auskunft</h3>
<p>Nach dem Bundesdatenschutzgesetz haben Sie das Recht auf eine unentgeltliche Auskunft über Ihre gespeicherten Daten. Zudem haben Sie ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Fragen hierzu können Sie über die im Impressum angegebenen Kontaktdaten stellen.</p>
	
	
	<h3>Urheberrecht</h3>
	<p>Der Autor ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Bilder, Grafiken, Tondokumente, Videosequenzen und Texte zu beachten, von ihm selbst erstellte Bilder, Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zur&uuml;ckzugreifen.<br>
	Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte gesch&uuml;tzten Marken- und Warenzeichen unterliegen uneingeschr&auml;nkt den Bestimmungen des jeweils g&uuml;ltigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigent&uuml;mer. Allein aufgrund der blo&szlig;en Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter gesch&uuml;tzt sind.<br>
	Das Copyright f&uuml;r ver&ouml;ffentlichte, vom Autor selbst erstellte Objekte bleibt allein beim Autor der Seiten. Eine Vervielf&auml;ltigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdr&uuml;ckliche Zustimmung des Autors nicht gestattet.</p>
	
	
	<h3>Datenschutz</h3>
	<p>Sofern auf den brillianICM-Webseiten die M&ouml;glichkeit zur Eingabe pers&ouml;nlicher oder gesch&auml;ftlicher Daten wie E-mail-Adressen, Namen, Kennworten oder dergleichen besteht, so erfolgt die Preisgabe dieser Daten seitens des Nutzers auf ausdr&uuml;cklich freiwilliger Basis. Die Nutzung der im Rahmen des Impressums oder vergleichbarer Angaben ver&ouml;ffentlichten Kontaktdaten wie Postanschriften, Telefon- und Faxnummern sowie Emailadressen durch Dritte zur &uuml;bersendung von nicht ausdr&uuml;cklich angeforderten Informationen ist nicht gestattet. Rechtliche Schritte gegen die Versender von sogenannten Spam-Mails bei Verst&ouml;&szlig;en gegen dieses Verbot sind ausdr&uuml;cklich vorbehalten.</p>
	
	<h3>Anwendbares Recht </h3>
	<p> Es gilt ausschlie&szlig;lich das ma&szlig;gebliche Recht der Bundesrepublik Deutschland. Diese Nutzungshinweise sind als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite verwiesen wurde. </p>
	<hr />
	
	<h3>Angaben zum Copyright</h3>
	<a href = "http://tomcat.apache.org/" target="_blank" >Apache Tomcat</a>, <a href = "http://shiro.apache.org/" target="_blank" >Apache Shiro</a>, <a href = "http://www.mysql.com/" target="_blank" >mySQL</a> <a href = "http://dev.mysql.com/downloads/connector/j/5.0.html" target="_blank" >inkl. JDBC Adapter</a>,
	<a href = "http://commons.apache.org/proper/commons-io/" target="_blank" >Apache Commons IO</a>, <a href = "http://jquery.com/" target="_blank" >jQuery</a>, <a href = "http://www.jeasyui.com/" target="_blank" >jQuery EasyUI</a> und <a href = "http://fancybox.net/" target="_blank" >fancybox</a> <a href= "https://www.yworks.com/de/products_ydoc.html" target= "_blank">yWorks UML Doclet</a>.
	Die verwendeten Icons wurden von <a href="http://www.freepik.com" title="Freepik" target="_blank" >Freepik</a> entworfen und k&ouml;nnen von <a href="http://www.flaticon.com" title="Flaticon" target="_blank" >Flaticon</a> kostenlos heruntergeladen werden.
	Zusätzlich wurden Bilder von
	<a href = "http://www.commons.wikimedia.org/" target="_blank" >Wikimedia</a>,
	<a href = "http://www.flickr.com/" target="_blank" >Flickr</a>,
	<a href = "http://rugby.com/" target="_blank" >Pixabay</a>,
	<a href = "http://zimbio.com/" target="_blank" >Zimbio</a>,
	<a href = "http://disovermagazine.com/" target="_blank" >DisoverMagazine</a>,
	<a href = "http://wikipedia.org/" target="_blank" >Wikipedia</a>,
	<a href = "http://wordpress.com/" target="_blank" >Wordpress</a>,
	<a href = "http://planetdeadly.com/" target="_blank" >PlanetDeadly</a>,
	<a href = "http://lifeinthefastlane.com/" target="_blank" >Lifeinthefastlane</a> bezogen.
	<hr />
	
	<%
	/* Read brillianCRM version from path of servlet.*/ 
	ServletContext sc = getServletContext();
	String scRealPath = sc.getRealPath("/");
	String[] scRealPathSplit = scRealPath.split("#");
	String versionID = scRealPathSplit[scRealPathSplit.length-1];
	versionID = versionID.substring(0, versionID.length()-1);
	 %> 
	<!-- Dies ist der Code zu einem Easter Egg in der Imprint.jsp
	<p id="versionID" align="right" onClick="hero()"> <%= versionID %> </p>-->
              
            </div>
        </div>
    </section>
    
  

    <!-- Contact Section -->
    <section id="contact" class="container content-section text-center">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2">
                <h2>Contact BrillianICM Team</h2>
                <p>Feel free to email us to provide some feedback on our game, or to just to say hello!</p>
                <p><a href="mailto:HowBrillianAreYou">HowBrillianAreYou@brillianICM.com</a>
                </p>
              <!--  <ul class="list-inline banner-social-buttons">
                    <li>
                        <a href="https://twitter.com/SBootstrap" class="btn btn-default btn-lg"><i class="fa fa-twitter fa-fw"></i> <span class="network-name">Twitter</span></a>
                    </li>
                     <li>
                        <a href="https://github.com/IronSummitMedia/startbootstrap" class="btn btn-default btn-lg"><i class="fa fa-github fa-fw"></i> <span class="network-name">Github</span></a>
                    </li>
                    <li>
                        <a href="https://plus.google.com/+Startbootstrap/posts" class="btn btn-default btn-lg"><i class="fa fa-google-plus fa-fw"></i> <span class="network-name">Google+</span></a>
                    </li>
                </ul> -->
            </div>
        </div>
    </section>

    <!-- Map Section -->
 <!--<div id="map"></div>  -->  
 
</body>
 
</html>