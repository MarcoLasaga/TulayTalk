import { useState } from "react";
import Header from "@/components/Header";
import type { MorphologicalCategory } from "@/data/slangDatabase";
import { PlusCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const categories: MorphologicalCategory[] = [
  "Acronym", "Clipping", "Metathesis", "Spelling Change", "Persona-based",
  "Hybrid Blending", "Reduplication", "Homophone", "Affixation",
  "Code-switching", "Semantic Shift", "Onomatopoeia",
];

interface Submission {
  slangWord: string;
  meaning: string;
  exampleSentence: string;
  category: MorphologicalCategory;
  submittedAt: string;
}

const STORAGE_KEY = "tulaytalk_submissions";

function getSubmissions(): Submission[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

const Contribute = () => {
  const [slangWord, setSlangWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [exampleSentence, setExampleSentence] = useState("");
  const [category, setCategory] = useState<MorphologicalCategory>("Clipping");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slangWord.trim() || !meaning.trim()) {
      toast.error("Please fill in the slang word and meaning.");
      return;
    }

    const submission: Submission = {
      slangWord: slangWord.trim(),
      meaning: meaning.trim(),
      exampleSentence: exampleSentence.trim(),
      category,
      submittedAt: new Date().toISOString(),
    };

    const existing = getSubmissions();
    existing.push(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    setSubmitted(true);
    toast.success("Slang submitted for moderation!");
    setTimeout(() => {
      setSlangWord("");
      setMeaning("");
      setExampleSentence("");
      setCategory("Clipping");
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 max-w-xl space-y-6">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-extrabold text-foreground flex items-center gap-3">
            <PlusCircle className="h-8 w-8 text-primary" />
            Contribute Slang
          </h1>
          <p className="text-muted-foreground">
            Know a slang term that's missing? Submit it for review and help grow the TulayTalk dictionary.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Slang Word *</label>
            <input
              type="text"
              value={slangWord}
              onChange={(e) => setSlangWord(e.target.value)}
              placeholder='e.g., "Skibidi"'
              className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Meaning *</label>
            <textarea
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="What does it mean?"
              rows={3}
              className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-body"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Example Sentence</label>
            <input
              type="text"
              value={exampleSentence}
              onChange={(e) => setExampleSentence(e.target.value)}
              placeholder='e.g., "Ang skibidi ng dance moves niya!"'
              className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Morphological Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as MorphologicalCategory)}
              className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={submitted}
            className={`w-full rounded-lg px-6 py-3 font-display font-bold text-sm transition-colors ${
              submitted
                ? "bg-success text-success-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {submitted ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Submitted!
              </span>
            ) : (
              "Submit for Review"
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Contribute;
