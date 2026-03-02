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
    traits: "[e.g., witty, detail-obsessed, a little dramatic]",
    doThis: "[e.g., bring up the final battle scene; ask people about rewrites; steer convos toward contracts]",
    feels: "[e.g., you suspect X is lying; you admire Y; you think Z is incompetent]",
    outfit: "[optional: writer’s scarf, notebook, pen, fake script pages]",
    promptHtml: `
      <p><strong>Prompt:</strong> In this mystery, you wrote the script for the film. Your favorite scene in the movie was the final battle.</p>
      <p>[Paste the rest of Akash’s prompt here.]</p>
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

  "VIGGY-M
