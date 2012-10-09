_G_all_input_checks={empty:function(b,a){if(""==b)return a.err_info},length:function(b,a){if(a.options){for(var c in a.options)if(b.length==a.options[c])return;return a.err_info}a.min=a.min||0;a.max=a.max||Math.pow(2,32);if(b.length<a.min||b.length>a.max)return a.err_info},regex:function(b,a){if(!a.value.test(b))return a.err_info},equal:function(b,a){if("server"==a.side){var c=a.req.body[a.value];if(c!=b)return a.err_info}else if("session"==a.side){if(c=a.req.session[a.value],c!=b)return a.err_info}else if($("#"+
a.value).val()!=b)return a.err_info}};_G_check_request_data=function(b,a){for(var c in b.body)if(a[c]){var d=b.body[c],e=a[c].checks,g;for(g in e){var h=e[g].type,f=e[g];f.req=b;var i=_G_all_input_checks[h];if(!i)return f={},f[c]=h,f;f=i(d,f);if(void 0!=f)return f={},f[c]=h,f}}};
var input_config={background_highlight_class:"focus_in_inut",error_tag_class:"input_wrong",status_class:{ok:"check_result_right",error:"check_result_wrong",checking:"check_result_loading"}},captcha_dom,input_local_check_func=_G_all_input_checks;function input_highlight_background(b){b.addClass(input_config.background_highlight_class)}function input_recover_background(b){b.removeClass(input_config.background_highlight_class)}
function input_recover(b,a){if(b.hasClass(input_config.error_tag_class)){b.removeClass(input_config.error_tag_class);b.val("");var c=a.status_div_id;c&&$("#"+c).attr("class","")}}function input_check_ok(b,a){var c=a.status_div_id;c&&$("#"+c).attr("class",input_config.status_class.ok)}
function input_check_error(b,a,c){b.addClass(input_config.error_tag_class);var d=a.status_div_id;d&&$("#"+d).attr("class",input_config.status_class.error);if(a=a.info_div_id)a="#"+a,$(a).is(":hidden")&&(b.hide(),$(a).show()),c&&$(a).val(c)}function input_local_check(b,a){var c=b.val(),d;for(d in a.local_check){var e=a.local_check[d],e=(0,input_local_check_func[e.type])(c,e);if(void 0!==e)return input_check_error(b,a,e),!1}input_check_ok(b,a);return!0}
function input_remote_check(b,a){if(!a.remote_check)return!0;var c=b.val(),d=a.remote_check.url;$("#"+a.status_div_id).attr("class",input_config.status_class.checking);$.ajax({type:"GET",cache:!1,url:d,data:{v:c},dataType:"json",success:function(c){0==c.type?input_check_ok(b,a):input_check_error(b,a,a.remote_check[c.type+""])}})}function input_show_pic(b,a){get_captcha(captcha_dom);$("#"+a.pic_img.id).show()}
function input_pic_setting(b,a){var c="#"+a.input_id,d="#"+a.pic_img.id;$(c).keyup(function(){4<=$(c).val().length&&input_local_check(b,a)&&input_remote_check(b,a)});$(d).click(function(){var b="#"+a.status_div_id;$(d).attr("src",a.pic_img.src+"?r="+Math.random());$(b).attr("class",input_config.status_class.error)})}function input_info_cover_input_setting(b,a){var c=a.info_div_id;c&&$("#"+c).focus(function(){b.is(":hidden")&&($(this).hide(),b.show(),b.focus())})}
function input_setting(b){var a=$("#"+b.input_id);a.val("");a.focus(function(){get_captcha(captcha_dom);b.pic_img&&input_show_pic(a,b);input_highlight_background(a);input_recover(a,b)});a.blur(function(){input_recover_background(a);b.pic_img||input_local_check(a,b)&&input_remote_check(a,b)});b.pic_img&&input_pic_setting(a,b);b.info_cover_input&&input_info_cover_input_setting(a,b)}function input_setting_inputs(b){for(var a in b)b[a].pic_img&&(captcha_dom=b[a]);for(var c in b)input_setting(b[c])}
function input_get_inputs_value(b){var a=!1,c;for(c in b){var d=b[c],e=d.name,d=$("#"+d.input_id).val(),a=a||{};a[e]=d}return a}function input_local_check_inputs(b){var a=!0,c;for(c in b){var d=b[c];input_local_check($("#"+d.input_id),d)||(a=!1)}return a}function input_status_check(b){var a=!0,c;for(c in b)if(!1==check_unit_status(b[c])){a=!1;break}return a}function get_captcha(b){var a="#"+b.pic_img.id;$(a).attr("src")||$(a).attr("src",b.pic_img.src+"?r="+Math.random())}
function check_unit_status(b){var a="#"+b.status_div_id;if($(a).hasClass(input_config.status_class.ok))return!0;if(!b.pic_img||4!=$("#"+b.input_id).val().length)return!1;b=$(a).hasClass(input_config.status_class.error);a=$(a).hasClass(input_config.status_class.checking);return b||a?!1:!0}
(function(){function b(a){if(!a)return"blank";var b=a.split("://")[0],a=a.split("://")[1].split("/")[0];return(b=b+"://"+a)?b:"blank"}var a={from_url:"blank",from_url_detail:"blank",dest_url:location.protocol+"//"+location.hostname+location.pathname};if(0<document.referrer.length)a.from_url=b(document.referrer),a.from_url_detail=document.referrer;else try{"blank"==a.from_url_detail&&0<opener.location.href.length&&(a.from_url=b(opener.location.href),a.from_url_detail=opener.location.href)}catch(c){}$.ajax({url:"http://nysj.syyx.com/stat/visit",
data:a,success:function(){}})})();
var page_name="nysj",account_register_input_data=[{name:"account_name",input_id:"txtUserAccount",info_div_id:"txtUserAccount",status_div_id:"txtUserAccountTip",local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u8d26\u53f7"},{type:"length",min:6,max:16,err_info:"\u8d26\u53f7\u957f\u5ea6\u5fc5\u987b6-16\u4f4d"},{type:"regex",value:/^[A-Za-z0-9_]{6,16}$/,err_info:"\u53ea\u80fd\u4e3a\u5b57\u6bcd,\u6570\u5b57,\u4e0b\u5212\u7ebf"}],remote_check:{url:"/reg/account_check",1:"\u8be5\u8d26\u53f7\u5df2\u7ecf\u5b58\u5728",
2:"\u7cfb\u7edf\u9519\u8bef"}},{name:"password",input_id:"txtPasswords",info_div_id:"txtPasswordsVal",status_div_id:"txtPasswordsTip",info_cover_input:!0,local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u5bc6\u7801"},{type:"length",min:6,max:16,err_info:"\u5bc6\u7801\u7684\u957f\u5ea6\u4e3a6-16\u4e2a\u5b57\u7b26"},{type:"regex",value:/^[^\s]{6,16}$/,err_info:"\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u80fd\u5305\u542b\u7a7a\u683c"}]},{name:"confirm_password",input_id:"txtConfirm",info_div_id:"txtConfirmVal",
status_div_id:"txtConfirmTip",info_cover_input:!0,local_check:[{type:"empty",err_info:"\u8bf7\u518d\u8f93\u5165\u4e00\u904d\u5bc6\u7801"},{type:"equal",value:"txtPasswords",err_info:"\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4"}]},{name:"id_card",input_id:"txtCardID",info_div_id:"txtCardID",status_div_id:"txtCardIDTip",local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u60a8\u7684\u8eab\u4efd\u8bc1\u4fe1\u606f"},{type:"length",options:[15,18],err_info:"\u8eab\u4efd\u8bc1\u5e94\u4e3a15\u4f4d\u621618\u4f4d"}],
remote_check:{url:"/reg/check_idcard",1:"\u65e0\u6548\u7684\u8eab\u4efd\u8bc1\u53f7\u7801"}},{name:"true_name",input_id:"txtTrueName",info_div_id:"txtTrueName",status_div_id:"txtTrueNameTip",local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u60a8\u7684\u59d3\u540d"},{type:"length",min:2,max:10,err_info:"\u59d3\u540d\u5fc5\u987b2-10\u4e2a\u6c49\u5b57"},{type:"regex",value:/^[\u4e00-\u9fa5]{2,6}$/,err_info:"\u59d3\u540d\u5fc5\u987b\u662f\u6c49\u5b57"}]},{name:"validate_pic",input_id:"txtValidate",
status_div_id:"txtValidateVal",pic_img:{id:"validateimg",src:"/reg/get_captcha"},local_check:[{type:"length",min:4,max:4,err_info:!1}],remote_check:{url:"reg/check_captcha",1:""}}];$(function(){$("#float_reg_btn").click(function(b){$(this).hide();$("#float_reg_panel").show();b.preventDefault()});$("#float_reg_panel .close a").click(function(b){$("#float_reg_panel").hide();$("#float_reg_btn").show();b.preventDefault()});support_ie6_position_fixed([$("#float_reg_btn"),$("#float_reg_panel")]);account_register_setting()});
function support_ie6_position_fixed(b){window.XMLHttpRequest||$(window).scroll(function(){var a=$(window).scrollTop();$(window).scrollLeft();var c=$("body").height()-$("#float_reg_panel").height();a<c&&$(b).each(function(){this.css("top",a+100+"px")})})}
function account_register_setting(){input_setting_inputs(account_register_input_data);$("#reg_button").click(function(b){account_register_request();b.preventDefault()});$("table.reg_form").keypress(function(b){13==b.which&&account_register_request()})}
function account_register_request(){var b=input_status_check(account_register_input_data);if(b&&check_license_agreement()&&(b=input_get_inputs_value(account_register_input_data)))set_reg_progress(),b.page_name=page_name,b.r=Math.random(),$.post("/reg/register_account",b,function(a){clear_reg_progress();(reg_result_func[a.type]||reg_result_func.default_)(a.info)},"json")}
function check_license_agreement(){return!$("#chk_XieYi").attr("checked")?(alert("\u8bf7\u9605\u8bfb\u5e76\u540c\u610f\u6ce8\u518c\u534f\u8bae\uff01"),!1):!0}function set_reg_progress(){$("#regProcessTip").attr("class","check_result_loading")}function clear_reg_progress(){$("#regProcessTip").attr("class","")}
var reg_result_func={ok:function(b){$("#reg_account1").html(b);$("#reg_step1").hide();$("#reg_step2").show()},failed:function(b){alert(b)},default_:function(b){$("#txtPasswords").val("");$("#txtConfirm").val("");$("#txtValidate").val("");$("#regProcessTip").attr("class","");alert(b)}};$(function(){get_mobild_code();submit_activate_form();copy_code();submit_activate_account_form();open_reg();global_setting();auto_fill_code_and_account()});
function get_mobild_code(){function b(){$("#get_mobile_code").on("click",function(b){a();b.preventDefault()})}function a(){var a=$(".mobile input").val();/^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/.test(a)?$.ajax({type:"post",beforeSend:function(){$(".mobile_code .send_tip").html("\u8bf7\u7a0d\u5019...");$("#get_mobile_code").unbind()},url:"/get_mobile_code",data:{mobile_number:a},success:function(a){1==a.ok?$(".mobile_code .send_tip").html("\u9a8c\u8bc1\u7801\u5df2\u53d1\u9001"):$(".mobile_code .send_tip").html(a.info);
b()}}):(alert("\u624b\u673a\u53f7\u7801\u4e0d\u6b63\u786e"),$(".mobile input").val(""))}$(".mobile input").val("");$(".mobile_code  input").val("");$(".mobile_code  .send_tip").html("");$("#get_code_step_1 .answer input").attr("checked",!1);b()}
function submit_activate_form(){$(".submit_step1 a").click(function(b){b.preventDefault();var b=/^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/,a=$("#get_code_step_1 form").serializeArray();"q1"!==a[0].name?alert("\u8bf7\u9009\u62e9\u7b2c\u4e00\u9898\u7b54\u6848"):"q2"!==a[1].name?alert("\u8bf7\u9009\u62e9\u7b2c\u4e8c\u9898\u7b54\u6848"):""==a[2].value||!b.test(a[2].value)?alert("\u8bf7\u586b\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801"):((""==a[3].value||6!==a[3].value.length)&&alert("\u8bf7\u586b\u5165\u6b63\u786e\u7684\u77ed\u4fe1\u9a8c\u8bc1\u7801"),
$.ajax({type:"post",url:"/get_activate_code",data:$("#get_code_step_1 form").serialize(),beforeSend:function(){$(".submit_step1 span").html("\u63d0\u4ea4\u4e2d...")},success:function(a){null==a?$(".submit_step1 span").html("\u63d0\u4ea4\u6570\u636e\u4e0d\u6b63\u786e"):0==a.ok?$(".submit_step1 span").html(a.info):($("#get_code_step_1").hide(),4==a.ok?$("#get_code_result_1").show():1==a.ok?$("#get_code_result_2").show():2==a.ok?($("#get_code_result_3 span").html(a.info),$("#get_code_result_3").show()):
($(".submit_step1 span").html("\u8bf7\u7a0d\u5019\u518d\u8bd5"),$("#get_code_step_1").show()))}}))})}function copy_code(){$("#get_code_result_3 a").click(function(b){var a=$("#get_code_result_3 span").html();$.browser.msie?(window.clipboardData.setData("Text",a),alert("\u590d\u5236\u6210\u529f")):alert("\u4e0d\u652f\u6301\u6b64\u6d4f\u89c8\u5668,\u8bf7\u624b\u52a8\u590d\u5236");b.preventDefault()})}
function submit_activate_account_form(){$("#activate_failure_btn").click(function(b){$("#activate_result_2").hide();$("#activate_form").show();b.preventDefault()});$("#activate_form input").val("");$(".activate_form_submit_btn a").click(function(b){b.preventDefault();b=$("#activate_form form").serializeArray();""==b[0].value?alert("\u8bf7\u586b\u5165\u6fc0\u6d3b\u7801"):""==b[1].value?alert("\u8bf7\u586b\u5165\u6e38\u620f\u5e10\u53f7"):/^[A-Za-z0-9_]{6,16}$/.test(b[1].value)?$.ajax({type:"post",url:"/activate_account",
data:$("#activate_form form").serialize(),beforeSend:function(){$(".activate_form_submit_btn span").html("\u63d0\u4ea4\u4e2d...")},success:function(a){null==a?$(".activate_form_submit_btn span").html("\u63d0\u4ea4\u6570\u636e\u4e0d\u6b63\u786e"):0==a.ok?$(".activate_form_submit_btn span").html(a.info):($("#activate_form").hide(),1==a.ok?($("#activate_result_1 span").html(a.info),$("#activate_result_1").show(),$(".activate_form_submit_btn span").html("")):2==a.ok?($("#activate_result_2 p").html(a.info),
$("#activate_result_2").show(),$(".activate_form_submit_btn span").html("")):($(".activate_form_submit_btn span").html("\u8bf7\u7a0d\u5019\u518d\u8bd5"),$("#activate_form").show()))}}):alert("\u6e38\u620f\u8d26\u53f7\u4e0d\u6b63\u786e")})}function open_reg(){$(".reg_tip a").click(function(b){$("#float_reg_btn").hide();$("#float_reg_panel").show();b.preventDefault()})}function global_setting(){$("a").attr("hideFocus","true")}
function auto_fill_code_and_account(){var b=get_query_value("active"),a=get_query_value("user");b&&$('#activate_form input[name="code"]').val(b);a&&$('#activate_form input[name="account"]').val(a)}function get_query_value(b){var a=location.search.substring(1);if(!(""==a||void 0==a))for(var a=a.split("&"),c=0;c<a.length;c++){var d=a[c].split("=")[0],e=a[c].split("=")[1];if(d==b)return e}};