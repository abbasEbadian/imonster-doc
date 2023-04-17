var init = false
var INVISIBLE = {
    opacity: 0,
    pointerEvents: "none",
    visibility: "hidden" 
}

var VISIBLE = {
    opacity: 1,
    pointerEvents: "all",
    visibility: "visible" 
}

document.onreadystatechange = function () {
    if (init) return
    init = true;

    initTogglers();

    initMeetingReminder();
}

const initMeetingReminder = () => {
    const meetingReminder = $('[data-meeting-reminder]')
    
    if(!meetingReminder.length) return

    setTimeout(() => {
        if( !meetingReminder.data("should-show")) return
        meetingReminder.css(VISIBLE);
    }, 
    2000)

    meetingReminder.find("[closer]").on('click', () => {
        meetingReminder.css(INVISIBLE)
    })
}

const initTogglers = () => {
    
    $("[dropdown-toggler]").each((_, item) => {
        $(item).next("[togglable]").css(INVISIBLE)
        $(item).on('click', (event) => {
            const visible = $(item).next("[togglable]").css('visibility')
            if (visible === 'visible') {
                $(item).next("[togglable]").css(INVISIBLE);
            } else {
                $(item).next("[togglable]").css(VISIBLE);
            }
        })
    })
    $('[closer]').on('click', (e) => {
        $(e.target).closest("[togglable]").css(INVISIBLE)
    })

    $("[modal-toggler]").each((_, item) => {
        $(item).on('click', () => {
            $($(item).data('target')).css(VISIBLE)
        })
    })

}
