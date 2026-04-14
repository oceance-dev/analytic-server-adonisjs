import { networkInterfaces } from 'os'
import { readFileSync, writeFileSync } from 'fs'

function getLocalIp() {
  const nets = networkInterfaces()

  for (const name of Object.keys(nets)) {
    // Priorité aux interfaces WiFi/Ethernet (en, wlan, eth, Wi-Fi)
    if (!/(en|eth|wlan|wi.fi)/i.test(name)) continue

    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address
      }
    }
  }

  // Fallback : première IPv4 non-interne trouvée
  for (const nets_list of Object.values(nets)) {
    for (const net of nets_list) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address
      }
    }
  }

  return '0.0.0.0'
}

const ip = getLocalIp()
const envPath = new URL('../.env', import.meta.url).pathname

let content = readFileSync(envPath, 'utf-8')

if (/^HOST=/m.test(content)) {
  content = content.replace(/^HOST=.*/m, `HOST=${ip}`)
} else {
  content += `\nHOST=${ip}`
}

writeFileSync(envPath, content)
console.log(`HOST mis à jour → ${ip}`)
