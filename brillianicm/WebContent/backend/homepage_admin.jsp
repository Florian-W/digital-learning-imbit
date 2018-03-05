<?xml version="1.0" encoding="UTF-8" ?>
<%@ page import="org.dhbw.imbit11.ApplicationConstants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<title><%=ApplicationConstants.PAGETITLE_ADMIN%></title>
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

<script type="text/javascript" src="js/master.js"></script>
</head>
<body class="easyui-layout" style="min-width: 768px">
	<div class="north" data-options="region:'north',border:false">
		<div class="div-header window">
			<a id="logout" class="easyui-linkbutton" data-options="plain:true"
				onclick="window.location.href='LogoutUser'"><%=ApplicationConstants.LOGOUT_BUTTON_TEXT%></a>
			<a id="imprint" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.IMPRINT_BUTTON_TEXT%></a>
			<a id="content" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.CONTENT_BUTTON_TEXT%></a>
		</div>
	</div>
	<div class="center mainWindow" data-options="region:'center'" align="center" style="padding-left: 5%; padding-right: 5%">
	<h1>Admin Page</h1>
		<div style="width: 100%; text-align: left; padding-left: 5%; padding-right: 5%" align="center">
			<div class="separator-box" style="margin-bottom:20px">
			<div style="padding-bottom: 20px; padding-left: 2%; width:80%; background-color: white; border-width:1px; border-style:solid; border-color:black; height: 100%">
			<h4>Lecturers</h4>
			<table id="students" class="easyui-datagrid" style="width: 600px"
				data-options="fitColumns:true,singleSelect:true">
				<thead>
					<tr>
						<th data-options="field:'firstname',width:100,resizable:false">Firstname</th>
						<th data-options="field:'lastname',width:100,resizable:false">Lastname</th>
						<th data-options="field:'email',width:100,resizable:false">Email</th>
						<th data-options="field:'delete',width:63,resizable:false"></th>
					</tr>
				</thead>
				<tbody>
					<%
						String webAppPath = new String();
						if (request.getServerPort() == 8080) {
							webAppPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
									+ application.getContextPath();
						} else {
							webAppPath = request.getScheme() + "://" + request.getServerName();
						}
						if (request.getAttribute("professors") != null) {
							@SuppressWarnings("unchecked")
							ArrayList<ArrayList<String>> professors = (ArrayList<ArrayList<String>>) request
									.getAttribute("professors");

							java.util.ArrayList<java.util.ArrayList<String>> professors2 = professors;
							if (professors.isEmpty()) {
								out.println("<p style='color: red'>There are currently no lecturers.</p>");
							} else {
							}
							for (java.util.ArrayList<String> row : professors) {
								out.println("<tr><td>");
								out.println(row.get(0));
								out.println("</td><td>");
								out.println(row.get(1));
								out.println("</td><td>");
								out.println(row.get(2));
								out.println("</td><td>");
								out.println("<form action=\"" + webAppPath
										+ "/DeleteProfessor\" method=\"post\"><input class=\"deleteProfessor\" type=\"submit\" "
										+ "value=\"Delete\" hidden=\"hidden\"/><a class=\"easyui-linkbutton\" onclick=\"$(this).parent().parent().find('.deleteProfessor').trigger('click');\">Delete</a><input type=\"text\" name=\"delete_professor\" value=\""
										+ row.get(2) + "\" style=\"display:none\"/></form>");
								out.println("</td></tr>");
							}
						} else {
							out.println("<p style='color: red'>There are currently no professors.</p>");
						}
					%>
				</tbody>
			</table>
			</div></div>
			<br />
			<div
				style="height: 370px; width: 80%; background-color: white; border-width: 1px; border-style: solid; border-color: black; padding-left: 2%; text-align: left; padding-bottom: 20px">
				<div style="height: 100%; width: 50%; float: left">
					<h4>New Lecturer</h4>
					<form action="CreateUser" method="post">
						<input type="text" name="role" maxlength="50" value="professor"
							style="display: none" />
						<div class="formLabel">Title</div>
						<select name="gender" id="gender" size="1" required>
							<option value="" disabled="disabled" selected="selected">Please
								select</option>
							<option value="m">Mr.</option>
							<option value="f">Mrs.</option>
						</select><br /> <br />
						<div class="formLabel">First Name</div>
						<input type="text" name="firstname" maxlength="50"
							value="${firstname}" required /><br /> <br />
						<div class="formLabel">Last Name</div>
						<input type="text" name="lastname" maxlength="50"
							value="${lastname}" required /><br /> <br />
						<div class="formLabel">Email</div>
						<input type="email" name="email" maxlength="50" value="${email}"
							required /><br /> <br />
						<div class="formLabel">Password</div>
						<input type="password" name="password" maxlength="50" required /><br />
						<br />
						<div class="formLabel">Repeat Password</div>
						<input type="password" name="password_repeat" maxlength="50"
							required /><br /> <br /> <input id="createUser" type="submit"
							value="Create now!" hidden="hidden"></input> <a
							class="easyui-linkbutton"
							onclick="$('#createUser').trigger('click')">Create Lecturer</a>
						<p style="color: green">${success}</p>
						<p style="color: red">${error}</p>
					</form>
				</div>
				<div style="margin-left: 50%">
					<h4>Change Password</h4>
					<p style="color: red; padding-left: 32px;">${error}</p>
					<form action="ResetPassword" method="post">
						<input type="text" name="role" maxlength="50" value="admin"
							style="display: none" /><br /> <br />
						<!--  Password check -->
						<div class="formLabel">Old Password:</div>
						<input type="password" name="oldpassword" maxlength="50" /><br />
						<br /> <input type="text" name="role" maxlength="50"
							value="admin" style="display: none" />
						<div class="formLabel">Password:</div>
						<input type="password" name="password" maxlength="50" /><br /> <br />
						<div class="formLabel">Repeat Password:</div>
						<input type="password" name="password_repeat" maxlength="50" /><br />
						<br /> <input id="updatePassword" type="submit"
							name="updatePassword" value="Update password" hidden="hidden" />
						<a class="easyui-linkbutton studentButton"
							onclick=confirmPasswordChange()>Update Password</a>
					</form>
				</div>
			</div>
			<br>
			<div
				style="width: 80%; background-color: white; border-width: 1px; border-style: solid; border-color: black; margin-top: 25px; margin-bottom: 25px; padding-left: 2%; text-align: left">
				<h4>Global Settings</h4>
				<div
					style="width: 50%; height: 100%; float: left; height: 100%; margin-bottom: 25px">
					<form action="GetGlobalSettings" method="post">
						<div style="width: 120px; float: left;">
							Audio:<br>
							<a style="color: blue; padding-left: 32px;">${audio}</a><br>
								Video: 
							<br>
							<a style="color: blue; padding-left: 32px;">${video}</a>
						</div>
						<div style="margin-left: 120px;">
							Text-to-Speech:<br>
							<a style="color: blue; padding-left: 32px;">${tts}</a><br>
								Subtitles 
							<br>
							<a style="color: blue; padding-left: 32px;">${subtitles}</a>
						</div>
						<br>
						<input id="getSettings" type="submit" name="getSettings"
							value="Get Settings" hidden="hidden" /> <a
							class="easyui-linkbutton studentButton"
							onclick="$('#getSettings').trigger('click')">Get Settings</a>
					</form>
				</div>
				<div style="margin-left: 50%; margin-bottom: 25px">
					<form action="SetGlobalSettings" method="post">
						<div style="width: 120px; float: left;">
							<input type="text" name="role" maxlength="50" value="admin"
								style="display: none" /> <input type="radio" name="audio"
								value="true" checked>Audio Enabled <br>
							<input type="radio" name="audio" value="false">Audio
								Disabled <br>
							<input type="radio" name="video" value="true" checked>Video
								Enabled <br>
							<input type="radio" name="video" value="false">Video
								Disabled <br>
						</div>
						<div style="margin-left: 120px;">
							<input type="radio" name="tts" value="true" checked>Text-to-Speech
								Enabled <br>
							<input type="radio" name="tts" value="false">Text-to-Speech
								Disabled <br>
							<input type="radio" name="subtitles" value="true" checked>Subtitles
								Enabled <br>
							<input type="radio" name="subtitles" value="false">Subtitles
								Disabled <br>
						</div>
						<br>
						<input id="setSettings" type="submit" name="setSettings"
							value="Save Changes" hidden="hidden" /> <a
							class="easyui-linkbutton studentButton"
							onclick="$('#setSettings').trigger('click')">Save Changes</a>
					</form>

				</div>
				<div class="mainEventContainerImprint easyui-window"
					data-options="closed:true,width:863,height:576"></div>
			</div>
			<div style="padding-bottom: 25px"></div>
</body>
<script type="text/javascript">
	$('body').show();
	$('#imprint').bind('click', function() {
		showImprint();
	});
	$('#content').bind('click', function(){
		
		var url = "<%=request.getRequestURL()%>";
		console.log(url);
		var res = url.replace("backend/homepage_admin.jsp", "index.jsp");
		console.log(res);
		window.location.replace(res);
	});
	function confirmPasswordChange()
	{
		var box = window.confirm("Click OK if you want to change password. You will be logged out. ");
		if(box)
		{
		$('#updatePassword').trigger('click');
		sessionStorage.removeItem('userid');
		window.location.href = 'LogoutUser';
		}
	}
</script>
</html>