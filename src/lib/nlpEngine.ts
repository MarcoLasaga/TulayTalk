import { slangDatabase, slangLookup, type SlangEntry, type MorphologicalCategory } from "@/data/slangDatabase";

export interface DetectedSlang {
  original: string;
  matchedEntry: SlangEntry;
  startIndex: number;
  endIndex: number;
}

export interface TranslationResult {
  originalText: string;
  detectedSlang: DetectedSlang[];
  translatedText: string;
  processingTimeMs: number;
}

// Step 1: Text Preprocessing
function preprocessText(text: string): string[] {
  // Normalize whitespace, keep original case for display
  const cleaned = text.replace(/[.,!?;:()]/g, " ").replace(/\s+/g, " ").trim();
  return cleaned.split(" ").filter(Boolean);
}

// Step 2: Rule-Based Detection via regex patterns + dictionary
const acronymPattern = /^[A-Z]{2,}$/;
const metathesisKnown = ["yorme", "ermat", "erpat", "lodi", "petmalu", "werpa"];

function detectSlangInTokens(tokens: string[], originalText: string): DetectedSlang[] {
  const detected: DetectedSlang[] = [];
  const lowerText = originalText.toLowerCase();
  let searchFrom = 0;

  // Multi-word pass: check 2-3 word combinations first
  for (let i = 0; i < tokens.length; i++) {
    // Check 2-word combinations
    if (i < tokens.length - 1) {
      const twoWord = `${tokens[i]} ${tokens[i + 1]}`.toLowerCase();
      const entry = slangLookup.get(twoWord);
      if (entry) {
        const idx = lowerText.indexOf(twoWord, searchFrom);
        if (idx !== -1) {
          detected.push({
            original: originalText.substring(idx, idx + twoWord.length),
            matchedEntry: entry,
            startIndex: idx,
            endIndex: idx + twoWord.length,
          });
          searchFrom = idx + twoWord.length;
          i++; // skip next token
          continue;
        }
      }
    }

    // Single-word pass
    const tokenLower = tokens[i].toLowerCase();
    const entry = slangLookup.get(tokenLower);
    if (entry) {
      const idx = lowerText.indexOf(tokenLower, searchFrom);
      if (idx !== -1) {
        detected.push({
          original: originalText.substring(idx, idx + tokenLower.length),
          matchedEntry: entry,
          startIndex: idx,
          endIndex: idx + tokenLower.length,
        });
        searchFrom = idx + tokenLower.length;
        continue;
      }
    }

    // Heuristic: detect unknown acronyms
    if (acronymPattern.test(tokens[i]) && !entry) {
      // Unknown acronym — skip, not in dictionary
    }
  }

  // Sort by startIndex
  detected.sort((a, b) => a.startIndex - b.startIndex);
  return detected;
}

// Step 3-5: Full pipeline
export function translateText(text: string): TranslationResult {
  const startTime = performance.now();

  if (!text.trim()) {
    return {
      originalText: text,
      detectedSlang: [],
      translatedText: text,
      processingTimeMs: 0,
    };
  }

  const tokens = preprocessText(text);
  const detected = detectSlangInTokens(tokens, text);

  // Build translated text by replacing slang with formal translations
  let translatedText = text;
  // Process from end to start to maintain indices
  const sortedDesc = [...detected].sort((a, b) => b.startIndex - a.startIndex);
  for (const d of sortedDesc) {
    translatedText =
      translatedText.substring(0, d.startIndex) +
      d.matchedEntry.formalTranslation +
      translatedText.substring(d.endIndex);
  }

  const processingTimeMs = performance.now() - startTime;

  return {
    originalText: text,
    detectedSlang: detected,
    translatedText,
    processingTimeMs,
  };
}

// Search dictionary
export function searchDictionary(query: string): SlangEntry[] {
  if (!query.trim()) return slangDatabase;
  const q = query.toLowerCase();
  return slangDatabase.filter(
    (e) =>
      e.slangWord.toLowerCase().includes(q) ||
      e.meaning.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.tags.some((t) => t.includes(q))
  );
}

// Get category color mapping
export function getCategoryColor(category: MorphologicalCategory): { bg: string; text: string } {
  const colors: Record<MorphologicalCategory, { bg: string; text: string }> = {
    Metathesis: { bg: "bg-blue-100", text: "text-blue-800" },
    Clipping: { bg: "bg-orange-100", text: "text-orange-800" },
    Acronym: { bg: "bg-purple-100", text: "text-purple-800" },
    "Spelling Change": { bg: "bg-pink-100", text: "text-pink-800" },
    "Persona-based": { bg: "bg-rose-100", text: "text-rose-800" },
    "Hybrid Blending": { bg: "bg-cyan-100", text: "text-cyan-800" },
    Reduplication: { bg: "bg-amber-100", text: "text-amber-800" },
    Homophone: { bg: "bg-emerald-100", text: "text-emerald-800" },
    Affixation: { bg: "bg-indigo-100", text: "text-indigo-800" },
    "Code-switching": { bg: "bg-teal-100", text: "text-teal-800" },
    "Semantic Shift": { bg: "bg-violet-100", text: "text-violet-800" },
    Onomatopoeia: { bg: "bg-lime-100", text: "text-lime-800" },
  };
  return colors[category] || { bg: "bg-gray-100", text: "text-gray-800" };
}

// Stats
export function getCategoryStats(): { category: string; count: number }[] {
  const counts: Record<string, number> = {};
  slangDatabase.forEach((e) => {
    counts[e.category] = (counts[e.category] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}
