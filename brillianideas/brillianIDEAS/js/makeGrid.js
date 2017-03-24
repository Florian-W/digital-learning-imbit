/**
 * @file Erstellt das Koordinatensystem und die IMBIT-Darstellung
 * @author Nick London <nick.london94@gmail.com>
 */

/**
 * Konfiguration für das Koordnatensystem inkl. X-Y-Koordinaten und die Anzeigereihenfolge
 * @contant {Array} digitalLearningArray
 */
const digitalLearningArray = [
	['mooc', 0.49034749 , 0.16136364 ,1],
		['3dwelt', 0.5997426 , 0.05681818 ,2],
		['chat', 0.615118662 , 0.25909091 ,3],
		['forum', 0.82110682 , 0.25909091 ,4],
		['sn', 0.8996139 , 0.22272727 ,5],
		['twitter', 0.6988417 , 0.4 ,6],
		['weblogs', 0.5456885 , 0.48636364 ,7],
		['tagebuch', 0.70785071 , 0.53181818 ,8],
		['wiki', 0.93693694 , 0.66136364 ,9],
		['podcast', 0.94465894 , 0.75681818 ,10],
		['ar', 0.92792793 , 0.86590909 ,11],
		['film', 0.67181467 , 0.83181818 ,12],
		['lod', 0.71943372 , 0.92727273 ,13],
		['ebook', 0.52509653 , 0.91818182 ,14],
		['sim', 0.49034749 , 0.8 ,15],
		['spiel', 0.36550837 , 0.58181818 ,16],
		['cbtwbt', 0.16344916 , 0.88863636 ,17],
		['sg', 0.35392535 , 0.49772727 ,18],
		['bl', 0.1003861 , 0.40909091 ,19],
		//['webinar', 0.08880309 , 0.19318182 ,20], // Todo: somehow missing 
		['vc', 0.21879022 , 0.23409091 ,21],
		['ps', 0.38738739 , 0.28181818 ,22],
		['iw', 0.35521236 , 0.075 ,23]
		];

var i;
var j;
var movedInCombo = new Array();
for (i = 0; i < digitalLearningArray.length; i++){
	movedInCombo[digitalLearningArray[i][0]] = new Array();
	for (j = 0; j < digitalLearningArray.length; j++){
		movedInCombo[digitalLearningArray[i][0]][digitalLearningArray[0][j]] = false;
	}
}

/**
 * Sammelklasse für die Außendimensionen von Elementen des Koordinatensystems. Alle Koordinaten sind berechnet von der oberen linken Ecke des Dokuments.
 * @class rectOutlines
 * @param $div { Object } Die Flipcard (Koordinatensystem-Element), dessen Dimensionen berechnet werden sollen.
 * @author Nick London <nick.london94@gmail.com>
 */
class rectOutlines{
	constructor($div) {
		// uses css selectors (left and top) because jQuery.position() does not update fast enough
		// uses .front child of flipcard, because some browsers recognize divs with no set size as 0x0
		/**
		 * @member {Number} rectOutlines#left 
		 */
		this.left = parseInt($div.css('left').replace(/^\D+/g, ''));
		if (isNaN(this.left))
			this.left = parseInt($div.css('left'));
		/**
		 * @member {Number} rectOutlines#top 
		 */
		this.top = parseInt($div.css('top').replace(/^\D+/g, ''));
		if (isNaN(this.top))
			this.top = parseInt($div.css('top'));
		/**
		 * @member {Number} rectOutlines#width 
		 */
		this.width = parseInt($div.css('width').replace(/^\D+/g, '')) + 20;
		/**
		 * @member {Number} rectOutlines#height 
		 */
		this.height = parseInt($div.css('height').replace(/^\D+/g, '')) + 20;
		/**
		 * @member {Number} rectOutlines#right 
		 */
		this.right = this.left + this.width;
		/**
		 * @member {Number} rectOutlines#bottom 
		 */
		this.bottom = this.top + this.height;
	}
	/**
	 * @function rectOutlines#overlapsWidth
	 * @param {rectOutlines} target Zweites Objekt des selben Typen
	 * @returns {boolean} Wahr, wenn das Vergleichsobjekt dieses Objekt überlappt
	 */
	overlapsWith(target){
		return rectOutlines.overlaps(this, target);
	}
	/**
	 * @function rectOutlines.overlaps
	 * @param {rectOutlines} obj1 Vergleichsobjekt
	 * @param {rectOutlines} obj2 Vergleichsobjekt
	 * @returns {boolean} Wahr, wenn die Vergleichsobjekte sich überlappen
	 */
	static overlaps(obj1, obj2){
		return !(obj1.bottom <= obj2.top || obj2.bottom <= obj1.top || obj1.right <= obj2.left || obj2.right <= obj1.left ); 
	}
};
/**
 * Verschiebt alle Elemente im Koordinatensystem, sodass sie sich nicht überschneiden.
 * @function noOverlayInGrid
 * @param id {String} ID des HTML-DOM-Node
 * @param x {Number} Ziel-X-Position des Elements 0 < x < 1
 * @param y {Number} Ziel-Y-Position des Elements 0 < y < 1
 * @param count {String | Number} Position in der Reihenfolge des Erscheinens
 * @param key {Number} Position im Konfigurationsarray
 * @author Nick London <nick.london94@gmail.com>
 */
