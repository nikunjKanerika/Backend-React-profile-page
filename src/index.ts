import * as dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { Connection } from './db/Connection';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 8001;

// Connect to the database
Connection();

import logger from './utils/logger';

app.listen(PORT, () => {
    logger.info(`server running at port ${PORT}`);
});
