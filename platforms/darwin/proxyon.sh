#!/bin/bash
#

echo $1
echo $2
echo $3

if  [  "$2"  !=  ""  ];  then
    networksetup -setwebproxy $3 $1 $2    #设置Web HTTP代理
    networksetup -setsecurewebproxy $3 $1 $2    #设置Web HTTPS代理
fi

networksetup -setwebproxystate $3 on    #打开Web HTTP代理
networksetup -setsecurewebproxystate $3 on   #打开Web HTTPS代理
echo  Done