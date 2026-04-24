import { useState, useRef, useCallback } from "react";

const GROUPS = [
  {
    label: "Greek — Lower", 
    color: "#7eb8f7",
    items: [
      { key: "alpha", latex: "\\alpha" }, { key: "beta", latex: "\\beta" },
      { key: "gamma", latex: "\\gamma" }, { key: "delta", latex: "\\delta" },
      { key: "epsilon", latex: "\\epsilon" }, { key: "zeta", latex: "\\zeta" },
      { key: "eta", latex: "\\eta" }, { key: "theta", latex: "\\theta" },
      { key: "iota", latex: "\\iota" }, { key: "kappa", latex: "\\kappa" },
      { key: "lambda", latex: "\\lambda" }, { key: "mu", latex: "\\mu" },
      { key: "nu", latex: "\\nu" }, { key: "xi", latex: "\\xi" },
      { key: "pi", latex: "\\pi" }, { key: "rho", latex: "\\rho" },
      { key: "sigma", latex: "\\sigma" }, { key: "tau", latex: "\\tau" },
      { key: "upsilon", latex: "\\upsilon" }, { key: "phi", latex: "\\phi" },
      { key: "chi", latex: "\\chi" }, { key: "psi", latex: "\\psi" },
      { key: "omega", latex: "\\omega" }, { key: "varepsilon", latex: "\\varepsilon" },
      { key: "varphi", latex: "\\varphi" }, { key: "vartheta", latex: "\\vartheta" },
    ],
  },
  {
    label: "Greek — Upper",
    color: "#a8d8a8",
    items: [
      { key: "Gamma", latex: "\\Gamma" }, { key: "Delta", latex: "\\Delta" },
      { key: "Theta", latex: "\\Theta" }, { key: "Lambda", latex: "\\Lambda" },
      { key: "Xi", latex: "\\Xi" }, { key: "Pi", latex: "\\Pi" },
      { key: "Sigma", latex: "\\Sigma" }, { key: "Upsilon", latex: "\\Upsilon" },
      { key: "Phi", latex: "\\Phi" }, { key: "Psi", latex: "\\Psi" },
      { key: "Omega", latex: "\\Omega" },
    ],
  },
  {
    label: "Operators",
    color: "#f7c97e",
    items: [
      { key: "sum", latex: "\\sum" }, { key: "prod", latex: "\\prod" },
      { key: "int", latex: "\\int" }, { key: "oint", latex: "\\oint" },
      { key: "iint", latex: "\\iint" }, { key: "partial", latex: "\\partial" },
      { key: "nabla", latex: "\\nabla" }, { key: "sqrt", latex: "\\sqrt{}" },
      { key: "frac", latex: "\\frac{}{}" }, { key: "times", latex: "\\times" },
      { key: "cdot", latex: "\\cdot" }, { key: "div", latex: "\\div" },
      { key: "pm", latex: "\\pm" }, { key: "mp", latex: "\\mp" },
      { key: "oplus", latex: "\\oplus" }, { key: "otimes", latex: "\\otimes" },
      { key: "circ", latex: "\\circ" }, { key: "bullet", latex: "\\bullet" },
      { key: "star", latex: "\\star" }, { key: "dagger", latex: "\\dagger" },
    ],
  },
  {
    label: "Relations",
    color: "#f7a07e",
    items: [
      { key: "leq", latex: "\\leq" }, { key: "geq", latex: "\\geq" },
      { key: "neq", latex: "\\neq" }, { key: "approx", latex: "\\approx" },
      { key: "equiv", latex: "\\equiv" }, { key: "sim", latex: "\\sim" },
      { key: "simeq", latex: "\\simeq" }, { key: "cong", latex: "\\cong" },
      { key: "propto", latex: "\\propto" }, { key: "ll", latex: "\\ll" },
      { key: "gg", latex: "\\gg" }, { key: "perp", latex: "\\perp" },
      { key: "parallel", latex: "\\parallel" }, { key: "angle", latex: "\\angle" },
    ],
  },
  {
    label: "Arrows",
    color: "#e8a0d4",
    items: [
      { key: "to", latex: "\\to" }, { key: "gets", latex: "\\gets" },
      { key: "rightarrow", latex: "\\rightarrow" }, { key: "leftarrow", latex: "\\leftarrow" },
      { key: "Rightarrow", latex: "\\Rightarrow" }, { key: "Leftarrow", latex: "\\Leftarrow" },
      { key: "Leftrightarrow", latex: "\\Leftrightarrow" }, { key: "leftrightarrow", latex: "\\leftrightarrow" },
      { key: "mapsto", latex: "\\mapsto" }, { key: "uparrow", latex: "\\uparrow" },
      { key: "downarrow", latex: "\\downarrow" }, { key: "nearrow", latex: "\\nearrow" },
      { key: "searrow", latex: "\\searrow" }, { key: "longrightarrow", latex: "\\longrightarrow" },
    ],
  },
  {
    label: "Sets & Logic",
    color: "#80d4c8",
    items: [
      { key: "in", latex: "\\in" }, { key: "notin", latex: "\\notin" },
      { key: "subset", latex: "\\subset" }, { key: "supset", latex: "\\supset" },
      { key: "subseteq", latex: "\\subseteq" }, { key: "supseteq", latex: "\\supseteq" },
      { key: "cup", latex: "\\cup" }, { key: "cap", latex: "\\cap" },
      { key: "setminus", latex: "\\setminus" }, { key: "emptyset", latex: "\\emptyset" },
      { key: "forall", latex: "\\forall" }, { key: "exists", latex: "\\exists" },
      { key: "nexists", latex: "\\nexists" }, { key: "neg", latex: "\\neg" },
      { key: "land", latex: "\\land" }, { key: "lor", latex: "\\lor" },
      { key: "implies", latex: "\\Rightarrow" }, { key: "iff", latex: "\\Leftrightarrow" },
    ],
  },
  {
    label: "Functions",
    color: "#b8a0f0",
    items: [
      { key: "sin", latex: "\\sin" }, { key: "cos", latex: "\\cos" },
      { key: "tan", latex: "\\tan" }, { key: "arcsin", latex: "\\arcsin" },
      { key: "arccos", latex: "\\arccos" }, { key: "arctan", latex: "\\arctan" },
      { key: "sinh", latex: "\\sinh" }, { key: "cosh", latex: "\\cosh" },
      { key: "tanh", latex: "\\tanh" }, { key: "log", latex: "\\log" },
      { key: "ln", latex: "\\ln" }, { key: "exp", latex: "\\exp" },
      { key: "lim", latex: "\\lim" }, { key: "max", latex: "\\max" },
      { key: "min", latex: "\\min" }, { key: "sup", latex: "\\sup" },
      { key: "inf", latex: "\\inf" }, { key: "det", latex: "\\det" },
      { key: "dim", latex: "\\dim" }, { key: "ker", latex: "\\ker" },
      { key: "gcd", latex: "\\gcd" },
    ],
  },
  {
    label: "Accents",
    color: "#f0d080",
    items: [
      { key: "hat{x}", latex: "\\hat{x}" }, { key: "bar{x}", latex: "\\bar{x}" },
      { key: "tilde{x}", latex: "\\tilde{x}" }, { key: "vec{x}", latex: "\\vec{x}" },
      { key: "dot{x}", latex: "\\dot{x}" }, { key: "ddot{x}", latex: "\\ddot{x}" },
      { key: "overline{x}", latex: "\\overline{x}" }, { key: "underline{x}", latex: "\\underline{x}" },
      { key: "widehat{x}", latex: "\\widehat{x}" }, { key: "widetilde{x}", latex: "\\widetilde{x}" },
    ],
  },
  {
    label: "Fonts / Styles",
    color: "#d4b896",
    items: [
      { key: "mathbb{R}", latex: "\\mathbb{R}" }, { key: "mathbb{Z}", latex: "\\mathbb{Z}" },
      { key: "mathbb{N}", latex: "\\mathbb{N}" }, { key: "mathbb{C}", latex: "\\mathbb{C}" },
      { key: "mathbb{Q}", latex: "\\mathbb{Q}" }, { key: "mathbf{x}", latex: "\\mathbf{x}" },
      { key: "mathcal{L}", latex: "\\mathcal{L}" }, { key: "mathcal{F}", latex: "\\mathcal{F}" },
      { key: "mathrm{d}", latex: "\\mathrm{d}" }, { key: "mathit{x}", latex: "\\mathit{x}" },
      { key: "text{...}", latex: "\\text{}" },
    ],
  },
  {
    label: "Misc",
    color: "#a8c0a8",
    items: [
      { key: "infty", latex: "\\infty" }, { key: "hbar", latex: "\\hbar" },
      { key: "ell", latex: "\\ell" }, { key: "Re", latex: "\\Re" },
      { key: "Im", latex: "\\Im" }, { key: "aleph", latex: "\\aleph" },
      { key: "prime", latex: "'" }, { key: "ldots", latex: "\\ldots" },
      { key: "cdots", latex: "\\cdots" }, { key: "vdots", latex: "\\vdots" },
      { key: "ddots", latex: "\\ddots" }, { key: "quad", latex: "\\quad " },
      { key: "qquad", latex: "\\qquad " }, { key: ",", latex: "\\," },
      { key: "$...$", latex: "$$" }, { key: "\\[...\\]", latex: "\\[\\]" },
    ],
  },
];

