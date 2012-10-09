module.exports = {
    id : 1,
    name : 'example',
    desc : 'a party example',
    begin : Date(),
    end   : Date(),
    
    bfs : [
        {
            id : 1,
            type : 'vote',
            conf : {
                vote_types : [ 'ding', 'cai' ],
                candidates : [ { id : 1, name : 'hello' }, { id : 2, name : 'world' } ]
            }
        }
    ],
}