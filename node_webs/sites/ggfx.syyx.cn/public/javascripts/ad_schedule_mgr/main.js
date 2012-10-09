//--------------------------------------------------------------------------------------------------------
var pageindex = 1;
var pagesize = 20;

$(function(){
	
	initDate(function(year, month){
		$("#ddlYear").val(year);
		$("#ddlMonth").val(month);

		createCalendar(year, month);
	});

    get_list();	

    $("#ddlYear").change(function(){
        createCalendar();
    })

    $("#ddlMonth").change(function(){
        createCalendar();
    })

    $("#btnOK").click(function(){ 
        save_record(); 
    })

    $("#chkAll").change(function(){
        checkAllByName(this, "chkWeek");
    })

    $("#btnSearch").click(function(){
        get_list();
    })

    $("#btnView").click(function(){
    	window.location.href="/ad_schedule_list";
    })

	$("#btnCancel").click(function(){
		cancel_record();
	})

	$(".color-picker").miniColors({
		letterCase: 'uppercase',
		change: function(hex, rgb) {
			
		},
		open: function(hex, rgb) {
			//logData('open', hex, rgb);
		},
		close: function(hex, rgb) {
			//logData('close', hex, rgb);			
		}
	});

})

function initDate(cb){
	var year = new Date().getFullYear();

	for(var i=0;i<10;i++){
		var sYear=year-3+i;
		if(year==sYear){
			$("<option value="+sYear+" selected>"+sYear+"</option>").appendTo($("#ddlYear"));		
		}
		else{
			$("<option value="+sYear+">"+sYear+"</option>").appendTo($("#ddlYear"));			
		}		
	}
	
	var month = new Date().getMonth();
	for(var i=1;i<=12;i++){
		$("#ddlMonth").append("<option value="+i+">"+i+"</option>");
	}

	cb(year, month+1);
}


function createCalendar(year, month){

	$("#cc").empty();

	var WeekDays = new Array('日','一','二','三','四','五','六');	
	var MonthNames = new Array('1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月');

	var t=$("<table class='MonthView'><thead></thead><tbody></tbody></table>");	

	var tr=$("<tr></tr>").appendTo(t.find("thead"));
	//tr.append("<th><input type='checkbox' id='chkAll' />");

	for(var i=0;i<WeekDays.length;i++){
		tr.append("<th>"+WeekDays[i]+"</th>");
	}

	var year = $("#ddlYear").val();
	var month = $("#ddlMonth").val();

   	var mvArray = DateView(year,month-1);
   	for (var i = 0; i < mvArray.length; i++) {
   		var rw = i/7;
   		var wk = i%7;
   		if(wk == 0){
   			var tr=$("<tr id='tr_"+rw+"'></tr>").appendTo(t.find("tbody"));
   			//tr.append("<td><input type='checkbox' onchange=\"selectDay(this,'tr_"+rw+"')\"/>");
   		}

   		if(mvArray[i]!="&nbsp;")
   			tr.append("<td><input type='checkbox' id='chkDay"+mvArray[i]+"' name='chkWeek' onclick=\"changecolor(this.checked,'day"+mvArray[i]+"')\"/>"+mvArray[i]+"<span id='day"+mvArray[i]+"'>&nbsp&nbsp</span></td>");
   		else
   			tr.append("<td>"+mvArray[i]+"</td>");
   	};


	$("#cc").append(t);

	return 1;
}

function DateView (y, m) {  
	var mvArray = [];  
	var dayOfFirstDay = new Date(y, m, 1).getDay();  

	var daysOfMonth = new Date(y, m + 1, 0).getDate();  

	var counts = 35;
	if (((daysOfMonth == 31) && (dayOfFirstDay > 4)) || ((daysOfMonth == 30) && (dayOfFirstDay == 6))) counts = 42;
    else if ((daysOfMonth == 28) && (dayOfFirstDay == 0)) counts = 28;


	for (var i = 0; i < counts; i++) {  
		mvArray[i] = "&nbsp;";  
	}  

	for (var i = 0; i < daysOfMonth; i++){  
		mvArray[i + dayOfFirstDay] = i + 1;  
	}  
	return mvArray;  
}  

function clear_form(){
    $("#hidID").val(0);
    $("#txtPrice").val(0);
}

function get_list(){
    clear_form();

    var classid = $("#ddlClass").val();
    var mediaid = $("#ddlMedia").val();
    var adid = $("#ddlAd").val();

	$.ajax({
        url: "http://ggfx.syyx.cn/ad_schedule_page?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ClassID : classid, MediaID : mediaid, ADID : adid,PageIndex : pageindex, PageSize : pagesize },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $("#tt tbody").find("tr.newrow").remove();
            //显示记录
            $.each(json.rows, function(i, item) {
                 $("<tr class='newrow'></tr>").append(
                        "<td>" + item.ClassName + "</td>" +
                        "<td>" + item.MediaName + "</td>" +
                        "<td>" + item.ADName + "</td>" + 
                        "<td>" + item.SYear+"-"+item.SMonth + "</td>" +                
                        "<td><a href='javascript:void(0)' onclick='show_data("+item.ID+","+item.SYear+","+item.SMonth+")'>选择</a></td>"                
                     ).appendTo($("#tt tbody"));
            })

            //分页
            $("#pp").pagination({
                total: json.total,
                pageSize: pagesize,
                showPageList: false,
                showRefresh: false,
                onSelectPage: function(pageIndex, pageSize) {
                    pageindex = pageIndex;
                    get_list();
                }
            });
        }
    });
}

