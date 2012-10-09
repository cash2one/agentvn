{
    name : "阿萨德",
    award : "http://123",
    welcome : "123",
    thanks : "123",
    
    config : {
        login : true,
        iplimit : true,
        interval : 2,
        starttime : "2012-1-1",
        endtime : "2012-9-1"
    },
    question : [
        {
            id : 1,
            title : "你喜欢的职业",
            type : "单选",
            options : [
                { item : "剑武士" },
                { item : "枪械师", next : 5 },
                { item : "异能者" },
                { item : "格斗家" }
            ],
            other : { item : "其它", type : "text", limit : [0, 32], next : 3 },
            config : { random : true }
        },
        {
            id : 2,
            title : "你最喜欢的职业",
            type : "多选",
            options : [
                { item : "剑武士" },
                { item : "枪械师" },
                { item : "异能者" },
                { item : "格斗家" }
            ],
            config : { min : 1, max : -1, random : true }
        },
        {
            id : 3,
            title : "",
            type : "填空",
            options : [
                { item : "你的姓名", type : "zh", limit : [2, 10] },
                { item : "你的帐号", type : "word", limit : [2, 10] },
                { item : "你的手机", type : "number", limit : [11, 11] },
                { item : "你的邮箱", type : "email", limit : [5, 32] },
                { item : "你的地址", type : "text", limit : [0, 32] }
            ],
            config : { random : true }
        },
        {
            id : 4,
            title : "你有多喜欢诺亚",
            type : "打分",
            options : [
                { item : "服务器质量" },
                { item : "画面效果" },
                { item : "游戏活动" }
            ],
            config : {
                score : [1, 2, 3, 4, 5],
                range : { left : "不好", mid : "一般", right : "很好" },
                random : true
            }
        },
        {
            id : 5,
            title : "你有多喜欢诺亚",
            type : "矩阵单选",
            rows : [
                { item : "A" },
                { item : "B" },
                { item : "C", optional : true }
            ],
            columns : [
                { item : "服务器质量" },
                { item : "画面效果" },
                { item : "游戏活动" }
            ],
            config : { random : true }
        },
        {
            id : 6,
            title : "你有多喜欢诺亚",
            type : "矩阵多选",
            rows : [
                { item : "A" },
                { item : "B" },
                { item : "C" }
            ],
            columns : [
                { item : "服务器质量" },
                { item : "画面效果" },
                { item : "游戏活动" }
            ],
            config : { min : 1, max : -1, random : true }
        },
        {
            id : 7,
            title : "你有多喜欢诺亚",
            type : "说明",
            text : "hello\nworld,\n"
        },
        {
            id : 8,
            title : "你有多喜欢诺亚",
            type : "问答",
            config : { min : 0, max : 200 }
        }
    ]
}