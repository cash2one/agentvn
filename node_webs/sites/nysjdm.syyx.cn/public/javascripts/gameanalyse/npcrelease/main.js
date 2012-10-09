$(document).ready(function(){
    $('#txtStartDate,#txtEndDate').datepicker({
                changeMonth: true,
                changeYear: true,
                dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                dateFormat: 'yy-mm-dd',
                monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                yearRange: '-60:+00',
                maxDate: '+0d',
                duration: 'fast'
            });

    $('#btnQuery').bind('click',function(){
       getNpcReleaseList();
    })
})

function getNpcReleaseList(){
    var itemList    = "";
    var itemKey     = {};
    var startDate   = $('#txtStartDate').val();
    var endDate     = $('#txtEndDate').val();
    var typeID      = $('#NpcReleaseTypeList').children('option:selected').val();

    if(!startDate || startDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询开始时间不能为空</b></font>", "error");
        return
    }

    if(!endDate || endDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询结束时间不能为空</b></font>", "error");
        return
    }

    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/link_server_list?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {},
        success:function(itemJson){  
             var itemlen  = itemJson.rows.length;
             for(var i = 0; i < itemlen; i++)
             {
                if(itemJson.rows[i].IsEnabled == 1){
                    itemList += "["+itemJson.rows[i].ServerID+"],";
                    itemKey[itemJson.rows[i].ServerID] = itemJson.rows[i].Title;
                }
             }
                itemList = itemList.substring(0,itemList.length - 1);
             $.ajax({
                url:'http://nysjdm.syyx.cn/gameanalyse/game_npcrelease_list?r='+Math.random(),
                type: "get",
                dataType: "json",
                data: {StartDate:startDate,EndDate:endDate,ServerList:itemList,TypeID:typeID},
                beforeSend: function() { $("#loading").show(); },
                complete: function() { $("#loading").hide(); },
                success: function(npcReleaseJson) {
                    $("#tableNpcRelease thead").remove();
                    $("#tableNpcRelease tbody").remove();
                    var tablehead   = "<thead><tr>";
                    var tablebody   = "<tbody>";
                    var npcReleaselen    = npcReleaseJson.rows.length;
                        tablehead += '<th>日期</th>'; 
                    for(var npcReleaseKey in npcReleaseJson.rows[0]){
                        if(itemKey[npcReleaseKey]){
                                tablehead += '<th>' + itemKey[npcReleaseKey] + '</th>';
                            }
                    }
                    tablehead += "<th>合计</th></tr></thead>";
                    $(tablehead).appendTo("#tableNpcRelease");
                    for(var j = 0; j < npcReleaselen; j++)
                    {   
                        var itemSum = 0;
                        tablebody += "<tr class='newrow'><td>"+npcReleaseJson.rows[j]["CreateDate"]+"</td>";
                        for(var itemNpcKey in npcReleaseJson.rows[0])
                        {
                           
                            if(itemNpcKey != "CreateDate"){
                                var itemCount = npcReleaseJson.rows[j][itemNpcKey] == "NULL"?0:npcReleaseJson.rows[j][itemNpcKey];
                                itemSum += itemCount;
                                tablebody += "<td>" + itemCount + "</td>";
                            }
                        }
                        tablebody += "<td>"+itemSum+"</td></tr>";
                    }
                    tablebody += "</tbody>";
                    $(tablebody).appendTo("#tableNpcRelease");
                }
            });
        }
    });
}
