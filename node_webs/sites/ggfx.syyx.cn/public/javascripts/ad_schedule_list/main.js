$(function(){
	var date = new Date();
    $("#txtDateTime").datebox("setValue", date.Format('yyyy-MM')); 

    $("#btnPreMonth").click(function(){    	
    	set_date(-1);
    })

    $("#btnNextMonth").click(function(){    	
    	set_date(1);
    })

    create_cols();  
})

//--------------------------------------------------------------------------------------------------------
//设置时间
//--------------------------------------------------------------------------------------------------------
function set_date(Number){
    var date = StringToDate($("#txtDateTime").datebox("getValue")+"-01");
    var dt = date.DateAdd('m',Number).Format('yyyy-MM');
    $("#txtDateTime").datebox("setValue", dt); 

    create_cols();
}

function create_cols(){
	$("#tt").html('');

	var strcols =   "<tr>"
				+"<th  rowspan='2'>媒体类型</td>"
				+"<th  rowspan='2'>媒体</td>"
				+"<th  rowspan='2'>广告</td>"
				+"<th  rowspan='2'>总价</td>";

	var strWeek = "<tr>";

	var dt = StringToDate($("#txtDateTime").datebox("getValue")+"-01");

	var dtNow = dt.FirstDayOfDate();
    var days = dt.MaxDayOfDate();

    for (var i = 1; i <= days; i++) {
    	dtNow = StringToDate(dtNow);
    	strcols += "<th>"+i+"</th>";
    	strWeek += "<th>"+dtNow.DatePart("w")+"</th>";
    	dtNow = dtNow.DateAdd('d',1);
    };
	strcols += "</tr>";
	strWeek += "</tr>";
	$("#tt").html(strcols+strWeek);

    var stattime = dt.Format("yyyy-MM-dd");

    $.ajax({
        url: "http://ggfx.syyx.cn/ad_schedule_search?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { StatTime : stattime },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {           
            //显示记录
            $.each(json.rows, function(i, item) {
                var v_classid = item.ClassID;
                var v_mediaid = item.MediaID;
                var v_adid = item.ADID;
                var v_date = item.SYear+"-"+item.SMonth+"-";

                var svalue ="<td>"+item.ClassName+"</td>"+
                            "<td>"+item.MediaName+"</td>"+
                            "<td>"+item.ADName+"</td>"+
                            "<td>"+item.ADCost+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"1",item.Day1)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"2",item.Day2)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"3",item.Day3)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"4",item.Day4)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"5",item.Day5)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"6",item.Day6)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"7",item.Day7)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"8",item.Day8)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"9",item.Day9)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"10",item.Day10)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"11",item.Day11)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"12",item.Day12)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"13",item.Day13)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"14",item.Day14)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"15",item.Day15)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"16",item.Day16)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"17",item.Day17)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"18",item.Day18)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"19",item.Day19)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"20",item.Day20)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"21",item.Day21)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"22",item.Day22)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"23",item.Day23)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"24",item.Day24)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"25",item.Day25)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"26",item.Day26)+"</td>"+
                            "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"27",item.Day27)+"</td>";
                if(days>27)
                    svalue = svalue + "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"28",item.Day28)+"</td>";
                if(days>28)
                    svalue = svalue + "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"29",item.Day29)+"</td>";
                if(days>29)
                    svalue = svalue + "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"30",item.Day30)+"</td>";
                if(days>30)
                    svalue = svalue + "<td>"+getAdUrl(v_classid,v_mediaid,v_adid,v_date+"31",item.Day31)+"</td>";

                $("<tr class='newrow'></tr>").append(
                    svalue                    
                ).appendTo($("#tt tbody"));
            });
        }
    });
}
