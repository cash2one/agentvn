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
    getBossItemList();

    $('#btnQuery').bind('click',function(){
        getBossPage(1,20);
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
    $('#bossList').val(0);
    $('#txtLine').val(0);
}

function getBossItemList(){
    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/config_items_list_byparams?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {ParamsType:"Boss",GetType:0},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $('#bossList').empty();
            $('<option value="0">全部</option>').appendTo($('#bossList'));
            $.each(json.rows,function(i,item){
                $('<option value="'+item.ItemNo+'"> '+item.ItemName+'</option>')
                    .appendTo($('#bossList'));
            })
        }
    })
}

function getBossPage(v_pageIndex,v_pageSize){
    var serverID    = $('#serverList').children('option:selected').val();
    var startDate   = $('#txtStartDate').val();
    var endDate     = $('#txtEndDate').val();
    var bossID      = $('#bossList').children('option:selected').val();
    var line        = $('#txtLine').val();

    if(!startDate || startDate == ""){
        alert("查询开始时间不能为空");
        return
    }

    if(!endDate || endDate == ""){
        alert("查询结束时间不能为空");
        return
    }

    if(!line || line == ""){
       line = 0;
    }

     $.ajax({
        url:'http://nysjdm.syyx.cn/gameanalyse/game_boss_page?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {ServerID:serverID,Line:line,BossID:bossID,StartDate:startDate,EndDate:endDate,Page:v_pageIndex,PageSize:v_pageSize},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
                $("#tableBoss tbody").find("tr.newrow").remove();
                //显示记录
                $.each(json.rows, function(i, item) {
                    $("<tr class='newrow'></tr>").append(
                    "<td>"+item.RowNumber+"</td>"+
                    "<td>"+item.Line+"</td>"+
                    "<td>"+item.BossName+"</td>"+
                    "<td>"+item.LiveTime+"</td>"+
                    "<td>"+item.KillTime+"</td>"
                                    ).appendTo($("#tableBoss tbody"));
                        });
                
                $("#divPagination").pagination({
                    total: json.output,
                    pageSize: v_pageSize,
                    showPageList: false,
                    showRefresh: false,
                    onSelectPage: function(pageIndex, pageSize) {
                        getBossPage(pageIndex, pageSize);
                    }
                });
            }
    });
}



