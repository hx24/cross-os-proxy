const fs = require("fs")
const platform = process.platform.toLowerCase()
const platformsPath = "./platforms"

const plats = fs.readdirSync(platformsPath)
const all = {}
plats.forEach((plat) => {
  all[plat] = require(`${platformsPath}/${plat}`)
})

const currentOsProxyPath = `${platformsPath}/${platform}`
const support = fs.existsSync(currentOsProxyPath)

module.exports = {
  ...all,
  ...(support ? require(currentOsProxyPath) : {})
}
