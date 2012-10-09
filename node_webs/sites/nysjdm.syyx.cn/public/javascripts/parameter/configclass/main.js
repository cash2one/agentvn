$(document).ready(function(){
    
    $('#hiddenID').val(0);
    clear_form();
    getParamsList();
    
    $('#btnAdd').toggle(function(){
        $('#btnAdd').val("取消")
        clear_form();
    },function(){
        $('#btnAdd').val("添加")
        clear_form();
    })

    $('#btnSave').bind('click',function(){
        if($('#hiddenID').val()==0){
            add_class();
        }else{
            upd_class();
        }
    })

    $('#configClass').change(function(event){       
        var paramsType = $(this).children('option:selected').val();
        getClassList(paramsType);
        $('#configClassDel').val(paramsType);
        $('#txtClassNo').val('');
        $('#txtClassName').val('');
        event.stopPropagation();
    })

})

//获取大类列表
function getParamsList(){
    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/config_params_list?r='+Math.random(),
        type:'get',
        dataType:'json',
        data:{},
        beforeSend:function(){$("#loading").show();},
        complete:function(){$("#loading").hide();},
        success:function(json){
            $('#configClass').empty();
            $.each(json.rows,function(i,item){
                $('<option value="'+item.ParamsFlag+'"> '+item.ParamsName+'</option>')
                    .appendTo($('#configClass'));
                $('<option value="'+item.ParamsFlag+'"> '+item.ParamsName+'</option>')
                    .appendTo($('#configClassDel'));
            })
            getClassList($('#configClass').children('option:selected').val())
        }
    })
}

//获取类型列表
function getClassList(paramsType){
    $('#listconfigPara').datagrid({
                url: 'http://nysjdm.syyx.cn/parameter/config_class_list_post?ParamsType=' + paramsType + '&r=' + Math.random(),
                title: '参数配置',
                width: 600,
                fitColumns: true,
                nowrap: false,
                rownumbers: true,
                singleSelect: true,
                columns: [[
                    { field: 'ClassNo', title: '编号', width: 100, align: 'center' },
                    { field: 'ClassName', title: '名称', width: 250, align: 'center' },
                    { field: 'op', title: '操作', width: 60, align: 'center', formatter: function(value, rec) {
                        return "<a href='#' onclick=get_record_info(" + rec.ID + ")>编辑</a>  <a href='#' onclick=del_record_info(" + rec.ID + ")>删除</a>";
                    }
                    }
                ]]
            });
}

//获取类型具体明细
function get_record_info(classID){
     $('#configClassDel').val($('#configClass').children('option:selected').val());
     $('#hiddenID').val(classID);
     $.ajax({
        url: "http://nysjdm.syyx.cn/parameter/config_class_info?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: {ClassID : classID},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            if(json.rows.length>0){
                var item = json.rows[0];                
                $("#txtClassNo").val(item.ClassNo); 
                $('#txtClassName').val(item.ClassName);
            }         
        }
    });
}

//删除类型具体明细
function del_record_info(classID){
       $.messager.confirm("确认", "确定要删除该记录吗？", function(r) {
                if (r) {
                         $.ajax({
                            url: "http://nysjdm.syyx.cn/parameter/config_class_del?r="+Math.random(),
                            type: "get",
                            dataType: "json",
                            data: {ClassID : classID},
                            beforeSend: function() { $("#loading").show(); },
                            complete: function() { $("#loading").hide(); },
                            success: function(json) {
                                if(json.err == 0){
                                    $.messager.alert("提示", "删除记录成功", "info");
                                    var classType = $('#configClass').val();
                                    getClassList(classType);
                                    return
                                }else{
                                    $.messager.alert("提示", "<font color=red><b>删除记录失败</b></font>", "error");
                                    return
                                }         
                            }
                        });
                }
        });
}

//取消服务器配置
function clear_form(){
    $('#hiddenID').val(0);
    $('#txtClassNo').val('');
    $('#txtClassName').val('');
}

//添加新类型
function add_class(){
    var classNo    = $('#txtClassNo').val();
    var className  = $('#txtClassName').val();
    var paramsType = $('#configClassDel').val();
    
    if(!classNo || classNo == ""){
        $.messager.alert("提示", "<font color=red><b>编号不能为空</b></font>", "error");
        return
    }

    if(!className || className == ""){
        $.messager.alert("提示", "<font color=red><b>名称不能为空</b></font>", "error");
        return
    }

    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/config_class_add?r='+Math.random(),
        type:'get',
        dataType:'json',
        data:{ClassNo:classNo,ClassName:className,ParamsType:paramsType},
        beforeSend:function(){$("#loading").show();},
        complete:function(){$("#loading").hide();},
        success:function(json){
            if (json.err == 0){
                $.messager.alert("提示", "添加记录成功", "info");
                var classType = $('#configClassDel').val();
                getClassList(classType);
                return
            }else{
                $.messager.alert("提示", "<font color=red><b>添加记录失败</b></font>", "error");
                return
            }
        }
    })
}

//添加新类型
function upd_class(){
    var classID    = $('#hiddenID').val();
    var classNo    = $('#txtClassNo').val();
    var className  = $('#txtClassName').val();
    var paramsType = $('#configClassDel').val();
    
    if(!classNo || classNo == ""){
        $.messager.alert("提示", "<font color=red><b>编号不能为空</b></font>", "error");
        return
    }

    if(!className || className == ""){
        $.messager.alert("提示", "<font color=red><b>名称不能为空</b></font>", "error");
        return
    }

    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/config_class_upd?r='+Math.random(),
        type:'get',
        dataType:'json',
        data:{ClassID:classID,ClassNo:classNo,ClassName:className,ParamsType:paramsType},
        beforeSend:function(){$("#loading").show();},
        complete:function(){$("#loading").hide();},
        success:function(json){
            if (json.err == 0){
                $.messager.alert("提示", "更新记录成功", "info");
                var classType = $('#configClassDel').val();
                getClassList(classType);
                return
            }else{
                $.messager.alert("提示", "<font color=red><b>更新记录失败</b></font>", "error");
                return
            }
        }
    })
}