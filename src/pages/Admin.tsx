import { useMemo, useState } from "react";
import Header from "@/components/Header";
import { getCategoryStats } from "@/lib/nlpEngine";
import { slangDatabase } from "@/data/slangDatabase";
import CategoryBadge from "@/components/CategoryBadge";
import type { MorphologicalCategory } from "@/data/slangDatabase";
import {
  LayoutDashboard, BookOpen, BarChart3, Users, TrendingUp,
  CheckCircle2, XCircle, Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const STORAGE_KEY = "tulaytalk_submissions";

interface Submission {
  slangWord: string;
  meaning: string;
  exampleSentence: string;
  category: MorphologicalCategory;
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

const Admin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(getSubmissions());
  const [activeTab, setActiveTab] = useState<"overview" | "submissions" | "dictionary">("overview");

  const categoryStats = useMemo(() => getCategoryStats(), []);

  const stats = {
    totalEntries: slangDatabase.length,
    totalCategories: categoryStats.length,
    pendingSubmissions: submissions.length,
    topCategory: categoryStats[0]?.category || "N/A",
  };

  const handleApprove = (index: number) => {
    toast.success(`Approved: ${submissions[index].slangWord}`);
    const updated = submissions.filter((_, i) => i !== index);
    setSubmissions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleReject = (index: number) => {
    toast.error(`Rejected: ${submissions[index].slangWord}`);
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
            Manage the TulayTalk dictionary, moderate contributions, and view analytics.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Dictionary Entries", value: stats.totalEntries, icon: BookOpen, color: "text-primary" },
            { label: "Categories", value: stats.totalCategories, icon: BarChart3, color: "text-primary" },
            { label: "Pending Reviews", value: stats.pendingSubmissions, icon: Users, color: "text-accent-foreground" },
            { label: "Top Category", value: stats.topCategory, icon: TrendingUp, color: "text-success" },
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

        {/* Tab content */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bar chart */}
            <div className="rounded-lg border border-border bg-card p-5 space-y-3">
              <h3 className="font-display text-sm font-bold text-foreground">
                Entries by Category
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                    <XAxis
                      dataKey="category"
                      tick={{ fontSize: 10 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0F766E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie chart */}
            <div className="rounded-lg border border-border bg-card p-5 space-y-3">
              <h3 className="font-display text-sm font-bold text-foreground">
                Category Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryStats}
                      dataKey="count"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={({ category }) => category}
                      fontSize={10}
                    >
                      {categoryStats.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
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
                      <h3 className="font-display font-bold text-foreground">{sub.slangWord}</h3>
                      <CategoryBadge category={sub.category} />
                    </div>
                    <p className="text-sm text-foreground">{sub.meaning}</p>
                    {sub.exampleSentence && (
                      <p className="text-xs italic text-muted-foreground">"{sub.exampleSentence}"</p>
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
                    <th className="text-left px-4 py-3 font-display font-bold text-foreground">Word</th>
                    <th className="text-left px-4 py-3 font-display font-bold text-foreground">Translation</th>
                    <th className="text-left px-4 py-3 font-display font-bold text-foreground">Category</th>
                    <th className="text-left px-4 py-3 font-display font-bold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {slangDatabase.map((entry) => (
                    <tr key={entry.id} className="border-t border-border hover:bg-muted/50">
                      <td className="px-4 py-3 font-semibold text-foreground">{entry.slangWord}</td>
                      <td className="px-4 py-3 text-muted-foreground">{entry.formalTranslation}</td>
                      <td className="px-4 py-3">
                        <CategoryBadge category={entry.category} />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toast.info(`Edit ${entry.slangWord} — feature coming soon`)}
                          className="text-xs text-primary hover:underline"
                        >
                          Edit
                        </button>
                      </td>
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
