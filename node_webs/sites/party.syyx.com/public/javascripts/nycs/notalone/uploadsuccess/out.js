$(function(){$.get("/check_user_login?r="+Math.random(),function(a){a.login?$.get("/nycs/notalone/get_info?r="+Math.random(),function(a){0==a.length?document.location="/nycs/notalone/uploadphoto.html":set_info(a)},"json"):document.location="/nycs/notalone/login.html"},"json");$("#viewall").click(function(){top.location="/nycs/notalone/photolist.html"});$("#getrnd").click(function(){get_rndinfo($("#rolename").html().replace("\u5c0a\u656c\u7684",""))});$(".div_close").click(function(){parent.login_close()})});
function set_info(a){$("#rolename").html("\u5c0a\u656c\u7684"+a[0].RoleType);$("#roleimg").attr("src","http://r.syyx.com"+a[0].UserPicSmall);var c="\u3010\u6765\u81ea",c="\u4e9a\u6d32"!=a[0].Province&&"\u975e\u6d32"!=a[0].Province&&"\u6b27\u6d32"!=a[0].Province&&"\u7f8e\u6d32"!=a[0].Province&&"\u5927\u6d0b\u6d32"!=a[0].Province?c+a[0].Province:c+a[0].City;$("#rolefrom").html(c+"\u3011");$("#rolenick").html(a[0].NickName);get_rndinfo(a[0].RoleType);get_server_count(a[0].ServerName+"-"+a[0].RoleType,
a[0].RoleType);set_share("\u6211\u6b63\u5728\u53c2\u4e0e\u300a\u8bfa\u4e9a\u4f20\u8bf4\u300b%23\u79c0\u51fa\u8bfa\u7c73\u771f\u6211%23\u6d3b\u52a8\uff0c\u5feb\u6765\u770b\u770b\u6211\u7684\u9753\u7167\u5427~\u5728\u8fd9\u91cc\u6211\u627e\u5230\u597d\u591a\u540c\u57ce\u597d\u53cb\uff01\u5feb\u6765\u548c\u6211\u4e00\u8d77\u53c2\u4e0e\uff0c\u8fd9\u4e2a\u4ef2\u590f\u4e0d\u5b64\u5355~@\u8bfa\u4e9a\u4f20\u8bf4","http://r.syyx.com"+a[0].UserPicSmall)}
function set_share(a,c){$(".sina").click(function(){window.open("http://v.t.sina.com.cn/share/share.php?url=http://activity.syyx.com/cgweibo/index.aspx&title="+a+"&pic="+c+"&ralateUid=1703998792&appkey=3783886085","newwindow","height=487,width=642,top=100,left=300,toolbar=no,menubar=no,status=no")});$(".qq").click(function(){window.open("http://share.v.t.qq.com/index.php?c=share&a=index&url=http://activity.syyx.com/cgweibo/index.aspx&title="+a+"&pic="+c+"&appkey=801152397","newwindow","height=487,width=642,top=100,left=300,toolbar=no,menubar=no,status=no")})}
function get_rndinfo(a){a="r="+Math.random()+"&RoleType="+encodeURIComponent(a);$.get("/nycs/notalone/get_list_rnd?r="+Math.random(),a,function(a){if(0!=a.length){var b="",d;for(d in a)b+='<div class="userimg"><div class="roleimg"><img src="http://r.syyx.com'+a[d].UserPicSmall+'" /></div>\u3010\u6765\u81ea',b="\u4e9a\u6d32"!=a[d].Province&&"\u975e\u6d32"!=a[d].Province&&"\u6b27\u6d32"!=a[d].Province&&"\u7f8e\u6d32"!=a[d].Province&&"\u5927\u6d0b\u6d32"!=a[d].Province?b+a[d].Province:b+a[d].City,b+=
"\u3011<br>"+a[d].NickName,b+="</div>";$("#rndlist").html(b)}},"json")}
function get_server_count(a,c){var b={"\u66d9\u5149-\u683c\u6597\u5bb6":101538,"\u66d9\u5149-\u5251\u6b66\u58eb":228617,"\u66d9\u5149-\u67aa\u68b0\u5e08":136450,"\u66d9\u5149-\u5f02\u80fd\u8005":173124,"\u5bc2\u706d\u9886\u57df-\u683c\u6597\u5bb6":40997,"\u5bc2\u706d\u9886\u57df-\u5251\u6b66\u58eb":94728,"\u5bc2\u706d\u9886\u57df-\u67aa\u68b0\u5e08":45904,"\u5bc2\u706d\u9886\u57df-\u5f02\u80fd\u8005":66327,"\u5f02\u5ea6\u7a7a\u95f4-\u683c\u6597\u5bb6":50497,"\u5f02\u5ea6\u7a7a\u95f4-\u5251\u6b66\u58eb":122132,
"\u5f02\u5ea6\u7a7a\u95f4-\u67aa\u68b0\u5e08":60614,"\u5f02\u5ea6\u7a7a\u95f4-\u5f02\u80fd\u8005":86779,"\u70bd\u7130\u68ee\u6797-\u683c\u6597\u5bb6":65839,"\u70bd\u7130\u68ee\u6797-\u5251\u6b66\u58eb":138838,"\u70bd\u7130\u68ee\u6797-\u67aa\u68b0\u5e08":67978,"\u70bd\u7130\u68ee\u6797-\u5f02\u80fd\u8005":93778,"\u98ce\u66b4\u57ce-\u683c\u6597\u5bb6":43788,"\u98ce\u66b4\u57ce-\u5251\u6b66\u58eb":84676,"\u98ce\u66b4\u57ce-\u67aa\u68b0\u5e08":51337,"\u98ce\u66b4\u57ce-\u5f02\u80fd\u8005":70533,"\u6708\u4eae\u6e7e-\u683c\u6597\u5bb6":56887,
"\u6708\u4eae\u6e7e-\u5251\u6b66\u58eb":97587,"\u6708\u4eae\u6e7e-\u67aa\u68b0\u5e08":60656,"\u6708\u4eae\u6e7e-\u5f02\u80fd\u8005":79875,"\u661f\u9668\u5927\u9646-\u683c\u6597\u5bb6":67327,"\u661f\u9668\u5927\u9646-\u5251\u6b66\u58eb":143846,"\u661f\u9668\u5927\u9646-\u67aa\u68b0\u5e08":72166,"\u661f\u9668\u5927\u9646-\u5f02\u80fd\u8005":100159,"\u9ece\u660e\u5ce1\u8c37-\u683c\u6597\u5bb6":46317,"\u9ece\u660e\u5ce1\u8c37-\u5251\u6b66\u58eb":101069,"\u9ece\u660e\u5ce1\u8c37-\u67aa\u68b0\u5e08":50770,
"\u9ece\u660e\u5ce1\u8c37-\u5f02\u80fd\u8005":69024,"\u5929\u7a7a\u4e4b\u57ce-\u683c\u6597\u5bb6":60400,"\u5929\u7a7a\u4e4b\u57ce-\u5251\u6b66\u58eb":130812,"\u5929\u7a7a\u4e4b\u57ce-\u67aa\u68b0\u5e08":64187,"\u5929\u7a7a\u4e4b\u57ce-\u5f02\u80fd\u8005":92837,"\u81ea\u7531\u6e2f-\u683c\u6597\u5bb6":48240,"\u81ea\u7531\u6e2f-\u5251\u6b66\u58eb":86908,"\u81ea\u7531\u6e2f-\u67aa\u68b0\u5e08":55345,"\u81ea\u7531\u6e2f-\u5f02\u80fd\u8005":72881,"\u7693\u6708\u5ce1\u8c37-\u683c\u6597\u5bb6":64569,"\u7693\u6708\u5ce1\u8c37-\u5251\u6b66\u58eb":126681,
"\u7693\u6708\u5ce1\u8c37-\u67aa\u68b0\u5e08":54508,"\u7693\u6708\u5ce1\u8c37-\u5f02\u80fd\u8005":74217,"\u98ce\u4e4b\u8c37-\u683c\u6597\u5bb6":50664,"\u98ce\u4e4b\u8c37-\u5251\u6b66\u58eb":88455,"\u98ce\u4e4b\u8c37-\u67aa\u68b0\u5e08":51925,"\u98ce\u4e4b\u8c37-\u5f02\u80fd\u8005":67668,"\u4f17\u795e\u4e4b\u57df-\u683c\u6597\u5bb6":64262,"\u4f17\u795e\u4e4b\u57df-\u5251\u6b66\u58eb":115940,"\u4f17\u795e\u4e4b\u57df-\u67aa\u68b0\u5e08":50013,"\u4f17\u795e\u4e4b\u57df-\u5f02\u80fd\u8005":71035,"\u8ff7\u96fe-\u683c\u6597\u5bb6":31247,
"\u8ff7\u96fe-\u5251\u6b66\u58eb":52898,"\u8ff7\u96fe-\u67aa\u68b0\u5e08":36322,"\u8ff7\u96fe-\u5f02\u80fd\u8005":47374,"\u70c8\u65e5\u5e7b\u5c7f-\u683c\u6597\u5bb6":43616,"\u70c8\u65e5\u5e7b\u5c7f-\u5251\u6b66\u58eb":117584,"\u70c8\u65e5\u5e7b\u5c7f-\u67aa\u68b0\u5e08":45957,"\u70c8\u65e5\u5e7b\u5c7f-\u5f02\u80fd\u8005":62272,"\u7a7a\u4e2d\u82b1\u56ed-\u683c\u6597\u5bb6":58315,"\u7a7a\u4e2d\u82b1\u56ed-\u5251\u6b66\u58eb":188128,"\u7a7a\u4e2d\u82b1\u56ed-\u67aa\u68b0\u5e08":48730,"\u7a7a\u4e2d\u82b1\u56ed-\u5f02\u80fd\u8005":67673,
"\u5929\u9645\u4e91\u6d77-\u683c\u6597\u5bb6":50007,"\u5929\u9645\u4e91\u6d77-\u5251\u6b66\u58eb":192823,"\u5929\u9645\u4e91\u6d77-\u67aa\u68b0\u5e08":41756,"\u5929\u9645\u4e91\u6d77-\u5f02\u80fd\u8005":57660,"\u6781\u5929\u57ce-\u683c\u6597\u5bb6":37413,"\u6781\u5929\u57ce-\u5251\u6b66\u58eb":70840,"\u6781\u5929\u57ce-\u67aa\u68b0\u5e08":39337,"\u6781\u5929\u57ce-\u5f02\u80fd\u8005":51981,"\u795e\u4f51\u5c9b-\u683c\u6597\u5bb6":42621,"\u795e\u4f51\u5c9b-\u5251\u6b66\u58eb":71065,"\u795e\u4f51\u5c9b-\u67aa\u68b0\u5e08":43454,
"\u795e\u4f51\u5c9b-\u5f02\u80fd\u8005":59006,"\u661f\u9645\u4e4b\u95e8-\u683c\u6597\u5bb6":82389,"\u661f\u9645\u4e4b\u95e8-\u5251\u6b66\u58eb":181254,"\u661f\u9645\u4e4b\u95e8-\u67aa\u68b0\u5e08":39107,"\u661f\u9645\u4e4b\u95e8-\u5f02\u80fd\u8005":51009,"\u6c34\u4e91\u95f4-\u683c\u6597\u5bb6":124246,"\u6c34\u4e91\u95f4-\u5251\u6b66\u58eb":89120,"\u6c34\u4e91\u95f4-\u67aa\u68b0\u5e08":50180,"\u6c34\u4e91\u95f4-\u5f02\u80fd\u8005":63992,"\u8fdc\u53e4\u6218\u573a-\u683c\u6597\u5bb6":52952,"\u8fdc\u53e4\u6218\u573a-\u5251\u6b66\u58eb":122807,
"\u8fdc\u53e4\u6218\u573a-\u67aa\u68b0\u5e08":42380,"\u8fdc\u53e4\u6218\u573a-\u5f02\u80fd\u8005":54932,"\u9f99\u884c\u5929\u4e0b-\u683c\u6597\u5bb6":23578,"\u9f99\u884c\u5929\u4e0b-\u5251\u6b66\u58eb":30508,"\u9f99\u884c\u5929\u4e0b-\u67aa\u68b0\u5e08":23286,"\u9f99\u884c\u5929\u4e0b-\u5f02\u80fd\u8005":29155,"\u9f99\u5578\u82cd\u7a79-\u683c\u6597\u5bb6":24664,"\u9f99\u5578\u82cd\u7a79-\u5251\u6b66\u58eb":33928,"\u9f99\u5578\u82cd\u7a79-\u67aa\u68b0\u5e08":25149,"\u9f99\u5578\u82cd\u7a79-\u5f02\u80fd\u8005":31200,
"\u6e38\u9f99\u8c37-\u683c\u6597\u5bb6":23477,"\u6e38\u9f99\u8c37-\u5251\u6b66\u58eb":30611,"\u6e38\u9f99\u8c37-\u67aa\u68b0\u5e08":27532,"\u6e38\u9f99\u8c37-\u5f02\u80fd\u8005":31792,"\u9f99\u817e\u56db\u6d77-\u683c\u6597\u5bb6":26635,"\u9f99\u817e\u56db\u6d77-\u5251\u6b66\u58eb":46230,"\u9f99\u817e\u56db\u6d77-\u67aa\u68b0\u5e08":32554,"\u9f99\u817e\u56db\u6d77-\u5f02\u80fd\u8005":42512,"\u4e91\u9f99\u6bbf-\u683c\u6597\u5bb6":25422,"\u4e91\u9f99\u6bbf-\u5251\u6b66\u58eb":38929,"\u4e91\u9f99\u6bbf-\u67aa\u68b0\u5e08":31186,
"\u4e91\u9f99\u6bbf-\u5f02\u80fd\u8005":37943,"\u591a\u7f8e\u5723\u57df-\u683c\u6597\u5bb6":25812,"\u591a\u7f8e\u5723\u57df-\u5251\u6b66\u58eb":35133,"\u591a\u7f8e\u5723\u57df-\u67aa\u68b0\u5e08":24577,"\u591a\u7f8e\u5723\u57df-\u5f02\u80fd\u8005":35294,"\u5e7b\u5f69\u68ee\u6797-\u683c\u6597\u5bb6":19826,"\u5e7b\u5f69\u68ee\u6797-\u5251\u6b66\u58eb":34428,"\u5e7b\u5f69\u68ee\u6797-\u67aa\u68b0\u5e08":22737,"\u5e7b\u5f69\u68ee\u6797-\u5f02\u80fd\u8005":31681,"\u4e5d\u5be8\u5929\u5802-\u683c\u6597\u5bb6":11733,
"\u4e5d\u5be8\u5929\u5802-\u5251\u6b66\u58eb":21857,"\u4e5d\u5be8\u5929\u5802-\u67aa\u68b0\u5e08":14536,"\u4e5d\u5be8\u5929\u5802-\u5f02\u80fd\u8005":21026,"\u7cbe\u7075\u6d77-\u683c\u6597\u5bb6":20300,"\u7cbe\u7075\u6d77-\u5251\u6b66\u58eb":33019,"\u7cbe\u7075\u6d77-\u67aa\u68b0\u5e08":27220,"\u7cbe\u7075\u6d77-\u5f02\u80fd\u8005":35139,"\u5947\u8ff9\u4e4b\u57ce-\u683c\u6597\u5bb6":30739,"\u5947\u8ff9\u4e4b\u57ce-\u5251\u6b66\u58eb":45272,"\u5947\u8ff9\u4e4b\u57ce-\u67aa\u68b0\u5e08":30998,"\u5947\u8ff9\u4e4b\u57ce-\u5f02\u80fd\u8005":43419,
"\u592a\u9633\u795e\u5e99-\u683c\u6597\u5bb6":27231,"\u592a\u9633\u795e\u5e99-\u5251\u6b66\u58eb":46638,"\u592a\u9633\u795e\u5e99-\u67aa\u68b0\u5e08":30788,"\u592a\u9633\u795e\u5e99-\u5f02\u80fd\u8005":42848,"\u7231\u7434\u6d77-\u683c\u6597\u5bb6":25159,"\u7231\u7434\u6d77-\u5251\u6b66\u58eb":41476,"\u7231\u7434\u6d77-\u67aa\u68b0\u5e08":32661,"\u7231\u7434\u6d77-\u5f02\u80fd\u8005":42603,"\u8363\u8000\u5723\u6bbf-\u683c\u6597\u5bb6":36144,"\u8363\u8000\u5723\u6bbf-\u5251\u6b66\u58eb":72869,"\u8363\u8000\u5723\u6bbf-\u67aa\u68b0\u5e08":45864,
"\u8363\u8000\u5723\u6bbf-\u5f02\u80fd\u8005":67178,"\u4e91\u9704\u6218\u8230-\u683c\u6597\u5bb6":22272,"\u4e91\u9704\u6218\u8230-\u5251\u6b66\u58eb":24521,"\u4e91\u9704\u6218\u8230-\u67aa\u68b0\u5e08":18032,"\u4e91\u9704\u6218\u8230-\u5f02\u80fd\u8005":17428,"\u65f6\u7a7a\u96a7\u9053-\u683c\u6597\u5bb6":12492,"\u65f6\u7a7a\u96a7\u9053-\u5251\u6b66\u58eb":22330,"\u65f6\u7a7a\u96a7\u9053-\u67aa\u68b0\u5e08":15559,"\u65f6\u7a7a\u96a7\u9053-\u5f02\u80fd\u8005":23232,"\u70c8\u7130\u9886\u5730-\u683c\u6597\u5bb6":27420,
"\u70c8\u7130\u9886\u5730-\u5251\u6b66\u58eb":46163,"\u70c8\u7130\u9886\u5730-\u67aa\u68b0\u5e08":30955,"\u70c8\u7130\u9886\u5730-\u5f02\u80fd\u8005":44147,"\u661f\u7a7a\u89d2-\u683c\u6597\u5bb6":16826,"\u661f\u7a7a\u89d2-\u5251\u6b66\u58eb":18096,"\u661f\u7a7a\u89d2-\u67aa\u68b0\u5e08":14853,"\u661f\u7a7a\u89d2-\u5f02\u80fd\u8005":11350,"\u4e91\u4e4b\u5dc5-\u683c\u6597\u5bb6":25461,"\u4e91\u4e4b\u5dc5-\u5251\u6b66\u58eb":49216,"\u4e91\u4e4b\u5dc5-\u67aa\u68b0\u5e08":34952,"\u4e91\u4e4b\u5dc5-\u5f02\u80fd\u8005":46615,
"\u65e0\u6781\u754c-\u683c\u6597\u5bb6":25665,"\u65e0\u6781\u754c-\u5251\u6b66\u58eb":25775,"\u65e0\u6781\u754c-\u67aa\u68b0\u5e08":20304,"\u65e0\u6781\u754c-\u5f02\u80fd\u8005":19917};b[a]?$("#rolecount").html("\u4f60\u7684\u670d\u52a1\u5668\u4e2d\u8fd8\u6709"+b[a]+"\u540d"+c):$("#rolecount").html("\u4f60\u7684\u670d\u52a1\u5668\u4e2d\u8fd8\u670988888\u540d"+c)};
