import { useMemo, useState } from "react";
import Header from "@/components/Header";
import { getCategoryStats, getGenerationStats } from "@/data/generationalDatabase";
import { meaningGroups } from "@/data/generationalDatabase";
import type { Generation, Tone } from "@/data/generationalDatabase";
import {
  LayoutDashboard, BookOpen, BarChart3, Users, TrendingUp,
  CheckCircle2, XCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const STORAGE_KEY = "tulaytalk_submissions";

interface Submission {
  expression: string;
  meaning: string;
  generation: Generation;
  tone: Tone;
  example: string;
  submittedAt: string;
}

function getSubmissions(): Submission[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

const PIE_COLORS = [
  "#0F766E", "#10B981", "#FDE047", "#F59E0B", "#3B82F6",
  "#8B5CF6", "#EC4899", "#EF4444", "#06B6D4", "#84CC16",
  "#F97316", "#6366F1",
];

const GEN_COLORS: Record<string, string> = {
  "Gen Alpha": "#8B5CF6",
  "Gen Z": "#0F766E",
  "Gen X": "#F59E0B",
};

const Admin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(getSubmissions());
  const [activeTab, setActiveTab] = useState<"overview" | "submissions" | "dictionary">("overview");

  const categoryStats = useMemo(() => getCategoryStats(), []);
  const generationStats = useMemo(() => getGenerationStats(), []);

  const stats = {
    totalMeaningGroups: meaningGroups.length,
    totalExpressions: meaningGroups.reduce((sum, g) => sum + g.expressions.length, 0),
    pendingSubmissions: submissions.length,
    totalCategories: categoryStats.length,
  };

  const handleApprove = (index: number) => {
    toast.success(`Approved: ${submissions[index].expression}`);
    const updated = submissions.filter((_, i) => i !== index);
    setSubmissions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleReject = (index: number) => {
    toast.error(`Rejected: ${submissions[index].expression}`);
    const updated = submissions.filter((_, i) => i !== index);
    setSubmissions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 space-y-6">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-extrabold text-foreground flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage generational mappings, moderate contributions, and view analytics.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Meaning Groups", value: stats.totalMeaningGroups, icon: BookOpen, color: "text-primary" },
            { label: "Total Expressions", value: stats.totalExpressions, icon: BarChart3, color: "text-primary" },
            { label: "Pending Reviews", value: stats.pendingSubmissions, icon: Users, color: "text-accent-foreground" },
            { label: "Categories", value: stats.totalCategories, icon: TrendingUp, color: "text-success" },
          ].map((s, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase text-muted-foreground">{s.label}</p>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <p className="font-display text-2xl font-extrabold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border">
          {(["overview", "submissions", "dictionary"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Category bar chart */}
            <div className="rounded-lg border border-border bg-card p-5 space-y-3">
              <h3 className="font-display text-sm font-bold text-foreground">
                Expressions by Morphological Category
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                    <XAxis dataKey="category" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0F766E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Generation pie chart */}
            <div className="rounded-lg border border-border bg-card p-5 space-y-3">
              <h3 className="font-display text-sm font-bold text-foreground">
                Expressions by Generation
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={generationStats}
                      dataKey="count"
                      nameKey="generation"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={({ generation }) => generation}
                      fontSize={11}
                    >
                      {generationStats.map((entry) => (
                        <Cell key={entry.generation} fill={GEN_COLORS[entry.generation] || "#6366F1"} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="space-y-3">
            {submissions.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                No pending submissions. All caught up! 🎉
              </p>
            ) : (
              submissions.map((sub, i) => (
                <div key={i} className="linguistic-card flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-foreground">{sub.expression}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {sub.generation}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">
                        {sub.tone}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{sub.meaning}</p>
                    {sub.example && (
                      <p className="text-xs italic text-muted-foreground">"{sub.example}"</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Submitted: {new Date(sub.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(i)}
                      className="flex items-center gap-1.5 rounded-lg bg-success px-3 py-2 text-xs font-semibold text-success-foreground hover:bg-success/90 transition-colors"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(i)}
                      className="flex items-center gap-1.5 rounded-lg bg-destructive px-3 py-2 text-xs font-semibold text-destructive-foreground hover:bg-destructive/90 transition-colors"
                    >
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "dictionary" && (
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left px-4 py-3 font-display font-bold text-foreground">Meaning Group</th>
                    <th className="text-left px-4 py-3 font-display font-bold text-foreground">Gen Alpha</th>
                    <th className="text-left px-4 py-3 font-display font-bold text-foreground">Gen Z</th>
                    <th className="text-left px-4 py-3 font-display font-bold text-foreground">Gen X</th>
                  </tr>
                </thead>
                <tbody>
                  {meaningGroups.map((group) => (
                    <tr key={group.id} className="border-t border-border hover:bg-muted/50">
                      <td className="px-4 py-3 font-semibold text-foreground max-w-[200px]">
                        {group.coreMeaning}
                      </td>
                      {(["Gen Alpha", "Gen Z", "Gen X"] as Generation[]).map((gen) => {
                        const exprs = group.expressions.filter((e) => e.generation === gen);
                        return (
                          <td key={gen} className="px-4 py-3 text-muted-foreground">
                            {exprs.map((e) => e.expression).join(", ") || "—"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
