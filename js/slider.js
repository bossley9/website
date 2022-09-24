$(window).scroll(function(){
    var ScrollArea = $(window).scrollTop();
    var ScrollFactor = $('div#dos').offset().top;
    if(ScrollArea >= ScrollFactor) {
        $('div#BackUp').fadeIn(500);
    }
    else{
        $('div#BackUp').fadeOut(500);
    }
});

$(document).ready(function(){
    $('div#Menu_Button1').click(function(){
        event.stopPropagation();
        if($('div#Menu_Whole').hasClass('activator')) {
            $('div#Menu_Whole').removeClass('activator');
            $('div#Menu_Whole').css({'left':'-19%'});
            $('img#Setting').css({'-ms-transform':'rotate(-0deg)','-webkit-transform':'rotate(-0deg)','transform':'rotate(-0deg)'});
            $('div#Menu_Button2').css({'top':'0','opacity':'0','transition':'top 0.5s,opacity 0.5s'});
            $('div#Menu_Button3').css({'right':'0','opacity':'0','transition':'right 0.5s,opacity 0.5s'});
        }
        else {
            $('div#Menu_Whole').addClass('activator');
            $('div#Menu_Whole').css({'left':'0','transition':'left 0.5s'});
            $('img#Setting').css({'-ms-transform':'rotate(180deg)','-webkit-transform':'rotate(180deg)','transform':'rotate(180deg)'});
            $('div#Menu_Button2').css({'top':'65px','opacity':'1','transition':'top 0.5s,opacity 0.5s'});
            $('div#Menu_Button3').css({'right':'65px','opacity':'1','transition':'right 0.5s,opacity 0.5s'});
        }
        $(document).click(function(event) {
            if(!$(event.target).closest('div#Menu_Whole').length) {
                $('div#Menu_Whole').removeClass('activator');
                $('div#Menu_Whole').css({'left':'-19%'});
                $('img#Setting').css({'-ms-transform':'rotate(-0deg)','-webkit-transform':'rotate(-0deg)','transform':'rotate(-0deg)'});
                $('div#Menu_Button2').css({'top':'0','opacity':'0','transition':'top 0.5s,opacity 0.5s'});
                $('div#Menu_Button3').css({'right':'0','opacity':'0','transition':'right 0.5s,opacity 0.5s'});
            }
        });
    });
    $('input').focus(function(){
        $(this).css({'border':'2px solid #FF1800'});
    });
    $('input').blur(function(){
        $(this).css({'border':'2px solid #000'});
    });
    $('textarea').focus(function(){
        $(this).css({'border':'2px solid #FF1800'});
    });
    $('textarea').blur(function(){
        $(this).css({'border':'2px solid #000'});
    });
    $('input#Frwak').css({'border':'2px solid #FFF'});
    $('input#Frwak').focus(function(){
        $(this).css({'border':'2px solid #4444FF'});
    });
    $('input#Frwak').blur(function(){
        $(this).css({'border':'2px solid #FFF'});
    });
    $('input#Submission').focus(function(){
        $(this).css({'border':'none'});
    });
    $('div#Menu_Button3').click(function(){
        $('div#SearcH').fadeIn(500);
        event.stopPropagation();
        $(document).click(function(event) {
            if(!$(event.target).closest('div#searchBAR').length) {
                $('div#SearcH').fadeOut(500);
            }
        });
    });
});
