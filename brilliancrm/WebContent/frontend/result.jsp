<%@ page import="org.dhbw.imbit11.ApplicationConstants"%>
<!DOCTYPE html>
<html>
<head>
<title><%=ApplicationConstants.PAGETITLE_MAIN%></title>
<meta charset="utf-8">
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.css" />
<link type="text/css" rel="stylesheet" href="css/jquery.easyui.icon.css" />
<link rel="stylesheet" type="text/css" href="css/jquery.fancybox.css?v=2.1.5" media="screen" />
<link type="text/css" rel="stylesheet" href="css/master.css" />
<script type="text/javascript" src="js/jquery-2.0.0.min.js"></script>
<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript" src="js/master.js"></script>
<script type="text/javascript" src="js/main.js"></script>
</head>
<body>
	<div class="easyui-layout" style="width: 100%; height: 100%;">
		<div class="north" data-options="region:'north',border:false" style="border-bottom-width: 1px;">
			<div class="div-header window">
				<a id="logout" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.LOGOUT_BUTTON_TEXT%></a>
				<a id="help" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.HELP_BUTTON_TEXT%></a>
				<a id="imprint" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.IMPRINT_BUTTON_TEXT%></a>
				<div class="welcome"></div>
			</div>
		</div>
		<div class="center" data-options="region:'center',border:false">
			<h1>You completed the game!</h1>
			<h3>Check out how brilliant you have been:</h3>
			<table>
				<tr>
					<td>
						<div class="mainTCQContainer bc" style="float: left">
							<div class="mainTCQ"></div>
						</div>
					</td>
					<td>
						<table style="font-weight: bold;">
							<tr>
								<td>Cost:</td>
								<td style="float: right"><div id="cost"></div></td>
							</tr>
							<tr>
								<td>Time:</td>
								<td style="float: right"><div id="time"></div></td>
							</tr>
							<tr>
								<td>Quality:</td>
								<td style="float: right"><div id="quality"></div></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<p>
							If you want to play again, please press the button below. Be aware that this step cannot be undone!<br /><br />
							<a class="easyui-linkbutton" href="javascript:void(0)" onclick="$('#dlg').dialog('open')">Restart game and start from the beginning</a>
						</p>
					</td>
				</tr>
			</table>
			<div id="dlg" class="easyui-dialog" title="Restart game" style="width: 400px; height: 150px; padding: 10px" data-options="iconCls: 'icon-undo',closed:true,buttons: [{text:'Restart game',iconCls:'icon-ok',handler:function(){window.location.href = '${pageContext.request.contextPath}/ResetUserProgress';}},{text:'Cancel',handler:function(){$('#dlg').dialog('close');}}]">
				Are you sure you want to restart your game? This step cannot be undone!
			</div>
		</div>
	</div>
</body>
</html>



