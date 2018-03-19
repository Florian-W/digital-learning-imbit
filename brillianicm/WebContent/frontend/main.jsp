<%@ page import="org.dhbw.imbit11.ApplicationConstants" %>
<!DOCTYPE html>
<html>
<head>
	<title><%=ApplicationConstants.PAGETITLE_MAIN%></title>	
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
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

	<script type="text/javascript">	
		userid = '${userid}';
	</script>

   <!-- Framework CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="css/jquery.easyui.css" />
	<link type="text/css" rel="stylesheet" href="css/jquery.easyui.icon.css" />
	<link rel="stylesheet" type="text/css" href="css/jquery.fancybox.css?v=2.1.5" media="screen" />

    <!-- Custom CSS -->
    <link href="css/grayscale.css" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="css/master.css" />	
	
	<!--Framework changes -->
    <link href="css/bootstrap-changes.css" rel="stylesheet">
    <!-- Overwriting Font -->
    <link href="css/font.css" rel="stylesheet">

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
	
	<!-- EDIT BY JONAS ON FEB 17, 2016 -->
	<!-- Implementing libraries for the polarclock -->
	<!-- Start of line -->
		<script src="js/frameworks/d3.min.js"></script>
		<script src="js/frameworks/d3.js"></script>	
	<!-- End of line -->
	
	<script type="text/javascript">
function changeSelect() {
    var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
   if (selectedValue=='Account'){
	   window.location.assign('${pageContext.request.contextPath}/StudentHomepage','_blank');
	   
   }else if (selectedValue=='<%=ApplicationConstants.LOGOUT_BUTTON_TEXT%>'){
	  
	   $('#logout').trigger('click');
	   
   } else if (selectedValue=='Imprint'){
	   
	   // Letzte Änderung 05.03.16 von Tanja: Imprint Feld im Dropdown öffnet einen neuen Tab in dem die Imprint.jsp angezeigt wird.
	   window.open ("frontend/imprint.jsp", "_blank");
  		 var selectBox = document.getElementById("selectBox");
   			selectBox.options[0].selected = true;   
   /*
	* Kristin K.
	*6.3.16
	* Function to remove & set the tts cookie depending on the given value of the drop down 
	*/
	}else if(selectedValue=='TextToSpeech On'){ 
		
		
	  	eraseCookie("tts");
		setCookie("tts","true")
		checkTTS();
  
   }else if (selectedValue=='TextToSpeech Off'){
		
	  	eraseCookie("tts");
		setCookie("tts","false")
		checkTTS();
   
}
}
/*
* Kristin K.
*6.3.16
* Function to remove the cookie with the handed in name 
*/ 
function eraseCookie( name ) {
	  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}

/*
* Kristin K.
*6.3.16
* Function to set a cookie with the handed in name and value 
*/ 
function setCookie(name,value) {
	var date = new Date();
	date.setTime(date.getTime()+(12 * 60 * 60));
	document.cookie = name + "=" + value + "; expires=" +date;
	
	
}	   
/*
 * Kristin K.
 * 6.3.16
 * checkTTS() adds a option in the dropdown menu depending on the value of the tts cookie 
 * 
 * Philipp K. 
 * Added ajax to check if TTs is gloabally turned on or off. 
 */
function checkTTS() {
	$.ajax({
		url: 'Event',
		type: 'get',
		dataType: 'html',
		data: {userid : userid, type : 'getSettings'},
		async: true,
		success: function(data) {
	var list = data.split("[")[1].split(']')[0].split(', ');
	
	if(list[2]=="true"){
	
	var ttsSettings= "";
		ttsSettings=getCookie("tts");
	if(ttsSettings=="true") {
		if(document.getElementById("TTS Off")){}
		else{
			var x = document.getElementById("selectBox");
			var option = document.createElement("option");
			option.id = "TTS Off"
			option.text = "TextToSpeech Off";
			x.add(option);
			var element = document.getElementById("TTS On");
			element.parentNode.removeChild(element);
			}
	}else {
		if(document.getElementById("TTS On")){}
		else{
			var x = document.getElementById("selectBox");
			var option = document.createElement("option");
			option.id = "TTS On"
			option.text = "TextToSpeech On";
			x.add(option);
			var element = document.getElementById("TTS Off");
			element.parentNode.removeChild(element);
			}
		}
	} else{
		console.log("a")
	}
	
	
	}});
}
   
   </script>

	<!-- EDIT BY ANIL ON FEB 29, 2016 -->
	<!-- Implementation of the shake function -->
	<!-- Start of line -->
	<script type="text/javascript">
		window.onload = function() {
		    var myShakeEvent = new Shake({
		        threshold: 15
		    });
		    
		    myShakeEvent.start();	// start listening to device motion
		    window.addEventListener('shake', shakeEventDidOccur, false);  // register a shake event
		    function shakeEventDidOccur () {  //shake event callback

				var box = window.confirm ("Are you sure you want to leave this page?")
				if (box == true){
					window.open("https://brillianicm.com", "_self");}
				else if (box==false){
				}	
			}
		
		};
	</script>
	<!-- End of line -->   	
	
