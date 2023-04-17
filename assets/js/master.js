document.onreadystatechange = function () {
    
    initSelectBoxEventListener();
}

const initSelectBoxEventListener = () => {
    const $selectBox = $(".selectBox");
    console.log($selectBox)
    $selectBox.children("button").click(function(e) {
        const $parent = $(e.target).parents("button").length > 0 ? $(e.target).parents("button"): $(e.target);
        console.log($parent.siblings("ul"))
        $parent.siblings("ul").toggleClass('hidden')
        
    })
    
}
