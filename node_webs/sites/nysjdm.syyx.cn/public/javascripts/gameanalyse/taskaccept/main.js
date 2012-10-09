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
        var serverID    = $('#serverList').children('option:selected').val();
        var startDate   = $('#txtStartDate').val();
        var endDate     = $('#txtEndDate').val();
        if(!startDate || startDate == ""){
        alert("查询开始时间不能为空");
        return
        }
        if(!endDate || endDate == ""){
        alert("查询结束时间不能为空");
        return
        }

        getTaskAccept003List(serverID,startDate,endDate,"10000003");
        getTaskAccept004List(serverID,startDate,endDate,"10000004");
        getTaskAccept014List(serverID,startDate,endDate,"10000014");
        getTaskFiveColorList(serverID,startDate,endDate);
        getTaskLoopList(serverID,startDate,endDate);
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
            $.each(json.rows,function(i,item){
                $('<option value="'+item.ServerID+'"> '+item.Title+'</option>')
                    .appendTo($('#serverList'));
            })
        }
    });
    $('#txtStartDate').val('');
    $('#txtEndDate').val('');
}

function getTaskFiveColorList(serverID,startDate,endDate){
    $('#divTaskFiveColorDetail').datagrid({
        url: 'http://nysjdm.syyx.cn/gameanalyse/game_taskfivecolor_list?ServerID=' + serverID + '&StartDate=' + startDate + '&EndDate=' + endDate + '&r=' + Math.random(),
        fitColumns: false,
        nowrap: false,
        rownumbers: true,
        singleSelect: true,
        columns: [[
                    { field: 'CreateDate', title: '日期', width: 120, align: 'center'},
                    { field: 'White', title: '白色', width: 80, align: 'center' },
                    { field: 'Blue', title: '蓝色', width: 80, align: 'center' },
                    { field: 'Green', title: '绿色', width: 80, align: 'center' },
                    { field: 'Golden', title: '金色', width:80, align: 'center' },
                    { field: 'Orange', title: '橙色', width: 80, align: 'center' }
                ]]
    });
}

function getTaskAccept003List(serverID,startDate,endDate,taskID){
     $('#divTask003Detail').datagrid({
         url: 'http://nysjdm.syyx.cn/gameanalyse/game_taskaccept_list?ServerID=' + serverID + '&StartDate=' + startDate + '&EndDate=' + endDate + '&TaskID=' + taskID +'&r=' + Math.random(),
        fitColumns: false,
        nowrap: false,
        rownumbers: true,
        singleSelect: true,
        columns: [[
                    { field: 'CreateDate', title: '日期', width: 120, align: 'center' },
                    { field: 'Times', title: '平均完成次数', width: 120, align: 'center' }
                ]]
    });
}

function getTaskAccept004List(serverID,startDate,endDate,taskID){
     $('#divTask004Detail').datagrid({
         url: 'http://nysjdm.syyx.cn/gameanalyse/game_taskaccept_list?ServerID=' + serverID + '&StartDate=' + startDate + '&EndDate=' + endDate + '&TaskID=' + taskID +'&r=' + Math.random(),
        fitColumns: false,
        nowrap: false,
        rownumbers: true,
        singleSelect: true,
        columns: [[
                    { field: 'CreateDate', title: '日期', width: 120, align: 'center' },
                    { field: 'Times', title: '平均完成次数', width: 120, align: 'center' }
                ]]
    });
}

function getTaskAccept014List(serverID,startDate,endDate,taskID){
     $('#divTask014Detail').datagrid({
         url: 'http://nysjdm.syyx.cn/gameanalyse/game_taskaccept_list?ServerID=' + serverID + '&StartDate=' + startDate + '&EndDate=' + endDate + '&TaskID=' + taskID +'&r=' + Math.random(),
        fitColumns: false,
        nowrap: false,
        rownumbers: true,
        singleSelect: true,
        columns: [[
                    { field: 'CreateDate', title: '日期', width: 120, align: 'center' },
                    { field: 'Times', title: '平均完成次数', width: 120, align: 'center' }
                ]]
    });
}

function getTaskLoopList(serverID,startDate,endDate){
     $('#divTaskLoopDetail').datagrid({
         url: 'http://nysjdm.syyx.cn/gameanalyse/game_taskloop_list?ServerID=' + serverID + '&StartDate=' + startDate + '&EndDate=' + endDate + '&r=' + Math.random(),
        fitColumns: false,
        nowrap: false,
        rownumbers: true,
        singleSelect: true,
         columns: [[
                    { field: 'WeekID', title: '周', width: 120, align: 'center' },
                    { field: 'Times', title: '平均完成次数', width: 120, align: 'center' }
                ]]
    });
}

