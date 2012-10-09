//-------------------------------------------------------------------------------------------------
// candidates.js
//-------------------------------------------------------------------------------------------------
exports.action = function(req, res) {
    var ip = ms.u2.get_req_ip(req)
    
    var db = ms.db_mongo['hr']
    var cl = db.collection('tshirt_vote')

    cl.find({ ip : ip }).toArray(function(err, arr) {
        if (err) {
            console.log(err)
            res.send({ type : 2 })
            return
        }

        if (arr.length > 1) {
            res.send({ type : 1 })
            return
        }

        if (arr.length == 1) {
            res.send( { type : 0, shirts : shirts, vote : arr[0] })
            return
        }

        res.send( { type : 0, shirts : shirts } )
    })
}
//-------------------------------------------------------------------------------------------------
var shirts = [
    {
        id       : 1,
        name     : 'FIVE',
        designer : '雷啦'
    },
    {
        id       : 2,
        name     : '尚品',
        designer : '开心'
    },
    {
        id       : 3,
        name     : '征途',
        designer : '聪头'
    },
    {
        id       : 4,
        name     : '创想',
        designer : '空气'
    },
    {
        id       : 5,
        name     : '龙腾世代（白色）',
        designer : '沸金'
    },
    {
        id       : 6,
        name     : '“树”愿',
        designer : '百合&鱼子'
    },
    {
        id       : 7,
        name     : '一路向前',
        designer : '海盗'
    },
    {
        id       : 8,
        name     : '眼睛',
        designer : 'OE'
    },
    {
        id       : 9,
        name     : '未来之峰',
        designer : '纯色'
    },
    {
        id       : 10,
        name     : '易尚',
        designer : '若谷'
    },
    {
        id       : 11,
        name     : '在路尚',
        designer : '薇儿'
    },
    {
        id       : 12,
        name     : '一路向前-变形金刚版',
        designer : '海盗'
    },
    {
        id       : 13,
        name     : '尚游他她',
        designer : '雷啦'
    },
    {
        id       : 14,
        name     : '心环',
        designer : 'OE'
    },
    {
        id       : 15,
        name     : '飞吧`5',
        designer : '莲酱'
    },
    {
        id       : 16,
        name     : '龙腾世代（黑色）',
        designer : '沸金'
    },
    {
        id       : 17,
        name     : '希望之窗',
        designer : '小猪'
    },
    {
        id       : 18,
        name     : 'Together（手心）',
        designer : '彩虹'
    },
    {
        id       : 19,
        name     : 'give me five',
        designer : '耳环'
    },
    {
        id       : 20,
        name     : '眼镜星人',
        designer : '静儿'
    },
    {
        id       : 21,
        name     : '气质格纹',
        designer : '小猪'
    },
    {
        id       : 22,
        name     : '金属5',
        designer : 'OE'
    },
    {
        id       : 23,
        name     : '在路上',
        designer : '楚风'
    },
    {
        id       : 24,
        name     : '硕果',
        designer : '聪头'
    },
    {
        id       : 25,
        name     : 'Together（诺亚风）',
        designer : '彩虹'
    },
    {
        id       : 26,
        name     : '拼搏之地',
        designer : '小猪'
    },
    {
        id       : 27,
        name     : '五角星',
        designer : 'OE'
    },
    {
        id       : 28,
        name     : '5爱尚游',
        designer : '奶昔'
    },
    {
        id       : 29,
        name     : '我要飞翔',
        designer : '鲫鱼'
    },
    {
        id       : 30,
        name     : '梦想的拼图',
        designer : '巴伊'
    },
    {
        id       : 31,
        name     : '无限',
        designer : '西米'
    },
    {
        id       : 32,
        name     : '畅想',
        designer : '面包'
    },
    {
        id       : 33,
        name     : '多彩尚游',
        designer : '火柴'
    },
    {
        id       : 34,
        name     : '维魅',
        designer : '维克'
    }

]
//-------------------------------------------------------------------------------------------------