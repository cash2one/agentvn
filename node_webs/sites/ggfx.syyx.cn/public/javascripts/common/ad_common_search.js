//--------------------------------------------------------------------------------------------------------
//通用控件用于广告查询条件时选择联动效果
//--------------------------------------------------------------------------------------------------------
var def_classid;
var def_mediaid;
var def_adid;

$(function(){

    def_classid = getParameterByName("ClassID");
    def_mediaid = getParameterByName("MediaID");
    def_adid = getParameterByName("ADID");
    def_date = getParameterByName("Date");
    
    set_date('d',0);

    if(def_date!=""){
        $("#txtStartTime").datebox("setValue", def_date); 
        $("#txtEndTime").datebox("setValue", def_date); 
    }

    init_game_list();

    init_ad_info();

    $("#ddlClass").change(function(){
        init_admedia_list(this.value);
    })

    $("#ddlMedia").change(function(){
        init_adad_list(this.value);
    })

    $("#ddlAd").change(function(){
        init_adwebnumber_list(this.value);
    })
})
//--------------------------------------------------------------------------------------------------------
//获取媒体联动列表
//--------------------------------------------------------------------------------------------------------
function init_ad_info(){
    init_adclass_list();
    init_admedia_list(def_classid);
    init_adad_list(def_mediaid);
    init_adwebnumber_list(def_adid);
}
//--------------------------------------------------------------------------------------------------------
//获取游戏记录列表
//--------------------------------------------------------------------------------------------------------
function init_game_list() {
    $("#ddlGame").empty();     
    get_game_list(function(json){     
        //显示记录            
        $.each(json, function(i, item) {
            $("#ddlGame").append("<option value='" + item.ID + "'>" + item.Title+ "</option>");              
        })
    });
}
//--------------------------------------------------------------------------------------------------------
//获取媒体类型列表
//--------------------------------------------------------------------------------------------------------
var init_adclass_list = function (){
    $("#ddlClass").empty();     
    $("#ddlClass").append("<option value=0>所有</option");
    get_adclass_list(function(json){
        //显示记录            
        $.each(json, function(i, item) {            
            $("#ddlClass").append("<option value='" + item.ID + "'>" + item.ClassName+ "</option>");  
        })

        if(def_classid!=""){
            $("#ddlClass").val(def_classid);        
        }      
    });
}
//--------------------------------------------------------------------------------------------------------
//获取媒体记录列表
//--------------------------------------------------------------------------------------------------------
var init_admedia_list =function (classid){
    $("#ddlMedia").empty();            
    $("#ddlMedia").append("<option value=0>所有</option");

    if(classid == ""){   
        init_adad_list(0);     
        return;
    }
    get_admedia_list(classid, function(json) {
        //显示记录            
        $.each(json, function(i, item) {           
            $("#ddlMedia").append("<option value='" + item.ID + "'>" + item.MediaName+ "</option>");  
        })

        if(def_mediaid!=""){
            $("#ddlMedia").val(def_mediaid);
        }
    });            
}
//--------------------------------------------------------------------------------------------------------
//获取广告记录列表
//--------------------------------------------------------------------------------------------------------
var init_adad_list = function (mediaid){
    $("#ddlAd").empty();            
    $("#ddlAd").append("<option value=0>所有</option");

    if(mediaid == ""){ 
        init_adwebnumber_list(0);       
        return;
    }

    get_adad_list(mediaid, function(json) {
        //显示记录            
        $.each(json, function(i, item) {           
            $("#ddlAd").append("<option value='" + item.ID + "'>" + item.ADName+ "</option>");  
        })

        if(def_adid!="")
            $("#ddlAd").val(def_adid);
    });            
}
//--------------------------------------------------------------------------------------------------------
//获取子站列表
//--------------------------------------------------------------------------------------------------------
var init_adwebnumber_list = function (adid){
    $("#ddlAdWebNumber").empty();            
    $("#ddlAdWebNumber").append("<option value='0'>所有</option");

    if(adid == ""){        
        return;
    }
    get_adwebnumber_list(adid, function(json) {
        //显示记录            
        $.each(json, function(i, item) {           
            $("#ddlAdWebNumber").append("<option value='" + item.ID + "'>" + item.ADWebNumber+ "</option>"); 
        })
    });            
}
//--------------------------------------------------------------------------------------------------------