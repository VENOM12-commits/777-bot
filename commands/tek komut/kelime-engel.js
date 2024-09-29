const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const db = require('croxydb');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kelime-engel')
        .setDescription('777 Sunucusuna Özel Komut!'),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
            return interaction.reply({
                content: 'yetkiniz yok!',
                ephemeral: true,
            });
        }

        const embedOn = new EmbedBuilder()
            .setColor('Red')
            .setDescription('✅ | **Sistem Açıldı**');

        const embedOff = new EmbedBuilder()
            .setColor('Green')
            .setDescription('✅ | **Sistem Kapatıldı**');

        const küfürEngel = db.get(`lordistedi_${interaction.guild.id}`);

        if (küfürEngel) {
            db.delete(`lordistedi_${interaction.guild.id}`);
            await interaction.reply({ embeds: [embedOff], ephemeral: true });
        } else {
            db.set(`lordistedi_${interaction.guild.id}`, true);
            await interaction.reply({ embeds: [embedOn], ephemeral: true });
        }
    },
};
