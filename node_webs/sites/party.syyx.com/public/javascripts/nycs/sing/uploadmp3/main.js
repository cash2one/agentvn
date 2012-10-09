$(function(){

    $.get("/check_user_login?r=" + Math.random(), function(data) {

        if(!data.login){
            document.location = "/nycs/sing/login.html"
        }
        
        $.get("/nycs/sing/get_myinfo?UserID="+ data.UserID +"&r=" + Math.random(), function(rows) {
            if(rows.length > 0){
                if(!rows[0]["IsCheck"]){                       
                    document.location = "/nycs/sing/login.html"
                    return
                }
            }
        })

    }, "json")


    $("#txtFile").change(function() {
        $("#fake_1").val( $(this).val() )
    })

    $("#selectimg").click(function(){
        if(!$("#txtFile").val()){
            $("#loginerr", window.parent.document).html("请选择上传作品")
            return
        }
        parent.state_up()
       document.getElementById("form1").submit()
    })
    
})