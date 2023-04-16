const history = document.getElementById("history-mobile");

function openHistory() {
    history.style.visibility = "visible";
    history.style.left = "0";
}
function closeHistory() {
    history.style.visibility = "hidden";
    history.style.left = "-300px";
}

$(document).click(function (event) {
    var $target = $(event.target);
    if (!$target.closest('#history-mobile').length &&
        $('#history-mobile').css('visibility') == 'visible') {
        closeHistory();
    }
});