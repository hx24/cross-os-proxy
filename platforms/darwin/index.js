const execa = require("execa")
const network = require("network")
const pify = require("pify")
const getActiveInterface = pify(network.get_active_interface)

/**
 * set system proxy, includes http & https
 * @param {string} host proxy host eg: 127.0.0.1
 * @param {*} port 
 * @returns Promise
 */
async function setProxy(host, port) {
  return Promise.all([setHttpProxy(host, port), setHttpsProxy(host, port)])
}

/**
 * close system proxy, includes http & https
 * @returns Promise
 */
async function closeProxy() {
  return Promise.all([closeHttpProxy(), closeHttpsProxy()])
}

/**
 * set system http proxy
 * @param {string} host proxy host eg: 127.0.0.1
 * @param {*} port 
 * @returns Promise
 */
async function setHttpProxy(host, port) {
  const activeService = await getActiveService()
  return execa("networksetup", ["-setwebproxy", activeService, host, port])
}

/**
 * set system https proxy
 * @param {string} host proxy host eg: 127.0.0.1
 * @param {*} port 
 * @returns Promise
 */
async function setHttpsProxy(host, port) {
  const activeService = await getActiveService()
  return execa("networksetup", ["-setsecurewebproxy", activeService, host, port])
}

async function closeHttpProxy() {
  const activeService = await getActiveService()
  return execa("networksetup", ["-setwebproxystate", activeService, 'off'])
}

async function closeHttpsProxy() {
  const activeService = await getActiveService()
  return execa("networksetup", ["-setsecurewebproxystate", activeService, 'off'])
}

function parseStringToObj(str) {
  const camelize = (str) =>
    str
      .replace("URL", "url")
      .replace(/\s(.)/g, ($1) => $1.toUpperCase())
      .replace(/\s/g, "")
      .replace(/^(.)/, ($1) => $1.toLowerCase())

  const checkForBool = (str) => {
    if (str === "Yes") {
      return true
    } else if (str === "No") {
      return false
    } else if (str === "(null)") {
      return null
    }
    return str
  }

  const returnObj = {}
  str.split("\n").forEach((line) => {
    if (!line[0] || line[0] === "") {
      return
    }
    const obj = line.split(": ")
    const key = camelize(obj[0])
    obj[1] = checkForBool(obj[1])
    // .replace('No', false);
    returnObj[key] = obj[1]
  })
  return returnObj
}

function parseNetworkDevices(networkString) {
  return networkString.split("\n\n").map(parseStringToObj)
}

function getActiveService() {
  const activeInterface = getActiveInterface()
  const allHardwarePorts = execa("networksetup", ["listallhardwareports"])
  return Promise.all([activeInterface, allHardwarePorts]).then((promises) => {
    const networkDevices = parseNetworkDevices(promises[1].stdout)
    const activeInterface = promises[0].name
    const active = networkDevices.find((device) => device.device === activeInterface)
    const activeName = active.hardwarePort
    return activeName
  })
}

module.exports = {
  setProxy,
  closeProxy,
  setHttpProxy,
  setHttpsProxy,
  closeHttpProxy,
  closeHttpsProxy
}
