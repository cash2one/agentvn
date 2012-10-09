function get_radio_server(){
    var partNameKey = {};
    var divBody = "<div class='serverlist_box'>"
    $.ajax({
        url:'http://nysjdm.syyx.cn/parameter/link_server_list?r='+Math.random(),
        type:'get',
        dataType:'json',
        data:{},
        beforeSend:function(){$("#loading").show();},
        complete:function(){$("#loading").hide();},
        success:function(json){
            $('#radioDetailList').empty();
            var serverlistLen = json.rows.length;
            var serverlistObj = {};
            for(var i = 0 ; i < serverlistLen; i++){
                if(!serverlistObj[json.rows[i].PartName]){
                    serverlistObj[json.rows[i].PartName] = [{Title : json.rows[i].Title, ServerID : json.rows[i].ServerID}]
                }else{
                    serverlistObj[json.rows[i].PartName].push({Title : json.rows[i].Title, ServerID : json.rows[i].ServerID})
                }
            }
            for(var serverKey in serverlistObj) {
                divBody += "<div class='part_server'>";
                divBody += "<h1><font size='3' color='#9F5F9F'>" + serverKey + "</font></h1>";
                divBody += "<div class='about_part'>";
                var partserverLen = serverlistObj[serverKey].length;
                for(var j = 0; j < partserverLen; j++) {
                    var serverItem = serverlistObj[serverKey][j];
                    divBody += "<input id='radioServer" + serverItem.ServerID + "' name='radioServer' type='radio' value='" + serverItem.ServerID + "'><span>" + serverItem.Title + "</span></input>";
                }
                divBody += "</div></div>";
            }
            divBody += "</div>"
            $(divBody).appendTo("#radioDetailList");

            $('#radioserverList').dialog({
            buttons: [{
                text: '确定',
                iconCls: 'icon-ok',
                handler: function() {
                    close_window();
                } }]
            });
        }
    })     
}

function close_window(){
    $('#radioserverList').window('close');  
}

function show_window(){
    $('#radioserverList').window('open');  
}

function get_server_value(){
    var v_radio = document.getElementById('rdAll');
    if(v_radio.checked){
         return 0;
    }
    var v_server = "";
    var radio_val  = $('input:radio[name="radioServer"]:checked').val();
    var radio_text = $('input:radio[name="radioServer"]:checked + span').text();
    if(radio_val==null){
        return -1;
    }
    else{
       $('#hiddenServerName').val(radio_text);
       return radio_val;
    }
}

