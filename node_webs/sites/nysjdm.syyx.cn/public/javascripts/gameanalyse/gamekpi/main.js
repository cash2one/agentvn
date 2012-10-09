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
        get_gamekpi_list();
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
}

function get_gamekpi_list(){
    var serverID    = $('#serverList').children('option:selected').val();
    var startDate  = $('#txtStartDate').val();
    var endDate = $('#txtEndDate').val();

    if(!startDate || startDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询开始时间不能为空</b></font>", "error");
        return
    }

    if(!endDate || endDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询结束时间不能为空</b></font>", "error");
        return
    }

     $.ajax({
        url:'http://nysjdm.syyx.cn/gameanalyse/game_kpi_list?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {ServerID:serverID,StartDate:startDate,EndDate:endDate,ServerID:serverID},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $("#tableGameKpi tbody").find("tr.newrow").remove();
            //显示记录
            $.each(json.rows, function(i, item) {
                $("<tr class='newrow'></tr>").append(
                "<td>"+item.CreateDate+"</td>"+
                "<td>"+item.WorldBoss+"</td>"+
                "<td>"+item.Task004+"</td>"+
                "<td>"+item.Task003+"</td>"+
                "<td>"+item.Task033+"</td>"+
                "<td>"+item.Task015+"</td>"+
                "<td>"+item.Task014+"</td>"+
                "<td>"+item.StoneCreate107+"</td>"+
                "<td>"+item.StoneDestroy107+"</td>"+
                "<td>"+item.StoneCreate108+"</td>"+
                "<td>"+item.StoneDestroy108+"</td>"+
                "<td>"+item.StoneCreate109+"</td>"+
                "<td>"+item.StoneDestroy109+"</td>"+
                "<td>"+item.SingleCreate1+"</td>"+
                "<td>"+item.SingleCreate2+"</td>"+
                "<td>"+item.SingleCreate3+"</td>"+
                "<td>"+item.BlueprintCreate6+"</td>"+
                "<td>"+item.BlueprintCreate7+"</td>"+
                "<td>"+item.BlueprintCreate8+"</td>"+
                "<td>"+item.BlueprintCreate9+"</td>"+
                "<td>"+item.BlueprintCreate10+"</td>"+
                "<td>"+item.GoldprintCreate+"</td>"
                                     ).appendTo($("#tableGameKpi tbody"));
                            });
                        }
            });
}