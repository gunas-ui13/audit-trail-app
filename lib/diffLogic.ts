export function calculateDiff(oldText: string, newText: string) {
  // Helper function to clean text: removes punctuation and makes lowercase
  const clean = (text: string) => 
    text.toLowerCase()
        .replace(/[^\w\s]/g, "") // Remove everything that isn't a word or space
        .trim()
        .split(/\s+/);           // Split by spaces

  const oldWords = oldText.trim() === "" ? [] : clean(oldText);
  const newWords = newText.trim() === "" ? [] : clean(newText);

  // Find ADDED words
  const addedWords = newWords.filter(word => !oldWords.includes(word));

  // Find REMOVED words
  const removedWords = oldWords.filter(word => !newWords.includes(word));

  return {
    addedWords,
    removedWords,
    oldLength: oldText.length,
    newLength: newText.length,
  };
}