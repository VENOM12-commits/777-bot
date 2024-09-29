const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, ActivityType } = require ("discord.js")
const { joinVoiceChannel } = require("@discordjs/voice")
const settings = require("../settings.json")
const db = require("croxydb")
require("advanced-logs")
console.setConfig({
  background: false,
  timestamp: false
})

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
      
  const channels = client.channels.cache.get(settings.SesId)
    
  const VoiceConnection = joinVoiceChannel({
    channelId: channels.id,
    guildId: channels.guild.id,
    adapterCreator: channels.guild.voiceAdapterCreator,
  });
      
      const list = [
          `${settings.oynuyor1}`,
          `${settings.oynuyor2}`,
          `${settings.oynuyor3}`,
          `${settings.oynuyor4}`
      ]
      
      setInterval(() => {
              client.user.setPresence({
              activities: 
              [
           {
            name: list[Math.floor(Math.random() * list.length)], 
            type: ActivityType.Playing
          }
        ]
    })
      }, 20000)
    console.success(``, ` Bot aktif.`)
    const başlama = `<t:${Math.floor(client.readyAt / 1000)}:R>`
    const Durum = new EmbedBuilder()
      .setColor(Colors.Green)
      .setDescription(`> Bot aktif oldu!\n> Son başlama zamanım: ${başlama}`) 
      .setTimestamp()
     client.channels.cache.get(settings.aktifmesajKanalId).send({embeds: [Durum]})
      
    setInterval(() => {autoSaver(client)}, 86400000) 

  }
}