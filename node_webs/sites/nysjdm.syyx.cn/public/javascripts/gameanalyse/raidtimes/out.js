$(document).ready(function(){$("#txtStartDate,#txtEndDate").datepicker({changeMonth:!0,changeYear:!0,dayNamesMin:"\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(","),dateFormat:"yy-mm-dd",monthNamesShort:"\u4e00\u6708,\u4e8c\u6708,\u4e09\u6708,\u56db\u6708,\u4e94\u6708,\u516d\u6708,\u4e03\u6708,\u516b\u6708,\u4e5d\u6708,\u5341\u6708,\u5341\u4e00\u6708,\u5341\u4e8c\u6708".split(","),yearRange:"-60:+00",maxDate:"+0d",duration:"fast"});getServerList();getRaidTimesTypeList();$("#btnQuery").bind("click",
function(){getRaidTimesList()})});
function getServerList(){$.ajax({url:"http://nysjdm.syyx.cn/parameter/link_server_viewlist?r="+Math.random(),type:"get",dataType:"json",data:{},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(a){$("#serverList").empty();$('<option value="0">\u5168\u670d</option>').appendTo($("#serverList"));$.each(a.rows,function(a,b){$('<option value="'+b.ServerID+'"> '+b.Title+"</option>").appendTo($("#serverList"))})}});$("#txtStartDate").val("");$("#txtEndDate").val("")}
function getRaidTimesTypeList(){$.ajax({url:"http://nysjdm.syyx.cn/parameter/config_class_list?r="+Math.random(),type:"get",dataType:"json",data:{ParamsType:"Raid"},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(a){$("#RaidTimesTypeList").empty();$.each(a.rows,function(a,b){$('<option value="'+b.ID+'"> '+$.trim(b.ClassName)+"</option>").appendTo($("#RaidTimesTypeList"))});$("#RaidTimesTypeList")[0].selectedIndex=0}})}
function getRaidTimesList(){var a="",h={},b=$("#serverList").children("option:selected").val(),f=$("#txtStartDate").val(),i=$("#txtEndDate").val(),j=$("#RaidTimesTypeList").children("option:selected").val();!f||""==f?$.messager.alert("\u63d0\u793a","<font color=red><b>\u67e5\u8be2\u5f00\u59cb\u65f6\u95f4\u4e0d\u80fd\u4e3a\u7a7a</b></font>","error"):!i||""==i?$.messager.alert("\u63d0\u793a","<font color=red><b>\u67e5\u8be2\u7ed3\u675f\u65f6\u95f4\u4e0d\u80fd\u4e3a\u7a7a</b></font>","error"):$.ajax({url:"http://nysjdm.syyx.cn/parameter/config_items_list_able?r="+
Math.random(),type:"get",dataType:"json",data:{ClassID:j,GetType:0},success:function(d){for(var j=d.rows.length,e=0;e<j;e++)a+="["+d.rows[e].ItemNo+"],",h[d.rows[e].ItemNo]=d.rows[e].ItemName;a=a.substring(0,a.length-1);$.ajax({url:"http://nysjdm.syyx.cn/gameanalyse/game_raidtimes_list?r="+Math.random(),type:"get",dataType:"json",data:{StartDate:f,EndDate:i,ServerID:b,ItemList:a},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(a){$("#tableRaidTimes thead").remove();
$("#tableRaidTimes tbody").remove();var c,b="<tbody>",e=a.rows.length;c="<thead><tr><th>\u65e5\u671f</th>";for(var g in a.rows[0])h[g]&&(c+="<th>"+h[g]+"</th>");$(c+"<th>\u5408\u8ba1</th></tr></thead>").appendTo("#tableRaidTimes");for(c=0;c<e;c++){g=0;var b=b+("<tr class='newrow'><td>"+a.rows[c].CreateDate+"</td>"),d;for(d in a.rows[0])if("CreateDate"!=d){var f="NULL"==a.rows[c][d]?0:a.rows[c][d];g+=f;b+="<td>"+f+"</td>"}b+="<td>"+g+"</td></tr>"}$(b+"</tbody>").appendTo("#tableRaidTimes")}})}})};
