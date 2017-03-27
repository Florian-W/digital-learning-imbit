<?xml version="1.0"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html"/>

    <xsl:param name="type"/>
    <xsl:param name="detail"/>
    <xsl:param name="filter" select="''"/>

    <xsl:template match="/">
        <xsl:choose>
            <xsl:when test="$type = 'learning'">
                <xsl:for-each select="/Categories/LearningType/Abbr[text() = $filter]/..">
                    <xsl:element name="div">
                        <xsl:attribute name="class"><xsl:text>selectionbody</xsl:text></xsl:attribute>
                        <xsl:attribute name="data-target">
                            <xsl:value-of select="Abbr" />
                        </xsl:attribute>
                        <xsl:element name="div">
                            <xsl:attribute name="class">
                                <xsl:text>category</xsl:text>
                            </xsl:attribute>
                            <xsl:element name="img">
                                <xsl:attribute name="alt">img</xsl:attribute>
                                <xsl:attribute name="src">
                                    <xsl:value-of select="Thumb"/>
                                </xsl:attribute>
                                <xsl:attribute name="class">
                                    <xsl:text>thumb</xsl:text>
                                </xsl:attribute>
                            </xsl:element>
                            <xsl:element name="h2">
                                <xsl:value-of select="Medium"/>
                            </xsl:element>
                            <xsl:if test="$detail = 'true'">
                                <xsl:element name="p">
                                    <xsl:value-of select="Description"/>
                                </xsl:element>
                            </xsl:if>
                        </xsl:element>
                    </xsl:element>
                </xsl:for-each>
            </xsl:when>
            <xsl:when test="$type = 'class'">
                <xsl:for-each select="/Categories/Classes/Number[contains(text(), $filter)]/..">
                <xsl:sort select="Number" data-type="text" order="ascending" />
                    <xsl:element name="div">
                        <xsl:attribute name="class"><xsl:text>selectionbody</xsl:text></xsl:attribute>
                        <xsl:attribute name="data-target"><xsl:value-of select="Number" /></xsl:attribute>
                            <xsl:element name="div">
                                <xsl:attribute name="class">
                                    <xsl:text>category</xsl:text>
                                </xsl:attribute>
                                <xsl:element name="img">
                                    <xsl:attribute name="alt">img</xsl:attribute>
                                    <xsl:attribute name="src"><xsl:value-of select="Thumb" /></xsl:attribute>
                                    <xsl:attribute name="class">
                                        <xsl:text>thumb</xsl:text>
                                    </xsl:attribute>
                                </xsl:element>
                                <xsl:element name="h2">
                                    <xsl:value-of select="Name" />
                                </xsl:element>
                            </xsl:element>
                        <xsl:element name="div">
                            <xsl:attribute name="class"><xsl:text>list</xsl:text></xsl:attribute>
                        </xsl:element>
                        </xsl:element>
                </xsl:for-each>
            </xsl:when>
        </xsl:choose>
    </xsl:template>

</xsl:stylesheet>