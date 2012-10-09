var arg = {
    upload_dirname : "_att",
    form_file_name : "img_cut_file"
}

exports.action = function(req, res) {
    //var file        = req.body.img_cut_file
    var upload_time = (new Date()).getTime()
    var form        = new ms.formidable.IncomingForm();
    form.uploadDir  = __dirname + "/../public/" + arg.upload_dirname;
    form.parse(req, function(err, fields, files) {
        
        if (err) {
            console.log(err);
            res.send("err")
            return
        }
        var format = files[arg.form_file_name].name.split(".")[1]
        var path = __dirname + "/../public/" + arg.upload_dirname + "/" + upload_time + "." + format
        ms.fs.rename(files[arg.form_file_name].path, path, function() {
            res.send("/" + arg.upload_dirname + "/" + upload_time + "." + format)
        });
    })
}
