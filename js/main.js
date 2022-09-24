/* 
 * Created by Sam Bossley for the purposes of this website.
 * All Rights Reserved. Copyright 2016 Sam Bossley.
 */


//INITIALIZING SCROLL MOVEMENT
//SET MAX HEIGHT AND WIDTH (MAINLY FOR FIREFOX BROWSERS)

var ParentHeight = $('div#Reset').height(),
    ParentWidth = $('div#Reset').width();
$('svg#SlideParent path').addClass('SlideProps');
$('path.SlideProps').each(function(){
    $(this).attr('d','m0 0 l '+(1.1*ParentWidth)+' 0 l '+ParentHeight+' '+ParentHeight+' l -'+(ParentHeight+(1.1*ParentWidth))+' 0 z');
});
var SlideWidth = (1.1*ParentWidth)+ParentHeight;
$('path.SlideProps').css({
    '-ms-transform':'translate(-'+SlideWidth+'px)',
    '-webkit-transform':'translate(-'+SlideWidth+'px)',
    '-moz-transform':'translate(-'+SlideWidth+'px)',
    '-o-transform':'translate(-'+SlideWidth+'px)',
    'transform':'translate(-'+SlideWidth+'px)',
});
var HalfPar = (ParentWidth+ParentHeight);
$('section.fullscreen-section').css({
    '-webkit-clip-path':'polygon(-'+HalfPar+'px 0,-'+ParentHeight+'px 0,0 100%,-'+HalfPar+'px 100%,-'+HalfPar+'px 0)',
    'clip-path':'polygon(-'+HalfPar+'px 0,-'+ParentHeight+'px 0,0 100%,-'+HalfPar+'px 100%,-'+HalfPar+'px 0)',
});

//COLOR SHADING FUNCTION

function shadeRGBColor(color,percent){
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}

//X Button

function $Xtrapolate(){
    //if ( $('svg#LogoParent').css('display') == 'none' ) {
    //}
    $('svg#exit-symbol').css({
        'opacity':'1',
        '-ms-transform':'translateX(0)',
        '-webkit-transform':'translateX(0)',
        '-moz-transform':'translateX(0)',
        '-o-transform':'translateX(0)',
        'transform':'translateX(0)',
    });
    setTimeout(function(){
        $('rect.xsign1').addClass('xsign1-an');
        $('rect.xsign2').addClass('xsign2-an');
    },300);
}


$('svg#exit-symbol').bind('click',function(event){
    //
    //
    //if ( $('svg#LogoParent').css('display') !== 'none' ) {
    if ( $('span.mobile-device').css('display') == 'none' ) {
    //if ( $('svg#LogoParent').css('display') == 'none' ) {
        $('section.fullscreen-section').css({ 'opacity': '0', 'z-index':'-1' });
    }
        //
    $('section.fullscreen-section').each(function(){
        $(this).animate({'opacity':'0'},400);
        $(this).css({
            '-ms-transform':'scale(2)',
            '-webkit-transform':'scale(2)',
            '-moz-transform':'scale(2)',
            '-o-transform':'scale(2)',
            'transform':'scale(2)',
        });
    });
    $(this).animate({'opacity':'0'},200);
    setTimeout(function(){
        $('section.fullscreen-section').each(function(){
            $(this).css({
                'z-index':'-1',
                '-ms-transform':'scale(1)',
                '-webkit-transform':'scale(1)',
                '-moz-transform':'scale(1)',
                '-o-transform':'scale(1)',
                'transform':'scale(1)',
                '-webkit-clip-path':'polygon(-'+HalfPar+'px 0,-'+ParentHeight+'px 0,0 100%,-'+HalfPar+'px 100%,-'+HalfPar+'px 0)',
                'clip-path':'polygon(-'+HalfPar+'px 0,-'+ParentHeight+'px 0,0 100%,-'+HalfPar+'px 100%,-'+HalfPar+'px 0)',
            });
        });
        $('div.Cover').css({'z-index':'1'});
    //
    //
    //} else {
    //setTimeout(function(){
    //}

//
//

        setTimeout(function(){
            $('div.Cover').css({'z-index':'-1'});
        },1100);
        $('svg#exit-symbol').css({
            '-ms-transform':'translateX(100%)',
            '-webkit-transform':'translateX(100%)',
            '-moz-transform':'translateX(100%)',
            '-o-transform':'translateX(100%)',
            'transform':'translateX(100%)',
        });
        $('rect.xsign1').removeClass('xsign1-an');
        $('rect.xsign2').removeClass('xsign2-an');
    },300);
    $('ul.project-parent').scrollTop(0);
    setTimeout(function(){
    $('li.project-child').each(function(){
        $(this).removeClass("project-fadeIn");
    });
    },100);
});

