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
       getPlayerInfoList();
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

function getPlayerInfoList(){
   
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
        url:'http://nysjdm.syyx.cn/gameanalyse/game_playerinfoshow_list?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {ServerID:serverID,StartDate:startDate,EndDate:endDate},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
                $("#tablePlayerInfo tbody").find("tr.newrow").remove();
                //显示记录
                $.each(json.rows, function(i, item) {
                    $("<tr class='newrow'></tr>").append(
                    "<td>"+item.CreateDate+"</td>"+
                    "<td>"+item.Title+"</td>"+
                    "<td>"+item.GD10+"</td>"+ "<td>"+item.JW10+"</td>"+ "<td>"+item.QX10+"</td>"+ "<td>"+item.YN10+"</td>"+
                    "<td>"+item.GD20+"</td>"+ "<td>"+item.JW20+"</td>"+ "<td>"+item.QX20+"</td>"+ "<td>"+item.YN20+"</td>"+
                    "<td>"+item.GD30+"</td>"+ "<td>"+item.JW30+"</td>"+ "<td>"+item.QX30+"</td>"+ "<td>"+item.YN30+"</td>"+
                    "<td>"+item.GD40+"</td>"+ "<td>"+item.JW40+"</td>"+ "<td>"+item.QX40+"</td>"+ "<td>"+item.YN40+"</td>"+
                    "<td>"+item.GD50+"</td>"+ "<td>"+item.JW50+"</td>"+ "<td>"+item.QX50+"</td>"+ "<td>"+item.YN50+"</td>"+
                    "<td>"+item.GD60+"</td>"+ "<td>"+item.JW60+"</td>"+ "<td>"+item.QX60+"</td>"+ "<td>"+item.YN60+"</td>"+
                    "<td>"+item.GD70+"</td>"+ "<td>"+item.JW70+"</td>"+ "<td>"+item.QX70+"</td>"+ "<td>"+item.YN70+"</td>"+
                    "<td>"+item.GD80+"</td>"+ "<td>"+item.JW80+"</td>"+ "<td>"+item.QX80+"</td>"+ "<td>"+item.YN80+"</td>"+
                    "<td>"+item.GD90+"</td>"+ "<td>"+item.JW90+"</td>"+ "<td>"+item.QX90+"</td>"+ "<td>"+item.YN90+"</td>"+
                    "<td>"+item.GD100+"</td>"+ "<td>"+item.JW100+"</td>"+ "<td>"+item.QX100+"</td>"+ "<td>"+item.YN100+"</td>"
                                    ).appendTo($("#tablePlayerInfo tbody"));
                        });
            }
    }); 

}

