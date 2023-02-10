const { execFile } = require('child_process')
const path = require('path')

function getNetworkService() {
  const shellPath = path.resolve(__dirname, './getNetworkService.sh')
  return new Promise((resolve, reject) => {
    execFile(shellPath, null, (error, stdout, stderr) => {
      if (error) {
        resolve('')
      } else {
        resolve(stdout.trim())
      }
    })
  })
}

/**
 * start http & https proxy
 * @param {string} host proxy host eg: 127.0.0.1
 * @param {number} port port eg: 8001
 * @returns Promise<string>
 */
async function setProxy(host, port) {
  const proxyOnShellPath = path.resolve(__dirname, './proxyOn.sh')
  const networkService = await getNetworkService()
  if (!networkService) {
    throw new Error('networkService is empty')
  }
  return new Promise((resolve, reject) => {
    execFile(
      proxyOnShellPath,
      [host, port, networkService],
      (error, stdout, stderr) => {
        if (error) {
          reject(error)
          throw error
        } else {
          resolve(stdout)
        }
      },
    )
  })
}

/**
 * close http & https proxy
 * @returns Promise<string>
 */
async function closeProxy() {
  const proxyOffShellPath = path.resolve(__dirname, './proxyOff.sh')
  const networkService = await getNetworkService()
  if (!networkService) {
    throw new Error('networkService is empty')
  }
  return new Promise((resolve, reject) => {
    execFile(proxyOffShellPath, [networkService], (error, stdout, stderr) => {
      if (error) {
        reject(error)
        throw error
      } else {
        resolve(stdout)
      }
    })
  })
}

async function getStatus() {
  const proxyStatusShellPath = path.resolve(__dirname, './proxyStatus.sh')
  const networkService = await getNetworkService()
  if (!networkService) {
    throw new Error('networkService is empty')
  }
  return new Promise((resolve, reject) => {
    execFile(
      proxyStatusShellPath,
      [networkService],
      (error, stdout, stderr) => {
        if (error) {
          reject(error)
          throw error
        } else {
          let enabled = stdout.match(/Enabled: (\w+)/)[1]
          let server = stdout.match(/Server: ([\d\.]+)/)?.[1]
          let port = stdout.match(/Port: (\d+)/)[1]
          console.log(stdout)
          console.log({
            enabled: enabled === 'Yes',
            server,
            port: Number(port) ? Number(port) : undefined,
          })
          resolve(stdout)
        }
      },
    )
  })
}

module.exports = {
  setProxy,
  closeProxy,
  getStatus
}
