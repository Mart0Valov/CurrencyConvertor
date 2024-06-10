import fs from 'fs/promises';

export default async function readAndWriteJson(path, conversion) {
    try {
        const data = await fs.readFile(path, 'utf8');
        const parsed = JSON.parse(data);

        parsed.push(conversion);

        const jsonString = JSON.stringify(parsed, null, 2);
        await fs.writeFile(path, jsonString);
    } catch (err) {
        console.error('Error:', err);
    }
}