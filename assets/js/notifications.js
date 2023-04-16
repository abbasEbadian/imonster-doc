const notifications_desktop = document.getElementById("notifications-desktop");
const notifications_mobile = document.getElementById("notifications-mobile");

function openNotifications_desktop() {
    notifications_desktop.style.visibility = "visible";
    notifications_desktop.style.opacity = "100%";
}
function closeNotifications_desktop() {
    notifications_desktop.style.opacity = "0%";
    notifications_desktop.style.visibility = "hidden";
}
function openNotifications_mobile() {
    notifications_mobile.style.visibility = "visible";
    notifications_mobile.style.opacity = "100%";
}
function closeNotifications_mobile() {
    notifications_mobile.style.opacity = "0%";
    notifications_mobile.style.visibility = "hidden";
}

$(document).click(function (event) {
    var $target = $(event.target);
    if (!$target.closest('#notifications-desktop').length &&
        $('#notifications-desktop').css('opacity') == '1') {
        closeNotifications_desktop();
    }
    if (!$target.closest('#notifications-mobile').length &&
        $('#notifications-mobile').css('opacity') == '1') {
        closeNotifications_mobile();
    }
});