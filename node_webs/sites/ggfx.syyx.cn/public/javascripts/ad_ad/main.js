//--------------------------------------------------------------------------------------------------------
var classid;
var mediaid;
var pageindex = 1;
var pagesize = 20;

$(function(){    
    
    $("#btnSearch").click(function(){
        get_list();
    })
    
    $("#btnOK").click(function(){
        var id = $("#hidID").val();
        if( id == 0){
            add_record();
        }
        else{
            update_record();
        }
    })

    var now = new Date().Format("yyyy-MM-dd");
    $("#txtDate1").datebox("setValue",now);
    $("#txtDate2").datebox("setValue",now);    
})

function clear_form(){
    $("#hidID").val(0);    
    $("#txtADName").val(" ");
    $("#txtADPlace").val(" ");
    $("#txtADRemark").val(" ");
    $("#txtADEndUrl").val(" ");
}
//--------------------------------------------------------------------------------------------------------
//获取记录列表
//--------------------------------------------------------------------------------------------------------
function get_list() {    
    clear_form();

    var gameid = $("#ddlGame").val();
    var mediaid = $("#ddlMedia").val();
    $.ajax({
        url: "http://ggfx.syyx.cn/ad_ad_page?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { GameID : gameid, MediaID : mediaid, PageIndex : pageindex, PageSize : pagesize },
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
					"<td>"+item.ADPlace+"</td>"+
                    "<td><input id='adlink"+item.ID+"' type='hidden' value='http://stat.syyx.com/click.aspx?aid=" +item.ID+ "&gourl="+item.ADEndUrl+"'/><span id='copy_ad"+item.ID+"' onmouseover=\"ClickCopy("+item.ID+", '"+item.MediaName+"', '"+item.ADName+"')\"><u>点击复制</u></span></td>"+
					"<td><input id='adshow"+item.ID+"' type='hidden' value='http://stat.syyx.com/statshow.aspx?aid=" +item.ID+ "'/><span id='copy_show"+item.ID+"' onmouseover=\"ClickCopyShow("+item.ID+", '"+item.MediaName+"', '"+item.ADName+"', false)\"><u>点击复制</u></span>&nbsp<span id='copy_flash"+item.ID+"' onmouseover=\"ClickCopyShow("+item.ID+", '"+item.MediaName+"', '"+item.ADName+"', true)\"><u>点击复制(视频)</u></span></td>"+
					"<td>"+formatEnabled(item.IsDelete)+"</td>"+
					"<td>"+formatEnabled(item.IsShow)+"</td>"+
					"<td><a href='javascript:void(0)' onclick='get_record("+item.ID+")'>编辑</a></td>"
                ).appendTo($("#tt tbody"));
            });

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
//--------------------------------------------------------------------------------------------------------
//获取当前记录信息
//--------------------------------------------------------------------------------------------------------
function get_record(id){    
    $.ajax({
        url: "http://ggfx.syyx.cn/ad_ad_record?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ID : id},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            //显示记录
			$.each(json.rows, function(i, item) {
                $("#hidID").val(item.ID);
				$("#ddlSelectGame").val(item.GameID);
				get_ad_info(item.ClassID, item.MediaID, item.ID);
                $("#txtADName").val(item.ADName);
                var startTime=item.BeginTime.split(" ");                
				$("#txtDate1").datebox("setValue", startTime[0]);
                $("#txtTime1").val(startTime[1]);
                var endTime=item.EndTime.split(" ");  
				$("#txtDate2").datebox("setValue", endTime[0]);
                $("#txtTime2").val(endTime[1]);
				$("#txtADPlace").val(item.ADPlace);
				$("#txtADRemark").val(item.ADRemark);
				$("#txtADEndUrl").val(item.ADEndUrl);
				$("#chkIsDelete").attr("checked",item.IsDelete);				
                $("#chkIsShow").attr("checked",item.IsShow);   
            });            
        }
    });
}
//--------------------------------------------------------------------------------------------------------
//新增记录
//--------------------------------------------------------------------------------------------------------
function add_record() {   
	var gameid =$("#ddlSelectGame").val();

	var adname =$("#txtADName").val();
	var begintime =$("#txtDate1").datebox("getValue")+" "+$("#txtTime1").val();
	var endtime =$("#txtDate2").datebox("getValue")+" "+$("#txtTime2").val();

	var adplace =$("#txtADPlace").val();
	var adremark =$("#txtADRemark").val();
	var adendurl =$("#txtADEndUrl").val();
	var isdelete =$("#chkIsDelete").attr("checked");
    var isshow =$("#chkIsShow").attr("checked");
	var adduserid =0;//$("#AddUserId").val();
	var orderby =0;//$("#OrderBy").val();
	var groupid =$("#ddlSelectMedia").val();
	var typeid =1;//$("#TypeID").val();

    if(groupid == 0){
        alert("请选择所属媒体");
        return;
    }

    if(adname == ""){
        alert("请填写媒体名称");
        return;
    }

    $.ajax({
        url: "http://ggfx.syyx.cn/ad_ad_add?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ID:0,GameID:gameid,ADName:adname,BeginTime:begintime,EndTime:endtime,ADPlace:adplace,ADRemark:adremark,ADEndUrl:adendurl,IsDelete:isdelete,IsShow:isshow,AddUserId:adduserid,OrderBy:orderby,GroupID:groupid,TypeID:typeid },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            if (json.retcode == 0) {
                alert("成功");    
                get_list();            
            }
            else {
                alert("失败");
            }
        }
    });
}
//--------------------------------------------------------------------------------------------------------
//修改记录
//--------------------------------------------------------------------------------------------------------
function update_record() {
    var id =$("#hidID").val();
	var gameid =$("#ddlSelectGame").val();
    var adname =$("#txtADName").val();
    var begintime =$("#txtDate1").datebox("getValue")+" "+$("#txtTime1").val();
    var endtime =$("#txtDate2").datebox("getValue")+" "+$("#txtTime2").val();
    var adplace =$("#txtADPlace").val();
    var adremark =$("#txtADRemark").val();
    var adendurl =$("#txtADEndUrl").val();
    var isdelete =$("#chkIsDelete").attr("checked");
    var isshow =$("#chkIsShow").attr("checked");
    var adduserid =0;//$("#AddUserId").val();
    var orderby =0;//$("#OrderBy").val();
    var groupid =$("#ddlSelectMedia").val();
    var typeid =1;//$("#TypeID").val();

    if(groupid == 0){
        alert("请选择所属媒体");
        return;
    }

    if(adname == ""){
        alert("请填写媒体名称");
        return;
    }

    $.ajax({
        url: "http://ggfx.syyx.cn/ad_ad_update?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ID:id,GameID:gameid,ADName:adname,BeginTime:begintime,EndTime:endtime,ADPlace:adplace,ADRemark:adremark,ADEndUrl:adendurl,IsDelete:isdelete,IsShow:isshow,AddUserId:adduserid,OrderBy:orderby,GroupID:groupid,TypeID:typeid },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            if (json.retcode == 0) {
                alert("成功");    
                get_list();            
            }
            else {
                alert("失败");
            }
        }
    });
}
//--------------------------------------------------------------------------------------------------------

