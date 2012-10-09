//--------------------------------------------------------------------------------------------------------
$(function(){
    var date = new Date();
    $("#txtDateTime").datebox("setValue", date.Format('yyyy-MM')); 

    $("#btnPreMonth").click(function(){     
        set_date(-1);
    })

    $("#btnNextMonth").click(function(){        
        set_date(1);
    })

    $("#btnSearch").click(function(){
        get_list();
        get_detail();
    })
})
//--------------------------------------------------------------------------------------------------------
//设置时间
//--------------------------------------------------------------------------------------------------------
function set_date(Number){
    var date = StringToDate($("#txtDateTime").datebox("getValue")+"-01");
    var dt = date.DateAdd('m',Number).Format('yyyy-MM');
    $("#txtDateTime").datebox("setValue", dt); 
}
//--------------------------------------------------------------------------------------------------------
//获取记录列表
//--------------------------------------------------------------------------------------------------------
function get_list() {
    var starttime = $("#txtDateTime").datebox("getValue")+"-01";
    var endtime = StringToDate(starttime).DateAdd('m',1).Format('yyyy-MM-dd');

    var key = $("#ddlKey").val();
    var title = $("#ddlKey").find("option:selected").text();
    var showvalue = $("#chkShowValue").attr("checked");

    $.ajax({
        url: "http://ggfx.syyx.cn/ad_kpi_month_list?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { StartTime: starttime, EndTime : endtime, Key : key },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            //显示记录
            if(json.rows.length>0){
                var strXML = "<chart caption='"+title+"' animation='0' baseFont='宋体' useRoundEdges='1' color='8BBA00' baseFontSize='12' xAxisName='媒体' YAxisName='数值' formatNumberScale='0' divLineColor='ff5904' showNames='1' ";
                if (!showvalue)
                    strXML = strXML + "showValues='0' >";
                else
                    strXML = strXML + "showValues='1' >";

                //显示记录
                $.each(json.rows, function(i, item) {
                    if(item.label=="NULL")
                        strXML = strXML + "<set />";
                    else
                        strXML = strXML + "<set label='"+ item.label+"' value='"+item.value+"' hoverText='"+item.value+"'/>";
                });
                
                strXML = strXML + "</chart>";

                var chart1 = new FusionCharts("http://s1.syyx.com/nysjdm/FusionCharts/Line.swf", "chart1Id", "1180", "500");
                chart1.setDataXML(strXML);
                chart1.render("divChart");
            }
        }
    });

}

function get_detail(){
    var starttime = $("#txtDateTime").datebox("getValue")+"-01";
    var endtime = StringToDate(starttime).DateAdd('m',1).Format('yyyy-MM-dd');

    $.ajax({
        url: "http://ggfx.syyx.cn/ad_kpi_month_detail?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { StartTime: starttime, EndTime : endtime },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $("#tt tbody").find("tr.newrow").remove();
            //显示记录
            $.each(json.rows, function(i, item) {
                $("<tr class='newrow'></tr>").append(
                    "<td>"+item.StatDate+"</td>"+
                    "<td>"+item.ADCost+"</td>"+
                    "<td>"+item.CPL+"%</td>"+
                    "<td>"+item.ShowNumber+"</td>"+
                    "<td>"+item.ClickCookies+"</td>"+
                    "<td>"+item.RegNumber+"</td>"+    
                    "<td>"+item.LoginNumber+"</td>"+
                    "<td>"+item.RegRate+"%</td>"+
                    "<td>"+item.LoginRate+"%</td>"
                ).appendTo($("#tt tbody"));
            });
        }
    });
}