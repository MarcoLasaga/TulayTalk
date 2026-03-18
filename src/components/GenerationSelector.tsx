import type { Generation } from "@/data/generationalDatabase";

interface GenerationSelectorProps {
  label: string;
  value: Generation;
  onChange: (gen: Generation) => void;
}

const generations: Generation[] = ["Gen Alpha", "Gen Z", "Gen X"];

const genColors: Record<Generation, string> = {
  "Gen Alpha": "bg-purple-100 text-purple-800 border-purple-200",
  "Gen Z": "bg-primary/10 text-primary border-primary/20",
  "Gen X": "bg-amber-100 text-amber-800 border-amber-200",
};

const GenerationSelector = ({ label, value, onChange }: GenerationSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-display font-bold uppercase tracking-wider text-muted-foreground">
        {label}:
      </span>
      <div className="flex gap-1">
        {generations.map((gen) => (
          <button
            key={gen}
            onClick={() => onChange(gen)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              value === gen
                ? genColors[gen]
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {gen}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenerationSelector;
