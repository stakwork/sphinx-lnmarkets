import 'regenerator-runtime/runtime.js';
import * as Sphinx from 'sphinx-bot'
import * as fetch from 'node-fetch'
import dotenv from 'dotenv'
import moment from 'moment'
dotenv.config()

const msg_types = Sphinx.MSG_TYPE

let initted = false

const lnmarketsToken = process.env.LNMARKETS_TOKEN
const sphinxToken = process.env.SPHINX_TOKEN
const url = 'https://api.lnmarkets.com'

function init() {
  if(initted) return
  initted = true

  const client = new Sphinx.Client()
  client.login(sphinxToken)

  client.on(msg_types.INSTALL, async (message) => {
    const embed = new Sphinx.MessageEmbed()
      .setAuthor('LNMarkets')
      .setDescription('Welcome to LNMarkets!')
      .setThumbnail(botSVG)
    message.channel.send({ embed })
  })

  client.on(msg_types.MESSAGE, async (message) => {
    const arr = message.content.split(' ')
    if (arr.length < 2) return
    if (arr[0]!=='/lnm') return
    const cmd = arr[1]
    
    switch (cmd) {

      case 'balance':
        const r = await fetch(url+'/user',{
          headers:{'Authorization': `Bearer ${lnmarketsToken}`, 'Accept': 'application/json'}
        })
        if (!r.ok) return
        const j = await r.json()
        if(!j.balance) return
        const embed = new Sphinx.MessageEmbed()
          .setAuthor('LNMarkets')
          .setDescription('Your balance is: '+j.balance)
          .setThumbnail(botSVG)
        message.channel.send({ embed })
        return

      case 'positions':
        const r2 = await fetch(url+'/positions',{
          headers:{'Authorization': `Bearer ${lnmarketsToken}`, 'Accept': 'application/json'}
        })
        if (!r2.ok) return
        const j2 = await r2.json()
        if(!(j2 && Array.isArray(j2))) return
        const fields = j2.map(p=>{
          const date = moment(p.creation_ts).format('ddd, MMM DD h:mm')
          return {
            name:date, value:`Price: ${p.price}, Take Profit: ${p.takeprofit}, Margin: ${p.margin}`
          }
        })
        console.log(fields)
        const embed2 = new Sphinx.MessageEmbed()
          .setAuthor('LNMarkets')
          .setTitle('Positions:')
          .addFields(fields)
          .setThumbnail(botSVG)
        message.channel.send({ embed:embed2 })
        return
        
      default:
        const embed3 = new Sphinx.MessageEmbed()
          .setAuthor('LNMarkets')
          .setTitle('LNMarkets Commands:')
          .addFields([
            { name: 'Balance', value: '/lnm balance' },
            { name: 'Positions', value: '/lnm positions' },
            { name: 'Help', value: '/lnm help' }
          ])
          .setThumbnail(botSVG)
        message.channel.send({ embed:embed3 })
        return
    }
  })
}

const botSVG = `<svg viewBox="64 64 896 896" height="12" width="12" fill="white">
  <path d="M300 328a60 60 0 10120 0 60 60 0 10-120 0zM852 64H172c-17.7 0-32 14.3-32 32v660c0 17.7 14.3 32 32 32h680c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-32 660H204V128h616v596zM604 328a60 60 0 10120 0 60 60 0 10-120 0zm250.2 556H169.8c-16.5 0-29.8 14.3-29.8 32v36c0 4.4 3.3 8 7.4 8h729.1c4.1 0 7.4-3.6 7.4-8v-36c.1-17.7-13.2-32-29.7-32zM664 508H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
</svg>`

init()