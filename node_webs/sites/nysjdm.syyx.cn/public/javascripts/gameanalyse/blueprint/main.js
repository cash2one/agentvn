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
    
    getServerList();

    $('#btnQuery').bind('click',function(){
       getBluePrintList();
    })
})

function getServerList(){
     $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/link_server_viewlist?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $('#serverList').empty();
            $('<option value="0">全服</option>').appendTo($('#serverList'));
            $.each(json.rows,function(i,item){
                $('<option value="'+item.ServerID+'"> '+item.Title+'</option>')
                    .appendTo($('#serverList'));
            })
        }
    });
    $('#txtStartDate').val('');
    $('#txtEndDate').val('');
}

function getBluePrintList(){
    var tableName       = "";
    var itemList        = "";
    var itemKey         = {};
    var serverID        = $('#serverList').children('option:selected').val();
    var startDate       = $('#txtStartDate').val();
    var endDate         = $('#txtEndDate').val();
    var blueprintID     = $('#QualityTypeList').children('option:selected').val();
    var qualityID       = $('#ProfilesTypeList').children('option:selected').val();
    var levels          = $('#GradeTypeList').children('option:selected').val();
    var getType         = $('#InOutTypeList').children('option:selected').val();

    if(!startDate || startDate == ""){
        alert("查询开始时间不能为空");
        return
    }

    if(!endDate || endDate == ""){
        alert("查询结束时间不能为空");
        return
    }

    if(getType == 1){
        tableName = "Game_BlueprintCreate";
    }else{
        tableName = "Game_BlueprintDestroy";
    }


    $.ajax({
        url:'http://nysjdm.syyx.cn/gameanalyse/game_blueprint_source_list?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {TableName:tableName,ServerID:serverID,StartDate:startDate,EndDate:endDate,BlueprintID:blueprintID,QualityID:qualityID,Levels:levels},
        success:function(itemJson){  
             var itemlen  = itemJson.rows.length;
             for(var i = 0; i < itemlen; i++)
             {
                itemList += "["+itemJson.rows[i].ItemNo+"],";
                itemKey[itemJson.rows[i].ItemNo] = itemJson.rows[i].ItemName;
             }
                itemList = itemList.substring(0,itemList.length - 1);
             $.ajax({
                url:'http://nysjdm.syyx.cn/GameAnalyse/game_blueprint_list?r='+Math.random(),
                type: "get",
                dataType: "json",
                data: {TableName:tableName,ServerID:serverID,StartDate:startDate,EndDate:endDate,BlueprintID:blueprintID,QualityID:qualityID,Levels:levels,ItemList:itemList},
                beforeSend: function() { $("#loading").show(); },
                complete: function() { $("#loading").hide(); },
                success: function(blueprintJson) {
                    $("#tableBluePrint thead").remove();
                    $("#tableBluePrint tbody").remove();
                    var tablehead   = "<thead><tr>";
                    var tablebody   = "<tbody>";
                    var blueprintlen    = blueprintJson.rows.length;
                        tablehead += '<th>日期</th>'; 
                    for(var blueprintKey in blueprintJson.rows[0]){
                        if(itemKey[blueprintKey]){
                                tablehead += '<th>' + itemKey[blueprintKey] + '</th>';
                            }
                    }
                    tablehead += "<th>合计</th></tr></thead>";
                    $(tablehead).appendTo("#tableBluePrint");
                    for(var j = 0; j < blueprintlen; j++)
                    {   
                        var itemSum = 0;
                        tablebody += "<tr class='newrow'><td>"+blueprintJson.rows[j]["CreateDate"]+"</td>";
                        for(var itemBluePrintKey in blueprintJson.rows[0])
                        {
                           
                            if(itemBluePrintKey != "CreateDate"){
                                var itemCount = blueprintJson.rows[j][itemBluePrintKey] == "NULL"?0:blueprintJson.rows[j][itemBluePrintKey];
                                itemSum += itemCount;
                                tablebody += "<td>" + itemCount + "</td>";
                            }
                        }
                        tablebody += "<td>"+itemSum+"</td></tr>";
                    }
                    tablebody += "</tbody>";
                    $(tablebody).appendTo("#tableBluePrint");
                }
            });
        }
    });
}

