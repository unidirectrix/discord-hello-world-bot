import 'dotenv/config';

export async function DiscordRequest(endpoint, options) {
    // API endpoint url + endpoint append
    const url = 'https://discord.com/api/v10/' + endpoint;

    // Stringify payloads
    if (options.body) options.body = JSON.stringify(options.body);

    // Use fetch to make requests
    const res  = await fetch(url, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'DiscordBot (, 1.0.0)',
        },
        ...options
    });

    // throw API errors
    if (!res.ok) {
        const data = await res.json();
        console.log(res.status);
        throw new Error(JSON.stringify(data));
    }
    
    // return original response
    return res;
}

export async function InstallGlobalCommand(appId, command) {
    // API endpoint to overwrite global commands
    const endpoint = `applications/${appId}/commands`;

    try {
        // Calling the create application command endpoint
        // Testing for POST instead of bulk overwrite PUT
        await DiscordRequest(endpoint, {method: 'POST', body: command});
    } catch (err) {
        console.log(err);
    }
}

export function getRandomEmoji() {
    const emojiList = ['😭','😄','😌','🤓','😎','😤','🤖','😶‍🌫️','🌏','📸','💿','👋','🌊','✨'];
    return emojiList[Math.floor(Math.random() * emojiList.length)];
}