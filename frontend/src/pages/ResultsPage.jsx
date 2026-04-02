import { Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAnalysis } from "../hooks/useAnalysis";
import { useRewrite } from "../hooks/useRewrite";

function getScoreColors(score) {
  if (score >= 71) {
    return {
      text: "text-emerald-600",
      stroke: "text-emerald-500",
      bg: "bg-emerald-500",
      lightBg: "bg-emerald-100/30",
      lightStroke: "text-emerald-100/50",
    };
  } else if (score >= 41) {
    return {
      text: "text-amber-600",
      stroke: "text-amber-500",
      bg: "bg-amber-500",
      lightBg: "bg-amber-100/30",
      lightStroke: "text-amber-100/50",
    };
  } else {
    return {
      text: "text-red-600",
      stroke: "text-red-500",
      bg: "bg-red-500",
      lightBg: "bg-red-100/30",
      lightStroke: "text-red-100/50",
    };
  }
}

function SectionIcon({ status }) {
  if (status === "pass" || status === "verified")
    return (
      <span
        className="material-symbols-outlined text-primary"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        check_circle
      </span>
    );
  if (status === "needs_improvement" || status === "action_required")
    return (
      <span
        className="material-symbols-outlined text-tertiary"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        warning
      </span>
    );
  return (
    <span
      className="material-symbols-outlined text-secondary"
      style={{ fontVariationSettings: "'FILL' 1" }}
    >
      info
    </span>
  );
}

function SectionBadge({ status }) {
  if (status === "pass" || status === "verified")
    return (
      <span className="bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
        Optimized
      </span>
    );
  if (status === "needs_improvement" || status === "action_required")
    return (
      <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
        Action Required
      </span>
    );
  return (
    <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
      Insight Ready
    </span>
  );
}

