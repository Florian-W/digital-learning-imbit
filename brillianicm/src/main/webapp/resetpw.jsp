<?xml version="1.0" encoding="UTF-8" ?>
<%@ page import="org.dhbw.imbit11.ApplicationConstants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<title><%=ApplicationConstants.PAGETITLE_STUDENT%></title>
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.css" />
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.icon.css" />
<link rel="stylesheet" type="text/css"
	href="css/jquery.fancybox.css?v=2.1.5" media="screen" />
<link type="text/css" rel="stylesheet" href="css/master.css" />

	
  
    
    <!-- Custom Fonts -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">

	<!--Framework CSS changes -->
	<link href="css/changes-master.css" rel="stylesheet">
	<link href="css/bootstrap-changes.css" rel="stylesheet">

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

</head>
<body class="easyui-layout">
	<script type="text/javascript" src="js/frameworks/wz_tooltip.js"></script>
		<!--  <div class="north" data-options="region:'north',border:false">
		<div class="div-header window">
		
			<a id="imprint" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.IMPRINT_BUTTON_TEXT%></a>
			
		</div>
	</div>-->


	<div class="center" data-options="region:'center'">
<h1 style="text-align:center; margin-top: 50px;">Reset your password</h1>

<form action="ResetPassword" method="post" style="width: 80%; margin: 0 auto;">
<p style="text-align: center;">If you forgot your password, you can reset it here. We will send you an email containing a temporary password. You can use this password to login afterwards.

<!--Email address: 
<input type="text" name="username" maxlength="50" /></p>-->

 <input type="text" class="form-control" name="username" maxlength="50" value="${email}" placeholder="Email address" required/>

  <br><br/> 
   <input  id="resetPassword" type="submit" value="Reset my password" style="display:none"></input>
   <br><br/> 
   <a class="btn btn-default"  onclick="$('#resetPassword').trigger('click')">Reset my password</a>
   <br></br>
   <a href='login.jsp' style="margin: 0 auto;">Back to Login</a>
</form>


<!--<div class="mainEventContainerImprint easyui-window" data-options="closed:true,width:863,height:576"></div>
</div>-->

<script type="text/javascript">
	$('body').show();
	$('#imprint').bind('click', function() {
		showImprint();
	});
</script>
</body>

</html>
