//--------------------------------------------------------------------------------------------------------
var pageindex = 1;
var pagesize = 20;

$(function(){
    get_adclass_page();

	$("#btnOK").click(function(){
        var id=$("#hidID").val();
        if(id==0){
            add_adclass();
        }
        else{
            update_adclass();
        }		
	})
})

//--------------------------------------------------------------------------------------------------------
function clear_form(){
    $("#hidID").val(0);
    $("#txtClassName").val(" ");
    $("#txtRemark").val(" ");
}
//--------------------------------------------------------------------------------------------------------
function get_adclass_page(){
    clear_form();
	$.ajax({
        url: "http://ggfx.syyx.cn/ad_class_page?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { PageIndex : pageindex, PageSize : pagesize },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            $("#tt tbody").find("tr.newrow").remove();
            //显示记录
            $.each(json.rows, function(i, item) {
                 $("<tr class='newrow'></tr>").append(
                        "<td>" + item.ClassName + "</td>" +
                        "<td>" + item.Remark + "</td>" +
                        "<td>" + item.Numbers + "</td>" +
                        "<td>" + formatEnabled(item.IsEnabled) + "</td>" +
                        "<td>" + formatEnabled(item.IsShow) + "</td>"  +                   
                        "<td><a href='ad_media.html?ClassID=" + item.ID + "'>添加媒体</a>&nbsp<a href='javascript:void("+ item.ID +");' onclick='get_adclass_record("+ item.ID +")'>编辑</a></td>"                
                     ).appendTo($("#tt tbody"));
            })

            //分页 
            /*
            $("#pp").pagination(json.total, {
                callback: get_adclass_list,
                prev_text: '« 上一页',
                next_text: '下一页 »',
                items_per_page: pagesize,
                current_page: pageindex
            });*/

            //分页
            $("#pp").pagination({
                total: json.total,
                pageSize: pagesize,
                showPageList: false,
                showRefresh: false,
                onSelectPage: function(pageIndex, pageSize) {
                    pageindex = pageIndex;
                    get_adclass_page(pageIndex);
                }
            });
        }
    });
}
//--------------------------------------------------------------------------------------------------------
function get_adclass_record(id){
    $("#hidID").val(id);

    $.ajax({
        url: "http://ggfx.syyx.cn/ad_class_record?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: {ID : id},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            if(json.rows.length>0){
                var item = json.rows[0];                
                $("#txtClassName").val(item.ClassName); 
                $("#txtRemark").val(item.Remark);
                $("#chkIsEnabled").attr("checked", item.IsEnabled)
                $("#chkIsShow").attr("checked", item.IsShow)   
            }         
        }
    });
}
//--------------------------------------------------------------------------------------------------------
function add_adclass(){
	var className = $("#txtClassName").val();
    var remark = $("#txtRemark").val();
	var isEnabled = $("#chkIsEnabled").attr("checked");
	var isShow = $("#chkIsShow").attr("checked");

    if(!className || className==""){ 
        alert("媒体类型名称不能为空")
        return
    }  

	$.ajax({
        url: "http://ggfx.syyx.cn/ad_class_add?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ClassName : className, Remark : remark , IsEnabled : isEnabled, IsShow : isShow},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            if (json.retcode == 0) {
                alert("添加媒体类型成功");    
                get_adclass_page();            
            }
            else if(json.retcode == 3){
                alert("该媒体类型已经存在");
            }
            else {
                alert("添加媒体类型失败");
            }
        }
    });
}
//--------------------------------------------------------------------------------------------------------
function update_adclass(){
    var id = $("#hidID").val();
    var className = $("#txtClassName").val();
    var remark = $("#txtRemark").val();
    var isEnabled = $("#chkIsEnabled").attr("checked");
    var isShow = $("#chkIsShow").attr("checked");

    if(!className || className==""){ 
        alert("媒体类型名称不能为空")
        return
    }  

    $.ajax({
        url: "http://ggfx.syyx.cn/ad_class_update?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ID : id, ClassName : className, Remark : remark , IsEnabled : isEnabled, IsShow : isShow},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            if (json.retcode == 0) {
                alert("修改媒体类型成功");    
                get_adclass_page();            
            }
            else if(json.retcode == 2){
                alert("该媒体类型已经存在");
            }
            else {
                alert("修改媒体类型失败");
            }
        }
    });
}
//--------------------------------------------------------------------------------------------------------
