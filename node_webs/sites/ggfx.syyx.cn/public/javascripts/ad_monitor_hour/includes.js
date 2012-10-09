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
}//---------------------------------------------------  
// 判断闰年  
//---------------------------------------------------  
Date.prototype.isLeapYear = function()   
{   
    return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));   
}   
  
//---------------------------------------------------  
// 日期格式化  
// 格式 YYYY/yyyy/YY/yy 表示年份  
// MM/M 月份  
// W/w 星期  
// dd/DD/d/D 日期  
// hh/HH/h/H 时间  
// mm/m 分钟  
// ss/SS/s/S 秒  
//---------------------------------------------------  
Date.prototype.Format = function(formatStr)   
{   
    var str = formatStr;   
    var Week = ['日','一','二','三','四','五','六'];  
  
    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
  
    str=str.replace(/MM/,(this.getMonth()+1)>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));   
    str=str.replace(/M/g,this.getMonth());   
  
    str=str.replace(/w|W/g,Week[this.getDay()]);   
  
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
    str=str.replace(/d|D/g,this.getDate());   
  
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
    str=str.replace(/h|H/g,this.getHours());   
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
    str=str.replace(/m/g,this.getMinutes());   
  
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
    str=str.replace(/s|S/g,this.getSeconds()); 
    return str;   
}   
  
//+---------------------------------------------------  
//| 日期计算  
//+---------------------------------------------------  
Date.prototype.DateAdd = function(strInterval, Number) {   
    var dtTmp = this;  
    switch (strInterval) {   
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));  
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));  
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));  
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));  
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));  
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
    }  
}  
  
//+---------------------------------------------------  
//| 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串  
//+---------------------------------------------------  
Date.prototype.DateDiff = function(strInterval, dtEnd) {   
    var dtStart = this;  
    if (typeof dtEnd == 'string' )//如果是字符串转换为日期型  
    {   
        dtEnd = StringToDate(dtEnd);  
    }  
    switch (strInterval) {   
        case 's' :return parseInt((dtEnd - dtStart) / 1000);  
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);  
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);  
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);  
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));  
        case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
    }  
}   
  
//+---------------------------------------------------  
//| 取得日期数据信息  
//| 参数 interval 表示数据类型  
//| y 年 m月 d日 w星期 ww周 h时 n分 s秒  
//+---------------------------------------------------  
Date.prototype.DatePart = function(interval)  
{   
    var myDate = this;  
    var partStr='';  
    var Week = ['日','一','二','三','四','五','六'];  
    switch (interval)  
    {   
        case 'y' :partStr = myDate.getFullYear();break;  
        case 'm' :partStr = myDate.getMonth()+1;break;  
        case 'd' :partStr = myDate.getDate();break;  
        case 'w' :partStr = Week[myDate.getDay()];break;  
        case 'ww' :partStr = myDate.WeekNumOfYear();break;  
        case 'h' :partStr = myDate.getHours();break;  
        case 'n' :partStr = myDate.getMinutes();break;  
        case 's' :partStr = myDate.getSeconds();break;  
    }  
    return partStr;  
}  

//+---------------------------------------------------  
//| 取得当前日期所在月的第一天 
//+---------------------------------------------------  
Date.prototype.FirstDayOfDate = function()  
{   
    var myDate = this;    
    var ary = myDate.toArray();  
    var result = new Date(ary[0],ary[1],1); 
    return result;
}  

//+---------------------------------------------------  
//| 取得当前日期所在月的最后一天 
//+---------------------------------------------------  
Date.prototype.LastDayOfDate = function()  
{   
    var date1 = this.FirstDayOfDate();
    var date2 = date1.DateAdd('m',1); 
    var result = date2.DateAdd('d',-1);  
    return result;  
}  

//+---------------------------------------------------  
//| 取得当前日期所在月的最大天数  
//+---------------------------------------------------  
Date.prototype.MaxDayOfDate = function()  
{   
    /*
    var myDate = this;  
    var ary = myDate.toArray();  
    var date1 = (new Date(ary[0],ary[1],1));  
    var date2 = date1.DateAdd('m',1);  
    var result = date1.DateDiff('d',date2);  
    return result;  
    */
    var myDate = this.LastDayOfDate();
    var result = myDate.DatePart('d');
    return result;
}  

//+---------------------------------------------------  
//| 把日期分割成数组  
//+---------------------------------------------------  
Date.prototype.toArray = function()  
{   
    var myDate = this;  
    var myArray = Array();  
    myArray[0] = myDate.getFullYear();  
    myArray[1] = myDate.getMonth();  
    myArray[2] = myDate.getDate();  
    myArray[3] = myDate.getHours();  
    myArray[4] = myDate.getMinutes();  
    myArray[5] = myDate.getSeconds();  
    return myArray;  
} 

//+---------------------------------------------------  
//| 日期合法性验证  
//| 格式为：YYYY-MM-DD或YYYY/MM/DD  
//+---------------------------------------------------  
function IsValidDate(DateStr)   
{   
    var sDate=DateStr.replace(/(^\s+|\s+$)/g,''); //去两边空格;   
    if(sDate=='') return true;   
    //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''   
    //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式   
    var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g,'');   
    if (s=='') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D   
    {   
        var t=new Date(sDate.replace(/\-/g,'/'));   
        var ar = sDate.split(/[-/:]/);   
        if(ar[0] != t.getYear() || ar[1] != t.getMonth()+1 || ar[2] != t.getDate())   
        {   
            //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');   
            return false;   
        }   
    }   
    else   
    {   
        //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');   
        return false;   
    }   
    return true;   
}   
  
//+---------------------------------------------------  
//| 日期时间检查  
//| 格式为：YYYY-MM-DD HH:MM:SS  
//+---------------------------------------------------  
function CheckDateTime(str)  
{   
    var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;   
    var r = str.match(reg);   
    if(r==null)return false;   
    r[2]=r[2]-1;   
    var d= new Date(r[1],r[2],r[3],r[4],r[5],r[6]);   
    if(d.getFullYear()!=r[1])return false;   
    if(d.getMonth()!=r[2])return false;   
    if(d.getDate()!=r[3])return false;   
    if(d.getHours()!=r[4])return false;   
    if(d.getMinutes()!=r[5])return false;   
    if(d.getSeconds()!=r[6])return false;   
    return true;   
}   
  
//+---------------------------------------------------  
//| 字符串转成日期类型   
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd  
//+---------------------------------------------------  
function StringToDate(DateStr)  
{     
    var converted = Date.parse(DateStr);  
    var myDate = new Date(converted);  
    if (isNaN(myDate))  
    {   
        //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
        var arys= DateStr.split('-');  
        myDate = new Date(arys[0],--arys[1],arys[2]);  
    }  
    return myDate;  
}  
//--------------------------------------------------------------------------------------------------------
//设置时间
//--------------------------------------------------------------------------------------------------------
function set_date(strInterval, Number){
    var date = new Date();
    var dt2=date.Format('yyyy-MM-dd');
    var dt1=date.DateAdd(strInterval,Number).Format('yyyy-MM-dd');
    

    $("#txtStartTime").datebox("setValue", dt1); 
    $("#txtEndTime").datebox("setValue", dt2); 
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
//--------------------------------------------------------------------------------------------------------//--------------------------------------------------------------------------------------------------------
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