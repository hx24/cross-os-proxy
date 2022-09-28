#!/bin/bash
#

echo $1
echo $2

while read -r line; do
    sname=$(echo "$line" | awk -F  "(, )|(: )|[)]" '{print $2}')
    sdev=$(echo "$line" | awk -F  "(, )|(: )|[)]" '{print $4}')
    #echo "Current service: $sname, $sdev, $currentservice"
    if [ -n "$sdev" ]; then
        ifout="$(ifconfig "$sdev" 2>/dev/null)"
        echo "$ifout" | grep 'status: active' > /dev/null 2>&1
        rc="$?"
        if [ "$rc" -eq 0 ]; then
            currentservice="$sname"

            # may have multiple active devices, so echo it here
            echo "$currentservice"
        fi
    fi
done <<< "$(networksetup -listnetworkserviceorder | grep 'Hardware Port')"

if [ -z "$currentservice" ]; then
    >&2 echo "Could not find current service"
    exit 1
fi

networksetup -setwebproxystate $currentservice off    #关闭Web HTTP代理
networksetup -setsecurewebproxystate $currentservice off   #关闭Web HTTPS代理
echo  close web proxy Done