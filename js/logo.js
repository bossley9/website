
//VARIABLES

var AbY = $('div#Reset').height(),
    AbX = $('div#Reset').width(),
    y1 = 0.054177546*AbY,
    x1 = 1.5*0.71875*AbX,
    y2 = 0.576370757*AbY,
    x2 = 0.34375*AbX,
    x3 = 1.5*0.625*AbX,
    q = x1-x3,
    y4 = 0.261096606*AbY,
    $w = 2*AbX,
    $h = 2*AbY,
    $xMid = q+x2,
    $Excess = x1-($xMid/2),
    HalvX = AbX+$Excess,
    HalvY = AbY/2;

//PATH "D" ATTRIBUTES

$('path#Logo').attr('d','m'+HalvX+' '+(y1+HalvY)+' l-'+x1+' 0 l0 '+y2+' l'+x2+' 0 l0 '+y1+' l-'+x3+' 0 l0 '+y4+' l'+x1+' 0 l0 -'+y2+' l-'+x2+' 0 l0 -'+y1+' l'+x3+' 0 z');
$('path#Shadow1').attr('d','m'+HalvX+' '+(y1+y4+HalvY)+' l-'+3*y1+' '+3*y1+' l-'+x3+' 0 l'+3*y1+' -'+3*y1+' z');
$('path#Shadow3-5').attr('d','m'+(HalvX-x1+x2)+' '+(y1+y2+HalvY)+' l0 '+y1+' l-'+3*y1+' '+3*y1+' l0 -'+y1+' l'+3*y1+' -'+3*y1+' z');
$('path#Shadow3').attr('d','m'+(HalvX-x1)+' '+(y1+y2+HalvY)+' l-'+3*y1+' '+3*y1+' l'+x2+' 0 l'+3*y1+' -'+3*y1+' z');
$('path#Shadow2').attr('d','m'+(HalvX-x1)+' '+(y1+HalvY)+' l-'+3*y1+' '+3*y1+' l0 '+y2+' l'+3*y1+' -'+3*y1+' z');
$('path#Shadow4').attr('d','m'+(HalvX-x1+$xMid)+' '+(y1+2*y2-y4+HalvY)+' l-'+3*y1+' '+3*y1+' l-'+x1+' 0 l'+3*y1+' -'+3*y1+' z');
$('path#Shadow5').attr('d','m'+(HalvX-2*x1+$xMid)+' '+(2*y1+y2+HalvY)+' l-'+3*y1+' '+3*y1+' l0 '+y4+' l'+3*y1+' -'+3*y1+' z');
$('path#Shadow6').attr('d','m'+(HalvX-x1)+' '+(y1+y2+HalvY)+' l-'+3*y1+' 0 l0 '+3*y1+' l'+3*y1+' 0 z');
$('path#Shadow7').attr('d','m'+(HalvX-x1+x2)+' '+(y1+y2+HalvY)+' l-'+3*y1+' 0 l0 '+3*y1+' l'+3*y1+' 0 z');
$('path#Shadow8').attr('d','m'+(HalvX-2*x1+$xMid)+' '+(y1+2*y2-y4+HalvY)+' l-'+3*y1+' 0 l0 '+3*y1+' l'+3*y1+' 0 z');
$('text#Name1').attr({'x':(HalvX-x1+0.5*q),'y':(HalvY+2*y1+1.9*y4)});
$('text#Name2').attr({'x':(HalvX-x1-q*0.75),'y':(HalvY+3*y1+2.9*y4)});

//SVG & PATH CSS PROPERTIES

$('path#Shadow1,path#Shadow3-5,path#Shadow3,path#Shadow2,path#Shadow4,path#Shadow5').addClass('PathShadow');
$('path#Shadow6,path#Shadow7,path#Shadow8').addClass('PathShadowTemp');
$('svg#LogoParent').css({
    'position':'fixed',
    'top':'50%',
    'left':'50%',
    'height':$h,
    'width':$w,
    '-ms-transform':'translateX(-42%)translateY(-50%)scale(1.0)rotateX(-60deg)rotateZ(-45deg)',
    '-webkit-transform':'translateX(-42%)translateY(-50%)scale(1.0)rotateX(-60deg)rotateZ(-45deg)',
    '-moz-transform':'translateX(-42%)translateY(-50%)scale(1.0)rotateX(-60deg)rotateZ(-45deg)',
    '-o-transform':'translateX(-42%)translateY(-50%)scale(1.0)rotateX(-60deg)rotateZ(-45deg)',
    'transform':'translateX(-42%)translateY(-50%)scale(1.0)rotateX(-60deg)rotateZ(-45deg)',
    //'transform':'translateX(-50%)translateY(-50%)scale(1.0)rotateX(0deg)rotateZ(0deg)',
    'font-family':'trendex',
    'text-transform':'uppercase',
    'font-weight':'bold',
    '-ms-transform-origin':'50% 50%',
    '-webkit-transform-origin':'50% 50%',
    '-moz-transform-origin':'50% 50%',
    '-o-transform-origin':'50% 50%',
    'transform-origin':'50% 50%',
    'z-index':'0',
});

$('svg#LogoParent path').css({
    'fill':'#4D6BF6',
    //'transition':'stroke-dashoffset 2s linear,fill 1s ease,stroke 0.7s ease',
});
$('text#Name1,text#Name2').css({
    'font-size':y4,
    'opacity':'0',
    //'transition':'opacity 0.5s ease',
});
$('path#Logo').css({
    'stroke':'#000',
    //'stroke-dashoffset':(2*x1+2*x2+2*x3+2*y2+2*y1+2*y4),
    'stroke-dashoffset':(2*(x1+x2+x3+y1+y2+y4)),
    'stroke-dasharray':(2*(x1+x2+x3+y1+y2+y4)),
    //'stroke-dasharray':(x1+y2+x2+y1+x3+y4+x1+y2+x2+y1+x3+y4),
});
$('path.PathShadow').css({
    'opacity':'1',
    'stroke':'#000',
    'stroke-dashoffset':'5000',
    'stroke-dasharray':'5000',
});
$('path.PathShadowTemp').css({
    'fill':'#020120',
    'opacity':'0',
});
//$('text#Name1,text#Name2').css({'font-size':y4});
