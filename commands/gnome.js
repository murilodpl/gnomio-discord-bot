const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, PlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gnome')
        .setDescription('Gnomo!'),
    async execute({ client, interaction }) {
        await gnomeSound(interaction);
    },
};

async function gnomeSound(interaction) {
    await verificaPermissao(interaction)

    const voiceChannel = interaction.member.voice.channel;
    const url = 'https://www.youtube.com/watch?v=Ms6YzGIQ7IM&ab_channel=coritre';
    // GNOME ONE SECOND VIDEO = 'https://www.youtube.com/watch?v=j3hOd7u35no&ab_channel=Sislak11';

    try {
        const voiceConnection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

        const player = createAudioPlayer();
        player.play(resource);

        voiceConnection.subscribe(player);

        player.addListener("stateChange", (oldOne, newOne) => {
            if (newOne.status == "idle") {
                voiceConnection.destroy();
            }
        });

        await interaction.reply('UUUH.');
    } catch (error) {
        console.error(error);
        await interaction.reply('Ocorreu um erro ao reproduzir o som do gnomo.');
        if (voiceConnection) {
            voiceConnection.destroy();
        }
    }
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