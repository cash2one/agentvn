//--------------------------------------- config_flash_data ----------------------------------
var flash_data = {
    video   : {
        div_id : 'pop_flash',
        url    : 'http://s.syyx.com/nycs/flash/player2.swf?autostart=true&repeat=false&file=http://v.nycs.syyx.com/nycs/flv/tvc_usual_20120531.flv',
        width  : 640,
        height : 360
    }
}

var flash_data_2 = {
    video1   : {
        div_id : 'flash2',
        url    : 'http://v.nycs.syyx.com/nycs/swf/anniu_5.31.swf',
        width  : 216,
        height : 120
    },
    video2   : {
        div_id : 'flash1',
        url    : 'http://v.nycs.syyx.com/nycs/swf/cg_5.31.swf',
        width  : 216,
        height : 120
    }
}
//dom_loaded-------------------------------------------------------------------------------------------
$(function(){

    global_setting()

    open_dialog()

    set_flash(flash_data_2)

    wait_for_opening()
    
});
//------------------------------------
function open_dialog() {
    $('.video a').click(function(event){
        $("#pop_flash_dialog").html("<div id=\"pop_flash\"></div>")
        set_flash(flash_data)
        $("#pop_flash_dialog").dialog({
            width       : 656,
            height      : 400,
            modal       : true,
            resizable   : false,
            dialogClass : "pop_video_detail",
            close       : function() {
                $("#pop_flash_dialog").html("");
            }
        });
        event.preventDefault()
    })
}
function set_flash(flash_data) {
    var params = { wmode : "transparent" };

    for (var key in flash_data) {
        var div_id = flash_data[key].div_id
        var url    = flash_data[key].url
        var width  = flash_data[key].width
        var height = flash_data[key].height

        swfobject.embedSWF(url, div_id, width, height, "9", null, null, params);
    }
}
//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}

function wait_for_opening() {
    var opening1_time = new Date(2012, 5, 7)
    var opening2_time = new Date(2012, 5, 8)
    var now           = new Date()

    if( now - opening1_time < 0 ) {
        $('.link2 a.second,.link2 a.third,.link2 a:eq(3)').click(function(event){
            alert('敬请期待')
            event.preventDefault()
        })

        return
    }

    if( now - opening2_time < 0 ) {
        $('.link2 a.second').removeClass('wait')
        $('.link2 a.third').removeClass('wait2')

        $('.link2 a:eq(3)').click(function(event){
            alert('敬请期待')
            event.preventDefault()
        })

        return
    }

    $('.link2 a.second').removeClass('wait')
    $('.link2 a.third').removeClass('wait2')
    $('.link2 a:eq(3)').removeClass('wait3')
}