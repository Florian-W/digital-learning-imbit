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
                <xsl:when test="$type='class'">
                    <xsl:for-each select="Categories/Classes">
                        <xsl:element name="div">
                            <xsl:attribute name="id">
                                <xsl:value-of select="Number"/>
                            </xsl:attribute>
                            <xsl:attribute name="class">
                                <xsl:text>flipcard</xsl:text>
                            </xsl:attribute>
                            <xsl:element name="div">
                                <xsl:attribute name="class">
                                    <xsl:text>face front</xsl:text>
                                </xsl:attribute>
                                <xsl:attribute name="data-target">
                                    <xsl:value-of select="Number"/>
                                </xsl:attribute>
                                <xsl:value-of select="Name"/>
                            </xsl:element>
                            <xsl:element name="div">
                                <xsl:attribute name="class">
                                    <xsl:text>face back</xsl:text>
                                </xsl:attribute>
                                <xsl:attribute name="data-bind">
                                    <xsl:value-of select="Number"/>
                                </xsl:attribute>
                            </xsl:element>
                        </xsl:element>
                    </xsl:for-each>
                </xsl:when>
            </xsl:choose>
        </xsl:element>
    </xsl:template>
</xsl:stylesheet>