</head>
<body class="easyui-layout" data-options="fit:true" onload ="checkTTS()">
  <script type="text/javascript" src="js/frameworks/wz_tooltip.js"></script>

    <div id="container header-navbar" class="navbar-custom" data-options="region:'north'" style="height:70px;">
      <nav class="navbar navbar-custom navbar-fixed-top" >
        <div class="container" style="margin: auto auto;">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
					
                      <div style="width:120px"> <img src="img/logo_klein.png" alt="" style="width:100%">  </div>
					
			</div>	
    <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse center container" id="navbarCollapse">
       
            <ul class="nav navbar-nav">
               <li><a style="margin-left: 100px;"><div class="drop">
   <select class="countryselect" id="contry-list" onchange="changeFunc();">
      <option selected="true" style="display:none;">Country</option>
   </select>
</div></a></li>
                <li><a href="#" id="help"  data-options="plain:true"><%=ApplicationConstants.LAPTOP_NAME%></a></li>
                <!--<li><a href="#" id="imprint" data-options="plain:true"><%=ApplicationConstants.IMPRINT_BUTTON_TEXT%></a></li>-->
				<li style="display: none;"><a href="#" id="logout"  data-options="plain:true"><%=ApplicationConstants.LOGOUT_BUTTON_TEXT%></a></li>

            
            
            
            
                 <li><a style=""><div class="drop">
   <select class="countryselect" id="selectBox" style="width:200px" onchange="changeSelect();">
      <option id="account" selected="true" style="display:none;"></option>
      <option ><%=ApplicationConstants.LOGOUT_BUTTON_TEXT%></option>
      <option > Imprint</option>
       <option>Account</option>
      
   </select>
</div></a></li> 
             </ul> 
          
            <!-- </ul> 
            <ul class="nav navbar-nav second-button">            
                 <li><a href="#" id="account" onclick="window.location.assign('${pageContext.request.contextPath}/StudentHomepage','_blank')"  data-options="plain:true"></a></li>   
			</ul> -->
			
			
			<!-- EDIT BY JONAS ON FEB 27, 2016 -->
			<!-- Removing the old KPI buttons -->
			<!-- Start of line -->
			<!--  
			<ul class="nav navbar-nav second-button" style="margin-left: 100px">
				<svg id= "iconsBox"height="50" width="200" >
					<circle id="icon_competence" cx="25" cy="25" r="13" stroke="black" stroke-width="0.5" fill="red" onmouseover="Tip('Competence:&lt;&#47;br&gt;  WHY &lt;&#47;br&gt; This KPI is all about knowing WHY something is done &lt;&#47;br&gt; in a particular way respectively knowing according reasons why the answer was the right one. &lt;&#47;br&gt; This is based especially on knowledge that comes from the 9 cultural dimensions.')" onmouseout="UnTip()" />
						<text x="25" y="32" font-family="sans-serif"  font-size="20px"  text-anchor="middle"  fill="black" onmouseover="Tip('Competence: &lt;&#47;br&gt;  WHY &lt;&#47;br&gt; This KPI is all about knowing WHY something is done &lt;&#47;br&gt; in a particular way respectively knowing according reasons why the answer was the right one. &lt;&#47;br&gt; This is based especially on knowledge that comes from the 9 cultural dimensions.')" onmouseout="UnTip()">C</text>
					<circle id="icon_communication" cx="75" cy="25" r="13" stroke="black" stroke-width="0.5" fill="green" onmouseover="Tip('Communications: &lt;&#47;br&gt; HOW &lt;&#47;br&gt; It’s about how individuals communicate &lt;&#47;br&gt; with each other based on known models, such as „iceberg model“ or „4-ears model“')" onmouseout="UnTip()" />
						<text x="75" y="32" font-family="sans-serif"  font-size="20px"  text-anchor="middle"  fill="black"onmouseover="Tip('Communications: &lt;&#47;br&gt; HOW &lt;&#47;br&gt; It’s about how individuals communicate &lt;&#47;br&gt; with each other based on known models, such as „iceberg model“ or „4-ears model“')"onmouseout="UnTip()">C</text>
					<circle id="icon_behaviour" cx="125" cy="25" r="13" stroke="black" stroke-width="0.5" fill="orange" onmouseover="Tip('Behavior: &lt;&#47;br&gt;  WHAT &lt;&#47;br&gt; Behavior (Verhalten) is about WHAT was/is going on. &lt;&#47;br&gt; This is about what to do or how to behave in a certain situation. It includes Do’s & Dont’s. ')" onmouseout="UnTip()"/>
						<text x="125" y="32" font-family="sans-serif"  font-size="20px"  text-anchor="middle"  fill="black"onmouseover="Tip('Behavior: &lt;&#47;br&gt;  WHAT &lt;&#47;br&gt; Behavior (Verhalten) is about WHAT was/is going on. &lt;&#47;br&gt; This is about what to do or how to behave in a certain situation. It includes Do’s & Dont’s. ')"onmouseout="UnTip()">B</text>
				</svg>

			</ul>
			-->
			<!-- End of line -->
			
			<!-- EDIT BY JONAS ON 27 FEB, 2016 -->
			<!-- Adding a new navbar element for the polarclock -->
			<!-- Start of line -->
			<ul class="nav navbar-nav second-button" style="margin-bottom:15px;">
				<li>
					<div style="margin-top:-25px;position:absolute;text-align:center;" id="polarclock">
					</div>
				</li>
			</ul>
			<!-- End of line -->
			
        </div>
        </div>
        <!-- /.container --> 
	   </nav>
	</div>
	<div  class="center mainWindow clearfix" data-options="region:'center'">
	
	
	<!--	<p class="bubble left" style="margin: 70px auto;">BrillianICM Rocks!</p>
		<p class="bubble right" style="margin: 30px auto;">BrillianICM Rocks!</p> -->
			
			<!--		<div class="mainLocationButton easyui-linkbutton" id="4" >START</div>	 -->
		<div class="mainEventContainer" data-options="inline:true, center:true, fit:true" ></div>
		<!--<div class="mainEventContainerLaptop easyui-window" data-options="closed:true,width:863,height:576"></div> -->
		<div class="mainEventContainerImprint easyui-window" data-options="closed:true,width:800,height:500"></div>
		<div class="mainEventContainerResult easyui-window" data-options="closed:true,maximized:true,noheader:true"></div>
		<div class="loadingScreen easyui-window" data-options="closed:true,maximized:true,noheader:true">
		<div class="loadingScreenImageContainer easyui-panel" data-options="fit:true,border:false"></div>
		</div>
		<div class="transitionScreen easyui-window" data-options="closed:true,noheader:true,width:800,height:500">
			<div class="transitionScreenImageContainer">
				<div class="transitionScreenTextContainer"></div>
				<div class="buttonContainer">
					<div id="continueButton" class="easyui-linkbutton transitionContinueButton">Next</div>
				</div>
			</div>			
		
		</div>
	</div>
