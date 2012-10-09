$(document).ready(function(){
	$('#txtStatDate').datepicker({
                changeMonth: true,
                changeYear: true,
                dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                dateFormat: 'yy-mm-dd',
                monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                yearRange: '-60:+00',
                maxDate: '+0d',
                duration: 'fast'
            });
	$('#txtEndDate').datepicker({
                changeMonth: true,
                changeYear: true,
                dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                dateFormat: 'yy-mm-dd',
                monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                yearRange: '-60:+00',
                maxDate: '+0d',
                duration: 'fast'
            });
    
    $('#txtStatDate').val('');
    $('#txtEndDate').val('');

    $('#btnQuery').bind('click',function(){
        get_webconvert_list();
    })
})

//整体情况KPI
function  get_webconvert_list(){
    var startDate   = $('#txtStatDate').val();
    var endDate     = $('#txtEndDate').val();
    if(!startDate || startDate == ""){
        alert("查询开始时间不能为空");
        return
    }

    if(!endDate || endDate == ""){
        alert("查询结束时间不能为空");
        return
    }

     $.ajax({
        url:'http://nysjdm.syyx.cn/opanalyse/web_convert_list?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {StartDate:startDate,EndDate:endDate},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
             $("#kpiDetail tbody").find("tr.newrow").remove();
                //显示记录
                $.each(json.rows, function(i, item) {
                    $("<tr class='newrow t_center'></tr>").append(
                    "<td>" + item.CreateDate + "</td>" +
                    "<td>" + item.NewUV + "</td>" +
                    "<td>" + item.UVRegisters + "</td>" +
                    "<td>" + item.UVActivers + "</td>" +
                    "<td>" + item.Activers + "</td>" +
                    "<td>" + item.InstallNum + "</td>" +
                    "<td>" + item.RegisterLogin + "</td>" +
                    "<td>" + item.NewLogins + "</td>" +
                    "<td>" + item.Rate1 + "</td>" +
                    "<td>" + item.OldLogins + "</td>" +
                    "<td>" + item.LoginAccount + "</td>" +
                    "<td>" + item.LoginIP + "</td>" +
                    "<td>" + item.LoginRole + "</td>" +
                    "<td>" + item.LoginRole20 + "</td>" +
                    "<td>" + item.MaxNumber + "</td>" +
                    "<td>" + item.MinNumber + "</td>" +
                    "<td>" + item.AvgNumber + "</td>"
                    ).appendTo($("#kpiDetail tbody"));
                });
        }
    })
}