function noOverlayInGrid(id, x, y, count, key){
	/**
	 * Setze lokale Variablen
	 */ 
	var loop;
	var $card = $('#' + id);
	var arr = digitalLearningArray.slice(0, key);
	var e_position;
	var card_position;
	
	$front= $card.find('.front');
	/**
	 * Zeilenumbrüche verhindern
	 */
	$front.html($front.html().replace(' ', '&nbsp;').replace('-','&#8209;'));
	/**
	 * Initiale Positionierung
	 */
	$card.css({
		width: $front.outerWidth(true),
		height: $front.outerHeight(true),
		left: Math.floor(x * $display.width) - $card.outerWidth(true) / 2,
		top: Math.floor(y * $display.height) - $card.outerHeight(true) / 2
	});

	card_position = new rectOutlines($card);
	
	do {
		/**
		 * Setze Schleifenvariablen für äußere Schleife
		 */
		loop = false;
		
		$.each(arr, function(k, value){
			/**
			 * Setze Schleifenvariablen für innere Schleife (Value [0] entspricht der ID Position im Array
			 */
			e_position = new rectOutlines($('#' + value[0]));
			if(rectOutlines.overlaps(e_position, card_position)){
				/**
				* verhindert, dass eine Karte zwischen zwei bereits platzierten hin und her pingt
				*/
				if (movedInCombo[value[0]][id]){
					card_position.left = ((card_position.left <= e_position.left)?e_position.right:e_position.left - card_position.width);
					card_position.top = ((card_position.top <= e_position.top)? e_position.bottom : e_position.top - card_position.height);

					card_position.bottom = card_position.top + card_position.height;
					card_position.right = card_position.left + card_position.width;
					
					$card.css({
						left: card_position.left + "px",
						top:  card_position.top + "px"
					});
					
				} else {
					card_position.left = ((card_position.left <= e_position.left)?e_position.left - card_position.width:e_position.right);
					card_position.top = ((card_position.top <= e_position.top)? e_position.top - card_position.height : e_position.bottom);

					card_position.bottom = card_position.top + card_position.height;
					card_position.right = card_position.left + card_position.width;
					
					$card.css({
						left: card_position.left + "px",
						top:  card_position.top + "px"
					});
					movedInCombo[value[0]][id] = true;
				}
				loop = true;
				return false;
			}
			return true;
		})
	} while(loop);
	/**
	 * Daten werden für die Sicherstellung der Reihenfolge des Erscheinens gesetzt
	 */
	$card.attr('data-sid', "" + count);
	/**
	 * Stellt die Garantie aus, dass die Positionierung abgeschlossen wurde
	 */
	return $.Deferred().promise();
};

/**
 * Erstellt und animiert die Darstellungen der Lerninhalte
 * @function makeGrid
 * @param {String} Entscheidungsparameter welche Ansicht erstellt wird
 * @returns {undefined} nothing
 * @author Nick London <nick.london94@gmail.com>
 */