function show_data(id, year, month){
	$("#ddlYear").val(year);
	$("#ddlMonth").val(month);
	
	createCalendar(year, month);

	$.ajax({
        url: "http://ggfx.syyx.cn/ad_schedule_record?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ID: id },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {	            
            if(json.rows.length>0){
                var item = json.rows[0];     
                var adcolor = item.AdColor;
                var daysOfMonth = new Date(year, month, 0).getDate();  

                $(".color-picker").miniColors('value', adcolor);    
                       
                $("#hidID").val(item.ID);
                get_ad_info(item.ClassID, item.MediaID, item.ADID);

                $("#ddlModel").val(item.PriceType);
                $("#txtPrice").val(item.AdPrice);
                if (item.Day1 == 1) { $("#chkDay1").attr("checked", true);	$("#day1").css("background", adcolor);};
                if (item.Day2 == 1) { $("#chkDay2").attr("checked", true);	$("#day2").css("background", adcolor);};
                if (item.Day3 == 1) { $("#chkDay3").attr("checked", true);	$("#day3").css("background", adcolor);};
                if (item.Day4 == 1) { $("#chkDay4").attr("checked", true);	$("#day4").css("background", adcolor);};
                if (item.Day5 == 1) { $("#chkDay5").attr("checked", true);	$("#day5").css("background", adcolor);};
                if (item.Day6 == 1) { $("#chkDay6").attr("checked", true);	$("#day6").css("background", adcolor);};
                if (item.Day7 == 1) { $("#chkDay7").attr("checked", true);	$("#day7").css("background", adcolor);};
                if (item.Day8 == 1) { $("#chkDay8").attr("checked", true);	$("#day8").css("background", adcolor);};
                if (item.Day9 == 1) { $("#chkDay9").attr("checked", true);	$("#day9").css("background", adcolor);};
                if (item.Day10 == 1) { $("#chkDay10").attr("checked", true);	$("#day10").css("background", adcolor);};
                if (item.Day11 == 1) { $("#chkDay11").attr("checked", true);	$("#day11").css("background", adcolor);};
                if (item.Day12 == 1) { $("#chkDay12").attr("checked", true);	$("#day12").css("background", adcolor);};
                if (item.Day13 == 1) { $("#chkDay13").attr("checked", true);	$("#day13").css("background", adcolor);};
                if (item.Day14 == 1) { $("#chkDay14").attr("checked", true);	$("#day14").css("background", adcolor);};
                if (item.Day15 == 1) { $("#chkDay15").attr("checked", true);	$("#day15").css("background", adcolor);};
                if (item.Day16 == 1) { $("#chkDay16").attr("checked", true);	$("#day16").css("background", adcolor);};
                if (item.Day17 == 1) { $("#chkDay17").attr("checked", true);	$("#day17").css("background", adcolor);};
                if (item.Day18 == 1) { $("#chkDay18").attr("checked", true);	$("#day18").css("background", adcolor);};
                if (item.Day19 == 1) { $("#chkDay19").attr("checked", true);	$("#day19").css("background", adcolor);};
                if (item.Day20 == 1) { $("#chkDay20").attr("checked", true);	$("#day20").css("background", adcolor);};
                if (item.Day21 == 1) { $("#chkDay21").attr("checked", true);	$("#day21").css("background", adcolor);};
                if (item.Day22 == 1) { $("#chkDay22").attr("checked", true);	$("#day22").css("background", adcolor);};
                if (item.Day23 == 1) { $("#chkDay23").attr("checked", true);	$("#day23").css("background", adcolor);};
                if (item.Day24 == 1) { $("#chkDay24").attr("checked", true);	$("#day24").css("background", adcolor);};
                if (item.Day25 == 1) { $("#chkDay25").attr("checked", true);	$("#day25").css("background", adcolor);};
                if (item.Day26 == 1) { $("#chkDay26").attr("checked", true);	$("#day26").css("background", adcolor);};
                if (item.Day27 == 1) { $("#chkDay27").attr("checked", true);	$("#day27").css("background", adcolor);};
                if (item.Day28 == 1) { $("#chkDay28").attr("checked", true);	$("#day28").css("background", adcolor);};
				if(daysOfMonth>=29){
					if (item.Day29 == 1) { $("#chkDay29").attr("checked", true);	$("#day29").css("background", adcolor);};
				}
				if(daysOfMonth>=30){
					if (item.Day30 == 1) { $("#chkDay30").attr("checked", true);	$("#day30").css("background", adcolor);};
				}
				if(daysOfMonth>=31){
					if (item.Day31 == 1) { $("#chkDay31").attr("checked", true);	$("#day31").css("background", adcolor);};
				}				
            }        
        }
    });
}

