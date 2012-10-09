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
    getAnimalInfoTypeList();

    $('#btnQuery').bind('click',function(){
       getAnimalInfoList();
    })
})

function getServerList(){
     $.ajax({
        url:'http://nysjdm.syyx.cn/Parameter/link_server_viewlist?r='+Math.random(),
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
}

function getAnimalInfoTypeList(){
      $.ajax({
        url:'http://nysjdm.syyx.cn/Parameter/config_class_list?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {ParamsType:"Animal"},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $('#AnimalInfoTypeList').empty();
            $.each(json.rows,function(i,item){
                $('<option value="'+item.ID+'"> '+$.trim(item.ClassName)+'</option>')
                    .appendTo($('#AnimalInfoTypeList'));
            })
             $('#AnimalInfoTypeList')[0].selectedIndex = 0;
        }
    });
}

function getAnimalInfoList(){
    var tableName   = "Game_RangelandAnimalInfo";
    var itemList    = "";
    var itemKey     = {};
    var serverID    = $('#serverList').children('option:selected').val();
    var startDate   = $('#txtStartDate').val();
    var endDate     = $('#txtEndDate').val();
    var classID     = $('#AnimalInfoTypeList').children('option:selected').val();
    var isAdd       = $('#InOutTypeList').children('option:selected').val();

    if(!startDate || startDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询开始时间不能为空</b></font>", "error");
        return
    }

    if(!endDate || endDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询结束时间不能为空</b></font>", "error");
        return
    }
 
    $.ajax({
        url:'http://nysjdm.syyx.cn/Parameter/config_items_list_able?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {ClassID:classID,GetType:isAdd},
        success:function(itemJson){  
             var itemlen  = itemJson.rows.length;
             for(var i = 0; i < itemlen; i++)
             {
                itemList += "["+itemJson.rows[i].ItemNo+"],";
                itemKey[itemJson.rows[i].ItemNo] = itemJson.rows[i].ItemName;
             }
                itemList = itemList.substring(0,itemList.length - 1);
             $.ajax({
                url:'http://nysjdm.syyx.cn/GameAnalyse/game_animalinfo_list?r='+Math.random(),
                type: "get",
                dataType: "json",
                data: {TableName:tableName,StartDate:startDate,EndDate:endDate,ServerID:serverID,ClassID:classID,ItemList:itemList,IsAdd:isAdd},
                beforeSend: function() { $("#loading").show(); },
                complete: function() { $("#loading").hide(); },
                success: function(animalinfoJson) {
                    $("#tableAnimalInfo thead").remove();
                    $("#tableAnimalInfo tbody").remove();
                    var tablehead   = "<thead><tr>";
                    var tablebody   = "<tbody>";
                    var animalinfolen    = animalinfoJson.rows.length;
                        tablehead += '<th>日期</th>'; 
                    for(var animalinfoKey in animalinfoJson.rows[0]){
                        if(itemKey[animalinfoKey]){
                                tablehead += '<th>' + itemKey[animalinfoKey] + '</th>';
                            }
                    }
                    tablehead += "<th>合计</th></tr></thead>";
                    $(tablehead).appendTo("#tableAnimalInfo");
                    for(var j = 0; j < animalinfolen; j++)
                    {   
                        var itemSum = 0;
                        tablebody += "<tr class='newrow'><td>"+animalinfoJson.rows[j]["CreateDate"]+"</td>";
                        for(var itemAnimalInfoKey in animalinfoJson.rows[0])
                        {
                           
                            if(itemAnimalInfoKey != "CreateDate"){
                                var itemCount = animalinfoJson.rows[j][itemAnimalInfoKey] == "NULL"?0:animalinfoJson.rows[j][itemAnimalInfoKey];
                                itemSum += itemCount;
                                tablebody += "<td>" + itemCount + "</td>";
                            }
                        }
                        tablebody += "<td>"+itemSum+"</td></tr>";
                    }
                    tablebody += "</tbody>";
                    $(tablebody).appendTo("#tableAnimalInfo");
                }
            });
        }
    });
}