var makeGrid = function makeGrid(view){
    switch (view){
        case 'digitalLearning':
			/**
			* Entfernt temporäre Änderungen am DOM und entfernt Zeilenumbrüche, die aus der Erstellungstechnik der Ansicht entstehen.
			* @function makeGrid~cleanUp();
			* @memberof makeGrid
			*/
			var cleanUp = function(){
				$('#grid').css('cursor', 'default');
				$('.flipcard, .flipcard .face').css('pointer-events', 'auto').css('cursor', 'pointer');
				$('h1, h2, h3, h4 ,h5, p').each(function(i,e){
					$(e).html(($(e).html().replace(/\s{2,}/g," ")));
				});
				$('.flipcard').each(function(i,e){$(e).css({width: $(e).children('.front').outerWidth(true) +1, height: $(e).children('.front').outerHeight(true)+1})})
				$('.flipcard').each(function(i,e){$(e).css({minWidth: $(e).children('.front').outerWidth(true) +1, minHeight: $(e).children('.front').outerHeight(true)+1})})
			}
			/**
			 * Sortiert die einzelnen Lerntypen auf Basis des data-sid Attributes
			 * @function makeGrid~sortTiles
			 * @memberof makeGrid
			 * @param a {jQuery)
			 * @patam b (jQuery)
			 * @return {boolean} true wenn A in einer aufsteigenden Sortierung hinter B erscheinen sollte
			 */
			var sortTiles = function (a, b) {
					return (($(a).data('sid') > $(b).data('sid')) ? 1 : -1);
				};
			/**
			 * Blendet das mitgegebene Objekt ein und startet das Einblenden des Folgeobjekts
			 * @function makeGrid~animateTile 
			 * @memberof makeGrid
			 * @param obj {jQuery | Object} Das zu animierende Objekt.
			 */
			var animateTile = function(obj){
				var $obj = $(obj);
				$obj.animate({opacity: 1}, {
					duration: 500, 
					done: (($obj.next().length == 0) ? cleanUp : function(){
						animateTile($obj.next());
					})
				});
			}
			/**
			 * Führt die Animationen des Koordinatensystems aus und ruft weitere Subroutinen auf 
			 * @function makeGrid~animateTiles
			 * @memberof makeGrid
			 */
			var animateTiles = function () {
				
				/**
				 * disables the tiles and enables the back layer
				 */
				$('#grid').css('cursor', 'pointer').css("width", $display.width).css("height", $display.height).css('opacity', 1);
				$('.flipcard, .flipcard .face').css('pointer-events', 'none').css('cursor', 'default');
				$('#animation_welcome').animate({left: 50 + $('#animation_welcome').outerWidth() / 2, top: 100}, {duration: 1000});
				$('#xaxis').animate({opacity: 1, width: $display.width}, {duration: 1000});
				$('#yaxis').animate({opacity: 1, height: $display.height}, {duration: 1000});
				
				
				$.each(digitalLearningArray, function(key, value){
					var v = value.slice();
					v.push(key);
					noOverlayInGrid.apply({}, v); // {@link noOverlayInGrid}
				});
				
				
				var $flipcards = $('#grid').children('.flipcard');
				$flipcards.detach();
				$flipcards.sort(sortTiles);
				$('#grid').html($flipcards).append('<div id="backlayer"></div>');
				$flipcards = $('#grid').children('.flipcard');
				animateTile($flipcards.first());
			
			}
			
			/**
			 * Läd die einzelnen Lerninhalte eines Lerntypen via AJAX nach
			 * @function makeGrid~loadLearnings
			 * @param obj {jQuery | Object } jQuery Collection oder DOM-Element des Lerntypen
			 */
			var loadLearnings = function(obj){
				var $obj = $(obj);
				$.ajax({
					url: 'xml/index.php?base=learning&withLink=false&type=' + $obj.attr('id'), 
					complete: function (data) {
						$obj.find('.list').append(data.responseText);
						$obj.find('.list').children().each(function (index, element) {
							$.ajax({
								url: 'xml/index.php?base=learning&withLink=true&detail=true&guid=' + $(element).data('target'), 
								complete: function (learningData) {
									var $newElement = $obj.find('.list').parent().append(learningData.responseText).children('.learning');
									$newElement.fadeOut();
									$newElement.html($newElement.html().replace(/(?:\r\n|\r|\n)/g," "));
								}
							});
						});
					}
				});
			}
			/**
			 * Läd die DOM-Elemente der Lerntypen nach
			 * @function makeGrid~fillTile
			 * @memberof makeGrid
			 * @param i { Number } Zähler der jQuery.each Schleife. In der Funktion nicht genutzt
			 * @param obj { jQuery | Object } Objekt des entsprechenden Lerntypen
			 */
			var fillTile = function(i, obj){
				var $obj = $(obj);
				$.ajax({
					url: 'xml/index.php?base=categories&type=learning&detail=true&filter=' + $obj.attr("id"),
					complete: function(data){
						$obj.children('.back').append(data.responseText);
						loadLearnings($obj);
					}
				});
			}
			/**
			 * Lädt das äußere Grid nach
			 * @function makeGrid~fillTiles
			 * @memberof makeGrid
			 */
			var fillTiles = function(){
				$(document).ajaxStop(function() {
					animateTiles();
					 $(this).unbind("ajaxStop");
				});
				$('#grid').children('.flipcard').each(fillTile);
			}	      
						
            /**
             * loads all tiles and displays the heading
             */
			 
			$('#animation_welcome').animate({opacity: 1}, {duration: 1000}),
			$.ajax({
				url:'xml/index.php?base=grid&type=learning',
				complete: function (data) {
					if(data.status == 200){
						$.when($('#site').append(data.responseText)).done(fillTiles);
					} else {
						alert('Something went wrong. Please reload this page later. If this keeps occuring, please contact the mail stated in the imprint.');
					}
				}
			});
            break;
        case 'imbit':
		//This case is used for the IMBIT Way
            $display.width = $display.width - 208;
            $display.height = $display.height - 66;
            $.when(
                $.ajax('xml/index.php?base=grid&type=class').done(function (data) {
                    $('#site').append(data);
                    $('#grid').css("width", $display.width).css("height", $display.height).append('<div id="backlayer"></div>');
                }),
                $('#title_imbit').animate({opacity: 1}, {duration: 1000})
            ).done(function () {
                        $.when(
                            $('#WI').css('left', Math.floor(0.2 * $display.width)).css('top', Math.floor(0.1 * $display.height)).attr('data-sid', '1'),
                            $('#I').css('left', Math.floor(0.25 * $display.width)).css('top', Math.floor(0.65 * $display.height)).attr('data-sid', '2'),
                            $('#IT').css('left', Math.floor(0.7 * $display.width)).css('top', Math.floor(0.2 * $display.height)).attr('data-sid', '3'),
                            $('#W').css('left', Math.floor(0.68 * $display.width)).css('top', Math.floor(0.7 * $display.height)).attr('data-sid', '4'),
                            $('#MG').css('left', Math.floor(0.35 * $display.width)).css('top', Math.floor(0.35 * $display.height)).attr('data-sid', '5'),
                            $('#title_imbit').animate({left: $display.width - $('#title_imbit').outerWidth() / 2 - 50, top: 0}, {duration: 1000}),
                            
                            $('#grid').css('opacity', 1)
                        ).done(function () {
                            var deferredArray = [];
                            $('#grid').children('.flipcard').sort(function (a, b) {
                                return (($(a).data('sid') > $(b).data('sid')) ? 1 : -1);
                            }).each(function (index, element) {
                                deferredArray.push($(element).delay(index * 500).children('.back').css('display', 'none').delay(0).parent().animate({opacity: 1}, {duration: 500}));
                                deferredArray.push($.ajax({
                                	url: 'xml/index.php?base=grid&type=class&detail=true&withLink=true&filter=' + $(element).children('.front').text()
                                }).done(function (data) {
                                    $(element).children('.back').append(data);
                                    $(element).find('.contentWrapper').hide();
                                }));
                            });
                            $.when.apply($, deferredArray).done(function () {
                                openPath();
                            });
                        });
                });
            break;
    }
}