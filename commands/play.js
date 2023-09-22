const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, PlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('escutar musga?')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('A musga')
                .setRequired(true)),
    async execute({ client, interaction }) {
        await play(interaction, client.queue);
    },
};


async function play(interaction, queue) {
    await verificaPermissao(interaction)

    const voiceChannel = interaction.member.voice.channel;
    const url = interaction.options.getString('url');
    queue.push(url);

    const voiceConnection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    try {
        if (queue.length == 1) {
            await interaction.reply('ouvino musgaaaaa!');
            playSong(voiceConnection, interaction, queue)
        } else {
            await interaction.reply('musga na fila :sunglasses:');
        }
    } catch (error) {
        console.error(error);
        await interaction.reply('Ocorreu um erro ao reproduzir a musga :(');
        if (voiceConnection) {
            voiceConnection.destroy();
        }
    }
}

async function playSong(voiceConnection, interaction, queue) {
    let url = queue[0];
    const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
    const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

    const player = createAudioPlayer();
    player.play(resource);

    voiceConnection.subscribe(player);

    player.addListener("stateChange", async (oldOne, newOne) => {
        if (newOne.status == 'playing') {
            await interaction.followUp(`tocando musga: ${queue[0]}`);
        }

        if (newOne.status == "idle") {
            queue.shift();
            // console.log(queue);

            if (queue.length > 0) {
                playSong(voiceConnection, interaction, queue);
            } else {
                voiceConnection.destroy();
            }
        }
    });
}

async function verificaPermissao(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
        interaction.reply('Você deve estar em um canal de voz para usar esse comando.');
        return;
    }

    const permissions = interaction.member.voice.channel.permissionsFor(interaction.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return interaction.channel.send('Eu não tenho permissão para entrar ou falar neste canal de voz.');
    }
}