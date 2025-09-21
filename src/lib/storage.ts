/**
 * @fileoverview A simple file-based storage system for documents.
 * In a real production app, you would use a proper database like Firestore.
 * For the purposes of a hackathon or MVP, this is a simple way to persist data.
 */

import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import type { DocumentType } from './types';

// Use a temporary directory to store the documents JSON file.
// This avoids committing the data file to the repository.
const tempDir = path.join(os.tmpdir(), 'legally-simple-store');
const filePath = path.join(tempDir, 'documents.json');


async function ensureDirExists() {
    try {
        await fs.access(tempDir);
    } catch {
        await fs.mkdir(tempDir, { recursive: true });
    }
}

export async function readDocuments(): Promise<DocumentType[]> {
    await ensureDirExists();
    try {
        await fs.access(filePath);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        // If the file doesn't exist, return an empty array.
        return [];
    }
}

export async function writeDocuments(documents: DocumentType[]): Promise<void> {
    await ensureDirExists();
    await fs.writeFile(filePath, JSON.stringify(documents, null, 2), 'utf-8');
}
