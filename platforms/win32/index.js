const regedit = require('regedit')

const internetSettingsPath = 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Internet Settings'

const editRegPromisify = (valuesToPut) => {
  return new Promise((resolve, reject) => {
    regedit.putValue(valuesToPut, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}


/**
 * set system proxy, includes http & https
 * @param {string} host proxy host eg: 127.0.0.1
 * @param {*} port 
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
  return editRegPromisify(valuesToPut)
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
  return editRegPromisify(valuesToPut)
}

const notSupport = () => {
  return Promise.reject('not support yet in windows, you can only set http & https together.')
}


module.exports = {
  setProxy,
  closeProxy,
  setHttpProxy: notSupport,
  setHttpsProxy: notSupport,
  closeHttpProxy: notSupport,
  closeHttpsProxy: notSupport
}