$(document).ready(function(){
	$('#txtStatDate').datepicker({
                changeMonth: true,
                changeYear: true,
                dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                dateFormat: 'yy-mm-dd',
                monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                yearRange: '-60:+00',
                maxDate: '+0d',
                duration: 'fast'
            });
	$('#txtEndDate').datepicker({
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
        get_ratenew_list();
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
    })
    $('#txtStatDate').val('');
    $('#txtEndDate').val('');
}

//动态获取新帐号登录统计
function get_ratenew_list(){
    var serverID    = $('#serverList').children('option:selected').val();
    var startDate  = $('#txtStatDate').val();
    var endDate = $('#txtEndDate').val();

    if(!startDate || startDate == ""){
        alert("查询开始时间不能为空");
        return
    }

    if(!endDate || endDate == ""){
        alert("查询结束时间不能为空");
        return
    }

     $.ajax({
        url:'http://nysjdm.syyx.cn/opanalyse/daily_transfer_list?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {StartDate:startDate,EndDate:endDate,ServerID:serverID},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $("#tableOpDailyTransfer tbody").find("tr.newrow").remove();
            //显示记录
            $.each(json.rows, function(i, item) {
                $("<tr class='newrow'></tr>").append(
                "<td>"+item.CreateDate+"</td>"+
                "<td>"+item.Logins+"</td>"+
                "<td>"+item.NewLogins+"</td>"+
                "<td>"+item.NewLoginTransfer+"</td>"+
                "<td>"+item.Transfers+"</td>"+
                "<td>"+item.NewTransfers+"</td>"+
                "<td>"+item.TransferMoney+"</td>"
                                     ).appendTo($("#tableOpDailyTransfer tbody"));
                            });
                        }
            });
}

