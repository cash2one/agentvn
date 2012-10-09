#!/bin/sh
pkill node
sleep 2

if [ x$NODE_CMD = x ]
then
    NODE_CMD=$HOME/code/tools/node/node
fi
	
VHOSTS=$HOME/code/node_webs/framework/vhosts.js

if [ x$1 = x-d ]
then
    (NODE_ENV=development $NODE_CMD $VHOSTS $1 &>node.log&)
else
    (NODE_ENV=production $NODE_CMD $VHOSTS $1 &>node.log&)
fi
