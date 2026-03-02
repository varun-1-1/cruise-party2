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
const charMotive = document.getElementById("charMotive");
const charTraits = document.getElementById("charTraits");
const charDoThis = document.getElementById("charDoThis");
const charFeels = document.getElementById("charFeels");
const charOutfit = document.getElementById("charOutfit");

const charPrompt = document.getElementById("charPrompt");
const copyBtn = document.getElementById("copyBtn");

// ====== Character data ======
const CHARACTERS = {
  "AKASH-7Q9M3K": {
    name: "Theo Whitaker",
    role: "The Writer",
    promptHtml: `
      <p><strong>In this mystery, you wrote the script for the film.</strong> Your favorite scene in the movie was the final battle.</p>
    `,
    motive: "You want more money, but you don't kill anyone over it.",
    traits: [
      "Quiet",
      "Clumsy",
      "Parents died when you were young, so you're close with your older sister",
      "Hate being in front of the camera",
      "Drive a hybrid car",
      "Cat owner (you like taking funny pictures of your cat)",
      "The only job you ever had was writing",
      "Chess is your game",
      "Don't drink alcohol"
    ],
    doThis: [
      "Don't drink tap water",
      "Be helpful by handing people drinks and snacks",
      "Correct grammar"
    ],
    feels: [
      `Director (Valentina): “She butchered my script and calls it vision.”`,
      `Minor Character (Lola): “Lola’s character had depth until editing.”`,
      `Boom Operator (Jade): “Jade definitely overheard something she shouldn’t have.”`,
      `Co-Star (Sabrina): “Sabrina only memorized her lines after I rewrote them.”`,
      `Reporter (Miles): “Miles is circling this production like a vulture.”`,
      `Main Character (Luca): “Luca can’t pronounce half my dialogue.”`,
      `Camera Operator (Nina): “Nina appreciated the symbolism.”`,
      `Costume Designer (Celeste): “Celeste at least respected my themes.”`,
      `Antagonist (Raven): “Raven understood the darkness in my writing… too well.”`
    ],
    outfit: [
      "Glasses",
      "Sweater / cardigan vibes",
      "Notebook with scribbles"
    ]
  },

  // Placeholders (fill later)
  "SHIVANGI-V4P8J2": placeholder("Shivangi", "Shivangi’s Character"),
  "ABHIGNA-N6X1R7": placeholder("Abhigna", "Abhigna’s Character"),
  "CAISSA-K3T9W5": placeholder("Caissa", "Caissa’s Character"),
  "PRIYANSHI-2H8QZ6": placeholder("Priyanshi", "Priyanshi’s Character"),
  "VIGGY-M7C4P1": placeholder("Viggy", "Viggy’s Character"),
  "VARUN-X5N9D2": placeholder("Varun", "Varun’s Character"),
  "MISHA-R8K2V9": placeholder("Misha", "Misha’s Character"),
  "AKANSHA-3J7QF4": placeholder("Akansha", "Akansha’s Character"),
  "ANISHA-P6W1T8": placeholder("Anisha", "Anisha’s Character")
};

function placeholder(personName, characterName) {
  return {
    name: characterName,
    role: "[Role]",
    promptHtml: `<p><strong>Prompt:</strong> Paste ${personName}'s prompt here.</p>`,
    motive: "[Motive]",
    traits: ["[Trait 1]", "[Trait 2]"],
    doThis: ["[Do this 1]", "[Do this 2]"],
    feels: ["[Feelings about others]"],
    outfit: ["[Optional outfit/props]"]
  };
}

function normalizeCode(s) {
  return (s || "").trim().toUpperCase();
}

function safeText(el, value) {
  if (!el) return;
  el.textContent = value ?? "";
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function listToUl(value) {
  if (!value) return "";
  const arr = Array.isArray(value) ? value : String(value).split("\n").filter(Boolean);
  if (arr.length === 0) return "";
  return `<ul>${arr.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`;
}

function setField(el, value) {
  if (!el) return;
  // If it's an array, render bullets; otherwise render plain text
  if (Array.isArray(value)) {
    el.innerHTML = listToUl(value);
  } else {
    el.textContent = value ?? "";
  }
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

  safeText(charName, data.name);
  safeText(charCode, code);

  if (charPrompt) charPrompt.innerHTML = data.promptHtml || "";

  safeText(charRole, data.role || "");
  safeText(charMotive, data.motive || "");

  // Bulleted sections
  setField(charTraits, data.traits);
  setField(charDoThis, data.doThis);
  setField(charFeels, data.feels);
  setField(charOutfit, data.outfit);

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
      `${charName?.textContent || ""}\n\n` +
      `Code: ${charCode?.textContent || ""}\n\n` +
      `PROMPT:\n${charPrompt?.innerText || ""}\n\n` +
      `Role: ${charRole?.textContent || ""}\n` +
      `Motive: ${charMotive?.textContent || ""}\n\n` +
      `Personality Traits:\n${(Array.isArray(CHARACTERS[normalizeCode(codeInput?.value)]?.traits) ? CHARACTERS[normalizeCode(codeInput?.value)].traits.join("\n") : charTraits?.innerText) || ""}\n\n` +
      `While playing, do this:\n${(Array.isArray(CHARACTERS[normalizeCode(codeInput?.value)]?.doThis) ? CHARACTERS[normalizeCode(codeInput?.value)].doThis.join("\n") : charDoThis?.innerText) || ""}\n\n` +
      `How you feel about everyone:\n${(Array.isArray(CHARACTERS[normalizeCode(codeInput?.value)]?.feels) ? CHARACTERS[normalizeCode(codeInput?.value)].feels.join("\n") : charFeels?.innerText) || ""}\n\n` +
      `Outfit/props (optional):\n${(Array.isArray(CHARACTERS[normalizeCode(codeInput?.value)]?.outfit) ? CHARACTERS[normalizeCode(codeInput?.value)].outfit.join("\n") : charOutfit?.innerText) || ""}`;

    await navigator.clipboard.writeText(text);
    if (copyBtn) copyBtn.textContent = "Copied!";
    setTimeout(() => {
      if (copyBtn) copyBtn.textContent = "Copy prompt";
    }, 1200);
  } catch {
    if (copyBtn) copyBtn.textContent = "Copy failed";
    setTimeout(() => {
      if (copyBtn) copyBtn.textContent = "Copy prompt";
    }, 1200);
  }
});
