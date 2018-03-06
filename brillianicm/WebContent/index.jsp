<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta charset="UTF-8">
<title>brillianICM - Development Konsole</title>
<!-- Bootstrap Core CSS -->
<link href="css/bootstrap.min.css" rel="stylesheet">
<script type="text/javascript" src="js/frameworks/jquery-2.0.0.min.js"></script>
<script type="text/javascript" src="js/frameworks/bootstrap.min.js"></script>
<!-- <script type="text/javascript" src="js/frameworks/jGravity-min.js"></script> -->
<style type="text/css">
.heart, #counter {
	color: #E74C3C;
}

.footer {
	position: fixed;
	bottom: 0;
	width: 100%;
	background-color: #2c3e50;
	font-size: 15px;
	text-align: right;
	color: white;
}

body {
	margin-bottom: 80px;
	height: 100 vh;
	width: 100 vw;
}

.container .text-margin {
	margin: 10px 5px;
}

.card {
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0
		rgba(0, 0, 0, 0.12);
}

.card {
	margin-top: 10px;
	box-sizing: border-box;
	border-radius: 2px;
	background-clip: padding-box;
}

.card .card-image {
	position: relative;
	overflow: hidden;
	background-color: #27ae60;
	z-index: -2;
	padding: 30px;
}

.card-image.hearty {
	background-color: #e74c3c;
}

.card .card-image img {
	border-radius: 2px 2px 0 0;
	background-clip: padding-box;
	position: relative;
	z-index: -1;
}

.card .card-image span.card-title {
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 16px;
}

.card .card-content {
	padding: 16px;
	border-radius: 0 0 2px 2px;
	background-clip: padding-box;
	box-sizing: border-box;
}

.card .card-content p {
	margin: 0;
	color: inherit;
}

.card .card-content span.card-title {
	line-height: 48px;
}

#server-indicator {
	cursor: pointer;
}

.heart-shape {
	position: relative;
	width: 20px;
	height: 20px;
	-webkit-transform: rotate(45deg);
	-moz-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	-o-transform: rotate(45deg);
	transform: rotate(45deg);
	background-color: #c0392b;
}

.heart-shape:before, .heart-shape:after {
	position: absolute;
	width: 20px;
	height: 20px;
	content: '';
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	-o-border-radius: 50%;
	border-radius: 50%;
	background-color: #c0392b;
}

.heart-shape:before {
	bottom: 0px;
	left: -10px;
}

.heart-shape:after {
	top: -10px;
	right: 0px;
}

#site {
	width: 100%;
	height: 100%;
	margin: 0 auto;
	position: fixed;
	overflow: hidden;
}
</style>
</head>

