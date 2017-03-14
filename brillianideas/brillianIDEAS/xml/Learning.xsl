<?xml version="1.0" encoding="utf-8" ?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" indent="yes" />
	<xsl:param name="guid" select="''" />
	<xsl:param name="withLink" select="'false'" />
	<xsl:param name="detail" select="'false'" />
	<xsl:param name="type" select="''" />
	<xsl:param name="class" select="''" />
	
	<xsl:template match="/">
		<xsl:for-each select="/Learnings/Learning/GUID[contains(text(),$guid)]/../Number[contains(text(), $class)]/../Type[contains(text(), $type)]/..">
			<xsl:element name="div">
				<xsl:choose>
					<xsl:when test="$detail = 'true'">
						<xsl:attribute name="data-bind"><xsl:value-of select="GUID" /></xsl:attribute>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="data-target"><xsl:value-of select="GUID" /></xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>

				<xsl:attribute name="class">learning</xsl:attribute>
					<xsl:choose>
						<xsl:when test="Thumb[not(text()=null or normalize-space(text())='')]">
							<xsl:choose>
								<xsl:when test="src[not(text()=null or normalize-space(text())='')]">
									<xsl:element name="a">
										<xsl:if test="$withLink = 'true'">
											<xsl:attribute name="href">
												<xsl:value-of select="src" />
											</xsl:attribute>
										</xsl:if>
										<xsl:attribute name="target">
                                    <xsl:text>
                                        _blank
                                    </xsl:text>
										</xsl:attribute>
										<xsl:element name="img">
											<xsl:attribute name="src">
												<xsl:text>img/learnings/</xsl:text><xsl:value-of select="Thumb" />
											</xsl:attribute>
											<xsl:attribute name="alt">
												<xsl:text>&#160;</xsl:text>
											</xsl:attribute>
											<xsl:attribute name="class">thumbnail</xsl:attribute>
										</xsl:element>
									</xsl:element>
								</xsl:when>
								<xsl:otherwise>
									<xsl:element name="img">
										<xsl:attribute name="src">
											<xsl:text>img/learnings/</:text><xsl:value-of select="Thumb" />
										</xsl:attribute>
										<xsl:attribute name="alt">
											<xsl:text>&#160;</xsl:text>
										</xsl:attribute>
										<xsl:attribute name="class">thumbnail</xsl:attribute>
									</xsl:element>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:when>
						<xsl:when test="Type[text()='film']/../Youtube_ID[not(text()=null or normalize-space(text())='')]">
							<xsl:choose>
								<xsl:when test="Embedded = 'true' and $withLink = 'true'">
									<xsl:element name="iframe">
										<xsl:attribute name="src">
									<xsl:text>
										https://www.youtube.com/embed/
									</xsl:text>
											<xsl:value-of select="Youtube_ID"/>
											<xsl:text>
										?rel=0&amp;controls=0&amp;showinfo=0
									</xsl:text>
										</xsl:attribute>
										<xsl:attribute name="width">500</xsl:attribute>
										<xsl:attribute name="height">295</xsl:attribute>
										<xsl:attribute name="frameborder">0</xsl:attribute>
										<xsl:attribute name="allowFullscreen">1</xsl:attribute>
									</xsl:element>
								</xsl:when>
								<xsl:otherwise>
									<xsl:element name="a">
										<xsl:if test="$withLink = 'true'">
											<xsl:attribute name="href">
												<xsl:text>https://youtu.be/</xsl:text>
												<xsl:value-of select="Youtube_ID" />
											</xsl:attribute>
										</xsl:if>
										<xsl:attribute name="target">
											<xsl:text>_blank</xsl:text>
										</xsl:attribute>
										<xsl:element name="img">
											<xsl:attribute name="src">https://i.ytimg.com/vi/<xsl:value-of select="Youtube_ID" />/hqdefault.jpg</xsl:attribute>
											<xsl:attribute name="alt">
												<xsl:text>&#160;</xsl:text>
											</xsl:attribute>
											<xsl:attribute name="class">thumbnail</xsl:attribute>
										</xsl:element>
									</xsl:element>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:when>
					</xsl:choose>
				<xsl:element name="div">
					<xsl:element name="h2">
						<xsl:value-of select="Titel" />
					</xsl:element>
					<xsl:if test="Android_ID[not(text()=null or normalize-space(text())='')] and $withLink = 'true'">
						<xsl:element name="a">
								<xsl:attribute name="href">
									<xsl:text>https://play.google.com/store/apps/details?id=</xsl:text>
									<xsl:value-of select="Android_ID" />
								</xsl:attribute>
								<xsl:attribute name="target">
                            <xsl:text>
                                _blank
                            </xsl:text>
								</xsl:attribute>
								<xsl:element name="img">
									<xsl:attribute name="src">./../img/AppStores/google.png</xsl:attribute>
									<xsl:attribute name="alt">Jetzt bei Play Store</xsl:attribute>
									<xsl:attribute name="class">AppStoreBadge</xsl:attribute>
								</xsl:element>
							</xsl:element>
						</xsl:if>
						<xsl:if test="IOS_ID[not(text()=null or normalize-space(text())='')] and $withLink = 'true'">
							<xsl:element name="a">
								<xsl:attribute name="href">
                            <xsl:text>
                                https://itunes.apple.com/us/app/id
                            </xsl:text>
									<xsl:value-of select="IOS_ID" />
								</xsl:attribute>
								<xsl:attribute name="target">
                            <xsl:text>
                                _blank
                            </xsl:text>
								</xsl:attribute>
								<xsl:element name="img">
									<xsl:attribute name="src">./../img/AppStores/Apple.svg</xsl:attribute>
									<xsl:attribute name="alt">Download on the AppStore</xsl:attribute>
									<xsl:attribute name="class">AppStoreBadge</xsl:attribute>
								</xsl:element>
							</xsl:element>
						</xsl:if>
					<xsl:element name="p">
						<xsl:if test="$detail='true'">
							<xsl:value-of select="Description" />
							<xsl:element name="br" />
						</xsl:if>
						<xsl:text>Stand: </xsl:text>
						<xsl:value-of select="Last_Modified" />
						<xsl:text>
                    &#169;
                </xsl:text>
						<xsl:value-of select="Copyright" />
						<xsl:element name="br" />
						<xsl:text>Autor: </xsl:text>
						<xsl:value-of select="Author" />
						<xsl:element name="br" />
						<xsl:text>Dauer: </xsl:text>
						<xsl:value-of select="Duration" />
					</xsl:element>
				</xsl:element>
			</xsl:element>
		</xsl:for-each>
	</xsl:template>

</xsl:stylesheet> 