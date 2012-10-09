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
    getCorpsPage(1,20);
    
    $('#btnQuery').bind('click',function(){
        getCorpsPage(1,20);
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
}

function getCorpsPage(v_pageIndex,v_pageSize){
        var serverID    = $('#serverList').children('option:selected').val(); 
        var corpsName   = $('#txtCorpsName').val();
        if(!corpsName || corpsName == ""){
           corpsName = "";
        }
        
    $.ajax({
        url:'http://nysjdm.syyx.cn/gameanalyse/game_corps_page?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {ServerID:serverID,CorpsName:corpsName,Page:v_pageIndex,PageSize:v_pageSize},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
                $("#tableCorps tbody").find("tr.newrow").remove();
                //显示记录
                $.each(json.rows, function(i, item) {
                    $("<tr class='newrow'></tr>").append(
                    "<td>"+item.CorpsName+"</td>"+
                    "<td>"+item.Grade+"</td>"+
                    "<td>"+item.Fund+"</td>"+
                    "<td>"+item.BuildPoint+"</td>"+
                    "<td>"+item.Members+"</td>"+
                    "<td>"+item.TiZhi+"</td>"+
                    "<td>"+item.JiRou+"</td>"+
                    "<td>"+item.ShenShou+"</td>"+
                    "<td>"+item.YiZhi+"</td>"+
                    "<td>"+item.HuoHua+"</td>"+
                    "<td>"+item.KuangBao+"</td>"+
                    "<td>"+item.MingXiang+"</td>"+
                    "<td>"+item.RenNai+"</td>"+
                    "<td>"+item.ZhenJing+"</td>"
                                    ).appendTo($("#tableCorps tbody"));
                        });
                
                $("#divPagination").pagination({
                    total: json.output,
                    pageSize: v_pageSize,
                    showPageList: false,
                    showRefresh: false,
                    onSelectPage: function(pageIndex, pageSize) {
                        getCorpsPage(pageIndex, pageSize);
                    }
                });
            }
    });
        
}