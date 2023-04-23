
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

    // dropdown click away listener
    $(document).on('click', function (e) {
        $("[togglable]").css(INVISIBLE)
    })

    $("[dropdown-toggler]").each((_, item) => {
        $(item).on('click', (event) => {
            event.stopPropagation()
            const visible = $(item).next("[togglable]").css('visibility')
            if (visible === 'visible') {
                $(item).next("[togglable]").css(INVISIBLE);
            } else {
                $(item).next("[togglable]").css(VISIBLE);
            }

            $("[dropdown-toggler]").not(item).next("[togglable]").css(INVISIBLE)
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

    // SELECTBOX items
    $("[selecter]").on('click', (event) => {
        event.stopPropagation()

        const item_list = $(event.target).parents("[selectable]").next("[selected-items]");
        const has_select_list = item_list.length > 0;
        const item = $(event.target);
        const value = item.data('value')
        $(item).parents('[select-container]').find('[selectable-text]').text(value);
        $(item).parents('[selectable]').css(INVISIBLE)

        console.log(has_select_list, item_list)
        if(has_select_list){
            const template = item_list.find("[template]").clone();
            template.text(value).removeClass("hidden").removeAttr("template");
            item_list.prepend(template)
            item_list.find("button").css(VISIBLE)
        }
    })


    // CAROUSELS 
    // set attr of carousel='' to initiate 
    $("[carousel]").length && $('[carousel]').each((_, item) => {
        const count = $(item).data('count') ;
        const auto = !count && true
        const conf = {
            infinite: false,
            autoplay: false,
            centerMode: false,
            mobileFirst: true, 
            variableWidth: auto,
            responsive: [
                {
                    breakpoint: 360,
                    settings:{
                        slidesToShow: 1
                    },
                },
                {
                    breakpoint: 768,
                    settings:{
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 1200,
                    settings:{
                        slidesToShow: count
                    }
                }
            ]
        }
        $(item).slick( conf )
    })



    // FAQ ACCORDION
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
