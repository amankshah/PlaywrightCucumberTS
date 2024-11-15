import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export function getEnvVariable(key: string): string | undefined {
    return process.env[key];
}
