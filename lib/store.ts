// lib/store.ts

export interface VersionRecord {
  id: string;
  timestamp: string;
  content: string; // <--- WE ADDED THIS FIELD
  addedWords: string[];
  removedWords: string[];
  oldLength: number;
  newLength: number;
}

// This array acts as our temporary database.
export const versionHistory: VersionRecord[] = [];