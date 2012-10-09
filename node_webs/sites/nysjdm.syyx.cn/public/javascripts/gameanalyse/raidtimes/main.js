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
    getRaidTimesTypeList();

    $('#btnQuery').bind('click',function(){
       getRaidTimesList();
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

function getRaidTimesTypeList(){
      $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/config_class_list?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {ParamsType:"Raid"},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $('#RaidTimesTypeList').empty();
            $.each(json.rows,function(i,item){
                $('<option value="'+item.ID+'"> '+$.trim(item.ClassName)+'</option>')
                    .appendTo($('#RaidTimesTypeList'));
            })
             $('#RaidTimesTypeList')[0].selectedIndex = 0;
        }
    });
}

function getRaidTimesList(){
    var itemList    = "";
    var itemKey     = {};
    var serverID    = $('#serverList').children('option:selected').val();
    var startDate   = $('#txtStartDate').val();
    var endDate     = $('#txtEndDate').val();
    var classID     = $('#RaidTimesTypeList').children('option:selected').val();
    var getType     = 0;
    
    if(!startDate || startDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询开始时间不能为空</b></font>", "error");
        return
    }

    if(!endDate || endDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询结束时间不能为空</b></font>", "error");
        return
    }

    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/config_items_list_able?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {ClassID:classID,GetType:getType},
        success:function(itemJson){  
             var itemlen  = itemJson.rows.length;
             for(var i = 0; i < itemlen; i++)
             {
                itemList += "["+itemJson.rows[i].ItemNo+"],";
                itemKey[itemJson.rows[i].ItemNo] = itemJson.rows[i].ItemName;
             }
                itemList = itemList.substring(0,itemList.length - 1);
             $.ajax({
                url:'http://nysjdm.syyx.cn/gameanalyse/game_raidtimes_list?r='+Math.random(),
                type: "get",
                dataType: "json",
                data: {StartDate:startDate,EndDate:endDate,ServerID:serverID,ItemList:itemList},
                beforeSend: function() { $("#loading").show(); },
                complete: function() { $("#loading").hide(); },
                success: function(raidtimesJson) {
                    $("#tableRaidTimes thead").remove();
                    $("#tableRaidTimes tbody").remove();
                    var tablehead   = "<thead><tr>";
                    var tablebody   = "<tbody>";
                    var raidtimeslen    = raidtimesJson.rows.length;
                        tablehead += '<th>日期</th>'; 
                    for(var raidtimesKey in raidtimesJson.rows[0]){
                        if(itemKey[raidtimesKey]){
                                tablehead += '<th>' + itemKey[raidtimesKey] + '</th>';
                            }
                    }
                    tablehead += "<th>合计</th></tr></thead>";
                    $(tablehead).appendTo("#tableRaidTimes");
                    for(var j = 0; j < raidtimeslen; j++)
                    {   
                        var itemSum = 0;
                        tablebody += "<tr class='newrow'><td>"+raidtimesJson.rows[j]["CreateDate"]+"</td>";
                        for(var itemRaidTimesKey in raidtimesJson.rows[0])
                        {
                           
                            if(itemRaidTimesKey != "CreateDate"){
                                var itemCount = raidtimesJson.rows[j][itemRaidTimesKey] == "NULL"?0:raidtimesJson.rows[j][itemRaidTimesKey];
                                itemSum += itemCount;
                                tablebody += "<td>" + itemCount + "</td>";
                            }
                        }
                        tablebody += "<td>"+itemSum+"</td></tr>";
                    }
                    tablebody += "</tbody>";
                    $(tablebody).appendTo("#tableRaidTimes");
                }
            });
        }
    });
}

