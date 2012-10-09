_G_all_input_checks={empty:function(b,a){if(""==b)return a.err_info},length:function(b,a){if(a.options){for(var c in a.options)if(b.length==a.options[c])return;return a.err_info}a.min=a.min||0;a.max=a.max||Math.pow(2,32);if(b.length<a.min||b.length>a.max)return a.err_info},regex:function(b,a){if(!a.value.test(b))return a.err_info},equal:function(b,a){if("server"==a.side){var c=a.req.body[a.value];if(c!=b)return a.err_info}else if("session"==a.side){if(c=a.req.session[a.value],c!=b)return a.err_info}else if($("#"+
a.value).val()!=b)return a.err_info}};_G_check_request_data=function(b,a){for(var c in b.body)if(a[c]){var d=b.body[c],e=a[c].checks,g;for(g in e){var h=e[g].type,f=e[g];f.req=b;var i=_G_all_input_checks[h];if(!i)return f={},f[c]=h,f;f=i(d,f);if(void 0!=f)return f={},f[c]=h,f}}};
var input_config={background_highlight_class:"focus_in_inut",error_tag_class:"input_wrong",status_class:{ok:"check_result_right",error:"check_result_wrong",checking:"check_result_loading"}},captcha_dom,input_local_check_func=_G_all_input_checks;function input_highlight_background(b){b.addClass(input_config.background_highlight_class)}function input_recover_background(b){b.removeClass(input_config.background_highlight_class)}
function input_recover(b,a){if(b.hasClass(input_config.error_tag_class)){b.removeClass(input_config.error_tag_class);b.val("");var c=a.status_div_id;c&&$("#"+c).attr("class","")}}function input_check_ok(b,a){var c=a.status_div_id;c&&$("#"+c).attr("class",input_config.status_class.ok)}
function input_check_error(b,a,c){b.addClass(input_config.error_tag_class);var d=a.status_div_id;d&&$("#"+d).attr("class",input_config.status_class.error);if(a=a.info_div_id)a="#"+a,$(a).is(":hidden")&&(b.hide(),$(a).show()),c&&$(a).val(c)}function input_local_check(b,a){var c=b.val(),d;for(d in a.local_check){var e=a.local_check[d],e=(0,input_local_check_func[e.type])(c,e);if(void 0!==e)return input_check_error(b,a,e),!1}input_check_ok(b,a);return!0}
function input_remote_check(b,a){if(!a.remote_check)return!0;var c=b.val(),d=a.remote_check.url;$("#"+a.status_div_id).attr("class",input_config.status_class.checking);$.ajax({type:"GET",cache:!1,url:d,data:{v:c},dataType:"json",success:function(c){0==c.type?input_check_ok(b,a):input_check_error(b,a,a.remote_check[c.type+""])}})}function input_show_pic(b,a){get_captcha(captcha_dom);$("#"+a.pic_img.id).show()}
function input_pic_setting(b,a){var c="#"+a.input_id,d="#"+a.pic_img.id;$(c).keyup(function(){4<=$(c).val().length&&input_local_check(b,a)&&input_remote_check(b,a)});$(d).click(function(){var b="#"+a.status_div_id;$(d).attr("src",a.pic_img.src+"?r="+Math.random());$(b).attr("class",input_config.status_class.error)})}function input_info_cover_input_setting(b,a){var c=a.info_div_id;c&&$("#"+c).focus(function(){b.is(":hidden")&&($(this).hide(),b.show(),b.focus())})}
function input_setting(b){var a=$("#"+b.input_id);a.val("");a.focus(function(){get_captcha(captcha_dom);b.pic_img&&input_show_pic(a,b);input_highlight_background(a);input_recover(a,b)});a.blur(function(){input_recover_background(a);b.pic_img||input_local_check(a,b)&&input_remote_check(a,b)});b.pic_img&&input_pic_setting(a,b);b.info_cover_input&&input_info_cover_input_setting(a,b)}function input_setting_inputs(b){for(var a in b)b[a].pic_img&&(captcha_dom=b[a]);for(var c in b)input_setting(b[c])}
function input_get_inputs_value(b){var a=!1,c;for(c in b){var d=b[c],e=d.name,d=$("#"+d.input_id).val(),a=a||{};a[e]=d}return a}function input_local_check_inputs(b){var a=!0,c;for(c in b){var d=b[c];input_local_check($("#"+d.input_id),d)||(a=!1)}return a}function input_status_check(b){var a=!0,c;for(c in b)if(!1==check_unit_status(b[c])){a=!1;break}return a}function get_captcha(b){var a="#"+b.pic_img.id;$(a).attr("src")||$(a).attr("src",b.pic_img.src+"?r="+Math.random())}
function check_unit_status(b){var a="#"+b.status_div_id;if($(a).hasClass(input_config.status_class.ok))return!0;if(!b.pic_img||4!=$("#"+b.input_id).val().length)return!1;b=$(a).hasClass(input_config.status_class.error);a=$(a).hasClass(input_config.status_class.checking);return b||a?!1:!0};var pathname=document.location.pathname.toLowerCase(),pagename=pathname.substring(pathname.lastIndexOf("/")+1).replace(".html",""),platform="node";
if("node"==platform)var url_account_check="/account_check",url_check_idcard="/check_idcard",url_captcha="/captcha",url_check_captcha="/check_captcha",url_register_account="/register_account",url_get_card="/get_card";else url_account_check="/ajax/account_check.aspx",url_check_idcard="/ajax/check_idcard.aspx",url_captcha="/ajax/captcha.aspx",url_check_captcha="/ajax/check_captcha.aspx",url_register_account="/ajax/register_account.aspx",url_get_card="/ajax/get_card.aspx";$("document").ready(function(){$(".reg_form input").val("")});
$(".reg_form input").focus(function(){$("#validateimg").show()});
var account_register_input_data=[{name:"account_name",input_id:"txtUserAccount",info_div_id:"txtUserAccount",status_div_id:"txtUserAccountTip",local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u8d26\u53f7"},{type:"length",min:6,max:16,err_info:"\u8d26\u53f7\u957f\u5ea6\u5fc5\u987b6-16\u4f4d"},{type:"regex",value:/^[A-Za-z0-9_]{6,16}$/,err_info:"\u53ea\u80fd\u4e3a\u5b57\u6bcd,\u6570\u5b57,\u4e0b\u5212\u7ebf"}],remote_check:{url:url_account_check,1:"\u8be5\u8d26\u53f7\u5df2\u7ecf\u5b58\u5728",
2:"\u7cfb\u7edf\u9519\u8bef"}},{name:"password",input_id:"txtPasswords",info_div_id:"txtPasswordsVal",status_div_id:"txtPasswordsTip",info_cover_input:!0,local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u5bc6\u7801"},{type:"length",min:6,max:16,err_info:"\u5bc6\u7801\u7684\u957f\u5ea6\u4e3a6-16\u4e2a\u5b57\u7b26"},{type:"regex",value:/^[^\s]{6,16}$/,err_info:"\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u80fd\u5305\u542b\u7a7a\u683c"}]},{name:"confirm_password",input_id:"txtConfirm",info_div_id:"txtConfirmVal",
status_div_id:"txtConfirmTip",info_cover_input:!0,local_check:[{type:"empty",err_info:"\u8bf7\u518d\u8f93\u5165\u4e00\u904d\u5bc6\u7801"},{type:"equal",value:"txtPasswords",err_info:"\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4"}]},{name:"id_card",input_id:"txtCardID",info_div_id:"txtCardID",status_div_id:"txtCardIDTip",local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u60a8\u7684\u8eab\u4efd\u8bc1\u4fe1\u606f"},{type:"length",options:[15,18],err_info:"\u8eab\u4efd\u8bc1\u5e94\u4e3a15\u4f4d\u621618\u4f4d"}],
remote_check:{url:url_check_idcard,1:"\u65e0\u6548\u7684\u8eab\u4efd\u8bc1\u53f7\u7801"}},{name:"true_name",input_id:"txtTrueName",info_div_id:"txtTrueName",status_div_id:"txtTrueNameTip",local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u60a8\u7684\u59d3\u540d"},{type:"length",min:2,max:10,err_info:"\u59d3\u540d\u5fc5\u987b2-10\u4e2a\u6c49\u5b57"},{type:"regex",value:/^[\u4e00-\u9fa5]{2,6}$/,err_info:"\u59d3\u540d\u5fc5\u987b\u662f\u6c49\u5b57"}]},{name:"validate_pic",input_id:"txtValidate",
status_div_id:"txtValidateVal",pic_img:{id:"validateimg",src:url_captcha},local_check:[{type:"length",min:4,max:4,err_info:!1}],remote_check:{url:url_check_captcha,1:""}}];function account_register_setting(){input_setting_inputs(account_register_input_data);$("#reg_button").click(function(b){account_register_request();b.preventDefault()});$("table.reg_form").keypress(function(b){13==b.which&&account_register_request()})}
function account_register_request(){var b=input_status_check(account_register_input_data);if(b&&check_license_agreement()&&(b=input_get_inputs_value(account_register_input_data)))set_reg_progress(),b.page_name="index_172",b.r=Math.random(),"iis"==platform?$.post(url_register_account,b,function(a){clear_reg_progress();(reg_result_func[a.type]||reg_result_func.default_)(a.info)},"json"):$.post(url_register_account,b,function(a){clear_reg_progress();(reg_result_func[a.type]||reg_result_func.default_)(a.info)})}
function check_license_agreement(){return!$("#chk_XieYi").attr("checked")?(alert("\u8bf7\u9605\u8bfb\u5e76\u540c\u610f\u6ce8\u518c\u534f\u8bae\uff01"),!1):!0}function set_reg_progress(){$("#regProcessTip").attr("class","check_result_loading")}function clear_reg_progress(){$("#regProcessTip").attr("class","")}
var reg_result_func={ok:function(b){$("#reg_account").val(b[0]);$(".reg").hide();$("#reg_step2").show();$("#active_link").click(function(){var a=$("#reg_account").val(),b=$("#active_code").val();""==a||""==b?alert("\u8bf7\u8f93\u5165\u5e10\u53f7\u6216\u8005\u6fc0\u6d3b\u7801"):$.post("/activate_card",{account:$("#reg_account").val(),card:$("#active_code").val()},function(a){$("#reg_step2").hide();"0"==a?$("#reg_step4").show():($("#reg_step5").show(),$("#back").click(function(){$("#reg_step2").show();
$("#reg_step5").hide()}))},"html");return!1})},no_card:function(b){$("#reg_account").val(b[0]);$(".reg").hide();$("#reg_step2").show();$("#active_link").click(function(){var a=$("#reg_account").val(),b=$("#active_code").val();""==a||""==b?alert("\u8bf7\u8f93\u5165\u5e10\u53f7\u6216\u8005\u6fc0\u6d3b\u7801"):$.post("/activate_card",{account:$("#reg_account").val(),card:$("#active_code").val()},function(a){$("#reg_step2").hide();"0"==a?$("#reg_step4").show():($("#reg_step5").show(),$("#back").click(function(){$("#reg_step2").show();
$("#reg_step5").hide()}))},"html");return!1})},failed:function(b){alert(b)},default_:function(b){$("#txtPasswords").val("");$("#txtConfirm").val("");$("#txtValidate").val("");$("#regProcessTip").attr("class","");alert(b)}};account_register_setting();$("a").attr("hidefocus","true");
