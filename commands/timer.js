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
    async execute({ client, interaction }) {
        let minutes = parseInt(interaction.options.getString('minutos'));
        let total_in_seconds = minutes * 60000;

        let today = new Date();
        let start_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        let today_plus_seconds = new Date(today.getTime() + total_in_seconds);
        let timer_discord = '<t:' + Math.floor(today_plus_seconds.getTime() / 1000) + ':R>';

        let message = ':timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer:';
        message += '\n' + 'COMEÇANDO - ' + start_time;
        message += '\n' +  timer_discord;
        await interaction.reply(message);

        await wait(total_in_seconds);

        let end_date = new Date();
        let end_time = end_date.getHours() + ":" + end_date.getMinutes() + ":" + end_date.getSeconds();
        message += '\n' + 'FINALIZADO - ' + end_time;
        message += '\n' + ':timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer: :timer:';
        await interaction.editReply(message);
    },
};