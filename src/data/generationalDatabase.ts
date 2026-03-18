export type Generation = "Gen Alpha" | "Gen Z" | "Gen X";
export type Tone = "casual" | "humorous" | "sarcastic" | "serious" | "affectionate" | "frustrated";

export type MorphologicalCategory =
  | "Metathesis"
  | "Clipping"
  | "Acronym"
  | "Spelling Change"
  | "Persona-based"
  | "Hybrid Blending"
  | "Reduplication"
  | "Homophone"
  | "Affixation"
  | "Code-switching"
  | "Semantic Shift"
  | "Onomatopoeia";

export interface GenerationalExpression {
  expression: string;
  generation: Generation;
  example: string;
  tone: Tone;
  category?: MorphologicalCategory;
  origin?: string;
}

export interface MeaningGroup {
  id: string;
  coreMeaning: string;
  context: string;
  culturalNote?: string;
  expressions: GenerationalExpression[];
  tags: string[];
}

export const meaningGroups: MeaningGroup[] = [
  // --- Deception / Lying ---
  {
    id: "lying",
    coreMeaning: "Lying / Not telling the truth",
    context: "Used to call out dishonesty or exaggeration.",
    culturalNote: "Each generation has distinct markers for calling out lies — from formal accusations to single-word dismissals.",
    expressions: [
      { expression: "Cap", generation: "Gen Alpha", example: "That's cap, no way that happened.", tone: "casual", category: "Semantic Shift" },
      { expression: "Cap", generation: "Gen Z", example: "No cap, I swear it's true.", tone: "casual", category: "Semantic Shift", origin: "AAVE (African American Vernacular English), popularized on social media." },
      { expression: "Nagsisinungaling ka", generation: "Gen X", example: "Nagsisinungaling ka na naman.", tone: "serious" },
      { expression: "No Cap", generation: "Gen Z", example: "No cap, that sunset was insane.", tone: "casual", category: "Code-switching" },
      { expression: "Fake news", generation: "Gen X", example: "Fake news yan, huwag kang maniwala.", tone: "serious" },
    ],
    tags: ["honesty", "calling out", "truth"],
  },
  {
    id: "delusional",
    coreMeaning: "Delusional / Unrealistic expectations",
    context: "Describes someone who has unrealistic beliefs, especially about romantic prospects.",
    culturalNote: "Younger generations shortened clinical terms into playful insults; older generations use full descriptive phrases.",
    expressions: [
      { expression: "Delulu", generation: "Gen Alpha", example: "She's so delulu, thinking oppa will notice her.", tone: "humorous", category: "Clipping", origin: "Clipped from 'delusional'; K-pop fan culture." },
      { expression: "Delulu", generation: "Gen Z", example: "Delulu is the solulu, besh.", tone: "humorous", category: "Clipping" },
      { expression: "Nangangarap nang gising", generation: "Gen X", example: "Nangangarap ka nang gising kung akala mo mamahalin ka niya.", tone: "serious" },
      { expression: "Out of touch", generation: "Gen X", example: "She's completely out of touch with reality.", tone: "serious" },
    ],
    tags: ["romantic", "unrealistic", "personality"],
  },
  {
    id: "laughing",
    coreMeaning: "Laughing hard / Finding something very funny",
    context: "Expressing intense amusement or laughter.",
    expressions: [
      { expression: "IJBOL", generation: "Gen Alpha", example: "IJBOL that meme is insane 💀", tone: "humorous", category: "Acronym", origin: "I Just Burst Out Laughing — Gen Alpha internet acronym." },
      { expression: "LOL", generation: "Gen Z", example: "LOL di ko kinaya yung joke mo.", tone: "humorous", category: "Acronym" },
      { expression: "ROFL", generation: "Gen Z", example: "ROFL, grabe ka talaga!", tone: "humorous", category: "Acronym" },
      { expression: "Nakakatawa", generation: "Gen X", example: "Nakakatawa talaga ang kwento mo.", tone: "casual" },
      { expression: "Ang funny", generation: "Gen X", example: "Ang funny naman niyan!", tone: "casual" },
    ],
    tags: ["humor", "reaction", "emotion"],
  },
  {
    id: "cool-impressive",
    coreMeaning: "Something impressive / Cool / Extraordinary",
    context: "Expressing admiration for something outstanding.",
    expressions: [
      { expression: "Slay", generation: "Gen Alpha", example: "That outfit slays, ate!", tone: "casual", category: "Semantic Shift" },
      { expression: "Petmalu", generation: "Gen Z", example: "Petmalu ang performance mo kanina!", tone: "casual", category: "Metathesis", origin: "Reversed syllables of 'Malupit' (fierce)." },
      { expression: "Slay", generation: "Gen Z", example: "Slay ng outfit mo today!", tone: "casual", category: "Semantic Shift" },
      { expression: "Astig", generation: "Gen X", example: "Astig ng gitara mo, pare!", tone: "casual", category: "Metathesis" },
      { expression: "Galing", generation: "Gen X", example: "Ang galing naman, impressive!", tone: "casual" },
    ],
    tags: ["admiration", "compliment", "cool"],
  },
  {
    id: "agreement",
    coreMeaning: "Agreement / Affirmation / 'Sure'",
    context: "Confirming, accepting, or agreeing with something.",
    expressions: [
      { expression: "Bet", generation: "Gen Alpha", example: "Ice cream later? Bet!", tone: "casual", category: "Semantic Shift" },
      { expression: "Bet", generation: "Gen Z", example: "Samahan mo ko mamaya? — Bet!", tone: "casual", category: "Semantic Shift", origin: "English slang adopted into Filipino internet speak." },
      { expression: "G", generation: "Gen Z", example: "G ka ba mamaya?", tone: "casual", category: "Clipping" },
      { expression: "Sige", generation: "Gen X", example: "Sige, punta tayo mamaya.", tone: "casual" },
      { expression: "Okay lang", generation: "Gen X", example: "Okay lang, game ako diyan.", tone: "casual" },
    ],
    tags: ["agreement", "confirmation", "casual"],
  },
  {
    id: "gossip",
    coreMeaning: "Gossip / Spreading rumors",
    context: "Talking about other people's business, sharing juicy stories.",
    culturalNote: "Filipino gossip culture is deeply embedded — from 'tsismis' to persona-based slang like 'Maritess'.",
    expressions: [
      { expression: "Spill the tea", generation: "Gen Alpha", example: "Spill the tea sis, what happened?", tone: "humorous", category: "Code-switching" },
      { expression: "Maritess", generation: "Gen Z", example: "Ang maritess ng kapitbahay, alam lahat.", tone: "humorous", category: "Persona-based", origin: "From 'Mare, ano ang latest?' — Filipino persona-based slang." },
      { expression: "Chika", generation: "Gen Z", example: "May chika ako sayo, besh!", tone: "casual", category: "Hybrid Blending" },
      { expression: "Tsismis", generation: "Gen X", example: "Wag kang makinig sa tsismis.", tone: "serious" },
      { expression: "Usapang kanto", generation: "Gen X", example: "Usapang kanto lang yan, huwag pansinin.", tone: "serious" },
    ],
    tags: ["gossip", "social", "culture"],
  },
  {
    id: "sharing-story",
    coreMeaning: "Sharing a personal story / 'Just sharing'",
    context: "Introducing a personal comment or anecdote casually.",
    expressions: [
      { expression: "SKL", generation: "Gen Alpha", example: "SKL guys, may bago akong bili!", tone: "casual", category: "Acronym", origin: "Share Ko Lang — Filipino social media acronym." },
      { expression: "SKL", generation: "Gen Z", example: "SKL besh, may nangyari kanina.", tone: "casual", category: "Acronym" },
      { expression: "Kwento ko lang", generation: "Gen X", example: "Kwento ko lang ha, may nangyari sa opisina.", tone: "casual" },
      { expression: "Payo ko lang", generation: "Gen X", example: "Payo ko lang, mag-ingat ka.", tone: "serious" },
    ],
    tags: ["sharing", "social media", "casual"],
  },
  {
    id: "frustration",
    coreMeaning: "Frustration / Disappointment",
    context: "Expressing that something is unfortunate or frustrating.",
    expressions: [
      { expression: "Bruh", generation: "Gen Alpha", example: "Bruh, bagsak na naman ako.", tone: "frustrated", category: "Spelling Change" },
      { expression: "Awit", generation: "Gen Z", example: "Cancelled ang lakad natin? Awit.", tone: "frustrated", category: "Semantic Shift", origin: "Possibly from 'Aw, it (hurts)' or repurposed Filipino 'awit' (song)." },
      { expression: "SML", generation: "Gen Z", example: "SML, bagsak na naman sa exam!", tone: "frustrated", category: "Acronym", origin: "Share Mo Lang / Sa Mahal ng Life." },
      { expression: "Sayang", generation: "Gen X", example: "Sayang naman, hindi natuloy.", tone: "frustrated" },
      { expression: "Hay naku", generation: "Gen X", example: "Hay naku, problema na naman.", tone: "frustrated" },
    ],
    tags: ["frustration", "disappointment", "emotion"],
  },
  {
    id: "best-friend",
    coreMeaning: "Best friend / Close friend",
    context: "A term of endearment for a close friend.",
    expressions: [
      { expression: "Bestie", generation: "Gen Alpha", example: "OMG bestie, let's go!", tone: "affectionate", category: "Clipping" },
      { expression: "Besh", generation: "Gen Z", example: "Tara, besh, kain tayo!", tone: "affectionate", category: "Spelling Change", origin: "Filipino phonetic shortening of 'Best (friend)'." },
      { expression: "Bes", generation: "Gen Z", example: "Bes, may chika ako.", tone: "affectionate", category: "Clipping" },
      { expression: "Mare / Pare", generation: "Gen X", example: "Pare, tara inom tayo.", tone: "casual" },
      { expression: "Tropa", generation: "Gen X", example: "Tropa ko yan mula pagkabata.", tone: "casual" },
    ],
    tags: ["friendship", "endearment", "social"],
  },
  {
    id: "love-affection",
    coreMeaning: "Expressing love / Affection",
    context: "Showing love, care, or romantic affection.",
    expressions: [
      { expression: "Pookie", generation: "Gen Alpha", example: "Good morning, pookie!", tone: "affectionate", category: "Spelling Change", origin: "English pet name viral on TikTok." },
      { expression: "Labyu", generation: "Gen Z", example: "Labyu, besh!", tone: "affectionate", category: "Spelling Change", origin: "Filipino phonetic spelling of 'Love you'." },
      { expression: "Mahal kita", generation: "Gen X", example: "Mahal kita, alam mo yan.", tone: "affectionate" },
      { expression: "I love you", generation: "Gen X", example: "I love you, ingat ka.", tone: "affectionate" },
    ],
    tags: ["love", "romance", "affection"],
  },
  {
    id: "mother",
    coreMeaning: "Mother / Mom",
    context: "Referring to one's mother.",
    expressions: [
      { expression: "Mommy", generation: "Gen Alpha", example: "Mommy, bilhan mo ko!", tone: "casual" },
      { expression: "Ermat", generation: "Gen Z", example: "Saan na si ermat mo?", tone: "casual", category: "Metathesis", origin: "Reversed syllables of 'Mater' → 'Ermat'." },
      { expression: "Momshie", generation: "Gen Z", example: "Hello, momshie! Kumusta?", tone: "affectionate", category: "Reduplication", origin: "Popularized by Vice Ganda on 'It's Showtime'." },
      { expression: "Nanay", generation: "Gen X", example: "Nasaan si Nanay?", tone: "casual" },
      { expression: "Mama", generation: "Gen X", example: "Mama, kain na tayo.", tone: "casual" },
    ],
    tags: ["family", "mother", "endearment"],
  },
  {
    id: "father",
    coreMeaning: "Father / Dad",
    context: "Referring to one's father.",
    expressions: [
      { expression: "Daddy", generation: "Gen Alpha", example: "Daddy, let's play!", tone: "casual" },
      { expression: "Erpat", generation: "Gen Z", example: "Hinahanap ka ng erpat mo.", tone: "casual", category: "Metathesis", origin: "Reversed syllables of 'Pater' → 'Erpat'." },
      { expression: "Tatay", generation: "Gen X", example: "Tatay, tulungan mo ko.", tone: "casual" },
      { expression: "Papa", generation: "Gen X", example: "Papa, uwi ka na.", tone: "casual" },
    ],
    tags: ["family", "father"],
  },
  {
    id: "idol",
    coreMeaning: "Someone greatly admired / Idol",
    context: "Calling someone your hero, inspiration, or role model.",
    expressions: [
      { expression: "GOAT", generation: "Gen Alpha", example: "LeBron is the GOAT fr.", tone: "casual", category: "Acronym", origin: "Greatest Of All Time." },
      { expression: "Lodi", generation: "Gen Z", example: "Lodi talaga kita, pare!", tone: "casual", category: "Metathesis", origin: "Reversed syllables of 'Idol' → 'Lodi'." },
      { expression: "Idol", generation: "Gen X", example: "Idol kita, boss!", tone: "casual" },
      { expression: "Hinahangaan kita", generation: "Gen X", example: "Hinahangaan talaga kita.", tone: "serious" },
    ],
    tags: ["admiration", "respect", "idol"],
  },
  {
    id: "encouragement",
    coreMeaning: "Encouragement / 'You can do it!'",
    context: "Motivating or cheering someone on.",
    expressions: [
      { expression: "You got this", generation: "Gen Alpha", example: "You got this bestie, slay!", tone: "casual" },
      { expression: "Werpa", generation: "Gen Z", example: "Werpa, besh! Kaya mo yan!", tone: "casual", category: "Metathesis", origin: "Reversed syllables of 'Power' → 'Werpa'." },
      { expression: "Push", generation: "Gen Z", example: "Push na natin yan, bahala na!", tone: "casual", category: "Semantic Shift" },
      { expression: "Kaya mo yan", generation: "Gen X", example: "Kaya mo yan, anak!", tone: "affectionate" },
      { expression: "Laban lang", generation: "Gen X", example: "Laban lang, huwag susuko.", tone: "serious" },
    ],
    tags: ["motivation", "encouragement", "support"],
  },
  {
    id: "joking",
    coreMeaning: "Just kidding / Not serious",
    context: "Softening a statement or indicating something was said in jest.",
    expressions: [
      { expression: "JK", generation: "Gen Alpha", example: "You're ugly JK haha", tone: "humorous", category: "Acronym" },
      { expression: "Charot", generation: "Gen Z", example: "Pangit mo! Charot!", tone: "humorous", category: "Affixation", origin: "Filipino gay lingo, widely adopted by Gen Z." },
      { expression: "Joke lang", generation: "Gen X", example: "Joke lang yun, huwag ka magtampo.", tone: "casual" },
      { expression: "Biruan lang", generation: "Gen X", example: "Biruan lang naman yun.", tone: "casual" },
    ],
    tags: ["humor", "softening", "casual"],
  },
  {
    id: "ghosting",
    coreMeaning: "Suddenly ignoring someone / Cutting off communication",
    context: "When someone stops replying without explanation, especially in dating.",
    expressions: [
      { expression: "Ghosting", generation: "Gen Alpha", example: "She's ghosting me again bruh.", tone: "frustrated", category: "Semantic Shift" },
      { expression: "Ghosting", generation: "Gen Z", example: "Na-ghost na naman ako ng kausap ko.", tone: "frustrated", category: "Semantic Shift", origin: "English dating slang widely used in Filipino digital culture." },
      { expression: "Dedma", generation: "Gen Z", example: "Dedma na lang siya sa messages ko.", tone: "frustrated", category: "Clipping" },
      { expression: "Hindi na nag-reply", generation: "Gen X", example: "Hindi na siya nag-reply, tinanggal na yata ako.", tone: "frustrated" },
      { expression: "Iniiwasan", generation: "Gen X", example: "Parang iniiwasan na niya ako.", tone: "serious" },
    ],
    tags: ["dating", "communication", "internet"],
  },
  {
    id: "envy",
    coreMeaning: "Envy / Wishing for the same fortune",
    context: "Expressing jealousy or desire for someone else's good luck.",
    expressions: [
      { expression: "Lucky", generation: "Gen Alpha", example: "Lucky naman niya, may iPhone na!", tone: "casual" },
      { expression: "Sana All", generation: "Gen Z", example: "May jowa na si bestie. Sana all!", tone: "humorous", category: "Clipping", origin: "Clipped Filipino expression 'Sana ganoon din lahat'." },
      { expression: "Inggit", generation: "Gen X", example: "Naiinggit ako sa swerte niya.", tone: "casual" },
      { expression: "Sana ganoon din ako", generation: "Gen X", example: "Sana ganoon din ako kasuwerte.", tone: "serious" },
    ],
    tags: ["envy", "social media", "emotion"],
  },
  {
    id: "sus-suspicious",
    coreMeaning: "Suspicious / Something seems off",
    context: "Describing something or someone that seems untrustworthy.",
    expressions: [
      { expression: "Sus", generation: "Gen Alpha", example: "That's kinda sus ngl.", tone: "humorous", category: "Clipping", origin: "From 'suspicious'; popularized by Among Us." },
      { expression: "Sus", generation: "Gen Z", example: "Ang sus naman ng sagot niya.", tone: "humorous", category: "Clipping" },
      { expression: "Kaduda-duda", generation: "Gen X", example: "Kaduda-duda ang ginagawa niya.", tone: "serious" },
      { expression: "May tinatago", generation: "Gen X", example: "Parang may tinatago siya.", tone: "serious" },
    ],
    tags: ["suspicion", "trust", "gaming"],
  },
  {
    id: "genuine-real",
    coreMeaning: "Genuine / Authentic / For real",
    context: "Emphasizing sincerity or confirming something is true.",
    expressions: [
      { expression: "FR", generation: "Gen Alpha", example: "FR that movie was fire.", tone: "casual", category: "Acronym", origin: "For Real." },
      { expression: "Legit", generation: "Gen Z", example: "Legit ba yan o prank lang?", tone: "casual", category: "Clipping" },
      { expression: "FR", generation: "Gen Z", example: "FR lang ha, ang ganda niya.", tone: "casual", category: "Acronym" },
      { expression: "Totoo", generation: "Gen X", example: "Totoo ba sinasabi mo?", tone: "serious" },
      { expression: "Seryoso", generation: "Gen X", example: "Seryoso ka ba diyan?", tone: "serious" },
    ],
    tags: ["sincerity", "truth", "emphasis"],
  },
  {
    id: "no-disagreement",
    coreMeaning: "No / Disagreement / Refusal",
    context: "Expressing disagreement or saying no in various ways.",
    expressions: [
      { expression: "Naur", generation: "Gen Alpha", example: "Naur, I can't even.", tone: "humorous", category: "Spelling Change", origin: "Mimicking Australian pronunciation of 'No'; viral on TikTok." },
      { expression: "Naur", generation: "Gen Z", example: "Naur, hindi ko kaya yan!", tone: "humorous", category: "Spelling Change" },
      { expression: "Hindi", generation: "Gen X", example: "Hindi, ayoko niyan.", tone: "serious" },
      { expression: "Ayoko", generation: "Gen X", example: "Ayoko na, pagod na ako.", tone: "frustrated" },
    ],
    tags: ["disagreement", "refusal", "humor"],
  },
  {
    id: "deserving",
    coreMeaning: "Deserving / You earned it",
    context: "Affirming someone got what they deserved (usually positive).",
    expressions: [
      { expression: "Ate that", generation: "Gen Alpha", example: "She ate that performance up!", tone: "casual", category: "Semantic Shift" },
      { expression: "Dasurv", generation: "Gen Z", example: "Nanalo ka sa contest? Dasurv!", tone: "casual", category: "Spelling Change", origin: "Filipino internet phonetic spelling of 'Deserve'." },
      { expression: "Karapat-dapat", generation: "Gen X", example: "Karapat-dapat ka sa award na yan.", tone: "serious" },
      { expression: "Deserve mo yan", generation: "Gen X", example: "Deserve mo yan, pinaghirapan mo.", tone: "affectionate" },
    ],
    tags: ["affirmation", "achievement", "social media"],
  },
  {
    id: "life-phase",
    coreMeaning: "Going through a phase / Personal era",
    context: "Describing a period or chapter in someone's life.",
    expressions: [
      { expression: "Era", generation: "Gen Alpha", example: "I'm in my villain era.", tone: "humorous", category: "Semantic Shift", origin: "Popularized by Taylor Swift fans." },
      { expression: "Era", generation: "Gen Z", example: "Nasa healing era na ako, besh.", tone: "casual", category: "Semantic Shift" },
      { expression: "Phase", generation: "Gen X", example: "Phase lang yan, lilipas din.", tone: "casual" },
      { expression: "Pinagdadaanan", generation: "Gen X", example: "May pinagdadaanan lang siya.", tone: "serious" },
    ],
    tags: ["phases", "personal growth", "trending"],
  },
  {
    id: "attention-seeking",
    coreMeaning: "Attention-seeking / Trying too hard to impress",
    context: "Describing someone who tries too hard to get validation.",
    expressions: [
      { expression: "Pick Me", generation: "Gen Alpha", example: "She's such a pick me girl.", tone: "sarcastic", category: "Semantic Shift" },
      { expression: "Pick Me", generation: "Gen Z", example: "Ang pick-me ng comment niya.", tone: "sarcastic", category: "Semantic Shift" },
      { expression: "Simp", generation: "Gen Z", example: "Nag-simp na naman si kuya.", tone: "humorous", category: "Clipping" },
      { expression: "Nagpapapansin", generation: "Gen X", example: "Nagpapapansin lang yan.", tone: "serious" },
      { expression: "Pa-importante", generation: "Gen X", example: "Pa-importante siya lagi.", tone: "sarcastic" },
    ],
    tags: ["personality", "social", "internet"],
  },
  {
    id: "complaining",
    coreMeaning: "Threatening to file a complaint / Seeking justice",
    context: "When someone threatens to report or escalate an issue.",
    expressions: [
      { expression: "Ratio", generation: "Gen Alpha", example: "Ratio + L + cope.", tone: "sarcastic", category: "Semantic Shift" },
      { expression: "Ipa-Tulfo", generation: "Gen Z", example: "Pag hindi nila binalik ang pera ko, ipa-Tulfo ko!", tone: "frustrated", category: "Persona-based", origin: "Named after broadcaster Raffy Tulfo." },
      { expression: "Ireklamo", generation: "Gen X", example: "Ireklamo natin sa barangay.", tone: "serious" },
      { expression: "Kakasuhan kita", generation: "Gen X", example: "Kakasuhan kita pag hindi mo binayaran.", tone: "serious" },
    ],
    tags: ["complaint", "justice", "media"],
  },
  {
    id: "leaving-quickly",
    coreMeaning: "Leaving quickly / Getting out of a situation",
    context: "Expressing a sudden departure or need to escape.",
    expressions: [
      { expression: "Skrrt", generation: "Gen Alpha", example: "Saw my ex, skrrt outta there!", tone: "humorous", category: "Onomatopoeia" },
      { expression: "Skrrt", generation: "Gen Z", example: "Pagkakita ko sa ex ko, skrrt agad!", tone: "humorous", category: "Onomatopoeia", origin: "From hip-hop culture — sound of tires screeching." },
      { expression: "Takbo", generation: "Gen X", example: "Tumakbo ako pagkakita ko sa kanya.", tone: "casual" },
      { expression: "Umalis agad", generation: "Gen X", example: "Umalis agad ako, ayoko ng gulo.", tone: "serious" },
    ],
    tags: ["escape", "humor", "hiphop"],
  },
  {
    id: "cute-endearment",
    coreMeaning: "Something extremely cute / Adorable",
    context: "Reacting to something irresistibly cute.",
    expressions: [
      { expression: "Smol bean", generation: "Gen Alpha", example: "OMG smol bean kitty!", tone: "affectionate" },
      { expression: "Gigil", generation: "Gen Z", example: "Nakaka-gigil ang baby!", tone: "affectionate", category: "Semantic Shift", origin: "Native Filipino word — cuteness aggression." },
      { expression: "Kyut", generation: "Gen Z", example: "Ang kyut naman niyan!", tone: "affectionate", category: "Spelling Change" },
      { expression: "Ang cute", generation: "Gen X", example: "Ang cute naman ng bata!", tone: "affectionate" },
      { expression: "Nakakatuwa", generation: "Gen X", example: "Nakakatuwa naman, ang ganda!", tone: "affectionate" },
    ],
    tags: ["cute", "emotion", "reaction"],
  },
  {
    id: "crybaby",
    coreMeaning: "Someone who cries easily / Emotional person",
    context: "Describing someone who is overly emotional or sensitive.",
    expressions: [
      { expression: "Soft", generation: "Gen Alpha", example: "I'm so soft rn 😭", tone: "casual", category: "Semantic Shift" },
      { expression: "Iyakin", generation: "Gen Z", example: "Iyakin talaga si ate pag kdrama.", tone: "humorous", category: "Affixation", origin: "Filipino root 'iyak' (cry) + suffix '-in'." },
      { expression: "Sensitibo", generation: "Gen X", example: "Sensitibo talaga yang batang yan.", tone: "casual" },
      { expression: "Madaling maiyak", generation: "Gen X", example: "Madaling maiyak yang si Maria.", tone: "casual" },
    ],
    tags: ["emotion", "personality", "sensitivity"],
  },
  {
    id: "gaming-over",
    coreMeaning: "It's over / Done for / Game over",
    context: "Expressing that a situation is hopeless or finished.",
    expressions: [
      { expression: "It's giving over", generation: "Gen Alpha", example: "This test? It's giving over.", tone: "humorous" },
      { expression: "GGWP", generation: "Gen Z", example: "GGWP na sa exam natin bukas.", tone: "humorous", category: "Acronym", origin: "Good Game, Well Played — from gaming culture." },
      { expression: "Wala na", generation: "Gen X", example: "Wala na, finish na.", tone: "frustrated" },
      { expression: "Tapos na", generation: "Gen X", example: "Tapos na ang laban.", tone: "serious" },
    ],
    tags: ["gaming", "hopeless", "finished"],
  },
  {
    id: "mayor-leader",
    coreMeaning: "Mayor / Local leader",
    context: "Referring to a mayor or authority figure.",
    expressions: [
      { expression: "Yorme", generation: "Gen Z", example: "Si Yorme ang pinakasikat na mayor.", tone: "casual", category: "Metathesis", origin: "Reversed syllables of 'Mayor' → 'Yorme'. Filipino 'baliktad' wordplay." },
      { expression: "Mayor", generation: "Gen X", example: "Si Mayor ang nagsabi niyan.", tone: "serious" },
      { expression: "Alkalde", generation: "Gen X", example: "Ang alkalde natin, mabait naman.", tone: "casual" },
    ],
    tags: ["politics", "authority", "baliktad"],
  },
  {
    id: "date-outing",
    coreMeaning: "Going on a date / Hanging out romantically",
    context: "Planning or describing a romantic outing.",
    expressions: [
      { expression: "Hang", generation: "Gen Alpha", example: "Wanna hang later?", tone: "casual" },
      { expression: "Thursdate", generation: "Gen Z", example: "May thursdate kami ni babe mamaya!", tone: "casual", category: "Hybrid Blending", origin: "Blending of 'Thursday' + 'Date'." },
      { expression: "Date", generation: "Gen X", example: "May date kami sa Friday.", tone: "casual" },
      { expression: "Lakad", generation: "Gen X", example: "May lakad kami ng misis ko.", tone: "casual" },
    ],
    tags: ["dating", "romance", "outing"],
  },
  {
    id: "forda-vibe",
    coreMeaning: "Having a specific vibe / Persona / Trait",
    context: "Describing someone who embodies a particular trait or energy.",
    expressions: [
      { expression: "It's giving", generation: "Gen Alpha", example: "It's giving main character energy.", tone: "humorous" },
      { expression: "Forda Ferson", generation: "Gen Z", example: "Forda ferson na naman si kuya sa gym!", tone: "humorous", category: "Hybrid Blending", origin: "Playful corruption of 'For the person'; viral on TikTok PH." },
      { expression: "Type niya", generation: "Gen X", example: "Type niya talaga mag-gym.", tone: "casual" },
      { expression: "Hilig niya", generation: "Gen X", example: "Hilig niya talaga yan.", tone: "casual" },
    ],
    tags: ["personality", "vibe", "tiktok"],
  },
  {
    id: "weird-chaotic",
    coreMeaning: "Weird / Chaotic / Nonsensical",
    context: "Describing something bizarre, random, or absurd.",
    expressions: [
      { expression: "Skibidi", generation: "Gen Alpha", example: "That's so skibidi bro.", tone: "humorous", origin: "From 'Skibidi Toilet' internet meme series." },
      { expression: "Keri", generation: "Gen Z", example: "Ang weird pero keri lang.", tone: "casual", category: "Spelling Change" },
      { expression: "Kakaiba", generation: "Gen X", example: "Kakaiba talaga yang bata na yan.", tone: "casual" },
      { expression: "Baliw", generation: "Gen X", example: "Baliw-baliw ka talaga.", tone: "humorous" },
    ],
    tags: ["weird", "humor", "meme"],
  },
];

