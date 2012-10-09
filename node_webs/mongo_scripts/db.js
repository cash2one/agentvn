// db = db.getSiblingDB('hr')
// db.createCollection('readme')

all_dbs = [
    'db_1',
    'db_2',
    'db_3'
]

for (var i = 0; i < all_dbs.length; ++i) {
    var db = db.getSiblingDB(all_dbs[i])
    db.addUser('sa', '123456')
}
