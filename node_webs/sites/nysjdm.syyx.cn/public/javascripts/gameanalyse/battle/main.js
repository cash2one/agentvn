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
       getBattleList();
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
    })
    $('#txtStartDate').val('');
    $('#txtEndDate').val('');
    $('#parttimeList').val(0);
    $('#txtLine').val(0);
}

function getBattleList(){
    var serverID    = $('#serverList').children('option:selected').val();
    var startDate   = $('#txtStartDate').val();
    var endDate     = $('#txtEndDate').val();
    var flag        = $('#parttimeList').children('option:selected').val();
    var line        = $('#txtLine').val();

     if(!startDate || startDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询开始时间不能为空</b></font>", "error");
        return
    }

    if(!endDate || endDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询结束时间不能为空</b></font>", "error");
        return
    }

    if(!line || line == ""){
       line = 0;
    }

     $('#tableBattle').datagrid({
                url: 'http://nysjdm.syyx.cn/gameanalyse/game_battle_list?&StartDate=' + startDate + '&EndDate=' + endDate + '&ServerID=' + serverID + '&Line=' + line + '&Flag=' + flag + '&r=' + Math.random(),
                title: '战场统计',
                width: 800,
                fitColumns: true,
                nowrap: false,
                rownumbers: true,
                singleSelect: true,
                columns: [[
                    { field: 'CreateDate', title: '日期', width: 120, align: 'center' },
                    { field: 'Numbers', title: '所开场次', width: 80, align: 'center' },
                    { field: 'Amounts', title: '平均单场参与人数', width: 120, align: 'center' }
                ]]
        });
}