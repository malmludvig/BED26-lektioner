// Färgkodar C#-koden med samma färger som Visual Studio (mörkt tema)
const kontroll = "if|else|return|for|foreach|while|break|continue|switch|in";
const nyckelord = "class|interface|enum|public|private|protected|static|virtual|override|abstract|void|string|int|decimal|bool|double|new|this|base|true|false|null|get|set|where|var|out|is|object|using|from|select|orderby|descending|group|by|into";
const typer = new Set(["List", "Console", "DateOnly", "DateTime", "Math", "T", "IEnumerable", "Dictionary", "Queue", "Stack", "ArrayList", "Enumerable"]);
const block = [...document.querySelectorAll("pre > code:not(.nohighlight)")];

// Alla egna klasser, interface och enums blir också typer
block.forEach(b => b.textContent.replace(/(?:class|interface|enum)\s+([\p{L}\d_]+)/gu, (_, namn) => typer.add(namn)));

const före = "(?<![\\p{L}\\d_])", efter = "(?![\\p{L}\\d_])";   // ordgränser som klarar å, ä, ö
const mönster = new RegExp(`(//.*)|(\\$?"[^"]*")|${före}(\\d+(?:\\.\\d+)?m?)${efter}|${före}(${kontroll})${efter}|${före}(${nyckelord})${efter}|${före}(\\p{Lu}[\\p{L}\\d_]*)`, "gu");
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const färg = (c, t) => `<span style="color:${c}">${esc(t)}</span>`;

block.forEach(b => {
  const text = b.textContent;
  let html = "", sist = 0;
  for (const m of text.matchAll(mönster)) {
    const [t, kommentar, sträng, tal, kontr, nyck] = m;
    html += esc(text.slice(sist, m.index));
    sist = m.index + t.length;
    if (kommentar) html += färg("#57a64a", t);
    else if (sträng) html += färg("#d69d85", t);
    else if (tal) html += färg("#b5cea8", t);
    else if (kontr) html += färg("#d8a0df", t);
    else if (nyck) html += färg("#569cd6", t);
    else if (typer.has(t)) html += färg("#4ec9b0", t);
    else if (text[sist] === "(") html += färg("#dcdcaa", t);
    else html += esc(t);
  }
  b.innerHTML = html + esc(text.slice(sist));
});

