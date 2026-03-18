import { useState, useCallback, useEffect } from "react";
import { translateText, type TranslationResult } from "@/lib/nlpEngine";
import type { Generation } from "@/data/generationalDatabase";
import Header from "@/components/Header";
import GenerationSelector from "@/components/GenerationSelector";
import MeaningCard from "@/components/MeaningCard";
import { ArrowRight, ArrowLeftRight, Clock, Hash, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const sampleInputs = [
  { text: "SKL besh, delulu talaga si kuya", from: "Gen Z" as Generation, to: "Gen X" as Generation },
  { text: "That's cap fr, she's so delulu", from: "Gen Alpha" as Generation, to: "Gen X" as Generation },
  { text: "Lodi ka talaga, petmalu! Sana all!", from: "Gen Z" as Generation, to: "Gen X" as Generation },
  { text: "Naur, na-ghost na naman ako. Awit.", from: "Gen Z" as Generation, to: "Gen Alpha" as Generation },
];

const Index = () => {
  const [input, setInput] = useState("");
  const [sourceGen, setSourceGen] = useState<Generation>("Gen Z");
  const [targetGen, setTargetGen] = useState<Generation>("Gen X");
  const [result, setResult] = useState<TranslationResult | null>(null);

  const handleTranslate = useCallback(
    (text: string) => {
      if (!text.trim()) {
        setResult(null);
        return;
      }
      setResult(translateText(text, sourceGen, targetGen));
    },
    [sourceGen, targetGen]
  );

  useEffect(() => {
    const timer = setTimeout(() => handleTranslate(input), 200);
    return () => clearTimeout(timer);
  }, [input, handleTranslate]);

  const swapGenerations = () => {
    setSourceGen(targetGen);
    setTargetGen(sourceGen);
  };

  const renderHighlightedText = () => {
    if (!result || result.detectedExpressions.length === 0) {
      return <span>{input}</span>;
    }
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    result.detectedExpressions.forEach((d, i) => {
      if (d.startIndex > lastIndex) {
        parts.push(<span key={`t-${i}`}>{result.originalText.substring(lastIndex, d.startIndex)}</span>);
      }
      parts.push(
        <span key={`s-${i}`} className="highlight-slang" title={d.matchedGroup.coreMeaning}>
          {d.original}
        </span>
      );
      lastIndex = d.endIndex;
    });
    if (lastIndex < result.originalText.length) {
      parts.push(<span key="end">{result.originalText.substring(lastIndex)}</span>);
    }
    return <>{parts}</>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 space-y-8">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Tulay<span className="text-primary">Talk</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            A Cross-Generational Language Bridge — translate expressions across Gen Alpha, Gen Z, and Gen X.
            Understand meaning, not just words.
          </p>
        </motion.div>

        {/* Generation selectors */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <GenerationSelector label="From" value={sourceGen} onChange={setSourceGen} />
          <button
            onClick={swapGenerations}
            className="p-2.5 rounded-full border border-border bg-card hover:bg-muted transition-colors"
            title="Swap generations"
          >
            <ArrowLeftRight className="h-4 w-4 text-primary" />
          </button>
          <GenerationSelector label="To" value={targetGen} onChange={setTargetGen} />
        </div>

        {/* Sample inputs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {sampleInputs.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(s.text);
                setSourceGen(s.from);
                setTargetGen(s.to);
              }}
              className="text-xs px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {s.from} → {s.to}: "{s.text.substring(0, 35)}…"
            </button>
          ))}
        </div>

        {/* Translator panels */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              {sourceGen} Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter a ${sourceGen} expression or sentence…`}
              className="w-full h-40 rounded-lg border border-border bg-card p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-body"
            />
            {input && result && result.detectedExpressions.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                  Detected Expressions (Highlighted)
                </p>
                <p className="text-sm leading-relaxed font-body">{renderHighlightedText()}</p>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <ArrowRight className="h-4 w-4 text-success" />
              {targetGen} Translation
            </label>
            <div className="w-full h-40 rounded-lg border border-border bg-card p-4 overflow-auto">
              {result && result.translatedText ? (
                <p className="text-sm text-foreground leading-relaxed font-body">{result.translatedText}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">Translation will appear here…</p>
              )}
            </div>
            {result && result.detectedExpressions.length > 0 && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Hash className="h-3.5 w-3.5" />
                  {result.detectedExpressions.length} expressions detected
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {result.processingTimeMs.toFixed(1)}ms
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Multi-Column Generational Comparison */}
        {result && result.detectedExpressions.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-foreground">
              Cross-Generational Mapping
            </h2>
            <div className="space-y-4">
              {result.detectedExpressions.map((d, i) => (
                <MeaningCard key={`${d.matchedGroup.id}-${i}`} group={d.matchedGroup} highlightExpression={d.original} index={i} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
