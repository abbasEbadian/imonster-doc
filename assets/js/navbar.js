const nav = document.getElementById("nav-mobile");

function openNav() {
    nav.style.visibility = "visible";
    nav.style.right = "0";
}
function closeNav() {
    nav.style.visibility = "hidden";
    nav.style.right = "-300px";
}

$(document).click(function (event) {
    var $target = $(event.target);
    if (!$target.closest('#nav-mobile').length &&
        $('#nav-mobile').css('visibility') == 'visible') {
        closeNav();
    }
});