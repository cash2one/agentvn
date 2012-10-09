_G_all_input_checks={empty:function(a,b){if(""==a)return b.err_info},length:function(a,b){if(b.options){for(var c in b.options)if(a.length==b.options[c])return;return b.err_info}b.min=b.min||0;b.max=b.max||Math.pow(2,32);if(a.length<b.min||a.length>b.max)return b.err_info},regex:function(a,b){if(!b.value.test(a))return b.err_info},equal:function(a,b){if("server"==b.side){var c=b.req.body[b.value];if(c!=a)return b.err_info}else if("session"==b.side){if(c=b.req.session[b.value],c!=a)return b.err_info}else if($("#"+
b.value).val()!=a)return b.err_info}};_G_check_request_data=function(a,b){for(var c in a.body)if(b[c]){var d=a.body[c],e=b[c].checks,g;for(g in e){var h=e[g].type,f=e[g];f.req=a;var i=_G_all_input_checks[h];if(!i)return f={},f[c]=h,f;f=i(d,f);if(void 0!=f)return f={},f[c]=h,f}}};
var input_config={background_highlight_class:"focus_in_inut",error_tag_class:"input_wrong",status_class:{ok:"check_result_right",error:"check_result_wrong",checking:"check_result_loading"}},captcha_dom,input_local_check_func=_G_all_input_checks;function input_highlight_background(a){a.addClass(input_config.background_highlight_class)}function input_recover_background(a){a.removeClass(input_config.background_highlight_class)}
function input_recover(a,b){if(a.hasClass(input_config.error_tag_class)){a.removeClass(input_config.error_tag_class);a.val("");var c=b.status_div_id;c&&$("#"+c).attr("class","")}}function input_check_ok(a,b){var c=b.status_div_id;c&&$("#"+c).attr("class",input_config.status_class.ok)}
function input_check_error(a,b,c){a.addClass(input_config.error_tag_class);var d=b.status_div_id;d&&$("#"+d).attr("class",input_config.status_class.error);if(b=b.info_div_id)b="#"+b,$(b).is(":hidden")&&(a.hide(),$(b).show()),c&&$(b).val(c)}function input_local_check(a,b){var c=a.val(),d;for(d in b.local_check){var e=b.local_check[d],e=(0,input_local_check_func[e.type])(c,e);if(void 0!==e)return input_check_error(a,b,e),!1}input_check_ok(a,b);return!0}
function input_remote_check(a,b){if(!b.remote_check)return!0;var c=a.val(),d=b.remote_check.url;$("#"+b.status_div_id).attr("class",input_config.status_class.checking);$.ajax({type:"GET",cache:!1,url:d,data:{v:c},dataType:"json",success:function(c){0==c.type?input_check_ok(a,b):input_check_error(a,b,b.remote_check[c.type+""])}})}function input_show_pic(a,b){get_captcha(captcha_dom);$("#"+b.pic_img.id).show()}
function input_pic_setting(a,b){var c="#"+b.input_id,d="#"+b.pic_img.id;$(c).keyup(function(){4<=$(c).val().length&&input_local_check(a,b)&&input_remote_check(a,b)});$(d).click(function(){var a="#"+b.status_div_id;$(d).attr("src",b.pic_img.src+"?r="+Math.random());$(a).attr("class",input_config.status_class.error)})}function input_info_cover_input_setting(a,b){var c=b.info_div_id;c&&$("#"+c).focus(function(){a.is(":hidden")&&($(this).hide(),a.show(),a.focus())})}
function input_setting(a){var b=$("#"+a.input_id);b.val("");b.focus(function(){get_captcha(captcha_dom);a.pic_img&&input_show_pic(b,a);input_highlight_background(b);input_recover(b,a)});b.blur(function(){input_recover_background(b);a.pic_img||input_local_check(b,a)&&input_remote_check(b,a)});a.pic_img&&input_pic_setting(b,a);a.info_cover_input&&input_info_cover_input_setting(b,a)}function input_setting_inputs(a){for(var b in a)a[b].pic_img&&(captcha_dom=a[b]);for(var c in a)input_setting(a[c])}
function input_get_inputs_value(a){var b=!1,c;for(c in a){var d=a[c],e=d.name,d=$("#"+d.input_id).val(),b=b||{};b[e]=d}return b}function input_local_check_inputs(a){var b=!0,c;for(c in a){var d=a[c];input_local_check($("#"+d.input_id),d)||(b=!1)}return b}function input_status_check(a){var b=!0,c;for(c in a)if(!1==check_unit_status(a[c])){b=!1;break}return b}function get_captcha(a){var b="#"+a.pic_img.id;$(b).attr("src")||$(b).attr("src",a.pic_img.src+"?r="+Math.random())}
function check_unit_status(a){var b="#"+a.status_div_id;if($(b).hasClass(input_config.status_class.ok))return!0;if(!a.pic_img||4!=$("#"+a.input_id).val().length)return!1;a=$(b).hasClass(input_config.status_class.error);b=$(b).hasClass(input_config.status_class.checking);return a||b?!1:!0}var pathname=document.location.pathname.toLowerCase(),pagename=pathname.substring(pathname.lastIndexOf("/")+1).replace(".html","");/nycs360/.test(pathname)&&(pagename="index_360");
var stat_id={index:3224992,index31:3171333,index32:3190993,index34:3257232,index35:3243019,index40:3208005,index5:2625354,index_173:4097942,index_dw:4200748,index_xq:4535836,index_zfgc:2001608,index_i8:3771802,index_i8_embed:3519134,index_sg:3742414,index_sw:3915789,index_sw_embed:4304121,index_yy:3915783,index_xs:4246749,index_360:3396138};
if(stat_id[pagename]){var script=document.createElement("script");script.src="http://s21.cnzz.com/stat.php?id="+stat_id[pagename]+"&amp;web_id="+stat_id[pagename];script.type="text/javascript";var stat=document.getElementById("stat");stat.appendChild(script)}"index_xs"==pagename&&$("#stat").append('<object name="x" id="x" classid="clsid:EDB8FAC0-ED79-4B27-AE51-FB19D8348087"></object>');
if("index_sg"==pagename){var _sogou_sa_q=_sogou_sa_q||[];_sogou_sa_q.push(["_sid","8358-8641"]);(function(){document.write(unescape("%3Cscript src='"+(("https:"==document.location.protocol?"https://":"http://")+"hermes.sogou.com/sa.js%3Fsid%3D8358-8641")+"' type='text/javascript'%3E%3C/script%3E"))})()}
if(/index_bd/.test(pagename)){var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-27991465-1"]);_gaq.push(["_trackPageview"]);(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})()}
if("index_bd_wm"==pagename){var _bdhmProtocol="https:"==document.location.protocol?" https://":" http://";document.write(unescape("%3Cscript src='"+_bdhmProtocol+"hm.baidu.com/h.js%3Fe8d1b8ee3e36c619631565174aec8aa0' type='text/javascript'%3E%3C/script%3E"))}
function rungame(){if("index_i8"==pagename||"index_i8_embed"==pagename)window.open("i8desk://gid=40863"),$("#card_type").html("VIP\u7f51\u5427\u793c\u5305");else if("index_sw"==pagename||"index_sw_embed"==pagename)window.open("barclientview://-Package 13420/"),$("#card_type").html("VIP\u7f51\u5427\u793c\u5305");else if("index_yy"==pagename)window.open("gamerun://127.0.0.1/game/run.php?game=917B50C4702CFFA3");else if("index_xs"==pagename){$("#card_type").html("VIP\u7f51\u5427\u793c\u5305");var a=document.getElementById("x");
a.IsCanRunGame?a.RunGame("102849"):alert("\u672c\u673a\u6ca1\u6709\u5b89\u88c5\u8fc5\u95ea\u5ba2\u6237\u7aef\uff0c\u4e0d\u652f\u6301\u4ece\u7f51\u9875\u542f\u52a8\u6e38\u620f");!0}}var platform="node";
if("node"==platform)var url_account_check="/account_check",url_check_idcard="/check_idcard",url_captcha="/captcha",url_check_captcha="/check_captcha",url_register_account="/register_account",url_get_card="/get_card";else url_account_check="/ajax/account_check.aspx",url_check_idcard="/ajax/check_idcard.aspx",url_captcha="/ajax/captcha.aspx",url_check_captcha="/ajax/check_captcha.aspx",url_register_account="/ajax/register_account.aspx",url_get_card="/ajax/get_card.aspx";$("document").ready(function(){$(".reg_form input").val("")});
$(".reg_form input").focus(function(){$("#validateimg").show()});
var account_register_input_data=[{name:"account_name",input_id:"txtUserAccount",info_div_id:"txtUserAccount",status_div_id:"txtUserAccountTip",local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u8d26\u53f7"},{type:"length",min:6,max:16,err_info:"\u8d26\u53f7\u957f\u5ea6\u5fc5\u987b6-16\u4f4d"},{type:"regex",value:/^[A-Za-z0-9_]{6,16}$/,err_info:"\u53ea\u80fd\u4e3a\u5b57\u6bcd,\u6570\u5b57,\u4e0b\u5212\u7ebf"}],remote_check:{url:url_account_check,1:"\u8be5\u8d26\u53f7\u5df2\u7ecf\u5b58\u5728",
2:"\u7cfb\u7edf\u9519\u8bef"}},{name:"password",input_id:"txtPasswords",info_div_id:"txtPasswordsVal",status_div_id:"txtPasswordsTip",info_cover_input:!0,local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u5bc6\u7801"},{type:"length",min:6,max:16,err_info:"\u5bc6\u7801\u7684\u957f\u5ea6\u4e3a6-16\u4e2a\u5b57\u7b26"},{type:"regex",value:/^[^\s]{6,16}$/,err_info:"\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u80fd\u5305\u542b\u7a7a\u683c"}]},{name:"confirm_password",input_id:"txtConfirm",info_div_id:"txtConfirmVal",
status_div_id:"txtConfirmTip",info_cover_input:!0,local_check:[{type:"empty",err_info:"\u8bf7\u518d\u8f93\u5165\u4e00\u904d\u5bc6\u7801"},{type:"equal",value:"txtPasswords",err_info:"\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4"}]},{name:"id_card",input_id:"txtCardID",info_div_id:"txtCardID",status_div_id:"txtCardIDTip",local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u60a8\u7684\u8eab\u4efd\u8bc1\u4fe1\u606f"},{type:"length",options:[15,18],err_info:"\u8eab\u4efd\u8bc1\u5e94\u4e3a15\u4f4d\u621618\u4f4d"}],
remote_check:{url:url_check_idcard,1:"\u65e0\u6548\u7684\u8eab\u4efd\u8bc1\u53f7\u7801"}},{name:"true_name",input_id:"txtTrueName",info_div_id:"txtTrueName",status_div_id:"txtTrueNameTip",local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u60a8\u7684\u59d3\u540d"},{type:"length",min:2,max:10,err_info:"\u59d3\u540d\u5fc5\u987b2-10\u4e2a\u6c49\u5b57"},{type:"regex",value:/^[\u4e00-\u9fa5]{2,6}$/,err_info:"\u59d3\u540d\u5fc5\u987b\u662f\u6c49\u5b57"}]},{name:"validate_pic",input_id:"txtValidate",
status_div_id:"txtValidateVal",pic_img:{id:"validateimg",src:url_captcha},local_check:[{type:"length",min:4,max:4,err_info:!1}],remote_check:{url:url_check_captcha,1:""}}];function account_register_setting(){input_setting_inputs(account_register_input_data);$("#reg_button").click(function(a){account_register_request();a.preventDefault()});$("table.reg_form").keypress(function(a){13==a.which&&account_register_request()})}
function account_register_request(){var a=input_status_check(account_register_input_data);if(a&&check_license_agreement()&&(a=input_get_inputs_value(account_register_input_data))){set_reg_progress();var b=pagename;/index_bd_/.test(pathname)&&(b="index_bd");a.page_name=b;a.r=Math.random();"iis"==platform?$.post(url_register_account,a,function(a){clear_reg_progress();(reg_result_func[a.type]||reg_result_func.default_)(a.info)},"json"):$.post(url_register_account,a,function(a){clear_reg_progress();(reg_result_func[a.type]||
reg_result_func.default_)(a.info)})}}function check_license_agreement(){return!$("#chk_XieYi").attr("checked")?(alert("\u8bf7\u9605\u8bfb\u5e76\u540c\u610f\u6ce8\u518c\u534f\u8bae\uff01"),!1):!0}function set_reg_progress(){$("#regProcessTip").attr("class","check_result_loading")}function clear_reg_progress(){$("#regProcessTip").attr("class","")}
var reg_result_func={ok:function(a){$("#reg_account").val(a[0]);$("#active_code").val(a[1]);$(".reg").hide();$("#reg_step2").show();$("#active_link").click(function(){var a=$("#reg_account").val(),c=$("#active_code").val();""==a||""==c?alert("\u8bf7\u8f93\u5165\u5e10\u53f7\u6216\u8005\u6fc0\u6d3b\u7801"):$.post("/activate_card",{account:$("#reg_account").val(),card:$("#active_code").val()},function(a){$("#reg_step2").hide();switch(a){case "0":$("#reg_step4").show();break;case "1":$("#active_tip").html("\u5bf9\u4e0d\u8d77\uff0c\u5e10\u53f7\u9519\u8bef");
$("#reg_step5").show();break;case "-2":$("#active_tip").html("\u5bf9\u4e0d\u8d77\uff0c\u65b0\u624b\u5361\u9519\u8bef");$("#reg_step5").show();break;default:$("#active_tip").html("\u5bf9\u4e0d\u8d77\uff0c\u670d\u52a1\u5668\u5f02\u5e38"),$("#reg_step5").show()}$("#back").click(function(){$("#reg_step2").show();$("#reg_step5").hide()})},"html");return!1})},no_card:function(a){$(".reg").hide();$("#reg_step3").show();$("#reg_account3").html(a[0])},failed:function(a){alert(a)},default_:function(a){$("#txtPasswords").val("");
$("#txtConfirm").val("");$("#txtValidate").val("");$("#regProcessTip").attr("class","");alert(a)}};account_register_setting();$("a").attr("hidefocus","true");function getflash(a,b,c,d){$(d).html('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+b+'" height="'+c+'" ><param name="movie" value="'+a+'" /><\!--[if !IE]>--\><object type="application/x-shockwave-flash" data="'+a+'" width="'+b+'" height="'+c+'"><\!--<![endif]--\><param name="wmode" value="transparent" /><\!--[if !IE]>--\></object><\!--<![endif]--\></object>')}getflash("http://r.syyx.com/events/p025/banner.swf",970,371,"#banner");
getflash("http://r.syyx.com/events/p025/time.swf",953,221,"#time");function toreg(){$("#reg_box").css("display","block");$("#reg_but").css("display","none");$("#reg_scroll").css("width",266);$("#reg_scroll").css("height",383)}$("#reg_but").click(toreg);$("#reg_1").click(toreg);$("#reg_2").click(toreg);$("#close").click(function(){$("#reg_box").css("display","none");$("#reg_but").css("display","block");$("#reg_scroll").css("width","");$("#reg_scroll").css("height","")});
function sc(){var a=$("body").scrollTop()||$("html").scrollTop();$("#reg_scroll").css("top",a+100)}$(window).scroll(sc);$("#scroll").click(function(){$("html").animate({scrollTop:700},"normal");$("body").animate({scrollTop:700},"normal")});
