$(document).ready(function(){$("#txtStartDate,#txtEndDate").datepicker({changeMonth:!0,changeYear:!0,dayNamesMin:"\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(","),dateFormat:"yy-mm-dd",monthNamesShort:"\u4e00\u6708,\u4e8c\u6708,\u4e09\u6708,\u56db\u6708,\u4e94\u6708,\u516d\u6708,\u4e03\u6708,\u516b\u6708,\u4e5d\u6708,\u5341\u6708,\u5341\u4e00\u6708,\u5341\u4e8c\u6708".split(","),yearRange:"-60:+00",maxDate:"+0d",duration:"fast"});getServerList();$("#btnQuery").bind("click",function(){getCivisList()})});
function getServerList(){$.ajax({url:"http://nysjdm.syyx.cn/parameter/link_server_viewlist?r="+Math.random(),type:"get",dataType:"json",data:{},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(c){$("#serverList").empty();$('<option value="0">\u5168\u670d</option>').appendTo($("#serverList"));$.each(c.rows,function(b,a){$('<option value="'+a.ServerID+'"> '+a.Title+"</option>").appendTo($("#serverList"))})}});$("#txtStartDate").val("");$("#txtEndDate").val("")}
function getCivisList(){var c=$("#serverList").children("option:selected").val(),b=$("#txtStartDate").val(),a=$("#txtEndDate").val();!b||""==b?alert("\u67e5\u8be2\u5f00\u59cb\u65f6\u95f4\u4e0d\u80fd\u4e3a\u7a7a"):!a||""==a?alert("\u67e5\u8be2\u7ed3\u675f\u65f6\u95f4\u4e0d\u80fd\u4e3a\u7a7a"):$("#tableCivis").datagrid({url:"http://nysjdm.syyx.cn/gameanalyse/game_civis_list?&StartDate="+b+"&EndDate="+a+"&ServerID="+c+"&r="+Math.random(),title:"\u5e02\u6c11\u7b49\u7ea7\u7edf\u8ba1",width:800,fitColumns:!0,
nowrap:!1,rownumbers:!0,singleSelect:!0,columns:[[{field:"CreateDate",title:"\u65e5\u671f",width:120,align:"center"},{field:"Grade-5",title:"-5",width:60,align:"center"},{field:"Grade-4",title:"-4",width:60,align:"center"},{field:"Grade-3",title:"-3",width:60,align:"center"},{field:"Grade-2",title:"-2",width:60,align:"center"},{field:"Grade-1",title:"-1",width:60,align:"center"},{field:"Grade0",title:"0",width:60,align:"center"},{field:"Grade1",title:"1",width:60,align:"center"},{field:"Grade2",title:"2",
width:60,align:"center"},{field:"Grade3",title:"3",width:60,align:"center"},{field:"Grade4",title:"4",width:60,align:"center"},{field:"Grade5",title:"5",width:60,align:"center"}]]})};
