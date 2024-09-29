const { Events, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, ReactionUserManager } = require("discord.js");
const db = require("croxydb");
const fs = require("fs");

// eleme

module.exports = {
    name: Events.MessageCreate,
    execute: async (message) => {

        if (await db.get(`afk_${message.author.id}`)) {

            const afkDate = db.fetch(`yasaklı_${message.author.id}`)
            const sebep = db.fetch(`ysk_${message.author.id}`)

            if (afkDate && sebep) {
                const date = new EmbedBuilder()
                    .setDescription(`${message.author} birdaha yazarsan banlarım`)
                db.delete(`yasaklı_${message.author.id}`);
                db.delete(`ysk_${message.author.id}`)

                return message.reply({ embeds: [date] })
            }

        }
        var kullanıcı = message.mentions.users.first();
        if (kullanıcı) {
            const afkDate = db.fetch(`yasaklı_${kullanıcı.id}`)

            const sebep = await db.get(`ysk_${kullanıcı.id}`);

            if (sebep) {
                const sebeps = new EmbedBuilder()
                    .setDescription(`Etiketlediğin kullanıcı **${sebep}** cezalı!`)
                message.reply({ embeds: [sebeps] });
            }
        }
    }
}