/*
var imageArr = [];
var imageLoaded = 0;
var imageNumber = 1;
function loadingimages() {
    imageLoaded++;
    if (imageLoaded === imageNumber) {
        IniX();
    }
}
loadingimages();
*/

/*
var mobile_test = false;
if ( $('svg#LogoParent').css('display') == 'none' ) {
    var mobile_test = true;
}
console.log(mobile_test);
*/
/*
var mobile_test = ( $('svg#LogoParent').css('display') == 'none' );
var mobile_true = ( $('svg#LogoParent').css('display') == 'none' );
var mobile_false = ( $('svg#LogoParent').css('display') !== 'none' );
*/
//$L = 0;
function Preloader(linkurl) {
    var imgr = new Image();
        imgr.src = linkurl;
        //$L++;
        //console.log($L);
        //alert($L);
}

Preloader('assets/profiles/bow.png');
Preloader('assets/sam.png');

//mobile_test = false;



function IniX() {

/* ANIMATION SETUP */

    setTimeout(function(){
        $('path#Logo').css({
            'transition':'stroke-dashoffset 2s linear,fill 1s ease,stroke 0.7s ease',
            'stroke-dashoffset':'0'
        });
        setTimeout(function(){
            $('path.PathShadow').css({
                'transition':'stroke-dashoffset 2s linear,fill 1s ease,stroke 0.7s ease',
                'stroke-dashoffset':'0'
            });
            setTimeout(function(){
                $('path.PathShadow').css({'fill':'#020120'});
                setTimeout(function(){
                    $('text#Name1,text#Name2').css({
                        'transition':'opacity 0.5s ease',
                        'opacity':'1'
                    });
                    //$('text#Name1').css({'opacity':'1'});
                    //$('text#Name2').css({'opacity':'1'});
                    setTimeout(function(){
                        $('div#Reset').css({'opacity':'0'});
                        $('span#fast-forward').fadeOut(700);
                        $('svg#LogoParent path').css({'stroke':'none'});
                        $('path.PathShadowTemp').css({'opacity':'1'});
                        $('nav.main-nav a').css({'visibility':'visible'});
                        $L = 1;
                        $('nav.main-nav a').each(function(){
                            var NavigatD = $(this);
                            setTimeout(function(){
                                NavigatD.css({
                                    'opacity':'1',
                                });
                            },($L)*700);
                            $L += 1;
                        });
                    },700);
                },200);
            },900);
        },1000);
    },500);

/* FAST FORWARD */

    $('span#fast-forward').on('click',function(){
        $('span#fast-forward').fadeOut(300);
        $('div#Reset').css({
            'transition':'none',
            'opacity':'0',
        });
        $('svg#LogoParent path').css({
            'transition':'none',
            'stroke':'none',
        });
        $('path#Logo').css({'stroke-dashoffset':'0'});
        $('path.PathShadow').css({
            'fill':'#020120',
            'stroke-dashoffset':'0',
        });
        $('path.PathShadowTemp').css({'opacity':'1'});
        $('text#Name1,text#Name2').css({'opacity':'1'});
        $('nav.main-nav a').css({
            'visibility':'visible',
            'opacity':'1',
        });
    });

/* MOBILE SETUP */

//var isMobile = false; //initiate as false
    //var MobileTest = false;
    //if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) MobileTest = true;
    //if ( $('svg#LogoParent').css('display') == 'none' ) {
    if ( $('span.mobile-device').css('display') == 'none' ) {
        //mobile_test = true;


        //var AllProjects = document.querySelectorAll('li.project-child');
        //for(var p=0;p<AllProjects.length;p++){
            //AllProjects[p].id = 'AllProjects'+p;
        //    document.getElementById('AllProjects'+p).removeEventListener('mousemove', false);
        //}
        //alert('MOBILE');

        if (window.innerHeight > window.innerWidth) {
            //alert('portrait!');
        } else {
            //alert('landscape!');
        }

    } else {

    }
}
