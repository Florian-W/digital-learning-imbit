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
	tr, td{
		padding: 5px;
		border: 1px solid black;
	}
	
	table{
		border: 1px solid black;
	}
			</style>
			
		</head>
		<body>
		<table>
			<thead>
			<h1><i>brillian</i>IDEAS</h1>
			<caption><a target="_blank" href="http://www.imbit.dhbw-mannheim.de/">IMBIT</a> digital learning plattform</caption>
			</thead>
			<tr>
			<th>Raum</th>
			<th>Team</th>
			</tr>
			<xsl:for-each select="Info/RoomInfo/Room">
			<tr>
				<td><xsl:value-of select="@no"/></td>
				<td><xsl:value-of select="@team"/></td>
			</tr>
			</xsl:for-each>
		</table>
		</body>
		</html>
	</xsl:template>

</xsl:stylesheet> 