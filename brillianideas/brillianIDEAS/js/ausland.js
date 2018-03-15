/* Initialize Map */
function initMap() {
    var mycenter = {
        lat: 25,
        lng: 1
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3.0,
        center: mycenter
    });

    map.addListener("click", function (event){
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
    });

	/*Customized Icons*/

	    var iconOctopus1 = '../img/marker-medium.png';

    /* Initialize Markers + InfoWindow + ContentStrings */

    /* Initialize Marker 2 (London) */
    var contentString2 = '<div id="content">' +
        '<h1 id="firstHeading">&ndash; London &ndash;</h1>' +
		'<h2 id="secondHeading">Julia, 23</h2>' +
        '<div id="bodyContent">' +
        '<p> ' +
		'Ich habe in meinem Auslandseinsatz das Projektmanagement eines Charter Clients unterstützt. Hierbei konnte ich viele spannende Einblicke in die Tätigkeiten einer Beraterin auf einem Kundenprojekt im Bereich der Konsumgüterindustrie gewinnen. Besonders interessant war die direkte Interaktion mit dem Kunden im Bereich Scope Management. Persönlich gewachsen bin ich an den Aufgaben, die ich selbstständig bearbeitet und mit dem Kunden besprochen habe.' +
		'<h2 id="secondHeading">Lara, 21</h2>' +
        '<div id="bodyContent">' +
        '<p> ' +
		'Ich war zwei Monate in London und habe dort für einen Kunden der Konsumgüterindustrie das Go-Live eines Salesforce Projektes begleitet. Meine Aufgaben dabei umfassten, vor allem das Testing der implementierten Funktionen sowie die Administration und Bereitstellung einer Salesforce Testumgebung. So hatte ich die Möglichkeit, die Prozesse vor Ort beim Kunden besser nachvollziehen zu können. Außerdem hatte ich an den Wochenenden die Möglichkeit, London sowie weitere Städte und Sehenswürdigkeiten in Großbritannien zu erkunden.' +

		'<h2 id="secondHeading">Sebastian, 21</h2>' +
        '<div id="bodyContent">' +
        '<p> ' +
		'Im Rahmen meines Auslandsaufenthaltes in London habe ich auf zwei Projekten mitgearbeitet. Im ersten Projekt haben wir für einen Kunden SAP Reports auf Completeness und Accuracy getestet. Dahingegen befasste sich das Zweite mit der Erstellung und Auswertung eines standardisierten Assessments in einem Governance Portal. Die Tätigkeiten waren sehr anspruchsvoll, aber nicht minder spannend. In meiner Freizeit und an den Wochenenden war ich häufig in der Stadt unterwegs und konnte so vieles sehen und erleben, was ich als Tourist nicht hätte mitbekommen können.' +
        '</p>' +
        '</div>' +
        '</div>';
        '</div>' +
        '</div>';

    var infowindow2 = new google.maps.InfoWindow({
        content: contentString2
    });

    var marker2 = new google.maps.Marker({
        position: {
            lat: 51.509865,
            lng: -0.118092
        },
        map: map,
        title: 'London',
		icon: iconOctopus1
    });

    marker2.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow2.open(map, marker2);
    });

    /* End Marker 2 */
    /* Initialize Marker 3 (Mailand) */
    var contentString3 = '<div id="content">' +
        '<h1 id="firstHeading">&ndash; Mailand &ndash;</h1>' +
		'<h2 id="secondHeading">Christian, 21</h2>' +
        '<div id="bodyContent">' +
        '<p>Ich war drei Monate an einem Auslandsstandort meiner Firma in Mailand. Hier habe ich mit einem internationalen Team eine neue Software für das Warehouse Management eingeführt. Mein Aufgabenbereich war vielfältig und herausfordernd. Ein Highlight war für mich das Arbeiten in einem internationalen Team und einer anderen Kultur, da sich dies noch einmal deutlich vom Arbeiten in internationalen Teams in Deutschland unterscheidet. Hierbei hat mir Spanisch als erlernte Fremdsprache an der DHBW geholfen, da Italienisch und Spanisch recht ähnlich sind. Das hat es mir erleichtert, auch noch etwas Italienisch zu lernen. An den Wochenenden habe ich die Stadt Mailand erkundet oder bin mit Freunden per Auto durch Nord-Italien gereist.' +
        '</p>' +
        '</div>' +
        '</div>';
        '</div>' +
        '</div>';

    var infowindow3 = new google.maps.InfoWindow({
        content: contentString3
    });

    var marker3 = new google.maps.Marker({
        position: {
            lat: 45.464211,
            lng: 9.191383
        },
        map: map,
		icon: iconOctopus1,
        title: 'Mailand'
    });

    marker3.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow3.open(map, marker3);
    });

    /* End Marker 3 */
     /* Initialize Marker4 (Hongkong) */
    var contentString4 = '<div id="content">' +
		'<h1 id="firstHeading">&ndash; Hongkong &ndash;</h1>' +
		'<h2 id="secondHeading">Elias, 22</h2>' +
        '<div id="bodyContent">' +
        '<p>Während meiner Zeit in Hongkong war ich Teil des Performance Improvement Teams. Mein Fokus lag darauf, verschiedene Unternehmen bezüglich der Auswirkungen neuer Technologien wie Blockchain, FinTech und Cloud-Lösungen auf ihr Unternehmensmodell zu beraten. Darüber hinaus unterstützte ich bei der Entwicklung digitaler Strategien zur Optimierung des Kundenerlebnisses und der User Journeys. Sehr gut haben mir der hohe Grad an Eigenverantwortung und das starke Vertrauen in die Fähigkeiten der Mitarbeiter gefallen, welche im asiatischen Raum besonders ausgeprägt sind. Während meiner Freizeit hatte ich die Möglichkeit, meinen interkulturellen Horizont zu erweitern, indem ich eine Vielzahl von Orten in der Volksrepublik China, Thailand, Malaysia und sogar der Demokratischen Volksrepublik Korea (Nordkorea) besucht habe.' +
        '</p>' +
        '</div>' +
        '</div>';

    var infowindow4 = new google.maps.InfoWindow({
        content: contentString4
    });

    var marker4 = new google.maps.Marker({
        position: {
            lat: 22.286394,
            lng: 114.149139
        },
        map: map,
		icon: iconOctopus1,
        title: 'Hongkong'
    });

    marker4.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow4.open(map, marker4);
    });

    /* End Marker 4 */
  /* Initialize Marker5 (Dublin) */
    var contentString5 = '<div id="content">' +
        '<h1 id="firstHeading">&ndash; Dublin &ndash;</h1>' +
		'<h2 id="secondHeading">Felix, 21</h2>' +
        '<div id="bodyContent">' +
        '<p>Ich war zwei Monate lang im Digital Sales Centre in Dublin tätig, wo ich die Möglichkeit hatte, mit einem jungen, motivierten Team zu arbeiten. In einem solch internationalen Team waren besonders die im ICM Unterricht erlernten Kenntnisse sowie die Cloud Vorlesungen hilfreich. Abends ging es dann immer in die Innenstadt, wo man in den zahlreichen Pubs mit sehr internationalem Flair den Abend ausklingen lassen konnte.' +
        '</p>' +
        '</div>' +
        '</div>';

    var infowindow5 = new google.maps.InfoWindow({
        content: contentString5
    });

    var marker5 = new google.maps.Marker({
        position: {
            lat: 53.350140,
            lng: -6.266155
        },
        map: map,
		icon: iconOctopus1,
        title: 'Dublin'
    });

    marker5.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow5.open(map, marker5);
    });

    /* End Marker 5 */
	 /* Initialize Marker6 (Bratislava) */
    var contentString6 = '<div id="content">' +
        '<h1 id="firstHeading">&ndash; Bratislava &ndash;</h1>' +
		'<h2 id="secondHeading">Jil, 21</h2>' +
        '<div id="bodyContent">' +
        '<p>Ich habe zwei Monate an der Webpräsenz meiner Firma mitgeholfen, indem ich weltweite Aufträge bearbeitet und implementiert habe. Insbesondere die Vorlesungen in Webprogrammierung sowie die anderen Programmiervorlesungen haben mir dabei geholfen, mich schnell ins Thema einzuarbeiten. Das Arbeiten im Ausland, besonders im Osten Europas, hat mir gezeigt, wie unterschiedlich Arbeitnehmer in verschiedenen Ländern verdienen und war eine lehrreiche Erfahrung für mich, wie gut es uns in Deutschland geht. Des Weiteren konnte ich von dort viele osteuropäische Länder gut bereisen.'
		'</p>' +
        '</div>' +
        '</div>';

    var infowindow6 = new google.maps.InfoWindow({
        content: contentString6
    });

    var marker6 = new google.maps.Marker({
        position: {
            lat: 48.148598,
            lng: 17.107748
        },
        map: map,
		icon: iconOctopus1,
        title: 'Bratislava'
    });

    marker6.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow6.open(map, marker6);
    });

    /* End Marker 6 */
	 /* Initialize Marker7 (Madrid) */
    var contentString7 = '<div id="content">' +
        '<h1 id="firstHeading">&ndash; Madrid &ndash;</h1>' +
		'<h2 id="secondHeading">Kevin, 22</h2>' +
        '<div id="bodyContent">' +
        '<p>' +
        'Im Zuge meines Studiums habe ich drei Monate in Spaniens Hauptstadt Madrid verbracht. Dort war ich, neben dem Schreiben einer Projektarbeit, an der Einführung eines neuen SAP CRM Systems für unsere Standorte in Spanien, UK und Südafrika involviert. Geholfen haben mir dabei Vorlesungen wie Wirtschaftsinformatik und Datenbanken. Meine Freizeit habe ich mit der spanischen Küche, dem Nachtleben sowie den vielen Sehenswürdigkeiten und in Museen verbracht, die die Stadt zu bieten hat. Insgesamt war es eine tolle Erfahrung.'
		'</p>' +
        '</div>' +
        '</div>';

    var infowindow7 = new google.maps.InfoWindow({
        content: contentString7
    });

    var marker7 = new google.maps.Marker({
        position: {
            lat: 40.416775,
            lng: -3.707398
        },
        map: map,
		icon: iconOctopus1,
        title: 'Madrid'
    });

    marker7.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow7.open(map, marker7);
    });

    /* End Marker 7 */
		 /* Initialize Marker8 (San Miguel de Allende) */
    var contentString8 = '<div id="content">' +
        '<h1 id="firstHeading">&ndash; San Miguel de Allende &ndash;</h1>' +
		'<h2 id="secondHeading">Maria, 28</h2>' +
        '<div id="bodyContent">' +
        '<p>' +
        'Sehr kurzfristig schickte mich mein Chef zu einem Kunden in Mexiko, bei dem der Go-Live der Produktion in einem neuen Werk erfolgen sollte, ohne dass die IT-Infrastruktur dazu bereit war. Ich hatte vor Ort nur dreieinhalb Tage Zeit, um den IT-Verantwortlichen so gut wie möglich zu unterstützen. Dennoch habe ich in dieser Zeit viel über Kommunikation und interkulturelles Management gelernt und konnte meine Spanischkenntnisse sehr erfolgreich einsetzen. Besonders durch die Kommunikation zwischen den Service Providern konnte ich zum Erfolg des Go-Lives beitragen. Außerdem konnte ich mir die hübschen Städte Querétaro und San Miguel anschauen und die Kultur ein bisschen kennen lernen.'
		'</p>' +
        '</div>' +
        '</div>';

    var infowindow8 = new google.maps.InfoWindow({
        content: contentString8
    });

    var marker8 = new google.maps.Marker({
        position: {
            lat: 20.91528,
            lng: -100.74389
        },
        map: map,
		icon: iconOctopus1,
        title: 'San Miguel de Allende'
    });

    marker8.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow8.open(map, marker8);
    });

    /* End Marker 8 */
			 /* Initialize Marker9 (Singapur) */
    var contentString9 = '<div id="content">' +
		'<h1 id="firstHeading">&ndash; Singapur &ndash;</h1>' +
		'<h2 id="secondHeading">Luca, 22</h2>' +
        '<div id="bodyContent">' +
        '<p>' +

		'Durch meinen Auslandseinsatz habe ich die Möglichkeit bekommen zu erfahren, wie es ist, in einer anderen Umgebung zu arbeiten. Es hat mir gezeigt, wie viel ich über die letzten Jahre gelernt habe und wo ich noch Verbesserungspotenzial habe. Insgesamt war der Auslandseinsatz die perfekte Umgebung, um meine Zukunft nach dem Studium zu testen. Ähnlich wie ich es in einer neuen Firma tun würde, habe ich in einer neuen Stadt, mit neuen Kollegen und Abläufen arbeiten dürfen.' +

		'<h2 id="secondHeading">Nina, 23</h2>' +
        '<div id="bodyContent">' +
        '<p>' +
        'Ich war zwei Monate in Singapur und habe in einem Sales Team mit Verantwortlichkeit über ganz Asia-Pacific gearbeitet. Die Sales Aktivitäten haben an viele gelernte Fähigkeiten aus den Vorlesungen an der DHBW angeknüpft, unter anderem an Kenntnisse aus Wirtschaftsinformatik, der IoT Fallstudie in Semester 4 und natürlich ICM. Da Sales Teams meistens nicht zusammen in der Firma sitzen sondern sich vor Ort beim Kunden aufhalten, hatte ich sofort selbständig arbeiten und mit den Menschen vor Ort kommunizieren müssen, was unheimlich viel Spaß gemacht hat. Ich habe dadurch viele Menschen aus ganz unterschiedlichen Kulturen kennengelernt. Nach der Arbeit sind meine Kollegen sehr oft mit mir essen gegangen oder haben mir mehr von Singapur gezeigt. An den Wochenenden habe ich oft Kurztrips in andere asiatische Städte gemacht oder mich mit Freunden am Strand getroffen.' +

		'<h2 id="secondHeading">Stefany, 22</h2>' +
        '<div id="bodyContent">' +
        '<p>' +
   		'Ich war zwei Monate in Singapur und habe dort für meine Abteilung ein Sales Seminar geplant. In diesem Rahmen musste ich alles vom Kundenprofiling bis zur Organisation vom Event durchführen, was sehr spannend war. Obwohl viel zu tun war, sind wir mit den Kollegen oft abends noch etwas trinken gegangen und an Wochenenden bin ich viel gereist. Da viele Kommilitonen zur selben Zeit in Asien waren, konnte man sich super gegenseitig besuchen. Ich kann es jedem empfehlen und würde jederzeit wieder dorthin fliegen!' +
		'</p>' +
        '</div>' +
        '</div>';

    var infowindow9 = new google.maps.InfoWindow({
        content: contentString9
    });

    var marker9 = new google.maps.Marker({
        position: {
            lat: 1.290270,
            lng: 103.851959
        },
        map: map,
		icon: iconOctopus1,
        title: 'Singapur'
    });

    marker9.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow9.open(map, marker9);
    });

    /* End Marker 9 */
				 /* Initialize Marker10 (Atlanta) */
    var contentString10 = '<div id="content">' +
		'<h1 id="firstHeading">&ndash; Atlanta &ndash;</h1>' +
		'<h2 id="secondHeading">Rebecca, 26</h2>' +
        '<div id="bodyContent">' +
        '<p>' +
		'Ich war zwei Monate in Atlanta, Georgia, und habe auf einem Projekt mitgearbeitet, bei dem es um die technische Umsetzung der neuen GDPR-Richtlinien ging. Meine Aufgaben dort reichten von Projektmanagement-Tätigkeiten über die Visualisierung der benötigten IT-Architektur bis hin zum Provisioning entsprechender Server. Besonders gefiel mir, wie abwechslungsreich meine Aufgaben waren und dass es sich um ein hochaktuelles Thema handelte sowie die Arbeit in einem sehr internationalen, weltweit aufgestellten Team. Hilfreich waren für mich die an der DHBW erlernte Aspekte des Projektmanagements und der Systemanalyse (bzw. des Systemdesigns). In meiner Freizeit war ich viel mit Locals unterwegs, um die Region zu erkunden oder bin gereist.'+

        '<h2 id="secondHeading">Sophia, 22</h2>' +
        '<div id="bodyContent">' +
        '<p>' +
        'Ich war drei Monate in Atlanta und habe dort meine Abteilung in einem internen Strategieprojekt unterstützt. In dem Projekt ging es um die Konstruktion einer Datenplattform, die zum Ziel hatte, fundierte, datengesteuerte Geschäftsentscheidungen basierend auf zuverlässigen und umfassenden Datensätzen zu treffen. Insgesamt konnte ich mich in vielerlei Hinsicht weiterentwickeln. Zum einen ist das Arbeiten in einem anderen Land immer mit interkulturellen Differenzen, die es zu überbrücken gilt, verbunden und zum anderen hatte ich die Möglichkeit, insbesondere mein erlerntes Fachwissen aus Datenbanken, Systemanalyse und Communication Systems, in der Praxis anzuwenden. An den Wochenenden und in meinem Urlaub habe ich die Zeit genutzt, um quer durch die USA zu reisen. Ich würde es auf jeden Fall wieder machen.'
		'</p>' +
        '</div>' +
        '</div>';

    var infowindow10 = new google.maps.InfoWindow({
        content: contentString10
    });

    var marker10 = new google.maps.Marker({
        position: {
            lat: 33.753746,
            lng: -84.386330
        },
        map: map,
		icon: iconOctopus1,
        title: 'Atlanta'
    });

    marker10.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow10.open(map, marker10);
    });

    /* End Marker 10 */
					 /* Initialize Marker11 (Beijing) */
    var contentString11 = '<div id="content">' +
		'<h1 id="firstHeading">&ndash; Beijing &ndash;</h1>' +
		'<h2 id="secondHeading">Fabian, 20</h2>' +
        '<div id="bodyContent">' +
        '<p>' +
		'Ich war zwei Monate für einen großen amerikanischen IT-Konzern im Bereich Customer Experience in China tätig. Neben den fachlichen Herausforderungen, wie den starken Restriktionen für ausländische Unternehmen in China, lagen die größten Schwierigkeiten für mich im interkulturellen Umfeld. Die Arbeitsmentalität und Kommunikationsbereitschaft weicht sehr stark von deutscher Pünktlichkeit und Ordnung ab. Aber nach den ersten Kommunikationsschwierigkeiten sind mir viele Kollegen und neue Bekannte sehr freundlich und höflich begegnet und ich hatte eine tolle Zeit in einer der größten Metropolen der Welt.' +
        '<h2 id="secondHeading">Tobias, 22</h2>' +
        '<div id="bodyContent">' +
        '<p>' +
        'Im Zuge eines Outsourcing-Projektes für einen Kunden bin ich nach Beijing gereist. Vor Ort habe ich eine Bestandsaufnahme der SAP- & IT-Prozesse gemacht und evaluiert, welche Aufgaben ein zukünftiger Service Provider zu bewältigen hat, sowie diese in einem Anforderungskatalog erfasst. Mit Hilfe von Request for Proposals, aufgebaut anhand des Anforderungskataloges, holte ich mehrere Service-Angebote für unseren Kunden ein und übergab diese dem General Manager China. Die Selbstständigkeit und Eigenverantwortung in meinem Projekt haben mich, insbesondere in der Bewältigung von Herausforderungen, aber auch in meiner Organisation und Planung, besser gemacht. Hilfreich waren für mich hier die an der DHBW erlernten Kenntnisse im Projektmanagement sowie dem Fachwissen aus IT und Wirtschaftsinformatik. Abseits des geschäftlichen Alltags nutzte ich die Wochenenden, um mit Freunden diverse Städte und Sehenswürdigkeiten zu besichtigen.' +
        '</p>' +
        '</div>' +
        '</div>';

    var infowindow11 = new google.maps.InfoWindow({
        content: contentString11
    });

    var marker11 = new google.maps.Marker({
        position: {
            lat: 39.913818,
            lng: 116.363625
        },
        map: map,
		icon: iconOctopus1,
        title: 'Beijing'
    });

    marker11.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow11.open(map, marker11);
    });

    /* End Marker 11 */
	/* Initialize Marker12 (Krakau) */
    var contentString12 = '<div id="content">' +
        '<h1 id="firstHeading">&ndash; Krakau &ndash;</h1>' +
		'<h2 id="secondHeading">Niklas, 21</h2>' +
		'<div id="bodyContent">' +
        '<p>' +
        'Meinen Auslandseinsatz verbrachte ich in einem Finance Shared Service Center eines Kunden aus der Chemieindustrie. Dort arbeitete ich in den Bereichen Record-To-Report sowie Procure-To-Pay Accounting und unterstützte den Kunden bei seiner Financial Transformation. Die Zeit im Ausland war für mich eine sehr wertvolle Erfahrung - sowohl in fachlicher, als auch persönlicher Hinsicht. ' +
        '</p>' +
        '</div>' +
        '</div>';

    var infowindow12 = new google.maps.InfoWindow({
        content: contentString12
    });

    var marker12 = new google.maps.Marker({
        position: {
            lat: 50.049683,
            lng: 19.944544
        },
        map: map,
		icon: iconOctopus1,
        title: 'Krakau'
    });

    marker12.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow12.open(map, marker12);
    });

    /* End Marker 12 */
		/* Initialize Marker13 (Linz) */
    var contentString13 = '<div id="content">' +
        '<h1 id="firstHeading">&ndash; Linz &ndash;</h1>' +
		'<h2 id="secondHeading">Tatsiana, 25</h2>' +
        '<div id="bodyContent">' +
        '<p>' +
        'Ich verbrachte eine Praxisphase in einem Tochterunternehmen meines Ausbildungsbetriebes in Österreich. Es hat mir dort gut gefallen, meine Kollegen waren sehr freundlich und das Büro ist schön. Dort habe ich meine zweite Projektarbeit verfasst und meine Kollegen haben mich dabei sehr gut unterstützt.'
        '</p>' +
        '</div>' +
        '</div>';

    var infowindow13 = new google.maps.InfoWindow({
        content: contentString13
    });

    var marker13 = new google.maps.Marker({
        position: {
            lat: 48.30694,
            lng: 14.28583
        },
        map: map,
		icon: iconOctopus1,
        title: 'Linz'
    });

    marker13.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow13.open(map, marker13);
    });

    /* End Marker 13 */
	/* Initialize Marker14 (Boston) */
    var contentString14 = '<div id="content">' +
        '<h1 id="firstHeading">&ndash; Boston &ndash;</h1>' +
		'<h2 id="secondHeading">Liza, 22</h2>' +
       '<div id="bodyContent">' +
        '<p>' +
        'Ich habe meinen dreimonatigen Auslandsaufenthalt in Boston verbracht. Dort arbeitete ich mit dem Software Entwicklungsteam für HR Solutions zusammen und habe den Go-to-Market-Prozess eines Produktes unterstützt. Ich konnte viele erlernte Fähigkeiten aus den Vorlesungen an der DHBW anwenden, besonders beim technischen Verständnis und bei der interkulturellen Zusammenarbeit. Neben der Arbeit habe ich die Chance genutzt, das Land zu erkunden und so viele Orte wie möglich zu sehen. Ich bin sehr froh darüber, dass mir die Chance gegeben wurde, für drei Monate in einem anderen Land zu leben und zu arbeiten. '
		'</p>' +
        '</div>' +
        '</div>';

    var infowindow14 = new google.maps.InfoWindow({
        content: contentString14
    });

    var marker14 = new google.maps.Marker({
        position: {
            lat: 42.361145,
            lng: -71.057083
        },
        map: map,
		icon: iconOctopus1,
        title: 'Boston'
    });

    marker14.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow14.open(map, marker14);
    });

    /* End Marker 14 */
		/* Initialize Marker15 (Brasov) */
    var contentString15 = '<div id="content">' +
        '<h1 id="firstHeading">&ndash; Brasov &ndash;</h1>' +
		'<h2 id="secondHeading">Katharina, 22</h2>' +
        '<div id="bodyContent">' +
        '<p>' +
        'Meinen zweimonatigen Auslandseinsatz verbrachte ich in Brasov, Rumäninen, auf einem Projekt in der Versicherungsbranche. Hier habe ich ein Konzept erstellt, um auf einer internen Webseite Gamification zu implementieren. Hierzu habe ich mehrere kleine Design Thinking Workshops durchgeführt und mithilfe von Axure RP Screens erstellt, an denen sich die Entwickler orientieren konnten. Meine Kollegen waren sehr hilfsbereit und ich habe selten so eine Gastfreundschaft erlebt Rumänien ist nicht so, wie man es sich vorstellt: die Natur ist der Wahnsinn, die Berge sind vergleichbar mit den Alpen.'
		'</p>' +
        '</div>' +
        '</div>';

    var infowindow15 = new google.maps.InfoWindow({
        content: contentString15
    });

    var marker15 = new google.maps.Marker({
        position: {
            lat: 45.64861,
            lng: 25.60613
        },
        map: map,
		icon: iconOctopus1,
        title: 'Brasov'
    });

    marker15.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow15.open(map, marker15);
    });

    /* End Marker 15 */
		/* Initialize Marker16 (New York) */
    var contentString16 = '<div id="content">' +
		'<h1 id="firstHeading">&ndash; New York &ndash;</h1>' +
		'<h2 id="secondHeading">Alexandra, 21</h2>' +
        '<div id="bodyContent">' +
        '<p>' +
        'Meinen Auslandseinsatz habe ich im Hauptsitz meiner Firma in Armonk, USA, verbracht, welches nahe New York liegt. Hier habe ich das Programmmanagement unseres "Corporate Service Corps" pro bono Programmes unterstützt und wertvolle Einblicke in den Bereich der Corporate Citizenship bekommen. In der Zeit konnte ich sehr viel lernen - sowohl fachlich, als auch in Sachen interkulturelle Kommunikation. Nach der Arbeit und an den Wochenenden ging es fast immer nach New York - eine unglaubliche Stadt, in welcher es einem nie langweilig wird! ' +

        '<h2 id="secondHeading">Felix, 21</h2>' +
		'<div id="bodyContent">' +
        '<p>' +
        'In meinem vierten Praxiseinsatz hatte ich die Chance, für zweieinhalb Monate im Bereich Corporate Citizenship in New York zu arbeiten. Ich war verantwortlich, ein Bewerbungsverfahren für ein internes Leadership Development Programm, bei dem Mitarbeiter auf wohltätigen Projekten auf der ganzen Welt eingesetzt werden, zu entwickeln. Dabei waren vor allem meine BWL- und Projektmanagement-Kenntnisse aus der Uni hilfreich. Für mich war es ein echtes Highlight, für einen längeren Zeitraum in einer Metropole wie New York zu leben. Ich habe sehr viel gesehen und kenne mich besser aus, als jeder Urlaub es hätte ermöglichen können.' +
               '</p>' +
        '</div>' +
        '</div>';


    var infowindow16 = new google.maps.InfoWindow({
        content: contentString16
    });

    var marker16 = new google.maps.Marker({
        position: {
            lat: 40.730610,
            lng: -73.935242
        },
        map: map,
		icon: iconOctopus1,
        title: 'New York'
    });

    marker16.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow16.open(map, marker16);
    });

    /* End Marker 16 */
		/* Initialize Marker17 (Dubai) */
    var contentString17 = '<div id="content">' +
        '<h1 id="firstHeading">&ndash; Dubai &ndash;</h1>' +
		'<h2 id="secondHeading">Cornelius, 21</h2>' +
        '<div id="bodyContent">' +
        '<p>' +
        'Meine Zeit im Ausland habe ich in Dubai bei perfekten Wetterbedingungen verbracht und bei einem Kunden vor Ort die Einführung eines Business Excellence-Frameworks unterstützt. Dabei konnte ich sowohl wertvolle Einblicke in die Strategie-Beratung, wie auch internationales Kundenmanagement gewinnen. Theoretische Grundlagen lieferten mir hierfür die Vorlesungen Projektmanagement und Intercultural Management. In der mir verbleibenden Freizeit habe ich die berühmten Sehenswürdigkeiten Dubai\'s und angrenzender Emirate besucht. Besonders beeindruckt haben mich die Diversität und die visionären Bestrebungen der Stadt. '+
		'</p>' +
        '</div>' +
        '</div>';

    var infowindow17 = new google.maps.InfoWindow({
        content: contentString17
    });

    var marker17 = new google.maps.Marker({
        position: {
            lat: 25.2048493,
            lng: 55.2707828
        },
        map: map,
		icon: iconOctopus1,
        title: 'New York'
    });

    marker17.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow17.open(map, marker17);
    });

    /* End Marker 17 */

	/* Initialize Marker18 (Bengaluru) */
    var contentString18 = '<div id="content">' +
        '<h1 id="firstHeading">&ndash; Bengaluru &ndash;</h1>' +
		'<h2 id="secondHeading">Julian, 20</h2>' +
		'<div id="bodyContent">' +
        '<p>' +
        'In Bengaluru habe ich meinen dritten Praxiseinsatz in einem Entwicklungsteam verbracht, das einen ChatBot Service baute, der Informationen zu Ticketstatus und Lösungen zu Standardproblemen ausgibt. Alle Kollegen waren sehr nett - ich war schnell Teil des Teams und konnte die indische Kultur aus nächster Nähe kennen lernen. Da Indien in der heutigen IT eine bedeutsame Rolle spielt, ist es hilfreich, die indische Kultur zu kennen.' +
		'</p>' +
        '</div>' +
        '</div>';

    var infowindow18 = new google.maps.InfoWindow({
        content: contentString18
    });

    var marker18 = new google.maps.Marker({
        position: {
            lat: 12.972442,
            lng: 77.580643
        },
        map: map,
		icon: iconOctopus1,
        title: 'Bengaluru'
    });

    marker18.addListener('click', function() {
      for (var i=0; i<array1.length; i++){
        array1[i].close();
      }
        infowindow18.open(map, marker18);
    });

    /* End Marker 18 */

	/* Array with all infowindows */
    var array1 = [infowindow2, infowindow3, infowindow4, infowindow5, infowindow6, infowindow7, infowindow8, infowindow9, infowindow10, infowindow11, infowindow12, infowindow13, infowindow14, infowindow15, infowindow16, infowindow17, infowindow18];

    /* End Infobox (Summer School) */

}
