$(document).ready(function(){
	
    $('#divserverTip').addClass('displaynone'); 

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
	
	getServerList();

    $('#btnQuery').bind('click',function(){
        get_ratenew_list();
    })

    $('#rdCus').click(function(){
       get_radio_server();
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
    $('#txtStatDate').val('');
    $('#txtEndDate').val('');
    $('input[name=server]').get(0).checked = true;
    
}

//动态获取新帐号登录统计
function get_ratenew_list(){
    var serverID   = get_server_value();
    var serverName = "";
    var startDate  = $('#txtStatDate').val();
    var endDate    = $('#txtEndDate').val();
    if(serverID == 0){
        serverName = "全服";
    }else if(serverID == -1){
        serverName = "未选择服务器";
    }else{
        serverName = $('#hiddenServerName').val();
    }


    $('#divserverTip').removeClass('displaynone').empty();
    $('<span class="tip_icon"></span><lable>服务器：' + serverName +'</lable>').appendTo('#divserverTip');

    if(!startDate || startDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询开始时间不能为空</b></font>", "error");
        return
    }

    if(!endDate || endDate == ""){
        $.messager.alert("提示", "<font color=red><b>查询结束时间不能为空</b></font>", "error");
        return
    }

     $.ajax({
        url:'http://nysjdm.syyx.cn/opanalyse/login_ratenew_list?r='+Math.random(),
        type: "get",
        dataType: "json",
        data: {StartDate:startDate,EndDate:endDate,ServerID:serverID},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $("#tableOpLoginRateNew tbody").find("tr.newrow").remove();
            //显示记录
            $.each(json.rows, function(i, item) {
                $("<tr class='newrow'></tr>").append(
                "<td>"+item.CreateDate+"</td>"+
                "<td>"+item.Logins+"</td>"+
                "<td>"+item.Rate1+"</td>"+
                "<td>"+item.Rate2+"</td>"+
                "<td>"+item.Rate3+"</td>"+
                "<td>"+item.Rate4+"</td>"+
                "<td>"+item.Rate5+"</td>"+
                "<td>"+item.Rate6+"</td>"+
                "<td>"+item.Rate7+"</td>"+
                "<td>"+item.Rate1_7+"</td>"+
                "<td>"+item.Rate27+"</td>"+
                "<td>"+item.Rate28+"</td>"+
                "<td>"+item.Rate29+"</td>"+
                "<td>"+item.Rate57+"</td>"+
                "<td>"+item.Rate58+"</td>"+
                "<td>"+item.Rate59+"</td>"
                                     ).appendTo($("#tableOpLoginRateNew tbody"));
                            });
                        }
            });
}