function save_record(){
    var year = $("#ddlYear").val();
    var month = $("#ddlMonth").val();
    var daysOfMonth = new Date(year, month, 0).getDate();  

    var id = $("#hidID").val(); 
    var adid =$("#ddlSelectAd").val();

    if(adid == 0){
        alert("请选择需要排期的广告");
        return;
    }
    var pricetype =$("#ddlModel").val();
    var adprice =$("#txtPrice").val();
    if(adprice==""){
        alert("请填写广告单价");
        return;
    }
    var adcolor =$("#txtColor").val();
    var syear =$("#ddlYear").val();
    var smonth =$("#ddlMonth").val();
    var day1 =$("#chkDay1").attr("checked")=="checked"?1:0;
    var day2 =$("#chkDay2").attr("checked")=="checked"?1:0;
    var day3 =$("#chkDay3").attr("checked")=="checked"?1:0;
    var day4 =$("#chkDay4").attr("checked")=="checked"?1:0;
    var day5 =$("#chkDay5").attr("checked")=="checked"?1:0;
    var day6 =$("#chkDay6").attr("checked")=="checked"?1:0;
    var day7 =$("#chkDay7").attr("checked")=="checked"?1:0;
    var day8 =$("#chkDay8").attr("checked")=="checked"?1:0;
    var day9 =$("#chkDay9").attr("checked")=="checked"?1:0;
    var day10 =$("#chkDay10").attr("checked")=="checked"?1:0;
    var day11 =$("#chkDay11").attr("checked")=="checked"?1:0;
    var day12 =$("#chkDay12").attr("checked")=="checked"?1:0;
    var day13 =$("#chkDay13").attr("checked")=="checked"?1:0;
    var day14 =$("#chkDay14").attr("checked")=="checked"?1:0;
    var day15 =$("#chkDay15").attr("checked")=="checked"?1:0;
    var day16 =$("#chkDay16").attr("checked")=="checked"?1:0;
    var day17 =$("#chkDay17").attr("checked")=="checked"?1:0;
    var day18 =$("#chkDay18").attr("checked")=="checked"?1:0;
    var day19 =$("#chkDay19").attr("checked")=="checked"?1:0;
    var day20 =$("#chkDay20").attr("checked")=="checked"?1:0;
    var day21 =$("#chkDay21").attr("checked")=="checked"?1:0;
    var day22 =$("#chkDay22").attr("checked")=="checked"?1:0;
    var day23 =$("#chkDay23").attr("checked")=="checked"?1:0;
    var day24 =$("#chkDay24").attr("checked")=="checked"?1:0;
    var day25 =$("#chkDay25").attr("checked")=="checked"?1:0;
    var day26 =$("#chkDay26").attr("checked")=="checked"?1:0;
    var day27 =$("#chkDay27").attr("checked")=="checked"?1:0;
    var day28 =$("#chkDay28").attr("checked")=="checked"?1:0;
    var day29 = 0;
    if (daysOfMonth>=29) { day29 = $("#chkDay29").attr("checked")=="checked"?1:0;};
    var day30 = 0;
    if (daysOfMonth>=30) { day30 = $("#chkDay30").attr("checked")=="checked"?1:0;};
    var day31 = 0;
    if (daysOfMonth>=31) { day31 = $("#chkDay31").attr("checked")=="checked"?1:0;};

    $.ajax({
        url: "http://ggfx.syyx.cn/ad_schedule_add?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ID:id,ADID:adid,PriceType:pricetype,AdPrice:adprice,AdColor:adcolor,SYear:syear,SMonth:smonth,Day1:day1,Day2:day2,Day3:day3,Day4:day4,Day5:day5,Day6:day6,Day7:day7,Day8:day8,Day9:day9,Day10:day10,Day11:day11,Day12:day12,Day13:day13,Day14:day14,Day15:day15,Day16:day16,Day17:day17,Day18:day18,Day19:day19,Day20:day20,Day21:day21,Day22:day22,Day23:day23,Day24:day24,Day25:day25,Day26:day26,Day27:day27,Day28:day28,Day29:day29,Day30:day30,Day31:day31,IsOK:true },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            if (json.retcode == 0) {
                alert("广告排期设定成功");    
                get_list();           
            }
            else {
                alert("广告排期设定失败");
            }
        }
    });
}

function cancel_record(){
    var id = $("#hidID").val();
	$.ajax({
        url: "http://ggfx.syyx.cn/ad_schedule_delete?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ID:id },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            if (json.retcode == 0) {
                alert("广告排期已取消");   
                get_list();        
            }
            else {
                alert("广告排期取消失败");
            }
        }
    });
}


function changecolor(ck, item){
    var adcolor = $("#txtColor").val();
    if(ck)
        $("#"+item).css("background", adcolor);
    else
        $("#"+item).css("background","");
}