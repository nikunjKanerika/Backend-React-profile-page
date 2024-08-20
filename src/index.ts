import * as dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { Connection } from './db/Connection';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 8001;

// Connect to the database
Connection();

app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
});
