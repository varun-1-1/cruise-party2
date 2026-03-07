// script.js

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
    role: "Writer (Akash / Theo)",
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
      "Director (Priyanshi / Valentina): “She butchered my script and calls it vision.”",
      "Minor Character (Shivangi / Lola): “Lola’s character had depth until editing.”",
      "Boom Operator (Abhigna / Jake): “Jade definitely overheard something she shouldn’t have.”",
      "Co-Star (Caissa / Sabrina): “Sabrina only memorized her lines after I rewrote them.”",
      "Reporter (Viggy / Miles): “Miles is circling this production like a vulture.”",
      "Main Character (Varun / Luca): “Luca can’t pronounce half my dialogue.”",
      "Camera Operator (Misha / Nina): “Nina appreciated the symbolism.”",
      "Costume Designer (Akansha / Celeste): “Celeste at least respected my themes.”",
      "Antagonist (Anisha / Raven): “Raven understood the darkness in my writing… too well.”",
      "Gaffer (Mihir / Luke): “Stop blaming me — lighting is the soul of cinema.”"
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
    role: "Minor Character (Shivangi / Lola)",
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
      "Director (Priyanshi / Valentina): “Valentina promised me a bigger arc.”",
      "Writer (Akash / Theo): “Theo said my character was essential.”",
      "Boom Operator (Abhigna / Jake): “Jade told me people were talking about me.”",
      "Co-Star (Caissa / Sabrina): “Sabrina ignored me unless cameras were rolling.”",
      "Reporter (Viggy / Miles): “Miles seemed VERY interested in my trailer visit.”",
      "Main Character (Varun / Luca): “Luca flirted with me between takes.”",
      "Camera Operator (Misha / Nina): “Nina always made sure I was in frame.”",
      "Costume Designer (Akansha / Celeste): “Celeste gave me better outfits than Sabrina.”",
      "Antagonist (Anisha / Raven): “Raven scares me… but in a hot way.”",
      "Gaffer (Mihir / Luke): “Luke is weirdly intense about lighting.”"
    ],
    outfit: [
      "Overdressed",
      "Dramatic makeup",
      "Accessorize to try to out-do main character energy"
    ]
  },

  // Abhigna -> Jake (Boom Operator)
  "ABHIGNA-N6X1R7": {
    name: "Jake Rivers",
    role: "Boom Operator (Abhigna / Jake)",
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
      "Director (Priyanshi / Valentina): “Valentina yelled at me when the mic wasn’t even on.”",
      "Writer (Akash / Theo): “Theo cried in the hallway.”",
      "Minor Character (Shivangi / Lola): “Lola practices interviews alone.”",
      "Co-Star (Caissa / Sabrina): “Sabrina talks badly about Luca when he leaves.”",
      "Reporter (Viggy / Miles): “Miles tried to bribe me for audio files.”",
      "Main Character (Varun / Luca): “Luca rehearsed a fight speech off-camera.”",
      "Camera Operator (Misha / Nina): “Nina and I saw something weird that night.”",
      "Costume Designer (Akansha / Celeste): “Celeste threatened to quit mid-shoot.”",
      "Antagonist (Anisha / Raven): “Raven stayed late after everyone left.”",
      "Gaffer (Mihir / Luke): “Luke kept muttering about his lights being moved.”"
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
    role: "Co-Star (Caissa / Sabrina)",
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
      "Director (Priyanshi / Valentina): “Valentina favors Luca too much.”",
      "Writer (Akash / Theo): “Theo rewrote scenes without telling me.”",
      "Minor Character (Shivangi / Lola): “Lola needs to learn her place.”",
      "Boom Operator (Abhigna / Jake): “Jade listens more than she speaks.”",
      "Reporter (Viggy / Miles): “Miles keeps asking about ‘rivalry rumors.’”",
      "Main Character (Varun / Luca): “Luca and I carried this film.”",
      "Camera Operator (Misha / Nina): “Nina caught my bad side once.”",
      "Costume Designer (Akansha / Celeste): “Celeste made Luca look better than me.”",
      "Antagonist (Anisha / Raven): “Raven stayed in character even at wrap party.”",
      "Gaffer (Mihir / Luke): “Luke thinks he’s the real reason the film looks good.”"
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
    role: "Reporter (Viggy / Miles)",
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
      "Director (Priyanshi / Valentina): “Valentina is hiding something.”",
      "Writer (Akash / Theo): “Theo drinks when stressed.”",
      "Minor Character (Shivangi / Lola): “Lola wants fame badly.”",
      "Boom Operator (Abhigna / Jake): “Jade has the real story.”",
      "Co-Star (Caissa / Sabrina): “Sabrina’s smile isn’t genuine.”",
      "Main Character (Varun / Luca): “Luca’s ego is fragile.”",
      "Camera Operator (Misha / Nina): “Nina avoids my questions.”",
      "Costume Designer (Akansha / Celeste): “Celeste threatened legal action.”",
      "Antagonist (Anisha / Raven): “Raven warned me to ‘be careful what I print.’”",
      "Gaffer (Mihir / Luke): “Luke’s alibi is… weirdly rehearsed.”"
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
    role: "Main Character (Varun / Luca)",
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
      "Director (Priyanshi / Valentina): “Valentina discovered me.”",
      "Writer (Akash / Theo): “Theo’s dialogue is too dramatic.”",
      "Minor Character (Shivangi / Lola): “Lola misunderstood my friendliness.”",
      "Boom Operator (Abhigna / Jake): “Jade caught something private.”",
      "Co-Star (Caissa / Sabrina): “Sabrina thinks we’re equals.”",
      "Reporter (Viggy / Miles): “Miles is twisting narratives.”",
      "Camera Operator (Misha / Nina): “Nina knows my good angles.”",
      "Costume Designer (Akansha / Celeste): “Celeste made me look iconic.”",
      "Antagonist (Anisha / Raven): “Raven went off-script once.”",
      "Gaffer (Mihir / Luke): “Luke always interrupts my close-ups with ‘lighting notes.’”"
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
    role: "Camera Operator (Misha / Nina)",
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
      "Director (Priyanshi / Valentina): “Valentina changed blocking last minute.”",
      "Writer (Akash / Theo): “Theo argued loudly one night.”",
      "Minor Character (Shivangi / Lola): “Lola lingered on set late.”",
      "Boom Operator (Abhigna / Jake): “Jade heard the argument too.”",
      "Co-Star (Caissa / Sabrina): “Sabrina demanded retakes.”",
      "Reporter (Viggy / Miles): “Miles sneaked onto set.”",
      "Main Character (Varun / Luca): “Luca left early that night.”",
      "Costume Designer (Akansha / Celeste): “Celeste stormed out crying.”",
      "Antagonist (Anisha / Raven): “Raven stayed after everyone wrapped.”",
      "Gaffer (Mihir / Luke): “Luke keeps blaming me for touching his lights.”"
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
    role: "Costume Designer (Akansha / Celeste)",
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
      "Director (Priyanshi / Valentina): “Valentina questioned my genius.”",
      "Writer (Akash / Theo): “Theo doesn’t understand visual storytelling.”",
      "Minor Character (Shivangi / Lola): “Lola appreciated my work.”",
      "Boom Operator (Abhigna / Jake): “Jade spilled coffee on a jacket.”",
      "Co-Star (Caissa / Sabrina): “Sabrina demanded last-minute changes.”",
      "Reporter (Viggy / Miles): “Miles spread rumors about budget cuts.”",
      "Main Character (Varun / Luca): “Luca refused a fitting.”",
      "Camera Operator (Misha / Nina): “Nina lit my designs beautifully.”",
      "Antagonist (Anisha / Raven): “Raven insisted on wearing black.”",
      "Gaffer (Mihir / Luke): “Luke says my fabrics ‘reflect light wrong.’ He can choke.”"
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
    role: "Antagonist (Anisha / Raven)",
    promptHtml: `
      <p><strong>In this mystery, you play the movie’s antagonist/villain.</strong> Your favorite scene in the movie was the final battle.</p>
    `,
    motive: "You’re upset with the Director because they told crew members about your early work in a rather embarrassing low-budget sci-fi film. Although, you don't kill the director.",
    traits: [
      "You enjoy having your picture taken",
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
      "Director (Priyanshi / Valentina): “Valentina pushed me too far.”",
      "Writer (Akash / Theo): “Theo understands darkness.”",
      "Minor Character (Shivangi / Lola): “Lola talks too much.”",
      "Boom Operator (Abhigna / Jake): “Jade watches quietly.”",
      "Co-Star (Caissa / Sabrina): “Sabrina fears being overshadowed.”",
      "Reporter (Viggy / Miles): “Miles should mind his business.”",
      "Main Character (Varun / Luca): “Luca isn’t the hero he pretends to be.”",
      "Camera Operator (Misha / Nina): “Nina saw something.”",
      "Costume Designer (Akansha / Celeste): “Celeste made me look powerful.”",
      "Gaffer (Mihir / Luke): “Luke is useful… when he stays silent.”"
    ],
    outfit: [
      "Leather jacket cool girl vibes",
      "Dark lippie",
      "Gloves (optional)",
      "Villainous tone"
    ]
  },

  // Mihir -> Luke Kane (Gaffer)
  "MIHIR-L8Q4T2": {
    name: "Luke Kane",
    role: "Gaffer (Mihir / Luke)",
    promptHtml: `
      <p><strong>In this mystery, you play as the movie's gaffer,</strong> which means you were in charge of the lighting. Your favorite scene was when the monster first appeared.</p>
    `,
    motive: "You really don't have much of a motive for killing the Director, but you do have a motive for killing the camera operator because they would move your lights around.",
    traits: [
      "Graceful",
      "Own a pet spider",
      "Blackjack player",
      "The only kind of guns you know how to use are on video games",
      "Indifferent to people’s beliefs in the supernatural and conspiracy theories"
    ],
    doThis: [
      "Talk about other guests' pets",
      "Say negative things about the Camera Operator (Misha / Nina) that inadvertently makes them look like a good person"
    ],
    feels: [
      "Director (Priyanshi / Valentina): “She never appreciates lighting.”",
      "Writer (Akash / Theo): “Too moody to notice what makes scenes work.”",
      "Minor Character (Shivangi / Lola): “Always trying to be in the spotlight.”",
      "Boom Operator (Abhigna / Jake): “At least Jake stays in his lane.”",
      "Co-Star (Caissa / Sabrina): “Thinks she’s the lead. She’s not.”",
      "Reporter (Viggy / Miles): “Fishing for drama. Annoying.”",
      "Main Character (Varun / Luca): “Ego blocks the light.”",
      "Camera Operator (Misha / Nina): “Stop touching my lights.”",
      "Costume Designer (Akansha / Celeste): “Her fabrics reflect weird.”",
      "Antagonist (Anisha / Raven): “Actually understands mood.”"
    ],
    outfit: [
      "Option 1 – Classic Film Crew: Black T-shirt, cargo pants/jeans, baseball cap, tool belt/fanny pack, flashlight clipped somewhere",
      "Option 2 – Lighting Nerd: Black hoodie, headlamp, work gloves, tape roll hanging from belt"
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
