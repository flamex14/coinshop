const Discord = require('discord.js')
const fs = require('fs')
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'))
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
const client = new Discord.Client()
console.log('booting...')

client.on('ready', () => {
  client.user.setStatus('online') 
  client.user.setPresence({ game: { name: `best global Coinsystem | ${config.prefix}help`, type: "Playing", url: "https://discordapp.com/" } })
  console.log('config loaded')
  console.log('databank loaded')
  console.log(`Logged in as ${client.user.username}`)
})

client.on('message', (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.name === undefined) return;
  var cUser = msg.member
  if (!data[cUser.id]) data[cUser.id] = {
    coins: 250,
    msgs: 0
  }
  if (data[cUser.id].coins < 0) return data[cUser.id].coins = 0
  data[cUser.id].msgs++
  data[cUser.id].coins++
  fs.writeFileSync('data.json', JSON.stringify(data))

  if (data[cUser.id].msgs === 100) {
    var now = new Date()
    data[cUser.id].coins = data[cUser.id].coins + 1000
    msg.channel.send({embed: {
      color: cUser.highestRole.color,
      title: `GG, ${cUser.user.username}`,
      description: `${cUser.user.username} has already send **100 messages** :confetti_ball:\nNow he has **${data[cUser.id].coins}** coins.`,
      footer: {
        icon_url: client.user.avatarURL,
        text: `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      }
    }})
    fs.writeFileSync('data.json', JSON.stringify(data))
    return;
  }

  if (data[cUser.id].msgs === 500) {
    var now = new Date()
    data[cUser.id].coins = data[cUser.id].coins + 5000
    msg.channel.send({embed: {
      color: cUser.highestRole.color,
      title: `GG, ${cUser.user.username}`,
      description: `${cUser.user.username} has already send **500 messages** :confetti_ball:\nNow he has **${data[cUser.id].coins}** coins.`,
      footer: {
        icon_url: client.user.avatarURL,
        text: `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      }
    }})
    fs.writeFileSync('data.json', JSON.stringify(data))
    return;
  }

  if (data[cUser.id].msgs === 1000) {
    var now = new Date()
    data[cUser.id].coins = data[cUser.id].coins + 10000
    msg.channel.send({embed: {
      color: cUser.highestRole.color,
      title: `GG, ${cUser.user.username}`,
      description: `${cUser.user.username} has already send **1000 messages** :confetti_ball:\nNow he has **${data[cUser.id].coins}** coins.`,
      footer: {
        icon_url: client.user.avatarURL,
        text: `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      }
    }})
    fs.writeFileSync('data.json', JSON.stringify(data))
    return;
  }


  if (msg.content === config.prefix + 'check') {
    var now = new Date()
    msg.channel.send({embed: {
      color: msg.member.highestRole.color,
      title: `${cUser.user.username}'s coins`,
      description: `${cUser.user.username} has **${data[cUser.id].coins}** coins.`,
      thumbnail: {
        url: cUser.user.avatarURL
      },
      footer: {
        icon_url: client.user.avatarURL,
        text: `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      }
    }})
    fs.writeFileSync('data.json', JSON.stringify(data))
    return;
  }

  if (msg.content.startsWith(config.prefix + 'check')) {
    var now = new Date()
    if (msg.content.length === 6) return;
    var chUser = msg.mentions.members.first()
    var cRole = msg.mentions.roles.first()
    if (cRole) return msg.reply('please mention a user and not a role.')
    if (!chUser) return msg.reply('which coins you want to see?')
    if (!data[chUser.id]) data[chUser.id] = {
      coins: 250,
      msgs: 0
    }
    msg.channel.send({embed: {
      color: chUser.highestRole.color,
      title: `${chUser.user.username}'s coins`,
      description: `${chUser.user.username} has **${data[chUser.id].coins}** coins.`,
      thumbnail: {
        url: chUser.user.avatarURL
      },
      footer: {
        icon_url: client.user.avatarURL,
        text: `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      }
    }})
    fs.writeFileSync('data.json', JSON.stringify(data))
    return;
  }

  if (msg.content.startsWith(config.prefix + 'pay')) {
    var now = new Date()
    var cUser = msg.member
    var pUser = msg.mentions.members.first()
    if (!pUser) return msg.reply('who you want to give the money?')
    if (!data[pUser.id]) data[pUser.id] = {
      coins: 250,
      msgs: 0
    }
    var args = msg.content.split(' ')
    var val = args.slice(2).join(' ')
    val = parseInt(val)
    if (isNaN(val) || !val) return msg.reply('please set a amount.')
    if (data[cUser.id].coins < val) return msg.reply('you don\'t have enough coins. Now you have to chat a lot :wink:')
    data[cUser.id].coins = data[cUser.id].coins - val
    data[pUser.id].coins = data[pUser.id].coins + val
    msg.channel.send({embed: {
      color: 3066993,
      title: `payment successful`,
      description: `**${cUser.user.username}** payed **${pUser.user.username}** a total of **${val}** coins.`,
      footer: {
        icon_url: client.user.avatarURL,
        text: `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      }
    }})
    console.log(`PAYMENT | ${cUser.user.username} -> ${pUser.user.username} | ${val} coins`)
    fs.writeFileSync('data.json', JSON.stringify(data))
    return;
  }



  if (msg.content === config.prefix + 'help') {
    var now = new Date()
    msg.channel.send({embed: {
      color: 15158332,
      title: `help page 1/1`,
      description: `To get informations about **${client.user.username}** you have to use \`${config.prefix}info\``,
      fields: [{
        name: `${config.prefix}check`,
        value: `Shows your coins.`
      },
      {
        name: `${config.prefix}check [@user]`,
        value: `Shows the coins of the user.`
      },
      {
        name: `${config.prefix}pay [@user] [amount]`,
        value: `Pay coins to a special user.`
      },
      {
        name: `${config.prefix}invite`,
        value: `You will get the bot invite, to invite them to yout server.`
      },
      {
        name: `How do I get coins?`,
        value: `Every message -> 1 coin\n100 messages -> 1000 coins\n500 messages -> 5000 coins\n1000 messages -> 10000 coins`
      },
      {
        name: `Where can I report a bug?`,
        value: `Here ->   https://forms.gle/4mNiuw81uLgLaSYK9`
      }
    ],
      footer: {
        icon_url: client.user.avatarURL,
        text: `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      }
    }})
    return;
  }


  if (msg.content === config.prefix + 'info') {
    var now = new Date()
    msg.channel.send({embed: {
      color: 15158332,
      title: `informations about ${client.user.username}`,
      description: `To get a list of the commands you have to use \`${config.prefix}help\`\n\n${client.user.username} is a nice bot to manage coins on your server. For example you can pay coins to other user, so you can give them roles for a special amount.\n\nBut whats so special about it?\nThe coins are on every server where the bot is too, so it connects the server together.`,
      footer: {
        icon_url: client.user.avatarURL,
        text: `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      }
    }})
    return;
  }


  if (msg.content === config.prefix + 'invite') {
    var now = new Date()
    msg.channel.send({embed: {
      color: 3447003,
      title: `invite ${client.user.username}`,
      description: `https://discordapp.com/api/oauth2/authorize?client_id=706816756177436774&permissions=92224&scope=bot`,
      footer: {
        icon_url: client.user.avatarURL,
        text: `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      }
    }})
    return;
  }
})
client.login(config.token)