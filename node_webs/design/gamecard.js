exports.design = {
    requirements : [
        { 
            id : 1, 
            content : 'user retrive card' 
        },

        { 
            id : 2, 
            content : 'user activate card' 
        },

        { 
            id : 3, 
            content : 'user use card' 
        },

        { 
            id : 4, 
            content : 'agent retrive cards' 
        },

        { 
            id : 5, 
            content : 'agent query cards state', 
            detail : [
                { id : 1, content : '' },
            ],
        },

        { 
            id : 6, 
            content : 'agent config category data',
            detail : [
                { id : 1, content : 'agent config category(name, level)' },
            ],
        },
    ],

    db : {
        name : 'gamecard',
        collections : {
            'categroy' : { id : 1, name : '', desc : '', level : 0 },
            'types'    : { id : 1, name : '', desc : '', category : 1 },
            'cards'    : { id : 1, type : '', desc : '', prefix : '11', offset : 10 },

            'retrive'  : { type : '', current : 12345 },
            'activate' : { card : '', account : '', time : '' },
            'used'     : { card : '', server : '', account : '', role : '', time : '' },

            'retrive_log' : { type : '', count : '', agent : '', time : '' },
        },
    },

    model : {
        'gamecard' : {
            'retrive' : { 
                input  : { type : '', count : 1, account : '' }, 
                output : { retval : [] }
            },

            'activate' : {
                input  : { card : '', account : '' },
                output : { retval : true },
            },

            'use' : {
                input  : { card : '', server : '', account : '', role : '' },
                output : { retval : true },
            },
        }
    },

    sites : {
        'admingcard.syyx.cn' : {
            pages : {
                '/config.html'  : {},
                '/retrive.html' : {},
                '/query.html'   : {},
            },

            routes : {
                '/add_category' : {
                    input  : { name : '', desc : '', level : '' },
                    output : { retcode : 0 },
                },

                '/add_type' : {
                    input  : { name : '', desc : '', category : '' },
                    output : { retcode : 0 },
                },

                '/new_card' : {
                    input  : { type : '', desc : '' },
                    output : { retcode : 0 },
                },

                '/retrive' : {
                    input  : { type : '', count : 1000 }, 
                    output : { retcode : 0, path : '' },
                },
            }
        },
    }
}