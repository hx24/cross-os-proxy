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
const osProxy = require('cross-os-proxy');

(async () => {
    await osProxy.setProxy('127.0.0.1', 9999); // set http and https proxy
    console.log('done');
})();

(async () => {
    await osProxy.closeProxy(); // close http and https proxy
    console.log('done');
})();

```

