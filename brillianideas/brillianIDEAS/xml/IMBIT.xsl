<?xml version="1.0" encoding="utf-8" ?>

<xsl:stylesheet  version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:set="http://exslt.org/sets">

<xsl:output
method="xml"
version="1.0"
encoding="utf-8"
omit-xml-declaration="no"
indent="yes"
media-type="text/xml"/>



	
	<xsl:template match="/">
		<xsl:element name="Areas">
			<xsl:for-each select="set:distinct(//Area[not(text()=null or normalize-space(text())='')])">
				<xsl:element name="Area">
					<xsl:attribute name="id">
						<xsl:value-of select="." />
					</xsl:attribute>
					<xsl:call-template name="learnungunit">
						<xsl:with-param name="area" select="." />
					</xsl:call-template>
				</xsl:element>
			</xsl:for-each>
		</xsl:element>
	</xsl:template>
	<xsl:template name="learnungunit">
		<xsl:param name="area" />
		<xsl:for-each select="set:distinct(//Area[text() = $area]/../Abbreviation[not(text()=null or normalize-space(text())='')])">
			<xsl:element name="Learning_Unit">
				<xsl:attribute name="id">
					<xsl:value-of select="." />
				</xsl:attribute>
				<xsl:call-template name="learning">
					<xsl:with-param name="learningunit" select="." />
				</xsl:call-template>
			</xsl:element>
		</xsl:for-each>
	</xsl:template>
	<xsl:template name="learning">
		<xsl:param name="learningunit" />
		<xsl:for-each select="//Abbreviation[text() = $learningunit]/..">
			<xsl:element name="Learning">
				<xsl:element name="GUID">
					<xsl:value-of select="./GUID" />
				</xsl:element>
				<xsl:element name="Titel">
					<xsl:value-of select="./Titel" />
				</xsl:element>
				<xsl:element name="Description">
					<xsl:value-of select="./Description" />
				</xsl:element>
				<xsl:element name="Type">
					<xsl:value-of select="./Type" />
				</xsl:element>
				<xsl:element name="Embedded">
					<xsl:value-of select="./Embedded" />
				</xsl:element>
				<xsl:element name="src">
					<xsl:value-of select="./src" />
				</xsl:element>
				<xsl:element name="Youtube_ID">
					<xsl:value-of select="./Youtube_ID" />
				</xsl:element>
				<xsl:element name="IOS_ID">
					<xsl:value-of select="./IOS_ID" />
				</xsl:element>
				<xsl:element name="Android_ID">
					<xsl:value-of select="./Android_ID" />
				</xsl:element>
				<xsl:element name="Free_of_charge">
					<xsl:value-of select="./Free_of_charge" />
				</xsl:element>
				<xsl:element name="Fixed_StartDate">
					<xsl:value-of select="./Fixed_StartDate" />
				</xsl:element>
				<xsl:element name="Certificate">
					<xsl:value-of select="./Certificate" />
				</xsl:element>
				<xsl:element name="Certificate_Costs">
					<xsl:value-of select="./Certificate_Costs" />
				</xsl:element>
				<xsl:element name="Prestigious">
					<xsl:value-of select="./Prestigious" />
				</xsl:element>
				<xsl:element name="Duration">
					<xsl:value-of select="./Duration" />
				</xsl:element>
				<xsl:element name="Author">
					<xsl:value-of select="./Author" />
				</xsl:element>
				<xsl:element name="Copyright">
					<xsl:value-of select="./Copyright" />
				</xsl:element>
				<xsl:element name="Last_Modified">
					<xsl:value-of select="./Last_Modified" />
				</xsl:element>
				<xsl:element name="Thumb">
					<xsl:value-of select="./Thumb" />
				</xsl:element>
				<xsl:element name="Number">
					<xsl:value-of select="./Number" />
				</xsl:element>
				<xsl:element name="Abdeckungsgrad">
					<xsl:value-of select="./Abdeckungsgrad" />
				</xsl:element>
				<xsl:element name="Language">
					<xsl:value-of select="./Language" />
				</xsl:element>
				<xsl:element name="Tech_Requirements">
					<xsl:value-of select="./Tech_Requirements" />
				</xsl:element>
				<xsl:element name="Semester">
					<xsl:value-of select="./Semester" />
				</xsl:element>
				<xsl:element name="Recommended">
					<xsl:value-of select="./Recommended" />
				</xsl:element>
				<xsl:element name="Abbreviation">
					<xsl:value-of select="./Abbreviation" />
				</xsl:element>
				<xsl:element name="Area_Abbreviation">
					<xsl:value-of select="./Area_Abbreviation" />
				</xsl:element>
			</xsl:element>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
