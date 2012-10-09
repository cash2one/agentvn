
exports.action = function(req, res) {

    var page            = req.body.p || 1
    var db              = ms.db.mongo['party']
    var cl              = db.collection('question_list')
    //cl.update({},{ $set : {addtime : new Date().getTime()}},{multi : true})
    cl.find({},{addtime : 1, config : 1, name : 1, question : 1, answers : 1 , deltime : 1, deluser :1, adduser : 1, stat : 1}).limit(20).skip((page - 1) * 20).sort({deltime : 1,addtime : -1}).toArray(function(err, arr){
        if(!arr) {
            res.send({type : 0})//没有数据
            return
        }
        var len = arr.length
        for(var i = 0 ; i < len ; i ++ ){
            var q_len = arr[i].question.length
            if(arr[i].question[q_len - 1] == "") {
                arr[i].question = q_len - 1
            } else {
                arr[i].question = q_len
            }            
        }

        cl.find().count(function(err, count) {
            res.send({type : 1, data : {count : count , json : arr}})
        })
    })
    // for(var i=0; i < 20; i++) {
    //     cl.insert({
    //         name    : '《诺亚传说时间版》调查问卷' + i,
    //         adduser : '火柴',
    //         addtime : new Date(),
    //         deltime : 0,
    //         deluser : ''
    //     })
    // }

    // cl.find().limit(1).sort({_id})
    // cl.find({id}).limit(20).sort({ time : -1}).toArray(function(err, arr){

    // })
    // var question_list   = ms.csv().fromPath(__dirname + "/../../../data/nycs/questionnaire/question_list.csv")
    // var ret             = {count : 0 , json : []}
    // question_list.on("data", function(data ,index) {
    //     if(!data[0]) {
    //         res.send({type : 0})//没有数据
    //         return
    //     }
    //     if(index > page * 20 || index < page * 20 - 19) {
    //         return
    //     }
    //     ret.json.push({ 
    //         id      : index,
    //         file    : data[0], 
    //         name    : data[1],
    //         author  : data[2]
    //     })        
    // })
    // question_list.on("end", function(count) {
    //     ret.count = count - 1
    //     res.send({type : 1, data : ret})
    //     return
    // })
}