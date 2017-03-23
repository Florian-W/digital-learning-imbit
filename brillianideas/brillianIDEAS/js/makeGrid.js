/**
 * @file Erstellt das Koordinatensystem und die IMBIT-Darstellung
 * @author Nick London <nick.london94@gmail.com>
 */

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


class Grid{
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
	static noOverlayInGrid(id, x, y, count, key){
		/**
		 * Setze lokale Variablen
		 */ 
		var loop;
		var $card = $('#' + id);
		var arr = digitalLearningArray.slice(0, key);
		var e_position;
		var card_position;
		var movedInCombo = new Array();
		for (var i = 0; i < digitalLearningArray.length; i++){
			movedInCombo[digitalLearningArray[i][0]] = new Array();
			for (var j = 0; j < digitalLearningArray.length; j++){
				movedInCombo[digitalLearningArray[i][0]][digitalLearningArray[0][j]] = false;
			}
		}
		
		var $front = $card.find('.front');
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
				
				/**
				 * check if both divs intersect
				 */
				if(rectOutlines.overlaps(e_position, card_position)){
					card_position.left = ((card_position.left <= e_position.left ^ movedInCombo[value[0]][id])?e_position.left - card_position.width:e_position.right);
					card_position.top = ((card_position.top <= e_position.top ^ movedInCombo[value[0]][id])? e_position.top - card_position.height : e_position.bottom);

					card_position.bottom = card_position.top + card_position.height;
					card_position.right = card_position.left + card_position.width;
					
					$card.css({
						left: card_position.left + "px",
						top:  card_position.top + "px"
					});
					movedInCombo[value[0]][id] = true;
					/**
					 * ensure loop continues and reset iteration through divs
					 */
					loop = true;
					return false;
				}
				return true;
			})
		} while(loop);
		/**
		 * set data value for orde of appearance
		 */
		$card.attr('data-sid', "" + count);
		return $.Deferred().promise();
	};
			
	static cleanUp(){
		$('#grid').css('cursor', 'default');
		$('.flipcard, .flipcard .face').css('pointer-events', 'auto').css('cursor', 'pointer');
		$('h1, h2, h3, h4 ,h5, p').each(function(i,e){
			$(e).html(($(e).html().replace(/\s{2,}/g," ")));
		});
		$('.flipcard').each(function(i,e){$(e).css({width: $(e).children('.front').outerWidth(true) +1, height: $(e).children('.front').outerHeight(true)+1})})
		$('.flipcard').each(function(i,e){$(e).css({minWidth: $(e).children('.front').outerWidth(true) +1, minHeight: $(e).children('.front').outerHeight(true)+1})})
	}
	
	static sortTiles(a, b) {
			return (($(a).data('sid') > $(b).data('sid')) ? 1 : -1);
		};
	
	static animateTile(obj){
		var $obj = $(obj);
		Grid.animationPromises.push($obj.animate({opacity: 1}, {
			duration: 500, 
			done: (($obj.next().length == 0) ? undefined : function(){
				Grid.animateTile($obj.next());
			})
		}));
	}
	
	static animateTiles() {
		/**
		 * disables the tiles and enables the back layer
		 */
		$('#grid').css('cursor', 'pointer').css("width", $display.width).css("height", $display.height).css('opacity', 1);
		$('.flipcard, .flipcard .face').css('pointer-events', 'none').css('cursor', 'default');

		$('#animation_welcome').animate({left: 50 + $('#animation_welcome').outerWidth() / 2, top: 100}, {duration: 1000})
		$('#xaxis').animate({opacity: 1, width: $display.width}, {duration: 1000});
		$('#yaxis').animate({opacity: 1, height: $display.height}, {duration: 1000});
		
		$.each(digitalLearningArray, function(key, value){
			var v = value.slice();
			v.push(key);
			Grid.noOverlayInGrid.apply({}, v); // {@link noOverlayInGrid}
		});
		
		var $flipcards = $('#grid').children('.flipcard');
		$flipcards.detach();
		$flipcards.sort(Grid.sortTiles);
		$('#grid').html($flipcards).append('<div id="backlayer"></div>');
		$flipcards = $('#grid').children('.flipcard');
		Grid.animateTile($flipcards.first());
		
		$.when(Grid.animationPromises).done(Grid.cleanUp);
	}
	
	static loadLearnings(obj){
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
	
	static fillTile(i, obj){
		var $obj = $(obj);
		$.ajax({
			url: 'xml/index.php?base=categories&type=learning&detail=true&filter=' + $obj.attr("id"),
			complete: function(data){
				$obj.children('.back').append(data.responseText);
				Grid.loadLearnings($obj);
			}
		});
	}
	
	static fillTiles(){
		$(document).ajaxStop(function() {
			Grid.animateTiles();
			 $(this).unbind("ajaxStop");
		});
		$('#grid').children('.flipcard').each(Grid.fillTile);
	}
}

