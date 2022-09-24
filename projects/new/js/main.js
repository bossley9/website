$('html').removeClass('no-js');


//$('html,body').scrollTop(0);

//document.body.scrollTop = document.documentElement.scrollTop = 0;
//window.location.hash="main";
//$(document.body).scrollTop(0);
//alert('ok!');

var StartUp = function () {    
    setTimeout( function () {
        $('div.load-text').removeClass('visible');
        setTimeout( function () {
            $('div.cover').removeClass('visible');
            setTimeout( function () {
                $('body').removeClass('hide-scroll');
                $('path#sam-stroke').addClass('stroke-in');
                $('h2.onload-text').addClass('visible vertical-reset');
            }, 700);
        }, 1500);
    }, 1000);
}

window.onload = StartUp;

/*Scroll function*/

var scrollIntro = function (e) {
};


document.addEventListener('scroll', scrollIntro, false); 

/*Parallax function*/

var perspective = function (e) {
};

document.addEventListener('mousemove', perspective, false); 
