function default_set(){$("#login_out").click(function(){$.get("/login_out?r="+Math.random(),function(){document.location.reload()})});$("#map2").click(function(){$.get("/check_user_login?r="+Math.random(),function(a){a.login?document.location="http://party.syyx.com/nycs/sing/uploadsing.html#tp":login()})});$("#topcy").click(function(){$.get("/check_user_login?r="+Math.random(),function(a){a.login?document.location="http://party.syyx.com/nycs/sing/uploadsing.html#tp":login()})});$(".div_close").click(login_close);
$.get("/check_user_login?r="+Math.random(),function(a){a.login&&($("#login_a").show(),$("#user_name").html(a.UserAccount))})}function vote(a){var b=document.documentElement.scrollTop||document.body.scrollTop;$("#iframe").attr("src","/nycs/sing/vote.html?id="+a);$("#popup_bg").css("display","block");$("#div_login").css("top",b+80);$("#div_login").css("display","block");$("html").scrollTop($("html").scrollTop()+1);$("body").scrollTop($("body").scrollTop()+1)}
function login_close(){$("#div_login").css("display","none");$("#popup_bg").css("display","none")}function login(){var a=document.documentElement.scrollTop||document.body.scrollTop;$("#iframe").attr("src","/nycs/sing/login.html?type=up");$("#popup_bg").css("display","block");$("#div_login").css("top",a+80);$("#div_login").css("display","block");$("html").scrollTop($("html").scrollTop()+1);$("body").scrollTop($("body").scrollTop()+1)};$(function(){$("#map3").addClass("map3hover");default_set()});
