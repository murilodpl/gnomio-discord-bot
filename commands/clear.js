const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('limpa a queue de musga e desconecta o Gnomio'),
    async execute({ client, interaction }) {
        client.queue = [];

        const voiceChannel = interaction.member.voice.channel;
        const voiceConnection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        voiceConnection.destroy();

        await interaction.reply('musgas limpas e Gnomio morto... :skull:');
    },
};