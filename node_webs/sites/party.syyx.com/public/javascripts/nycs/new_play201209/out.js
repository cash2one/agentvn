+function(){var b=0,a=document.location.hash.substring(1)-1;0<a&&5>a&&($("#tab div").eq(b).stop().removeAttr("class"),$("#tab div").eq(a).addClass("t"+a),$("#con .scroll").stop().animate({"margin-top":-510*a},500),b=a);for(a=0;4>a;a++)$("#tab div").eq(a).mouseover(function(a){return function(){if(a!=b){$("#tab div").eq(b).stop().removeAttr("class");$("#tab div").eq(a).addClass("t"+a);$("#con .scroll").stop().animate({"margin-top":-510*a},500);b=a}}}(a));$(".to4").click(function(){$("#tab div").eq(b).stop().removeAttr("class");
$("#tab div").eq(3).addClass("t3");$("#con .scroll").stop().animate({"margin-top":-1530},500);b=3})}();try{document.execCommand("BackgroundImageCache",!1,!0)}catch(e$$8){}$("a").attr("hidefocus","true");