<body>
	<div id="site">
		<div id="heartZone"></div>
	</div>
	<div class="container">
		<div class="page-header">
			<h1>
				Development Console <small>brillianICM 2016</small>
			</h1>
			<span class="label label-default" id="server-indicator">Loading...</span>
			</p>
			<!--
            <div class="row">
            <div class="col-md-4 col-xs-6">
                <p>54.69.221.194 (Development Server)</p>
                <p>54.69.221.194 (Staging Server)</p>
                <p>54.69.221.194 (Production Server)</p></div>
                <div class="col-md-2 col-xs-5">
                <p><span class="label label-warning">Warning</span></p>
                <p><span class="label label-danger">Stopped</span></p>
                <p><span class="label label-success">Running</span></p></div>
            <div class="col-md-6 col-xs-1"></div>
            </div>
            -->

		</div>
		<div class="row">
			<!-- Card Projects -->
			<a href="contentquery.jsp">
				<div class="col-md-2 col-sm-3 ">
					<div class="card">
						<div class="card-image">
							<img class="img-responsive center-block" src="logo/node.png">
						</div>
						<div class="card-content">
							<p>Content Explorer</p>
						</div>
					</div>
				</div>
			</a> <a href="uploadfile.jsp">
				<div class="col-md-2 col-sm-3 ">
					<div class="card">
						<div class="card-image">
							<img class="img-responsive center-block" src="logo/upload.png">
						</div>
						<div class="card-content">
							<p>Upload XML File</p>
						</div>
					</div>
				</div>
			</a> <a href="uploadimage.jsp">
				<div class="col-md-2 col-sm-3 ">
					<div class="card">
						<div class="card-image">
							<img class="img-responsive center-block" src="logo/picture.png">
						</div>
						<div class="card-content">
							<p>Upload Image</p>
						</div>
					</div>
				</div>
			</a> <a href="uploadvideo.jsp">
				<div class="col-md-2 col-sm-3 ">
					<div class="card">
						<div class="card-image">
							<img class="img-responsive center-block" src="logo/video.png">
						</div>
						<div class="card-content">
							<p>Upload Video</p>
						</div>
					</div>
				</div>
			</a> <a href="viewfile.jsp">
				<div class="col-md-2 col-sm-3 ">
					<div class="card">
						<div class="card-image">
							<img class="img-responsive center-block" src="logo/xml.png">
						</div>
						<div class="card-content">
							<p>File Viewer</p>
						</div>
					</div>
				</div>
			</a> <a
				href="https://github.com/cheyer/brillianicm/blob/master/src/main/java/org/dhbw/imbit11/masterfile.xml"
				target="_blank">
				<div class="col-md-2 col-sm-3 ">
					<div class="card">
						<div class="card-image">
							<img class="img-responsive center-block" src="logo/xml.png">
						</div>
						<div class="card-content">
							<p>XML Tree</p>
						</div>
					</div>
				</div>
			</a>
		</div>
		<div class="row">
			<a
				href="https://www.dropbox.com/s/vy3537b9ifjzsg2/brillianICM%20Doku%20Gesamt_final.pdf?dl=0"
				target="_blank">
				<div class="col-md-2 col-sm-3 ">
					<div class="card">
						<div class="card-image">
							<img class="img-responsive center-block" src="logo/doc.png">
						</div>
						<div class="card-content">
							<p>Documentation</p>
						</div>
					</div>
				</div>
			</a> <a
				href="http://ec2-54-191-39-238.us-west-2.compute.amazonaws.com:8080/"
				target="_blank">
				<div class="col-md-2 col-sm-3 ">
					<div class="card">
						<div class="card-image">
							<img class="img-responsive center-block" src="logo/jenkins.png">
						</div>
						<div class="card-content">
							<p>Jenkins</p>
						</div>
					</div>
				</div>
			</a> <a href="${pageContext.request.contextPath}/Main">
				<div class="col-md-2 col-sm-3 ">
					<div class="card">
						<div class="card-image">
							<img class="img-responsive center-block" src="logo/run.png">
						</div>
						<div class="card-content">
							<p>Start App</p>
						</div>
					</div>
				</div>
			</a>
		</div>
		<!-- obsolete
				<a href="http://ec2-54-213-27-83.us-west-2.compute.amazonaws.com/apidocs">JavaDoc</a>
				<a href="http://ec2-54-213-27-83.us-west-2.compute.amazonaws.com/phpmyadmin/">PHPmyAdmin</a>
				<a href="/manager">Tomcat Manager</a>
                <a href="http://ec2-54-213-27-83.us-west-2.compute.amazonaws.com/catalina.out">Tomcat Logfile</a>

			-->
	</div>

	<footer class="footer ignoreMe">
		<div class="container ignoreMe">
			<p class="text-margin ignoreMe">
				brillianICM 2016 - Development Console - 4.0.0 - 06.03.2016 -
				developed with <span id="counter"></span> <span id="easter-heart"
					class="heart">♥</span> in Mannheim
			</p>
		</div>
	</footer>
	<script>
		$(document)
				.ready(
						function() {
							var counter = 0;
							function checkServerStatus(url) {
								var online = false;
								var script = document.body.appendChild(document
										.createElement("script"));
								script.onload = function() {
									console.log(url + " is online");
									$('#server-indicator').removeClass(
											'label-default');
									$('#server-indicator').addClass(
											'label-success');
									$('#server-indicator').html("Running");
								};
								script.onerror = function() {
									console.log(url + " is offline");
									$('#server-indicator').removeClass(
											'label-default');
									$('#server-indicator').addClass(
											'label-danger');
									$('#server-indicator').html("Error");
								};
								script.src = url;
								return online;
							}

							var prodServer = "https://www.brillianicm.com/";
							setTimeout(checkServerStatus(prodServer), 1500);
							$('#easter-heart').click(function() {
								counter++;
								$('#counter').html(counter);
								if (counter == 2) {
									$('#easter-heart').append("s");
								}
								if (counter == 10) {
									fallingHearts();
									$('.card-image').addClass('hearty');
									//$('.row').html("");
								}

								/*
								$('body').jGravity({
								    target: 'everything',
								    ignoreClass: 'ignoreMe',
								    weight: 25,
								    depth: 2,
								    drag: true
								});*/
							});
							function fallingHearts() {

								var $hearts = $(), qt = Math.floor((Math
										.random() * 100) + 1);
								;

								for (var i = 0; i < qt; ++i) {
									var $heart = $('<div class="heart-shape"></div>');
									$heart.css({
										'left' : (Math.random() * $('#site')
												.width())
												+ 'px',
										'top' : (-Math.random() * $('#site')
												.height())
												+ 'px'
									});
									// add this heart to the set of hearts
									$hearts = $hearts.add($heart);
									counter++;
									$('#counter').html(counter);
									$('#server-indicator').html(
											counter + " fallen ♥s");
								}

								$('#heartZone').prepend($hearts);

								$hearts.animate({
									top : "500px",
									opacity : "0",
								}, Math.random() + 5000, function() {
									$(this).remove();
									// run again when all 100 hearts hit the floor
									if (--qt < 1) {
										fallingHearts();
									}
								});
							}
						});
	</script>
</body>

</html>