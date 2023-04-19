
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
            const target = $(item).data('target');
            var value;
            $(target).css(VISIBLE)


            if( target === '#record-modal')
                $(window).trigger("record-modal-opened")

            else if(target){
                value = $(item).data('code') || "??" ;
                $(target).find("[code-input]").text(value)
            }
        })
    })

    $("[selecter]").on('click', (event) => {
        const item = $(event.target);
        const value = item.data('value')
        $(item).parents('[select-container]').find('[selectable-text]').text(value);
        $(item).parents('[selectable]').css(INVISIBLE)
    })
    $("[carousel]").length && $('[carousel]').each((_, item) => {
        const count = $(item).data('count');
        const conf = {
            infinite: false,
            autoplay: false,
            centerMode: false
        }
        if(!count) conf["variableWidth"] = true;
        else conf["slidesToShow"] = count
        $(item).slick( conf )
    })
    $("[accordion]").length && $("[accordion]").accordion({
        heightStyle: "content",
        collapsible: true,
        actove: false,
        icons: false,
        activate: function( event, ui ) {
            
            $(ui.newHeader[0]).find("img").length &&
                $(ui.newHeader[0]).find("img").css("transform", "rotate(180deg)")
            
            $(ui.oldHeader[0]).find("img").length &&
                $(ui.oldHeader[0]).find("img").css("transform", "rotate(0deg)")
        },
      
    })



    
}
