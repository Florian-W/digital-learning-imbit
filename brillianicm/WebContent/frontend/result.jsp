<%@ page import="org.dhbw.imbit11.ApplicationConstants"%>
<!DOCTYPE html>
<html>
<head>
<title><%=ApplicationConstants.PAGETITLE_MAIN%></title>
<meta charset="UTF-8">
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.css" />
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.icon.css" />
<link rel="stylesheet" type="text/css"
	href="css/jquery.fancybox.css?v=2.1.5" media="screen" />
<link type="text/css" rel="stylesheet" href="css/master.css" />

<!-- Bootstrap Core CSS -->
<link href="css/bootstrap.min.css" rel="stylesheet">
<!-- Custom CSS -->
<link href="css/grayscale.css" rel="stylesheet">
<link href="css/full-slider.css" rel="stylesheet">

<!--Framework changes -->
<link href="css/bootstrap-changes.css" rel="stylesheet">
<link href="css/changes-master.css" rel="stylesheet">

<!--Framework JS -->
<script type="text/javascript" src="js/frameworks/jquery-2.0.0.min.js"></script>
<script type="text/javascript" src="js/frameworks/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="js/frameworks/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript" src="js/frameworks/jquery.easing.min"></script>
<script type="text/javascript" src="js/frameworks/bootstrap.min"></script>

<!--Custom JS -->
<script type="text/javascript" src="js/master.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/events.js"></script>
<script type="text/javascript" src="js/serverFunctions.js"></script>
<script type="text/javascript" src="js/grayscale.js"></script>

</head>
<body class="easyui-layout">
	<!-- 
			Philipp K.
			5.3.16
			Added Javascript so Buttons show different values depending on Certificate Settings-->

	<script type="text/javascript">
		$
				.ajax({
					url : 'Event',
					type : 'get',
					dataType : 'html',
					data : {
						userid : userid,
						type : 'getCertificateSettings'
					},
					async : true,
					success : function(data) {
						if (data == "1") {
							document.getElementById("certificationText").innerHTML = "For your <a target='_blank' href='badges/badgeCriteriaTable.html'>certification and badge</a>, please press the button below or restart the game";
							//document.getElementById("SendButton").innerHTML = "Send Certificate and restart from the begininng";
							var buttonSend = document.getElementById("SendButton");
							buttonSend.onclick = function() {
								$('#sendcertificate').dialog('open');
							};
							var buttonRestart = document.getElementById("RestartButton");
							buttonRestart.onclick = function() {
								$('#reset').dialog('open');
							};
						} else {
							document.getElementById("SendButton").style.display = "none";
							document.getElementById("certificationText").innerHTML = "To restart, please press the button below. Certificate and badge only available for designated groups.";
							//document.getElementById("SendButton").innerHTML = "Restart the game from the beginning";
							var buttonRestart = document.getElementById("RestartButton");
							buttonRestart.onclick = function() {
								$('#reset').dialog('open');
							};
						}
					}
				});
	</script>
	<!-- <div class="north" data-options="region:'north',border:false" style="border-bottom-width: 1px;">
			<div class="div-header window">
				<a id="logout" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.LOGOUT_BUTTON_TEXT%></a>
				<a id="help" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.HELP_BUTTON_TEXT%></a>
				<a id="imprint" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.IMPRINT_BUTTON_TEXT%></a>
				<div class="welcome"></div>
			</div>-->

	<div class="center" data-options="region:'center'"
		style="background-color: #d5edf3; height: 100%; padding-left: 35px">
		<!-- 
			Philipp K.
			5.3.16
			Added two div containers to add more dynamic content  
			 Updated the text to better represent the game style-->
		<h1>
			Congratulations
			<div id=name></div>
			You completed the game!
		</h1>
		<h3>Check out how brilliant you've been:</h3>
		<table>
			<tr>

				<td>
					<table style="font-weight: bold;">
						<tr>
							<td>Behaviour</td>
							<td style="float: right; padding-left: 10px"><div id="cost"></div></td>
						</tr>
						<tr>
							<td>Competence</td>
							<td style="float: right"><div id="time"></div></td>
						</tr>
						<tr>
							<td>Communication </td>
							<td style="float: right"><div id="quality"></div></td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td colspan="2">


					<p>
					<div id="certificationText"></div> <br /> <br />
					<a class="btn btn-default" id="RestartButton" href="javascript:void(0)">
					<div id="RestartButtonText"></div>
					Restart the game from the beginning
					</a>
					<a class="btn btn-default" id="SendButton" href="javascript:void(0)">
					<div id="SendButtonText"></div>
					Send certificate and badge
					</a>
					</p>
				</td>
			</tr>
		</table>

		<div id="sendcertificate" class="easyui-dialog" title="Restart game"
			style="width: 400px; height: 150px; padding: 10px"
			data-options="iconCls: 'icon-undo',closed:true,buttons: [{text:'Send',iconCls:'icon-ok',handler:function(){$.ajax({ url: 'Event', type: 'get', dataType: 'html', data: {userid : userid, type : 'sendCertificate'}, async: true, success: function(data) {}}); window.location.href = '${pageContext.request.contextPath}/Student';}},{text:'Cancel',handler:function(){$('#sendcertificate').dialog('close');}}]">
			Your certificate and badge will be send to
			<div id=email></div>
		</div>
		<div id="reset" class="easyui-dialog" title="Restart game"
			style="width: 400px; height: 150px; padding: 10px"
			data-options="iconCls: 'icon-undo',closed:true,buttons: [{text:'Restart game',iconCls:'icon-ok',handler:function(){$.ajax({ url: 'Event', type: 'get', dataType: 'html', data: {userid : userid, type : 'resetUserProgress'}, async: true, success: function(data) {}}); window.location.href = '${pageContext.request.contextPath}/Student';}},{text:'Cancel',handler:function(){$('#reset').dialog('close');}}]">
			Are you sure you want to restart the game? </br> This step cannot be
			undone!
		</div>
	</div>

</body>
</html>