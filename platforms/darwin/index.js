const { execFile } = require("child_process")
const path = require("path")

/**
 * start http & https proxy
 * @param {string} host proxy host eg: 127.0.0.1
 * @param {number} port port eg: 8001
 * @returns Promise<string>
 */
function setProxy(host, port) {
  const proxyOnShellPath = path.resolve(__dirname, "./proxyon.sh")
  return new Promise((resolve, reject) => {
    execFile(proxyOnShellPath, [host, port], (error, stdout, stderr) => {
      if (error) {
        reject(error)
        throw error
      } else {
        resolve(stdout)
      }
    })
  })
}

/**
 * close http & https proxy
 * @returns Promise<string>
 */
function closeProxy() {
  const proxyOffShellPath = path.resolve(__dirname, "./proxyoff.sh")
  return new Promise((resolve, reject) => {
    execFile(proxyOffShellPath, [], (error, stdout, stderr) => {
      if (error) {
        reject(error)
        throw error
      } else {
        resolve(stdout)
      }
    })
  })
}

module.exports = {
  setProxy,
  closeProxy
}
