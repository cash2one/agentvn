//--------------------------------------------------------------------------------------------------------
$(function(){
    var date = new Date();
    var dt=date.Format('yyyy-MM-dd');  
    $("#txtDateTime").datebox("setValue", dt); 

    $("#btnSearch").click(function(){
        get_list();
    })
})
//--------------------------------------------------------------------------------------------------------
//获取记录列表
//--------------------------------------------------------------------------------------------------------
function get_list() {
    var starttime = $("#txtDateTime").datebox("getValue");
    var endtime = new Date(starttime).DateAdd('d',1).Format('yyyy-MM-dd');

    var key = $("#ddlKey").val();
    var title = $("#ddlKey").find("option:selected").text();
    var showvalue = $("#chkShowValue").attr("checked");

    $.ajax({
        url: "http://ggfx.syyx.cn/ad_kpi_day_list?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { StartTime: starttime, EndTime : endtime, Key : key },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            //显示记录
            var strXML = "<chart caption='"+title+"' animation='0' baseFont='宋体' useRoundEdges='1' color='8BBA00' baseFontSize='12' xAxisName='媒体' YAxisName='数值' formatNumberScale='0' divLineColor='ff5904' showNames='1' ";
            if (!showvalue)
                strXML = strXML + "showValues='0' >";
            else
                strXML = strXML + "showValues='1' >";

            //显示记录
            $.each(json.rows, function(i, item) {
                strXML = strXML + "<set label='"+ item.label+"' value='"+item.value+"' hoverText='"+item.value+"'/>";
            });
            
            strXML = strXML + "</chart>";
            /*
            var strXML ="{\"chart\": {\"showborder\": \"0\", \"bgcolor\": \"FFFFFF,FFFFFF\",\"useroundedges\": \"1\", \"caption\": \"Top 5 Sales Person\", \"yaxisname\": \"Sales Figure\"}, \"data\": ";
            alert(strXML+json.rows+"}");
            */
            var chart1 = new FusionCharts("http://s1.syyx.com/nysjdm/FusionCharts/Column2D.swf", "chart1Id", "1200", "500");
            chart1.setDataXML(strXML);
            chart1.render("divChart");
        }
    });

}