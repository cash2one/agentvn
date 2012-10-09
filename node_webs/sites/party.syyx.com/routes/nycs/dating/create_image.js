var gd = require("/d/code/node_modules/node-gd/node-gd.node")
var fs = require("fs")

var open = function(src) {
	var data = fs.readFileSync(src, "binary")
	return gd.createFromJpegPtr(data)
}

// var open_png = function(src) {
// 	var data = fs.readFileSync(src, "binary")
// 	return gd.createFromPngPtr(data)
// }

var save = function(img, path) {
	var data = img.pngPtr(8)

    fs.writeFileSync(path, data, "binary")
}

var read_images = function(path) {
	var images = {}
	var dirs = fs.readdirSync(path)

	for(var i in dirs) {
		var index = dirs[i].charAt(dirs[i].length-5)
		images[index] = open(path + dirs[i])
	}    

	return images
}


var jobs = ["yinengzhe", "jianwushi", "qiangxieshi", "gedoujia"]
var path = "/d/image/"

var first  = read_images(path + "A/")
var second = read_images(path + "B/")
var third  = read_images(path + "C/")
var fourth = read_images(path + "D/")

	var job = jobs[3]
	var bg_img = open(path + job + ".jpg")  

	for(j in first) {
		var first_line = first[j]

		for(var k in second) {
			var second_line = second[k]
			
			for(m in third) {
				var third_line = third[m]

				for(var n in fourth) {
					var fourth_line = fourth[n]
					
					first_line.copyResized(bg_img, 193, 21, 0, 0, 224, 15, 224, 15)
					second_line.copyResized(bg_img, 193, 68, 0, 0, 224, 15, 224, 15)
					third_line.copyResized(bg_img, 193, 123, 0, 0, 224, 15, 224, 15)
					fourth_line.copyResized(bg_img, 193, 141, 0, 0, 224, 15, 224, 15)

					save(bg_img, path + job + "/"  + j + k + m + n + ".png")
				}
			}				
		}
	}

