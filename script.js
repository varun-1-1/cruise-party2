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

// ===== helpers =====
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

function listToUl(items) {
  if (!items) return "";
  const arr = Array.isArray(items)
    ? items
    : String(items).split("\n").map(s => s.trim()).filter(Boolean);
  if (arr.length === 0) return "";
  return `<ul>${arr.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`;
}

function setBullets(el, items) {
  if (!el) return;
  el.innerHTML = listToUl(items);
}

// ===== Character data =====
const CHARACTERS = {
  // Akash -> Theo Whitaker (Writer)
  "AKASH-7Q9M3K": {
    name: "Theo Whitaker",
    role: "Writer",
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
      "Cat owner (you like to take funny pictures of your cat)",
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
      "Director (Valentina): “She butchered my script and calls it vision.”",
      "Minor Character (Lola): “Lola’s character had depth until editing.”",
      "Boom Operator (Jade): “Jade definitely overheard something she shouldn’t have.”",
      "Co-Star (Sabrina): “Sabrina only memorized her lines after I rewrote them.”",
      "Reporter (Miles): “Miles is circling this production like a vulture.”",
      "Main Character (Luca): “Luca can’t pronounce half my dialogue.”",
      "Camera Operator (Nina): “Nina appreciated the symbolism.”",
      "Costume Designer (Celeste): “Celeste at least respected my themes.”",
      "Antagonist (Raven): “Raven understood the darkness in my writing… too well.”"
    ],
    outfit: [
      "Glasses",
      "Sweater / cardigan chic",
      "Notebook with scribbles"
    ]
  },

  // Shivangi -> Lola Marquez (Minor Character)
  "SHIVANGI-V4P8J2": {
    name: "Lola Marquez",
    role: "Minor Character",
    promptHtml: `
      <p><strong>In this mystery, you’re an up-and-coming performer playing a minor role</strong> — but in a big picture that you hope will get you more fans. Your favorite scene in the movie involved animals.</p>
    `,
    motive: "You're upset with the Director because you didn't get the staring role in the movie, however, you don't commit the murder.",
    traits: [
      "Big ego",
      "Drive a fancy gas-eating car (but it goes really fast!)",
      "Love street racing",
      "Hate taking other people's pictures",
      "Have fish as pets",
      "Previous work experience: model",
      "Blood makes you sick"
    ],
    doThis: [
      "Photo bomb pictures (do something silly in someone else's pictures)",
      "Wager random bets with people"
    ],
    feels: [
      "Director (Valentina): “Valentina promised me a bigger arc.”",
      "Writer (Theo): “Theo said my character was essential.”",
      "Boom Operator (Jade): “Jade told me people were talking about me.”",
      "Co-Star (Sabrina): “Sabrina ignored me unless cameras were rolling.”",
      "Reporter (Miles): “Miles seemed VERY interested in my trailer visit.”",
      "Main Character (Luca): “Luca flirted with me between takes.”",
      "Camera Operator (Nina): “Nina always made sure I was in frame.”",
      "Costume Designer (Celeste): “Celeste gave me better outfits than Sabrina.”",
      "Antagonist (Raven): “Raven scares me… but in a hot way.”"
    ],
    outfit: [
      "Overdressed",
      "Dramatic makeup",
      "Accessorize to try to out-do main character energy"
    ]
  },

  // Abhigna -> Jade Rivers (Boom Operator)
  "ABHIGNA-N6X1R7": {
    name: "Jade Rivers",
    role: "Boom Operator",
    promptHtml: `
      <p><strong>In this mystery, you operated the microphones.</strong> Your favorite scene in the movie was the romantic moment.</p>
    `,
    motive: "You're in debt to the Director. You're glad the Director dies, but you didn't commit the crime.",
    traits: [
      "Drive a tiny, cheap car",
      "Live in your parent's basement",
      "Have an older bother who acts",
      "Own a pet lizard",
      "Card player",
      "Held down various odd jobs",
      "Loves to play Dungeons and Dragons"
    ],
    doThis: [
      "Try to say, whenever possible, “I think we’re being watched.”",
      "Ask people about their favorite podcasts"
    ],
    feels: [
      "Director (Valentina): “Valentina yelled at me when the mic wasn’t even on.”",
      "Writer (Theo): “Theo cried in the hallway.”",
      "Minor Character (Lola): “Lola practices interviews alone.”",
      "Co-Star (Sabrina): “Sabrina talks badly about Luca when he leaves.”",
      "Reporter (Miles): “Miles tried to bribe me for audio files.”",
      "Main Character (Luca): “Luca rehearsed a fight speech off-camera.”",
      "Camera Operator (Nina): “Nina and I saw something weird that night.”",
      "Costume Designer (Celeste): “Celeste threatened to quit mid-shoot.”",
      "Antagonist (Raven): “Raven stayed late after everyone left.”"
    ],
    outfit: [
      "Cargo pants",
      "Baseball cap",
      "Headphones around neck"
    ]
  },

  // Caissa -> Sabrina Hale (Co-Star)
  "CAISSA-K3T9W5": {
    name: "Sabrina Hale",
    role: "Co-Star",
    promptHtml: `
      <p><strong>In this mystery, you are one of the main stars in the film, but not the lead.</strong> You can't make up your mind on your favorite scene in the movie.</p>
    `,
    motive: "You're upset with the Director because you didn't get the lead role in the movie, so you murder the director with poison! When the Director has both hands in their pockets, bring them a drink or food.",
    traits: [
      "Enjoy being in front of the camera",
      "Banned from a bar because you're a clumsy person",
      "Know how to use a handgun",
      "An only child",
      "Hate taking other people's pictures",
      "Love singing",
      "Drive an expensive car",
      "Have never owned a pet",
      "Exclusively acted your entire life",
      "Never been to jail",
      "Too flirtatious to be in a relationship",
      "Enjoy playing card games"
    ],
    doThis: [
      "Refuse to drink tap water"
    ],
    feels: [
      "Director (Valentina): “Valentina favors Luca too much.”",
      "Writer (Theo): “Theo rewrote scenes without telling me.”",
      "Minor Character (Lola): “Lola needs to learn her place.”",
      "Boom Operator (Jade): “Jade listens more than she speaks.”",
      "Reporter (Miles): “Miles keeps asking about ‘rivalry rumors.’”",
      "Main Character (Luca): “Luca and I carried this film.”",
      "Camera Operator (Nina): “Nina caught my bad side once.”",
      "Costume Designer (Celeste): “Celeste made Luca look better than me.”",
      "Antagonist (Raven): “Raven stayed in character even at wrap party.”"
    ],
    outfit: [
      "Stylish / fitted outfit",
      "Sunglasses",
      "Drink in hand (shade toward main character)"
    ]
  },

  // Viggy -> Miles Davenport (Reporter)
  "VIGGY-M7C4P1": {
    name: "Miles Davenport",
    role: "Reporter",
    promptHtml: `
      <p><strong>In this mystery, you play a beloved movie reporter.</strong> You have a notepad and ask people questions about the movie and their life.</p>
    `,
    motive: "You’re upset with the Director because they won’t agree to a one-on-one interview, but you don't kill over it.",
    traits: [
      "Stay behind the camera",
      "A little bit clumsy",
      "Drive an eco friendly car",
      "An only child",
      "Award Winner",
      "Travel too much to own any pets",
      "Learned how to use a gun during an interview with a famous actor"
    ],
    doThis: [
      "Take people's picture with a camera or your cellphone",
      "Interview people"
    ],
    feels: [
      "Director (Valentina): “Valentina is hiding something.”",
      "Writer (Theo): “Theo drinks when stressed.”",
      "Minor Character (Lola): “Lola wants fame badly.”",
      "Boom Operator (Jade): “Jade has the real story.”",
      "Co-Star (Sabrina): “Sabrina’s smile isn’t genuine.”",
      "Main Character (Luca): “Luca’s ego is fragile.”",
      "Camera Operator (Nina): “Nina avoids my questions.”",
      "Costume Designer (Celeste): “Celeste threatened legal action.”",
      "Antagonist (Raven): “Raven warned me to ‘be careful what I print.’”"
    ],
    outfit: [
      "Press badge (print one)",
      "Blazer",
      "Notebook"
    ]
  },

  // Varun -> Luca DeLuca (Main Character)
  "VARUN-X5N9D2": {
    name: "Luca DeLuca",
    role: "Main Character",
    promptHtml: `
      <p><strong>In this mystery, you play as the movie’s big star.</strong> You enjoyed every scene you were a part of in the movie.</p>
    `,
    motive: "You wanted more screen time to sing. However, you don't commit any crimes.",
    traits: [
      "Modest",
      "Enjoys being in front of the camera",
      "Also a professional singer",
      "Owns a pet rabbit",
      "Flirty",
      "Ended up in a foreign jail by mistake",
      "Happily married",
      "Loves supporting the arts",
      "Doesn’t believe the rumors about the Director having a supernatural gift"
    ],
    doThis: [
      "Be helpful by handing people drinks and snacks",
      "Make sure the Director’s drink is never empty"
    ],
    feels: [
      "Director (Valentina): “Valentina discovered me.”",
      "Writer (Theo): “Theo’s dialogue is too dramatic.”",
      "Minor Character (Lola): “Lola misunderstood my friendliness.”",
      "Boom Operator (Jade): “Jade caught something private.”",
      "Co-Star (Sabrina): “Sabrina thinks we’re equals.”",
      "Reporter (Miles): “Miles is twisting narratives.”",
      "Camera Operator (Nina): “Nina knows my good angles.”",
      "Costume Designer (Celeste): “Celeste made me look iconic.”",
      "Antagonist (Raven): “Raven went off-script once.”"
    ],
    outfit: [
      "Cocktail attire",
      "Award trophy",
      "Sunglasses",
      "Keep talking about fans and be self absorbed"
    ]
  },

  // Misha -> Nina Park (Camera Operator)
  "MISHA-R8K2V9": {
    name: "Nina Park",
    role: "Camera Operator",
    promptHtml: `
      <p><strong>In this mystery, you play as the movie’s camera operator.</strong> Your favorite scene in the movie was the big chase.</p>
    `,
    motive: "You’re upset with the Director because they won’t let you live down the time you ruined an entire’s day worth of footage. Although, you don't kill the Director over it.",
    traits: [
      "Graceful",
      "Own a pet snake",
      "Bird photographer on weekends",
      "Prefer to be behind the camera",
      "Have been a camera operator your whole life",
      "Get along well with your parents",
      "Thinks they saw a ghost on the movie set",
      "Is a middle child of three"
    ],
    doThis: [
      "Take people's picture with a camera or your cellphone",
      "Complement people in their pictures"
    ],
    feels: [
      "Director (Valentina): “Valentina changed blocking last minute.”",
      "Writer (Theo): “Theo argued loudly one night.”",
      "Minor Character (Lola): “Lola lingered on set late.”",
      "Boom Operator (Jade): “Jade heard the argument too.”",
      "Co-Star (Sabrina): “Sabrina demanded retakes.”",
      "Reporter (Miles): “Miles sneaked onto set.”",
      "Main Character (Luca): “Luca left early that night.”",
      "Costume Designer (Celeste): “Celeste stormed out crying.”",
      "Antagonist (Raven): “Raven stayed after everyone wrapped.”"
    ],
    outfit: [
      "All black outfit",
      "Optional beanie/cap",
      "Some sort of camera (host has one you can use) — keep framing for shots"
    ]
  },

  // Akansha -> Celeste Moreau (Costume Designer)
  "AKANSHA-3J7QF4": {
    name: "Celeste Moreau",
    role: "Costume Designer",
    promptHtml: `
      <p><strong>In this mystery, you designed and crafted all of the costumes in the film.</strong> Your favorite scene in the movie was the love scene.</p>
    `,
    motive: "You're in love with the director, but the director has no feelings for you. You seriously consider killing the Director at the party, but you decide against it.",
    traits: [
      "Drive a Ford Mustang",
      "Clumsy",
      "Camera Shy",
      "Have a pet bird",
      "Once a magician",
      "Optimistic",
      "Kind of believes in the supernatural"
    ],
    doThis: [
      "Complement people’s outfits",
      "Insist the Director eats more",
      "Ask people for a loan"
    ],
    feels: [
      "Director (Valentina): “Valentina questioned my genius.”",
      "Writer (Theo): “Theo doesn’t understand visual storytelling.”",
      "Minor Character (Lola): “Lola appreciated my work.”",
      "Boom Operator (Jade): “Jade spilled coffee on a jacket.”",
      "Co-Star (Sabrina): “Sabrina demanded last-minute changes.”",
      "Reporter (Miles): “Miles spread rumors about budget cuts.”",
      "Main Character (Luca): “Luca refused a fitting.”",
      "Camera Operator (Nina): “Nina lit my designs beautifully.”",
      "Antagonist (Raven): “Raven insisted on wearing black.”"
    ],
    outfit: [
      "Trendy outfit",
      "Statement glasses",
      "Scarf (very chic)",
      "Measuring tape, safety pins, etc."
    ]
  },

  // Anisha -> Raven Vale (Antagonist)
  "ANISHA-P6W1T8": {
    name: "Raven Vale",
    role: "Antagonist",
    promptHtml: `
      <p><strong>In this mystery, you play the movie’s antagonist/villain.</strong> Your favorite scene in the movie was the final battle.</p>
    `,
    motive: "You’re upset with the Director because they told crew members about your early work in a rather embarrassing low-budget sci-fi film. Although, you don't kill the director.",
    traits: [
      "Enjoy having your picture taken",
      "Drive an electric car",
      "Hate your parents",
      "No pets",
      "Play guitar for a band in addition to acting",
      "You talked your way out of going to jail one time",
      "Never been in prison",
      "Volunteers for non-profits every week"
    ],
    doThis: [
      "Photo bomb pictures (do something silly in someone else's pictures)",
      "Flirt with everyone"
    ],
    feels: [
      "Director (Valentina): “Valentina pushed me too far.”",
      "Writer (Theo): “Theo understands darkness.”",
      "Minor Character (Lola): “Lola talks too much.”",
      "Boom Operator (Jade): “Jade watches quietly.”",
      "Co-Star (Sabrina): “Sabrina fears being overshadowed.”",
      "Reporter (Miles): “Miles should mind his business.”",
      "Main Character (Luca): “Luca isn’t the hero he pretends to be.”",
      "Camera Operator (Nina): “Nina saw something.”",
      "Costume Designer (Celeste): “Celeste made me look powerful.”"
    ],
    outfit: [
      "Leather jacket cool girl vibes",
      "Dark lippie",
      "Gloves (optional)",
      "Villainous tone"
    ]
  }
};

// ===== reveal logic =====
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

  setBullets(charTraits, data.traits);
  setBullets(charDoThis, data.doThis);
  setBullets(charFeels, data.feels);
  setBullets(charOutfit, data.outfit);

  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

revealBtn?.addEventListener("click", reveal);
codeInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") reveal();
});

copyBtn?.addEventListener("click", async () => {
  try {
    const code = normalizeCode(codeInput?.value);
    const data = CHARACTERS[code];

    const text =
      `${data?.name || ""}\n\n` +
      `Code: ${code}\n\n` +
      `PROMPT:\n${charPrompt?.innerText || ""}\n\n` +
      `Role: ${data?.role || ""}\n` +
      `Motive: ${data?.motive || ""}\n\n` +
      `Personality Traits:\n${(data?.traits || []).join("\n")}\n\n` +
      `While playing, do this:\n${(data?.doThis || []).join("\n")}\n\n` +
      `How you feel about everyone:\n${(data?.feels || []).join("\n")}\n\n` +
      `Outfit/props (optional):\n${(data?.outfit || []).join("\n")}`;

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
