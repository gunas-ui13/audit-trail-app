// app/api/save-version/route.ts
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { versionHistory } from '@/lib/store'; // Importing your "Database"
import { calculateDiff } from '@/lib/diffLogic'; // Importing your "Logic"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content } = body; // The new text the user just typed

    // 1. Get the content from the LAST version to compare against
    // If there is no history yet, the "old text" is just empty.
    const lastVersion = versionHistory[versionHistory.length - 1];
    const oldText = lastVersion ? lastVersion.content : "";

    // 2. Use your custom logic to find differences
    const diff = calculateDiff(oldText, content);

    // 3. Create the new record
    const newRecord = {
      id: uuidv4(),
      timestamp: new Date().toLocaleString(),
      content: content, // We save the full content so we can compare it next time
      ...diff, // This spreads the addedWords, removedWords, etc. into this object
    };

    // 4. Save to our in-memory "Database"
    versionHistory.push(newRecord);

    return NextResponse.json({ success: true, record: newRecord });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process' }, { status: 500 });
  }
}