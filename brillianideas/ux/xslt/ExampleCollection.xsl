<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" indent="yes" />
	<xsl:template match="/">
	<html>
		  <head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			
		<!-- Force reload -->
			<meta http-equiv="cache-control" content="max-age=0" />
			<meta http-equiv="cache-control" content="no-cache" />
			<meta http-equiv="expires" content="0" />
			<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
			<meta http-equiv="pragma" content="no-cache" />


			<title>Hallo meine UXler!</title>
			<style>
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
				<xsl:attribute name="src">./img/Bob/Oktopus-TEAM-ohne Text.png</xsl:attribute>
				<xsl:attribute name="class">bg_image</xsl:attribute>
				<xsl:attribute name="alt" />
			  </xsl:element>
				<h1>Hallihallo</h1>
				<ul>
					<xsl:for-each select="ExampleCollection/Example">
						<li><a href="{./@url}"><xsl:value-of select="./@name" /></a></li>
					</xsl:for-each>
				</ul>
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