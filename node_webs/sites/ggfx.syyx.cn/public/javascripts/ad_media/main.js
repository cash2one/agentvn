//--------------------------------------------------------------------------------------------------------
var pageindex = 1;
var pagesize = 20;

$(function(){
    var classid = getParameterByName("ClassID");

    init_adclass_list(classid);    

    $("#btnSearch").click(function(){
        get_list();
    })

    $("#btnOK").click(function(){
        var id=$("#hidID").val();
        if(id==0){
            add_record();
        }
        else{
            update_record();
        }       
    })
})

function clear_form(){
    $("#hidID").val(0);
    $("#txtMediaName").val(" ");
    $("#txtMediaRemark").val(" ");
}
//--------------------------------------------------------------------------------------------------------
//获取记录列表
//--------------------------------------------------------------------------------------------------------
function get_list() {
    clear_form();

    var classid = $("#ddlSearchClass").val();
    var medianame = $("#txtKeyword").val();    
    var isenabled = $("#ddlIsEnabled").val();
    var isshow = $("#ddlIsShow").val();

    $.ajax({
        url: "http://ggfx.syyx.cn/ad_media_page?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ClassID:classid, MediaName:medianame, IsEnabled:isenabled, IsShow:isshow, PageIndex : pageindex, PageSize : pagesize },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $("#tt tbody").find("tr.newrow").remove();
            //显示记录
            $.each(json.rows, function(i, item) {
                $("<tr class='newrow'></tr>").append(
                    "<td>"+item.ClassName+"</td>"+
					"<td>"+item.MediaName+"</td>"+
					"<td>"+item.MediaRemark+"</td>"+
                    "<td>"+item.Numbers+"</td>"+
					"<td>"+formatEnabled(item.IsEnabled)+"</td>"+
					"<td>"+formatEnabled(item.IsShow)+"</td>"+
					"<td><a href='ad_ad.html?ClassID="+classid+"&MediaID=" + item.ID + "'>添加广告</a>&nbsp<a href='javascript:void("+item.ID+")' onclick='get_record("+item.ID+")'>编辑</a></td>"
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
        url: "http://ggfx.syyx.cn/ad_media_record?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ID : id},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            //显示记录
			if(json.rows.length>0){
                var item = json.rows[0];    
                $("#hidID").val(item.ID);
                $("#ddlClass").val(item.ClassID);
				$("#txtMediaName").val(item.MediaName);
				$("#txtMediaRemark").val(item.MediaRemark);
				$("#chkIsEnabled").attr("checked",item.IsEnabled);
				$("#chkIsShow").attr("checked",item.IsShow);				
            }        
        }
    });
}
//--------------------------------------------------------------------------------------------------------
//新增记录
//--------------------------------------------------------------------------------------------------------
function add_record() {
    var classid = $("#ddlClass").val();
	var medianame =$("#txtMediaName").val();
	var mediaremark =$("#txtMediaRemark").val();
	var isenabled =$("#chkIsEnabled").attr("checked");
	var isshow =$("#chkIsShow").attr("checked");

    if(classid<=0){
        alert("请选择媒体类型")
        return;
    }
    
    if(!medianame || medianame==""){ 
        alert("媒体名称不能为空")
        return
    }  

    $.ajax({
        url: "http://ggfx.syyx.cn/ad_media_add?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ClassID:classid,MediaName:medianame,MediaRemark:mediaremark,IsEnabled:isenabled,IsShow:isshow,AddUserId:1 },
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
    var classid = $("#ddlClass").val();
	var medianame =$("#txtMediaName").val();
	var mediaremark =$("#txtMediaRemark").val();
	var isenabled =$("#chkIsEnabled").attr("checked");
	var isshow =$("#chkIsShow").attr("checked");

    if(classid<=0){
        alert("请选择媒体类型")
        return;
    }

    if(!medianame || medianame==""){ 
        alert("媒体名称不能为空")
        return
    }  
    
    $.ajax({
        url: "http://ggfx.syyx.cn/ad_media_update?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ID:id, ClassID: classid,MediaName:medianame,MediaRemark:mediaremark,IsEnabled:isenabled,IsShow:isshow },
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
function init_adclass_list(def_id){
    $("#ddlClass").empty();    
    $("#ddlClass").append("<option value=-1>请选择</option"); 
    $("#ddlSearchClass").empty();     
    $("#ddlSearchClass").append("<option value=0>所有</option");
    get_adclass_list(function(json){
        //显示记录            
        $.each(json, function(i, item) {            
            $("#ddlClass").append("<option value='" + item.ID + "'>" + item.ClassName+ "</option>");  
            $("#ddlSearchClass").append("<option value='" + item.ID + "'>" + item.ClassName+ "</option>");  
        })

        $("#ddlSearchClass").val(def_id);

        get_list();        
    });
}
//--------------------------------------------------------------------------------------------------------