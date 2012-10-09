_G_all_input_checks={empty:function(a,b){if(""==a)return b.err_info},length:function(a,b){if(b.options){for(var c in b.options)if(a.length==b.options[c])return;return b.err_info}b.min=b.min||0;b.max=b.max||Math.pow(2,32);if(a.length<b.min||a.length>b.max)return b.err_info},regex:function(a,b){if(!b.value.test(a))return b.err_info},equal:function(a,b){if("server"==b.side){var c=b.req.body[b.value];if(c!=a)return b.err_info}else if("session"==b.side){if(c=b.req.session[b.value],c!=a)return b.err_info}else if($("#"+
b.value).val()!=a)return b.err_info}};_G_check_request_data=function(a,b){for(var c in a.body)if(b[c]){var d=a.body[c],e=b[c].checks,g;for(g in e){var h=e[g].type,f=e[g];f.req=a;var i=_G_all_input_checks[h];if(!i)return f={},f[c]=h,f;f=i(d,f);if(void 0!=f)return f={},f[c]=h,f}}};
var input_config={background_highlight_class:"focus_in_inut",error_tag_class:"input_wrong",status_class:{ok:"check_result_right",error:"check_result_wrong",checking:"check_result_loading"}},captcha_dom,input_local_check_func=_G_all_input_checks;function input_highlight_background(a){a.addClass(input_config.background_highlight_class)}function input_recover_background(a){a.removeClass(input_config.background_highlight_class)}
function input_recover(a,b){if(a.hasClass(input_config.error_tag_class)){a.removeClass(input_config.error_tag_class);a.val("");var c=b.status_div_id;c&&$("#"+c).attr("class","")}}function input_check_ok(a,b){var c=b.status_div_id;c&&$("#"+c).attr("class",input_config.status_class.ok)}
function input_check_error(a,b,c){a.addClass(input_config.error_tag_class);var d=b.status_div_id;d&&$("#"+d).attr("class",input_config.status_class.error);if(b=b.info_div_id)b="#"+b,$(b).is(":hidden")&&(a.hide(),$(b).show()),c&&$(b).val(c)}function input_local_check(a,b){var c=a.val(),d;for(d in b.local_check){var e=b.local_check[d],e=(0,input_local_check_func[e.type])(c,e);if(void 0!==e)return input_check_error(a,b,e),!1}input_check_ok(a,b);return!0}
function input_remote_check(a,b){if(!b.remote_check)return!0;var c=a.val(),d=b.remote_check.url;$("#"+b.status_div_id).attr("class",input_config.status_class.checking);$.ajax({type:"GET",cache:!1,url:d,data:{v:c},dataType:"json",success:function(c){0==c.type?input_check_ok(a,b):input_check_error(a,b,b.remote_check[c.type+""])}})}function input_show_pic(a,b){get_captcha(captcha_dom);$("#"+b.pic_img.id).show()}
function input_pic_setting(a,b){var c="#"+b.input_id,d="#"+b.pic_img.id;$(c).keyup(function(){4<=$(c).val().length&&input_local_check(a,b)&&input_remote_check(a,b)});$(d).click(function(){var a="#"+b.status_div_id;$(d).attr("src",b.pic_img.src+"?r="+Math.random());$(a).attr("class",input_config.status_class.error)})}function input_info_cover_input_setting(a,b){var c=b.info_div_id;c&&$("#"+c).focus(function(){a.is(":hidden")&&($(this).hide(),a.show(),a.focus())})}
function input_setting(a){var b=$("#"+a.input_id);b.val("");b.focus(function(){get_captcha(captcha_dom);a.pic_img&&input_show_pic(b,a);input_highlight_background(b);input_recover(b,a)});b.blur(function(){input_recover_background(b);a.pic_img||input_local_check(b,a)&&input_remote_check(b,a)});a.pic_img&&input_pic_setting(b,a);a.info_cover_input&&input_info_cover_input_setting(b,a)}function input_setting_inputs(a){for(var b in a)a[b].pic_img&&(captcha_dom=a[b]);for(var c in a)input_setting(a[c])}
function input_get_inputs_value(a){var b=!1,c;for(c in a){var d=a[c],e=d.name,d=$("#"+d.input_id).val(),b=b||{};b[e]=d}return b}function input_local_check_inputs(a){var b=!0,c;for(c in a){var d=a[c];input_local_check($("#"+d.input_id),d)||(b=!1)}return b}function input_status_check(a){var b=!0,c;for(c in a)if(!1==check_unit_status(a[c])){b=!1;break}return b}function get_captcha(a){var b="#"+a.pic_img.id;$(b).attr("src")||$(b).attr("src",a.pic_img.src+"?r="+Math.random())}
function check_unit_status(a){var b="#"+a.status_div_id;if($(b).hasClass(input_config.status_class.ok))return!0;if(!a.pic_img||4!=$("#"+a.input_id).val().length)return!1;a=$(b).hasClass(input_config.status_class.error);b=$(b).hasClass(input_config.status_class.checking);return a||b?!1:!0}
var remote_server_url_list={check_account:"/Ajax/Reg/account_check.aspx",check_idcard:"/Ajax/Reg/check_idcard.aspx",check_captcha:"/Ajax/Reg/check_captcha.aspx",register_account:"/Ajax/Reg/register_account.aspx",get_captcha:"/Ajax/Reg/captcha.aspx",active_gift:"http://activity.syyx.com/nycs_activate/activate_giftbag.shtml",get_news_info:"http://nycs.syyx.com/ajax/news/getnewsinfo.aspx",get_vote_info:"http://nycs.syyx.com/ajax/news/GetNewsVote.aspx",vote:"http://nycs.syyx.com/ajax/news/vote.aspx",
get_related_news:"http://nycs.syyx.com/ajax/news/GetRelatedNews.aspx",get_3rd_download_list:"http://nycs.syyx.com/ajax/download/get17173.aspx",get_patch_info_list:"http://nycs.syyx.com/ajax/download/GetPatchInfoList.aspx",get_download_tools:"http://nycs.syyx.com/ajax/download/GetToolsDownload.aspx",get_news_list:"http://nycs.syyx.com/ajax/news/getnewslist.aspx",get_download_client:"http://nycs.syyx.com/ajax/download/getclientinfo.aspx",get_goods_list:"http://nycs.syyx.com/ajax/gameinfo/getgoodslist.aspx",
get_data_class:"http://nycs.syyx.com/ajax/gameinfo/getdataclass.aspx",get_task_class:"http://nycs.syyx.com/ajax/gameinfo/gettaskclass.aspx",get_task_list:"http://nycs.syyx.com/ajax/gameinfo/gettasklist.aspx",get_task_info:"http://nycs.syyx.com/ajax/gameinfo/gettaskinfo.aspx",get_armint_list:"http://nycs.syyx.com/ajax/Metier/MetierArming.aspx",get_map_monster:"http://nycs.syyx.com/ajax/gameinfo/getmonster.aspx",get_map_task:"http://nycs.syyx.com/ajax/gameinfo/getmaptask.aspx",get_map_npc:"http://nycs.syyx.com/ajax/gameinfo/getmapnpc.aspx",
get_serach_game_lib:"http://nycs.syyx.com/ajax/gameinfo/getsearch.aspx",get_user_pic_list:"http://nycs.syyx.com/Ajax/Pic/GetUserPicList.aspx",get_game_pic_list:"http://nycs.syyx.com/Ajax/Pic/GetGamePicList.aspx",game_lib_goods:"/game_lib_content.html",game_lib_info:"/game_lib_content_1.html",game_lib_task:"/game_lib_content_2.html",game_lib_map_monster:"/game_lib_content_3.html",game_lib_map_npc:"/game_lib_content_4.html",game_lib_map_task:"/game_lib_content_5.html",serach_game_lib:"/game_lib_search.html",
news_content:"/news_content.html",news_list:"/news_list.html",recommend_server:"http://att.syyx.com/XGame/StaticHtml/2.htm",index_top_news:"http://att.syyx.com/XGame/StaticHtml/20.htm",index_slider_news:"http://att.syyx.com/xgame/PicLink/piclink1.htm",index_news_list:"http://att.syyx.com/XGame/StaticHtml/27.htm",index_images_ad:"http://att.syyx.com/xgame/PicLink/piclink2.htm",index_game_lib_summary:"http://att.syyx.com/XGame/StaticHtml/18.htm",index_game_feature:"http://att.syyx.com/XGame/StaticHtml/19.htm",
index_user_center:"http://att.syyx.com/XGame/StaticHtml/17.htm",index_game_pic:"http://att.syyx.com/XGame/StaticHtml/16.htm",index_game_video:"http://att.syyx.com/XGame/StaticHtml/15.htm",index_iframe_link:"http://att.syyx.com/XGame/StaticHtml/14.htm",index_media_img:"http://att.syyx.com/XGame/StaticHtml/13.htm",index_link:"http://att.syyx.com/XGame/StaticHtml/21.htm",news_activity:"http://att.syyx.com/XGame/StaticHtml/4.htm",news_related_img:"http://att.syyx.com/XGame/StaticHtml/3.htm",index_news_list_1:"http://att.syyx.com/news/js/topnews/0/1.htm",
index_news_list_2:"http://att.syyx.com/news/js/topnews/0/34.htm",index_news_list_3:"http://att.syyx.com/news/js/topnews/0/33.htm",index_news_list_4:"http://att.syyx.com/news/js/topnews/0/35.htm",screenshot:"http://att.syyx.com/XGame/StaticHtml/12.htm",wallpaper:"http://att.syyx.com/XGame/StaticHtml/11.htm",cartoon:"http://att.syyx.com/XGame/StaticHtml/10.htm",video:"http://att.syyx.com/XGame/StaticHtml/9.htm",game_lib_nav:"http://att.syyx.com/XGame/StaticHtml/8.htm",game_lib_gameplay:"http://att.syyx.com/XGame/StaticHtml/7.htm",
get_hot_video:"http://nycs.syyx.com/Ajax/Video/GetHotVideo.aspx",get_user_video:"http://nycs.syyx.com/Ajax/Video/GetUserVideo.aspx",get_new_video:"http://nycs.syyx.com/Ajax/Video/GetNewVideo.aspx",get_video_info:"http://nycs.syyx.com/Ajax/Video/GetVideoInfo.aspx",screen_info:"http://nycs.syyx.com/Ajax/Pic/GetGamePic.aspx",wallpaper_info:"http://nycs.syyx.com/Ajax/Pic/GetWallpaper.aspx",wallpaper_size:"http://nycs.syyx.com/Ajax/Pic/GetOtherSize.aspx",check_login:"http://nycs.syyx.com/Ajax/Users/checkLogin.aspx",
get_usercenter_list:"http://nycs.syyx.com/UserCenter/GetListByID.aspx",user_center_data:"http://nycs.syyx.com/UserCenter/GetListByID.aspx",user_center_data2:"http://nycs.syyx.com/UserCenter/GetList23.aspx",get_user_vote:"http://nycs.syyx.com/UserCenter/GetVoteData.aspx",set_user_vote:"http://nycs.syyx.com/UserCenter/SetVote.aspx"},page_name="nycs_gameFeature",account_register_input_data=[{name:"account_name",input_id:"txtUserAccount",info_div_id:"txtUserAccount",status_div_id:"txtUserAccountTip",
local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u8d26\u53f7"},{type:"length",min:6,max:16,err_info:"\u8d26\u53f7\u957f\u5ea6\u5fc5\u987b6-16\u4f4d"},{type:"regex",value:/^[A-Za-z0-9_]{6,16}$/,err_info:"\u53ea\u80fd\u4e3a\u5b57\u6bcd,\u6570\u5b57,\u4e0b\u5212\u7ebf"}],remote_check:{url:remote_server_url_list.check_account,1:"\u8be5\u8d26\u53f7\u5df2\u7ecf\u5b58\u5728",2:"\u7cfb\u7edf\u9519\u8bef"}},{name:"password",input_id:"txtPasswords",info_div_id:"txtPasswordsVal",status_div_id:"txtPasswordsTip",
info_cover_input:!0,local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u5bc6\u7801"},{type:"length",min:6,max:16,err_info:"\u5bc6\u7801\u7684\u957f\u5ea6\u4e3a6-16\u4e2a\u5b57\u7b26"},{type:"regex",value:/^[^\s]{6,16}$/,err_info:"\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u80fd\u5305\u542b\u7a7a\u683c"}]},{name:"confirm_password",input_id:"txtConfirm",info_div_id:"txtConfirmVal",status_div_id:"txtConfirmTip",info_cover_input:!0,local_check:[{type:"empty",err_info:"\u8bf7\u518d\u8f93\u5165\u4e00\u904d\u5bc6\u7801"},
{type:"equal",value:"txtPasswords",err_info:"\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4"}]},{name:"id_card",input_id:"txtCardID",info_div_id:"txtCardID",status_div_id:"txtCardIDTip",local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u60a8\u7684\u8eab\u4efd\u8bc1\u4fe1\u606f"},{type:"length",options:[15,18],err_info:"\u8eab\u4efd\u8bc1\u5e94\u4e3a15\u4f4d\u621618\u4f4d"}],remote_check:{url:remote_server_url_list.check_idcard,1:"\u65e0\u6548\u7684\u8eab\u4efd\u8bc1\u53f7\u7801"}},
{name:"true_name",input_id:"txtTrueName",info_div_id:"txtTrueName",status_div_id:"txtTrueNameTip",local_check:[{type:"empty",err_info:"\u8bf7\u8f93\u5165\u60a8\u7684\u59d3\u540d"},{type:"length",min:2,max:10,err_info:"\u59d3\u540d\u5fc5\u987b2-10\u4e2a\u6c49\u5b57"},{type:"regex",value:/^[\u4e00-\u9fa5]{2,6}$/,err_info:"\u59d3\u540d\u5fc5\u987b\u662f\u6c49\u5b57"}]},{name:"validate_pic",input_id:"txtValidate",status_div_id:"txtValidateVal",pic_img:{id:"validateimg",src:remote_server_url_list.get_captcha},
local_check:[{type:"length",min:4,max:4,err_info:!1}],remote_check:{url:remote_server_url_list.check_captcha,1:""}}];
$(function(){null!=$.cookie("first_get")?($("#float_reg_panel").hide(),$("#float_reg_btn").show()):($("#float_reg_panel").show(),$.cookie("first_get","no_first"));$("#float_reg_btn").click(function(a){$(this).hide();$("#float_reg_panel").show();a.preventDefault()});$("#float_reg_panel .close a").click(function(a){$("#float_reg_panel").hide();$("#float_reg_btn").show();a.preventDefault()});support_ie6_position_fixed([$("#float_reg_btn"),$("#float_reg_panel")]);account_register_setting()});
function support_ie6_position_fixed(a){window.XMLHttpRequest||$(window).scroll(function(){var b=$(window).scrollTop();$(a).each(function(){this.css("top",b+200+"px")})})}
function account_register_setting(){input_setting_inputs(account_register_input_data);$("#reg_button").click(function(a){account_register_request();a.preventDefault()});$("table.reg_form").keypress(function(a){13==a.which&&account_register_request()});$("#reg_step3 a").click(function(a){location.href=location.href;a.preventDefault()})}
function account_register_request(){var a=input_status_check(account_register_input_data);if(a&&check_license_agreement()&&(a=input_get_inputs_value(account_register_input_data)))set_reg_progress(),a.page_name=page_name,a.r=Math.random(),$.post(remote_server_url_list.register_account,a,function(a){clear_reg_progress();(reg_result_func[a.type]||reg_result_func.default_)(a.info)},"json")}
function check_license_agreement(){return!$("#chk_XieYi").attr("checked")?(alert("\u8bf7\u9605\u8bfb\u5e76\u540c\u610f\u6ce8\u518c\u534f\u8bae\uff01"),!1):!0}function set_reg_progress(){$("#regProcessTip").attr("class","check_result_loading")}function clear_reg_progress(){$("#regProcessTip").attr("class","")}
var reg_result_func={ok:function(a){$("#reg_account1").html(a[0]);$("#active_code").html(a[1]);$("#reg_step1").hide();$("#reg_step2").show();$("#active_link").click(function(b){$.get("http://nycs.syyx.com/ajax/register/activate.aspx?ac="+a[0]+"&cn="+a[1],function(a){"yes"==a.isok?($("#reg_step2").hide(),$("#reg_step4").show()):($("#gittip").html(a.content),$("#gittip").attr("style","color:red"))},"json");b.preventDefault()})},no_card:function(a){$("#reg_step1").hide();$("#reg_step3").show();$("#reg_account2").html(a[0])},
failed:function(a){alert(a)},default_:function(a){$("#txtPasswords").val("");$("#txtConfirm").val("");$("#txtValidate").val("");$("#regProcessTip").attr("class","");alert(a)}};$(function(){var a;a=location.search?location.search.substring(1):1;get_all_news(a);get_news_activity();upload_img_click()});
function get_all_news(a){function b(b){position_page_btn(a,b.all_page);c.html("");$.each(b.gamepiclist,function(a,b){c.append('<li><a rev="'+b.Title+'" href="'+b.BigPic+'"><img src="'+b.SmallPic+'"></a><span>'+b.Title+"</span></li>")});$(".pic_list a").lightBox()}var c=$("ul.pic_list");$.ajax({data:{page:a},dataType:"jsonp",url:remote_server_url_list.get_game_pic_list,success:function(a){$.isEmptyObject(a)?location.href="http://nycs.syyx.com/":b(a)}})}
function set_page_roll(a){1==a&&$(".paging").hide()}
function position_page_btn(a,b){function c(a,b){a=a||null;b?$("#dispaly_page_num").append('<a href="?'+a+'" class="current">'+a+"</a>"):$("#dispaly_page_num").append('<a href="?'+a+'">'+a+"</a>")}$("#dispaly_page_num").html("");$("#dispaly_page_num").append('<a href="?1">\u9996\u9875</a>&nbsp;<<&nbsp;&nbsp;');1==a?$("#dispaly_page_num").append('<a href="?1">\u4e0a\u4e00\u9875</a>'):$("#dispaly_page_num").append('<a href="?'+(a-1)+'">\u4e0a\u4e00\u9875</a>');if(5>=b)for(var d=1;d<=b;d++)d==a?c(d,!0):
c(d);else{if(5>=a)for(d=1;5>=d;d++)d==a?c(d,!0):c(d);else for(d=a-2;d<=parseInt(a)+2;d++)d==a?c(d,!0):d<=b&&c(d);a==b?$("#dispaly_page_num").append('<a href="?'+b+'">\u4e0b\u4e00\u9875</a>'):$("#dispaly_page_num").append('<a href="?'+(parseInt(a)+1)+'">\u4e0b\u4e00\u9875</a>')}parseInt($("#dispaly_page_num a.current").html());set_page_roll(b);$("#dispaly_page_num").append('&nbsp;>>&nbsp;&nbsp;<a href="?'+b+'">\u672b\u9875</a>');for(var d="<select id=gotopage>",e=1;e<=b;e++)d=e==a?d+("<option value="+
e+" selected>"+e+"</option>"):d+("<option value="+e+">"+e+"</option>");d+="</select>";$("#dispaly_page_num").append("&nbsp;&nbsp;\u8f6c\u5230:"+d+" \u9875");$("#gotopage").on("change",function(){var a=$(this).val();location.href="?"+a})}
function get_news_activity(){$.ajax({dataType:"jsonp",jsonpCallback:"run_news_activity",url:remote_server_url_list.news_activity,success:function(a){$.isEmptyObject(a)||$.each(a,function(a,c){$(".promotions").append('<a target="_blank" href="'+c.link+'"><img src="'+c.src+'"></a>')})}})}
function upload_img_click(){$("#a_upload").click(function(){$.ajax({dataType:"jsonp",url:"http://nycs.syyx.com/Ajax/Users/checkLogin.aspx",success:function(a){"1"==a?($("#div_dialog").html('<iframe scrolling="no" height="325" width="650" id="externalIframe" frameborder="no" border="0" src="http://nycs.syyx.com/PicCenter/UpLaodGamePic.aspx"/>'),$("#div_dialog").dialog({dialogClass:"dialog_upload",width:731,height:420,modal:!0,close:function(){location.href=location.href}})):($("#div_dialog").html('<iframe scrolling="no" height="205" width="400" id="externalIframe" frameborder="no" border="0" src="http://nycs.syyx.com/login.aspx"/>'),
$("#div_dialog").dialog({dialogClass:"dialog_login",width:525,height:325,modal:!0,close:function(){location.href=location.href}}))}});return!1})};
