var thumbnail2 = require('thumbnail2')

var jpg = '/d/code/node_webs'+'/test/jpg.jpeg'
var png = '/d/code/node_webs'+'/test/png.png'
var gif = '/d/code/node_webs'+'/test/gif.gif'

var jpg_des = '/d/code/node_webs'+'/test/des1.jpg'
var png_des = '/d/code/node_webs'+'/test/des2.png'
var gif_des = '/d/code/node_webs'+'/test/des3.gif'

var size_limit = { w: 500 , h : 500}

thumbnail2.convert(bmp, bmp_des, size_limit, function() {
	thumbnail2.convert(png, png_des, size_limit , function() {
		thumbnail2.convert(gif, gif_des, size_limit , function() {
		})	
	})
})