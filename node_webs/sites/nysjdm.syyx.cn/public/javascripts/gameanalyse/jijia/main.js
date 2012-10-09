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
    getJiJiaTypeList();

    $('#btnQuery').bind('click',function(){
       getJiJiaList();
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
    $('#InOutTypeList').val(1);
     $('#QualityTypeList').val(2);
}

function getJiJiaTypeList(){
      $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/config_class_list?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {ParamsType:"JiJia"},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $('#JiJiaTypeList').empty();
            $.each(json.rows,function(i,item){
                $('<option value="'+item.ID+'"> '+$.trim(item.ClassName)+'</option>')
                    .appendTo($('#JiJiaTypeList'));
            })
             $('#JiJiaTypeList')[0].selectedIndex = 0;
        }
    });
}

function getJiJiaList(){
    var tableName   = "";
    var itemList    = "";
    var itemKey     = {};
    var serverID    = $('#serverList').children('option:selected').val();
    var startDate   = $('#txtStartDate').val();
    var endDate     = $('#txtEndDate').val();
    var classID     = $('#JiJiaTypeList').children('option:selected').val();
    var getType     = $('#InOutTypeList').children('option:selected').val();
    var qualityID   = $('#QualityTypeList').children('option:selected').val();

    if(!startDate || startDate == ""){
        alert("查询开始时间不能为空");
        return
    }

    if(!endDate || endDate == ""){
        alert("查询结束时间不能为空");
        return
    }

    if(getType == 1){
        tableName = "Game_JiJiaCreate";
    }
    else{
        tableName = "Game_JiJiaDestroy";
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
                url:'http://nysjdm.syyx.cn/gameanalyse/game_jijia_list?r='+Math.random(),
                type: "get",
                dataType: "json",
                data: {TableName:tableName,StartDate:startDate,EndDate:endDate,ServerID:serverID,ClassID:classID,ItemList:itemList,QualityID:qualityID},
                beforeSend: function() { $("#loading").show(); },
                complete: function() { $("#loading").hide(); },
                success: function(jijiaJson) {
                    $("#tableJiJia thead").remove();
                    $("#tableJiJia tbody").remove();
                    var tablehead   = "<thead><tr>";
                    var tablebody   = "<tbody>";
                    var jijialen    = jijiaJson.rows.length;
                        tablehead += '<th>日期</th>'; 
                    for(var jijiaKey in jijiaJson.rows[0]){
                        if(itemKey[jijiaKey]){
                                tablehead += '<th>' + itemKey[jijiaKey] + '</th>';
                            }
                    }
                    tablehead += "<th>合计</th></tr></thead>";
                    $(tablehead).appendTo("#tableJiJia");
                    for(var j = 0; j < jijialen; j++)
                    {   
                        var itemSum = 0;
                        tablebody += "<tr class='newrow'><td>"+jijiaJson.rows[j]["CreateDate"]+"</td>";
                        for(var itemJiJiaKey in jijiaJson.rows[0])
                        {
                           
                            if(itemJiJiaKey != "CreateDate"){
                                var itemCount = jijiaJson.rows[j][itemJiJiaKey] == "NULL"?0:jijiaJson.rows[j][itemJiJiaKey];
                                itemSum += itemCount;
                                tablebody += "<td>" + itemCount + "</td>";
                            }
                        }
                        tablebody += "<td>"+itemSum+"</td></tr>";
                    }
                    tablebody += "</tbody>";
                    $(tablebody).appendTo("#tableJiJia");
                }
            });
        }
    });
}

