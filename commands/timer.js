const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timer')
        .setDescription('Conta os minutos inseridos!')
        .addStringOption(option =>
            option.setName('minutos')
                .setDescription('quantidade de minutos a ser cronometrada')
                .setRequired(true)),
    async execute(interaction) {
        let numbersEmotes = [':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:'];
        let minutes = parseInt(interaction.options.getString('minutos'));
        let message = ':timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer:' + '\n' + new Date();

        await interaction.reply(message);

        for (let i = 0; i < minutes; minutes--) {
            let emoteMinutes = numbersEmotes[minutes] + ' : ' + numbersEmotes[0] + numbersEmotes[0];
            message += '\n' + 'CONTANDO: ' + emoteMinutes + ' MINUTOS(S).';

            await interaction.editReply(message);
            await wait(60000);
        }

        message += '\n' + 'FINALIZADO';
        message += '\n' + ':timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer:';
        await interaction.editReply(message);
    },
};