<?xml version="1.0" encoding="UTF-8" ?>
<%@ page import="org.dhbw.imbit11.ApplicationConstants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<title><%=ApplicationConstants.PAGETITLE_REGISTRATION%></title>
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


<link type="text/css" rel="stylesheet" href="css/master.css" />
 <script type="text/javascript" src="js/frameworks/jquery-2.0.0.min.js"></script>
<script type="text/javascript" src="js/frameworks/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/frameworks/master.js"></script>


<!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
 <!-- Custom Bootstrap CSS -->
    <link href="css/grayscale.css" rel="stylesheet">


    <!-- Custom Fonts -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">

 <!--Framework changes -->
<link href="css/changes-master.css" rel="stylesheet">
<link href="css/bootstrap-changes.css" rel="stylesheet">

<!-- Overwriting Font -->
     <link href="css/font.css" rel="stylesheet">

</head>

<body class="easyui-layout">
	<!--<div class="north" data-options="region:'north',border:false">
			<div class="div-header window">
				<a id="imprint" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.IMPRINT_BUTTON_TEXT%></a>			
			</div>
	</div> -->

	<div class="center studentHomepage" data-options="region:'center'">
		<div class="studentRegisterContainer" >
			<h3 style="text-transform:none;">Welcome to brillianICM</h3>
			<p>Please fill in the form below and hit the send button to register:</p>
			<p style="color:red">${status}</p>

			<form action="CreateUser" method="post">

			<input type="text" name="role" maxlength="50" value="student" style="display:none"/>
			<input type="text" name="groupnumber" maxlength="50" value="${groupnumber}" style="display:none"/> <!-- Needed to post the groupnumber -->

					<select class=" form-control" name="gender" id="gender" size="1" required>
			    	<option value="" disabled="disabled" selected="selected">Please select</option>
			    	<option value="m">Mr.</option>
			    	<option value="f">Mrs.</option>
				</select>

			 	<input type="text" name="firstname" class="form-control" maxlength="50" value="${firstname}" placeholder="First Name" required/>


			 	<input type="text" class="form-control" name="lastname" maxlength="50" value="${lastname}" placeholder="Last Name" required/>

			 	<input type="email" class="form-control" name="email" maxlength="50" value="${email}" placeholder="Email" required/>

				<input type="password" class="form-control" name="password" maxlength="50" placeholder="Password" required/>

			    <input type="password" class="form-control" name="password_repeat" maxlength="50" placeholder="Repeat Password" required/><br />


				<input style="display:none"  id="registrationButton" type="submit" value="Register now!"></input>
				<a class="btn btn-default" style="margin-left: auto; margin-right: auto" onclick="$('#registrationButton').trigger('click')">Register now!</a>
			<br/><br/>
			  <a href='login.jsp' style="margin: 0 auto;">Back to Login</a>

			</form>
		</div>
		<!--  <div class="mainEventContainerImprint easyui-window" data-options="closed:true,width:863,height:576"></div>-->
	</div>

</body>
<script type="text/javascript">
		$('body').show();
		$('#imprint').bind('click', function() {
			showImprint();
		});
</script>
</html>