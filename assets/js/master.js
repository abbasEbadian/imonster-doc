
var init = false
var INVISIBLE = {
    opacity: 0,
    pointerEvents: "none",
    visibility: "hidden",
}
var VISIBLE = {
    opacity: 1,
    pointerEvents: "all",
    visibility: "visible",
}

jQuery(function () {
    if (init) return
    init = true;

    initTogglers();

    initMeetingReminder();
    $("[togglable]").css(INVISIBLE)
})


const initMeetingReminder = () => {
    const meetingReminder = $('[data-meeting-reminder]')

    if (!meetingReminder.length) return

    setTimeout(() => {
        if (!meetingReminder.data("should-show")) return
        meetingReminder.css(VISIBLE);
    },
        2000)

    meetingReminder.find("[closer]").on('click', () => {
        meetingReminder.css(INVISIBLE)
    })
}

const initTogglers = () => {

    // dropdown click away listener
    // $(document).on('click', function (e) {
    //     if( $(e.target).parents('[togglable]').length === 0)
    //     $("[togglable]").css(INVISIBLE)
    // })

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
        if ($(e.target).closest("[togglable]").attr('id') === 'record-modal') {
            $(window).trigger("record-modal-closed")
        }
    })


    $("[modal-toggler]").each((_, item) => {
        $(item).on('click', (event) => {
            event.stopPropagation()
            const target = $(item).data('target');
            var value;
            $(target).css(VISIBLE)
            $(target).removeClass("hidden")

            if (target === '#record-modal')
                $(window).trigger("record-modal-opened")

            else if (target) {
                value = $(item).data('code') || "??";
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

        if (has_select_list) {
            const template = item_list.find("[template]").clone();
            template.text(value).removeClass("hidden").removeAttr("template");
            item_list.prepend(template)
            item_list.find("button").css(VISIBLE)
        }

        if ($(item).parents("[calendar-select]").length) {
            // Its in calendar
            // So we should handle meeting type selection

            handleMeetingType($(item).parents("[select-container]").next(), value);
        }
    })



    // CAROUSELS 
    // set attr of carousel='' to initiate 
    $("[carousel]").length && $('[carousel]').each((_, item) => {
        const count = $(item).data('count');
        const auto = !count && true
        const conf = {
            infinite: false,
            autoplay: false,
            centerMode: true,
            mobileFirst: true,
            variableWidth: auto,
            responsive: [
                {
                    breakpoint: 360,
                    settings: {
                        slidesToShow: 1
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: count
                    }
                }
            ]
        }
        $(item).slick(conf)
    })



    // FAQ ACCORDION
    $("[accordion]").length && $("[accordion]").accordion({
        heightStyle: "content",
        collapsible: true,
        actove: false,
        icons: false,
        activate: function (event, ui) {

            $(ui.newHeader[0]).find("img").length &&
                $(ui.newHeader[0]).find("img").css("transform", "rotate(180deg)")

            $(ui.oldHeader[0]).find("img").length &&
                $(ui.oldHeader[0]).find("img").css("transform", "rotate(0deg)")
        },

    })

    $("[range-slider]").each(function (_, slider) {
        const step = $(slider).data('step') ?? 1
        const min = $(slider).data('min') ?? 0
        const max = $(slider).data('max') ?? 100
        const value = $(slider).data('initial_value') ?? min
        const unit = $(slider).data('unit') || " "

        $(slider).slider({
            classes: {
                "ui-slider": "!bg-primary !h-[1px] !border-0",
                "ui-slider-handle": "!bg-white !border-primary !border-1 !w-4 !h-4 !rounded-full !border-0 !top-[-8px]",
            },
            min,
            max,
            step,
            value,
            create: function (e, ui) {
                $(e.target).find('.ui-slider-handle').append(`<div range-slider-value class="text-primary text-xs absolute top-[-18px] left-1 flex "> <b value>${value}</b><span class="text-[10px]">${unit}</span> </div>`)
                $(slider).next("input").val(value)

            },
            slide: function (e, ui) {
                $(ui.handle).find("[range-slider-value] [value]").text(ui.value)
                $(slider).next("input").val(ui.value)
            }
        })
    })

    $("[datepicker]").length && $("[datepicker]").each((_, item) => {
        $(item).datepicker({
            nextText: ">",
            prevText: "<",
            autoSize: $(item).data("autoSize") && true || false,

        });
    })
    $("[meeting-datepicker]").length && $("[meeting-datepicker]").each((_, item) => {
        $(item).datepicker({
            nextText: ">",
            prevText: "<",
            autoSize: $(item).data("autoSize") && true || false,
            beforeShowDay: function (date) {
                if (new Date(date).setHours(0, 0, 0, 0).valueOf() < new Date().setHours(0, 0, 0, 0).valueOf()) return [0, "text-stone-400 after:w-full relative after:absolute after:left-0 after:top-1/2 after:bg-stone-400 after:h-[1px] !text-lg"]
                return [1, "text-primary !text-lg font-extralight"]
            }
        });
    })



    $("[calendar-item]").each((_, item) => {
        $(item).on('click', function (e) {
            $("[calendar-item] + [togglable]").css(INVISIBLE)
            if ($(e.target)[0].hasAttribute("closer")) {
                $(item).find("[togglable]").eq(0).css(INVISIBLE)
            } else
                $(item).next("[togglable]").eq(0).css({...VISIBLE})
        })
    })



    $("[enterable]").each((_, item) => {
        const template = $(item).next().find('[template]')
        $(item).on("keypress", function (e) {
            if (e.key === "Enter") {
                const val = $(item).val()
                const n = template.clone().removeClass('hidden')
                n.find("small").text(val)
                $(n).find('img').on('click', function (e) {
                    $(n).detach()
                })
                $(item).next().append(n)
                $(item).val("")
            }
        })
    })

}


const handleMeetingType = (contentEl, selectedType) => {
    $(contentEl).removeClass("hidden")
    switch (selectedType) {
        case "Treatment":
        case "Counseling":
            $(contentEl).find('input').removeClass('hidden')
            $(contentEl).find('textarea').addClass('hidden')
            break;
        case "Personal meeting":
                case "Off time":
            $(contentEl).find('input').addClass('hidden')
            $(contentEl).find('textarea').removeClass('hidden').attr('placeholder', "write about your " + selectedType)
            break;
        default:
            $(contentEl).add("hidden")
            break;
    }
}