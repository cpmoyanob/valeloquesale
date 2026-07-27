import { BRAND } from "@/lib/brand";

// veredicto: "gold" | "trash"
export default function VerdictBadge({ veredicto, size = "md" }) {
  const v = veredicto === "trash" ? BRAND.verdicts.trash : BRAND.verdicts.gold;
  const style = { background: v.color, fontSize: size === "lg" ? 14 : 12 };
  return (
    <span className="badge" style={style}>
      <span>{v.emoji}</span>
      {v.label}
    </span>
  );
}
