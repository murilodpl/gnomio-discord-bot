const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Responde com uma piada de mal gosto!'),
    async execute({ client, interaction }) {
        let joke = await requestJoke();
        return interaction.reply(joke);
    },
};

async function requestJoke() {
    let response = await request('https://v2.jokeapi.dev/joke/Any', 'get');
    let data = response.data;
    let joke = '';

    if (data.type == 'twopart') {
        let setup = data.setup;
        let delivery = data.delivery;

        joke = setup + '\n' + delivery
    } else {
        joke = data.joke;
    }

    return joke;
}

function request(url, method, data, cookie = '') {
    return axios({ url, method, data, headers: { Authorization: `Bearer ${cookie}` }, validateStatus: false, withCredentials: true });
};