<%@ page import="org.dhbw.imbit11.ApplicationConstants" %>
<!DOCTYPE html>
<html>
<head>
	<title><%=ApplicationConstants.PAGETITLE_MAIN%></title>	
	<meta charset="utf-8">
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
	<link rel="stylesheet" type="text/css" href="css/jquery.fancybox.css?v=2.1.5" media="screen" />
	<link type="text/css" rel="stylesheet" href="css/master.css" />	
	<script type="text/javascript" src="js/jquery-2.0.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/jquery.fancybox.pack.js?v=2.1.5"></script>
	<script type="text/javascript">
		userid = '${userid}';
	</script>
	<script type="text/javascript" src="js/master.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
</head>
<body class="easyui-layout">
	<div class="north" data-options="region:'north',border:false">
		<div class="div-header window">			
			<a id="logout" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.LOGOUT_BUTTON_TEXT%></a>			
			<a id="help" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.HELP_BUTTON_TEXT%></a>
			<a id="imprint" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.IMPRINT_BUTTON_TEXT%></a>
			<a id="account" onclick="window.location.assign('${pageContext.request.contextPath}/StudentHomepage','_blank')" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.ACCOUNT_BUTTON_TEXT%></a>
			<!-- <a id="change_password" onclick="window.open('${pageContext.request.contextPath}/ChangeStudentPassword','_blank')" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.CHANGE_PW_BUTTON_TEXT%></a>  -->
			<!-- <a id="audio" class="easyui-linkbutton" data-options="plain:true"><%=ApplicationConstants.AUDIO_BUTTON_TEXT%></a> -->
			<div class="welcome"></div>
		</div>
	</div>	
	<div class="west" data-options="region:'west',title:'<%=ApplicationConstants.PANEL_WEST_TITLE%>',split:false">	
		<div class="westContainer easyui-panel" data-options="border:false,fit:true">
			<div class="mainLocationButtonContainer">
				<div class="mainLocationButton easyui-linkbutton" id="1"><img src="images/icons/Airport.png" height=13px><%=ApplicationConstants.LOCATION1_NAME%></div>
				<!--<div class="mainLocationButton easyui-linkbutton" id="2"><%=ApplicationConstants.LOCATION2_NAME%></div>-->
				<div class="mainLocationButton easyui-linkbutton" id="4"><img src="images/icons/Office.png" height=20px><%=ApplicationConstants.LOCATION3_NAME%></div>								
				<div class="mainLocationButton easyui-linkbutton" id="3"><img src="images/icons/Conference.png" height=20px><%=ApplicationConstants.LOCATION4_NAME%></div>
				<div class="mainLocationButton easyui-linkbutton" id="5"><img src="images/icons/Bar.png" height=20px><%=ApplicationConstants.LOCATION5_NAME%></div>
				<div class="mainMailButton easyui-linkbutton"><img src="images/icons/Email.png" height=15px><%=ApplicationConstants.LAPTOP_NAME%></div>
			</div>
			<div class="mainLaptopButtonContainer bc">
				<div class="mainLaptopButton" id="laptop"><%=ApplicationConstants.LAPTOP_NAME%></div>
			</div>
		</div>	
	</div>
	<div class="center mainWindow noPadding" data-options="region:'center',border:false">
		<div class="mainEventContainer easyui-window" data-options="closed:true,width:863,height:576"></div>
		<div class="mainEventContainerLaptop easyui-window" data-options="closed:true,width:863,height:576"></div>
		<div class="mainEventContainerImprint easyui-window" data-options="closed:true,width:863,height:576"></div>
		<div class="mainEventContainerResult easyui-window" data-options="closed:true,maximized:true,noheader:true"></div>
		<div class="loadingScreen easyui-window" data-options="closed:true,maximized:true,noheader:true">
			<div class="loadingScreenImageContainer easyui-panel" data-options="fit:true,border:false"></div>
		</div>
		<div class="transitionScreen easyui-window" data-options="closed:true,noheader:true,width:863,height:576">
			<div class="transitionScreenImageContainer">
				<div class="transitionScreenTextContainer"></div>
				<div class="buttonContainer">
			    	<div id="continueButton" class="easyui-linkbutton transitionContinueButton">Next</div>
			    </div>
			</div>			
		</div>
	</div>
	<div class="east" data-options="region:'east',title:'<%=ApplicationConstants.PANEL_EAST_TITLE%>',split:false">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'center',border:false">
				<div class="mainTCQContainer bc">
					<div class="mainTCQ"></div>
				</div>
				<div class="ProjectTimeline">
					<a class="fancybox" href="" style="text-align: center;"><img src="" alt="" width="179"/></a>
				</div>
				<div class="projektCharterButtonContainer">
					<div class="projektCharterButton" id="projektCharter"></div>
				</div>
				<div class="projektStrukturPlanButtonContainer">
					<div class="projektStrukturPlanButton" id="projektStrukturPlan"></div>
				</div>
				<div class="ganttButtonContainer">
					<div class="ganttButton" id="gantt"></div>
				</div>
			</div>
			<div class="east-south" data-options="region:'south',split:false,border:false">
				<div class="mainLogoContainer">
					<div class="mainLogo"></div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
