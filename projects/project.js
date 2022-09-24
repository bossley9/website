
//INITIALIZING JS FOR JS USERS
document.documentElement.className = document.documentElement.className.replace( /(?:^|\s)no-js(?!\S)/g , '' );

//LOADING PAGE
function Loaded() {
    document.getElementById('loader').style.opacity = 0;
    setTimeout( function () {
        document.getElementById('loader').style.display = "none";
    }, 500);
}

function animate(elem, unit, from, to, time) {
    if( !elem) return;
    var start = new Date().getTime(),
    timer = setInterval(function() {
        var step = Math.min(1,(new Date().getTime()-start)/time);
        elem.innerHTML = Math.round(from+step*(to-from))+unit;
        if( step == 1 ) {
            clearInterval(timer);
            window.setTimeout( function () {
                Loaded();
            }, 500 );
        }
    },25);
    elem.innerHTML = Math.round(from)+unit;
}

function LoadMe() {
    animate(document.getElementById('progress'), "%", 0, 100, 2000);
}

window.addEventListener ? 
window.addEventListener("load", LoadMe, false) : 
window.attachEvent && window.attachEvent("onload", LoadMe);
