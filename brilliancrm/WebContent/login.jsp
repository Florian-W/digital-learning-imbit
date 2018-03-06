<?xml version="1.0" encoding="UTF-8" ?>
<%@ page import="org.dhbw.imbit11.ApplicationConstants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"  style="width:100%; margin:0; padding:0 ">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><%=ApplicationConstants.PAGETITLE_LOGIN%></title>
<link rel="apple-touch-icon" sizes="57x57" href="images/favicons/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="114x114" href="images/favicons/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="72x72" href="images/favicons/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="144x144" href="images/favicons/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="60x60" href="images/favicons/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="120x120" href="images/favicons/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="76x76" href="images/favicons/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="152x152" href="images/favicons/apple-touch-icon-152x152.png">
<link rel="icon" type="image/png" href="images/favicons/favicon-196x196.png" sizes="196x196">
<link rel="icon" type="image/png" href="images/favicons/favicon-160x160.png" sizes="160x160">
<link rel="icon" type="image/png" href="images/favicons/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="images/favicons/favicon-16x16.png" sizes="16x16">
<link rel="icon" type="image/png" href="images/favicons/favicon-32x32.png" sizes="32x32">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-TileImage" content="images/favicons/mstile-144x144.png">
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.css" />
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.icon.css" />
<link rel="stylesheet" type="text/css"
	href="css/jquery.fancybox.css?v=2.1.5" media="screen" />
<link type="text/css" rel="stylesheet" href="css/master.css" />
<script type="text/javascript" src="js/jquery-2.0.0.min.js"></script>
<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/master.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		$('body').show();
		$('#imprint').bind('click', function() {
			showImprint();
		});
	});
</script>
</head>
<body class="loginContainer" style="width:100%; margin:0; padding:0 ">
<div style="overflow:visible; height:auto; position:relative; min-width:800px; margin:0; padding:0 ">
	<a id="imprint" class="easyui-linkbutton" data-options="plain:true" style="position:absolute; z-index:1 ;  right:5px; top: 5px;"><%=ApplicationConstants.IMPRINT_BUTTON_TEXT%></a>
	<img src="images/locationBackgrounds/login_background.png"  style="z-index:0; width:100%;   margin:0; padding:0"/>
	<div style="float:left; min-width:800px; width:95%; z-index:1;  position:absolute; top:50%; margin-top:-7em">
		<!-- <img src="images/Logo_FINAL.PNG" align="middle" style="height:10%; width:15%; padding-left:9%; padding-top:5%; padding-bottom:5%"/>-->
		<p style="color: red; padding-left: 32px;">${error}</p>
		<form action="LoginUser" method="post" >
			<table style="width:33%; float:left; bottom:0px; margin:0; padding:0; text-align:center">
			<tr>
				<td><input type="text" name="username" maxlength="50" style="width:90%;" placeholder="Email"/></td>
			</tr>
			<tr>
				<td><input type="password" name="password" maxlength="50" style="width:90%;" placeholder="Password" /></td>
			</tr>
			<tr >
				<td><input type="submit"
					name="submit" value="Login" style="width:90%; margin:0; padding:0; -moz-box-sizing: content-box;
    			-webkit-box-sizing: content-box; box-sizing: content-box;
    padding: 0;"/></td>
			</tr>
			<tr>
				<td align="right" style="padding-right: 28px;">
					<a class="login" href='resetpw.jsp'>Forgot your password?</a>
				</td>
			</tr>
			<tr>
				<td align="right" style="padding-right: 28px;">
					<a class="login" href='${pageContext.request.contextPath}/Registration?g=000' >Register</a>
				</td>				
			</tr>
			<tr>
				<td align="right" style="padding-right: 28px;">
					<a class="login" href="http://vimeo.com/96179581" target="_blank">Teaservideo</a>
				</td>				
			</tr>
		</table>
		</form>
	</div>
</div>
<div class="mainEventContainerImprint easyui-window" data-options="closed:true,width:863,height:576"></div>
</body>
</html>