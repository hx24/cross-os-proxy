const platform = process.platform.toLowerCase()
const platformsPath = "./platforms"
const currentOsProxy = require(`${platformsPath}/${platform}`)

/**
 * set system proxy, includes http & https
 * @param {string} host proxy host eg: '127.0.0.1'
 * @param {*} port eg: 8001
 * @returns Promise
 */
async function setProxy(host, port) {
  return currentOsProxy.setProxy(host, port)
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
