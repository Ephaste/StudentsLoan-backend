import { fileURLToPath } from 'url';
import { dirname as pathDirname } from 'path';

export const __filename = (metaUrl) => fileURLToPath(metaUrl);
export const __dirname = (metaUrl) => pathDirname(__filename(metaUrl));
