// Färgkodar terminalkommandon: programnamn (git, dotnet …) gula, kommentarer (#) turkosa.
// Utskrift från terminalen ligger i <samp> och lämnas ofärgad.
const program = "git|dotnet|mkdir|cd|ls";
const cliMönster = new RegExp(`(^|\\s)(#.*)$|^(\\s*)(${program})(?![\\p{L}\\d_-])`, "gmu");
const cliEsc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const cliFärg = (c, t) => `<span style="color:${c}">${cliEsc(t)}</span>`;

function färgaText(text) {
  let html = "", sist = 0;
  for (const m of text.matchAll(cliMönster)) {
    const [t, före, kommentar, indrag, prog] = m;
    html += cliEsc(text.slice(sist, m.index));
    sist = m.index + t.length;
    if (kommentar) html += cliEsc(före) + cliFärg("#4ec9b0", kommentar);
    else html += cliEsc(indrag) + cliFärg("#f1d26a", prog);
  }
  return html + cliEsc(text.slice(sist));
}

document.querySelectorAll("pre > code.nohighlight").forEach(b => {
  [...b.childNodes].forEach(n => {
    if (n.nodeType !== Node.TEXT_NODE) return;
    const span = document.createElement("span");
    span.innerHTML = färgaText(n.textContent);
    n.replaceWith(span);
  });
});
