import 'dotenv/config';
import express from 'express';
import { 
    verifyKeyMiddleware,
    InteractionResponseFlags,
    InteractionResponseType,
    MessageComponentTypes
} from 'discord-interactions';


const app = express();
const PORT = 3000;

// Interactions endpoint URL where Discord will send HTTP requests
// Parse request body and verify using the verifyKeyMiddleware from discord-interactions


app.listen(PORT,  () => {
    console.log('Listening on port', PORT);
});