$(document).ready(function(){$("#txtStartDate,#txtEndDate").datepicker({changeMonth:!0,changeYear:!0,dayNamesMin:"\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(","),dateFormat:"yy-mm-dd",monthNamesShort:"\u4e00\u6708,\u4e8c\u6708,\u4e09\u6708,\u56db\u6708,\u4e94\u6708,\u516d\u6708,\u4e03\u6708,\u516b\u6708,\u4e5d\u6708,\u5341\u6708,\u5341\u4e00\u6708,\u5341\u4e8c\u6708".split(","),yearRange:"-60:+00",maxDate:"+0d",duration:"fast"});getServerList();$("#btnQuery").bind("click",function(){getKfNumList()})});
function getServerList(){$.ajax({url:"http://nysjdm.syyx.cn/parameter/link_server_viewlist?r="+Math.random(),type:"get",dataType:"json",data:{},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(c){$("#serverList").empty();$('<option value="0">\u5168\u670d</option>').appendTo($("#serverList"));$.each(c.rows,function(b,a){$('<option value="'+a.ServerID+'"> '+a.Title+"</option>").appendTo($("#serverList"))})}});$("#txtStartDate").val("");$("#txtEndDate").val("");
$("#kfNumTypeList").val(0)}
function getKfNumList(){var c=$("#serverList").children("option:selected").val(),b=$("#txtStartDate").val(),a=$("#txtEndDate").val(),d=$("#kfNumTypeList").children("option:selected").val();!b||""==b?alert("\u67e5\u8be2\u5f00\u59cb\u65f6\u95f4\u4e0d\u80fd\u4e3a\u7a7a"):!a||""==a?alert("\u67e5\u8be2\u7ed3\u675f\u65f6\u95f4\u4e0d\u80fd\u4e3a\u7a7a"):$("#tableKfNum").datagrid({url:"http://nysjdm.syyx.cn/gameanalyse/game_kfnum_list?&StartDate="+b+"&EndDate="+a+"&ServerID="+c+"&KfType="+d+"&r="+Math.random(),
title:"\u8de8\u670d\u6d3b\u52a8\u7edf\u8ba1",width:800,fitColumns:!0,nowrap:!1,rownumbers:!0,singleSelect:!0,columns:[[{field:"CreateDate",title:"\u65e5\u671f",width:80,align:"center"},{field:"Number",title:"\u62a5\u540d\u4eba\u6570",width:55,align:"center"}]]})};