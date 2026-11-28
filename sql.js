// Färgkodar SQL som i SSMS (ljust tema): nyckelord blå, operatorer grå, text röd, kommentarer gröna, funktioner rosa
// Används på sidor med <pre><code class="sql nohighlight">…</code></pre>
(() => {
  const ord = "SELECT|FROM|WHERE|ORDER|BY|ASC|DESC|TOP|DISTINCT|AS|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|ALTER|DROP|ADD|DATABASE|TABLE|COLUMN|USE|GO|PRIMARY|FOREIGN|KEY|REFERENCES|CONSTRAINT|UNIQUE|CHECK|DEFAULT|FOR|IDENTITY|ON|GROUP|HAVING|BEGIN|TRANSACTION|TRAN|COMMIT|ROLLBACK|INT|BIGINT|NVARCHAR|VARCHAR|DATE|DATETIME|DATETIME2|NUMERIC|DECIMAL|BIT|LIMIT";
  const op = "AND|OR|NOT|IN|BETWEEN|LIKE|IS|NULL|JOIN|INNER|LEFT|RIGHT|OUTER|CROSS|EXISTS";
  const fn = "YEAR|GETDATE|CAST|ROUND|COUNT|SUM|MAX|MIN|AVG";
  const mönster = new RegExp(`(--.*)|(N?'(?:[^']|'')*')|\\b(\\d+(?:\\.\\d+)?)\\b|\\b(${fn})(?=\\()|\\b(${ord})\\b|\\b(${op})\\b|([=<>*+/(),;%]|-(?!-))`, "g");
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  document.querySelectorAll("code.sql").forEach(b => {
    const text = b.textContent;
    let html = "", sist = 0;
    for (const m of text.matchAll(mönster)) {
      const [t, kom, str, tal, f, k] = m;
      html += esc(text.slice(sist, m.index));
      sist = m.index + t.length;
      const klass = kom ? "sq-c" : str ? "sq-s" : tal ? "sq-n" : f ? "sq-f" : k ? "sq-k" : "sq-o";
      html += `<span class="${klass}">${esc(t)}</span>`;
    }
    b.innerHTML = html + esc(text.slice(sist));
  });
})();
