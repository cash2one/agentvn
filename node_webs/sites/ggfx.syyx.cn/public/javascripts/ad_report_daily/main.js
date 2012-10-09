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
    var stattime=$("#txtStartTime").datebox("getValue");
    var classid=$("#ddlClass").val();
    var mediaid=$("#ddlMedia").val();
    var adid=$("#ddlAd").val();
    var adwebnumber = $("#ddlAdWebNumber").val();
    var isschedule=$("#chkSchedule").attr("checked");

    $.ajax({
        url: "http://ggfx.syyx.cn/ad_daily?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { GameID:gameid, StatTime:stattime, ClassID:classid, MediaID:mediaid, ADID:adid, ADWebNumber:adwebnumber , IsSchedule:isschedule},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $("#tt tbody").find("tr.newrow").remove();
            //显示记录
            $.each(json.rows, function(i, item) {
                $("<tr class='newrow'></tr>").append(
                    "<td>"+item.ClassName+"</td>"+
					"<td>"+item.MediaName+"</td>"+
					"<td>"+item.ADName+"</td>"+
                    "<td>"+item.ADCost+"</td>"+
					"<td>"+item.ShowNumber+"</td>"+
                    "<td>"+item.ClickCookies+"</td>"+
                    "<td>"+item.ClientInstall+"</td>"+
                    "<td>"+item.RBRegNumber+"</td>"+
                    "<td>"+item.RBLoginNumber+"</td>"+                   
                    "<td>"+item.CPA+"</td>"+
                    "<td>"+item.CPL+"</td>"+
                    "<td>"+item.RegRate+"%</td>"+
                    "<td>"+item.LoginRate+"%</td>"
                ).appendTo($("#tt tbody"));
            });
		}
    });
}
