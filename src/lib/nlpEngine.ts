import {
  meaningGroups,
  expressionLookup,
  type MeaningGroup,
  type GenerationalExpression,
  type Generation,
  type MorphologicalCategory,
} from "@/data/generationalDatabase";

export interface DetectedExpression {
  original: string;
  matchedGroup: MeaningGroup;
  matchedExpression: GenerationalExpression;
  startIndex: number;
  endIndex: number;
}

export interface TranslationResult {
  originalText: string;
  sourceGeneration: Generation;
  targetGeneration: Generation;
  detectedExpressions: DetectedExpression[];
  translatedText: string;
  processingTimeMs: number;
}

// Preprocessing
function preprocessText(text: string): string[] {
  const cleaned = text.replace(/[.,!?;:()]/g, " ").replace(/\s+/g, " ").trim();
  return cleaned.split(" ").filter(Boolean);
}

// Detect expressions in text
function detectExpressions(tokens: string[], originalText: string): DetectedExpression[] {
  const detected: DetectedExpression[] = [];
  const lowerText = originalText.toLowerCase();
  let searchFrom = 0;

  for (let i = 0; i < tokens.length; i++) {
    // Check 2-word combinations first
    if (i < tokens.length - 1) {
      const twoWord = `${tokens[i]} ${tokens[i + 1]}`.toLowerCase();
      const match = expressionLookup.get(twoWord);
      if (match) {
        const idx = lowerText.indexOf(twoWord, searchFrom);
        if (idx !== -1) {
          detected.push({
            original: originalText.substring(idx, idx + twoWord.length),
            matchedGroup: match.meaningGroup,
            matchedExpression: match.expression,
            startIndex: idx,
            endIndex: idx + twoWord.length,
          });
          searchFrom = idx + twoWord.length;
          i++;
          continue;
        }
      }
    }

    // Single word
    const tokenLower = tokens[i].toLowerCase();
    const match = expressionLookup.get(tokenLower);
    if (match) {
      const idx = lowerText.indexOf(tokenLower, searchFrom);
      if (idx !== -1) {
        detected.push({
          original: originalText.substring(idx, idx + tokenLower.length),
          matchedGroup: match.meaningGroup,
          matchedExpression: match.expression,
          startIndex: idx,
          endIndex: idx + tokenLower.length,
        });
        searchFrom = idx + tokenLower.length;
      }
    }
  }

  detected.sort((a, b) => a.startIndex - b.startIndex);
  return detected;
}

// Get equivalent expression for a target generation from a meaning group
function getTargetExpression(group: MeaningGroup, targetGen: Generation): string {
  const targetExprs = group.expressions.filter((e) => e.generation === targetGen);
  return targetExprs.length > 0 ? targetExprs[0].expression : group.coreMeaning;
}

// Full translation pipeline
export function translateText(
  text: string,
  sourceGeneration: Generation = "Gen Z",
  targetGeneration: Generation = "Gen X"
): TranslationResult {
  const startTime = performance.now();

  if (!text.trim()) {
    return {
      originalText: text,
      sourceGeneration,
      targetGeneration,
      detectedExpressions: [],
      translatedText: text,
      processingTimeMs: 0,
    };
  }

  const tokens = preprocessText(text);
  const detected = detectExpressions(tokens, text);

  // Build translated text
  let translatedText = text;
  const sortedDesc = [...detected].sort((a, b) => b.startIndex - a.startIndex);
  for (const d of sortedDesc) {
    const replacement = getTargetExpression(d.matchedGroup, targetGeneration);
    translatedText =
      translatedText.substring(0, d.startIndex) +
      replacement +
      translatedText.substring(d.endIndex);
  }

  return {
    originalText: text,
    sourceGeneration,
    targetGeneration,
    detectedExpressions: detected,
    translatedText,
    processingTimeMs: performance.now() - startTime,
  };
}

// Search meaning groups
export function searchMeaningGroups(query: string): MeaningGroup[] {
  if (!query.trim()) return meaningGroups;
  const q = query.toLowerCase();
  return meaningGroups.filter(
    (g) =>
      g.coreMeaning.toLowerCase().includes(q) ||
      g.context.toLowerCase().includes(q) ||
      g.tags.some((t) => t.includes(q)) ||
      g.expressions.some((e) => e.expression.toLowerCase().includes(q))
  );
}

// Category color mapping
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
