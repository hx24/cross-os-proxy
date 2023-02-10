#!/bin/bash
#

echo $1

networksetup -setwebproxystate $1 off    #关闭Web HTTP代理
networksetup -setsecurewebproxystate $1 off   #关闭Web HTTPS代理
echo  close web proxy Done