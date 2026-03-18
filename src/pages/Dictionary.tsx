import { useState, useMemo } from "react";
import { searchMeaningGroups } from "@/lib/nlpEngine";
import type { Generation } from "@/data/generationalDatabase";
import MeaningCard from "@/components/MeaningCard";
import Header from "@/components/Header";
import { Search, BookOpen } from "lucide-react";

const generations: (Generation | "All")[] = ["All", "Gen Alpha", "Gen Z", "Gen X"];

const Dictionary = () => {
  const [query, setQuery] = useState("");
  const [selectedGen, setSelectedGen] = useState<string>("All");

  const results = useMemo(() => {
    let groups = searchMeaningGroups(query);
    if (selectedGen !== "All") {
      groups = groups.filter((g) =>
        g.expressions.some((e) => e.generation === selectedGen)
      );
    }
    return groups.sort((a, b) => a.coreMeaning.localeCompare(b.coreMeaning));
  }, [query, selectedGen]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 space-y-6">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-extrabold text-foreground flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            Generational Dictionary
          </h1>
          <p className="text-muted-foreground">
            Browse {results.length} meaning groups with cross-generational expression mappings.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by meaning, expression, or tag…"
            className="w-full rounded-lg border border-border bg-card pl-11 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
          />
        </div>

        {/* Generation filters */}
        <div className="flex flex-wrap gap-2">
          {generations.map((gen) => (
            <button
              key={gen}
              onClick={() => setSelectedGen(gen)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                selectedGen === gen
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {gen}
            </button>
          ))}
        </div>

        {/* Entries */}
        <div className="space-y-4">
          {results.map((group, i) => (
            <MeaningCard key={group.id} group={group} index={i} />
          ))}
          {results.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No meaning groups found. Try a different search term.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dictionary;
