<?xml version="1.0" encoding="UTF-8" ?>
<%@ page import="org.dhbw.imbit11.ApplicationConstants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<title><%=ApplicationConstants.PAGETITLE_PROFESSOR%></title>
<link rel="apple-touch-icon" sizes="57x57"
	href="images/favicons/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="114x114"
	href="images/favicons/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="72x72"
	href="images/favicons/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="144x144"
	href="images/favicons/logo144.png">
<link rel="apple-touch-icon" sizes="60x60"
	href="images/favicons/logo60.png">
<link rel="apple-touch-icon" sizes="120x120"
	href="images/favicons/logo120.png">
<link rel="apple-touch-icon" sizes="76x76"
	href="images/favicons/logo76.png">
<link rel="apple-touch-icon" sizes="152x152"
	href="images/favicons/logo152.png">
<link rel="icon" type="image/png" href="images/favicons/logo196.png"
	sizes="196x196">
<link rel="icon" type="image/png" href="images/favicons/logo160.png"
	sizes="160x160">
<link rel="icon" type="image/png" href="images/favicons/logo96.png"
	sizes="96x96">
<link rel="icon" type="image/png" href="images/favicons/logo16.png"
	sizes="16x16">
<link rel="icon" type="image/png" href="images/favicons/logo32.png"
	sizes="32x32">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-TileImage"
	content="images/favicons/logo144.png">
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.css" />
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.icon.css" />
<link rel="stylesheet" type="text/css"
	href="css/jquery.fancybox.css?v=2.1.5" media="screen" />
<link type="text/css" rel="stylesheet" href="css/master.css" />
<script type="text/javascript" src="js/frameworks/jquery-2.0.0.min.js"></script>
<script type="text/javascript" src="js/frameworks/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="js/frameworks/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript" src="js/frameworks/master.js"></script>

<!-- Overwriting Font -->
<link href="css/font.css" rel="stylesheet">
</head>
<body class="easyui-layout">
	<div class="north" data-options="region:'north',border:false">
		<div class="div-header window">
			<a id="logout" class="easyui-linkbutton" data-options="plain:true"
				onclick="window.location.href='LogoutUser'"><%=ApplicationConstants.LOGOUT_BUTTON_TEXT%></a>
			<a id="imprint" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.IMPRINT_BUTTON_TEXT%></a>
			<div class="welcome"></div>
		</div>
	</div>
	<div class="center" data-options="region:'center'" align="center" style="padding-left: 2%; padding-right: 2%">
		<h3>Welcome to brillianCRM</h3>
		<p>Please fill in the form below and hit the send button to
			register:</p>
		<p>Multiple addresses can be separated by ";".
		<p>
		<p style="color: red">${status}</p>

		<form action="SendRegistrationLink" method="post">
			<input type="text" name="link" maxlength="5000" value="${link}" style="display: none" />
			<textarea type="email" NAME="email" cols="75" ROWS="10" style="width: 400px; height: 150px" placeholder="Please fill in only valid e-mail adresses."></textarea>
			<br />
			<input id="sendRegistration" style="display: none" type="submit"
				value="Send registration link"></input> <a class="easyui-linkbutton"
				onclick="$('#sendRegistration').trigger('click')" style="margin-bottom: 10px">Send registration link</a>
		</form>

		<form action="${pageContext.request.contextPath}/Professor"
			method="post">
			<input id="backButton" style="display: none" type="submit"
				value="Back"><a class="easyui-linkbutton"
				onclick="$('#backButton').trigger('click')">Back</a>
		</form>
		<div class="mainEventContainerImprint easyui-window"
			data-options="closed:true,width:863,height:576"></div>
	</div>
</body>
<script type="text/javascript">
	$('body').show();
	$('#imprint').bind('click', function() {
		showImprint();
	});
</script>
</html>