exports.action = function(req,res){
    var upload_time = (new Date()).getTime()
    var form        = new ms.formidable.IncomingForm();
    form.uploadDir  = process.env.HOME + "/code/node_webs/sites/r.syyx.com/public/party/nycs/_att/notalone/"

    form.parse(req, function(err, fields, files) {

        if (err) {
            console.log(err)
            this_send(res, "0")
            return
        }

        if(!files.tupian){
            this_send(res, "0")
            return
        }

        if(files.tupian.size <= 0){
            this_send(res, "0")
            return
        }

        var file_type = get_file_type(files.tupian.name)
        if(!check_file_type(file_type)){
            this_send(res, "1")
            return
        }
        var newfile = upload_time + '.' + file_type

        if(files.tupian.type.substring(0,5) != "image"){
            this_send(res, "1")
            ms.fs.unlink(files.tupian.path,function(){})
            return
        }

        if(files.tupian.size > 1 * 1024 *1024){
            this_send(res, "2")
            ms.fs.unlink(files.tupian.path,function(){})
            return
        }

        ms.fs.rename(files.tupian.path, form.uploadDir + newfile, function(err) {
            //生成缩略图
            ms.thumbnail.convert(form.uploadDir + newfile,form.uploadDir + upload_time + "_2.jpg", { w : 218, h : 141 },function(err){
                if(err){
                    ms.fs.unlink(form.uploadDir + newfile,function(){})
                    console.log("thumbnail err:")
                    console.log(err)
                    this_send(res, "0")
                    return
                }
                var pic = {
                    p1   : newfile,
                    p2   : upload_time + "_2.jpg",
                    r    : "success"
                }
                get_imgw(res, form.uploadDir + newfile,  pic)

            })
            //this_send(res, "success", newfile, upload_time + "_2.jpg", imgw.w, imgw.h) 
        })
               
    })
}

function get_imgw(res, path, pic){
    var canvas = require('canvas')
    var image  = canvas.Image
    var img = new image
    img.onerror = function(err){
        this_send(res, "0")
    }
    img.onload = function(){
        if(!img.width || img.width == 0){
            this_send(res, "0")
        }
        else{
            pic.w = img.width
            pic.h = img.height
            this_send(res, pic)
        }
    }
    img.src = path
}

function this_send(res,pic){
    if(!pic.w){
        pic = {r : pic, p1 : '', p2 : '', w : 0, h : 0}
    }
    res.redirect('/nycs/notalone/uploadsuccess?r=' + pic.r + '&p1=' + pic.p1 +'&p2='+ pic.p2 +'&w='+ pic.w+'&h='+ pic.h)
    //res.render('nycs/notalone/upload_end',pic)
}

function check_file_type(file_type){
    var _allowtype = "JPG,GIF,PNG,JPEG"
    file_type = file_type.toLocaleLowerCase()
    var strs= new Array()
    strs = _allowtype.split(',');

    for (var i = 0; i < strs.length; i++)
    {

        if (strs[i].toLocaleLowerCase() == file_type)
        {
            return true
            break
        }
    }
    return false
}

function get_file_type(filename){
    var i = filename.lastIndexOf(".");
    if(i < 0){
        return false;
    }
    else{
        return filename.substring(i + 1, filename.length)
    }
}