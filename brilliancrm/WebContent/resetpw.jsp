<?xml version="1.0" encoding="UTF-8" ?>
<%@ page import="org.dhbw.imbit11.ApplicationConstants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title><%=ApplicationConstants.PAGETITLE_STUDENT%></title>
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.css" />
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.icon.css" />
<link rel="stylesheet" type="text/css"
	href="css/jquery.fancybox.css?v=2.1.5" media="screen" />
<link type="text/css" rel="stylesheet" href="css/master.css" />
<script type="text/javascript" src="js/jquery-2.0.0.min.js"></script>
<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript" src="js/master.js"></script>
</head>
<body class="easyui-layout">
	<div class="north" data-options="region:'north',border:false">
		<div class="div-header window">
		
			<a id="imprint" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.IMPRINT_BUTTON_TEXT%></a>
			
		</div>
	</div>


	<div class="center" data-options="region:'center'">
<h3>Reset your password</h3>

<form action="ResetPassword" method="post">
If you forgot your password, you can reset it here. We will send you an email containing a temporary password. You can use this password to login afterwards. <br/>
 Email address: <input type="text" name="username" maxlength="50" />
 <br/>
   <input id="resetPassword" type="submit" value="Reset my password" style="display:none"></input>
   <a class="easyui-linkbutton" onclick="$('#resetPassword').trigger('click')">Reset my password</a>
</form>
<p><a href='login.jsp'>Back to Login</a></p>
<div class="mainEventContainerImprint easyui-window" data-options="closed:true,width:863,height:576"></div>
</div>
<script type="text/javascript">
	$('body').show();
	$('#imprint').bind('click', function() {
		showImprint();
	});
</script>
</body>

</html>