// Commands for multi-line blocks
const COMMAND_GROUPS = [
  {
    label: "Document Structure",
    color: "#f7c97e",
    items: [
      {
        key: "document (article)",
        desc: "Full article skeleton",
        latex: `\\documentclass{article}\n\\usepackage{amsmath, amssymb, amsthm}\n\n\\title{Title}\n\\author{Author}\n\\date{\\today}\n\n\\begin{document}\n\\maketitle\n\n% Your content here\n\n\\end{document}`,
      },
      {
        key: "\\begin{document}",
        desc: "Document environment",
        latex: `\\begin{document}\n\n\\end{document}`,
      },
      {
        key: "\\maketitle",
        desc: "Render title block",
        latex: `\\title{Title}\n\\author{Author}\n\\date{\\today}\n\\maketitle`,
      },
      {
        key: "\\section{}",
        desc: "Section heading",
        latex: `\\section{Section Title}`,
      },
      {
        key: "\\subsection{}",
        desc: "Subsection heading",
        latex: `\\subsection{Subsection Title}`,
      },
      {
        key: "\\subsubsection{}",
        desc: "Subsubsection",
        latex: `\\subsubsection{Title}`,
      },
      {
        key: "\\paragraph{}",
        desc: "Named paragraph",
        latex: `\\paragraph{Name}`,
      },
      {
        key: "\\tableofcontents",
        desc: "Auto table of contents",
        latex: `\\tableofcontents`,
      },
      {
        key: "\\appendix",
        desc: "Start appendix",
        latex: `\\appendix\n\\section{Appendix Title}`,
      },
      {
        key: "\\bibliography{}",
        desc: "Bibliography",
        latex: `\\bibliographystyle{plain}\n\\bibliography{refs}`,
      },
    ],
  },
  {
    label: "Packages (\\usepackage)",
    color: "#d4b896",
    items: [
      { key: "amsmath", desc: "AMS math extensions", latex: `\\usepackage{amsmath}` },
      { key: "amssymb", desc: "AMS symbols", latex: `\\usepackage{amssymb}` },
      { key: "amsthm", desc: "Theorem environments", latex: `\\usepackage{amsthm}` },
      { key: "geometry", desc: "Page layout", latex: `\\usepackage[margin=1in]{geometry}` },
      { key: "graphicx", desc: "Images", latex: `\\usepackage{graphicx}` },
      { key: "hyperref", desc: "Clickable links", latex: `\\usepackage[colorlinks=true]{hyperref}` },
      { key: "enumitem", desc: "List customization", latex: `\\usepackage{enumitem}` },
      { key: "booktabs", desc: "Nice tables", latex: `\\usepackage{booktabs}` },
      { key: "tikz", desc: "Diagrams", latex: `\\usepackage{tikz}` },
      { key: "listings", desc: "Code listings", latex: `\\usepackage{listings}` },
      { key: "xcolor", desc: "Colors", latex: `\\usepackage{xcolor}` },
      { key: "biblatex", desc: "Modern bibliography", latex: `\\usepackage[backend=biber]{biblatex}` },
    ],
  },
  {
    label: "Theorem-like Environments",
    color: "#b8a0f0",
    items: [
      {
        key: "\\begin{proof}",
        desc: "Proof block",
        latex: `\\begin{proof}\n\n\\end{proof}`,
      },
      {
        key: "theorem",
        desc: "Theorem block",
        latex: `\\begin{theorem}\n\n\\end{theorem}`,
      },
      {
        key: "lemma",
        desc: "Lemma block",
        latex: `\\begin{lemma}\n\n\\end{lemma}`,
      },
      {
        key: "corollary",
        desc: "Corollary block",
        latex: `\\begin{corollary}\n\n\\end{corollary}`,
      },
      {
        key: "proposition",
        desc: "Proposition block",
        latex: `\\begin{proposition}\n\n\\end{proposition}`,
      },
      {
        key: "definition",
        desc: "Definition block",
        latex: `\\begin{definition}\n\n\\end{definition}`,
      },
      {
        key: "remark",
        desc: "Remark block",
        latex: `\\begin{remark}\n\n\\end{remark}`,
      },
      {
        key: "example",
        desc: "Example block",
        latex: `\\begin{example}\n\n\\end{example}`,
      },
      {
        key: "newtheorem setup",
        desc: "Define theorem types",
        latex: `\\newtheorem{theorem}{Theorem}[section]\n\\newtheorem{lemma}[theorem]{Lemma}\n\\newtheorem{corollary}[theorem]{Corollary}\n\\newtheorem{definition}[theorem]{Definition}\n\\newtheorem{remark}[theorem]{Remark}`,
      },
    ],
  },
  {
    label: "Math Environments",
    color: "#80d4c8",
    items: [
      {
        key: "equation",
        desc: "Numbered equation",
        latex: `\\begin{equation}\n\n\\end{equation}`,
      },
      {
        key: "equation*",
        desc: "Unnumbered equation",
        latex: `\\begin{equation*}\n\n\\end{equation*}`,
      },
      {
        key: "align",
        desc: "Aligned equations",
        latex: `\\begin{align}\n  f(x) &= x^2 \\\\\n       &= x \\cdot x\n\\end{align}`,
      },
      {
        key: "align*",
        desc: "Aligned, no numbers",
        latex: `\\begin{align*}\n  f(x) &= x^2 \\\\\n       &= x \\cdot x\n\\end{align*}`,
      },
      {
        key: "gather",
        desc: "Centered multi-line",
        latex: `\\begin{gather}\n\n\\end{gather}`,
      },
      {
        key: "cases",
        desc: "Piecewise / cases",
        latex: `f(x) = \\begin{cases}\n  x & \\text{if } x \\geq 0 \\\\\n  -x & \\text{if } x < 0\n\\end{cases}`,
      },
      {
        key: "matrix",
        desc: "Plain matrix",
        latex: `\\begin{matrix}\n  a & b \\\\\n  c & d\n\\end{matrix}`,
      },
      {
        key: "pmatrix",
        desc: "Matrix with ( )",
        latex: `\\begin{pmatrix}\n  a & b \\\\\n  c & d\n\\end{pmatrix}`,
      },
      {
        key: "bmatrix",
        desc: "Matrix with [ ]",
        latex: `\\begin{bmatrix}\n  a & b \\\\\n  c & d\n\\end{bmatrix}`,
      },
      {
        key: "vmatrix",
        desc: "Determinant | |",
        latex: `\\begin{vmatrix}\n  a & b \\\\\n  c & d\n\\end{vmatrix}`,
      },
      {
        key: "array",
        desc: "General array",
        latex: `\\begin{array}{cc}\n  a & b \\\\\n  c & d\n\\end{array}`,
      },
    ],
  },
  {
    label: "Lists & Floats",
    color: "#e8a0d4",
    items: [
      {
        key: "itemize",
        desc: "Bullet list",
        latex: `\\begin{itemize}\n  \\item First\n  \\item Second\n  \\item Third\n\\end{itemize}`,
      },
      {
        key: "enumerate",
        desc: "Numbered list",
        latex: `\\begin{enumerate}\n  \\item First\n  \\item Second\n  \\item Third\n\\end{enumerate}`,
      },
      {
        key: "description",
        desc: "Definition list",
        latex: `\\begin{description}\n  \\item[Term] Definition here.\n\\end{description}`,
      },
      {
        key: "figure",
        desc: "Figure float",
        latex: `\\begin{figure}[h]\n  \\centering\n  \\includegraphics[width=0.8\\linewidth]{filename}\n  \\caption{Caption text.}\n  \\label{fig:label}\n\\end{figure}`,
      },
      {
        key: "table",
        desc: "Table float",
        latex: `\\begin{table}[h]\n  \\centering\n  \\begin{tabular}{|c|c|c|}\n    \\hline\n    A & B & C \\\\ \\hline\n    1 & 2 & 3 \\\\ \\hline\n  \\end{tabular}\n  \\caption{Caption.}\n  \\label{tab:label}\n\\end{table}`,
      },
      {
        key: "tabular",
        desc: "Tabular (inline)",
        latex: `\\begin{tabular}{lcr}\n  Left & Center & Right \\\\\n  a    & b      & c\n\\end{tabular}`,
      },
    ],
  },
  {
    label: "Text Formatting",
    color: "#7eb8f7",
    items: [
      { key: "\\textbf{}", desc: "Bold", latex: `\\textbf{}` },
      { key: "\\textit{}", desc: "Italic", latex: `\\textit{}` },
      { key: "\\underline{}", desc: "Underline", latex: `\\underline{}` },
      { key: "\\emph{}", desc: "Emphasis", latex: `\\emph{}` },
      { key: "\\texttt{}", desc: "Typewriter / code", latex: `\\texttt{}` },
      { key: "\\textsc{}", desc: "Small caps", latex: `\\textsc{}` },
      { key: "\\footnote{}", desc: "Footnote", latex: `\\footnote{}` },
      { key: "\\label{}", desc: "Label for ref", latex: `\\label{}` },
      { key: "\\ref{}", desc: "Reference label", latex: `\\ref{}` },
      { key: "\\cite{}", desc: "Citation", latex: `\\cite{}` },
      { key: "\\url{}", desc: "Hyperlink URL", latex: `\\url{}` },
      { key: "\\href{}", desc: "Hyperlink text", latex: `\\href{url}{text}` },
      { key: "\\noindent", desc: "No paragraph indent", latex: `\\noindent ` },
      { key: "\\newline", desc: "Line break", latex: `\\newline` },
      { key: "\\newpage", desc: "Page break", latex: `\\newpage` },
      { key: "\\hspace{}", desc: "Horizontal space", latex: `\\hspace{1cm}` },
      { key: "\\vspace{}", desc: "Vertical space", latex: `\\vspace{1cm}` },
      { key: "\\centering", desc: "Center content", latex: `\\centering` },
    ],
  },
];

