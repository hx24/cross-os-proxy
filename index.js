const fs = require("fs")
const path = require('path')
const platform = process.platform.toLowerCase()
const platformsPath = "./platforms"

const plats = fs.readdirSync(path.resolve(__dirname, platformsPath))
const all = {}
plats.forEach((plat) => {
  all[plat] = require(`${platformsPath}/${plat}`)
})

const currentOsProxyPath = `${platformsPath}/${platform}`
const support = fs.existsSync(path.resolve(__dirname, currentOsProxyPath))

module.exports = {
  ...all,
  ...(support ? require(currentOsProxyPath) : {})
}
