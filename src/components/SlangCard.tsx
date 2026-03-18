import type { DetectedExpression } from "@/lib/nlpEngine";
import type { Generation } from "@/data/generationalDatabase";
import CategoryBadge from "./CategoryBadge";
import { motion } from "framer-motion";

interface SlangCardProps {
  detection: DetectedExpression;
  index: number;
}

const generations: Generation[] = ["Gen Alpha", "Gen Z", "Gen X"];

const SlangCard = ({ detection, index }: SlangCardProps) => {
  const group = detection.matchedGroup;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="linguistic-card space-y-3"
    >
      <div>
        <h3 className="font-display text-lg font-bold text-foreground">{group.coreMeaning}</h3>
        <p className="text-sm text-muted-foreground">{group.context}</p>
      </div>

      <div className="space-y-2">
        {generations.map((gen) => {
          const exprs = group.expressions.filter((e) => e.generation === gen);
          if (exprs.length === 0) return null;
          return (
            <div key={gen}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{gen}</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {exprs.map((expr, j) => (
                  <span key={j} className="text-sm font-medium text-foreground">
                    {expr.expression}
                    {expr.category && <CategoryBadge category={expr.category} />}
                    {j < exprs.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SlangCard;
