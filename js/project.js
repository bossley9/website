$('ul.project-parent li').addClass('project-child');
$('ul.project-parent li').addClass('FirstLi');

//x = number of columns in project body

var x = 2,
    n = 1,
    DivWidth = screen.availWidth/(x+1),
    DivHeight = screen.availHeight/(x+0.5);
$('ul.project-parent li').css({'width':DivWidth,'height':DivHeight});
var LoadProjects = function(e){
    $('li.project-child').each(function(){
        var imagePos=$(this).offset().top;
        var topOfWindow=$(window).scrollTop();
        if(imagePos<topOfWindow+(screen.availHeight*.7) && !$(this).hasClass('FirstLi')){
            $(this).addClass("project-fadeIn");
        }
    });

//SCROLL NOTIFICATION FADEOUT

    setTimeout(function(){
        $('i.icon-arrowheaddown').fadeOut(500);
        $('span.scrollspan').css({'opacity':'0'});
    },1000);
}
document.getElementById('project').addEventListener('scroll',LoadProjects,false);
document.getElementById('unproject').addEventListener('scroll',LoadProjects,false);

//INITIALIZE THE PROJECTS (SELECT AND GIVE EACH A UNIQUE ID)

var AllProjects = document.querySelectorAll('li.project-child');
for(var p=0;p<AllProjects.length;p++){
    AllProjects[p].id = 'AllProjects'+p;

//CREATE THE LINK TO EACH PROJECT

    var ProjectName = $('li#AllProjects'+p).attr('project'),
        ProjectNameVisual = $('li#AllProjects'+p).attr('pname'),
        ProjectComplete = $('li#AllProjects'+p).attr('edit');
    document.getElementById('AllProjects'+p).appendChild(document.createElement('a'));
    $('li.project-child a').addClass('ProjectLink');      
    $('li#AllProjects'+p+' a').attr('href',ProjectName);

    Preloader('assets/projects/'+ProjectName+'.png');

//ADD INFORMATIONAL TEXT AND AN IMAGE TO EACH PROJECT

    $('li#AllProjects'+p).css({'background-image':'url(assets/projects/'+ProjectName+'.png'});

    //if ( $('svg#LogoParent').css('display') == 'none' ) {
    if ( $('span.mobile-device').css('display') == 'none' ) {
        document.querySelector('li#AllProjects'+p+' a').innerHTML = '<br /><br /><br /><br /><span style="font-size: 180%">'+ProjectNameVisual+'</span>';
    } else {
        document.querySelector('li#AllProjects'+p+' a').innerHTML = '<br /><br /><span style="font-size:200%">'+ProjectNameVisual+'</span><hr style="width:80%" /><br /><br /><br /><span style="font-size:50%">Last Update: '+ProjectComplete+'</span>';
    }

    //$('li#AllProjects'+p).css({'background-image':'url(assets/projects/'+ProjectName+'.png'});
            
//MOVING THE BACKGROUND IMAGE OF EACH PROJECT WHEN MOVING MOUSE

        var MoveBack = function(e){
        var XInitial = $(this).offset().left,
            YInitial = $(this).offset().top,

            XMiddle = e.clientX,
            YMiddle = e.clientY,

            XFinal = XMiddle - XInitial; 
            YFinal = YMiddle - YInitial; 

            XXFinal = XFinal - (DivWidth*0.5),
            YYFinal = YFinal - (DivHeight*0.5),
            
            XXPerc = ((XXFinal)/(0.05*DivWidth))+50,
            YYPerc = ((YYFinal)/(0.05*DivHeight))+50,

        $(this).css({'background-position':XXPerc+'% '+YYPerc+'%'});
    }
    if ( $('span.mobile-device').css('display') !== 'none' ) document.getElementById('AllProjects'+p).addEventListener('mousemove',MoveBack,false);
}

//FIND FIRST ROW OF PROJECTS AND REMOVE THE VISIBLITY OF THE REST

function RemoveFirst(){
    var AlphaProjects = document.querySelectorAll('ul#project li.project-child');
    for(var a=x;a<AlphaProjects.length;a++){
        $('li#AllProjects'+a).removeClass('FirstLi');
    }
    var BetaProjects = document.querySelectorAll('ul#unproject li.project-child');
    for(var b=x+(AlphaProjects.length);b<AllProjects.length;b++){
        $('li#AllProjects'+b).removeClass('FirstLi');
    }
}
RemoveFirst();
