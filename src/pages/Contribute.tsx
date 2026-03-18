import { useState } from "react";
import Header from "@/components/Header";
import type { Generation, Tone } from "@/data/generationalDatabase";
import { PlusCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const generations: Generation[] = ["Gen Alpha", "Gen Z", "Gen X"];
const tones: Tone[] = ["casual", "humorous", "sarcastic", "serious", "affectionate", "frustrated"];

interface Submission {
  expression: string;
  meaning: string;
  generation: Generation;
  tone: Tone;
  example: string;
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
  const [expression, setExpression] = useState("");
  const [meaning, setMeaning] = useState("");
  const [generation, setGeneration] = useState<Generation>("Gen Z");
  const [tone, setTone] = useState<Tone>("casual");
  const [example, setExample] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expression.trim() || !meaning.trim()) {
      toast.error("Please fill in the expression and its meaning.");
      return;
    }

    const submission: Submission = {
      expression: expression.trim(),
      meaning: meaning.trim(),
      generation,
      tone,
      example: example.trim(),
      submittedAt: new Date().toISOString(),
    };

    const existing = getSubmissions();
    existing.push(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    setSubmitted(true);
    toast.success("Expression submitted for moderation!");
    setTimeout(() => {
      setExpression("");
      setMeaning("");
      setExample("");
      setGeneration("Gen Z");
      setTone("casual");
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
            Contribute Expression
          </h1>
          <p className="text-muted-foreground">
            Know an expression that's missing? Submit it with its meaning, generation, and tone to help bridge generational gaps.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Expression *</label>
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder='e.g., "Skibidi" or "Nangangarap nang gising"'
              className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Core Meaning *</label>
            <textarea
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="What does it mean? (e.g., 'Weird / Chaotic / Nonsensical')"
              rows={3}
              className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-body"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Generation</label>
              <select
                value={generation}
                onChange={(e) => setGeneration(e.target.value as Generation)}
                className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
              >
                {generations.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body capitalize"
              >
                {tones.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Example Sentence</label>
            <input
              type="text"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="e.g., That's so skibidi bro"
              className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
            />
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
