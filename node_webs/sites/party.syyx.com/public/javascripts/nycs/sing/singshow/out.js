function default_set(){$("#login_out").click(function(){$.get("/login_out?r="+Math.random(),function(){document.location.reload()})});$("#map2").click(function(){$.get("/check_user_login?r="+Math.random(),function(a){a.login?document.location="http://party.syyx.com/nycs/sing/uploadsing.html#tp":login()})});$("#topcy").click(function(){$.get("/check_user_login?r="+Math.random(),function(a){a.login?document.location="http://party.syyx.com/nycs/sing/uploadsing.html#tp":login()})});$(".div_close").click(login_close);
$.get("/check_user_login?r="+Math.random(),function(a){a.login&&($("#login_a").show(),$("#user_name").html(a.UserAccount))})}function vote(a){var b=document.documentElement.scrollTop||document.body.scrollTop;$("#iframe").attr("src","/nycs/sing/vote.html?id="+a);$("#popup_bg").css("display","block");$("#div_login").css("top",b+80);$("#div_login").css("display","block");$("html").scrollTop($("html").scrollTop()+1);$("body").scrollTop($("body").scrollTop()+1)}
function login_close(){$("#div_login").css("display","none");$("#popup_bg").css("display","none")}function login(){var a=document.documentElement.scrollTop||document.body.scrollTop;$("#iframe").attr("src","/nycs/sing/login.html?type=up");$("#popup_bg").css("display","block");$("#div_login").css("top",a+80);$("#div_login").css("display","block");$("html").scrollTop($("html").scrollTop()+1);$("body").scrollTop($("body").scrollTop()+1)};$(function(){$("#map1").addClass("map1hover");default_set();0==getParameter("id")?($(".toupiao").html(""),$("#jquery_jplayer_1").jPlayer({ready:function(){$(this).jPlayer("setMedia",{mp3:"http://r.syyx.com/party/nycs/sing/drjolin.mp3"}).jPlayer("play")},ended:function(){$(this).jPlayer("play")},swfPath:"http://r.syyx.com/party/jplayer/",supplied:"mp3"})):$.get("/nycs/sing/get_singinfo?ID="+getParameter("id")+"&r="+Math.random(),function(a){if(0<a.length){$("#nickname").html(a[0].NickName);$("#singcontent").html(a[0].content);
$(".votecount").html("\u5df2\u83b7\u5f97\u7968\u6570\uff1a<span id='votecount'>"+a[0].votecount+"</span>");$("#toupiao").attr("href","javascript:vote("+a[0].ID+")");var b="http://r.syyx.com"+a[0].mp3url;$("#jquery_jplayer_1").jPlayer({ready:function(){$(this).jPlayer("setMedia",{mp3:b}).jPlayer("play")},ended:function(){$(this).jPlayer("play")},swfPath:"http://r.syyx.com/party/jplayer/",supplied:"mp3"}).bind($.jPlayer.event.play,function(){$(this).jPlayer("pauseOthers")})}else document.location="/nycs/sing/index.html"})});
function getParameter(a){var b=window.location.search,c=a.length,a=b.indexOf(a);if(-1==a)return"";a+=c+1;c=b.indexOf("&",a);return-1==c?b.substring(a):b.substring(a,c)};
