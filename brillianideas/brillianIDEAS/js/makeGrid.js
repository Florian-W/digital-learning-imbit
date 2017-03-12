/**
 * Created by nick.london on 20.02.2017.
 * builds the grid with the flipcards,
 * spreads the learnings across the grid (currently hardcoded)
 */


var digitalLearningArray = [
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
		//['webinar', 0.08880309 , 0.19318182 ,20],
		['vc', 0.21879022 , 0.23409091 ,21],
		['ps', 0.38738739 , 0.28181818 ,22],
		['iw', 0.35521236 , 0.075 ,23]
		];


/**
 * Collets the dimensions and position of a flipcard (required since it takes the 'front'-classed element for width declaration)
 * @param $div { Object } the flippcard div as a jQuery collection
 * @returns Constructs a rectOutlines element only use with "new"
 */
function rectOutlines($div){
	this.left = $div.css('left');
	this.top = $div.css('top');
	this.width = $div.find('.front').outerWidth();
	this.height = $div.find('.front').outerHeight();
	this.right = this.top + this.width;
	this.bottom = this.left + this.height;
};
/**
 * 
 * @param id {String} Id of the Flipcard to position
 * @param x {Number} Left position of Card 0 < x < 1
 * @param y {Number} Left position of Card 0 < x < 1
 * @param count {String | Number} order of appearance
 * @return {undefined}
 */
function noOVerlayGrid(id, x, y, count){
	// Get target element for quicker access
	var $card = $('#' + id);
	// Set initial values for x and y coordinate
	$card.css('left', Math.floor(x * $display.width)).css('top', Math.floor(y * $display.height));
	// loop until overlays with no other div of same class	
	do {
		// get left, right, top and bottom position of elemen (relative to achors top left position)
		var card_position = new rectOutlines($card);
		// set loop variable to exit value
		var allGood = true;
		// select all elements of the same class (same class means every single class is lookef for, not the exact combination)
		$('.' + $card.attr('class').split(" ").join(", .")).each(function(i, e){
			// Get target element for quicker access
			$e = $(e);
			if(!$e.is('#'+id)){
				// get left, right, top and bottom position of elemen (relative to achors top left position)
				e_position = new rectOutlines($e)
				// Todo: Doku
				if(!(card_position.left >= e_position.right || card_position.right <= e_position.left ||
						card_position.top >= e_position.bottom || card_position.bottom <= e_position.top) ){
					console.log(e_position);
					console.log(card_position);
					if(card_position.left < e_position.left){
						$card.css('left', e_position.left - card_position.width);
					} else {
						$card.css('left', e_position.right);
					}
					if(card_position.top < e_position.top){
						$card.css('top', e_position.top - card_position.height);
					} else {
						$card.css('top', e_position.bottom);
					}
					allGood = false;
					return false;
				}
			}
		})
	} while(!allGood);
	$card.attr('data-sid', ((typeof count == typeof "")? count: String.valueOf(count)));
};


var makeGrid = function makeGrid(view){
    switch (view){
    		//Learnings by Type
        case 'digitalLearning':

            $('#grid').css('cursor', 'pointer');
            $('.flipcard, .flipcard .face').css('pointer-events', 'none').css('cursor', 'default');
            
            $.when(
                $.ajax('xml/index.php?base=grid&type=learning').done(function (data) {
                    $('#site').append(data);
                    $('#grid').css("width", $display.width).css("height", $display.height).append('<div id="backlayer"></div>');

                }),
                $('#animation_welcome').animate({opacity: 1}, {duration: 1000})
            ).done(function () {
                $.when(
                    $('#xaxis').animate({opacity: 1, width: $display.width}, {duration: 1000})
                ).done(function () {
                    $.when(
                        $('#yaxis').animate({opacity: 1, height: $display.height}, {duration: 1000})
                    ).done(function () {
                        $.when(
                            $.each(digitalLearningArray, function(key, value){
                            	noOVerlayGrid.apply(this, value);
                            }),
                            
                            $.when(
                            		$('#animation_welcome').animate({opacity: 0}, {duration: 1000})
                            ).done(function(){
                            	 $('#animation_welcome').css('display', 'none');
                            }),
                            $('#grid').css('opacity', 1) /*,
                            $('#yaxis').animate({opacity: 0}, {duration: 1000}),
                            $('#xaxis').animate({opacity: 0}, {duration: 1000})*/
                        ).done(function () {
                            var deferredArray = [];
                            $('#grid').children('.flipcard').sort(function (a, b) {
                                return (($(a).data('sid') > $(b).data('sid')) ? 1 : -1);
                            }).each(function (index, element) {
                                deferredArray.push($(element).delay(index * 500).children('.back').css('display', 'none').delay(0).parent().animate({opacity: 1}, {duration: 500}));
                                deferredArray.push($.ajax('xml/index.php?base=categories&type=learning&detail=true&filter=' + $(element).attr("id")).done(function (data) {
                                    $(element).children('.back').append(data);
                                    deferredArray.push($.ajax('xml/index.php?base=learning&withLink=false&type=' + $(element).attr('id')).done(function (data2) {
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
                            	$('#grid').css('cursor', 'default'),
                                $('.flipcard, .flipcard .face').css('pointer-events', 'auto').css('cursor', 'pointer'),
                                openPath();
                            });
                        });
                    });
                });
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
                })
            ).done(function () {
                        $.when(
                            $('#animation_l, #animation_im, #animation_b, #animation_it, #animation_mg').animate({opacity: 0}),
                            $('#animation_l, #animation_im, #animation_b, #animation_it, #animation_mg').css('display', 'none'),

                            $('#IM').css('left', Math.floor(0.2 * $display.width)).css('top', Math.floor(0.1 * $display.height)).attr('data-sid', '1'),
                            $('#S').css('left', Math.floor(0.25 * $display.width)).css('top', Math.floor(0.65 * $display.height)).attr('data-sid', '2'),
                            $('#IT').css('left', Math.floor(0.7 * $display.width)).css('top', Math.floor(0.2 * $display.height)).attr('data-sid', '3'),
                            $('#B').css('left', Math.floor(0.68 * $display.width)).css('top', Math.floor(0.7 * $display.height)).attr('data-sid', '4'),
                            $('#MG').css('left', Math.floor(0.35 * $display.width)).css('top', Math.floor(0.35 * $display.height)).attr('data-sid', '5'),
                            //$('#W3WI_IMBIT_305').css('left', Math.floor(0.7 * $display.width)).css('top', Math.floor(0.8 * $display.height)).attr('data-sid', '5'),
                      
							

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