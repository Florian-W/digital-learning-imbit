/**
 * Created by nick.london on 20.02.2017.
 */
var makeGrid = function makeGrid(view){
    switch (view){
        case 'digitalLearning':
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
                            $('#animation_welcome').animate({opacity: 0}),
                            $('#animation_welcome').css('display', 'none'),
                            $('#mooc').css('left', Math.floor(0.49034749 * $display.width)).css('top', Math.floor(0.16136364 * $display.height)).attr('data-sid', '1'),
                            $('#3dwelt').css('left', Math.floor(0.5997426 * $display.width)).css('top', Math.floor(0.05681818 * $display.height)).attr('data-sid', '2'),
                            $('#chat').css('left', Math.floor(0.615118662 * $display.width)).css('top', Math.floor(0.25909091 * $display.height)).attr('data-sid', '3'),
                            $('#forum').css('left', Math.floor(0.82110682 * $display.width)).css('top', Math.floor(0.25909091 * $display.height)).attr('data-sid', '4'),
                            $('#sn').css('left', Math.floor(0.8996139 * $display.width)).css('top', Math.floor(0.22272727 * $display.height)).attr('data-sid', '5'),
                            $('#twitter').css('left', Math.floor(0.6988417 * $display.width)).css('top', Math.floor(0.4 * $display.height)).attr('data-sid', '6'),
                            $('#weblogs').css('left', Math.floor(0.5456885 * $display.width)).css('top', Math.floor(0.48636364 * $display.height)).attr('data-sid', '7'),
                            $('#tagebuch').css('left', Math.floor(0.70785071 * $display.width)).css('top', Math.floor(0.53181818 * $display.height)).attr('data-sid', '8'),
                            $('#wiki').css('left', Math.floor(0.93693694 * $display.width)).css('top', Math.floor(0.66136364 * $display.height)).attr('data-sid', '9'),
                            $('#podcast').css('left', Math.floor(0.94465894 * $display.width)).css('top', Math.floor(0.75681818 * $display.height)).attr('data-sid', '10'),
                            $('#ar').css('left', Math.floor(0.92792793 * $display.width)).css('top', Math.floor(0.86590909 * $display.height)).attr('data-sid', '11'),
                            $('#film').css('left', Math.floor(0.67181467 * $display.width)).css('top', Math.floor(0.83181818 * $display.height)).attr('data-sid', '12'),
                            $('#lod').css('left', Math.floor(0.71943372 * $display.width)).css('top', Math.floor(0.92727273 * $display.height)).attr('data-sid', '13'),
                            $('#ebook').css('left', Math.floor(0.52509653 * $display.width)).css('top', Math.floor(0.91818182 * $display.height)).attr('data-sid', '14'),
                            $('#sim').css('left', Math.floor(0.49034749 * $display.width)).css('top', Math.floor(0.8 * $display.height)).attr('data-sid', '15'),
                            $('#spiel').css('left', Math.floor(0.36550837 * $display.width)).css('top', Math.floor(0.58181818 * $display.height)).attr('data-sid', '16'),
                            $('#cbtwbt').css('left', Math.floor(0.16344916 * $display.width)).css('top', Math.floor(0.88863636 * $display.height)).attr('data-sid', '17'),
                            $('#sg').css('left', Math.floor(0.35392535 * $display.width)).css('top', Math.floor(0.49772727 * $display.height)).attr('data-sid', '18'),
                            $('#bl').css('left', Math.floor(0.1003861 * $display.width)).css('top', Math.floor(0.40909091 * $display.height)).attr('data-sid', '19'),
                            $('#webinar').css('left', Math.floor(0.08880309 * $display.width)).css('top', Math.floor(0.19318182 * $display.height)).attr('data-sid', '20'),
                            $('#vc').css('left', Math.floor(0.21879022 * $display.width)).css('top', Math.floor(0.23409091 * $display.height)).attr('data-sid', '21'),
                            $('#ps').css('left', Math.floor(0.38738739 * $display.width)).css('top', Math.floor(0.28181818 * $display.height)).attr('data-sid', '22'),
                            $('#iw').css('left', Math.floor(0.35521236 * $display.width)).css('top', Math.floor(0.075 * $display.height)).attr('data-sid', '23'),
                            // TODO: data-left data-right und data-sid in xml+xsl einpflegen und schnließend unten einbauen (by Nick L.)
                            $('#grid').css('opacity', 1)
                        ).done(function () {
                            var deferredArray = [];
                            $('#grid').children('.flipcard').sort(function (a, b) {
                                return (($(a).data('sid') > $(b).data('sid')) ? 1 : -1);
                            }).each(function (index, element) {
                                deferredArray.push($(element).delay(index * 500).children('.back').css('display', 'none').delay(0).parent().animate({opacity: 1}, {duration: 1000}));
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
                                openPath();
                            });
                        });
                    });
                });
            });
            break;
        case 'imbit':
            $display.width = $display.width - 208;
            $display.height = $display.height - 66;
            $.when(
                $.ajax('xml/index.php?base=grid&type=class').done(function (data) {
                    $('#site').append(data);
                    $('#grid').css("width", $display.width).css("height", $display.height).append('<div id="backlayer"></div>');

                }),
                $('#animation_l, #animation_im, #animation_b, #animation_it').animate({opacity: 1}, {duration: 1000})
            ).done(function () {
                $.when(
                    $('#xaxis').animate({opacity: 1, width: $display.width}, {duration: 1000})
                ).done(function () {
                    $.when(
                        $('#yaxis').animate({opacity: 1, height: $display.height}, {duration: 1000})
                    ).done(function () {
                        $.when(
                            $('#animation_l, #animation_im, #animation_b, #animation_it').animate({opacity: 0}),
                            $('#animation_l, #animation_im, #animation_b, #animation_it').css('display', 'none'),

                            $('#W3WI_IMBIT_301').css('left', Math.floor(0.2 * $display.width)).css('top', Math.floor(0.1 * $display.height)).attr('data-sid', '1'),
                            $('#W3WI_IMBIT_302').css('left', Math.floor(0.3 * $display.width)).css('top', Math.floor(0.65 * $display.height)).attr('data-sid', '2'),
                            $('#W3WI_IMBIT_303').css('left', Math.floor(0 * $display.width)).css('top', Math.floor(0.2 * $display.height)).attr('data-sid', '3'),
                            $('#W3WI_IMBIT_304').css('left', Math.floor(0.1 * $display.width)).css('top', Math.floor(0.7 * $display.height)).attr('data-sid', '4'),
                            $('#W3WI_IMBIT_305').css('left', Math.floor(0.7 * $display.width)).css('top', Math.floor(0.8 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_IMBIT_401').css('left', Math.floor(0.5 * $display.width)).css('top', Math.floor(0.5 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_IMBIT_402').css('left', Math.floor(0.9 * $display.width)).css('top', Math.floor(0.2 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_IMBIT_403').css('left', Math.floor(0.7 * $display.width)).css('top', Math.floor(0.1 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_IMBIT_404').css('left', Math.floor(0.5 * $display.width)).css('top', Math.floor(0.1 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_IMBIT_405').css('left', Math.floor(0.8 * $display.width)).css('top', Math.floor(0.4 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_101').css('left', Math.floor(1 * $display.width)).css('top', Math.floor(0 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_103').css('left', Math.floor(0.1 * $display.width)).css('top', Math.floor(0.9 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_104').css('left', Math.floor(0.3 * $display.width)).css('top', Math.floor(1 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_105').css('left', Math.floor(0.4 * $display.width)).css('top', Math.floor(0.9 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_106').css('left', Math.floor(0.6 * $display.width)).css('top', Math.floor(0.3 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_107').css('left', Math.floor(0.2 * $display.width)).css('top', Math.floor(0.5 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_108').css('left', Math.floor(0.25 * $display.width)).css('top', Math.floor(0.75 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_110').css('left', Math.floor(0.4 * $display.width)).css('top', Math.floor(0.7 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_111').css('left', Math.floor(0 * $display.width)).css('top', Math.floor(0.5 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_201').css('left', Math.floor(0.8 * $display.width)).css('top', Math.floor(0 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_202').css('left', Math.floor(1 * $display.width)).css('top', Math.floor(0.3 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_203').css('left', Math.floor(1 * $display.width)).css('top', Math.floor(0.45 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_204').css('left', Math.floor(0 * $display.width)).css('top', Math.floor(0 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_505').css('left', Math.floor(0.5 * $display.width)).css('top', Math.floor(0.25 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_506').css('left', Math.floor(0.4 * $display.width)).css('top', Math.floor(0.25 * $display.height)).attr('data-sid', '5'),
                            $('#W3WI_601').css('left', Math.floor(0.6 * $display.width)).css('top', Math.floor(0.4 * $display.height)).attr('data-sid', '5'),
                            $('#Sprachschule').css('left', Math.floor(1 * $display.width)).css('top', Math.floor(1 * $display.height)).attr('data-sid', '5'),
                            // TODO: data-left data-right und data-sid in xml+xsl einpflegen und schnließend unten einbauen (by Nick L.)
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
                });
            });
            break;
    }
}