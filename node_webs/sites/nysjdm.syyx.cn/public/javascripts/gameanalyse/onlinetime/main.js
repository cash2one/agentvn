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
       getOnlineTimeList();
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

function getOnlineTimeList(){
   
    var serverID    = $('#serverList').children('option:selected').val();
    var startDate   = $('#txtStartDate').val();
    var endDate     = $('#txtEndDate').val();

    if(!startDate || startDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询开始时间不能为空</b></font>", "error");
        return
    }

    if(!endDate || endDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询结束时间不能为空</b></font>", "error");
        return
    }

     $.ajax({
        url:'http://nysjdm.syyx.cn/gameanalyse/game_onlinetimeshow_list?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {ServerID:serverID,StartDate:startDate,EndDate:endDate},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
                $("#tableOnlineTime tbody").find("tr.newrow").remove();
                //显示记录
                $.each(json.rows, function(i, item) {
                    $("<tr class='newrow'></tr>").append(
                    "<td>"+item.CreateDate+"</td>"+
                    "<td>"+item.Item1+"</td>"+ "<td>"+item.Item2+"</td>"+ "<td>"+item.Item3+"</td>"+ "<td>"+item.Item4+"</td>"+
                    "<td>"+item.Item5+"</td>"+ "<td>"+item.Item6+"</td>"+ "<td>"+item.Item7+"</td>"+ "<td>"+item.Item8+"</td>"+
                    "<td>"+item.Item9+"</td>"
                                    ).appendTo($("#tableOnlineTime tbody"));
                        });
            }
    }); 
}

