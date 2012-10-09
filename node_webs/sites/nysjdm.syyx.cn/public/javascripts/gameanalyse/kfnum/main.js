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
       getKfNumList();
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
    $('#kfNumTypeList').val(0);
}

function getKfNumList(){
    var serverID    = $('#serverList').children('option:selected').val();
    var startDate   = $('#txtStartDate').val();
    var endDate     = $('#txtEndDate').val();
    var kfType      = $('#kfNumTypeList').children('option:selected').val();

    if(!startDate || startDate == ""){
        alert("查询开始时间不能为空");
        return
    }

    if(!endDate || endDate == ""){
        alert("查询结束时间不能为空");
        return
    }

    $('#tableKfNum').datagrid({
        url: 'http://nysjdm.syyx.cn/gameanalyse/game_kfnum_list?&StartDate=' + startDate + '&EndDate=' + endDate + '&ServerID=' + serverID + '&KfType=' + kfType + '&r=' + Math.random(),
        title: '跨服活动统计',
        width: 800,
        fitColumns: true,
        nowrap: false,
        rownumbers: true,
        singleSelect: true,
        columns: [[
            { field: 'CreateDate', title: '日期', width: 80, align: 'center'},
            { field: 'Number', title: '报名人数', width: 55, align: 'center' }
        ]]
    });
}
