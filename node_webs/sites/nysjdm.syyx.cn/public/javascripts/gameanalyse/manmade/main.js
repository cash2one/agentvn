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
       getManMadeList();
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

function getManMadeList(){
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

    $('#tableManMade').datagrid({
        url: 'http://nysjdm.syyx.cn/gameanalyse/game_manmade_list?&StartDate=' + startDate + '&EndDate=' + endDate + '&ServerID=' + serverID + '&r=' + Math.random(),
        title: '人造晶体统计',
        width: 800,
        fitColumns: true,
        nowrap: false,
        rownumbers: true,
        singleSelect: true,
        columns: [[
            { field: 'CreateDate', title: '日期', width: 80, align: 'center'},
            { field: 'JoinNum', title: '参加人数', width: 50, align: 'center' },
            { field: 'Total', title: '奖励人数', width: 50, align: 'center' },
            { field: 'Number2', title: '2个智慧果', width: 55, align: 'center' },
            { field: 'Number3', title: '3个智慧果', width: 55, align: 'center' },
            { field: 'Number4', title: '4个智慧果', width: 55, align: 'center' },
            { field: 'Number5', title: '5个智慧果', width: 55, align: 'center' },
            { field: 'Number6', title: '6个智慧果', width: 55, align: 'center' },
            { field: 'Number7', title: '7个智慧果', width: 55, align: 'center' },
            { field: 'Number8', title: '8个智慧果', width: 55, align: 'center' },
            { field: 'Number9', title: '9个智慧果', width: 55, align: 'center' },
            { field: 'Number10', title: '10个智慧果', width: 55, align: 'center' }
        ]]
    });
}
