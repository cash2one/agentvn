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
    getMonsterDropTypeList();

    $('#btnQuery').bind('click',function(){
       getMonsterDropList();
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

function getMonsterDropTypeList(){
      $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/config_class_list?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {ParamsType:"Monster"},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $('#MonsterDropTypeList').empty();
            $.each(json.rows,function(i,item){
                $('<option value="'+item.ID+'"> '+$.trim(item.ClassName)+'</option>')
                    .appendTo($('#MonsterDropTypeList'));
            })
             $('#MonsterDropTypeList')[0].selectedIndex = 0;
        }
    });
}

function getMonsterDropList(){
    var tableName   = "Game_MonsterDrop";
    var itemList    = "";
    var itemKey     = {};
    var serverID    = $('#serverList').children('option:selected').val();
    var startDate   = $('#txtStartDate').val();
    var endDate     = $('#txtEndDate').val();
    var classID     = $('#MonsterDropTypeList').children('option:selected').val();
    var getType     = 0;

    if(!startDate || startDate == ""){
        alert("查询开始时间不能为空");
        return
    }

    if(!endDate || endDate == ""){
        alert("查询结束时间不能为空");
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
                url:'http://nysjdm.syyx.cn/gameanalyse/game_monsterdrop_list?r='+Math.random(),
                type: "get",
                dataType: "json",
                data: {TableName:tableName,StartDate:startDate,EndDate:endDate,ServerID:serverID,ClassID:classID,ItemList:itemList,GetType:getType},
                beforeSend: function() { $("#loading").show(); },
                complete: function() { $("#loading").hide(); },
                success: function(monsterdropJson) {
                    $("#tableMonsterDrop thead").remove();
                    $("#tableMonsterDrop tbody").remove();
                    var tablehead   = "<thead><tr>";
                    var tablebody   = "<tbody>";
                    var monsterdroplen    = monsterdropJson.rows.length;
                        tablehead += '<th>日期</th>'; 
                    for(var monsterdropKey in monsterdropJson.rows[0]){
                        if(itemKey[monsterdropKey]){
                                tablehead += '<th>' + itemKey[monsterdropKey] + '</th>';
                            }
                    }
                    tablehead += "<th>合计</th></tr></thead>";
                    $(tablehead).appendTo("#tableMonsterDrop");
                    for(var j = 0; j < monsterdroplen; j++)
                    {   
                        var itemSum = 0;
                        tablebody += "<tr class='newrow'><td>"+monsterdropJson.rows[j]["CreateDate"]+"</td>";
                        for(var itemMonsterDropKey in monsterdropJson.rows[0])
                        {
                           
                            if(itemMonsterDropKey != "CreateDate"){
                                var itemCount = monsterdropJson.rows[j][itemMonsterDropKey] == "NULL"?0:monsterdropJson.rows[j][itemMonsterDropKey];
                                itemSum += itemCount;
                                tablebody += "<td>" + itemCount + "</td>";
                            }
                        }
                        tablebody += "<td>"+itemSum+"</td></tr>";
                    }
                    tablebody += "</tbody>";
                    $(tablebody).appendTo("#tableMonsterDrop");
                }
            });
        }
    });
}

