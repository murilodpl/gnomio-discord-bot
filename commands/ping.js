const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde com Pong!'),
	async execute({ client, interaction }) {
		return interaction.reply('Pong!');
	},
};