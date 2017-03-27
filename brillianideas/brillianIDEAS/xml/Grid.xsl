<?xml version="1.0"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">

    <xsl:output method="html"/>
    <xsl:param name="type"/>

    <xsl:template match="/">
        <xsl:element name="div">
            <xsl:attribute name="id">
                <xsl:text>grid</xsl:text>
            </xsl:attribute>
            <xsl:choose>
                <xsl:when test="$type='learning'">
                    <xsl:for-each select="Categories/LearningType">
                        <xsl:element name="div">
                            <xsl:attribute name="id">
                                <xsl:value-of select="Abbr"/>
                            </xsl:attribute>
                            <xsl:attribute name="class">
                                <xsl:text>flipcard</xsl:text>
                            </xsl:attribute>
                            <xsl:element name="div">
                                <xsl:attribute name="class">
                                    <xsl:text>face front</xsl:text>
                                </xsl:attribute>
                                <xsl:attribute name="data-target">
                                    <xsl:value-of select="Abbr"/>
                                </xsl:attribute>
                                    <xsl:value-of select="Medium"/>
                            </xsl:element>
                            <xsl:element name="div">
                                <xsl:attribute name="class">
                                    <xsl:text>face back</xsl:text>
                                </xsl:attribute>
                                <xsl:attribute name="data-bind">
                                    <xsl:value-of select="Abbr"/>
                                </xsl:attribute>
                            </xsl:element>
                        </xsl:element>
                    </xsl:for-each>
                </xsl:when>
                <!-- 
                Die Zuweisung von Werten über "./Learning_Unit/Learning/Area_Abbreviation" ist eher ein 'Quick and Dirty' Ansatz.
                Besser wäre in der IMBIT.xsl dem Area Element ein Attribut oder direktes Child zuzuweisen, dass den Area_Abbreviation Wert enthält.io
                -->
                <xsl:when test="$type='class'">
                    <xsl:for-each select="//Area">
                        <xsl:element name="div">
                            <xsl:attribute name="id">
                                <xsl:value-of select="./Learning_Unit/Learning/Area_Abbreviation"/>
                            </xsl:attribute>
                            <xsl:attribute name="class">
                                <xsl:text>flipcard IMBIT_Weg</xsl:text>
                            </xsl:attribute>
                            <xsl:element name="div">
                                <xsl:attribute name="class">
                                    <xsl:text>face front</xsl:text>
                                </xsl:attribute>
                                <xsl:attribute name="data-target">
                                    <xsl:value-of select="./Learning_Unit/Learning/Area_Abbreviation"/>
                                </xsl:attribute>
                               		<xsl:value-of select="@id">
								</xsl:value-of>
                            </xsl:element>
                            <xsl:element name="div">
                                <xsl:attribute name="class">
                                    <xsl:text>face back</xsl:text>
                                </xsl:attribute>
                                <xsl:attribute name="data-bind">
                                    <xsl:value-of select="./Learning_Unit/Learning/Area_Abbreviation"/>
                                </xsl:attribute>
                            </xsl:element>
                        </xsl:element>
                    </xsl:for-each>
                </xsl:when>
				<xsl:when test="$type='newcontent'">
                    <xsl:for-each select="Categories/NewContentItems">
                        <xsl:element name="div">
                            <xsl:attribute name="id">
                                <xsl:value-of select="NewContent_Video"/>
                            </xsl:attribute>
                            <xsl:attribute name="class">
                                <xsl:text>slidecard</xsl:text>
                            </xsl:attribute>
							<xsl:attribute name="data-bind">
                                <xsl:value-of select="NewContent_Video"/>
                            </xsl:attribute>
							<xsl:choose>
							<xsl:when test="NewContent_Video[not(text()=null or normalize-space(text())='')]">
							<xsl:element name="iframe">
								<xsl:attribute name="width">560</xsl:attribute>
								<xsl:attribute name="height">315</xsl:attribute>
								<xsl:attribute name="src">https://www.youtube.com/embed/<xsl:value-of select="NewContent_Video"/><xsl:text>?rel=0&amp;controls=0&amp;showinfo=0</xsl:text></xsl:attribute>
								<xsl:attribute name="frameborder">0</xsl:attribute>
								<xsl:attribute name="allowfullscreen">allowfullscreen</xsl:attribute>
							</xsl:element>
							</xsl:when>
							<xsl:otherwise>							
							</xsl:otherwise>
							</xsl:choose>
							<xsl:element name="div">
								<xsl:attribute name="class">beschreibung</xsl:attribute>
							 	<xsl:element name="p">
							 		<xsl:value-of select="NewContent_Beschreibung"/>
								</xsl:element>
							</xsl:element>
							<xsl:element name="div">
								<xsl:element name="button">
									<xsl:attribute name="jsonFileName"><xsl:value-of select="jsonFileName"/></xsl:attribute>
									<xsl:attribute name="type">button</xsl:attribute>
									<xsl:attribute name="class"><xsl:value-of select="ButtonClass"/></xsl:attribute>
									<xsl:attribute name="id"><xsl:value-of select="ButtonID"/></xsl:attribute>
										Quiz<xsl:element name="br"></xsl:element>
										<xsl:value-of select="NewContent_Name"/>
								</xsl:element>
							</xsl:element>
                    	</xsl:element>
                    </xsl:for-each>
                </xsl:when>
            </xsl:choose>
        </xsl:element>
    </xsl:template>
</xsl:stylesheet>
