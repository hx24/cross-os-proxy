# cross-os-proxy

> configure system proxy settings

support platforms: 
- windows
- macOS

## Install
```
$ npm install --save cross-os-proxy
```

## Usage

```javascript
const osProxy = require('cross-os-proxy')

(async () => {
    await osProxy.setProxy('127.0.0.1', 9999)
    console.log('done')
})()

```

You can also specify the platform

```javascript
const osProxy = require('cross-os-proxy')

osProxy.win32.setProxy('127.0.0.1', 9999) // windwos
osProxy.darwin.setProxy('127.0.0.1', 9999) // macOS
```


Set http and https separately (only support in macOS)

```javascript
const osProxy = require('cross-os-proxy')
osProxy.setHttpProxy('127.0.0.1', 9999)
osProxy.setHttpsProxy('127.0.0.1', 9999)

osProxy.closeHttpProxy()
osProxy.closeHttpsProxy()
```

