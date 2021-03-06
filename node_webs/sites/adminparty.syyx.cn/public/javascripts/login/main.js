// $.post("/login/check",function(data) {
//     if(data.ok == 0) {
//         $("button").click(function() {
//             var user =  $("#user").val()
//             var password = $("#password").val()
//             if(user == "" || password== ""){
//                 alert("请填写用户名或者密码！")
//                 return
//             }
//             $.post("/login/enter", {sUserAccount :user , sPassword : password}, function(data) {
//                 if(data.ok == 1) {
//                     document.location = "/index.html"
//                 } else {
//                     alert("帐号或密码错误！")
//                 }

//             }, "json")
//         })
//     } else{
//         document.location = "/index.html"
//     }
// },"json")


//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    bind_submit()
})
//-----------------------------------------------------------------------------------------------------
        
bind_submit()

function bind_submit() {
    $('.login_btn input').click(function(event) {
        submit_login()
        event.preventDefault()
    })
}

function un_bind_submit() {
    $('.login_btn button, #login_form').off()
}

function submit_login() {
    var form_validity = document.getElementById('login_form').checkValidity()
    if (!form_validity) {
        return
    }
    $.ajax({
        type        : 'post',
        url         : $('#login_form').attr('action'),
        data        : $('#login_form').serialize(),
        beforeSend  : function(xhr) {
            un_bind_submit()
        },
        success     : function(data) {
            if (data.ok == 1) {
                location.href = get_next_page() 
            } else {
                $('.login_btn button').html('登录')
                $('#message').show().delay('1500').fadeOut()
                bind_submit()
            }
        }
    })
}

function get_next_page() {
    if (location.hash) {
        return location.hash.substring(1)
    } else {
        return '/index.html'
    }
}