// Style for the palette tabs
const TAB_STYLE = (active, color) => ({
  background: "none",
  border: "none",
  borderBottom: active ? `2px solid ${color}` : "2px solid transparent",
  color: active ? color : "#555",
  fontFamily: "'Computer Modern', serif",
  fontSize: 11,
  letterSpacing: 2,
  textTransform: "uppercase",
  padding: "10px 14px 8px",
  cursor: "pointer",
  marginBottom: -1,
  transition: "color 0.15s, border-color 0.15s",
});

export default function App() {
  const [output, setOutput] = useState("");
  const [search, setSearch] = useState("");
  const [flash, setFlash] = useState(null);
  const [paletteTab, setPaletteTab] = useState("symbols"); // "symbols" or "commands"
  const outputRef = useRef();

  // Insert LaTeX code at the current cursor position in the output textarea
  const insertAtCursor = useCallback((latex) => {
    const textArea = outputRef.current;
    // If textarea isn't focused, append to the end. Otherwise, insert at cursor position.
    if (!textArea) { setOutput(prev => prev + latex); return; }
    // Read the cursor position. If the text is highlighted, start and end will be different.
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    // Slice the input at the cursor position and inserting the new text between
    const next = output.slice(0, start) + latex + output.slice(end);
    setOutput(next);
    const cursor = start + latex.length;
    setTimeout(() => { textArea.focus(); textArea.setSelectionRange(cursor, cursor); }, 0);
  }, [output]);

  // Handle clicking a symbol/command button: insert its LaTeX and flash the button
  const handleButtonClick = useCallback((item) => {
    insertAtCursor(item.latex);
    setFlash(item.key);
    setTimeout(() => setFlash(null), 500);
  }, [insertAtCursor]);

  // Filter symbol and command groups based on the search query
  const lowerSearch = search.toLowerCase();

  const filteredSymbolGroups = lowerSearch
    ? GROUPS.map(g => ({ ...g, items: g.items.filter(i => i.key.toLowerCase().includes(lowerSearch) || i.latex.toLowerCase().includes(lowerSearch)) })).filter(g => g.items.length > 0)
    : GROUPS;

  const filteredCommandGroups = lowerSearch
    ? COMMAND_GROUPS.map(g => ({ ...g, items: g.items.filter(i => i.key.toLowerCase().includes(lowerSearch) || i.latex.toLowerCase().includes(lowerSearch) || (i.desc && i.desc.toLowerCase().includes(lowerSearch))) })).filter(g => g.items.length > 0)
    : COMMAND_GROUPS;

  return (
    <div style={{
      height: "100vh",
      background: "#0c0d10",
      color: "#ddd8cc",
      fontFamily: "'Computer Modern', serif",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>

      {/* Header */}
      <div style={{
        padding: "18px 28px 14px",
        borderBottom: "1px solid #1e2028",
        display: "flex",
        alignItems: "baseline",
        gap: 14,
        background: "#0e0f14",
        flexShrink: 0,
      }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#f0ece4", letterSpacing: "-0.3px" }}> LaTeX Builder</h1>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Left Panel */}
        <div style={{
          width: 340, minWidth: 260,
          borderRight: "1px solid #1e2028",
          display: "flex", flexDirection: "column",
          overflow: "hidden", background: "#0e0f14",
        }}>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #1e2028", padding: "0 10px", flexShrink: 0 }}>
            <button style={TAB_STYLE(paletteTab === "symbols", "#7eb8f7")} onClick={() => setPaletteTab("symbols")}>Symbols</button>
            <button style={TAB_STYLE(paletteTab === "commands", "#f7c97e")} onClick={() => setPaletteTab("commands")}>Commands</button>
          </div>

          {/* Search */}
          <div style={{ padding: "10px 14px 8px", borderBottom: "1px solid #1a1c24", flexShrink: 0 }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={paletteTab === "symbols" ? "Search symbols…" : "Search commands…"}
              style={{
                width: "100%", background: "#161820", border: "1px solid #2a2d38",
                borderRadius: 5, color: "#ccc", fontFamily: "'Computer Modern', serif",
                fontSize: 12, padding: "6px 10px", outline: "none", boxSizing: "border-box",
              }}
            />
          </div>

          {/* Scroll */}
          <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px 20px" }}>

            {paletteTab === "symbols" && (
              <>
                {filteredSymbolGroups.map(group => (
                  <div key={group.label} style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: group.color, marginBottom: 7, fontFamily: "'Computer Modern', serif", opacity: 0.8 }}>{group.label}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {group.items.map(item => (
                        <button
                          key={item.key}
                          onClick={() => handleButtonClick(item)}
                          title={item.latex}
                          style={{
                            background: flash === item.key ? `${group.color}28` : "#161820",
                            border: `1px solid ${flash === item.key ? group.color : "#252830"}`,
                            borderRadius: 4, color: flash === item.key ? group.color : "#b8c8e0",
                            fontFamily: "'Computer Modern', serif", fontSize: 15,
                            padding: "3px 7px", cursor: "pointer", transition: "all 0.1s",
                            whiteSpace: "nowrap",
                          }}
                          onMouseEnter={e => { if (flash !== item.key) { e.currentTarget.style.background = `${group.color}18`; e.currentTarget.style.borderColor = `${group.color}70`; e.currentTarget.style.color = group.color; } }}
                          onMouseLeave={e => { if (flash !== item.key) { e.currentTarget.style.background = "#161820"; e.currentTarget.style.borderColor = "#252830"; e.currentTarget.style.color = "#b8c8e0"; } }}
                        >{item.key}</button>
                      ))}
                    </div>
                  </div>
                ))}
                {filteredSymbolGroups.length === 0 && <div style={{ color: "#444", fontStyle: "italic", fontSize: 13, padding: "16px 0" }}>No symbols match "{search}"</div>}
              </>
            )}

            {paletteTab === "commands" && (
              <>
                {filteredCommandGroups.map(group => (
                  <div key={group.label} style={{ marginBottom: 22 }}>
                    <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: group.color, marginBottom: 8, fontFamily: "'Computer Modern', serif", opacity: 0.8 }}>{group.label}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {group.items.map(item => (
                        <button
                          key={item.key}
                          onClick={() => handleButtonClick(item)}
                          title={item.latex}
                          style={{
                            background: flash === item.key ? `${group.color}20` : "#161820",
                            border: `1px solid ${flash === item.key ? group.color : "#252830"}`,
                            borderRadius: 5, cursor: "pointer", transition: "all 0.1s",
                            padding: "7px 10px", textAlign: "left",
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            gap: 8,
                          }}
                          onMouseEnter={e => { if (flash !== item.key) { e.currentTarget.style.background = `${group.color}14`; e.currentTarget.style.borderColor = `${group.color}60`; e.currentTarget.querySelector('span').style.color = group.color; } }}
                          onMouseLeave={e => { if (flash !== item.key) { e.currentTarget.style.background = "#161820"; e.currentTarget.style.borderColor = "#252830"; e.currentTarget.querySelector('span').style.color = "#b8c8e0"; } }}
                        >
                          <span style={{ fontFamily: "'Computer Modern', serif", fontSize: 15, color: flash === item.key ? group.color : "#b8c8e0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "55%" }}>{item.key}</span>
                          {item.desc && <span style={{ fontSize: 13, color: "#555", fontFamily: "'Computer Modern', serif", textAlign: "right", flexShrink: 0 }}>{item.desc}</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {filteredCommandGroups.length === 0 && <div style={{ color: "#444", fontSize: 13, padding: "16px 0" }}>No commands match "{search}"</div>}
              </>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 24px", gap: 16, overflow: "auto" }}>

          {/* LaTeX output */}
          <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#7eb8f7", fontFamily: "'Computer Modern', serif" }}>LaTeX — type freely or insert from palette</label>
            </div>

            <textarea
              ref={outputRef}
              value={output}
              onChange={e => setOutput(e.target.value)}
              spellCheck={false}
              placeholder="Your LaTeX builds here…"
              style={{
                flex: 1, minHeight: 300,
                background: "#0f1016", border: "1px solid #252d40", borderRadius: 7,
                color: "#c8d8f0", fontFamily: "'Computer Modern', serif",
                fontSize: 13.5, lineHeight: 1.9, padding: "14px 16px",
                resize: "vertical", outline: "none", transition: "border-color 0.15s",
                boxShadow: "inset 0 2px 10px rgba(0,0,0,0.4)",
              }}
              onFocus={e => e.target.style.borderColor = "#4a6a9a"}
              onBlur={e => e.target.style.borderColor = "#252d40"}
            />

            <div style={{ fontSize: 10, color: "#2a2c38", fontFamily: "'Computer Modern', serif", textAlign: "right" }}>
              {output.length > 0 && <>{output.length} chars · {(output.match(/\\/g) || []).length} commands</>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
