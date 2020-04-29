<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes"/>

<xsl:template match="/">
	<html>
		<head>
			<title>Accueil Heredis</title>
			<link rel="stylesheet" href="styles.css" type="text/css"/>
			<link rel="stylesheet" href="stylecentrage.css" type="text/css"/>
			<!--<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Quicksand:300,400,700" type="text/css">-->
		</head>
		
		<body>
			<div class="hello">
				<xsl:value-of select="page/bonjour"/>
				<br />
				<span>
					<xsl:value-of select="page/prenom"/>
				</span>
			</div>
			<div id="titre">
				<div id="logo"/>
				 <p id="numVersion"><xsl:value-of select="page/version"/></p>
				<div id="liens">
					<a href="http://www.heredis.com" target="_blank">Heredis.com</a>
					<a href="http://www.heredis.com/aide-et-support/" target="_blank">Aide et support</a>
					<a href="hcommand-changerphoto">Changer le fond</a>
				</div>
			</div>
			<div id="background">
				<div id="colonnes">                    
					<div class="panneauGauche">
						<ul class="liensMenu">							
							<li>
								<a><xsl:attribute name="href">hcommand-webvideo</xsl:attribute>
									<span class="film">											
										<span class="text icon-mini-blank-Start">
										Comment utiliser Heredis
										</span>										
									</span>
								</a>
							</li>
							<li>
								<a><xsl:attribute name="href">hcommand-fichiersexemples</xsl:attribute>
									<span class="fichier">	
										<span class="text icon-mini-blank">
											Exemple
										</span>										
									</span>
								</a>
							</li>
						
							<li>
								<a><xsl:attribute name="href">hcommand-new-file</xsl:attribute>
									<span class="etoile">											
										<span class="text icon-mini-blank-Start">
										Nouvelle généalogie
										</span>										
									</span>
								</a>
							</li>
						
                        <li>
								<a><xsl:attribute name="href">hcommand-rechercher</xsl:attribute>
									<span class="loupe">	
										<span class="text icon-mini-blank">
											Rechercher
										</span>										
									</span>
								</a>
							</li>
                          
							<li>
								<a><xsl:attribute name="href">hcommand-open-file</xsl:attribute>
									<span class="folder-Start">	
										<span class="text icon-mini-blank-Start">
											Ouvrir une généalogie
										</span>										
									</span>
								</a>
							</li>
                            <li>
								<a><xsl:attribute name="href">hcommand-open-tree</xsl:attribute>
									<span class="folder">	
										<span class="text icon-mini-blank">
											Ouvrir un arbre
										</span>										
									</span>
								</a>
							</li>
                            <li>
								<a><xsl:attribute name="href">hcommand-open-gedcom</xsl:attribute>
									<span class="folder">	
										<span class="text icon-mini-blank">
											Ouvrir un GEDCOM
										</span>												
									</span>
								</a>
							</li>							
						</ul>					
                    </div>                      
					
					<div class="entire">
						<div class="col-2">
							<h2 class="clock"><xsl:value-of select="page/CadreRecents/titre"/></h2>
						
							<xsl:for-each select="page/CadreRecents/donnees">
								<div class="buttons">
								
									<div class="boutonfermer">
									
										<a title="{boutonfermer}" class="boutonfermer">
											<xsl:attribute name="href">
												<xsl:value-of select="urlclose"/>
											</xsl:attribute>									
										</a> 
									</div>
								
									<div class="list">								
										<a title="{alttext}"><xsl:attribute name="href"><xsl:value-of select="url"/></xsl:attribute>
											<span class="button">	
												<span class="text icon-mini-file" style="background-image: url('{Image/@URI}'); overflow: hidden; text-overflow: ellipsis;">
													<xsl:value-of select="text"/>													
													<img src="{Image/@URITache}" alt="{Image/@URIAlt}"/><br />
													<span class="infos"><xsl:value-of select="infos"/></span>
												</span>
											</span>
										</a>
									</div>
								</div>
							</xsl:for-each>
                        </div>
					</div>			
					
					<hr class="clear" />
				</div>	
			</div>
		</body>
	</html>
</xsl:template>


</xsl:stylesheet>