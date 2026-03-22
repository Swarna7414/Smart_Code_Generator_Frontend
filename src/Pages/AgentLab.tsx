import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlay,
  FiLoader,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiCode,
  FiCpu,
  FiZap,
  FiRefreshCw,
  FiChevronDown,
  FiChevronUp,
  FiCopy,
  FiCheck,
  FiGlobe,
} from "react-icons/fi";

interface AgentEvent {
  type: string;
  message: string;
  timestamp: string;
  code?: string;
  new_code?: string;
  reflection?: string;
  iteration?: number;
  execution?: ExecutionResult;
  error?: ErrorInfo;
  iteration_data?: IterationData;
  iterations?: IterationData[];
  final_code?: string;
  success?: boolean;
  total_time?: number;
  iterations_count?: number;
  mode?: string;
  languages?: string[];
  analysis?: AnalysisResult;
}

interface ExecutionResult {
  success: boolean;
  stdout: string;
  stderr: string;
  elapsed: number;
  timed_out: boolean;
}

interface ErrorInfo {
  type: string;
  message: string;
  line_number: number | null;
  traceback: string;
}

interface IterationData {
  iteration: number;
  code: string;
  execution: ExecutionResult;
  status: "success" | "failed";
  timestamp: string;
  error?: ErrorInfo;
  reflection?: string;
}

interface LogEntry {
  ts: string;
  prefix: string;
  msg: string;
  type: string;
}

interface LanguageImpl {
  language: string;
  code: string;
  explanation: string;
  difficulty: string;
  difficulty_score: number;
  frameworks: string[];
}

interface AnalysisResult {
  summary: string;
  implementations: LanguageImpl[];
  comparison: string;
  key_differences: string[];
  recommendation: string;
}

const API_BASE = "http://localhost:8000";

const StatusBadge: React.FC<{ status: string; mode?: string | null }> = ({ status, mode }) => {
  const map: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
    idle:    { label: "Idle",           cls: "bg-gray-100 text-gray-400 border border-gray-200",                  icon: <FiCpu size={13} /> },
    running: { label: "Running",        cls: "bg-blue-50 text-blue-600 border border-blue-200",                   icon: <FiLoader size={13} className="animate-spin" /> },
    success: { label: "Done",           cls: "bg-green-50 text-green-600 border border-green-200",                icon: <FiCheckCircle size={13} /> },
    failed:  { label: "Max Iterations", cls: "bg-yellow-50 text-yellow-600 border border-yellow-200",             icon: <FiXCircle size={13} /> },
    error:   { label: "Error",          cls: "bg-red-50 text-red-600 border border-red-200",                      icon: <FiXCircle size={13} /> },
  };
  const s = map[status] ?? map.idle;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${s.cls}`}>
      {s.icon} {s.label}
      {mode && status !== "idle" && (
        <span className="opacity-60 font-normal ml-0.5">· {mode}</span>
      )}
    </span>
  );
};

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="p-1.5 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
      {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
    </button>
  );
};

const CodeBlock: React.FC<{ code: string; title?: string }> = ({ code, title }) => (
  <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
    <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
      <span className="text-xs text-white/40 font-mono">{title ?? "code"}</span>
      <CopyButton text={code} />
    </div>
    <pre className="p-4 text-sm text-[#e6edf3] font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
      {code || "No code yet"}
    </pre>
  </div>
);

const DifficultyBar: React.FC<{ score: number; label: string }> = ({ score, label }) => {
  const color     = score <= 2 ? "bg-green-500" : score <= 3 ? "bg-yellow-400" : "bg-red-500";
  const textColor = score <= 2 ? "text-green-600" : score <= 3 ? "text-yellow-600" : "text-red-600";
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 font-medium">Difficulty:</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-sm ${i <= score ? color : "bg-gray-200"}`} />
        ))}
      </div>
      <span className={`text-xs font-semibold ${textColor}`}>{label}</span>
    </div>
  );
};