ZeroClipboard.setMoviePath("/javascripts/include/ZeroClipboard.swf");
var clip = null;
function ClickCopy(linkid, medianame, adname) {
    clip = new ZeroClipboard.Client(); //创建对象
    
    clip.setHandCursor(true); //鼠标手型
    clip.addEventListener("mouseOver", function(client) {
        var testCode = $("#adlink" + linkid).val();
        client.setText(testCode); // 重新设置要复制的值
    });

    clip.addEventListener('complete', function(client, text) {
    alert("<" + medianame + "> -- <" + adname + ">的【广告链接】已经复制到粘贴板！\n\r\n\r可以使用 Ctrl+V 贴到需要的地方去了哦^_^");
    });
    clip.glue("copy_ad"+linkid);
}
//--------------------------------------------------------------------------------------------------------
function ClickCopyShow(adshowid, medianame, adname, isFlash) {
    clip = new ZeroClipboard.Client(); //创建对象
    clip.setHandCursor(true); //鼠标手型
    clip.addEventListener("mouseOver", function(client) {
        var testCode;
        if (isFlash) {
            testCode = "loadVariables(\"" + $("#adshow" + adshowid).val() + "\",\"\",\"GET\");";
        }
        else {
            testCode = "<iframe src=\"" + $("#adshow" + adshowid).val() + "\" style=\"display:none\"></iframe>";
        }
        client.setText(testCode); // 重新设置要复制的值
    });

    clip.addEventListener('complete', function(client, text) {
        alert("<" + medianame + "> -- <" + adname + ">的【广告链接】已经复制到粘贴板！\n\r\n\r可以使用 Ctrl+V 贴到需要的地方去了哦^_^");
    });
    if (isFlash) {
        clip.glue("copy_flash" + adshowid);
    }
    else {
        clip.glue("copy_show" + adshowid);
    }
}       
//--------------------------------------------------------------------------------------------------------