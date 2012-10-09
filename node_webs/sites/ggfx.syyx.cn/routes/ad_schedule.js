//--------------------------------------------------------------------------------------------------------
// ad_schedule_list.js
//--------------------------------------------------------------------------------------------------------
var adschedule = require("../model/ad_schedule.js")

exports.action = function(req, res) {
	var stattime = req.body.StatTime

	adschedule.get_list(stattime, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})   
}
//--------------------------------------------------------------------------------------------------------

exports.getpagelist = function(req, res) {
	var pageindex = req.body.PageIndex
	var pagesize = req.body.PageSize
	var classid = req.body.ClassID
	var mediaid = req.body.MediaID
	var adid = req.body.ADID

    adschedule.get_page(classid, mediaid, adid, pageindex, pagesize, function(err, counts, rows){   	
    	res.send({ "total": counts ,"rows" : rows })  
    })    
}  
//--------------------------------------------------------------------------------------------------------
exports.getrecord = function(req, res) {
	var id = req.body.ID    
    adschedule.get_record(id, function(err, rows){    	
    	res.send({ "rows" : rows })  
    })    
}
//--------------------------------------------------------------------------------------------------------
exports.addrecord = function(req, res) {
	var id =  req.body.ID 
	var adid =  req.body.ADID 
	var pricetype =  req.body.PriceType 
	var adprice =  req.body.AdPrice 
	var adcolor =  req.body.AdColor 
	var syear =  req.body.SYear 
	var smonth =  req.body.SMonth 
	var day1 =  req.body.Day1 
	var day2 =  req.body.Day2 
	var day3 =  req.body.Day3 
	var day4 =  req.body.Day4 
	var day5 =  req.body.Day5 
	var day6 =  req.body.Day6 
	var day7 =  req.body.Day7 
	var day8 =  req.body.Day8 
	var day9 =  req.body.Day9 
	var day10 =  req.body.Day10 
	var day11 =  req.body.Day11 
	var day12 =  req.body.Day12 
	var day13 =  req.body.Day13 
	var day14 =  req.body.Day14 
	var day15 =  req.body.Day15 
	var day16 =  req.body.Day16 
	var day17 =  req.body.Day17 
	var day18 =  req.body.Day18 
	var day19 =  req.body.Day19 
	var day20 =  req.body.Day20 
	var day21 =  req.body.Day21 
	var day22 =  req.body.Day22 
	var day23 =  req.body.Day23 
	var day24 =  req.body.Day24 
	var day25 =  req.body.Day25 
	var day26 =  req.body.Day26 
	var day27 =  req.body.Day27 
	var day28 =  req.body.Day28 
	var day29 =  req.body.Day29 
	var day30 =  req.body.Day30 
	var day31 =  req.body.Day31 
	var isok =  req.body.IsOK 

	if(id == 0){
		adschedule.add_record(adid, pricetype, adprice, adcolor, syear, smonth, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28, day29, day30, day31, isok, function(result){
			res.send({ retcode : result })    	
		})
	}		  
	else{
		adschedule.update_record(id, adid, pricetype, adprice, adcolor, syear, smonth, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28, day29, day30, day31, isok, function(result){
			res.send({ retcode : result })    	
		})  
	}

}
//--------------------------------------------------------------------------------------------------------
exports.deleterecord = function(req, res) {
	var id = req.body.ID    
    adschedule.delete_record(id, function(result){    	
    	res.send({ retcode : result })    	
    })    
}
//--------------------------------------------------------------------------------------------------------