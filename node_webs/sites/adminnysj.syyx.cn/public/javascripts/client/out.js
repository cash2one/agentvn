$(function(){add_client_category();get_client_list();bind_event(my_bind)});
function add_client_category(){var a=$("#sidebar .setting .add_client_category"),b=$("#add_client_category_form"),d=a.find(".loading"),c=a.find(".show_result"),e=a.find(".article_client_content input");$("#sidebar .setting button.set").click(function(){a.fadeIn()});$("#sidebar .setting .add_client_category footer button.grey").click(function(b){b.preventDefault();a.fadeOut()});$("#sidebar .setting .add_client_category footer input.blue").click(function(f){document.getElementById("add_client_category_form").checkValidity()&&($.ajax({type:"post",
data:b.serialize(),url:b.attr("action"),beforeSend:function(){d.show()},success:function(){d.hide();c.show(function(){c.fadeOut(1E3,function(){e.val("");a.fadeOut(function(){location.href=location.href})})})}}),f.preventDefault())})}function get_client_list(){$.ajax({url:"/client/find",success:function(a){null!=a&&(0==a.ok?alert("\u83b7\u53d6\u6570\u636e\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5"):render_client_list(a))}})}
function show_or_hide_panel(a){var b=$("#save_client_option_panel"),d=$("#detail_overlay");a?(b.show(),d.animate({left:0})):($("#client_list .item_wrapper .item_title").removeClass("editing"),d.animate({left:-394},function(){b.hide()}))}
function render_client_list(a){var b=$("#client_list .item_wrapper");b.empty();$.each(a,function(a,c){b.append('<li><a class="item_title" name="'+c.link+'" href="'+c._id+'"><h3 name="'+c.md5+'">'+c.name+'</h3><span class="downloads">\u4e0b\u8f7d\uff1a'+c.downloads+'</span><span class="install">\u5b89\u88c5\uff1a'+c.install+'</span><span class="client_size">'+c.size+'</span><span class="client_version">'+c.version+"</span></a></li>")});edit_item()}
function edit_item(){$("#client_list .item_wrapper .item_title").click(function(a){var b={id:$(this).attr("href"),link:$(this).attr("name"),name:$(this).find("h3").html(),size:$(this).find(".client_size").html(),version:$(this).find(".client_version").html(),md5:$(this).find("h3").attr("name")};$("#client_list .item_wrapper .item_title").removeClass("editing");$(this).addClass("editing");empty_client_option_form();fill_client_option_form(b);show_or_hide_panel(!0);a.preventDefault()})}
function empty_client_option_form(){var a=$("#client_option_form");a.find('input[name="client_id"]').val("");a.find('input[name="name"]').val("");a.find('input[name="size"]').val("");a.find('input[name="version"]').val("");a.find('input[name="md5"]').val("");$("#client_link_group").empty()}
function fill_client_option_form(a){var b=$("#client_option_form");b.find('input[name="client_id"]').val(a.id);b.find('input[name="name"]').val(a.name);b.find('input[name="size"]').val(a.size);b.find('input[name="version"]').val(a.version);b.find('input[name="md5"]').val(a.md5);var d=a.link.split(","),c="";$.each(d,function(a,b){c=a==d.length-1?b+c:"\r\n"+b+c});$("#client_link_group").val(c)}function bind_event(a){for(var b in a)a[b]()}
var my_bind={save_client_option:function(){var a=$("#save_client_option_panel .panel_action input.save"),b=$("#client_option_form"),d=$("#save_client_option_panel .panel_action .progress");a.click(function(a){document.getElementById("client_option_form").checkValidity()&&($.ajax({type:"post",data:b.serialize(),url:b.attr("action"),beforeSend:function(){d.show()},success:function(a){1!==a.ok?alert("\u4fdd\u5b58\u5931\u8d25"):(d.html("\u4fdd\u5b58\u5b8c\u6210").delay(1E3).fadeOut(function(){show_or_hide_panel(!1)}),
get_client_list())}}),a.preventDefault())})},close_panel:function(){$(".panel_action_bottom .close_panel").click(function(a){empty_client_option_form();show_or_hide_panel(!1);a.preventDefault()})},trash_client:function(){$(".panel_action_bottom .trash_item").click(function(a){var b=$('#client_option_form input[name="client_id"]').val();a.preventDefault();b?confirm("\u786e\u8ba4\u5220\u9664\uff1f")&&$.ajax({type:"post",url:$(this).attr("href"),data:{client_id:b},success:function(a){1==a.ok?(alert("\u5220\u9664\u6210\u529f"),
get_client_list(),show_or_hide_panel(!1)):alert("\u5220\u9664\u5931\u8d25")}}):alert("\u6ca1\u6709\u5185\u5bb9\u53ef\u5220\u9664")})}};
