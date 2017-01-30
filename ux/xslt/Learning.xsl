<?xml version="1.0" encoding="utf-8" ?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	<xsl:output method="html" indent="yes" />
	
	<xsl:template match="/">
		<html>
		<head>
		
		<!-- Force reload -->
			<meta http-equiv="cache-control" content="max-age=0" />
			<meta http-equiv="cache-control" content="no-cache" />
			<meta http-equiv="expires" content="0" />
			<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
			<meta http-equiv="pragma" content="no-cache" />


			<style>

.thumbnail{
	max-width: 500px;
}
.AppStoreBadge{
	display:block;
	height:38px;
	
	clear:both;
}
.bg_image{
	display:block;
	position:fixed;
	z-index: -1;
	width: 200px;
	float: right;
	bottom: 50px;
	right: 50px;
	
}

.hidden{
display:none;
}
.centerimg{
display: block;
height: 20vh;
margin-top: 40vh;
margin-left: auto;
margin-right: auto;
}
			</style>
			
		</head>
		<body onLoad="document.getElementById('wrapper').className='';document.getElementById('loading').className='hidden';">
		<div id="wrapper" class="hidden">
		  <xsl:element name="img">
			<xsl:attribute name="src">../img/Bob/Oktopus-TEAM-ohne Text.png</xsl:attribute>
			<xsl:attribute name="class">bg_image</xsl:attribute>
			<xsl:attribute name="alt" />
		  </xsl:element>
			<div style="max-width: 500px; display:block; width: 100 vw; margin-left:auto; margin-right:auto;">
				<h1>ExamplePage</h1>
				<h2>
				<xsl:value-of select="/Learning/Title" />
				</h2>
				<p>
					<xsl:choose>
						<xsl:when test="Learning/Source/Thumbnail">
							<xsl:choose>
								<xsl:when test="Learning/Source/URI">
									<a href="{Learning/Source/URI/@src}" target="_blank">
										<xsl:element name="img">
											<xsl:attribute name="src">
												<xsl:value-of select="Learning/Source/Thumbnail/@src" />
											</xsl:attribute>
											<xsl:attribute name="alt">
												<xsl:text>Thumbnail</xsl:text>
											</xsl:attribute>
											<xsl:attribute name="class">thumbnail</xsl:attribute>
										</xsl:element>	
									</a>
								</xsl:when>
								<xsl:otherwise>
									<xsl:element name="img">
										<xsl:attribute name="src">
											<xsl:value-of select="Learning/Source/Thumbnail/@src" />
										</xsl:attribute>
										<xsl:attribute name="alt">
											<xsl:text>Thumbnail</xsl:text>
										</xsl:attribute>
										<xsl:attribute name="class">thumbnail</xsl:attribute>
									</xsl:element>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:when>
						<xsl:when test="Learning/Source/Video">
							<xsl:choose>
								<xsl:when test="Learning/Source/Video/@embedded = 'true'">
									<xsl:element name="iframe">
										<xsl:attribute name="src">
											http://www.youtube.com/embed/<xsl:value-of select="Learning/Source/Video/@id"/>
										</xsl:attribute>
										<xsl:attribute name="width">500</xsl:attribute>
										<xsl:attribute name="height">295</xsl:attribute>
										<xsl:attribute name="frameborder">0</xsl:attribute>
										<xsl:attribute name="allowFullscreen">1</xsl:attribute>
									</xsl:element>
								</xsl:when>
								<xsl:otherwise>
									<a href="https://youtu.be/{Learning/Source/Video/@id}" target="_blank">
										<xsl:element name="img">
											<xsl:attribute name="src">https://i.ytimg.com/vi/<xsl:value-of select="Learning/Source/Video/@id" />/hqdefault.jpg</xsl:attribute>
											<xsl:attribute name="alt">
												<xsl:text>Thumbnail</xsl:text>
											</xsl:attribute>
											<xsl:attribute name="class">thumbnail</xsl:attribute>
										</xsl:element>
									</a>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:when>
					</xsl:choose>
					<xsl:if test="Learning/Source/App/Android">
						<a href="https://play.google.com/store/apps/details?id={Learning/Source/App/Android/@id}" target="_blank">
							<xsl:element name="img">
								<xsl:attribute name="src">./../img/AppStores/google.png</xsl:attribute>
								<xsl:attribute name="alt">Jetzt bei Play Store</xsl:attribute>
								<xsl:attribute name="class">AppStoreBadge</xsl:attribute>
							</xsl:element>
						</a>
					</xsl:if>
					<xsl:if test="Learning/Source/App/iOS">
						<a href="https://itunes.apple.com/us/app/id{Learning/Source/App/iOS/@id}" target="_blank">
							<xsl:element name="img">
								<xsl:attribute name="src">./../img/AppStores/Apple.svg</xsl:attribute>
								<xsl:attribute name="alt">Download on the AppStore</xsl:attribute>
								<xsl:attribute name="class">AppStoreBadge</xsl:attribute>
							</xsl:element>
						</a>
					</xsl:if>
				</p>
				<p>
					<xsl:value-of select="Learning/Description" />
					<br />
					Stand: <xsl:value-of select="Learning/Source/Stand" /> &#169; <xsl:value-of select="Learning/Source/Copyright" />
					<br />
					Autor: <xsl:value-of select="Learning/Source/Author" />
					<xsl:if test="/Learning/Source/Duration">
						Dauer: <xsl:value-of select="/Learning/Source/Duration" />
					</xsl:if>
				</p>
			</div>
		</div>
		<xsl:element name="img">
			<xsl:attribute name="src">https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif</xsl:attribute>
			<xsl:attribute name="alt" />
			<xsl:attribute name="class">centerimg</xsl:attribute>
			<xsl:attribute name="id">loading</xsl:attribute>
		</xsl:element>
		</body>
		</html>
	</xsl:template>

</xsl:stylesheet> 