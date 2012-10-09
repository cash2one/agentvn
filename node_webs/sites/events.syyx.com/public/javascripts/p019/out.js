_G_all_input_checks={empty:function(a,b){if(""==a)return b.err_info},length:function(a,b){if(b.options){for(var c in b.options)if(a.length==b.options[c])return;return b.err_info}b.min=b.min||0;b.max=b.max||Math.pow(2,32);if(a.length<b.min||a.length>b.max)return b.err_info},regex:function(a,b){if(!b.value.test(a))return b.err_info},equal:function(a,b){if("server"==b.side){var c=b.req.body[b.value];if(c!=a)return b.err_info}else if("session"==b.side){if(c=b.req.session[b.value],c!=a)return b.err_info}else if($("#"+
b.value).val()!=a)return b.err_info}};_G_check_request_data=function(a,b){for(var c in a.body)if(b[c]){var d=a.body[c],e=b[c].checks,f;for(f in e){var h=e[f].type,g=e[f];g.req=a;var i=_G_all_input_checks[h];if(!i)return g={},g[c]=h,g;g=i(d,g);if(void 0!=g)return g={},g[c]=h,g}}};
var input_config={background_highlight_class:"focus_in_inut",error_tag_class:"input_wrong",status_class:{ok:"check_result_right",error:"check_result_wrong",checking:"check_result_loading"}},captcha_dom,input_local_check_func=_G_all_input_checks;function input_highlight_background(a){a.addClass(input_config.background_highlight_class)}function input_recover_background(a){a.removeClass(input_config.background_highlight_class)}
function input_recover(a,b){if(a.hasClass(input_config.error_tag_class)){a.removeClass(input_config.error_tag_class);a.val("");var c=b.status_div_id;c&&$("#"+c).attr("class","")}}function input_check_ok(a,b){var c=b.status_div_id;c&&$("#"+c).attr("class",input_config.status_class.ok)}
function input_check_error(a,b,c){a.addClass(input_config.error_tag_class);var d=b.status_div_id;d&&$("#"+d).attr("class",input_config.status_class.error);if(b=b.info_div_id)b="#"+b,$(b).is(":hidden")&&(a.hide(),$(b).show()),c&&$(b).val(c)}function input_local_check(a,b){var c=a.val(),d;for(d in b.local_check){var e=b.local_check[d],e=(0,input_local_check_func[e.type])(c,e);if(void 0!==e)return input_check_error(a,b,e),!1}input_check_ok(a,b);return!0}
function input_remote_check(a,b){if(!b.remote_check)return!0;var c=a.val(),d=b.remote_check.url;$("#"+b.status_div_id).attr("class",input_config.status_class.checking);$.ajax({type:"GET",cache:!1,url:d,data:{v:c},dataType:"json",success:function(c){0==c.type?input_check_ok(a,b):input_check_error(a,b,b.remote_check[c.type+""])}})}function input_show_pic(a,b){get_captcha(captcha_dom);$("#"+b.pic_img.id).show()}
function input_pic_setting(a,b){var c="#"+b.input_id,d="#"+b.pic_img.id;$(c).keyup(function(){4<=$(c).val().length&&input_local_check(a,b)&&input_remote_check(a,b)});$(d).click(function(){var a="#"+b.status_div_id;$(d).attr("src",b.pic_img.src+"?r="+Math.random());$(a).attr("class",input_config.status_class.error)})}function input_info_cover_input_setting(a,b){var c=b.info_div_id;c&&$("#"+c).focus(function(){a.is(":hidden")&&($(this).hide(),a.show(),a.focus())})}
function input_setting(a){var b=$("#"+a.input_id);b.val("");b.focus(function(){get_captcha(captcha_dom);a.pic_img&&input_show_pic(b,a);input_highlight_background(b);input_recover(b,a)});b.blur(function(){input_recover_background(b);a.pic_img||input_local_check(b,a)&&input_remote_check(b,a)});a.pic_img&&input_pic_setting(b,a);a.info_cover_input&&input_info_cover_input_setting(b,a)}function input_setting_inputs(a){for(var b in a)a[b].pic_img&&(captcha_dom=a[b]);for(var c in a)input_setting(a[c])}
function input_get_inputs_value(a){var b=!1,c;for(c in a){var d=a[c],e=d.name,d=$("#"+d.input_id).val(),b=b||{};b[e]=d}return b}function input_local_check_inputs(a){var b=!0,c;for(c in a){var d=a[c];input_local_check($("#"+d.input_id),d)||(b=!1)}return b}function input_status_check(a){var b=!0,c;for(c in a)if(!1==check_unit_status(a[c])){b=!1;break}return b}function get_captcha(a){var b="#"+a.pic_img.id;$(b).attr("src")||$(b).attr("src",a.pic_img.src+"?r="+Math.random())}
function check_unit_status(a){var b="#"+a.status_div_id;if($(b).hasClass(input_config.status_class.ok))return!0;if(!a.pic_img||4!=$("#"+a.input_id).val().length)return!1;a=$(b).hasClass(input_config.status_class.error);b=$(b).hasClass(input_config.status_class.checking);return a||b?!1:!0}var pathname=document.location.pathname.toLowerCase(),pagename=pathname.substring(pathname.lastIndexOf("/")+1).replace(".html","");/nycs360/.test(pathname)&&(pagename="index_360");
var stat_id={index:3224992,index31:3171333,index32:3190993,index34:3257232,index35:3243019,index40:3208005,index5:2625354,index_173:4097942,index_dw:4200748,index_bd:4005964,index_bd_1:4005964,index_bd_2:4005964,index_bd_3:4005964,index_bd_4:4005964,index_bd_5:4005964,index_bd_6:4005964,index_bd_7:4005964,index_bd_8:4005964,index_bd_9:4005964,index_bd_10:4433832,index_bd_11:4433832,index_bd_12:4005964,index_bd_13:4005964,index_bd_14:4005964,index_bd_15:4005964,index_bd_16:4005964,index_bd_17:4005964,
index_bd_18:4005964,index_bd_19:4005964,index_bd_20:4005964,index_i8:3771802,index_i8_embed:3519134,index_sg:3742414,index_sw:3915789,index_sw_embed:4304121,index_yy:3915783,index_xs:4246749,index_360:3396138};if(stat_id[pagename]){var script=document.createElement("script");script.src="http://s21.cnzz.com/stat.php?id="+stat_id[pagename]+"&amp;web_id="+stat_id[pagename];script.type="text/javascript";var stat=document.getElementById("stat");stat.appendChild(script)}"index_xs"==pagename&&$("#stat").append('<object name="x" id="x" classid="clsid:EDB8FAC0-ED79-4B27-AE51-FB19D8348087"></object>');
if("index_sg"==pagename){var _sogou_sa_q=_sogou_sa_q||[];_sogou_sa_q.push(["_sid","8358-8641"]);(function(){document.write(unescape("%3Cscript src='"+(("https:"==document.location.protocol?"https://":"http://")+"hermes.sogou.com/sa.js%3Fsid%3D8358-8641")+"' type='text/javascript'%3E%3C/script%3E"))})()}
function rungame(){if("index_i8"==pagename||"index_i8_embed"==pagename)window.open("i8desk://gid=40863");else if("index_sw"==pagename||"index_sw_embed"==pagename)window.open("barclientview://-Package 13420/");else if("index_yy"==pagename)window.open("gamerun://127.0.0.1/game/run.php?game=917B50C4702CFFA3");else if("index_xs"==pagename){var a=document.getElementById("x");a.IsCanRunGame?a.RunGame("102849"):alert("\u672c\u673a\u6ca1\u6709\u5b89\u88c5\u8fc5\u95ea\u5ba2\u6237\u7aef\uff0c\u4e0d\u652f\u6301\u4ece\u7f51\u9875\u542f\u52a8\u6e38\u620f");
!0}}var platform="node";if("node"==platform)var url_account_check="/account_check",url_check_idcard="/check_idcard",url_captcha="/captcha",url_check_captcha="/check_captcha",url_register_account="/register_account",url_get_card="/get_card";else url_account_check="/ajax/account_check.aspx",url_check_idcard="/ajax/check_idcard.aspx",url_captcha="/ajax/captcha.aspx",url_check_captcha="/ajax/check_captcha.aspx",url_register_account="/ajax/register_account.aspx",url_get_card="/ajax/get_card.aspx";$("document").ready(function(){$(".reg_form input").val("")});
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
$("#txtConfirm").val("");$("#txtValidate").val("");$("#regProcessTip").attr("class","");alert(a)}};account_register_setting();function getflash(a,b,c,d){$(d).html('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+b+'" height="'+c+'" ><param name="movie" value="'+a+'" /><\!--[if !IE]>--\><object type="application/x-shockwave-flash" data="'+a+'" width="'+b+'" height="'+c+'"><\!--<![endif]--\><param name="wmode" value="transparent" /><\!--[if !IE]>--\></object><\!--<![endif]--\></object>')}
function getjwplayer(a,b,c,d,e){e||(e="over");a='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" hidefocus="true" id="mediaplayer" width="'+b+'" height="'+c+'" bgcolor="#000000" name="mediaplayer" tabindex="0"><param name="movie" value="http://v.nycs.syyx.com/jwplayer/player.swf"><\!--[if !IE]>--\><object type="application/x-shockwave-flash" hidefocus="true" data="http://v.nycs.syyx.com/jwplayer/player.swf" width="'+b+'" height="'+c+'"><\!--<![endif]--\><param name="allowfullscreen" value="true"><param name="seamlesstabbing" value="true"><param name="wmode" value="transparent" /><param name="flashvars" value="netstreambasepath='+
document.location.href+"&id=mediaplayer&file="+a+"&controlbar.position="+e+'&volume=41&autostart=true&repeat=SINGLE"><\!--[if !IE]>--\></object><\!--<![endif]--\></object>';$(d).html(a)}getflash("http://r.syyx.com/events/p019/prize.swf",284,55,"#prize");getjwplayer("http://v.nycs.syyx.com/nycs/flv/zhiyezonghe_640x360_20120809.flv",425,238,"#flash");
function job_focus(){for(var a=0,b=4;b--;)$("#j_tab span").eq(b).mouseover(function(b){return function(){$("#j_tab span").eq(a).removeClass("check_"+a);$(this).addClass("check_"+b);$("#job .con").eq(a).stop().attr("style","display:none");$("#j_swf span").eq(a).css("visibility","hidden");$("#job .con").eq(b).fadeIn("fast");$("#j_swf span").eq(b).css("visibility","visible");a=b}}(b))}job_focus();try{document.execCommand("BackgroundImageCache",!1,!0)}catch(e$$8){}
!function(){for(var a="\u9ad8\u6548\u6740\u4f24\uff1aBUFF\u6280\u80fd\uff0c\u589e\u52a0\u81ea\u8eab\u4ee5\u53ca\u4e00\u5b9a\u8303\u56f4\u5185\u961f\u53cb\u7684\u653b\u51fb\u4f24\u5bb3\u3002,\u7cbe\u786e\u6253\u51fb\uff1a\u82b1\u4e00\u5b9a\u65f6\u95f4\u7784\u51c6\uff0c\u5bf9\u76ee\u6807\u9020\u6210\u975e\u5e38\u5927\u7684\u4f24\u5bb3\uff0c\u5c04\u7a0b\u6781\u8fdc\u3002,\u8fde\u5c04\uff1a\u67aa\u68b0\u5e08\u4e2d\u7ea7\u653b\u51fb\u6280\u80fd\uff0c10%\u51e0\u7387\u89e6\u53d1\u56db\u8fde\u51fb\u3002,\u626b\u5c04\uff1a\u67aa\u68b0\u5e08\u4e2d\u7ea7\u6280\u80fd\uff0c\u5bf9\u76ee\u6807\u53ca\u76ee\u6807\u5468\u56f4\u7684\u654c\u4eba\u9020\u6210\u4f24\u5bb3\u3002,\u6bd2\u96fe\u9677\u9631\uff1a\u653e\u7f6e\u4e00\u4e2a\u9677\u9631\uff0c\u88ab\u654c\u65b9\u89e6\u53d1\u540e\uff0c\u5728\u9677\u9631\u533a\u57df\u5185\u7684\u654c\u5bf9\u76ee\u6807\u5c06\u83b7\u5f97\u51cf\u901f\u53ca\u53d7\u5230\u4f24\u5bb3\u52a0\u6df1\u7684\u6548\u679c,\u9690\u8eab\uff1a\u8fdb\u5165\u9690\u8eab\u72b6\u6001\u4e00\u6bb5\u65f6\u95f4\uff0c\u9690\u8eab\u671f\u95f4\u79fb\u52a8\u901f\u5ea6\u52a0\u5feb\u3002,\u4e13\u6ce8\u5c04\u51fb\uff1aBUFF\u6280\u80fd\uff0c\u63d0\u9ad8\u81ea\u8eab\u7684\u547d\u4e2d\u4e0e\u5ffd\u95ea\uff0c\u51cf\u5c11\u81ea\u8eab\u7684\u95ea\u907f\u3002".split(","),b=
"\u4e71\u96f7\u7a7f\u7a7a\uff1a\u5bf9\u81ea\u8eab\u4e00\u5b9a\u8303\u56f4\u5185\u7684\u53ef\u653b\u51fb\u76ee\u6807\u9020\u6210\u7fa4\u4f53\u4f24\u5bb3\u3002,\u6f2b\u5929\u60ca\u96f7\uff1a\u5f02\u80fd\u8005\u96f7\u7535\u6280\u80fd\uff0c\u5bf9\u76ee\u6807\u53ca\u76ee\u6807\u5468\u56f4\u7684\u654c\u4eba\u9020\u6210\u4f24\u5bb3\u3002,\u95ea\u7535\u8bf1\u7206\uff1a\u63d0\u9ad8\u653b\u51fb\u66b4\u51fb\u51e0\u7387\u3002,\u80fd\u91cf\u62a4\u76fe\uff1a\u83b7\u5f97\u6280\u80fd\u6548\u679c\u540e\uff0c\u7528\u7cbe\u795e\u503c\u62b5\u6d88\u90e8\u5206\u7684\u6240\u53d7\u4f24\u5bb3\u3002,\u6012\u96f7\u95ea\uff1a\u5f02\u80fd\u8005\u9ad8\u7ea7\u653b\u51fb\u6280\u80fd\uff0c\u4e00\u5b9a\u51e0\u7387\u5bf9\u653b\u51fb\u76ee\u6807\u5468\u56f4\u7684\u654c\u5bf9\u76ee\u6807\u8fdb\u884c\u989d\u5916\u653b\u51fb\u3002,\u77ac\u95f4\u79fb\u52a8\uff1a\u77ac\u95f4\u79fb\u52a8\u5230\u6307\u5b9a\u5730\u70b9\uff0c\u4ee5\u8ffd\u51fb\u6216\u8eb2\u907f\u3002,\u5929\u96f7\u9668\uff1a\u4f7f\u7528\u6012\u96f7\u95ea\u65f6\u6709\u4e00\u5b9a\u51e0\u7387\u53ec\u5524\u4e00\u4e2a\u4ece\u5929\u800c\u964d\u7684\u5de8\u5927\u9668\u77f3\u5bf9\u76ee\u6807\u9020\u6210\u4f24\u5bb3\uff0c\u5e76\u5728\u76ee\u6807\u5f53\u524d\u4f4d\u7f6e\u5f62\u6210\u6301\u7eed\u6389\u8840\u7684\u707c\u70e7\u533a\u57df\u3002".split(","),
c="\u5251\u672f\u7cbe\u901a\uff1a\u63d0\u9ad8\u5251\u6b66\u58eb\u7269\u7406\u653b\u51fb\u3002,\u7834\u7532\uff1a\u653b\u51fb\u51fa\u73b0\u8fde\u65a9\u65f6\uff0c\u964d\u4f4e\u76ee\u6807\u9632\u5fa1\u4e00\u5b9a\u65f6\u95f4\u3002,\u711a\u5fc3\u65a9\uff1a\u6d88\u8017\u4e00\u5b9a\u751f\u547d\u503c\u4e0e\u7cbe\u795e\u503c\u5bf9\u76ee\u6807\u9020\u6210\u5de8\u5927\u4f24\u5bb3\u3002,\u5251\u6b66\u6218\u610f\uff1a\u5168\u9762\u63d0\u5347\u5251\u6b66\u58eb\u5c5e\u6027\u3002,\u63a0\u5f71\uff1a\u51b2\u5411\u76ee\u6807\u5e76\u5bf9\u76ee\u6807\u9020\u6210\u4e00\u5b9a\u4f24\u5bb3\u3002,\u55dc\u8840\uff1a\u4f7f\u7528\u6781\u5149\u5203\u5f71\u65f6\u6709\u4e00\u5b9a\u51e0\u7387\u5c06\u9020\u6210\u7684\u4f24\u5bb3\u6309\u6bd4\u4f8b\u57282\u79d2\u5185\u8f6c\u5316\u4e3a\u81ea\u5df1\u7684\u751f\u547d\u503c\u3002,\u6b7b\u91cc\u9003\u751f\uff1a\u5f53\u5251\u6b66\u58eb\u53d7\u5230\u5c06\u4f1a\u5bfc\u81f4\u6b7b\u4ea1\u7684\u4f24\u5bb3\u65f6\uff0c\u5c06\u6709\u4e00\u5b9a\u51e0\u7387\u89e6\u53d1\u6b64\u6280\u80fd\u6765\u5ffd\u7565\u6b64\u4f24\u5bb3\uff0c\u89e6\u53d1\u95f4\u969430\u79d2\u3002".split(","),
d="\u98ce\u5203\u4e71\u821e\uff1a\u683c\u6597\u5bb6\u7fa4\u4f53\u6280\u80fd\uff0c\u653b\u51fb\u81ea\u8eab\u5468\u56f4\u76ee\u6807\u3002,\u590d\u4ec7\u9b42\u7206\uff1a\u4f7f\u7528\u6280\u80fd\u540e\uff0c\u6301\u7eed\u65f6\u95f4\u7ed3\u675f\u9020\u6210\u8303\u56f4\u4f24\u5bb3\u3002\u6301\u7eed\u65f6\u95f4\u5185\u53d7\u5230\u7684\u4f24\u5bb3\u5982\u679c\u8d85\u8fc7\u4e00\u5b9a\u503c\uff0c\u683c\u6597\u5bb6\u4f1a\u6309\u4e00\u5b9a\u6bd4\u4f8b\u5bf9\u9644\u8fd1\u76ee\u6807\u9020\u6210\u5de8\u5927\u7684\u53cd\u5f39\u4f24\u5bb3\u3002,\u51cf\u901f\uff1a\u4e00\u6bb5\u65f6\u95f4\u5185\u51cf\u5c11\u5bf9\u65b9\u79fb\u52a8\u901f\u5ea6\u3002,\u6012\u610f\u5f3a\u88ad\uff1a\u683c\u6597\u5bb6\u4e2d\u7ea7\u653b\u51fb\u6280\u80fd\uff0c\u51e0\u7387\u89e6\u53d1\u653b\u51fb\u52a0\u901f\u3002,\u7834\u654c\uff1a\u653b\u51fb\u52a0\u901f\u88ab\u89e6\u53d1\u65f6\uff0c\u589e\u52a0\u66b4\u51fb\u503c\u3002,\u5632\u8bbd\uff1a\u5492\u9a82\u76ee\u6807\u53ca\u76ee\u6807\u5468\u8fb9\u5355\u4f4d\uff0c\u5f3a\u884c\u8ba9\u76ee\u6807\u653b\u51fb\u81ea\u5df1\u3002,\u7075\u9b42\u94fe\u63a5\uff1aBUFF\u6280\u80fd\uff0c\u683c\u6597\u5bb6\u53ef\u4ee5\u5206\u62c5\u76ee\u6807\u5355\u4f4d\u7684\u4f24\u5bb3\uff0c\u81ea\u8eab\u751f\u547d\u503c\u4f4e\u4e8e30%\u65f6\uff0c\u65ad\u5f00\u9501\u94fe\u3002".split(","),
e=ynz=gdj=jws="",f=0;7>f;f++)e+='<em title="'+a[f]+'"></em>',ynz+='<em title="'+b[f]+'"></em>',gdj+='<em title="'+d[f]+'"></em>',jws+='<em title="'+c[f]+'"></em>';$(".qxs .skill").html(e);$(".jws .skill").html(jws);$(".gdj .skill").html(gdj);$(".ynz .skill").html(ynz);getflash("http://r.syyx.com/events/p019/qxs.swf",188,105,"#j_swf .qxs");getflash("http://r.syyx.com/events/p019/ynz.swf",188,105,"#j_swf .ynz");getflash("http://r.syyx.com/events/p019/jws.swf",188,105,"#j_swf .jws");getflash("http://r.syyx.com/events/p019/gdj.swf",
188,105,"#j_swf .gdj")}();function sc(){var a=$("body").scrollTop()||$("html").scrollTop();$(".reg_box").css("top",a+80+"px")}$(window).scroll(sc);function to_reg(){$("#reg2").css("display","block");$("#reg1").css("display","none");$("#txtUserAccount").select()}$("#reg1").click(to_reg);$("#reg_1").click(to_reg);$("#reg_2").click(to_reg);$("#close").click(function(){$("#reg1").css("display","block");$("#reg2").css("display","none")});$("a").attr("hidefocus","true");
if(!0==$.browser.webkit){var container=function(){$(".container").css("width","");var a=$(".container")[0].offsetWidth;setTimeout(function(){1==a%2&&$(".container").css("width",a-1)},10)};container();$(window).resize(container)};
