//var images = ['1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png','11.png','12.png'];
//$('html,body').css({'background-image':'url(img/'+images[Math.floor(Math.random() * images.length)]+')'});
$('html,body').css({'background-image':'url(img/BackDrop.png)'});
function OpenPop(){$('div#InfoContainer').fadeIn(300);}
function ClosePop(){$('div#InfoContainer').fadeOut(300);}
function OpenPop2(){
    $('div#MoreInfo').fadeIn(300);
    setTimeout(function(){$('div#MoreInfo').fadeOut(300);},5000);
}
function EmbedOpen(){
    $('div#Embedded').fadeIn(200);
    $('input').select();
}
function EmbedClose(){$('div#Embedded').fadeOut(200);}
$(window).on('keydown',function(e){if(e.keyCode==27){ClosePop();EmbedClose()}});


if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    $('html,body').css({'background-image':'url(img/BackDropMobile.png)'});
    $('html,body').css({'font-size':'1em !important'});
    $('i#Eye').fadeOut(0);
    $('section#UpperL,section#UpperR,section#Titan').css({'background-color':'rgba(0,0,0,0)'});
    $('i').css({'-ms-zoom':'1.7','zoom':'1.7'});
    $('nav#ButtonClassy').css({'bottom':'2%','-ms-zoom':'1.7','zoom':'1.7'});
    $('i.icon-facebook').css({'color':'#3A5795'});$('i.icon-google-plus').css({'color':'#DD4B39'});
    $('i.icon-mail').css({'color':'rgba(255,255,255,0.7)'});$('i.icon-embed').css({'display':'none'});
}
window.console.info('Tell me what you think of my site!');
