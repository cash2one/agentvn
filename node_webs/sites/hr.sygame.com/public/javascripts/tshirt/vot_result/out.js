function close(){$("#puple_bg").css("display","none");$("#puple").fadeOut("fast")}
function puple(){for(var e=$("#list img").length,c=0;c<e;c++)$("#list img").eq(c).click(function(){var b=Number($(this).attr("id").substring(1)),c=$("html").scrollTop()||$("body").scrollTop(),d=window.innerHeight||document.documentElement.clientHeight;$("#puple").removeAttr("style");$("#puple").html('<div id="img_box"><div id="title"></div><div class="img"><img src="/images/tshirt/l'+b+'.jpg"></div><div id="close" title="\u5173\u95ed"></div></div>');$("#puple_bg").css("display","block");$("#puple").css("top",
c+d/2-175+"px");$("#puple").fadeIn("fast");$("#title").html($("#list h2").eq(b-1).html().substring(3));$("#puple img").eq(0).load(function(){var a=this.offsetHeight+40,a={width:this.offsetWidth,height:a,"margin-left":-(this.offsetWidth/2+20),top:c-a/2+d/2};$("#puple").animate(a,function(){$("#close").click(close);$("#img_box").animate({opacity:1},"fast")})})})}
$.get("/tshirt/vote_result",function(e){if(1==e.type)alert("\u6570\u636e\u9519\u8bef");else if(2==e.type)alert("\u62b1\u6b49\uff0c\u60a8\u65e0\u6743\u67e5\u770b\u3002");else{var c=e.result;$.get("/tshirt/candidates",function(b){for(var b=b.shirts,e=b.length,d="",a=0;a<e;a++){var f=0;c[b[a].id]&&(f=c[b[a].id]);d+="<li><h4>No:"+b[a].id+"</h4><img src='/images/tshirt/t"+b[a].id+".jpg' id='t"+b[a].id+"' width='280' height='230' title='\u67e5\u770b\u8be6\u7ec6\u4fe1\u606f'/>";d+="<div><h2>\u540d\u79f0\uff1a"+
b[a].name+"</h2><span>\u8bbe\u8ba1\uff1a"+b[a].designer+"</span></div><div>\u7968\u6570\uff1a<em>"+f+"</em></div></li>"}$("#list").html(d);puple()},"json")}},"json");
