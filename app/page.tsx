// app/page.tsx
"use client"; // This tells Next.js this is a Client Component (interactive)

import { useState, useEffect } from "react";

// Define what a History Item looks like for the frontend
interface HistoryItem {
  id: string;
  timestamp: string;
  content: string;
  addedWords: string[];
  removedWords: string[];
  oldLength: number;
  newLength: number;
}

export default function Home() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Load history when the page opens
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await fetch("/api/versions");
    const data = await res.json();
    // Reverse the array so the newest version is at the top
    setHistory(data.reverse());
  };

  // 2. Handle the Save Button Click
  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/save-version", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });

      if (res.ok) {
        // If save is successful, refresh the list
        await fetchHistory();
      }
    } catch (error) {
      console.error("Failed to save", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">Mini Audit Trail Generator</h1>

        {/* --- SECTION 1: EDITOR --- */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <label className="block text-gray-400 mb-2 text-sm uppercase tracking-wider">Content Editor</label>
          <textarea
            className="w-full h-40 p-4 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Type something here and click save..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={handleSave}
            disabled={loading}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Version"}
          </button>
        </div>

        {/* --- SECTION 2: HISTORY --- */}
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Version History</h2>
        
        <div className="space-y-4">
          {history.length === 0 ? (
            <p className="text-gray-500">No history yet. Edit the text above to start.</p>
          ) : (
            history.map((item) => (
              <div key={item.id} className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-gray-400 font-mono">{item.timestamp}</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">ID: {item.id.slice(0, 8)}...</span>
                </div>

                {/* Diff Summary */}
                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-green-400 font-bold">Added ({item.addedWords.length}):</span>
                    <p className="text-gray-300">{item.addedWords.join(", ") || "-"}</p>
                  </div>
                  <div>
                    <span className="text-red-400 font-bold">Removed ({item.removedWords.length}):</span>
                    <p className="text-gray-300">{item.removedWords.join(", ") || "-"}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-xs text-gray-500 border-t border-gray-700 pt-2 flex gap-4">
                  <span>Old Length: {item.oldLength}</span>
                  <span>New Length: {item.newLength}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}