</body>


<!-- EDIT BY JONAS ON FEB 28, 2016 -->
<!-- Adding indicators for the polarclock -->
<!-- Start of line -->
<script>
	var width = 100,
	    height = 100,
	    radius = Math.min(width, height) / 1.9,
	    spacing = .09;
		
	var progressValue = 0,
		KPIValues= new Array(0,0,0);
		
	var color = d3.scale.linear()
	    .range(["hsl(182, 50%, 50%)", "hsl(182, 100%, 50%)"])
	    .interpolate(function(a, b) { var i = d3.interpolateString(a, b); return function(t) { return d3.hsl(i(t)); }; });
	
	var color2 = d3.scale.linear()
	    .range(["hsl(82, 50%, 51%)", "hsl(82, 100%, 51%)"])
	    .interpolate(function(a, b) { var i = d3.interpolateString(a, b); return function(t) { return d3.hsl(i(t)); }; });
		//hsl(85, 100%, 50%)
	var color3 = d3.scale.linear()
	    .range(["hsl(323, 50%, 50%)", "hsl(323, 100%, 50%)"])
	    .interpolate(function(a, b) { var i = d3.interpolateString(a, b); return function(t) { return d3.hsl(i(t)); }; });	 
		
	var arcBody = d3.svg.arc()
	    .startAngle(0)
	    .endAngle(function(d) { return d.value * 2 * Math.PI; })
	    .innerRadius(function(d) { return d.index * radius; })
	    .outerRadius(function(d) { return (d.index + spacing) * radius; })
	    .cornerRadius(6);
	
	var arcCenter = d3.svg.arc()
	    .startAngle(0)
	    .endAngle(function(d) { return d.value * 2 * Math.PI; })
	    .innerRadius(function(d) { return (d.index + spacing / 2) * radius; })
	    .outerRadius(function(d) { return (d.index + spacing / 2) * radius; });
	
	var svg = d3.select("#polarclock").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
		
	
	var field = svg.selectAll("g")
	    .data(fields)
	  .enter().append("g");
	
	field.append("path")
	    .attr("class", "arc-body");
	
	field.append("path")
	    .attr("id", function(d, i) { return "arc-center-" + i; })
	    .attr("class", "arc-center");
	
	field.append("text")
	    .attr("dy", ".35em")
	    .attr("dx", ".75em")
	    .style("text-anchor", "start")
	  .append("textPath")
	    .attr("startOffset", "50%")
	    .attr("class", "arc-text")
	    .attr("xlink:href", function(d, i) { return "#arc-center-" + i; });
	tick();
	d3.select(self.frameElement).style("height", height + "px");
</script>
<!-- End of line -->



</html>
