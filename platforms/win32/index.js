const regedit = require('regedit').promisified

const internetSettingsPath = 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Internet Settings'

/**
 * set system proxy, includes http & https
 * @param {string} host proxy host eg: 127.0.0.1
 * @param {number} port port eg: 8001
 * @returns Promise
 */
async function setProxy(host, port) {
  const valuesToPut = {
    [internetSettingsPath]: {
      'ProxyServer': {
        value: `${host}:${port}`,
        type: 'REG_SZ'
      },
      'ProxyEnable': {
        value: 1,
        type: 'REG_DWORD'
      }
    }
  }
  return regedit.putValue(valuesToPut)
}

/**
 * close system proxy, includes http & https
 * @returns Promise
 */
async function closeProxy() {
  const valuesToPut = {
    [internetSettingsPath]: {
      'ProxyEnable': {
        value: 0,
        type: 'REG_DWORD'
      }
    }
  }
  return regedit.putValue(valuesToPut)
}

module.exports = {
  setProxy,
  closeProxy
}