// Build lookup maps for fast detection
export const expressionLookup: Map<string, { meaningGroup: MeaningGroup; expression: GenerationalExpression }> = new Map();

meaningGroups.forEach((group) => {
  group.expressions.forEach((expr) => {
    const key = expr.expression.toLowerCase();
    // Only store first match (priority to earlier meaning groups)
    if (!expressionLookup.has(key)) {
      expressionLookup.set(key, { meaningGroup: group, expression: expr });
    }
  });
});

// Get all unique expressions for a generation
export function getExpressionsForGeneration(gen: Generation): string[] {
  const exprs = new Set<string>();
  meaningGroups.forEach((g) => {
    g.expressions.filter((e) => e.generation === gen).forEach((e) => exprs.add(e.expression));
  });
  return Array.from(exprs);
}

// Get generation stats
export function getGenerationStats(): { generation: Generation; count: number }[] {
  const counts: Record<string, number> = {};
  meaningGroups.forEach((g) => {
    g.expressions.forEach((e) => {
      counts[e.generation] = (counts[e.generation] || 0) + 1;
    });
  });
  return (Object.entries(counts) as [Generation, number][])
    .map(([generation, count]) => ({ generation, count }))
    .sort((a, b) => b.count - a.count);
}

export function getCategoryStats(): { category: string; count: number }[] {
  const counts: Record<string, number> = {};
  meaningGroups.forEach((g) => {
    g.expressions.forEach((e) => {
      if (e.category) {
        counts[e.category] = (counts[e.category] || 0) + 1;
      }
    });
  });
  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}
