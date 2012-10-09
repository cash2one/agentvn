//--------------------------------------------------------------------------------------------------------
var pageindex = 1;
var pagesize = 20;

$(function(){      
    $("#a_today").click(function(){
        set_date('d', 0);
    })

    $("#a_yesterday").click(function(){
        set_date('d', -1);
    })

    $("#a_pre10days").click(function(){
        set_date('d', -10);
    })

    $("#a_pre20days").click(function(){
        set_date('d', -20);
    })

    $("#a_pre1month").click(function(){
        set_date('m', -1);
    })

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
    var adwebnumber=$("#ddlAdWebNumber").val();
    var isschedule=$("input[name='rdtype2']:checked").val();
    var rollday = $("#ddlBackDay").val();
    
    $.ajax({
        url: "http://ggfx.syyx.cn/ad_period?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { GameID:gameid, StartTime:starttime, EndTime:endtime, ClassID:classid, MediaID:mediaid, ADID:adid, ADWebNumber:adwebnumber, IsSchedule:isschedule, RollDay:rollday},
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
					"<td>"+item.ShowNumber+"</td>"+
                    "<td>"+item.ClickCookies+"</td>"+
                    "<td>"+item.ClientInstall+"</td>"+
                    "<td>"+item.RBRegNumber+"</td>"+
                    "<td>"+item.RBLoginNumber+"</td>"+                    
                    "<td>"+item.ADCost+"</td>"+
                    "<td>"+item.CPA+"</td>"+
                    "<td>"+item.CPL+"</td>"+
                    "<td>"+item.RegRate+"%</td>"+
                    "<td>"+item.LoginRate+"%</td>"+
                    "<td>"+item.Level10+"</td>"+
                    "<td>"+item.Level20+"</td>"+
                    "<td>"+item.Level30+"</td>"+
                    "<td>"+item.Level40+"</td>"+
                    "<td>"+item.Level50+"</td>"+
                    "<td>"+item.Level60+"</td>"+
                    "<td>"+item.Level70+"</td>"+
                    "<td>"+item.PayAccount+"</td>"+
                    "<td>"+item.PayMoney+"</td>"+
                    "<td>"+item.ROI+"</td>"
                ).appendTo($("#tt tbody"));
            });
            
            if(classid==0){
                get_se_list(gameid, starttime, endtime, isschedule);
            }
		}
    });
}

function get_se_list(gameid, starttime, endtime, isschedule){
    $.ajax({
         url: "http://ggfx.syyx.cn/ad_period_se?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { GameID:gameid, StartTime:starttime, EndTime:endtime, IsSchedule:isschedule},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            //显示记录
            $.each(json.rows, function(i, item) {
                $("<tr class='newrow'></tr>").append(
                    "<td>搜索引擎</td>"+
                    "<td>"+item.MediaName+"</td>"+
                    "<td>合计</td>"+
                    "<td>"+item.ShowNumber+"</td>"+
                    "<td>"+item.ClickCookies+"</td>"+
                    "<td>"+item.ClientInstall+"</td>"+
                    "<td>"+item.RBLoginNumber+"</td>"+
                    "<td>"+item.RBRegNumber+"</td>"+
                    "<td>"+item.ADCost+"</td>"+
                    "<td>"+item.CPA+"</td>"+
                    "<td>"+item.CPL+"</td>"+
                    "<td>"+item.RegRate+"</td>"+
                    "<td>"+item.LoginRate+"</td>"+
                    "<td>"+item.Level10+"</td>"+
                    "<td>"+item.Level20+"</td>"+
                    "<td>"+item.Level30+"</td>"+
                    "<td>"+item.Level40+"</td>"+
                    "<td>"+item.Level50+"</td>"+
                    "<td>"+item.Level60+"</td>"+
                    "<td>"+item.Level70+"</td>"+
                    "<td>"+item.PayAccount+"</td>"+
                    "<td>"+item.PayMoney+"</td>"+
                    "<td>"+item.ROI+"</td>"
                ).appendTo($("#tt tbody"));
            });
        }
    });
}