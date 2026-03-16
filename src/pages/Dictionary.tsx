import { useState, useMemo } from "react";
import { searchDictionary } from "@/lib/nlpEngine";
import type { MorphologicalCategory } from "@/data/slangDatabase";
import CategoryBadge from "@/components/CategoryBadge";
import Header from "@/components/Header";
import { Search, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const allCategories: MorphologicalCategory[] = [
  "Acronym", "Clipping", "Metathesis", "Spelling Change", "Persona-based",
  "Hybrid Blending", "Reduplication", "Homophone", "Affixation",
  "Code-switching", "Semantic Shift", "Onomatopoeia",
];

const Dictionary = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const results = useMemo(() => {
    let entries = searchDictionary(query);
    if (selectedCategory !== "All") {
      entries = entries.filter((e) => e.category === selectedCategory);
    }
    return entries.sort((a, b) => a.slangWord.localeCompare(b.slangWord));
  }, [query, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 space-y-6">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-extrabold text-foreground flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            Slang Dictionary
          </h1>
          <p className="text-muted-foreground">
            Browse {results.length} Filipino-English slang entries with linguistic breakdowns.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search slang, meaning, or category…"
            className="w-full rounded-lg border border-border bg-card pl-11 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              selectedCategory === "All"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            All
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Entries */}
        <div className="space-y-3">
          {results.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(i * 0.03, 0.5) }}
              className="linguistic-card"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {entry.slangWord}
                    </h3>
                    <CategoryBadge category={entry.category} />
                  </div>
                  <p className="text-sm text-primary font-semibold">
                    → {entry.formalTranslation}
                  </p>
                  <p className="text-sm text-foreground">{entry.meaning}</p>
                  <p className="text-xs text-muted-foreground">{entry.origin}</p>
                  <p className="text-sm italic text-muted-foreground">
                    "{entry.exampleSentence}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {results.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No entries found. Try a different search term.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dictionary;
