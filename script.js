// ====== Basic page wiring ======
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const codeInput = document.getElementById("codeInput");
const revealBtn = document.getElementById("revealBtn");
const errorEl = document.getElementById("error");

const resultSection = document.getElementById("result");
const charName = document.getElementById("charName");
const charCode = document.getElementById("charCode");
const charRole = document.getElementById("charRole");
const charVibe = document.getElementById("charVibe");
const charGoal = document.getElementById("charGoal");
const charPrompt = document.getElementById("charPrompt");
const copyBtn = document.getElementById("copyBtn");

// ====== Unguessable-ish codes (share each person only their own) ======
// NOTE: This is still a static site. Someone *could* view-source and find this map.
// For a party portal, this is usually fine; for real security, use a server check.
const CHARACTERS = {
  "AKASH-7Q9M3K": {
    name: "Akash — [Character Name Placeholder]",
    role: "[Role placeholder]",
    vibe: "[Vibe placeholder]",
    goal: "[Goal placeholder]",
    promptHtml: `
      <p><strong>[Placeholder prompt]</strong> Paste Akash’s character prompt here.</p>
      <ul>
        <li>[Secret #1]</li>
        <li>[Relationship / motive]</li>
        <li>[What to do during the party]</li>
      </ul>
    `
  },
  "SHIVANGI-V4P8J2": {
    name: "Shivangi — [Character Name Placeholder]",
    role: "[Role placeholder]",
    vibe: "[Vibe placeholder]",
    goal: "[Goal placeholder]",
    promptHtml: `
      <p><strong>[Placeholder prompt]</strong> Paste Shivangi’s character prompt here.</p>
      <ul>
        <li>[Secret #1]</li>
        <li>[Relationship / motive]</li>
        <li>[What to do during the party]</li>
      </ul>
    `
  },
  "ABHIGNA-N6X1R7": {
    name: "Abhigna — [Character Name Placeholder]",
    role: "[Role placeholder]",
    vibe: "[Vibe placeholder]",
    goal: "[Goal placeholder]",
    promptHtml: `
      <p><strong>[Placeholder prompt]</strong> Paste Abhigna’s character prompt here.</p>
      <ul>
        <li>[Secret #1]</li>
        <li>[Relationship / motive]</li>
        <li>[What to do during the party]</li>
      </ul>
    `
  },
  "CAISSA-K3T9W5": {
    name: "Caissa — [Character Name Placeholder]",
    role: "[Role placeholder]",
    vibe: "[Vibe placeholder]",
    goal: "[Goal placeholder]",
    promptHtml: `
      <p><strong>[Placeholder prompt]</strong> Paste Caissa’s character prompt here.</p>
      <ul>
        <li>[Secret #1]</li>
        <li>[Relationship / motive]</li>
        <li>[What to do during the party]</li>
      </ul>
    `
  },
  "PRIYANSHI-2H8QZ6": {
    name: "Priyanshi — [Character Name Placeholder]",
    role: "[Role placeholder]",
    vibe: "[Vibe placeholder]",
    goal: "[Goal placeholder]",
    promptHtml: `
      <p><strong>[Placeholder prompt]</strong> Paste Priyanshi’s character prompt here.</p>
      <ul>
        <li>[Secret #1]</li>
        <li>[Relationship / motive]</li>
        <li>[What to do during the party]</li>
      </ul>
    `
  },
  "VIGGY-M7C4P1": {
    name: "Viggy — [Character Name Placeholder]",
    role: "[Role placeholder]",
    vibe: "[Vibe placeholder]",
    goal: "[Goal placeholder]",
    promptHtml: `
      <p><strong>[Placeholder prompt]</strong> Paste Viggy’s character prompt here.</p>
      <ul>
        <li>[Secret #1]</li>
        <li>[Relationship / motive]</li>
        <li>[What to do during the party]</li>
      </ul>
    `
  },
  "VARUN-X5N9D2": {
    name: "Varun — [Host / Character Placeholder]",
    role: "[Role placeholder]",
    vibe: "[Vibe placeholder]",
    goal: "[Goal placeholder]",
    promptHtml: `
      <p><strong>[Placeholder prompt]</strong> Paste Varun’s character prompt here.</p>
      <ul>
        <li>[Secret #1]</li>
        <li>[Relationship / motive]</li>
        <li>[What to do during the party]</li>
      </ul>
    `
  },
  "MISHA-R8K2V9": {
    name: "Misha — [Character Name Placeholder]",
    role: "[Role placeholder]",
    vibe: "[Vibe placeholder]",
    goal: "[Goal placeholder]",
    promptHtml: `
      <p><strong>[Placeholder prompt]</strong> Paste Misha’s character prompt here.</p>
      <ul>
        <li>[Secret #1]</li>
        <li>[Relationship / motive]</li>
        <li>[What to do during the party]</li>
      </ul>
    `
  },
  "AKANSHA-3J7QF4": {
    name: "Akansha — [Character Name Placeholder]",
    role: "[Role placeholder]",
    vibe: "[Vibe placeholder]",
    goal: "[Goal placeholder]",
    promptHtml: `
      <p><strong>[Placeholder prompt]</strong> Paste Akansha’s character prompt here.</p>
      <ul>
        <li>[Secret #1]</li>
        <li>[Relationship / motive]</li>
        <li>[What to do during the party]</li>
      </ul>
    `
  },
  "ANISHA-P6W1T8": {
    name: "Anisha — [Character Name Placeholder]",
    role: "[Role placeholder]",
    vibe: "[Vibe placeholder]",
    goal: "[Goal placeholder]",
    promptHtml: `
      <p><strong>[Placeholder prompt]</strong> Paste Anisha’s character prompt here.</p>
      <ul>
        <li>[Secret #1]</li>
        <li>[Relationship / motive]</li>
        <li>[What to do during the party]</li>
      </ul>
    `
  }
};

function normalizeCode(s) {
  return (s || "").trim().toUpperCase();
}

function reveal() {
  if (!errorEl || !resultSection) return;

  errorEl.textContent = "";
  const code = normalizeCode(codeInput?.value);

  if (!code) {
    errorEl.textContent = "Enter your code first.";
    resultSection.hidden = true;
    return;
  }

  const data = CHARACTERS[code];
  if (!data) {
    errorEl.textContent = "No match. Double-check the code I sent you.";
    resultSection.hidden = true;
    return;
  }

  charName.textContent = data.name;
  charCode.textContent = code;
  charRole.textContent = data.role;
  charVibe.textContent = data.vibe;
  charGoal.textContent = data.goal;
  charPrompt.innerHTML = data.promptHtml;

  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

revealBtn?.addEventListener("click", reveal);
codeInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") reveal();
});

copyBtn?.addEventListener("click", async () => {
  try {
    const text =
      `${charName.textContent}\n\n` +
      `Code: ${charCode.textContent}\n` +
      `Role: ${charRole.textContent}\n` +
      `Vibe: ${charVibe.textContent}\n` +
      `Goal: ${charGoal.textContent}\n\n` +
      `${charPrompt.innerText}`;

    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy prompt"), 1200);
  } catch {
    copyBtn.textContent = "Copy failed";
    setTimeout(() => (copyBtn.textContent = "Copy prompt"), 1200);
  }
});