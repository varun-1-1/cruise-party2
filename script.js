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

// ====== Codes (share each person only their own) ======
// NOTE: This is still a static site. Someone *could* view-source and find this map.
// For a party portal, this is usually fine; for real security, use a server check.
const CHARACTERS = {
  "AKASH-7Q9M3K": {
    name: "Akash",
    role: "Theo Whitaker — The Writer",
    motive: "You want more money, but you don’t kill anyone over it.",
    traits: "Quiet<br>Clumsy, Parents died when you were young, so you're close with your older sister ",
    doThis: "[e.g., bring up the final battle scene; ask people about rewrites; steer convos toward contracts]",
    feels: "[e.g., you suspect X is lying; you admire Y; you think Z is incompetent]",
    outfit: "[optional: writer’s scarf, notebook, pen, fake script pages]",
    promptHtml: `
      <p><strong>Prompt:</strong> In this mystery, you wrote the script for the film. Your favorite scene in the movie was the final battle.</p>
  
    `
  },

  "SHIVANGI-V4P8J2": {
    name: "Shivangi",
    role: "[Role placeholder]",
    motive: "[Motive placeholder]",
    traits: "[Personality traits placeholder]",
    doThis: "[While playing, do this placeholder]",
    feels: "[How you feel about everyone placeholder]",
    outfit: "[Outfit/props optional placeholder]",
    promptHtml: `
      <p><strong>Prompt:</strong> [Paste Shivangi’s full character prompt here.]</p>
    `
  },

  "ABHIGNA-N6X1R7": {
    name: "Abhigna",
    role: "[Role placeholder]",
    motive: "[Motive placeholder]",
    traits: "[Personality traits placeholder]",
    doThis: "[While playing, do this placeholder]",
    feels: "[How you feel about everyone placeholder]",
    outfit: "[Outfit/props optional placeholder]",
    promptHtml: `
      <p><strong>Prompt:</strong> [Paste Abhigna’s full character prompt here.]</p>
    `
  },

  "CAISSA-K3T9W5": {
    name: "Caissa",
    role: "[Role placeholder]",
    motive: "[Motive placeholder]",
    traits: "[Personality traits placeholder]",
    doThis: "[While playing, do this placeholder]",
    feels: "[How you feel about everyone placeholder]",
    outfit: "[Outfit/props optional placeholder]",
    promptHtml: `
      <p><strong>Prompt:</strong> [Paste Caissa’s full character prompt here.]</p>
    `
  },

  "PRIYANSHI-2H8QZ6": {
    name: "Priyanshi",
    role: "[Role placeholder]",
    motive: "[Motive placeholder]",
    traits: "[Personality traits placeholder]",
    doThis: "[While playing, do this placeholder]",
    feels: "[How you feel about everyone placeholder]",
    outfit: "[Outfit/props optional placeholder]",
    promptHtml: `
      <p><strong>Prompt:</strong> [Paste Priyanshi’s full character prompt here.]</p>
    `
  },

  "VIGGY-M7C4P1": {
    name: "Viggy",
    role: "[Role placeholder]",
    motive: "[Motive placeholder]",
    traits: "[Personality traits placeholder]",
    doThis: "[While playing, do this placeholder]",
    feels: "[How you feel about everyone placeholder]",
    outfit: "[Outfit/props optional placeholder]",
    promptHtml: `
      <p><strong>Prompt:</strong> [Paste Viggy’s full character prompt here.]</p>
    `
  },

  "VARUN-X5N9D2": {
    name: "Varun",
    role: "[Role placeholder]",
    motive: "[Motive placeholder]",
    traits: "[Personality traits placeholder]",
    doThis: "[While playing, do this placeholder]",
    feels: "[How you feel about everyone placeholder]",
    outfit: "[Outfit/props optional placeholder]",
    promptHtml: `
      <p><strong>Prompt:</strong> [Paste Varun’s full character prompt here.]</p>
    `
  },

  "MISHA-R8K2V9": {
    name: "Misha",
    role: "[Role placeholder]",
    motive: "[Motive placeholder]",
    traits: "[Personality traits placeholder]",
    doThis: "[While playing, do this placeholder]",
    feels: "[How you feel about everyone placeholder]",
    outfit: "[Outfit/props optional placeholder]",
    promptHtml: `
      <p><strong>Prompt:</strong> [Paste Misha’s full character prompt here.]</p>
    `
  },

  "AKANSHA-3J7QF4": {
    name: "Akansha",
    role: "[Role placeholder]",
    motive: "[Motive placeholder]",
    traits: "[Personality traits placeholder]",
    doThis: "[While playing, do this placeholder]",
    feels: "[How you feel about everyone placeholder]",
    outfit: "[Outfit/props optional placeholder]",
    promptHtml: `
      <p><strong>Prompt:</strong> [Paste Akansha’s full character prompt here.]</p>
    `
  },

  "ANISHA-P6W1T8": {
    name: "Anisha",
    role: "[Role placeholder]",
    motive: "[Motive placeholder]",
    traits: "[Personality traits placeholder]",
    doThis: "[While playing, do this placeholder]",
    feels: "[How you feel about everyone placeholder]",
    outfit: "[Outfit/props optional placeholder]",
    promptHtml: `
      <p><strong>Prompt:</strong> [Paste Anisha’s full character prompt here.]</p>
    `
  }
};

function normalizeCode(s) {
  return (s || "").trim().toUpperCase();
}

function safeText(el, value) {
  if (!el) return;
  el.textContent = value ?? "";
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

  // Prompt should appear under name (ordering handled by index.html)
  if (charPrompt) charPrompt.innerHTML = data.promptHtml || "";

  safeText(charRole, data.role);
  safeText(charMotive, data.motive);
  safeText(charTraits, data.traits);
  safeText(charDoThis, data.doThis);
  safeText(charFeels, data.feels);
  safeText(charOutfit, data.outfit);

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
      `Code: ${charCode?.textContent || ""}\n` +
      `Role: ${charRole?.textContent || ""}\n` +
      `Motive: ${charMotive?.textContent || ""}\n` +
      `Personality Traits: ${charTraits?.textContent || ""}\n` +
      `While playing, do this: ${charDoThis?.textContent || ""}\n` +
      `How you feel about everyone: ${charFeels?.textContent || ""}\n` +
      `Outfit/props (optional): ${charOutfit?.textContent || ""}\n\n` +
      `${charPrompt?.innerText || ""}`;

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
