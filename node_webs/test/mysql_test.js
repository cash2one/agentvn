var http = require('http')

var client_count = 3000

var finished_count = 0

var clients = []

var start = new Date()

var args_head = '/test?name=wang&account='
var args_tail = '&tele=1562525&sex=%E7%94%B7'

for(var i = 0; i<client_count; i++) {
	var client = http.createClient(80, '192.168.2.40')
	var args   = args_head + i + args_tail
	var request = client.request('GET', args,{'host': 'events.syyx.com'});
	request.end();
	request.on('response', function (response) {
		response.on('data', function (chunk) {
			finished_count ++ 

			if(finished_count == client_count) {
				var end = new Date()
				console.log(end - start)
			}
		})
	})	
}