//NAV MAIN LINK CLICKING FUNCTION

$('nav.main-nav a').on('click',function(event){
    $('path.SlideProps').css({
        '-ms-transition':'transform 1.5s cubic-bezier(0.86, 0, 0.07, 1)',
        '-webkit-transition':'transform 1.5s cubic-bezier(0.86, 0, 0.07, 1)',
        '-moz-transition':'transform 1.5s cubic-bezier(0.86, 0, 0.07, 1)',
        '-o-transition':'transform 1.5s cubic-bezier(0.86, 0, 0.07, 1)',
        'transition':'transform 1.5s cubic-bezier(0.86, 0, 0.07, 1)', //Quintic Function
    });
    $('div#imgviewport,i.icon-arrowheaddown,div.about-2').fadeOut(0);
    $('section.fullscreen-section').css({
        '-webkit-clip-path':'polygon(-'+HalfPar+'px 0,-'+ParentHeight+'px 0,0 100%,-'+HalfPar+'px 100%,-'+HalfPar+'px 0)',
        'clip-path':'polygon(-'+HalfPar+'px 0,-'+ParentHeight+'px 0,0 100%,-'+HalfPar+'px 100%,-'+HalfPar+'px 0)',
    });
    $('svg#SlideParent,path#Slide1,path#Slide2,path#Slide3').css({'z-index':'20'});
    var $link = $(this).attr('href'),
        NewSection = $('section#'+$link),
        Color3 = NewSection.css('background-color'),
        Color2 = shadeRGBColor(Color3,0.2),
        Color1 = shadeRGBColor(Color2,0.2);
        NewSection.css({'z-index':'30','opacity':'1'});
        NewSection.fadeIn(0);
        $('rect.exsign').css({'fill':$('section#'+$link).css('color')});
        $('path#Slide1').css({
            'fill':Color1,
            '-ms-transform':'translate(0%)',
            '-webkit-transform':'translate(0%)',
            '-moz-transform':'translate(0%)',
            '-o-transform':'translate(0%)',
            'transform':'translate(0%)',
        });
        setTimeout(function(){
            $('path#Slide2').css({
                'fill':Color2,
                '-ms-transform':'translate(0%)',
                '-webkit-transform':'translate(0%)',
                '-moz-transform':'translate(0%)',
                '-o-transform':'translate(0%)',
                'transform':'translate(0%)',
            });
            
            setTimeout(function(){
                NewSection.css({
                    'z-index':'30',
                    '-webkit-clip-path':'polygon(0 0,100% 0,'+HalfPar+'px 100%,0 100%,0 0)',
                    'clip-path':'polygon(0 0,100% 0,'+HalfPar+'px 100%,0 100%,0 0)',
                });
                setTimeout(function(){
                    $('section.fullscreen-section').each(function(){
                        $(this).css({'z-index':'-1','opacity':'1'});
                    });
                    NewSection.css({'z-index':'1'});
                    NewSection.fadeIn(0);
                    $('svg#SlideParent,path#Slide1,path#Slide2').css({'z-index':'-9999'});
                    $('path#Slide1,path#Slide2').css({
                        '-ms-transform':'translate(-'+SlideWidth+'px)',
                        '-webkit-transform':'translate(-'+SlideWidth+'px)',
                        '-moz-transform':'translate(-'+SlideWidth+'px)',
                        '-o-transform':'translate(-'+SlideWidth+'px)',
                        'transform':'translate(-'+SlideWidth+'px)',
                    });
                    $('div#imgviewport,i.icon-arrowheaddown').fadeIn(500);
                    $Xtrapolate();
                    setTimeout(function(){
                        $('div.about-2').fadeIn(500);
                    },300);
                },1800);
            },200);
        },200);
    event.preventDefault();
});
