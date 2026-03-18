import { getCategoryColor } from "@/lib/nlpEngine";
import type { MorphologicalCategory } from "@/data/generationalDatabase";

interface CategoryBadgeProps {
  category: MorphologicalCategory;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const colors = getCategoryColor(category);
  return (
    <span className={`category-badge ${colors.bg} ${colors.text}`}>
      {category}
    </span>
  );
};

export default CategoryBadge;
