import 'dotenv/config';
import express from 'express';
import { 
    verifyKeyMiddleware,
    InteractionResponseFlags,
    InteractionResponseType,
    MessageComponentTypes,
    InteractionType
} from 'discord-interactions';
import { getRandomEmoji } from './utils.js';


const app = express();
const PORT = 3000;

// Interactions endpoint URL where Discord will send HTTP requests
// Parse request body and verify using the verifyKeyMiddleware from discord-interactions
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
    const { type, data, member } = req.body;

    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }

    // Hello World command
    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name } = data;
        const { global_name } = member.user;

        if (name === 'hello') {
            // Send a message into the channel where command was triggered from
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    flags: InteractionResponseFlags.IS_COMPONENTS_V2,
                    components: [
                        {
                            type: MessageComponentTypes.TEXT_DISPLAY,
                            // Greets user based on global_name (display name) parameter
                            content: `Hello ${global_name}! ${getRandomEmoji()}\n\n\n# Hehe boi...`,
                        }
                    ]
                },
            });
        }
    }

    console.error('unknown interaction type', type);
    return res.status(400).json({ error: 'unknown interaction type'});
});


app.listen(PORT,  () => {
    console.log('Listening on port', PORT);
});