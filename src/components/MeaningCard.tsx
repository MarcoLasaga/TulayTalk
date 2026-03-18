import type { MeaningGroup, Generation } from "@/data/generationalDatabase";
import CategoryBadge from "./CategoryBadge";
import { motion } from "framer-motion";

interface MeaningCardProps {
  group: MeaningGroup;
  highlightExpression?: string;
  index: number;
}

const generations: Generation[] = ["Gen Alpha", "Gen Z", "Gen X"];

const genHeaderColors: Record<Generation, string> = {
  "Gen Alpha": "bg-purple-50 text-purple-800",
  "Gen Z": "bg-primary/5 text-primary",
  "Gen X": "bg-amber-50 text-amber-800",
};

const MeaningCard = ({ group, highlightExpression, index }: MeaningCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="linguistic-card space-y-4"
    >
      {/* Core Meaning */}
      <div className="space-y-1">
        <h3 className="font-display text-lg font-bold text-foreground">
          {group.coreMeaning}
        </h3>
        <p className="text-sm text-muted-foreground">{group.context}</p>
        {group.culturalNote && (
          <p className="text-xs italic text-muted-foreground">💡 {group.culturalNote}</p>
        )}
      </div>

      {/* Multi-Column Generation Table */}
      <div className="grid grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
        {generations.map((gen) => {
          const exprs = group.expressions.filter((e) => e.generation === gen);
          return (
            <div key={gen} className="bg-card">
              <div className={`px-3 py-2 text-xs font-display font-bold text-center ${genHeaderColors[gen]}`}>
                {gen}
              </div>
              <div className="p-3 space-y-2 min-h-[80px]">
                {exprs.length > 0 ? (
                  exprs.map((expr, j) => (
                    <div key={j} className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-sm font-semibold ${
                            highlightExpression &&
                            expr.expression.toLowerCase() === highlightExpression.toLowerCase()
                              ? "highlight-slang"
                              : "text-foreground"
                          }`}
                        >
                          {expr.expression}
                        </span>
                        {expr.category && <CategoryBadge category={expr.category} />}
                      </div>
                      <p className="text-xs text-muted-foreground italic">"{expr.example}"</p>
                      <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        {expr.tone}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground italic">No expression mapped</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {group.tags.map((tag) => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default MeaningCard;
