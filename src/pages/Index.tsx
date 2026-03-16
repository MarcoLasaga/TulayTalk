import { useState, useCallback, useEffect } from "react";
import { translateText, type TranslationResult } from "@/lib/nlpEngine";
import SlangCard from "@/components/SlangCard";
import Header from "@/components/Header";
import { ArrowRight, Clock, Hash, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const sampleInputs = [
  "SKL besh, forda ferson na naman si kuya, delulu talaga.",
  "Lodi ka talaga, petmalu ang performance mo! Sana all!",
  "Naur, na-ghost na naman ako. Awit. SML talaga.",
  "Bet! Tara sa thursdate mamaya. No cap, slay ang outfit mo!",
];

const Index = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<TranslationResult | null>(null);

  const handleTranslate = useCallback((text: string) => {
    if (!text.trim()) {
      setResult(null);
      return;
    }
    const r = translateText(text);
    setResult(r);
  }, []);

  // Real-time translation with debounce
  useEffect(() => {
    const timer = setTimeout(() => handleTranslate(input), 200);
    return () => clearTimeout(timer);
  }, [input, handleTranslate]);

  const renderHighlightedText = () => {
    if (!result || result.detectedSlang.length === 0) {
      return <span>{input}</span>;
    }

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    result.detectedSlang.forEach((d, i) => {
      if (d.startIndex > lastIndex) {
        parts.push(
          <span key={`text-${i}`}>{result.originalText.substring(lastIndex, d.startIndex)}</span>
        );
      }
      parts.push(
        <span key={`slang-${i}`} className="highlight-slang" title={d.matchedEntry.meaning}>
          {d.original}
        </span>
      );
      lastIndex = d.endIndex;
    });

    if (lastIndex < result.originalText.length) {
      parts.push(<span key="text-end">{result.originalText.substring(lastIndex)}</span>);
    }

    return <>{parts}</>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 space-y-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Tulay<span className="text-primary">Talk</span> Translator
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Decode modern Filipino-English slang. Enter a message containing Taglish slang and get
            instant translations, linguistic breakdowns, and contextual explanations.
          </p>
        </motion.div>

        {/* Sample inputs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {sampleInputs.map((s, i) => (
            <button
              key={i}
              onClick={() => setInput(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Try: "{s.substring(0, 40)}…"
            </button>
          ))}
        </div>

        {/* Translator panels */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Input (Gen Z Slang)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Try: "SKL besh, forda ferson na naman si kuya, delulu talaga."'
              className="w-full h-40 rounded-lg border border-border bg-card p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-body"
            />
            {input && result && (
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                  Detected Slang (Highlighted)
                </p>
                <p className="text-sm leading-relaxed font-body">{renderHighlightedText()}</p>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <ArrowRight className="h-4 w-4 text-success" />
              Formal Translation
            </label>
            <div className="w-full h-40 rounded-lg border border-border bg-card p-4 overflow-auto">
              {result && result.translatedText ? (
                <p className="text-sm text-foreground leading-relaxed font-body">
                  {result.translatedText}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Translation will appear here…
                </p>
              )}
            </div>

            {result && result.detectedSlang.length > 0 && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Hash className="h-3.5 w-3.5" />
                  {result.detectedSlang.length} slang detected
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {result.processingTimeMs.toFixed(1)}ms
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Linguistic Cards */}
        {result && result.detectedSlang.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-foreground">
              Linguistic Analysis
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.detectedSlang.map((d, i) => (
                <SlangCard key={`${d.matchedEntry.id}-${i}`} detection={d} index={i} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