Grid.animationPromises = new Array();


/**
 * Does all the start animation an utilizes the position function noOVerlayGrid
 * @function makeGrid
 * @param {String} decides which view to create (only 'digitalLearning' and 'imbit' are valid)
 * @returns {undefined} nothing
 * @author Nick London <nick.london94@gmail.com>
 */
function makeGrid(view){
	 $('#site').on("click", siteClick);
	/**
	 * decides the view
	 */
    switch (view){
        case 'digitalLearning':
            /**
             * loads all tiles and displays the heading
             */
			$('#animation_welcome').animate({opacity: 1}, {duration: 1000}),
			$.ajax({
				url:'xml/index.php?base=grid&type=learning',
				complete: function (data) {
					if(data.status == 200){
						$.when($('#site').append(data.responseText)).done(Grid.fillTiles);
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
                                	url: 'xml/index.php?base=grid&type=class&detail=true&filter=' + $(element).children('.front').text()
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
			 case 'newContent':
		//This case is used for the New Content Page
            $display.width = $display.width - 208;
            $display.height = $display.height - 66;
            $.when(
                $.ajax('xml/index.php?base=grid&type=newcontent').done(function (data) {
                    $('#site').append(data);
					$('#grid').css("width", $display.width).css("height", $display.height).append('<div id="backlayer"></div>');
					}),
                $('#animation_newContent').animate({opacity: 1}, {duration: 1000})
            ).done(function () {
                        $.when(
                            $('#animation_newContent').animate({opacity: 0}),
                            $('#animation_newContent').css('display', 'none'),

                            $('#BusinessCanvas').css('left', Math.floor(0.2 * $display.width)).css('top', Math.floor(0.1 * $display.height)).attr('data-sid', '1'),
                            $('#OekonomischesPrinzip').css('left', Math.floor(0.3 * $display.width)).css('top', Math.floor(0.65 * $display.height)).attr('data-sid', '2'),
                            $('#ShareholderStakeholder').css('left', Math.floor(0.7 * $display.width)).css('top', Math.floor(0.2 * $display.height)).attr('data-sid', '3'),
                            $('#ManagementModell').css('left', Math.floor(0.6 * $display.width)).css('top', Math.floor(0.7 * $display.height)).attr('data-sid', '4'),
                            $('#Wertkettenmodell').css('left', Math.floor(0.5 * $display.width)).css('top', Math.floor(0.5 * $display.height)).attr('data-sid', '5'),                  
							

                            $('#grid').css('opacity', 1)
                        ).done(function () {
                            var deferredArray = [];
                            $('#grid').children('.flipcard').sort(function (a, b) {
                                return (($(a).data('sid') > $(b).data('sid')) ? 1 : -1);
                            }).each(function (index, element) {
                                deferredArray.push($(element).delay(index * 500).children('.back').css('display', 'none').delay(0).parent().animate({opacity: 1}, {duration: 1000}));
                                deferredArray.push($.ajax('xml/index.php?base=categories&type=class&detail=true&filter=' + $(element).attr("id")).done(function (data) {
                                    $(element).children('.back').append(data);
                                    deferredArray.push($.ajax('xml/index.php?base=learning&withLink=false&class=' + $(element).attr('id')).done(function (data2) {
                                        $(element).find('.list').append(data2);
                                        $(element).find('.list').children().each(function (index1, element1) {
                                            deferredArray.push($.ajax('xml/index.php?base=learning&withLink=true&detail=true&guid=' + $(element1).data('target')).done(function (data3) {
                                                $(element).find('.list').parent().append(data3).children('.learning').fadeOut();
                                            }))
                                        });
                                    }))
                                }))
                            });
                            $.when.apply($, deferredArray).done(function () {
                                openPath();
                            });
                        });
                });
            break;
    }
	
}
