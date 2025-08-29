#!/usr/bin/env node
const { setProxy, closeProxy } = require('./index.js')

const argv = process.argv.slice(2)
const [networkState, ...args] = argv

/**
 * 解析代理参数，支持两种格式：
 * 1. host:port [username] [password]
 * 2. host port [username] [password]
 */
function parseProxyArgs(args) {
  if (args.length === 0) {
    throw new Error('Missing host and port arguments')
  }

  let host, port, username, password

  // 检查第一个参数是否包含冒号（host:port 格式）
  if (args[0].includes(':')) {
    const [hostPart, portPart] = args[0].split(':')
    host = hostPart
    port = portPart
    username = args[1]
    password = args[2]
  } else {
    // host port 格式
    host = args[0]
    port = args[1]
    username = args[2]
    password = args[3]
  }

  if (!host || !port) {
    throw new Error('Both host and port are required')
  }

  return { host, port, username, password }
}

if (networkState === 'on') {
  try {
    const { host, port, username, password } = parseProxyArgs(args)
    setProxy(host, port, username, password)
  } catch (error) {
    console.log(`
    Error: ${error.message}
    Usage: osProxy on <host>:<port> [<username>] [<password>]
    Usage: osProxy on <host> <port> [<username>] [<password>]
    Usage: osProxy off
    
    Examples:
    osProxy on 127.0.0.1:8001
    osProxy on 127.0.0.1 8001
    osProxy on 127.0.0.1:8001 username password
    osProxy on 127.0.0.1 8001 username password
  `)
    process.exit(1)
  }
} else if (networkState === 'off') {
  closeProxy()
} else {
  console.log(`
    networkState is invalid, it should be on or off
    Usage: osProxy on <host>:<port> [<username>] [<password>]
    Usage: osProxy on <host> <port> [<username>] [<password>]
    Usage: osProxy off
    
    Examples:
    osProxy on 127.0.0.1:8001
    osProxy on 127.0.0.1 8001
    osProxy on 127.0.0.1:8001 username password
    osProxy on 127.0.0.1 8001 username password
  `)
  process.exit(1)
}