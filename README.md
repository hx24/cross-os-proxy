# cross-os-proxy

> Cross-platform system proxy configuration tool, supports macOS and Windows

[![npm version](https://badge.fury.io/js/cross-os-proxy.svg)](https://badge.fury.io/js/cross-os-proxy)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Supported platforms: 
- macOS
- Windows

## 📦 Installation

```sh
$ npm i --save cross-os-proxy
```

## 🚀 Programmatic Usage

```javascript
const osProxy = require('cross-os-proxy');

(async () => {
    await osProxy.setProxy('127.0.0.1', 9999); // set http and https proxy
    console.log('Proxy configured successfully');
})();

(async () => {
    await osProxy.closeProxy(); // close http and https proxy
    console.log('Proxy disabled');
})();
```

For authenticated proxy, pass username and password as the third and fourth parameters:

```javascript
(async () => {
    await osProxy.setProxy('127.0.0.1', 9999, 'username', 'password');
    console.log('Authenticated proxy configured successfully');
})();
```

## 💻 Command Line Usage

### Global Installation

```sh
$ npm i cross-os-proxy -g
```

### 🆕 v3.0 New Feature - Flexible Parameter Format

Now supports two parameter formats for enhanced convenience:

```sh
# Format 1: host:port (New in v3.0)
Usage: osProxy on <host>:<port> [<username>] [<password>]

# Format 2: host port (Legacy format)
Usage: osProxy on <host> <port> [<username>] [<password>]

# Disable proxy
Usage: osProxy off
```

### 📖 Examples

**Basic proxy setup:**

```sh
# Using host:port format (New in v3.0)
osProxy on 127.0.0.1:8001
osProxy on 192.168.1.100:3128

# Using separate host port format (Legacy format)
osProxy on 127.0.0.1 8001
osProxy on 192.168.1.100 3128
```

**Authenticated proxy setup:**

```sh
# Using host:port format + authentication (New in v3.0)
osProxy on 127.0.0.1:8001 myuser mypass
osProxy on proxy.company.com:8080 username password

# Using separate format + authentication (Legacy format)
osProxy on 127.0.0.1 8001 myuser mypass
osProxy on proxy.company.com 8080 username password
```

**Disable proxy:**

```sh
osProxy off
```

## 🔄 Changelog

### v3.0.0
- 🎉 **New**: Support for `host:port` format parameter input
- 🔧 **Improved**: Smarter parameter parsing while maintaining backward compatibility
- 📚 **Enhanced**: More detailed error messages and usage examples
- 🛠️ **Fixed**: Improved CLI tool error handling mechanism

### v2.x
- Support for basic host port separate format
- Support for macOS and Windows platforms
- Support for authenticated proxy

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

[ISC](https://opensource.org/licenses/ISC)
