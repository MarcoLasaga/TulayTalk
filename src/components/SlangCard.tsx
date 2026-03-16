import type { DetectedSlang } from "@/lib/nlpEngine";
import CategoryBadge from "./CategoryBadge";
import { motion } from "framer-motion";

interface SlangCardProps {
  detection: DetectedSlang;
  index: number;
}

const SlangCard = ({ detection, index }: SlangCardProps) => {
  const entry = detection.matchedEntry;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="linguistic-card space-y-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">
            {entry.slangWord}
          </h3>
          <p className="text-sm text-muted-foreground">
            → <span className="font-semibold text-primary">{entry.formalTranslation}</span>
          </p>
        </div>
        <CategoryBadge category={entry.category} />
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Meaning
          </p>
          <p className="text-sm text-foreground">{entry.meaning}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Origin
          </p>
          <p className="text-sm text-foreground">{entry.origin}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Example
          </p>
          <p className="text-sm italic text-foreground">"{entry.exampleSentence}"</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            → {entry.exampleTranslation}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SlangCard;
