$(document).ready(function(){$("#txtStartDate,#txtEndDate").datepicker({changeMonth:!0,changeYear:!0,dayNamesMin:"\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(","),dateFormat:"yy-mm-dd",monthNamesShort:"\u4e00\u6708,\u4e8c\u6708,\u4e09\u6708,\u56db\u6708,\u4e94\u6708,\u516d\u6708,\u4e03\u6708,\u516b\u6708,\u4e5d\u6708,\u5341\u6708,\u5341\u4e00\u6708,\u5341\u4e8c\u6708".split(","),yearRange:"-60:+00",maxDate:"+0d",duration:"fast"});getServerList();getJiJiaTypeList();$("#btnQuery").bind("click",
function(){getJiJiaList()})});
function getServerList(){$.ajax({url:"http://nysjdm.syyx.cn/parameter/link_server_viewlist?r="+Math.random(),type:"get",dataType:"json",data:{},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(e){$("#serverList").empty();$('<option value="0">\u5168\u670d</option>').appendTo($("#serverList"));$.each(e.rows,function(a,d){$('<option value="'+d.ServerID+'"> '+d.Title+"</option>").appendTo($("#serverList"))})}});$("#txtStartDate").val("");$("#txtEndDate").val("");
$("#InOutTypeList").val(1);$("#QualityTypeList").val(2)}
function getJiJiaTypeList(){$.ajax({url:"http://nysjdm.syyx.cn/parameter/config_class_list?r="+Math.random(),type:"get",dataType:"json",data:{ParamsType:"JiJia"},beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(e){$("#JiJiaTypeList").empty();$.each(e.rows,function(a,d){$('<option value="'+d.ID+'"> '+$.trim(d.ClassName)+"</option>").appendTo($("#JiJiaTypeList"))});$("#JiJiaTypeList")[0].selectedIndex=0}})}
function getJiJiaList(){var e="",a="",d={},m=$("#serverList").children("option:selected").val(),j=$("#txtStartDate").val(),k=$("#txtEndDate").val(),l=$("#JiJiaTypeList").children("option:selected").val(),f=$("#InOutTypeList").children("option:selected").val(),n=$("#QualityTypeList").children("option:selected").val();!j||""==j?alert("\u67e5\u8be2\u5f00\u59cb\u65f6\u95f4\u4e0d\u80fd\u4e3a\u7a7a"):!k||""==k?alert("\u67e5\u8be2\u7ed3\u675f\u65f6\u95f4\u4e0d\u80fd\u4e3a\u7a7a"):(e=1==f?"Game_JiJiaCreate":
"Game_JiJiaDestroy",$.ajax({url:"http://nysjdm.syyx.cn/parameter/config_items_list_able?r="+Math.random(),type:"get",dataType:"json",data:{ClassID:l,GetType:f},success:function(i){for(var f=i.rows.length,b=0;b<f;b++)a+="["+i.rows[b].ItemNo+"],",d[i.rows[b].ItemNo]=i.rows[b].ItemName;a=a.substring(0,a.length-1);$.ajax({url:"http://nysjdm.syyx.cn/gameanalyse/game_jijia_list?r="+Math.random(),type:"get",dataType:"json",data:{TableName:e,StartDate:j,EndDate:k,ServerID:m,ClassID:l,ItemList:a,QualityID:n},
beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(a){$("#tableJiJia thead").remove();$("#tableJiJia tbody").remove();var c,g="<tbody>",e=a.rows.length;c="<thead><tr><th>\u65e5\u671f</th>";for(var h in a.rows[0])d[h]&&(c+="<th>"+d[h]+"</th>");$(c+"<th>\u5408\u8ba1</th></tr></thead>").appendTo("#tableJiJia");for(c=0;c<e;c++){h=0;var g=g+("<tr class='newrow'><td>"+a.rows[c].CreateDate+"</td>"),b;for(b in a.rows[0])if("CreateDate"!=b){var f="NULL"==
a.rows[c][b]?0:a.rows[c][b];h+=f;g+="<td>"+f+"</td>"}g+="<td>"+h+"</td></tr>"}$(g+"</tbody>").appendTo("#tableJiJia")}})}}))};
