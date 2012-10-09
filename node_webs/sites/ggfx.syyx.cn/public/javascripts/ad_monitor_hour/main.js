//--------------------------------------------------------------------------------------------------------

$(function(){         
    $("#btnSearch").click(function(){
        get_list();
    })
})
//--------------------------------------------------------------------------------------------------------
//获取记录列表
//--------------------------------------------------------------------------------------------------------
function get_list() {
    var gameid=$("#ddlGame").val();
    var starttime=$("#txtStartTime").datebox("getValue");
    var endtime=$("#txtEndTime").datebox("getValue");
    var classid=$("#ddlClass").val();
    var mediaid=$("#ddlMedia").val();
    var adid=$("#ddlAd").val();
    var adwebnumber = $("#ddlAdWebNumber").val();

    $.ajax({
        url: "http://ggfx.syyx.cn/ad_monitor_hour_list?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { GameID:gameid, StartTime:starttime, EndTime:endtime, ClassID:classid, MediaID:mediaid, ADID:adid, ADWebNumber:adwebnumber},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $("#tt tbody").find("tr.newrow").remove();
            //显示记录
            $.each(json.rows, function(i, item) {
                $("<tr class='newrow'></tr>").append(
					"<td>"+item.SHour+"</td>"+
					"<td>"+item.ShowNumber+"</td>"+
					"<td>"+item.ClickNumber+"</td>"+
					"<td>"+item.ClickIP+"</td>"+
					"<td>"+item.ArriveIP+"</td>"+
                    "<td>"+item.IPRate+"%</td>"+
                    "<td>"+item.ClickCookies+"</td>"+
                    "<td>"+item.ArriveCookies+"</td>"+
                    "<td>"+item.CookieRate+"%</td>"+
                    "<td>"+item.HomeCookies+"</td>"+
                    "<td>"+item.ClientInstall+"</td>"+
                    "<td>"+item.RBRegNumber+"</td>"+
                    "<td>"+item.RegRate+"%</td>"
                ).appendTo($("#tt tbody"));
            });
        }
    });
}