#!/bin/sh
	
if [ x$1 = x ]
then
    echo no specific port
else
    (NODE_ENV=production ../tools/node/node ./framework/vhosts.js $1 &>node_$1.log&)
fi
