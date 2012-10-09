function formatEnabled(value) {
    if (value)
        return "<font color='blue'>启用</font>";
    else
        return "<font color='red'>禁用</font>";
}

function formatSchedule(value) {
    if (value)
        return "<font color='blue'>已设置</font>";
    else
        return "<font color='red'>设置中</font>";
}

function getParameterByName(name)
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results == null)
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getAdUrl(classid, mediaid, adid, date, value){
    if(value == 1)
        return "<a href='/ad_report_phase.html?ClassID="+classid+"&MediaID="+mediaid+"&ADID="+adid+"&Date="+date+"'>√</a>";
    else
        return " ";
}

function checkAllByID(e) {
    var el = document.getElementsByTagName('input');
    var len = el.length;
    for(var i=0; i<len; i++)
    {
        if((el[i].type=="checkbox") && (el[i].name==name))
        {
            el[i].checked = e.checked;
        }
    }
}

function checkAllByName(e, itemname) {
    var chk = document.getElementsByName(itemname);
    if (chk == undefined) return;
    for (var i = 0; i < chk.length; i++) chk[i].checked = e.checked;
}//--------------------------------------------------------------------------------------------------------
//获取游戏记录列表
//--------------------------------------------------------------------------------------------------------
function get_game_list(cb) {
    $.ajax({
        url: "http://ggfx.syyx.cn/dict_game?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { IsAll: 0 },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) { 
            cb(json.rows);
        }
    });
}
//--------------------------------------------------------------------------------------------------------
//获取媒体类型列表
//--------------------------------------------------------------------------------------------------------
function get_adclass_list(cb){
    $.ajax({
        url: "http://ggfx.syyx.cn/ad_class_list?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: {},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
           cb(json.rows);
        }
    });
}
//--------------------------------------------------------------------------------------------------------
//获取媒体记录列表
//--------------------------------------------------------------------------------------------------------
function get_admedia_list(classid, cb){
    $.ajax({
        url: "http://ggfx.syyx.cn/ad_media_list?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ClassID:classid },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {           
            cb(json.rows);
        }
    });
}
//--------------------------------------------------------------------------------------------------------
//获取广告记录列表
//--------------------------------------------------------------------------------------------------------
function get_adad_list(mediaid, cb){
    $.ajax({
        url: "http://ggfx.syyx.cn/ad_ad_list?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { MediaID:mediaid },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            cb(json.rows);
        }
    });
}
//--------------------------------------------------------------------------------------------------------
//获取子站列表
//--------------------------------------------------------------------------------------------------------
function get_adwebnumber_list(adid, cb){
    $.ajax({
        url: "http://ggfx.syyx.cn/ad_webnumber_list?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ADID:adid },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            cb(json.rows);
        }
    });
}
//--------------------------------------------------------------------------------------------------------