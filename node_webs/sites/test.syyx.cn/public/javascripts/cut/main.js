var IMG_CUT = {
    width      : 100,
    height     : 100,
    upload_url : "/img_upload"
};

(function() {

    zoom   : 1,
    $("#img_cut_case").css({
        width  : IMG_CUT.width,
        height : IMG_CUT.height,
        left   : 150 - IMG_CUT.width / 2 - 1,
        top    : 150 - IMG_CUT.height / 2 - 1
    })

    var img_w
    var img_h
    var animate = false

     $("#img_cut_img").load(function() {
        img_w = this.offsetWidth
        img_h = this.offsetHeight
        
        if(img_w < 300 && img_h < 300) {
            zoom = 1
        }
        if(img_w > img_h) {
            $(this).css("width", "100%")
            zoom = 300 / img_w
        }
        if(img_w < img_h) {
            $(this).css("height", "100%")
            zoom = 300 / img_h
        }
        $(this).css({
            "margin-top"  : -img_h * zoom / 2, 
            "margin-left" : -img_w * zoom / 2, 
            "opacity"     : "1",
            "filter"      : "alpha(opacity=100)"
        })
        $("#img_cut_view").css("display", "block")
        $("#img_cut_action").css("display", "block")
        $("#img_cut_zoom").css("display", "block")
    })

    $("#img_cut_zoom_big").click(function(event) {
        event.preventDefault()
        if(zoom == 1 || animate == true) {
            return
        }
        var zoom_b = zoom + 0.1
        if(zoom_b >= 1) {
            zoom_b = 1
        }

        var marginLeft = $("#img_cut_img").css("margin-left").replace("px", "")
        var marginTop = $("#img_cut_img").css("margin-top").replace("px", "")
        animate = true
        $("#img_cut_img").stop().animate({
            "width"       : zoom_b * img_w,
            "margin-top"  : marginTop * (0.1 / zoom + 1),
            "margin-left" : marginLeft * (0.1 / zoom + 1)
        }, function() {animate = false})
        zoom = zoom_b
    })

    $("#img_cut_zoom_small").click(function(event) {
        event.preventDefault()

        if(Math.max(img_w * zoom, img_h * zoom ) <= 300 || animate == true) {
            return
        }
        var zoom_s = zoom - 0.1
        if(Math.max(zoom_s * img_w, zoom_s * img_h) <= 300) {
            zoom_s = 300 / img_w
        }

        var marginLeft = $("#img_cut_img").css("margin-left").replace("px", "") - 0
        var marginTop = $("#img_cut_img").css("margin-top").replace("px", "") - 0
        animate = true
        $("#img_cut_img").animate({
            "width"       : zoom_s * img_w,
            "margin-top"  : marginTop * (1 - 0.1 / zoom),
            "margin-left" : marginLeft * (1 - 0.1 / zoom)
        }, function() {animate = false})
        zoom = zoom_s
    })

    function drag(target_obj, action_obj) {
        var coor1 = []
        var p1    = []
        var p2    = {"margin-left" : 0 , "margin-top" : 0}
        $(action_obj).mousedown(function(event) {        
            coor1 = [event.pageX, event.pageY]
            p1    = [$(target_obj).css("margin-left").replace("px", "") - 0, $(target_obj).css("margin-top").replace("px", "") - 0]
            event.stopPropagation()
            event.preventDefault()
            $(action_obj).mousemove(function(event) {
                event.preventDefault()
                event.stopPropagation()
                drag_action([event.pageX, event.pageY])
            })
            $(action_obj).one("mouseup", function() {
                $(action_obj).unbind("mousemove")
            })
            $(action_obj).one("mouseout", function() {
                $(action_obj).unbind("mousemove")
            })
        })

        function drag_action(coor2) {     
            p2["margin-left"] = p1[0] + coor2[0] - coor1[0]
            p2["margin-top"]  = p1[1] + coor2[1] - coor1[1]

            var min_left = 150 + img_w * zoom
            var min_top  = 150 + img_h * zoom

            if(p2["margin-left"] < - min_left) {
                p2["margin-left"] = - min_left
            }
            if(p2["margin-left"] > 150) {
                p2["margin-left"] = 150
            }
            if(p2["margin-top"] < - min_top ) {
                p2["margin-top"] = - min_top
            }
            if(p2["margin-top"] > 150) {
                p2["margin-top"] = 150
            }
            $(target_obj).css(p2)
        }
    }

    drag("#img_cut_img", "#img_cut_drug")



    $("#img_cut_upload_sub").click(function() {
        var iframe = document.createElement("iframe");
        var str_id = "iframe_post"  + new Date().getTime()
        iframe.id=str_id
        document.body.appendChild(iframe);
        iframe.style.display = "none";
        iframe.contentWindow.name = str_id;
        $(iframe).bind({"load" : function() {
            var url = window.frames[str_id].document.body.innerHTML
            if(url !== "err") {
                $("#img_cut_upload span").append($("#img_cut_file"))
                $("#post_iframe").remove()
                $("#post_form").remove()
                $("#img_cut_img").attr("src", url).css("display", "inline")
                $("#img_cut_view span").fadeOut()
            } else {
                alert("服务器错误")
            }

        }})
        var form = document.createElement("form");
        form.id = "post_form"
        form.action = IMG_CUT.upload_url
        form.method = "POST"
        form.enctype = "multipart/form-data"
        form.target = str_id
        form.style.display = "none";
        $(form).append($("#img_cut_file"))
        $(document.body).append(form)
        $("#post_form").submit();

        $("#img_cut_view").css("display", "block")
        $("#img_cut_upload").css("display", "none")
    })

    $("#img_cut_zoom_num").click(function() {
        var x = - IMG_CUT.width / 2 - $("#img_cut_img").css("margin-left").replace("px", "") 
        var y = - IMG_CUT.height / 2 - $("#img_cut_img").css("margin-top").replace("px", "")
        //x.Math.round()
        alert("宽度：" + IMG_CUT.width + "\t高度：" + IMG_CUT.height + "\t缩放：" + zoom * 100 + "\tx：" + x + "\ty:" + y)
    })

    $("#img_cut_zoom_rep").click(function() {
        $("#img_cut_box *").not("#img_cut_case").removeAttr("style")
        $("#img_cut_img").removeAttr("src")
    })
})()