const AnalysisView: React.FC<{ data: AnalysisResult }> = ({ data }) => {
  const [activeImpl, setActiveImpl] = useState(0);

  return (
    <div className="p-5 space-y-6 overflow-y-auto" style={{ maxHeight: 560 }}>
      {data.summary && (
        <div className="p-4 rounded-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-1">Overview</p>
          <p className="text-sm text-gray-800 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.implementations.length > 0 && (
        <div>
          <div className="flex gap-2 mb-4 flex-wrap">
            {data.implementations.map((impl, i) => (
              <button
                key={i}
                onClick={() => setActiveImpl(i)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                  activeImpl === i
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400"
                }`}
              >
                {impl.language}
              </button>
            ))}
          </div>

          {(() => {
            const impl = data.implementations[activeImpl];
            if (!impl) return null;
            return (
              <motion.div
                key={activeImpl}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <CodeBlock code={impl.code} title={impl.language.toLowerCase()} />

                <div className="flex items-center gap-4 flex-wrap">
                  <DifficultyBar score={impl.difficulty_score} label={impl.difficulty} />
                  {impl.frameworks && impl.frameworks.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-600 font-medium">Frameworks:</span>
                      {impl.frameworks.map((fw, j) => (
                        <span key={j} className="px-2 py-0.5 rounded-md text-xs bg-purple-50 text-purple-700 border border-purple-200">
                          {fw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {impl.explanation && (
                  <p className="text-sm text-gray-800 leading-relaxed">{impl.explanation}</p>
                )}
              </motion.div>
            );
          })()}
        </div>
      )}

      {data.key_differences && data.key_differences.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-3">Key differences</p>
          <div className="space-y-2">
            {data.key_differences.map((diff, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-800">
                <span className="text-gray-400 mt-0.5 flex-shrink-0">–</span>
                <span>{diff}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.comparison && (
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-3">Comparison</p>
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-800 leading-relaxed">
            {data.comparison}
          </div>
        </div>
      )}

      {data.recommendation && (
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-3">Recommendation</p>
          <div className="p-4 rounded-lg border border-gray-200 text-sm text-gray-800 leading-relaxed">
            {data.recommendation}
          </div>
        </div>
      )}
    </div>
  );
};

const IterationCard: React.FC<{ data: IterationData; defaultOpen?: boolean }> = ({ data, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const isSuccess = data.status === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border ${isSuccess ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"} overflow-hidden`}
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-4 py-3 text-left">
        <span className={`font-bold text-sm ${isSuccess ? "text-green-700" : "text-red-700"}`}>
          {isSuccess ? "+" : "-"}
        </span>
        <span className="font-semibold text-sm text-gray-900">Iteration {data.iteration}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${isSuccess ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
          {isSuccess ? "Passed" : "Failed"}
        </span>
        {data.error && <span className="text-xs text-red-600 ml-1">{data.error.type}</span>}
        <span className="ml-auto flex items-center gap-1.5 text-sm text-gray-500">
          <FiClock size={11} /> {data.execution?.elapsed?.toFixed(2)}s
        </span>
        {open ? <FiChevronUp size={14} className="text-gray-500" /> : <FiChevronDown size={14} className="text-gray-500" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200"
          >
            <div className="p-4 space-y-4 bg-white">
              <CodeBlock code={data.code} title="Generated Code" />
              {data.execution?.stdout && (
                <div>
                  <p className="text-sm text-gray-700 font-semibold mb-1.5">Output</p>
                  <pre className="p-3 rounded-lg bg-[#0d1117] border border-gray-800 text-sm text-green-400 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {data.execution.stdout}
                  </pre>
                </div>
              )}
              {data.execution?.stderr && (
                <div>
                  <p className="text-sm text-gray-700 font-semibold mb-1.5">Error</p>
                  <pre className="p-3 rounded-lg bg-[#1a0a0a] border border-red-900 text-sm text-red-400 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {data.execution.stderr}
                  </pre>
                </div>
              )}
              {data.reflection && (
                <div>
                  <p className="text-sm text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                    <FiRefreshCw size={12} /> What the LLM noticed
                  </p>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm text-gray-800 leading-relaxed">
                    {data.reflection}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MetricCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode; color: string }> = ({ label, value, icon, color }) => (
  <div className={`flex flex-col gap-1 p-4 rounded-lg border ${color} bg-white`}>
    <div className="flex items-center gap-2 text-gray-500 text-sm">{icon} {label}</div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
  </div>
);

type FixPhase = "input" | "analyzing" | "done";


const MarkdownResult: React.FC<{ content: string; streaming?: boolean }> = ({ content, streaming }) => {
  const parts = content.split(/(```[\s\S]*?```)/g);
  return (
    <div className="text-sm text-gray-800 leading-relaxed space-y-3">
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const lines = part.slice(3).split("\n");
          const lang = lines[0].trim();
          const code = lines.slice(1).join("\n").replace(/```$/, "").trimEnd();
          return (
            <div key={i} className="rounded-xl overflow-hidden border border-gray-200">
              {lang && (
                <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
                  <span className="text-xs font-mono text-gray-500">{lang}</span>
                  <CopyButton text={code} />
                </div>
              )}
              <pre className="p-4 bg-[#0d1117] text-[#e6edf3] text-sm font-mono overflow-x-auto whitespace-pre leading-relaxed">
                {code}
              </pre>
            </div>
          );
        }
        return (
          <div key={i} className="whitespace-pre-wrap">
            {part}
            {streaming && i === parts.length - 1 && (
              <span className="inline-block w-0.5 h-4 ml-0.5 bg-gray-500 animate-pulse rounded-sm align-middle" />
            )}
          </div>
        );
      })}
    </div>
  );
};

const FixCodeTab: React.FC = () => {
  const [code, setCode] = useState("");
  const [phase, setPhase] = useState<FixPhase>("input");
  const [result, setResult] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [followInput, setFollowInput] = useState("");
  const [followMessages, setFollowMessages] = useState<ChatMsg[]>([]);
  const followTextareaRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const followBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === "analyzing") resultRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [phase]);

  useEffect(() => {
    followBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [followMessages]);

  const analyze = async () => {
    if (!code.trim() || isStreaming) return;
    setPhase("analyzing");
    setResult("");
    setIsStreaming(true);
    setFollowMessages([]);

    try {
      const res = await fetch(`${API_BASE}/api/fix-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim(),
          language: "auto",
        }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value).split("\n")) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === "chunk") {
              accumulated += data.content;
              setResult(accumulated);
            } else if (data.type === "done") {
              setResult(accumulated);
              setPhase("done");
            }
          } catch {}
        }
      }
    } catch {
      setResult("Could not reach the server. Is the backend running?");
      setPhase("done");
    } finally {
      setIsStreaming(false);
    }
  };

  const sendFollowUp = async () => {
    if (!followInput.trim() || isStreaming) return;
    const msg = followInput.trim();
    setFollowInput("");
    if (followTextareaRef.current) followTextareaRef.current.style.height = "auto";

    const history: ChatMsg[] = [
      { role: "user", content: `Here is my code:\n\`\`\`\n${code}\n\`\`\`` },
      { role: "assistant", content: result },
      ...followMessages,
    ];
    setFollowMessages((prev) => [
      ...prev,
      { role: "user", content: msg },
      { role: "assistant", content: "", streaming: true },
    ]);
    setIsStreaming(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, mode: "fix", history }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let content = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value).split("\n")) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === "chunk") {
              content += data.content;
              setFollowMessages((prev) => {
                const u = [...prev];
                u[u.length - 1] = { role: "assistant", content, streaming: true };
                return u;
              });
            } else if (data.type === "done") {
              setFollowMessages((prev) => {
                const u = [...prev];
                u[u.length - 1] = { role: "assistant", content };
                return u;
              });
            }
          } catch {}
        }
      }
    } catch {
      setFollowMessages((prev) => {
        const u = [...prev];
        u[u.length - 1] = { role: "assistant", content: "Something went wrong." };
        return u;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const reset = () => {
    setCode("");
    setResult("");
    setPhase("input");
    setFollowMessages([]);
    setFollowInput("");
  };

  const autoResizeFollow = () => {
    const ta = followTextareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-10">
      <div className="space-y-4">
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          {phase !== "input" && (
            <div className="flex items-center justify-end px-4 py-2 border-b border-gray-100 bg-gray-50">
              <button onClick={reset} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors">
                <FiRefreshCw size={12} /> New
              </button>
            </div>
          )}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here…"
            rows={12}
            disabled={phase !== "input"}
            className="w-full bg-white text-gray-900 font-mono text-sm px-5 py-4 resize-none focus:outline-none placeholder-gray-300 disabled:opacity-60 leading-relaxed"
          />
        </div>

        {phase === "input" && (
          <button
            onClick={analyze}
            disabled={!code.trim()}
            className="w-full py-2.5 rounded-xl font-semibold text-sm bg-[#0ed6e8] hover:opacity-90 text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-opacity"
          >
            Analyze Code
          </button>
        )}

        {(phase === "analyzing" || phase === "done") && (
          <div ref={resultRef} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              {isStreaming
                ? <><FiLoader size={14} className="animate-spin text-[#0ed6e8]" /><span className="text-sm font-semibold text-gray-700">Analyzing…</span></>
                : <><FiCheckCircle size={14} className="text-[#0ed6e8]" /><span className="text-sm font-semibold text-gray-700">Analysis complete</span></>
              }
            </div>
            <MarkdownResult content={result} streaming={isStreaming} />
          </div>
        )}

        {phase === "done" && followMessages.length === 0 && (
          <p className="text-xs text-gray-400 text-center">Have a follow-up question? Ask below.</p>
        )}

        {phase === "done" && followMessages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === "user" ? "bg-[#0ed6e8] text-white rounded-br-sm" : "bg-gray-100 text-gray-900 rounded-bl-sm"
            }`}>
              {msg.role === "assistant"
                ? <MarkdownResult content={msg.content} streaming={msg.streaming} />
                : msg.content}
              {msg.streaming && msg.content === "" && (
                <span className="flex gap-1 items-center h-4">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              )}
            </div>
          </motion.div>
        ))}
        <div ref={followBottomRef} />

        {phase === "done" && (
          <div className="flex items-end gap-3 border border-gray-200 rounded-2xl px-4 py-3 bg-white focus-within:border-[#0ed6e8] transition-colors shadow-sm">
            <textarea
              ref={followTextareaRef}
              value={followInput}
              onChange={(e) => { setFollowInput(e.target.value); autoResizeFollow(); }}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendFollowUp(); } }}
              placeholder="Ask a follow-up question…"
              rows={1}
              disabled={isStreaming}
              className="flex-1 resize-none bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none leading-relaxed disabled:opacity-50"
              style={{ maxHeight: "160px", overflowY: "auto" }}
            />
            <button
              onClick={sendFollowUp}
              disabled={!followInput.trim() || isStreaming}
              className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#0ed6e8] hover:opacity-90 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              {isStreaming ? <FiLoader size={14} className="text-white animate-spin" /> : <FiPlay size={14} className="text-white" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const LearnCodeTab: React.FC = () => {
  const [code, setCode] = useState("");
  const [phase, setPhase] = useState<FixPhase>("input");
  const [result, setResult] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [followInput, setFollowInput] = useState("");
  const [followMessages, setFollowMessages] = useState<ChatMsg[]>([]);
  const followTextareaRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const followBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === "analyzing") resultRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [phase]);

  useEffect(() => {
    followBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [followMessages]);

  const explain = async () => {
    if (!code.trim() || isStreaming) return;
    setPhase("analyzing");
    setResult("");
    setIsStreaming(true);
    setFollowMessages([]);

    try {
      const res = await fetch(`${API_BASE}/api/explain-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim(),
          language: "auto",
        }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value).split("\n")) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === "chunk") {
              accumulated += data.content;
              setResult(accumulated);
            } else if (data.type === "done") {
              setResult(accumulated);
              setPhase("done");
            }
          } catch {}
        }
      }
    } catch {
      setResult("Could not reach the server. Is the backend running?");
      setPhase("done");
    } finally {
      setIsStreaming(false);
    }
  };

  const sendFollowUp = async () => {
    if (!followInput.trim() || isStreaming) return;
    const msg = followInput.trim();
    setFollowInput("");
    if (followTextareaRef.current) followTextareaRef.current.style.height = "auto";

    const history: ChatMsg[] = [
      { role: "user", content: `Here is my code:\n\`\`\`\n${code}\n\`\`\`` },
      { role: "assistant", content: result },
      ...followMessages,
    ];
    setFollowMessages((prev) => [
      ...prev,
      { role: "user", content: msg },
      { role: "assistant", content: "", streaming: true },
    ]);
    setIsStreaming(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, mode: "learn", history }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let content = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value).split("\n")) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === "chunk") {
              content += data.content;
              setFollowMessages((prev) => {
                const u = [...prev];
                u[u.length - 1] = { role: "assistant", content, streaming: true };
                return u;
              });
            } else if (data.type === "done") {
              setFollowMessages((prev) => {
                const u = [...prev];
                u[u.length - 1] = { role: "assistant", content };
                return u;
              });
            }
          } catch {}
        }
      }
    } catch {
      setFollowMessages((prev) => {
        const u = [...prev];
        u[u.length - 1] = { role: "assistant", content: "Something went wrong." };
        return u;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const reset = () => {
    setCode("");
    setResult("");
    setPhase("input");
    setFollowMessages([]);
    setFollowInput("");
  };

  const autoResizeFollow = () => {
    const ta = followTextareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-10">
      <div className="space-y-4">
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          {phase !== "input" && (
            <div className="flex items-center justify-end px-4 py-2 border-b border-gray-100 bg-gray-50">
              <button onClick={reset} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors">
                <FiRefreshCw size={12} /> New
              </button>
            </div>
          )}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here and I'll explain every part of it…"
            rows={12}
            disabled={phase !== "input"}
            className="w-full bg-white text-gray-900 font-mono text-sm px-5 py-4 resize-none focus:outline-none placeholder-gray-300 disabled:opacity-60 leading-relaxed"
          />
        </div>

        {phase === "input" && (
          <button
            onClick={explain}
            disabled={!code.trim()}
            className="w-full py-2.5 rounded-xl font-semibold text-sm bg-[#0ed6e8] hover:opacity-90 text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-opacity"
          >
            Explain Code
          </button>
        )}

        {(phase === "analyzing" || phase === "done") && (
          <div ref={resultRef} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              {isStreaming
                ? <><FiLoader size={14} className="animate-spin text-[#0ed6e8]" /><span className="text-sm font-semibold text-gray-700">Explaining…</span></>
                : <><FiCheckCircle size={14} className="text-[#0ed6e8]" /><span className="text-sm font-semibold text-gray-700">Explanation ready</span></>
              }
            </div>
            <MarkdownResult content={result} streaming={isStreaming} />
          </div>
        )}

        {phase === "done" && followMessages.length === 0 && (
          <p className="text-xs text-gray-400 text-center">Still confused about something? Ask below.</p>
        )}

        {phase === "done" && followMessages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === "user" ? "bg-[#0ed6e8] text-white rounded-br-sm" : "bg-gray-100 text-gray-900 rounded-bl-sm"
            }`}>
              {msg.role === "assistant"
                ? <MarkdownResult content={msg.content} streaming={msg.streaming} />
                : msg.content}
              {msg.streaming && msg.content === "" && (
                <span className="flex gap-1 items-center h-4">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              )}
            </div>
          </motion.div>
        ))}
        <div ref={followBottomRef} />

        {phase === "done" && (
          <div className="flex items-end gap-3 border border-gray-200 rounded-2xl px-4 py-3 bg-white focus-within:border-[#0ed6e8] transition-colors shadow-sm">
            <textarea
              ref={followTextareaRef}
              value={followInput}
              onChange={(e) => { setFollowInput(e.target.value); autoResizeFollow(); }}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendFollowUp(); } }}
              placeholder="Ask a follow-up question…"
              rows={1}
              disabled={isStreaming}
              className="flex-1 resize-none bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none leading-relaxed disabled:opacity-50"
              style={{ maxHeight: "160px", overflowY: "auto" }}
            />
            <button
              onClick={sendFollowUp}
              disabled={!followInput.trim() || isStreaming}
              className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#0ed6e8] hover:opacity-90 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              {isStreaming ? <FiLoader size={14} className="text-white animate-spin" /> : <FiPlay size={14} className="text-white" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

type TabId = "log" | "iterations" | "code" | "analysis";

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}


const AgentLab: React.FC = () => {
  const [task, setTask] = useState("");
  const [testCases] = useState("");
  const [maxIter] = useState(6);
  const [timeout] = useState(15);
  const [activeTab, setActiveTab] = useState<TabId>("log");
  const [status, setStatus] = useState("idle");
  const [agentMode, setAgentMode] = useState<"execute" | "analyze" | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [currentCode, setCurrentCode] = useState("");
  const [iterations, setIterations] = useState<IterationData[]>([]);
  const [finalResult, setFinalResult] = useState<AgentEvent | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [pageTab, setPageTab] = useState<"write" | "fix" | "learn">("write");

  const logRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  const addLog = useCallback((msg: string, prefix: string, type: string) => {
    const ts = new Date().toLocaleTimeString("en-US", { hour12: false });
    setLog((prev) => [...prev, { ts, prefix, msg, type }]);
  }, []);

  const reset = () => {
    abortRef.current?.abort();
    setStatus("idle");
    setAgentMode(null);
    setLog([]);
    setCurrentCode("");
    setIterations([]);
    setFinalResult(null);
    setAnalysisResult(null);
    setActiveTab("log");
  };

  const runAgent = async () => {
    if (!task.trim()) return;
    reset();

    abortRef.current = new AbortController();
    setStatus("running");
    addLog("Agent initialised - connecting to backend", "[ start    ]", "start");

    try {
      const response = await fetch(`${API_BASE}/api/run-agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          task,
          test_cases: testCases,
          max_iterations: maxIter,
          timeout,
        }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;
          let evt: AgentEvent;
          try { evt = JSON.parse(raw); } catch { continue; }
          handleEvent(evt);
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      const msg = err instanceof Error ? err.message : "Unknown error";
      addLog(`Connection error: ${msg}`, "[ error    ]", "error");
      setStatus("error");
    }
  };

  const handleEvent = (evt: AgentEvent) => {
    const prefixMap: Record<string, string> = {
      start:          "[ start    ]",
      classifying:    "[ classify ]",
      classified:     "[ mode     ]",
      generating:     "[ generate ]",
      analyzing:      "[ analyze  ]",
      code_ready:     "[ ready    ]",
      executing:      "[ execute  ]",
      success:        "[ success  ]",
      error:          "[ error    ]",
      reflecting:     "[ reflect  ]",
      refined:        "[ refine   ]",
      analysis_ready: "[ analysis ]",
      complete:       "[ complete ]",
      failed:         "[ failed   ]",
      done:           "[ done     ]",
    };
    addLog(evt.message, prefixMap[evt.type] ?? "[ info     ]", evt.type);

    switch (evt.type) {
      case "classified":
        setAgentMode((evt.mode as "execute" | "analyze") ?? null);
        break;
      case "code_ready":
        if (evt.code) setCurrentCode(evt.code);
        setActiveTab("code");
        break;
      case "refined":
        if (evt.new_code) setCurrentCode(evt.new_code);
        setActiveTab("code");
        break;
      case "success":
        if (evt.code) setCurrentCode(evt.code);
        if (evt.iteration_data) setIterations((p) => [...p, evt.iteration_data!]);
        setActiveTab("iterations");
        break;
      case "error":
        if (evt.iteration_data) setIterations((p) => [...p, evt.iteration_data!]);
        setActiveTab("iterations");
        break;
      case "analysis_ready":
        if (evt.analysis) setAnalysisResult(evt.analysis);
        setActiveTab("analysis");
        break;
      case "complete":
        if (evt.final_code) setCurrentCode(evt.final_code);
        if (evt.analysis) setAnalysisResult(evt.analysis);
        setFinalResult(evt);
        setStatus(evt.success ? "success" : "failed");
        if (evt.mode === "analyze") setActiveTab("analysis");
        else setActiveTab("iterations");
        break;
      case "failed":
        setStatus("error");
        break;
    }
  };

  const hasResult = finalResult !== null;
  const isRunning = status === "running";
  const isAnalyzeMode = agentMode === "analyze";
  const isExecuteMode = agentMode === "execute";

  const availableTabs: { id: TabId; label: string }[] = [
    { id: "log", label: "Live Log" },
    ...(isAnalyzeMode
      ? [{ id: "analysis" as TabId, label: "Analysis" }]
      : [
          { id: "iterations" as TabId, label: `Iterations${iterations.length ? ` (${iterations.length})` : ""}` },
          { id: "code" as TabId, label: "Final Code" },
        ]),
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {pageTab === "write" && (
        <div className="bg-white sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 flex gap-1 pt-28 pb-0">
            {(["write", "fix", "learn"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setPageTab(tab)}
                className={`px-5 py-3.5 text-sm font-semibold transition-all rounded-lg ${
                  pageTab === tab
                    ? "bg-[#0ed6e8]/10 text-[#0ed6e8]"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab === "write" ? "Write a Program" : tab === "fix" ? "Fix the Code" : "Learn the Code"}
              </button>
            ))}
          </div>
        </div>
      )}

      {(pageTab === "fix" || pageTab === "learn") && (
        <div className="max-w-3xl mx-auto px-6 pt-28 pb-2 flex items-center gap-3">
          <button
            onClick={() => setPageTab("write")}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 transition-colors"
          >
            <FiChevronDown size={14} className="rotate-90" />
            Back
          </button>
          <span className="text-gray-200">|</span>
          <div className="flex gap-1">
            {(["fix", "learn"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setPageTab(tab)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                  pageTab === tab
                    ? "bg-[#0ed6e8]/10 text-[#0ed6e8]"
                    : "text-gray-400 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                {tab === "fix" ? "Fix the Code" : "Learn the Code"}
              </button>
            ))}
          </div>
        </div>
      )}

      {pageTab === "write" && (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="rounded-xl border border-gray-300 bg-white p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  What do you want to Code?
                </label>
                <textarea
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder=""
                  rows={7}
                  disabled={isRunning}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:opacity-50 leading-relaxed"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={runAgent}
                  disabled={isRunning || !task.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm bg-[#0ed6e8] hover:opacity-90 active:opacity-80 text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-opacity"
                >
                  {isRunning
                    ? <><FiLoader size={15} className="animate-spin" /> Running…</>
                    : <><FiPlay size={15} /> Run Agent</>}
                </button>
                <button
                  onClick={reset}
                  className="px-3.5 py-2.5 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
                  title="Reset"
                >
                  <FiRefreshCw size={15} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {hasResult && isExecuteMode && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 gap-3"
                >
                  <MetricCard
                    label="Result"
                    value={finalResult?.success ? "Passed" : "Partial"}
                    icon={<FiCheckCircle size={11} />}
                    color={finalResult?.success ? "border-green-300" : "border-yellow-300"}
                  />
                  <MetricCard
                    label="Iterations"
                    value={finalResult?.iterations_count ?? 0}
                    icon={<FiZap size={11} />}
                    color="border-blue-200"
                  />
                  <MetricCard
                    label="Total Time"
                    value={`${finalResult?.total_time ?? 0}s`}
                    icon={<FiClock size={11} />}
                    color="border-purple-200"
                  />
                  <MetricCard
                    label="Errors Fixed"
                    value={iterations.filter((i) => i.status === "failed").length}
                    icon={<FiXCircle size={11} />}
                    color="border-red-200"
                  />
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl border border-gray-300 bg-white overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                {status !== "idle" && <StatusBadge status={status} mode={agentMode} />}
                {isRunning && (
                  <span className="text-sm text-gray-500 animate-pulse hidden sm:block">
                    {log.length > 0 ? log[log.length - 1].msg.substring(0, 55) : ""}
                  </span>
                )}
              </div>
              <div className="flex gap-1">
                {availableTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-hidden" style={{ minHeight: 520 }}>
              <AnimatePresence mode="wait">

                {activeTab === "log" && (
                  <motion.div
                    key="log"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    ref={logRef}
                    className="h-full overflow-y-auto p-5 space-y-1.5 font-mono text-sm"
                    style={{ maxHeight: 560 }}
                  >
                    {log.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                        <p className="text-sm text-gray-500">Run the agent to see live output</p>
                      </div>
                    ) : (
                      log.map((entry, i) => (
                        <div key={i} className={`flex gap-2 items-start ${
                          entry.type === "error"    ? "text-red-600"    :
                          entry.type === "success"  ? "text-green-700"  :
                          entry.type === "analysis_ready" ? "text-green-700" :
                          entry.type === "reflecting" || entry.type === "refined" ? "text-blue-700" :
                          entry.type === "analyzing" ? "text-purple-700" :
                          "text-gray-800"
                        }`}>
                          <span className="text-gray-400 flex-shrink-0 text-xs mt-0.5">[{entry.ts}]</span>
                          <span className="flex-shrink-0 text-gray-400">{entry.prefix}</span>
                          <span className="break-all leading-relaxed font-medium">{entry.msg}</span>
                        </div>
                      ))
                    )}
                    {isRunning && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                        <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                        <span className="animate-pulse">Processing…</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "analysis" && (
                  <motion.div key="analysis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {analysisResult ? (
                      <AnalysisView data={analysisResult} />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-3 p-10">
                        <FiGlobe size={32} />
                        <p className="text-sm">Analysis will appear here</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "iterations" && (
                  <motion.div
                    key="iterations"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full overflow-y-auto p-5 space-y-3"
                    style={{ maxHeight: 560 }}
                  >
                    {iterations.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-3">
                        <FiCode size={32} />
                        <p className="text-sm">Iterations will appear here as the agent runs</p>
                      </div>
                    ) : (
                      <>
                        {iterations.map((it) => (
                          <IterationCard key={it.iteration} data={it} defaultOpen={it.status === "success"} />
                        ))}
                        {hasResult && (
                          <div className={`mt-2 p-4 rounded-xl border text-sm font-medium text-center ${
                            finalResult?.success
                              ? "border-green-300 bg-green-50 text-green-700"
                              : "border-yellow-300 bg-yellow-50 text-yellow-700"
                          }`}>
                            {finalResult?.success
                              ? `Task solved in ${finalResult.iterations_count} iteration(s) — ${finalResult.total_time}s total`
                              : `Reached max ${finalResult?.iterations_count} iterations — see Final Code tab`}
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                )}

                {activeTab === "code" && (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full overflow-y-auto p-5"
                    style={{ maxHeight: 560 }}
                  >
                    {currentCode ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900">
                            {hasResult ? "Final Solution" : "Current Code"}
                          </span>
                          {hasResult && finalResult?.success && (
                            <span className="text-xs text-green-600 font-medium">All tests passed</span>
                          )}
                        </div>
                        <CodeBlock code={currentCode} title="solution.py" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-3">
                        <FiCode size={32} />
                        <p className="text-sm">Generated code will appear here</p>
                      </div>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
      )}

      {pageTab === "fix" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FixCodeTab />
        </motion.div>
      )}

      {pageTab === "learn" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <LearnCodeTab />
        </motion.div>
      )}
    </div>
  );
};

export default AgentLab;
