function formatEnabled(a){return a?"<font color='blue'>\u542f\u7528</font>":"<font color='red'>\u7981\u7528</font>"}function formatSchedule(a){return a?"<font color='blue'>\u5df2\u8bbe\u7f6e</font>":"<font color='red'>\u8bbe\u7f6e\u4e2d</font>"}function getParameterByName(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");a=RegExp("[\\?&]"+a+"=([^&#]*)").exec(window.location.search);return null==a?"":decodeURIComponent(a[1].replace(/\+/g," "))}
function getAdUrl(a,b,c,d,e){return 1==e?"<a href='/ad_report_phase.html?ClassID="+a+"&MediaID="+b+"&ADID="+c+"&Date="+d+"'>\u221a</a>":" "}function checkAllByID(a){for(var b=document.getElementsByTagName("input"),c=b.length,d=0;d<c;d++)"checkbox"==b[d].type&&b[d].name==name&&(b[d].checked=a.checked)}function checkAllByName(a,b){var c=document.getElementsByName(b);if(void 0!=c)for(var d=0;d<c.length;d++)c[d].checked=a.checked}
Date.prototype.isLeapYear=function(){return 0==this.getYear()%4&&(0!=this.getYear()%100||0==this.getYear()%400)};
Date.prototype.Format=function(a){a=a.replace(/yyyy|YYYY/,this.getFullYear());a=a.replace(/yy|YY/,9<this.getYear()%100?(this.getYear()%100).toString():"0"+this.getYear()%100);a=a.replace(/MM/,9<this.getMonth()+1?(this.getMonth()+1).toString():"0"+(this.getMonth()+1));a=a.replace(/M/g,this.getMonth());a=a.replace(/w|W/g,"\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(",")[this.getDay()]);a=a.replace(/dd|DD/,9<this.getDate()?this.getDate().toString():"0"+this.getDate());a=a.replace(/d|D/g,
this.getDate());a=a.replace(/hh|HH/,9<this.getHours()?this.getHours().toString():"0"+this.getHours());a=a.replace(/h|H/g,this.getHours());a=a.replace(/mm/,9<this.getMinutes()?this.getMinutes().toString():"0"+this.getMinutes());a=a.replace(/m/g,this.getMinutes());a=a.replace(/ss|SS/,9<this.getSeconds()?this.getSeconds().toString():"0"+this.getSeconds());return a=a.replace(/s|S/g,this.getSeconds())};
Date.prototype.DateAdd=function(a,b){switch(a){case "s":return new Date(Date.parse(this)+1E3*b);case "n":return new Date(Date.parse(this)+6E4*b);case "h":return new Date(Date.parse(this)+36E5*b);case "d":return new Date(Date.parse(this)+864E5*b);case "w":return new Date(Date.parse(this)+6048E5*b);case "q":return new Date(this.getFullYear(),this.getMonth()+3*b,this.getDate(),this.getHours(),this.getMinutes(),this.getSeconds());case "m":return new Date(this.getFullYear(),this.getMonth()+b,this.getDate(),
this.getHours(),this.getMinutes(),this.getSeconds());case "y":return new Date(this.getFullYear()+b,this.getMonth(),this.getDate(),this.getHours(),this.getMinutes(),this.getSeconds())}};
Date.prototype.DateDiff=function(a,b){"string"==typeof b&&(b=StringToDate(b));switch(a){case "s":return parseInt((b-this)/1E3);case "n":return parseInt((b-this)/6E4);case "h":return parseInt((b-this)/36E5);case "d":return parseInt((b-this)/864E5);case "w":return parseInt((b-this)/6048E5);case "m":return b.getMonth()+1+12*(b.getFullYear()-this.getFullYear())-(this.getMonth()+1);case "y":return b.getFullYear()-this.getFullYear()}};
Date.prototype.DatePart=function(a){var b="",c="\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(",");switch(a){case "y":b=this.getFullYear();break;case "m":b=this.getMonth()+1;break;case "d":b=this.getDate();break;case "w":b=c[this.getDay()];break;case "ww":b=this.WeekNumOfYear();break;case "h":b=this.getHours();break;case "n":b=this.getMinutes();break;case "s":b=this.getSeconds()}return b};Date.prototype.FirstDayOfDate=function(){var a=this.toArray();return new Date(a[0],a[1],1)};
Date.prototype.LastDayOfDate=function(){return this.FirstDayOfDate().DateAdd("m",1).DateAdd("d",-1)};Date.prototype.MaxDayOfDate=function(){return this.LastDayOfDate().DatePart("d")};Date.prototype.toArray=function(){var a=[];a[0]=this.getFullYear();a[1]=this.getMonth();a[2]=this.getDate();a[3]=this.getHours();a[4]=this.getMinutes();a[5]=this.getSeconds();return a};
function IsValidDate(a){var b=a.replace(/(^\s+|\s+$)/g,"");if(""==b)return!0;if(""==b.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g,"")){if(a=new Date(b.replace(/\-/g,"/")),b=b.split(/[-/:]/),b[0]!=a.getYear()||b[1]!=a.getMonth()+1||b[2]!=a.getDate())return!1}else return!1;return!0}
function CheckDateTime(a){a=a.match(/^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/);if(null==a)return!1;a[2]-=1;var b=new Date(a[1],a[2],a[3],a[4],a[5],a[6]);return b.getFullYear()!=a[1]||b.getMonth()!=a[2]||b.getDate()!=a[3]||b.getHours()!=a[4]||b.getMinutes()!=a[5]||b.getSeconds()!=a[6]?!1:!0}function StringToDate(a){var b=Date.parse(a),b=new Date(b);isNaN(b)&&(a=a.split("-"),b=new Date(a[0],--a[1],a[2]));return b}
function set_date(a,b){var c=new Date,d=c.Format("yyyy-MM-dd"),c=c.DateAdd(a,b).Format("yyyy-MM-dd");$("#txtStartTime").datebox("setValue",c);$("#txtEndTime").datebox("setValue",d)}function get_game_list(a){$.ajax({url:"http://ggfx.syyx.cn/dict_game?r="+Math.random(),type:"get",dataType:"json",data:{IsAll:0},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(b){a(b.rows)}})}
function get_adclass_list(a){$.ajax({url:"http://ggfx.syyx.cn/ad_class_list?r="+Math.random(),type:"get",dataType:"json",data:{},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(b){a(b.rows)}})}
function get_admedia_list(a,b){$.ajax({url:"http://ggfx.syyx.cn/ad_media_list?r="+Math.random(),type:"get",dataType:"json",data:{ClassID:a},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(a){b(a.rows)}})}
function get_adad_list(a,b){$.ajax({url:"http://ggfx.syyx.cn/ad_ad_list?r="+Math.random(),type:"get",dataType:"json",data:{MediaID:a},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(a){b(a.rows)}})}
function get_adwebnumber_list(a,b){$.ajax({url:"http://ggfx.syyx.cn/ad_webnumber_list?r="+Math.random(),type:"get",dataType:"json",data:{ADID:a},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(a){b(a.rows)}})}var def_classid,def_mediaid,def_adid;
$(function(){def_classid=getParameterByName("ClassID");def_mediaid=getParameterByName("MediaID");def_adid=getParameterByName("ADID");def_date=getParameterByName("Date");set_date("d",0);""!=def_date&&($("#txtStartTime").datebox("setValue",def_date),$("#txtEndTime").datebox("setValue",def_date));init_game_list();init_ad_info();$("#ddlClass").change(function(){init_admedia_list(this.value)});$("#ddlMedia").change(function(){init_adad_list(this.value)});$("#ddlAd").change(function(){init_adwebnumber_list(this.value)})});
function init_ad_info(){init_adclass_list();init_admedia_list(def_classid);init_adad_list(def_mediaid);init_adwebnumber_list(def_adid)}function init_game_list(){$("#ddlGame").empty();get_game_list(function(a){$.each(a,function(a,c){$("#ddlGame").append("<option value='"+c.ID+"'>"+c.Title+"</option>")})})}
var init_adclass_list=function(){$("#ddlClass").empty();$("#ddlClass").append("<option value=0>\u6240\u6709</option");get_adclass_list(function(a){$.each(a,function(a,c){$("#ddlClass").append("<option value='"+c.ID+"'>"+c.ClassName+"</option>")});""!=def_classid&&$("#ddlClass").val(def_classid)})},init_admedia_list=function(a){$("#ddlMedia").empty();$("#ddlMedia").append("<option value=0>\u6240\u6709</option");""==a?init_adad_list(0):get_admedia_list(a,function(a){$.each(a,function(a,b){$("#ddlMedia").append("<option value='"+
b.ID+"'>"+b.MediaName+"</option>")});""!=def_mediaid&&$("#ddlMedia").val(def_mediaid)})},init_adad_list=function(a){$("#ddlAd").empty();$("#ddlAd").append("<option value=0>\u6240\u6709</option");""==a?init_adwebnumber_list(0):get_adad_list(a,function(a){$.each(a,function(a,b){$("#ddlAd").append("<option value='"+b.ID+"'>"+b.ADName+"</option>")});""!=def_adid&&$("#ddlAd").val(def_adid)})},init_adwebnumber_list=function(a){$("#ddlAdWebNumber").empty();$("#ddlAdWebNumber").append("<option value='0'>\u6240\u6709</option");
""!=a&&get_adwebnumber_list(a,function(a){$.each(a,function(a,b){$("#ddlAdWebNumber").append("<option value='"+b.ID+"'>"+b.ADWebNumber+"</option>")})})};$(function(){$("#btnSearch").click(function(){get_list()})});
function get_list(){var a=$("#ddlGame").val(),b=$("#txtStartTime").datebox("getValue"),c=$("#txtEndTime").datebox("getValue"),d=$("#ddlClass").val(),e=$("#ddlMedia").val(),f=$("#ddlAd").val(),g=$("#ddlAdWebNumber").val();$.ajax({url:"http://ggfx.syyx.cn/ad_monitor_hour_list?r="+Math.random(),type:"get",dataType:"json",data:{GameID:a,StartTime:b,EndTime:c,ClassID:d,MediaID:e,ADID:f,ADWebNumber:g},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(a){$("#tt tbody").find("tr.newrow").remove();
$.each(a.rows,function(a,b){$("<tr class='newrow'></tr>").append("<td>"+b.SHour+"</td><td>"+b.ShowNumber+"</td><td>"+b.ClickNumber+"</td><td>"+b.ClickIP+"</td><td>"+b.ArriveIP+"</td><td>"+b.IPRate+"%</td><td>"+b.ClickCookies+"</td><td>"+b.ArriveCookies+"</td><td>"+b.CookieRate+"%</td><td>"+b.HomeCookies+"</td><td>"+b.ClientInstall+"</td><td>"+b.RBRegNumber+"</td><td>"+b.RegRate+"%</td>").appendTo($("#tt tbody"))})}})};
