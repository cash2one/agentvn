var page_by_date=0;$(function(){get_detail();activate_setting();switch_section()});function get_detail(){$("#get_more_detail").click(function(a){get_code_detail();a.preventDefault()});get_code_detail()}
function activate_setting(){$.ajax({url:"activate_setting",success:function(a){a&&($('#activate_setting_form input[type="hidden"]').val(a._id),$('#activate_setting_form input[type="number"]:eq(0)').val(a.perhour_max_count),$('#activate_setting_form input[type="number"]:eq(1)').val(a.perminute_max_count))}});$('#activate_setting_form input[type="submit"]').click(function(a){document.getElementById("activate_setting_form").checkValidity()&&($.ajax({type:"post",data:$("#activate_setting_form").serialize(),
url:$("#activate_setting_form").attr("action"),success:function(){alert("\u8bbe\u7f6e\u6210\u529f")}}),a.preventDefault())})}
function get_code_detail(){$.ajax({type:"get",url:"/activate_detail",data:{page:page_by_date},success:function(a){1>a.length?(page_by_date++,alert("\u6ca1\u6709\u6570\u636e")):($("#client_list").append('<div class="section_bar"><button class="switch_section_btn"></button><span class="section_name">'+a[0].created_time+'</span><a href="/exports_code_detail?data_distance='+page_by_date+'">\u5bfc\u51fa</a></div>'),$("#client_list").append("<table><tr><th>\u6fc0\u6d3b\u7801<span>("+count_key_num(a,"code")+
")</span></th><th>\u53c2\u4e0e\u624b\u673a<span>("+count_key_num(a,"mobile_number")+")</span></th><th>\u95ee\u9898\u4e00</th><th>\u95ee\u9898\u4e8c</th><th>\u4e2d\u5956\u65f6\u95f4</th><th>\u6fc0\u6d3b<span>("+count_key_num(a,"sended_time")+")</span></th><th>\u8d26\u53f7</th></tr></table>"),$.each(a,function(a,b){$("#client_list table:last").append("<tr><td>"+convert_to_blank(b.code)+"</td><td>"+b.mobile_number+"</td><td>"+b.question1+"</td><td>"+b.question2+"</td><td>"+convert_to_blank(b.get_time)+
"</td><td>"+convert_to_blank(b.sended_time)+"</td><td>"+convert_to_blank(b.account)+"</td></tr>")}),page_by_date++)}})}function convert_to_blank(a){return void 0==a?"":a}function count_key_num(a,c){var b=0;a.forEach(function(a){a[c]&&b++});return b}function switch_section(){$("#client_list").delegate(".switch_section_btn","click",function(){var a=$(this).parent().next();$(this).hasClass("closed")?(a.show(),$(this).removeClass("closed")):(a.hide(),$(this).addClass("closed"))})};
