$(document).ready(function(){$("#txtStartDate,#txtEndDate").datepicker({changeMonth:!0,changeYear:!0,dayNamesMin:"\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(","),dateFormat:"yy-mm-dd",monthNamesShort:"\u4e00\u6708,\u4e8c\u6708,\u4e09\u6708,\u56db\u6708,\u4e94\u6708,\u516d\u6708,\u4e03\u6708,\u516b\u6708,\u4e5d\u6708,\u5341\u6708,\u5341\u4e00\u6708,\u5341\u4e8c\u6708".split(","),yearRange:"-60:+00",maxDate:"+0d",duration:"fast"});getServerList();getMonsterDropTypeList();$("#btnQuery").bind("click",
function(){getMonsterDropList()})});
function getServerList(){$.ajax({url:"http://nysjdm.syyx.cn/parameter/link_server_viewlist?r="+Math.random(),type:"get",dataType:"json",data:{},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(a){$("#serverList").empty();$('<option value="0">\u5168\u670d</option>').appendTo($("#serverList"));$.each(a.rows,function(a,b){$('<option value="'+b.ServerID+'"> '+b.Title+"</option>").appendTo($("#serverList"))})}});$("#txtStartDate").val("");$("#txtEndDate").val("")}
function getMonsterDropTypeList(){$.ajax({url:"http://nysjdm.syyx.cn/parameter/config_class_list?r="+Math.random(),type:"get",dataType:"json",data:{ParamsType:"Monster"},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(a){$("#MonsterDropTypeList").empty();$.each(a.rows,function(a,b){$('<option value="'+b.ID+'"> '+$.trim(b.ClassName)+"</option>").appendTo($("#MonsterDropTypeList"))});$("#MonsterDropTypeList")[0].selectedIndex=0}})}
function getMonsterDropList(){var a="",h={},b=$("#serverList").children("option:selected").val(),f=$("#txtStartDate").val(),i=$("#txtEndDate").val(),j=$("#MonsterDropTypeList").children("option:selected").val();!f||""==f?alert("\u67e5\u8be2\u5f00\u59cb\u65f6\u95f4\u4e0d\u80fd\u4e3a\u7a7a"):!i||""==i?alert("\u67e5\u8be2\u7ed3\u675f\u65f6\u95f4\u4e0d\u80fd\u4e3a\u7a7a"):$.ajax({url:"http://nysjdm.syyx.cn/parameter/config_items_list_able?r="+Math.random(),type:"get",dataType:"json",data:{ClassID:j,GetType:0},
success:function(d){for(var k=d.rows.length,e=0;e<k;e++)a+="["+d.rows[e].ItemNo+"],",h[d.rows[e].ItemNo]=d.rows[e].ItemName;a=a.substring(0,a.length-1);$.ajax({url:"http://nysjdm.syyx.cn/gameanalyse/game_monsterdrop_list?r="+Math.random(),type:"get",dataType:"json",data:{TableName:"Game_MonsterDrop",StartDate:f,EndDate:i,ServerID:b,ClassID:j,ItemList:a,GetType:0},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(a){$("#tableMonsterDrop thead").remove();
$("#tableMonsterDrop tbody").remove();var c,b="<tbody>",e=a.rows.length;c="<thead><tr><th>\u65e5\u671f</th>";for(var g in a.rows[0])h[g]&&(c+="<th>"+h[g]+"</th>");$(c+"<th>\u5408\u8ba1</th></tr></thead>").appendTo("#tableMonsterDrop");for(c=0;c<e;c++){g=0;var b=b+("<tr class='newrow'><td>"+a.rows[c].CreateDate+"</td>"),d;for(d in a.rows[0])if("CreateDate"!=d){var f="NULL"==a.rows[c][d]?0:a.rows[c][d];g+=f;b+="<td>"+f+"</td>"}b+="<td>"+g+"</td></tr>"}$(b+"</tbody>").appendTo("#tableMonsterDrop")}})}})}
;
