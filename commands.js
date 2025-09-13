import 'dotenv/config';
import { InstallGlobalCommand } from './utils.js';

const HELLO_WORLD = {
    name: 'hello',
    description: "Greets you hello world",
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2], 
};

InstallGlobalCommand(process.env.APP_ID, HELLO_WORLD);