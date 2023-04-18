var init = false
var INVISIBLE = {
    opacity: 0,
    pointerEvents: "none",
    visibility: "hidden" 
}

var VISIBLE = {
    opacity: 1,
    pointerEvents: "all",
    visibility: "visible",
}
jQuery(function() {
    if (init) return
    init = true;

    initTogglers();

    initMeetingReminder();
    $("[togglable]").css(INVISIBLE)
 })


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
        if($(e.target).closest("[togglable]").attr('id') === 'record-modal'){
            $(window).trigger("record-modal-closed")
        }
    })

    $("[modal-toggler]").each((_, item) => {
        $(item).on('click', () => {
            console.log($(item).data(), $(item).data('target') === '#record-modal')
            $($(item).data('target')).css(VISIBLE)
            if($(item).data('target') === '#record-modal')
                $(window).trigger("record-modal-opened")
        })
    })

    $("[selecter]").on('click', (event) => {
        const item = $(event.target);
        const value = item.data('value')
        $(item).parents('[select-container]').find('[selectable-text]').text(value);
        $(item).parents('[selectable]').css(INVISIBLE)
    })
}
