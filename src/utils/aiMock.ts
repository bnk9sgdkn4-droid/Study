import { Subject, StudyGuide, QuizQuestion, MatchingPair, Flashcard } from '../types';

// ---------------------------------------------------------------------------
// Study Guide content per subject / topic
// ---------------------------------------------------------------------------

const studyGuides: Record<Subject, Record<string, StudyGuide>> = {
  math: {
    default: {
      title: 'Algebra Fundamentals',
      overview: 'Algebra is the branch of mathematics dealing with symbols and rules for manipulating those symbols. It forms the foundation for almost all advanced mathematics.',
      sections: [
        {
          emoji: '🔢',
          title: 'Variables & Expressions',
          points: [
            'A variable is a symbol (usually a letter) that represents an unknown value.',
            'An expression is a combination of numbers, variables, and operations: 3x + 5.',
            'To evaluate an expression, substitute a value for the variable.',
            'Like terms have the same variable raised to the same power and can be combined.',
          ],
        },
        {
          emoji: '⚖️',
          title: 'Solving Equations',
          points: [
            'An equation states that two expressions are equal: 2x + 3 = 11.',
            'Goal: isolate the variable using inverse operations.',
            'Whatever you do to one side, you MUST do to the other side.',
            'Check your answer by substituting back into the original equation.',
          ],
        },
        {
          emoji: '📈',
          title: 'Linear Functions & Graphing',
          points: [
            'Slope-intercept form: y = mx + b, where m = slope and b = y-intercept.',
            'Slope measures steepness: rise/run = (y₂ - y₁)/(x₂ - x₁).',
            'A positive slope goes up left-to-right; negative goes down.',
            'Two lines are parallel if they have equal slopes; perpendicular if slopes are negative reciprocals.',
          ],
        },
        {
          emoji: '🔣',
          title: 'Inequalities',
          points: [
            'Inequalities use <, >, ≤, ≥ instead of =.',
            'Solve like equations — but flip the inequality sign when multiplying or dividing by a negative.',
            'Graph solutions on a number line: open circle = strict, closed circle = includes endpoint.',
            'Compound inequalities: "and" means both must be true; "or" means at least one.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Variable', definition: 'A symbol representing an unknown or changeable quantity.' },
        { term: 'Coefficient', definition: 'The number multiplied by a variable in a term (e.g., 5 in 5x).' },
        { term: 'Slope', definition: 'The rate of change of a line — how steep it is.' },
        { term: 'Y-intercept', definition: 'Where the line crosses the y-axis (x = 0).' },
        { term: 'Distributive Property', definition: 'a(b + c) = ab + ac — distribute the factor to each term.' },
        { term: 'Domain', definition: 'The set of all valid input (x) values for a function.' },
        { term: 'Range', definition: 'The set of all possible output (y) values of a function.' },
        { term: 'Quadratic', definition: 'A polynomial of degree 2, written as ax² + bx + c.' },
      ],
      studyTips: [
        'Always write out each step — skipping steps leads to mistakes.',
        'Check your answers by plugging them back into the original equation.',
        'Practice a little every day rather than cramming before a test.',
        'Draw a graph whenever possible — visual representations make abstract concepts concrete.',
      ],
    },
    Calculus: {
      title: 'Introduction to Calculus',
      overview: 'Calculus is the mathematics of change. It has two main branches: differential calculus (derivatives) and integral calculus (integrals), linked by the Fundamental Theorem of Calculus.',
      sections: [
        {
          emoji: '📉',
          title: 'Limits',
          points: [
            'A limit describes the value a function approaches as x approaches a point.',
            'Notation: lim(x→a) f(x) = L means f(x) gets closer to L as x approaches a.',
            'Limits can exist even if the function is undefined at that point.',
            'One-sided limits: left-hand limit (x→a⁻) and right-hand limit (x→a⁺).',
          ],
        },
        {
          emoji: '🔻',
          title: 'Derivatives',
          points: [
            'The derivative f\'(x) measures the instantaneous rate of change of f at x.',
            'Geometrically, f\'(x) is the slope of the tangent line to the curve at x.',
            'Power Rule: d/dx[xⁿ] = nxⁿ⁻¹.',
            'Chain Rule: d/dx[f(g(x))] = f\'(g(x)) · g\'(x).',
          ],
        },
        {
          emoji: '∫',
          title: 'Integrals',
          points: [
            'The integral ∫f(x)dx represents the area under the curve of f(x).',
            'Antiderivative: a function F such that F\'(x) = f(x).',
            'Power Rule for integration: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C.',
            'Definite integral ∫[a,b] f(x)dx gives the exact area between x=a and x=b.',
          ],
        },
        {
          emoji: '🔗',
          title: 'Fundamental Theorem of Calculus',
          points: [
            'Part 1: If F(x) = ∫[a,x] f(t)dt, then F\'(x) = f(x).',
            'Part 2: ∫[a,b] f(x)dx = F(b) - F(a) where F is any antiderivative.',
            'This connects differentiation and integration — they are inverse operations.',
            'Practical: to evaluate a definite integral, find the antiderivative then evaluate at bounds.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Limit', definition: 'The value a function approaches as the input approaches a point.' },
        { term: 'Derivative', definition: 'The instantaneous rate of change of a function.' },
        { term: 'Integral', definition: 'The area under a curve; the antiderivative of a function.' },
        { term: 'Continuity', definition: 'A function is continuous if it has no breaks, jumps, or holes.' },
        { term: 'Chain Rule', definition: 'Rule for differentiating composite functions.' },
        { term: 'Antiderivative', definition: 'A function F whose derivative equals f.' },
      ],
      studyTips: [
        'Master limits before moving to derivatives — they are the foundation.',
        'Practice derivative rules daily until they are automatic.',
        'Connect every concept to its geometric meaning (slopes, areas).',
        'Work through problems step-by-step and write all work clearly.',
      ],
    },
  },
  science: {
    default: {
      title: 'Cell Biology',
      overview: 'The cell is the basic unit of life. Understanding cell structure and function is the foundation of all biology.',
      sections: [
        {
          emoji: '🧱',
          title: 'Cell Structure',
          points: [
            'Prokaryotic cells (bacteria) lack a nucleus; eukaryotic cells have a membrane-bound nucleus.',
            'Cell membrane: phospholipid bilayer that controls what enters and exits the cell.',
            'Nucleus: contains DNA and directs cell activities; has a nuclear envelope.',
            'Cytoplasm: jelly-like fluid filling the cell; organelles are suspended in it.',
          ],
        },
        {
          emoji: '⚡',
          title: 'Cell Energy: Mitochondria & Chloroplasts',
          points: [
            'Mitochondria ("powerhouses") produce ATP through cellular respiration.',
            'Equation: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP.',
            'Chloroplasts (in plant cells) perform photosynthesis: sunlight → glucose.',
            'Equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂.',
          ],
        },
        {
          emoji: '🔄',
          title: 'Cell Division',
          points: [
            'Mitosis: produces 2 identical daughter cells (growth, repair). Phases: PMAT.',
            'Meiosis: produces 4 genetically unique gametes (sex cells) with half the chromosomes.',
            'DNA replication occurs during S phase before cell division.',
            'Checkpoints in the cell cycle prevent division of damaged cells (cancer connection).',
          ],
        },
        {
          emoji: '📡',
          title: 'Cell Transport',
          points: [
            'Passive transport: no energy needed; moves from high → low concentration.',
            'Active transport: requires ATP; moves substances against their concentration gradient.',
            'Osmosis: diffusion of water across a semipermeable membrane.',
            'Endocytosis/exocytosis: engulf or expel large particles using vesicles.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Organelle', definition: 'Specialized structure inside a cell that performs a specific function.' },
        { term: 'ATP', definition: 'Adenosine triphosphate — the main energy currency of cells.' },
        { term: 'Mitosis', definition: 'Cell division producing two genetically identical daughter cells.' },
        { term: 'Osmosis', definition: 'Diffusion of water across a semipermeable membrane.' },
        { term: 'DNA', definition: 'Deoxyribonucleic acid — carries genetic information.' },
        { term: 'Ribosome', definition: 'Organelle that synthesizes proteins from mRNA instructions.' },
        { term: 'Homeostasis', definition: 'Maintaining a stable internal environment despite external changes.' },
        { term: 'Enzyme', definition: 'A protein catalyst that speeds up chemical reactions in cells.' },
      ],
      studyTips: [
        'Draw and label a cell diagram from memory — it forces you to recall every part.',
        'Use the "PMAT" mnemonic for mitosis phases: Prophase, Metaphase, Anaphase, Telophase.',
        'Connect structure to function: why does the mitochondria have folded inner membranes?',
        'Compare prokaryotes vs. eukaryotes in a side-by-side table.',
      ],
    },
    Chemistry: {
      title: 'Chemistry: Atoms & Reactions',
      overview: 'Chemistry studies matter, its properties, and how it transforms. Understanding the atom is the key to understanding all of chemistry.',
      sections: [
        {
          emoji: '⚛️',
          title: 'Atomic Structure',
          points: [
            'Atoms contain protons (+), neutrons (neutral) in the nucleus, and electrons (-) in orbitals.',
            'Atomic number = number of protons (defines the element).',
            'Mass number = protons + neutrons.',
            'Isotopes: same element, different number of neutrons (e.g., C-12 vs C-14).',
          ],
        },
        {
          emoji: '🔗',
          title: 'Chemical Bonding',
          points: [
            'Ionic bonds: electron transfer between metal and nonmetal. Results in ions.',
            'Covalent bonds: electron sharing between nonmetals. Can be polar or nonpolar.',
            'Electronegativity difference determines bond type: >1.7 ionic, 0.4-1.7 polar covalent, <0.4 nonpolar.',
            'Hydrogen bonds: weak attractions between H and F, O, or N. Critical in water and DNA.',
          ],
        },
        {
          emoji: '⚗️',
          title: 'Chemical Reactions',
          points: [
            'Law of Conservation of Mass: atoms are never created or destroyed in a reaction.',
            'Balancing equations: ensure equal atoms of each element on both sides.',
            'Types: synthesis (A+B→AB), decomposition, single replacement, double replacement, combustion.',
            'Exothermic reactions release heat (negative ΔH); endothermic absorb heat (positive ΔH).',
          ],
        },
        {
          emoji: '🧪',
          title: 'Acids, Bases & pH',
          points: [
            'Acids donate H⁺ ions (protons); bases accept H⁺ ions.',
            'pH scale: 0–14. Below 7 = acidic, 7 = neutral, above 7 = basic.',
            'Strong acids/bases fully dissociate; weak ones partially dissociate.',
            'Neutralization: acid + base → salt + water.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Element', definition: 'A pure substance made of only one type of atom.' },
        { term: 'Compound', definition: 'Two or more elements chemically bonded in fixed ratios.' },
        { term: 'Mole', definition: '6.022×10²³ particles — the chemist\'s counting unit.' },
        { term: 'Molarity', definition: 'Moles of solute per liter of solution (mol/L).' },
        { term: 'Oxidation', definition: 'Loss of electrons (OIL: Oxidation Is Loss).' },
        { term: 'Reduction', definition: 'Gain of electrons (RIG: Reduction Is Gain).' },
      ],
      studyTips: [
        'Memorize the polyatomic ions — they appear in almost every reaction problem.',
        'Practice balancing equations every day until it feels natural.',
        'Use OIL RIG to remember oxidation and reduction.',
        'Make a table of strong acids/bases and commit them to memory.',
      ],
    },
  },
  history: {
    default: {
      title: 'World War II',
      overview: 'World War II (1939–1945) was the deadliest conflict in human history, involving over 30 nations and resulting in 70–85 million casualties. It reshaped the global political order.',
      sections: [
        {
          emoji: '💥',
          title: 'Causes of WWII',
          points: [
            'Treaty of Versailles (1919): humiliated Germany with reparations, territorial losses, and "war guilt."',
            'The Great Depression caused economic collapse, creating fertile ground for extremist ideologies.',
            'Rise of fascism: Mussolini in Italy (1922), Hitler in Germany (1933).',
            'Policy of Appeasement: Britain and France tried to satisfy Hitler — Munich Agreement (1938) gave him Sudetenland.',
          ],
        },
        {
          emoji: '🌍',
          title: 'Major Theaters & Turning Points',
          points: [
            'European Theater: Germany\'s Blitzkrieg conquered France (1940). Battle of Britain (1940) — RAF repels Luftwaffe.',
            'Eastern Front: Operation Barbarossa (1941) — Germany invades USSR. Battle of Stalingrad (1942-43) is the turning point.',
            'Pacific Theater: Japan attacks Pearl Harbor Dec 7, 1941 — US enters war. Battle of Midway (1942) cripples Japanese navy.',
            'North Africa & Italy: Allies defeat Rommel at El Alamein (1942); invade Italy (1943).',
          ],
        },
        {
          emoji: '🏁',
          title: 'Allied Victory',
          points: [
            'D-Day (June 6, 1944): Allied invasion of Normandy — largest amphibious operation in history.',
            'Germany surrendered May 8, 1945 (V-E Day) after Soviet forces took Berlin.',
            'Manhattan Project developed atomic bombs; dropped on Hiroshima (Aug 6) and Nagasaki (Aug 9) 1945.',
            'Japan surrendered September 2, 1945 (V-J Day), ending the war.',
          ],
        },
        {
          emoji: '🌐',
          title: 'Aftermath & Legacy',
          points: [
            'Holocaust: Nazi Germany systematically murdered ~6 million Jews and millions of others.',
            'United Nations founded 1945 to maintain international peace.',
            'Marshall Plan: US provided $13 billion to rebuild Western Europe.',
            'Cold War began as US-Soviet tensions replaced wartime alliance.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Blitzkrieg', definition: '"Lightning war" — rapid combined-arms attacks using tanks and air support.' },
        { term: 'Holocaust', definition: 'Nazi Germany\'s genocide of ~6 million Jewish people and others.' },
        { term: 'D-Day', definition: 'June 6, 1944 — Allied amphibious assault on Normandy beaches.' },
        { term: 'Appeasement', definition: 'Policy of conceding to aggressor demands to avoid war.' },
        { term: 'Manhattan Project', definition: 'US program to develop the first nuclear weapons.' },
        { term: 'V-E Day', definition: 'Victory in Europe Day — May 8, 1945, Germany surrenders.' },
        { term: 'Axis Powers', definition: 'Germany, Italy, and Japan — the main adversaries of the Allies.' },
        { term: 'Allies', definition: 'US, UK, USSR, France, and others opposing the Axis powers.' },
      ],
      studyTips: [
        'Create a timeline of key events — chronological order is essential for history.',
        'Focus on cause-and-effect chains: what caused each event, what resulted from it.',
        'Learn the "Big Three" leaders: Churchill, Roosevelt/Truman, Stalin.',
        'Use maps to understand how geography shaped military strategy.',
      ],
    },
    'US History': {
      title: 'US History: Foundations to Civil War',
      overview: 'From colonial settlement through the Civil War, the United States was forged through revolution, expansion, and profound conflict over freedom and equality.',
      sections: [
        {
          emoji: '🦅',
          title: 'Founding of the Nation',
          points: [
            'Thirteen Colonies declared independence July 4, 1776 — Declaration of Independence.',
            'American Revolution (1775-1783) defeated Britain; Treaty of Paris granted independence.',
            'Constitution ratified 1788 — established three branches of government.',
            'Bill of Rights (1791): first 10 amendments protecting individual liberties.',
          ],
        },
        {
          emoji: '🌱',
          title: 'Westward Expansion',
          points: [
            'Louisiana Purchase (1803): Jefferson doubled US size for ~$15 million.',
            'Manifest Destiny: belief that US was destined to span continent to Pacific.',
            'Indian Removal Act (1830): forced relocation of Native Americans; Trail of Tears.',
            'Mexican-American War (1846-48): US gains California, Texas, Southwest.',
          ],
        },
        {
          emoji: '⛓️',
          title: 'Slavery & Sectional Conflict',
          points: [
            'Missouri Compromise (1820): maintained balance of slave/free states.',
            'Abolitionists like Frederick Douglass and Harriet Beecher Stowe galvanized anti-slavery sentiment.',
            'Dred Scott decision (1857): Supreme Court ruled enslaved people were not citizens.',
            'John Brown\'s raid on Harper\'s Ferry (1859) intensified Southern fears.',
          ],
        },
        {
          emoji: '⚔️',
          title: 'Civil War (1861-1865)',
          points: [
            'South seceded after Lincoln\'s election; Confederate States of America formed.',
            'Emancipation Proclamation (1863): freed enslaved people in rebel states; shifted war\'s moral purpose.',
            'Battle of Gettysburg (1863): turning point — Union victory stopped Confederate advance North.',
            'Lee surrendered at Appomattox Court House April 9, 1865; Lincoln assassinated April 14.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Manifest Destiny', definition: 'Belief that Americans were divinely destined to expand across the continent.' },
        { term: 'Abolition', definition: 'The movement to end slavery.' },
        { term: 'Secession', definition: 'Withdrawal of Southern states from the Union to form the Confederacy.' },
        { term: 'Reconstruction', definition: 'Post-Civil War period of rebuilding and integrating the South.' },
        { term: 'Federalism', definition: 'Division of power between national and state governments.' },
      ],
      studyTips: [
        'Make a cause-effect chart for each major conflict.',
        'Learn key dates: 1776, 1787, 1803, 1861, 1865.',
        'Understand both Northern and Southern perspectives — history is complex.',
        'Use primary sources: quotes from Lincoln, Douglass, and others bring history alive.',
      ],
    },
  },
  spanish: {
    default: {
      title: 'Spanish: Essential Vocabulary & Basics',
      overview: 'Building a strong vocabulary foundation is the key to Spanish fluency. Focus on high-frequency words and patterns first.',
      sections: [
        {
          emoji: '👋',
          title: 'Greetings & Basics',
          points: [
            'Hola = Hello | Adiós = Goodbye | Buenos días = Good morning',
            'Por favor = Please | Gracias = Thank you | De nada = You\'re welcome',
            '¿Cómo estás? = How are you? | Bien, gracias = Fine, thank you',
            '¿Cómo te llamas? = What is your name? | Me llamo... = My name is...',
          ],
        },
        {
          emoji: '🔡',
          title: 'Pronouns & SER vs. ESTAR',
          points: [
            'Subject pronouns: yo, tú, él/ella, nosotros, vosotros, ellos/ellas.',
            'SER: permanent characteristics — identity, origin, time, material. (Soy estudiante)',
            'ESTAR: temporary states — feelings, location, ongoing actions. (Estoy cansado)',
            'Tip: "I am a doctor" (ser) vs "I am tired" (estar) — permanent vs. temporary.',
          ],
        },
        {
          emoji: '🕐',
          title: 'Present Tense Conjugation',
          points: [
            '-AR verbs (hablar): hablo, hablas, habla, hablamos, habláis, hablan.',
            '-ER verbs (comer): como, comes, come, comemos, coméis, comen.',
            '-IR verbs (vivir): vivo, vives, vive, vivimos, vivís, viven.',
            'Stem-changing verbs change the stem vowel in some forms: e→ie (querer), o→ue (poder).',
          ],
        },
        {
          emoji: '🔢',
          title: 'Numbers & Days',
          points: [
            '1-10: uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez.',
            '11-20: once, doce, trece, catorce, quince, dieciséis, diecisiete, dieciocho, diecinueve, veinte.',
            'Days: lunes, martes, miércoles, jueves, viernes, sábado, domingo.',
            'Months: enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Sustantivo', definition: 'Noun — a person, place, thing, or idea.' },
        { term: 'Verbo', definition: 'Verb — an action or state of being.' },
        { term: 'Adjetivo', definition: 'Adjective — describes a noun. Agrees in gender and number.' },
        { term: 'Conjugación', definition: 'Changing a verb to match subject, tense, and mood.' },
        { term: 'Género', definition: 'Gender — all Spanish nouns are masculine (el) or feminine (la).' },
        { term: 'Infinitivo', definition: 'The base form of a verb ending in -ar, -er, or -ir.' },
        { term: 'Acento', definition: 'Accent mark (´) that changes pronunciation or distinguishes meaning.' },
        { term: 'Reflexivo', definition: 'Reflexive verb — action done to oneself (me llamo, me levanto).' },
      ],
      studyTips: [
        'Label objects around your house with sticky notes in Spanish.',
        'Practice 10 new vocabulary words per day using flashcards.',
        'Speak out loud — Spanish pronunciation takes practice.',
        'Watch Spanish TV shows with subtitles to hear natural speech patterns.',
      ],
    },
    'Past Tense': {
      title: 'Spanish Past Tense: Preterite & Imperfect',
      overview: 'Spanish has two main past tenses: the preterite (completed actions) and the imperfect (ongoing/habitual past). Knowing when to use each is essential.',
      sections: [
        {
          emoji: '⏮️',
          title: 'Preterite Tense (Pretérito)',
          points: [
            'Use for completed, specific actions with a clear start and end.',
            '-AR: hablé, hablaste, habló, hablamos, hablasteis, hablaron.',
            '-ER/-IR: comí, comiste, comió, comimos, comisteis, comieron.',
            'Irregular preterits: ser/ir → fui, fue, fuimos; tener → tuve; estar → estuve.',
          ],
        },
        {
          emoji: '🌀',
          title: 'Imperfect Tense (Imperfecto)',
          points: [
            'Use for habitual/repeated past actions, descriptions, or ongoing background actions.',
            '-AR: hablaba, hablabas, hablaba, hablábamos, hablabais, hablaban.',
            '-ER/-IR: comía, comías, comía, comíamos, comíais, comían.',
            'Only 3 irregulars: ser (era), ir (iba), ver (veía).',
          ],
        },
        {
          emoji: '🆚',
          title: 'Preterite vs. Imperfect',
          points: [
            'Preterite: "Yesterday, I ate tacos." (specific, completed).',
            'Imperfect: "When I was a child, I ate tacos every Friday." (habitual).',
            'Together: "I was eating (imperfect) when she called (preterite)."',
            'Time cues: ayer, anoche, una vez → preterite; siempre, todos los días → imperfect.',
          ],
        },
        {
          emoji: '🔀',
          title: 'Trigger Words',
          points: [
            'Preterite triggers: ayer (yesterday), anoche (last night), una vez (once), de repente (suddenly).',
            'Imperfect triggers: siempre (always), todos los días (every day), a menudo (often), cuando era niño (when I was a child).',
            'Both tenses often appear in the same sentence — background (imperfect) + event (preterite).',
            'Practice by narrating a childhood memory using both tenses.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Pretérito', definition: 'Past tense for completed, one-time actions.' },
        { term: 'Imperfecto', definition: 'Past tense for habitual, ongoing, or descriptive past.' },
        { term: 'Irregular', definition: 'Verb that doesn\'t follow standard conjugation patterns.' },
        { term: 'Stem-changing', definition: 'Verbs where the vowel in the stem changes in certain forms.' },
      ],
      studyTips: [
        'Use the "DISHES" acronym for imperfect: Description, Interrupted action, Setting, Habitual action, Emotion, States of being.',
        'Write a diary entry in Spanish about your day — forces real usage.',
        'Create a mini-story using both tenses: description (imperfect) + what happened (preterite).',
      ],
    },
  },
  english: {
    default: {
      title: 'Literary Analysis: Themes, Devices & Structure',
      overview: 'Literary analysis is the practice of examining how and why a text says what it says. Great analysis goes beyond plot summary to uncover deeper meaning.',
      sections: [
        {
          emoji: '💡',
          title: 'Themes',
          points: [
            'A theme is the central message or insight about human experience a work conveys.',
            'Themes are NOT plot summaries — "a boy learns to read" is plot; "literacy is power" is theme.',
            'Universal themes: love, identity, justice, loss, coming-of-age, power, courage.',
            'Support themes with textual evidence: quote the text, then analyze the quote.',
          ],
        },
        {
          emoji: '🎭',
          title: 'Literary Devices',
          points: [
            'Metaphor: direct comparison without "like/as" — "Life is a journey."',
            'Simile: comparison using "like" or "as" — "She ran like the wind."',
            'Symbolism: an object represents something beyond itself — the green light in Gatsby.',
            'Irony: three types — verbal (say ≠ mean), situational (unexpected outcome), dramatic (reader knows more than character).',
          ],
        },
        {
          emoji: '🏗️',
          title: 'Story Structure',
          points: [
            'Freytag\'s Pyramid: Exposition → Rising Action → Climax → Falling Action → Resolution.',
            'Conflict types: Man vs. Man, Man vs. Self, Man vs. Nature, Man vs. Society.',
            'Point of view: 1st person (I/we), 2nd (you), 3rd limited (he/she knows one character), 3rd omniscient (knows all).',
            'Foreshadowing: hints at future events — creates tension and unity.',
          ],
        },
        {
          emoji: '✍️',
          title: 'Writing Strong Analysis',
          points: [
            'Thesis statement: your specific argument about the text — must be arguable.',
            'PEEL structure: Point, Evidence, Explanation, Link back.',
            'Embed quotes smoothly: introduce + quote + explain — never drop a quote without analysis.',
            'Avoid plot summary — analyze WHY the author made each choice.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Theme', definition: 'The central insight or message about human experience in a work.' },
        { term: 'Motif', definition: 'A recurring element (image, phrase, symbol) that reinforces theme.' },
        { term: 'Allegory', definition: 'A story where characters/events symbolize abstract ideas or moral lessons.' },
        { term: 'Alliteration', definition: 'Repetition of initial consonant sounds: "Peter Piper picked..."' },
        { term: 'Protagonist', definition: 'The main character who drives the story forward.' },
        { term: 'Antagonist', definition: 'The force opposing the protagonist.' },
        { term: 'Diction', definition: 'An author\'s word choice — formal vs. informal, simple vs. complex.' },
        { term: 'Tone', definition: 'The author\'s attitude toward the subject — sarcastic, hopeful, somber, etc.' },
      ],
      studyTips: [
        'Annotate while you read — mark devices, questions, and key passages.',
        'Ask "why?" about every author choice — why this word? why this structure?',
        'Practice writing thesis statements that make a specific arguable claim.',
        'Read sample A-level essays to see what strong analysis looks like.',
      ],
    },
    Grammar: {
      title: 'English Grammar Essentials',
      overview: 'Solid grammar underpins all clear writing. Focus on the rules that cause the most errors: punctuation, sentence structure, and agreement.',
      sections: [
        {
          emoji: '✏️',
          title: 'Parts of Speech',
          points: [
            'Noun: person, place, thing, or idea (teacher, Paris, love).',
            'Verb: action or state (run, is, become). Must agree with subject in number.',
            'Adjective: modifies a noun (the tall, dark stranger).',
            'Adverb: modifies verbs, adjectives, or other adverbs — often ends in -ly.',
          ],
        },
        {
          emoji: '🔩',
          title: 'Sentence Structure',
          points: [
            'Simple: one independent clause — "She studied hard."',
            'Compound: two independent clauses joined by a conjunction — "She studied, and she passed."',
            'Complex: independent + dependent clause — "Although she was tired, she studied."',
            'Fragment: incomplete thought missing subject or verb — AVOID in formal writing.',
          ],
        },
        {
          emoji: '🔣',
          title: 'Punctuation Rules',
          points: [
            'Comma before coordinating conjunctions (FANBOYS) joining independent clauses.',
            'Semicolon joins two independent clauses without a conjunction.',
            'Colon introduces a list or explanation: only use after a complete clause.',
            'Apostrophe: possession (Sarah\'s book) or contraction (don\'t = do not).',
          ],
        },
        {
          emoji: '🤝',
          title: 'Common Errors to Avoid',
          points: [
            'Subject-verb agreement: "The team plays well" (singular team) vs. "The players play well."',
            'Their/There/They\'re: possessive / place / they are.',
            'Its/It\'s: possessive pronoun / contraction of "it is."',
            'Dangling modifier: "Running down the street, the bus passed me." (WHO was running?)',
          ],
        },
      ],
      keyTerms: [
        { term: 'Clause', definition: 'A group of words with a subject and verb. Can be independent or dependent.' },
        { term: 'Conjunction', definition: 'A word connecting clauses: coordinating (FANBOYS) or subordinating.' },
        { term: 'Modifier', definition: 'A word or phrase that describes another element in the sentence.' },
        { term: 'Parallel structure', definition: 'Using the same grammatical form for items in a list or comparison.' },
      ],
      studyTips: [
        'Read your writing aloud — your ear catches errors your eye misses.',
        'Keep a list of YOUR common errors and actively hunt for them when editing.',
        'Diagram sentences to understand grammatical relationships.',
        'Practice punctuation rules with short exercises daily.',
      ],
    },
  },
};

// ---------------------------------------------------------------------------
// Quiz questions
// ---------------------------------------------------------------------------

const quizzes: Record<Subject, QuizQuestion[]> = {
  math: [
    { id: '1', question: 'What is the slope of the line y = 3x - 7?', options: ['7', '-7', '3', '-3'], correctIndex: 2, explanation: 'In y = mx + b, m is the slope. Here m = 3.' },
    { id: '2', question: 'Solve for x: 2x + 6 = 14', options: ['x = 4', 'x = 10', 'x = 3', 'x = 8'], correctIndex: 0, explanation: 'Subtract 6 from both sides: 2x = 8. Divide by 2: x = 4.' },
    { id: '3', question: 'What is the y-intercept of y = -2x + 5?', options: ['-2', '5', '2', '-5'], correctIndex: 1, explanation: 'In y = mx + b, b is the y-intercept. Here b = 5.' },
    { id: '4', question: 'Which property states a(b+c) = ab + ac?', options: ['Commutative', 'Associative', 'Distributive', 'Identity'], correctIndex: 2, explanation: 'The Distributive Property: multiply the factor by each term inside parentheses.' },
    { id: '5', question: 'What is the degree of the polynomial 4x³ + 2x - 7?', options: ['1', '2', '3', '4'], correctIndex: 2, explanation: 'The degree is the highest exponent. The highest power of x is 3.' },
    { id: '6', question: 'If f(x) = x² + 3, what is f(4)?', options: ['16', '19', '13', '7'], correctIndex: 1, explanation: 'f(4) = 4² + 3 = 16 + 3 = 19.' },
    { id: '7', question: 'What are the roots of x² - 5x + 6 = 0?', options: ['x = 1, 6', 'x = 2, 3', 'x = -2, -3', 'x = -1, 6'], correctIndex: 1, explanation: 'Factor: (x-2)(x-3) = 0. Roots are x = 2 and x = 3.' },
    { id: '8', question: 'Which inequality is equivalent to -3x > 12?', options: ['x > -4', 'x < -4', 'x > 4', 'x < 4'], correctIndex: 1, explanation: 'Divide both sides by -3 and FLIP the sign: x < -4.' },
    { id: '9', question: 'Two lines are parallel when they have...', options: ['Equal y-intercepts', 'Equal slopes', 'Opposite slopes', 'Reciprocal slopes'], correctIndex: 1, explanation: 'Parallel lines have equal slopes and different y-intercepts.' },
    { id: '10', question: 'What is the slope of a horizontal line?', options: ['Undefined', '1', '-1', '0'], correctIndex: 3, explanation: 'A horizontal line has no rise over any run — slope = 0.' },
  ],
  science: [
    { id: '1', question: 'Which organelle is known as the "powerhouse of the cell"?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Vacuole'], correctIndex: 2, explanation: 'Mitochondria produce ATP through cellular respiration, providing energy for the cell.' },
    { id: '2', question: 'What process do plants use to make their own food?', options: ['Cellular Respiration', 'Fermentation', 'Photosynthesis', 'Mitosis'], correctIndex: 2, explanation: 'Photosynthesis converts light energy + CO₂ + H₂O into glucose and O₂.' },
    { id: '3', question: 'How many chromosomes do human somatic (body) cells have?', options: ['23', '46', '92', '36'], correctIndex: 1, explanation: 'Human body cells are diploid with 46 chromosomes (23 pairs).' },
    { id: '4', question: 'What is the basic unit of life?', options: ['Atom', 'Molecule', 'Organ', 'Cell'], correctIndex: 3, explanation: 'The cell is the smallest structural and functional unit of all living things.' },
    { id: '5', question: 'Which type of transport requires energy (ATP)?', options: ['Osmosis', 'Diffusion', 'Active Transport', 'Passive Transport'], correctIndex: 2, explanation: 'Active transport uses ATP to move substances AGAINST their concentration gradient.' },
    { id: '6', question: 'What does DNA stand for?', options: ['Deoxyribose Nucleic Acid', 'Deoxyribonucleic Acid', 'Double Nucleic Acid', 'Diribonucleic Acid'], correctIndex: 1, explanation: 'DNA = Deoxyribonucleic Acid, the molecule carrying genetic information.' },
    { id: '7', question: 'Which phase of mitosis do chromosomes line up at the cell equator?', options: ['Prophase', 'Anaphase', 'Telophase', 'Metaphase'], correctIndex: 3, explanation: 'In Metaphase, chromosomes align at the metaphase plate (cell\'s equator).' },
    { id: '8', question: 'What is the pH of a neutral substance?', options: ['0', '14', '7', '3'], correctIndex: 2, explanation: 'pH 7 is neutral. Below 7 is acidic; above 7 is basic.' },
    { id: '9', question: 'Which macromolecule is the primary source of energy for cells?', options: ['Proteins', 'Lipids', 'Carbohydrates', 'Nucleic acids'], correctIndex: 2, explanation: 'Carbohydrates (especially glucose) are the cell\'s primary energy source.' },
    { id: '10', question: 'What is the term for maintaining a stable internal environment?', options: ['Metabolism', 'Homeostasis', 'Evolution', 'Adaptation'], correctIndex: 1, explanation: 'Homeostasis is the process by which organisms regulate their internal conditions.' },
  ],
  history: [
    { id: '1', question: 'What event triggered the start of World War I?', options: ['Sinking of the Lusitania', 'Assassination of Archduke Franz Ferdinand', 'Invasion of Poland', 'Attack on Pearl Harbor'], correctIndex: 1, explanation: 'The assassination of Archduke Franz Ferdinand of Austria in 1914 triggered the chain of alliances that led to WWI.' },
    { id: '2', question: 'In what year did Germany invade Poland, starting World War II?', options: ['1937', '1938', '1939', '1941'], correctIndex: 2, explanation: 'Germany invaded Poland on September 1, 1939, prompting Britain and France to declare war.' },
    { id: '3', question: 'Who was the leader of Nazi Germany?', options: ['Benito Mussolini', 'Joseph Stalin', 'Adolf Hitler', 'Francisco Franco'], correctIndex: 2, explanation: 'Adolf Hitler led the Nazi Party and became dictator of Germany in 1933.' },
    { id: '4', question: 'What was the name of the Allied invasion of Normandy on June 6, 1944?', options: ['Operation Barbarossa', 'Operation Market Garden', 'Operation Overlord (D-Day)', 'Operation Sea Lion'], correctIndex: 2, explanation: 'Operation Overlord, commonly known as D-Day, was the Allied amphibious assault on Normandy beaches.' },
    { id: '5', question: 'The US entered WWII after the attack on which naval base?', options: ['Guam', 'Wake Island', 'Pearl Harbor', 'Midway'], correctIndex: 2, explanation: 'Japan\'s surprise attack on Pearl Harbor, Hawaii on December 7, 1941 brought the US into the war.' },
    { id: '6', question: 'What treaty ended World War I and imposed harsh terms on Germany?', options: ['Treaty of Paris', 'Treaty of Versailles', 'Treaty of Ghent', 'Treaty of Brest-Litovsk'], correctIndex: 1, explanation: 'The Treaty of Versailles (1919) ended WWI and placed war guilt, reparations, and territorial losses on Germany.' },
    { id: '7', question: 'Which battle is considered the turning point on the Eastern Front?', options: ['Battle of Kursk', 'Battle of Moscow', 'Battle of Stalingrad', 'Siege of Leningrad'], correctIndex: 2, explanation: 'The Battle of Stalingrad (1942-43) ended with a decisive Soviet victory and marked Germany\'s first major defeat.' },
    { id: '8', question: 'What was the Manhattan Project?', options: ['Plan to rebuild NYC after WWII', 'US program to develop the atomic bomb', 'German plan to capture New York', 'Allied strategy to liberate France'], correctIndex: 1, explanation: 'The Manhattan Project was the top-secret US program that developed the first nuclear weapons.' },
    { id: '9', question: 'What does V-E Day stand for, and when did it occur?', options: ['Victory of Europe, May 8 1945', 'Valor of England, April 30 1945', 'Victory in Europe, June 6 1944', 'Valor and Effort, May 8 1945'], correctIndex: 0, explanation: 'V-E Day (Victory in Europe Day) was May 8, 1945, when Germany formally surrendered.' },
    { id: '10', question: 'Approximately how many Jewish people were killed in the Holocaust?', options: ['1 million', '3 million', '6 million', '9 million'], correctIndex: 2, explanation: 'The Holocaust resulted in the systematic murder of approximately 6 million Jewish people by Nazi Germany.' },
  ],
  spanish: [
    { id: '1', question: '¿Cómo se dice "Thank you" en español?', options: ['Por favor', 'De nada', 'Gracias', 'Hola'], correctIndex: 2, explanation: '"Gracias" means "thank you." "De nada" means "you\'re welcome," and "por favor" means "please."' },
    { id: '2', question: 'Which pronoun means "we" in Spanish?', options: ['Ellos', 'Ustedes', 'Nosotros', 'Vosotros'], correctIndex: 2, explanation: '"Nosotros" = we (masculine or mixed group). "Vosotros" is used in Spain only; "ellos" = they.' },
    { id: '3', question: 'How do you say "I eat" in Spanish?', options: ['Como', 'Comer', 'Comé', 'Comes'], correctIndex: 0, explanation: '"Como" is the yo form of "comer" (to eat) in the present tense.' },
    { id: '4', question: 'Which verb means "to be" for permanent characteristics (nationality, identity)?', options: ['Estar', 'Tener', 'Ser', 'Hacer'], correctIndex: 2, explanation: '"Ser" is used for permanent characteristics: origin, identity, material. "Estar" is for temporary states.' },
    { id: '5', question: 'What is the Spanish word for "Wednesday"?', options: ['Martes', 'Jueves', 'Miércoles', 'Viernes'], correctIndex: 2, explanation: 'Miércoles = Wednesday. Martes = Tuesday, Jueves = Thursday, Viernes = Friday.' },
    { id: '6', question: 'How do you conjugate "hablar" (to speak) in the yo form?', options: ['Hablo', 'Hablas', 'Habla', 'Hablamos'], correctIndex: 0, explanation: '"Hablo" is the first-person singular (yo) conjugation of hablar in present tense.' },
    { id: '7', question: 'What does "¿Dónde está el baño?" mean?', options: ['Where is the bus?', 'Where is the bank?', 'Where is the bathroom?', 'Where is the food?'], correctIndex: 2, explanation: '"¿Dónde está el baño?" = "Where is the bathroom?" A very useful phrase!' },
    { id: '8', question: 'What is the plural of "el libro" (the book)?', options: ['Los libros', 'Las libros', 'El libros', 'Los libro'], correctIndex: 0, explanation: '"El libro" (masculine singular) → "los libros" (masculine plural). Articles and nouns must agree in gender and number.' },
    { id: '9', question: 'Which tense is used for habitual past actions in Spanish?', options: ['Futuro', 'Pretérito', 'Subjuntivo', 'Imperfecto'], correctIndex: 3, explanation: 'The imperfect tense is used for habitual or repeated past actions ("I used to eat there every day").' },
    { id: '10', question: 'How do you say "I am 16 years old" in Spanish?', options: ['Soy 16 años', 'Tengo 16 años', 'Estoy 16 años', 'Tengo 16 año'], correctIndex: 1, explanation: 'In Spanish you "have" years: "Tengo 16 años." Never use ser/estar for age — always use tener.' },
  ],
  english: [
    { id: '1', question: 'What is a metaphor?', options: ['A comparison using "like" or "as"', 'A direct comparison without "like" or "as"', 'Repetition of a consonant sound', 'An exaggeration for effect'], correctIndex: 1, explanation: 'A metaphor directly states one thing IS another: "Life is a journey." A simile uses "like" or "as."' },
    { id: '2', question: 'What type of conflict is a character struggling with their own doubts?', options: ['Man vs. Man', 'Man vs. Nature', 'Man vs. Self', 'Man vs. Society'], correctIndex: 2, explanation: 'An internal conflict — character wrestling with their own thoughts, desires, or beliefs — is Man vs. Self.' },
    { id: '3', question: 'What is the climax of a story?', options: ['The introduction of characters', 'The highest point of tension', 'The resolution of the conflict', 'Background information'], correctIndex: 1, explanation: 'The climax is the turning point of maximum tension or conflict, after which events begin to resolve.' },
    { id: '4', question: 'Which sentence contains a simile?', options: ['"The classroom was a zoo."', '"Time is a thief."', '"Her smile was like sunshine."', '"He drowned in paperwork."'], correctIndex: 2, explanation: '"Her smile was like sunshine" uses "like" to compare — that makes it a simile.' },
    { id: '5', question: 'What is the term for hints in a story about what will happen later?', options: ['Flashback', 'Foreshadowing', 'Symbolism', 'Irony'], correctIndex: 1, explanation: 'Foreshadowing provides clues or hints about events that will occur later in the narrative.' },
    { id: '6', question: 'In "1984," the concept of "Big Brother" watching everyone is an example of...', options: ['Simile', 'Alliteration', 'Symbolism', 'Onomatopoeia'], correctIndex: 2, explanation: '"Big Brother" symbolizes totalitarian surveillance and the loss of individual freedom.' },
    { id: '7', question: 'What does "omniscient narrator" mean?', options: ['A narrator inside the story who knows everything', 'A narrator outside the story who knows all characters\' thoughts', 'A narrator who only knows what one character thinks', 'A narrator who speaks directly to the reader'], correctIndex: 1, explanation: 'A third-person omniscient narrator stands outside the story and has access to all characters\' inner thoughts.' },
    { id: '8', question: 'What is the correct way to write a possessive for a singular noun?', options: ["The students book", "The student's book", "The students' book", "The students book's"], correctIndex: 1, explanation: "For a singular noun, add apostrophe + s: student's. The students' (with apostrophe after s) is for a plural noun." },
    { id: '9', question: 'Which literary device uses the sound of a word to represent its meaning?', options: ['Alliteration', 'Onomatopoeia', 'Assonance', 'Hyperbole'], correctIndex: 1, explanation: 'Onomatopoeia: words that imitate sounds — buzz, crash, sizzle, hiss.' },
    { id: '10', question: 'What is the purpose of a thesis statement?', options: ['To summarize the plot', 'To introduce the author and title', 'To present your main arguable claim', 'To list the topics you will discuss'], correctIndex: 2, explanation: 'A thesis statement presents your specific, arguable claim that the rest of the essay will support.' },
  ],
};

// ---------------------------------------------------------------------------
// Matching pairs
// ---------------------------------------------------------------------------

const matchingPairs: Record<Subject, MatchingPair[]> = {
  math: [
    { id: '1', term: 'Slope', definition: 'Rise over run; rate of change of a line' },
    { id: '2', term: 'Y-intercept', definition: 'Where the line crosses the y-axis' },
    { id: '3', term: 'Coefficient', definition: 'Number multiplied by a variable' },
    { id: '4', term: 'Variable', definition: 'Letter representing an unknown value' },
    { id: '5', term: 'Quadratic', definition: 'Polynomial of degree 2: ax² + bx + c' },
    { id: '6', term: 'Domain', definition: 'Set of all valid input (x) values' },
    { id: '7', term: 'Range', definition: 'Set of all possible output (y) values' },
    { id: '8', term: 'Distributive Property', definition: 'a(b+c) = ab + ac' },
  ],
  science: [
    { id: '1', term: 'Mitochondria', definition: 'Organelle that produces ATP (energy)' },
    { id: '2', term: 'Photosynthesis', definition: 'Process: CO₂ + H₂O + light → glucose + O₂' },
    { id: '3', term: 'Osmosis', definition: 'Diffusion of water across a semipermeable membrane' },
    { id: '4', term: 'DNA', definition: 'Molecule carrying genetic information' },
    { id: '5', term: 'Mitosis', definition: 'Cell division producing 2 identical daughter cells' },
    { id: '6', term: 'Homeostasis', definition: 'Maintaining stable internal conditions' },
    { id: '7', term: 'Enzyme', definition: 'Protein catalyst that speeds up chemical reactions' },
    { id: '8', term: 'ATP', definition: 'Main energy currency of cells' },
  ],
  history: [
    { id: '1', term: 'Blitzkrieg', definition: '"Lightning war" — rapid coordinated tank/air attacks' },
    { id: '2', term: 'D-Day', definition: 'Allied amphibious assault on Normandy, June 6 1944' },
    { id: '3', term: 'Holocaust', definition: 'Nazi genocide of ~6 million Jewish people' },
    { id: '4', term: 'Appeasement', definition: 'Policy of conceding to Hitler to avoid war' },
    { id: '5', term: 'Manhattan Project', definition: 'Secret US program to build atomic bombs' },
    { id: '6', term: 'Treaty of Versailles', definition: 'Post-WWI treaty that humiliated Germany' },
    { id: '7', term: 'V-E Day', definition: 'May 8, 1945 — Germany\'s formal surrender' },
    { id: '8', term: 'Pearl Harbor', definition: 'Japanese attack Dec 7 1941 that brought US into WWII' },
  ],
  spanish: [
    { id: '1', term: 'Hablar', definition: 'To speak' },
    { id: '2', term: 'Comer', definition: 'To eat' },
    { id: '3', term: 'Vivir', definition: 'To live' },
    { id: '4', term: 'Ser', definition: 'To be (permanent characteristics)' },
    { id: '5', term: 'Estar', definition: 'To be (temporary states/location)' },
    { id: '6', term: 'Tener', definition: 'To have' },
    { id: '7', term: 'Hacer', definition: 'To do / to make' },
    { id: '8', term: 'Ir', definition: 'To go' },
  ],
  english: [
    { id: '1', term: 'Metaphor', definition: 'Direct comparison — one thing IS another' },
    { id: '2', term: 'Simile', definition: 'Comparison using "like" or "as"' },
    { id: '3', term: 'Symbolism', definition: 'Object represents something beyond itself' },
    { id: '4', term: 'Foreshadowing', definition: 'Hints about future events in the story' },
    { id: '5', term: 'Irony', definition: 'Contrast between expectation and reality' },
    { id: '6', term: 'Theme', definition: 'Central message about human experience' },
    { id: '7', term: 'Protagonist', definition: 'Main character who drives the story' },
    { id: '8', term: 'Antagonist', definition: 'Force opposing the protagonist' },
  ],
};

// ---------------------------------------------------------------------------
// Flashcards
// ---------------------------------------------------------------------------

const flashcards: Record<Subject, Flashcard[]> = {
  math: [
    { id: '1', front: 'What is the slope-intercept form of a line?', back: 'y = mx + b\nm = slope, b = y-intercept' },
    { id: '2', front: 'How do you calculate slope between two points?', back: 'm = (y₂ - y₁) / (x₂ - x₁)\n= rise / run' },
    { id: '3', front: 'What is the Quadratic Formula?', back: 'x = [-b ± √(b² - 4ac)] / 2a\nFor ax² + bx + c = 0' },
    { id: '4', front: 'Distributive Property', back: 'a(b + c) = ab + ac\nExample: 3(x + 4) = 3x + 12' },
    { id: '5', front: 'When do you flip an inequality sign?', back: 'When multiplying or dividing BOTH SIDES by a negative number.\nExample: -2x > 6 → x < -3' },
    { id: '6', front: 'What is the difference between domain and range?', back: 'Domain = set of all valid INPUT (x) values\nRange = set of all OUTPUT (y) values' },
    { id: '7', front: 'What does the discriminant b² - 4ac tell you?', back: '> 0: two real roots\n= 0: one real root\n< 0: no real roots (complex)' },
    { id: '8', front: 'How do you add like terms?', back: 'Add/subtract the coefficients; keep the variable.\n3x + 5x = 8x\nCannot combine unlike terms: 3x + 5y ≠ 8xy' },
    { id: '9', front: 'What is a function?', back: 'A relation where each input (x) maps to exactly ONE output (y).\nVertical Line Test: if a vertical line crosses the graph twice, it is NOT a function.' },
    { id: '10', front: 'FOIL method for binomials', back: 'First, Outer, Inner, Last\n(a+b)(c+d) = ac + ad + bc + bd\nExample: (x+2)(x+3) = x² + 5x + 6' },
  ],
  science: [
    { id: '1', front: 'Equation for photosynthesis', back: '6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\nOccurs in chloroplasts' },
    { id: '2', front: 'Equation for cellular respiration', back: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP\nOccurs in mitochondria' },
    { id: '3', front: 'What are the phases of mitosis (PMAT)?', back: 'Prophase: chromosomes condense\nMetaphase: chromosomes align\nAnaphase: chromosomes separate\nTelophase: two nuclei form' },
    { id: '4', front: 'Difference between mitosis and meiosis', back: 'Mitosis: 2 identical daughter cells (diploid) → growth/repair\nMeiosis: 4 unique gametes (haploid) → reproduction' },
    { id: '5', front: 'What is osmosis?', back: 'Diffusion of WATER through a semipermeable membrane from high water concentration (low solute) to low water concentration (high solute).' },
    { id: '6', front: 'Structure of DNA', back: 'Double helix of two complementary strands\nBases pair: A-T and G-C\nSugar-phosphate backbone\nDiscovered by Watson & Crick (1953)' },
    { id: '7', front: 'What is natural selection?', back: 'Organisms with favorable traits survive and reproduce more.\n4 conditions: variation, inheritance, selection pressure, differential reproduction.' },
    { id: '8', front: 'Difference between diffusion and active transport', back: 'Diffusion: passive, high → low concentration, no energy\nActive transport: against gradient, requires ATP energy' },
    { id: '9', front: 'What is the pH scale?', back: '0–14 scale measuring acidity\n< 7 = acidic (more H⁺ ions)\n7 = neutral\n> 7 = basic/alkaline\nEach unit = 10× difference' },
    { id: '10', front: 'Central Dogma of Molecular Biology', back: 'DNA → RNA → Protein\nTranscription: DNA → mRNA (in nucleus)\nTranslation: mRNA → Protein (at ribosome)' },
  ],
  history: [
    { id: '1', front: 'What were the MAIN causes of WWI?', back: 'M - Militarism\nA - Alliances\nI - Imperialism\nN - Nationalism\n+ Assassination of Archduke Franz Ferdinand (1914)' },
    { id: '2', front: 'What was the Treaty of Versailles (1919)?', back: 'Ended WWI. Germany:\n• Accepted "war guilt"\n• Paid reparations (~$33 billion)\n• Lost territory & colonies\n• Severely limited military\nLed directly to WWII conditions' },
    { id: '3', front: 'Timeline of key WWII events', back: '1939: Germany invades Poland\n1940: Fall of France; Battle of Britain\n1941: Pearl Harbor; Operation Barbarossa\n1942: Battle of Midway; Stalingrad\n1944: D-Day\n1945: V-E Day (May) & V-J Day (Sept)' },
    { id: '4', front: 'What was the Holocaust?', back: 'Nazi Germany\'s systematic genocide of ~6 million Jews + millions of others (Roma, disabled, LGBTQ+, political opponents). Carried out via ghettos, death camps, and mobile killing units 1941-1945.' },
    { id: '5', front: 'What was the Cold War?', back: 'Political/ideological tension between US (democracy/capitalism) and USSR (communism) from ~1947–1991. No direct armed conflict — fought through proxy wars, arms race, space race, propaganda.' },
    { id: '6', front: 'Causes of WWII (5 factors)', back: '1. Harsh Treaty of Versailles\n2. Great Depression & economic crisis\n3. Rise of fascism (Hitler, Mussolini)\n4. Appeasement policy\n5. Aggressive German expansion' },
    { id: '7', front: 'What was D-Day?', back: 'June 6, 1944 — Operation Overlord\nAllied amphibious invasion of Normandy, France\nLargest seaborne invasion in history\n~156,000 Allied troops landed\nTurning point: opened Western Front' },
    { id: '8', front: 'Who were the Big Three Allied leaders of WWII?', back: 'Winston Churchill (UK)\nFranklin D. Roosevelt → Harry Truman (US)\nJoseph Stalin (USSR)\nMet at Tehran (1943), Yalta & Potsdam (1945)' },
  ],
  spanish: [
    { id: '1', front: 'Conjugate HABLAR in present tense', back: 'yo hablo\ntú hablas\nél/ella habla\nnosotros hablamos\nvosotros habláis\nellos hablan' },
    { id: '2', front: 'When do you use SER vs ESTAR?', back: 'SER: permanent — identity, origin, material, time, relationships\n"Soy americano. Es médico."\n\nESTAR: temporary — feelings, location, ongoing action\n"Estoy cansado. Está en casa."' },
    { id: '3', front: 'Conjugate IR (to go) in present tense', back: 'yo voy\ntú vas\nél/ella va\nnosotros vamos\nvosotros vais\nellos van\n\n(Highly irregular — memorize!)' },
    { id: '4', front: 'Numbers 1-20 in Spanish', back: 'uno, dos, tres, cuatro, cinco\nseis, siete, ocho, nueve, diez\nonce, doce, trece, catorce, quince\ndieciséis, diecisiete, dieciocho, diecinueve, veinte' },
    { id: '5', front: 'How to say your age in Spanish', back: 'Use TENER, not SER or ESTAR!\n"Tengo 17 años." = I am 17 years old.\n¿Cuántos años tienes? = How old are you?' },
    { id: '6', front: 'Preterite vs. Imperfect: which to use?', back: 'PRETERITE: completed, specific past action\n"Ayer comí pizza." (Yesterday I ate pizza)\n\nIMPERFECT: habitual/repeated or descriptive past\n"Cuando era niño, comía pizza todos los viernes."' },
    { id: '7', front: 'Days of the week in Spanish', back: 'lunes (Mon), martes (Tue)\nmiércoles (Wed), jueves (Thu)\nviernes (Fri), sábado (Sat)\ndomingo (Sun)\n\nAll lowercase! No capital letters.' },
    { id: '8', front: 'Common question words (interrogatives)', back: '¿Qué? = What?\n¿Quién? = Who?\n¿Dónde? = Where?\n¿Cuándo? = When?\n¿Por qué? = Why?\n¿Cómo? = How?\n¿Cuánto/a? = How much?\n¿Cuál? = Which?' },
  ],
  english: [
    { id: '1', front: 'Metaphor vs. Simile', back: 'SIMILE: comparison using "like" or "as"\n"Life is LIKE a box of chocolates."\n\nMETAPHOR: direct comparison, no like/as\n"Life IS a box of chocolates."' },
    { id: '2', front: 'Freytag\'s Pyramid (5 stages)', back: '1. Exposition: introduce setting/characters\n2. Rising Action: build conflict\n3. Climax: peak tension/turning point\n4. Falling Action: consequences\n5. Resolution/Denouement: conclusion' },
    { id: '3', front: 'Three types of irony', back: 'VERBAL: say opposite of what you mean (sarcasm)\nSITUATIONAL: opposite of expected happens\nDRAMATIC: audience knows more than characters\n(Romeo and Juliet: we know Juliet isn\'t dead)' },
    { id: '4', front: 'How to write a strong thesis', back: 'A thesis must be:\n✓ Specific (not vague)\n✓ Arguable (someone could disagree)\n✓ Supportable (evidence exists)\n\nWeak: "Shakespeare wrote about love."\nStrong: "In Romeo and Juliet, Shakespeare argues that impulsive passion leads to tragedy."' },
    { id: '5', front: 'PEEL essay paragraph structure', back: 'P - Point: your argument\nE - Evidence: quote/example\nE - Explain: analyze the evidence\nL - Link: connect back to thesis\n\nNEVER drop a quote without explanation!' },
    { id: '6', front: 'Their / There / They\'re', back: 'THEIR: possessive pronoun\n"Their car is red."\n\nTHERE: place or existence\n"There is a car over there."\n\nTHEY\'RE: contraction of "they are"\n"They\'re going to the store."' },
    { id: '7', front: 'Common literary devices', back: 'Alliteration: repeated consonant sounds\nOnomatopoeia: word sounds like its meaning\nHyperbole: extreme exaggeration\nPersonification: giving human traits to non-humans\nAllusion: reference to another work/event' },
    { id: '8', front: 'Subject-verb agreement rules', back: 'Singular subject → singular verb\n"The dog runs."\n\nPlural subject → plural verb\n"The dogs run."\n\nTricky: collective nouns (team, class) usually take singular verb in American English.' },
  ],
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function generateStudyGuide(subject: Subject, topic?: string): Promise<StudyGuide> {
  await delay(1800 + Math.random() * 600);
  const subjectGuides = studyGuides[subject];
  if (topic && subjectGuides[topic]) return subjectGuides[topic];
  return subjectGuides.default;
}

export async function generateQuiz(subject: Subject): Promise<QuizQuestion[]> {
  await delay(1200 + Math.random() * 400);
  const all = quizzes[subject];
  // Shuffle and return 8
  return [...all].sort(() => Math.random() - 0.5).slice(0, 8);
}

export async function generateMatchingPairs(subject: Subject): Promise<MatchingPair[]> {
  await delay(1000 + Math.random() * 400);
  return [...matchingPairs[subject]].sort(() => Math.random() - 0.5).slice(0, 6);
}

export async function generateFlashcards(subject: Subject): Promise<Flashcard[]> {
  await delay(1000 + Math.random() * 400);
  return [...flashcards[subject]].sort(() => Math.random() - 0.5);
}
