//-----------------------------------------------------------------------------------------------
var db = ms.db.mongo['party']
var dating = db.collection('dating')
//-----------------------------------------------------------------------------------------------
var record_count = 0 
//-----------------------------------------------------------------------------------------------
dating.count( {}, function(err, count) {
	err && console.log(err)
	record_count = count
})

//-----------------------------------------------------------------------------------------------
exports.get_show_images = function(req, res) {
	var record_index = []

	if(record_count<10) {
		dating.find().toArray( function(err, rows){
			if(err) {
				console.log(err)
				res.send("-1")
				return 
			}		

			res.send(rows)
		})

		return	
	}

	for(var i = 0; i<6;) {
		var random_index = ms.u2.random_int(0, record_count-1)
		
		if(record_index.indexOf(random_index)<0) {
			record_index.push(random_index)
			i++
		}
	}	

	dating.find().toArray( function(err, rows){
		if(err) {
			console.log(err)
			res.send("-1")
			return 
		}

		var result = []

		for(var i in record_index) {
			result.push(rows[record_index[i]])
		}

		res.send(result)
	})	
}
//-----------------------------------------------------------------------------------------------
exports.add_record = function(req, res) {
	delete req.body.r
	
	dating.insert(req.body, function(err) {
		if(err) {
			console.log(err)
			res.send("-1")
			return 
		}

		record_count++
		res.send("0")
	})
}
//-----------------------------------------------------------------------------------------------
exports.redirect = function(req, res) {
	res.redirect("http://party.syyx.com/nycs/dating/index.html")
}