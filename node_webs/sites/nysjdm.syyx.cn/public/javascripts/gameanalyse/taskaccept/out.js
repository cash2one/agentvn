$(document).ready(function(){$("#txtStartDate,#txtEndDate").datepicker({changeMonth:!0,changeYear:!0,dayNamesMin:"\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(","),dateFormat:"yy-mm-dd",monthNamesShort:"\u4e00\u6708,\u4e8c\u6708,\u4e09\u6708,\u56db\u6708,\u4e94\u6708,\u516d\u6708,\u4e03\u6708,\u516b\u6708,\u4e5d\u6708,\u5341\u6708,\u5341\u4e00\u6708,\u5341\u4e8c\u6708".split(","),yearRange:"-60:+00",maxDate:"+0d",duration:"fast"});getServerList();$("#btnQuery").bind("click",function(){var c=
$("#serverList").children("option:selected").val(),b=$("#txtStartDate").val(),a=$("#txtEndDate").val();!b||""==b?alert("\u67e5\u8be2\u5f00\u59cb\u65f6\u95f4\u4e0d\u80fd\u4e3a\u7a7a"):!a||""==a?alert("\u67e5\u8be2\u7ed3\u675f\u65f6\u95f4\u4e0d\u80fd\u4e3a\u7a7a"):(getTaskAccept003List(c,b,a,"10000003"),getTaskAccept004List(c,b,a,"10000004"),getTaskAccept014List(c,b,a,"10000014"),getTaskFiveColorList(c,b,a),getTaskLoopList(c,b,a))})});
function getServerList(){$.ajax({url:"http://nysjdm.syyx.cn/parameter/link_server_viewlist?r="+Math.random(),type:"get",dataType:"json",data:{},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(c){$("#serverList").empty();$.each(c.rows,function(b,a){$('<option value="'+a.ServerID+'"> '+a.Title+"</option>").appendTo($("#serverList"))})}});$("#txtStartDate").val("");$("#txtEndDate").val("")}
function getTaskFiveColorList(c,b,a){$("#divTaskFiveColorDetail").datagrid({url:"http://nysjdm.syyx.cn/gameanalyse/game_taskfivecolor_list?ServerID="+c+"&StartDate="+b+"&EndDate="+a+"&r="+Math.random(),fitColumns:!1,nowrap:!1,rownumbers:!0,singleSelect:!0,columns:[[{field:"CreateDate",title:"\u65e5\u671f",width:120,align:"center"},{field:"White",title:"\u767d\u8272",width:80,align:"center"},{field:"Blue",title:"\u84dd\u8272",width:80,align:"center"},{field:"Green",title:"\u7eff\u8272",width:80,align:"center"},
{field:"Golden",title:"\u91d1\u8272",width:80,align:"center"},{field:"Orange",title:"\u6a59\u8272",width:80,align:"center"}]]})}
function getTaskAccept003List(c,b,a,d){$("#divTask003Detail").datagrid({url:"http://nysjdm.syyx.cn/gameanalyse/game_taskaccept_list?ServerID="+c+"&StartDate="+b+"&EndDate="+a+"&TaskID="+d+"&r="+Math.random(),fitColumns:!1,nowrap:!1,rownumbers:!0,singleSelect:!0,columns:[[{field:"CreateDate",title:"\u65e5\u671f",width:120,align:"center"},{field:"Times",title:"\u5e73\u5747\u5b8c\u6210\u6b21\u6570",width:120,align:"center"}]]})}
function getTaskAccept004List(c,b,a,d){$("#divTask004Detail").datagrid({url:"http://nysjdm.syyx.cn/gameanalyse/game_taskaccept_list?ServerID="+c+"&StartDate="+b+"&EndDate="+a+"&TaskID="+d+"&r="+Math.random(),fitColumns:!1,nowrap:!1,rownumbers:!0,singleSelect:!0,columns:[[{field:"CreateDate",title:"\u65e5\u671f",width:120,align:"center"},{field:"Times",title:"\u5e73\u5747\u5b8c\u6210\u6b21\u6570",width:120,align:"center"}]]})}
function getTaskAccept014List(c,b,a,d){$("#divTask014Detail").datagrid({url:"http://nysjdm.syyx.cn/gameanalyse/game_taskaccept_list?ServerID="+c+"&StartDate="+b+"&EndDate="+a+"&TaskID="+d+"&r="+Math.random(),fitColumns:!1,nowrap:!1,rownumbers:!0,singleSelect:!0,columns:[[{field:"CreateDate",title:"\u65e5\u671f",width:120,align:"center"},{field:"Times",title:"\u5e73\u5747\u5b8c\u6210\u6b21\u6570",width:120,align:"center"}]]})}
function getTaskLoopList(c,b,a){$("#divTaskLoopDetail").datagrid({url:"http://nysjdm.syyx.cn/gameanalyse/game_taskloop_list?ServerID="+c+"&StartDate="+b+"&EndDate="+a+"&r="+Math.random(),fitColumns:!1,nowrap:!1,rownumbers:!0,singleSelect:!0,columns:[[{field:"WeekID",title:"\u5468",width:120,align:"center"},{field:"Times",title:"\u5e73\u5747\u5b8c\u6210\u6b21\u6570",width:120,align:"center"}]]})};
