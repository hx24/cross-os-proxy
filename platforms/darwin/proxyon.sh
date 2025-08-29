#!/bin/bash
#

networkService=$1
host=$2
port=$3 
username=$4
password=$5

if  [  "$networkService"  !=  ""  ];  then
    if  [  "$username"  !=  ""  ];  then
        networksetup -setwebproxystate $networkService off    #关闭Web HTTP代理
        networksetup -setsecurewebproxystate $networkService off   #关闭Web HTTPS代理
        
        networksetup -setwebproxy $networkService $host $port on $username $password  #设置Web HTTP代理
        networksetup -setsecurewebproxy $networkService $host $port on $username $password  #设置Web HTTPS代理
    else
        networksetup -setwebproxy $networkService $host $port  #设置Web HTTP代理
        networksetup -setsecurewebproxy $networkService $host $port    #设置Web HTTPS代理
    fi
fi

networksetup -setwebproxystate $networkService on    #打开Web HTTP代理
networksetup -setsecurewebproxystate $networkService on   #打开Web HTTPS代理
echo  Done