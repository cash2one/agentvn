//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    global_setting()

    switch_grade()

    open_reg()

    open_download_dialog()
    document.title ='新手指南-《诺亚传说》时间版官方网站-重塑经典 战出未来！'
})
//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}

//---------------------------------------------------------------------------------------


function switch_grade() {
    $('#expand_1').live('click', function(event){
        $('.grade_1').show()
        $('.grade_2').hide()
        $('.grade_3').hide()
        $('#expand_2').remove().insertAfter('.grade_3').css('display','block')
        $('#expand_3').remove().insertAfter('#expand_2').css('display','block')
        $(this).hide()
        event.preventDefault()
    })

    $('#expand_2').live('click', function(event){
        $('.grade_1').hide()
        $('.grade_2').show()
        $('.grade_3').hide()
        $('#expand_1').remove().insertBefore('.grade_2').css('display','block')
        $('#expand_3').remove().insertAfter('#expand_2').css('display','block')
        $(this).hide()
        event.preventDefault()
    })

    $('#expand_3').live('click', function(event){
        $('.grade_1').hide()
        $('.grade_2').hide()
        $('.grade_3').show()
        $('#expand_1').remove().insertBefore('.grade_3').css('display','block')
        $('#expand_2').remove().insertAfter('#expand_1').css('display','block')
        $(this).hide()
        event.preventDefault()
    })
}

function open_reg() {
    $('.ready .reg,.try .reg').click(function(event){
        // var offset = $(this).offset()
        $('#float_reg_btn').hide()
        // $('#float_reg_panel').css({
        //     position : 'absolute',
        //     left     : offset.left + 200,
        //     top      : offset.top - 200
        // }).show()
        $('#float_reg_panel').show()
        event.preventDefault()
    })

    // $('#float_reg_panel .close a').click(function(event){
    //     $('#float_reg_btn').show()
    //     if(window.XMLHttpRequest) {
    //         $('#float_reg_panel').css({
    //             position : 'fixed',
    //             left     : 'auto',
    //             right    : 10,
    //             top      : 100
    //         }).hide()
    //     }
    //     else{
    //         $('#float_reg_panel').css({
    //             position : 'absolute',
    //             left     : 'auto',
    //             right    : 10,
    //             top      : 100
    //         }).hide()
    //     }
    //     event.preventDefault()
    // })
}

function open_download_dialog() {
    $('.ready .download,.try .download').click(function(event){
        var offset = $(this).offset()
        $('.download_dialog').css({
            left    :  offset.left + 200,
            top     :  offset.top - 70
        }).show()
        event.preventDefault()  
    })

    $('.download_dialog .close').click(function(event){
        $('.download_dialog').hide()
        event.preventDefault()
    })
}