function AccordionItem({ title, data, initialExpanded = false }) {
  const [expanded, setExpanded] = useState(initialExpanded);
  const [rewrittenText, setRewrittenText] = useState(null);

  const { jobDescription } = useAnalysis();
  const { rewriteSection, isRewriting, rewriteError } = useRewrite();

  const handleRewrite = async (e) => {
    e.stopPropagation();
    setExpanded(true); // Ensure panel is open

    if (rewrittenText) return; // Already rewritten

    try {
      const response = await rewriteSection(
        title,
        data.original_text || "See full resume context.",
        jobDescription,
        data.feedback,
      );
      setRewrittenText(response.rewritten_text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="glass-panel rounded-[2rem] overflow-hidden transition-all shadow-sm">
      <div
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/20 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <SectionIcon status={data.status} />
          <span className="font-headline font-bold text-on-surface capitalize">
            {title}
          </span>
          <SectionBadge status={data.status} />
        </div>
        <div className="flex items-center gap-4">
          <button
            className="text-primary font-label text-xs font-bold hover:underline disabled:opacity-50"
            onClick={handleRewrite}
            disabled={
              isRewriting ||
              data.status === "pass" ||
              data.status === "verified"
            }
          >
            {isRewriting ? "Rewriting..." : "Rewrite"}
          </button>
          <span
            className={`material-symbols-outlined transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          >
            expand_more
          </span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-emerald-100/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                <div className="space-y-3">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    Feedback
                  </p>
                  <ul className="list-disc pl-4 space-y-2">
                    {data.feedback.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-on-surface leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    AI Insight
                  </p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {data.insight ||
                      "No specific insight provided for this section."}
                  </p>
                </div>
              </div>

              {rewriteError && (
                <div className="mt-4 p-4 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed-variant text-sm border border-tertiary/20">
                  <span className="font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[1rem]">
                      error
                    </span>{" "}
                    Rewrite Failed
                  </span>
                  <p className="mt-1">{rewriteError}</p>
                </div>
              )}

              {isRewriting && !rewrittenText && (
                <div className="mt-6 p-6 rounded-2xl bg-white/50 border border-primary/20 flex flex-col items-center justify-center space-y-4">
                  <span className="material-symbols-outlined text-primary animate-spin text-3xl">
                    model_training
                  </span>
                  <p className="text-sm font-semibold text-primary animate-pulse">
                    DeepSeek R1 is rewriting this section...
                  </p>
                </div>
              )}

              {rewrittenText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 rounded-2xl bg-white/60 border border-emerald-100 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                      <span className="material-symbols-outlined text-[1rem]">
                        auto_awesome
                      </span>{" "}
                      AI Rewritten Output
                    </p>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(rewrittenText)
                      }
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[1rem]">
                        content_copy
                      </span>{" "}
                      Copy
                    </button>
                  </div>
                  <div className="prose prose-sm prose-emerald max-w-none text-on-surface">
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {rewrittenText}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ResultsPage() {
  const { analysisResult } = useAnalysis();

  if (!analysisResult) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-24 flex flex-col items-center justify-center space-y-6">
        <span className="material-symbols-outlined text-6xl text-emerald-200">
          folder_open
        </span>
        <h2 className="font-headline text-2xl font-bold text-on-surface">
          No analysis found
        </h2>
        <p className="text-on-surface-variant max-w-md text-center">
          Please upload a resume first to generate personalized AI insights and
          match scores.
        </p>
        <Link
          className="px-8 py-3 bg-primary text-on-primary rounded-full font-bold uppercase tracking-widest hover:bg-emerald-800 transition-colors"
          to="/upload"
        >
          Upload Resume
        </Link>
      </div>
    );
  }

  const {
    analysis,
    extraction,
    model_routing = {},
    cost_summary = {},
  } = analysisResult;
  const feedbackSections = Object.entries(analysis.sections || {});

  const competency = [
    ["Professional Experience", analysis.sub_scores.experience_relevance],
    ["Core Skills", analysis.sub_scores.technical_skills],
    ["Education & Certs", analysis.sub_scores.education_fit],
    ["Key Projects", analysis.sub_scores.soft_skills],
  ];

  const score = analysis.overall_score;
  const scoreColors = getScoreColors(score);
  const scoreOffset = 691.15 - (691.15 * score) / 100;
  const modelsUsed =
    Array.isArray(cost_summary.models_used) &&
    cost_summary.models_used.length > 0
      ? cost_summary.models_used.join(" + ")
      : model_routing.selected_model || "N/A";
  const requestedModel = model_routing.requested_model || "openrouter/auto";
  const totalTokens =
    (cost_summary.total_input_tokens || 0) +
    (cost_summary.total_output_tokens || 0);
  const estimatedCost = Number(cost_summary.estimated_cost_usd || 0).toFixed(6);

  return (
    <div className="max-w-6xl mx-auto px-8 py-12 md:py-16 space-y-12">
      {/* Metrics Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-6 bg-white border border-emerald-100/50 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex flex-wrap gap-8 flex-1">
          <div className="flex flex-col min-w-[200px]" title={modelsUsed}>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              Model Engines
            </span>
            <span className="text-sm font-semibold text-primary break-words">
              {modelsUsed}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              Confidence
            </span>
            <span className="text-sm font-semibold text-primary capitalize">
              {extraction.extraction_confidence}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              Tokens
            </span>
            <span className="text-sm font-semibold text-primary">
              {totalTokens}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              Cost
            </span>
            <span className="text-sm font-semibold text-primary">
              ${estimatedCost}
            </span>
          </div>
        </div>
        <Link
          className="px-6 py-3 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-emerald-800 transition-colors whitespace-nowrap"
          to="/upload"
        >
          Re-analyse Resume
        </Link>
      </motion.div>

      {/* Hero Score Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-12 gap-8 items-center"
      >
        <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-center space-y-4">
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Circular Progress SVG */}
            <svg className="w-full h-full -rotate-90 transform">
              <circle
                className={scoreColors.lightStroke}
                cx="128"
                cy="128"
                fill="transparent"
                r="110"
                stroke="currentColor"
                strokeWidth="12"
              ></circle>
              <motion.circle
                initial={{ strokeDashoffset: 691.15 }}
                animate={{ strokeDashoffset: scoreOffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={scoreColors.stroke}
                cx="128"
                cy="128"
                fill="transparent"
                r="110"
                stroke="currentColor"
                strokeDasharray="691.15"
                strokeWidth="12"
              ></motion.circle>
            </svg>
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center ${scoreColors.text}`}
            >
              <span className="font-headline text-7xl font-extrabold tracking-tighter">
                {score}
              </span>
              <span className="font-body text-sm font-semibold uppercase tracking-widest">
                Match Score
              </span>
            </div>
          </div>
          <div className="text-center px-12">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">
              {score >= 71
                ? "Excellent Fit"
                : score >= 41
                  ? "Strong Candidate"
                  : "Requires Review"}
            </h2>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Based on the core requirements and semantic footprint matching.
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 space-y-8 glass-panel p-10 rounded-[2.5rem] shadow-sm">
          <h3 className="font-headline text-lg font-bold text-on-surface mb-4">
            Competency Breakdown
          </h3>
          <div className="space-y-6">
            {competency.map(([label, value], idx) => {
              const compColors = getScoreColors(value || 0);
              return (
                <div key={label} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-body">
                    <span className="text-on-surface-variant font-medium">
                      {label}
                    </span>
                    <span className="text-on-surface font-bold">
                      {value || 0}%
                    </span>
                  </div>
                  <div
                    className={`h-2 w-full ${compColors.lightBg} rounded-full overflow-hidden`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value || 0}%` }}
                      transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                      className={`h-full ${compColors.bg} rounded-full`}
                    ></motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Skills Analysis Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <h3 className="font-headline text-2xl font-bold px-4">
          Skills Matrix Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Matched */}
          <div className="glass-panel p-6 rounded-[2rem] shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-primary">
              <span className="material-symbols-outlined">check_circle</span>
              <span className="font-headline font-bold text-sm tracking-wide">
                Matched Skills
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.matched_skills?.map((skill) => (
                <span
                  key={skill}
                  className="bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full text-xs font-medium border border-primary/10"
                >
                  {skill}
                </span>
              ))}
              {(!analysis.matched_skills ||
                analysis.matched_skills.length === 0) && (
                <span className="text-xs text-on-surface-variant">
                  No matched skills.
                </span>
              )}
            </div>
          </div>

          {/* Missing */}
          <div className="glass-panel p-6 rounded-[2rem] shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-tertiary">
              <span className="material-symbols-outlined">warning</span>
              <span className="font-headline font-bold text-sm tracking-wide">
                Missing Skills
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.missing_skills?.map((skill) => (
                <span
                  key={skill}
                  className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-xs font-medium border border-tertiary/10"
                >
                  {skill}
                </span>
              ))}
              {(!analysis.missing_skills ||
                analysis.missing_skills.length === 0) && (
                <span className="text-xs text-on-surface-variant">
                  No missing skills!
                </span>
              )}
            </div>
          </div>

          {/* Bonus */}
          <div className="glass-panel p-6 rounded-[2rem] shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-secondary">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span className="font-headline font-bold text-sm tracking-wide">
                Bonus Assets
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.bonus_skills?.map((skill) => (
                <span
                  key={skill}
                  className="bg-secondary-fixed text-on-secondary-fixed-variant px-3 py-1 rounded-full text-xs font-medium border border-secondary/10"
                >
                  {skill}
                </span>
              ))}
              {(!analysis.bonus_skills ||
                analysis.bonus_skills.length === 0) && (
                <span className="text-xs text-on-surface-variant">
                  No bonus skills.
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Detailed Feedback Accordion */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <h3 className="font-headline text-2xl font-bold px-4">
          Editorial Feedback
        </h3>
        <div className="space-y-4">
          {feedbackSections.length > 0 ? (
            feedbackSections.map(([key, data], idx) => (
              <AccordionItem
                key={key}
                title={key}
                data={data}
                initialExpanded={idx === 0}
              />
            ))
          ) : (
            <p className="px-4 text-sm text-on-surface-variant">
              No detailed feedback available.
            </p>
          )}
        </div>
      </motion.section>

      {/* Extracted Data Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <h3 className="font-headline text-2xl font-bold px-4">
          Extracted Resume Content
        </h3>
        <div className="glass-panel p-6 rounded-[2rem] shadow-sm">
          <div className="prose prose-sm max-w-none text-on-surface bg-white/40 p-4 rounded-xl overflow-y-auto max-h-96 border border-emerald-50">
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {extraction.text || "No text extracted."}
            </pre>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
