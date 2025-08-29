const platform = process.platform.toLowerCase()
const platformsPath = "./platforms"
const currentOsProxy = require(`${platformsPath}/${platform}`)

/**
 * set system proxy, includes http & https
 * @param {string} host proxy host eg: '127.0.0.1'
 * @param {number} port eg: 8001
 * @param {string} [username] eg: 'username'
 * @param {string} [password] eg: 'password'
 * @returns Promise
 */
async function setProxy(host, port, username, password) {
  return currentOsProxy.setProxy(host, port, username, password)
}

/**
 * close system proxy, includes http & https
 * @returns Promise
 */
async function closeProxy() {
  return currentOsProxy.closeProxy()
}

module.exports = {
  setProxy,
  closeProxy
}
