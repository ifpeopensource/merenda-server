import express from 'express';
import cors from 'cors';
import { sendEmail } from './infra/nodemailer/setup.js'; // Importando a função do setup.js

import routes from './routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    sendEmail();
    
});
