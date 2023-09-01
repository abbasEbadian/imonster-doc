const ModalWidth = 300;
const ModalHeight = 300;
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

var CalendarTypes = Object.freeze({
    free: "FREE",
    off: "OFF",
    treatment: "TREATMENT",
    counseling: "COUNSELING",
    personal: "PERSONAL"
})
var Weekdays = Object.freeze({
    monday: "MONDAY",
    tuesday: "TUESDAY",
    wednesday: "WEDNESDAY",
    thursday: "THURSDAY",
    friday: "FRIDAY",
    saturday: "SATURDAY",
    sunday: "SUNDAY"
})

var calendar_init = false;
var calendarData = [
    {
        id: 1001,
        time: "13:30",
        humanTime: "1:30 A.M",
        weekday: Weekdays.saturday,
        type: CalendarTypes.treatment,
        patient: {
            id: 1000,
            name: "John Doe"
        },
        googleMeetLink: "https://meet.google.com/txw-cbwo-ovg",

    },
    {
        id: 1002,
        time: "16:30",
        humanTime: "4:30 P.M",
        weekday: Weekdays.wednesday,
        type: CalendarTypes.counseling,
        patient: {
            id: 1,
            name: "Abbas Ebadian"
        },
        googleMeetLink: "https://meet.google.com/txw-cbwo-ovg",

    },
    {
        id: 1003,
        time: "14:30",
        humanTime: "5:30 P.M",
        weekday: Weekdays.thursday,
        type: CalendarTypes.personal,
        patient: {
            id: 1,
            name: "Abbas Ebadian"
        },
        googleMeetLink: "https://meet.google.com/txw-cbwo-ovg",
        description: "Some description"
    },
    {
        id: 1004,
        time: "14:30",
        humanTime: "5:30 P.M",
        weekday: Weekdays.friday,
        type: CalendarTypes.off,
        description: "Some description"

    },

]
jQuery(function () {
    if (calendar_init) return
    calendar_init = true;
    
    render_cells()

})

const convert_to_human_readable_time = (_time) => {
    const time = String(_time)
    let hours = +time.slice(0, 2)
    let minutes = time.slice(3, 5)
    let ampm = "A.M"
    if(hours > 12){
        hours -= 12
        ampm = "P.M"
    }
    if(minutes === '00') minutes = "" 
    return `${hours}${minutes?":"+minutes: ''} ${ampm}` 
}
const render_cells = () => {
    const treatment_cell_node = $($("#calendar-cell")[0].content.cloneNode(true).firstElementChild)
    $("[calendar-cell]").addClass('free')
   calendarData.map(item => {
        const cell = $(`[calendar-cell][data-time='${item.time}'][data-weekday='${item.weekday}']`)
        const cell_text = item.type !== CalendarTypes.off ? item.patient.name : 'Off time'
       $(cell).data('id', item.id).removeClass('free').prepend(treatment_cell_node.clone())
            .find('[patient-name]').text(cell_text)
            
        $(cell).children().first()
            .addClass(`${String(item.type).toLowerCase()}`)
        $(cell).on('click', function (e) {
            handle_cell_click(e, item)
        })
       
    })
        
    $(".free").on('click', function (e) {
        const cell = $(e.currentTarget)
        const data = {
            id: -1,
            type: CalendarTypes.free,
            weekday: cell.data('weekday'),
            time: cell.data('time'),
            humanTime: convert_to_human_readable_time(cell.data('time'))
        }

        handle_cell_click(e, data)
    })
}


const handle_cell_click = (clickEvent, _data) => {
    const data = calendarData.find(q => q.id === _data.id) ?? _data
    const modal = $("[calendar-cell-modal")
    const treatment_modal_node = $($("#treatment-modal")[0].content.cloneNode(true).firstElementChild)
    const counseling_modal_node = $($("#counseling-modal")[0].content.cloneNode(true).firstElementChild)
    const personal_modal_node = $($("#personal-modal")[0].content.cloneNode(true).firstElementChild)
    const off_modal_node = $($("#off-modal")[0].content.cloneNode(true).firstElementChild)
    const free_modal_node = $($("#free-modal")[0].content.cloneNode(true).firstElementChild)

    const modal_template_map = {
        [CalendarTypes.treatment]: treatment_modal_node,
        [CalendarTypes.counseling]: counseling_modal_node,
        [CalendarTypes.personal]: personal_modal_node,
        [CalendarTypes.free]: free_modal_node,
        [CalendarTypes.off]: off_modal_node,
    }

    const modal_template = modal_template_map[data.type]
    $(modal).html(modal_template).removeClass('hidden')

    
    data.patient && $(modal).find('[patient-name]').text(data?.patient?.name)
    data.patient && $(modal).find('[patient-profile-href]').attr('href', '#'+data.patient.id)
    data.googleMeetLink && $(modal).find('[google-meet-link]').attr('href', '#'+data.googleMeetLink)
    data.description && $(modal).find('[description]').text(data.description)
    $(modal).find('[datetime]').text(String(data.weekday).toLowerCase() + ' at ' + data.humanTime)
    $(modal).find('[datetime]').text(String(data.weekday).toLowerCase() + ' at ' + data.humanTime)
    let left = clickEvent.clientX   
    let top = clickEvent.clientY
    const screen_width = $(window).width()
    const screen_height = $(window).height()

    if (left + ModalWidth > screen_width) {
        left -= (left + ModalWidth) - screen_width
    }
    if(top + ModalHeight > screen_height){
        top -= (top + ModalHeight) - screen_height
    }
    if(screen_width > 768)
        $(modal).css({ left, top })
    else{
        $(modal).css({
            bottom : "0",
            left: 0,
            right: 0,
            top: "unset"
        })
    }

    
    if(data.type === CalendarTypes.free) {
        $("[togglable]").css(INVISIBLE)

        selectEvent(clickEvent)
    }
    $(modal).find('[closer]').on('click', function (e) {
        $(modal).addClass('hidden')
    })

}


var already = false
const selectEvent = (event) => {
    event.stopPropagation()
    const item = $("[calendar-cell-modal] [dropdown-toggler]")
    item.off('click').on('click', function (e) {
        const visible = item.next("[togglable]").css('visibility')
        if (visible === 'visible') {
            $(item).next("[togglable]").css(INVISIBLE);
        } else {
            $(item).next("[togglable]").css(VISIBLE);
        }
    })
    selectorEvent()

    // $("[dropdown-toggler]").not(event.target).next("[togglable]").css(INVISIBLE)
}
const selectorEvent = () => {
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
}