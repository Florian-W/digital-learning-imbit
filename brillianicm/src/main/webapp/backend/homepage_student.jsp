<?xml version="1.0" encoding="UTF-8" ?>
<%@ page import="org.dhbw.imbit11.ApplicationConstants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<title><%=ApplicationConstants.PAGETITLE_STUDENT%></title>
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
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.css" />
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.icon.css" />
<link rel="stylesheet" type="text/css"
	href="css/jquery.fancybox.css?v=2.1.5" media="screen" />
<link type="text/css" rel="stylesheet" href="css/master.css" />
<script type="text/javascript" src="js/frameworks/jquery-2.0.0.min.js"></script>
<script type="text/javascript" src="js/frameworks/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/frameworks/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript" src="js/master.js"></script>
 
   <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">


    <!-- Custom CSS -->
    <link href="css/grayscale.css" rel="stylesheet">
    <link href="css/bootstrap-changes.css" rel="stylesheet"> 
    
    <!--Framework changes -->
<link href="css/changes-master.css" rel="stylesheet">
<link href="css/bootstrap-changes.css" rel="stylesheet">
    
       <!-- Overwriting Font -->
     <link href="css/font.css" rel="stylesheet">

</head>
<body class="easyui-layout">
	<!--  <div class="north" data-options="region:'north',border:false">
		<div class="div-header window">
			
			<a id="imprint" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.IMPRINT_BUTTON_TEXT%></a>
			
		</div>
	</div> -->


	<div class="center studentHomepage" data-options="region:'center'">
	<div class="studentHomepageContainer">
			<div>
				<h4 style="text-align:center">Change Password</h4>
					<p style="color: red; padding-left: 32px; ">${error}</p>
				<!-- 
					Philipp K.
					29.2.16
					Abänderung des Formulars auf Bootstrap
				-->
		
				<form action="ResetPassword" method="post">	
					<input class="form-control" type="text" name="username" maxlength="50" value="${username}" style="display: none"/>
					<input class="form-control" type="text" name="role" maxlength="50" value="student" style="display: none"/><br /><br />
					<!--  Password check -->
					<div class="form-group">
    					<label for="oldPassword">Old Password:</label>
    					<input class="form-control" type="password" name="oldpassword" maxlength="50" placeholder="Old Password">
 					</div>	
 					<div class="form-group">
    					<label for="password">Password:</label>
    					<input class="form-control" type="password" name="password" maxlength="50" placeholder="Password">
 					</div>	
 					<div class="form-group">
    					<label for="password_repeat">Repeat Password:</label>
    					<input class="form-control" type="password" name="password_repeat" maxlength="50" placeholder="Repeat Password">
 					</div>
 					<br><br>			
					<input id="updatePassword" type="submit" name="updatePassword" value="Update password" hidden="hidden"/>
					<div class="form-group">
					<a  class="btn btn-default" onclick=confirmPasswordChange()>Update Password</a>
					</div>
				</form>
				<!--
				Philipp K.
				29.2.16
				Hinzufügen des deleteAccount Button
				 -->
				<form action="deleteAccount" method="post">
					<input id="deleteAccount" type="submit" name="deleteAccount" value="Delete Account" hidden="hidden"/>
					<a  class="btn btn-default" onclick=confirmDeleteAccount()>Delete Account</a>
					<br><br>
					<a href='login.jsp'>Back to Login</a>
				</form>
			</div>
			
			<!-- Hidden Button on Nose of Background to show Level Jump Dropdown -->
			<div style="height:40px; width:32px; position:absolute; top:110px; left:780px" onclick="changeViewUserProgress()"></div>
			<div id="setUserProgressForm" style=display:none>
				<h4>Jump to Level.</h4>													
				<form action="SetUserProgress" method="post">
					<div class="formLabel">Select Game:</div>
					<select name="lvlId" id="lvlId">
					<option value="l009e013">Project Management Phasen</option>
					<option value="l022e000">Risk Analysis</option>
					<option value="l031e000">Stakeholder Analysis</option>
					<option value="l201e000">Work Breakdown Structure</option>
					<option value="l204e000">Budget Planning</option>
					<option value="l290e000">Critical Path</option>													
					</select>
					<input id="setUserProgress" type="submit" name="setUserProgress" value="Set Progress" hidden="hidden"/>
					<a class="easyui-linkbutton studentButton" onclick="$('#setUserProgress').trigger('click')">Set Progress</a>
					</form>
				</div>
				<p style="color: red; padding-left: 32px;">${progresserror}</p>
				<p style="color: blue; padding-left: 32px;">${status}</p>	
			<div class="mainEventContainerImprint easyui-window" data-options="closed:true,width:863,height:576"></div>
		</div>
	</div>

			
	

<script type="text/javascript">
	$('body').show();
	$('#imprint').bind('click', function() {
		showImprint();
	});
	function confirmPasswordChange(){
		
	    if (confirm("Click OK if you want to change password. You will be logged out. ") == true) {
	    	$('#updatePassword').trigger('click');
	    	
			sessionStorage.removeItem('userid');
			
			
		 	
			}
	}
	
	function confirmDeleteAccount(){
		  if (confirm("Click OK if you want to delete your account. This action is permanantly and cannot be revoked!") == true) {
			 $('#deleteAccount').trigger('click');
			 sessionStorage.removeItem('userid');
			  
	}
	}
	
	function changeViewUserProgress() {
	 if(document.getElementById('setUserProgressForm').style.display == "none"){
		document.getElementById('setUserProgressForm').style.display = "initial";
	
	}else{
		document.getElementById('setUserProgressForm').style.display = "none";
	}
	}
</script>
</body>
</html>
