// ===== CONFIG =====
const EVENT_START = new Date("2026-04-23T08:00:00+01:00");
const HACK_END   = new Date("2026-04-25T18:00:00+01:00");

// ► Replace this with your deployed Google Apps Script Web App URL
// (Deploy → New deployment → Web App → Execute as Me → Anyone → Deploy)
const SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxD_Gp4XgvE9iSkrYLk3O14sadbuoGZdSj_dE20dYPHlVreSlE1OHAWHX-hw05s0RfRFA/exec";

const CHAT_API_URL = "/api/chat";

// ===== TRANSLATIONS =====
const i18n = {
  fr: {
    // Nav
    nav_about: "À propos",
    nav_programme: "Programme",
    nav_register: "Inscription",
    // Hero
    hero_slogan: "Concevoir des solutions scientifiques innovantes grâce à l'intelligence artificielle.",
    hero_cta_register: "S'inscrire maintenant",
    hero_cta_programme: "Voir le programme",
    // Countdown
    countdown_chip: "Le compte à rebours est lancé",
    countdown_h2: "Préparez-vous à innover",
    // About
    about_h2: "Décodez l'avenir avec NucleoMind",
    about_lead_strong: "48 heures d'effervescence scientifique",
    about_lead_rest: "pour repousser les limites du possible.",
    about_body: "NucleoMind est bien plus qu'un hackathon : c'est un carrefour d'innovation où étudiants, développeurs et chercheurs fusionnent leurs talents. Votre mission ? Exploiter la puissance de l'Intelligence Artificielle pour résoudre des défis scientifiques majeurs.",
    axis_sante: "Santé & Biomédical",
    axis_env: "Environnement & Durabilité",
    axis_indus: "Industrie & Procédés",
    axis_data: "Data & Systèmes",
    // Programme
    prog_chip: "Programme",
    prog_h2: "L'Agenda du Hackathon",
    prog_slogan: "Trois jours pour transformer une idée en prototype fonctionnel.",
    ms_inscriptions: "Inscriptions",
    ms_hackathon: "Hackathon",
    day1_name: "L'Étincelle",
    day1_desc: "Le début de l'aventure — rencontre, inspiration et brainstorming.",
    day2_name: "L'Accélération",
    day2_desc: "Plongée technique, mentorat expert et prototypage rapide.",
    day3_name: "Le Verdict",
    day3_desc: "L'heure des pitchs, du jury et de la consécration.",
    d1e1_title: "Accueil & Check-in",       d1e1_desc: "Enregistrement des participants, badges et kits de bienvenue.",
    d1e2_title: "Cérémonie d'ouverture",    d1e2_desc: "Discours officiels, présentation des thématiques et règles du jeu.",
    d1e3_title: "Formation des équipes",    d1e3_desc: "Constitution stratégique des équipes pluridisciplinaires.",
    d1e4_title: "Brainstorming intensif",   d1e4_desc: "Workshops guidés de génération d'idées et validation de concepts.",
    d1e5_title: "Début du développement",  d1e5_desc: "Les équipes commencent à transformer leurs idées en prototypes.",
    d2e1_title: "Petit-déjeuner & Recap",  d2e1_desc: "Point d'avancement et planification de la journée.",
    d2e2_title: "Sessions de mentorat",    d2e2_desc: "Accompagnement personnalisé par des experts IA et métier.",
    d2e3_title: "Team Building & Pause",   d2e3_desc: "Activités de cohésion, déjeuner et networking entre équipes.",
    d2e4_title: "Sprint de développement", d2e4_desc: "Phase intensive de codage, intégration IA et tests.",
    d2e5_title: "coding in the dark 🌙",         d2e5_desc: "Pour les plus braves : finalisation nocturne avec ravitaillement continu.",
    d3e1_title: "Derniers ajustements",    d3e1_desc: "Finalisation des prototypes, tests et préparation des démos.",
    d3e2_title: "Soumission des projets",  d3e2_desc: "Upload des livrables et documentation technique.",
    d3e3_title: "Pitch moment 🎤",            d3e3_desc: "Chaque équipe présente sa solution devant le jury d'experts.",
    d3e4_title: "Délibération du jury",    d3e4_desc: "Le jury évalue les projets selon les critères d'innovation et faisabilité.",
    d3e5_title: "Cérémonie de clôture 🏆", d3e5_desc: "Annonce des gagnants, remise des prix et célébration collective.",
    // Form
    form_h2: "Rejoignez l'Aventure !",
    form_slogan: "Formulaire d'inscription complet",
    form_required_note: "* Champ obligatoire",
    form_disclaimer: "🔒 Conformément à la loi n°18-07 (10 juin 2018), complétée par la loi 25-11 (juillet 2025), les données personnelles sont traitées dans le respect de la vie privée.",
    ph_nom: "Nom *", ph_prenom: "Prénom *", ph_age: "Âge *", ph_telephone: "Numéro de téléphone *",
    ph_email: "Adresse mail *", ph_wilaya: "Wilaya de résidence *",
    opt_genre: "Genre", opt_femme: "Femme", opt_homme: "Homme",
    ph_allergies: "Allergies / maladie chronique (si oui, préciser)",
    opt_statut: "Vous êtes...", opt_etudiant: "Étudiant/e", opt_diplome: "Fraîchement diplômé/e",
    opt_employe: "Employé/e", opt_autre: "Autre",
    ph_universite: "Université (ou diplômé de) *", ph_matricule: "Matricule carte étudiant",
    ph_cin: "Numéro carte nationale *",
    ph_motivation: "Qu'est-ce qui vous pousse à participer ? *",
    opt_thematique: "Thématique souhaitée",
    opt_sante: "Santé & biomédical", opt_env: "Environnement & durabilité",
    opt_indus: "Industrie & procédés", opt_data: "Data & systèmes intelligents",
    opt_profil_label: "Dans l'équipe, vous souhaitez être :",
    opt_marketeur: "Marketeur/euse", opt_dev: "Développeur/euse web/app", opt_designer: "Designer/euse",
    ph_vehicule: "Immatriculation véhicule (si véhiculé/e)",
    ph_questions: "Questions supplémentaires",
    consent_text: "J'accepte le traitement de mes données personnelles.",
    submit_btn: "Envoyer l'inscription",
    // Footer
    contact_chef: "Chef de projet",
    contact_sous: "Sous-chef de projet",
    contact_ext: "Responsable relations externes",
    footer_org: "Organisé par",
    footer_copy: "© 2026 NucleoMind — Tous droits réservés.",
    // Modal
    modal_title: "Fin du hackathon",
    modal_msg: "Dernière ligne droite : finalisez, testez, pitchez ✨",
    // Status messages
    status_sending: "Envoi en cours...",
    status_success: "✅ Inscription envoyée avec succès",
    status_error: "❌ Erreur d'envoi. Veuillez réessayer."
  },
  en: {
    // Nav
    nav_about: "About",
    nav_programme: "Programme",
    nav_register: "Register",
    // Hero
    hero_slogan: "Designing innovative scientific solutions through artificial intelligence.",
    hero_cta_register: "Register Now",
    hero_cta_programme: "View Programme",
    // Countdown
    countdown_chip: "The countdown has started",
    countdown_h2: "Get ready to innovate",
    // About
    about_h2: "Decode the future with NucleoMind",
    about_lead_strong: "48 hours of scientific effervescence",
    about_lead_rest: "to push the limits of what's possible.",
    about_body: "NucleoMind is more than a hackathon: it's an innovation hub where students, developers and researchers merge their talents. Your mission? Harness the power of Artificial Intelligence to solve major scientific challenges.",
    axis_sante: "Health & Biomedical",
    axis_env: "Environment & Sustainability",
    axis_indus: "Industry & Processes",
    axis_data: "Data & Systems",
    // Programme
    prog_chip: "Programme",
    prog_h2: "The Hackathon Agenda",
    prog_slogan: "Three days to transform an idea into a working prototype.",
    ms_inscriptions: "Registrations",
    ms_hackathon: "Hackathon",
    day1_name: "The Spark",
    day1_desc: "The beginning of the adventure — meeting, inspiration and brainstorming.",
    day2_name: "The Acceleration",
    day2_desc: "Deep technical dive, expert mentorship and rapid prototyping.",
    day3_name: "The Verdict",
    day3_desc: "Time for pitches, the jury and the prize ceremony.",
    d1e1_title: "Welcome & Check-in",         d1e1_desc: "Participant registration, badges and welcome kits.",
    d1e2_title: "Opening Ceremony",           d1e2_desc: "Official speeches, theme introduction and rules of the game.",
    d1e3_title: "Team Formation",             d1e3_desc: "Strategic formation of multidisciplinary teams.",
    d1e4_title: "Intensive Brainstorming",    d1e4_desc: "Guided workshops for idea generation and concept validation.",
    d1e5_title: "Development Kickoff",        d1e5_desc: "Teams begin transforming their ideas into prototypes.",
    d2e1_title: "Breakfast & Recap",          d2e1_desc: "Progress check and day planning.",
    d2e2_title: "Mentoring Sessions",         d2e2_desc: "Personalised guidance by AI and domain experts.",
    d2e3_title: "Team Building & Break",      d2e3_desc: "Bonding activities, lunch and networking between teams.",
    d2e4_title: "Development Sprint",         d2e4_desc: "Intensive coding, AI integration and testing phase.",
    d2e5_title: "coding in the dark 🌙",             d2e5_desc: "For the bravest: overnight finalisation with continuous supply.",
    d3e1_title: "Final Adjustments",          d3e1_desc: "Prototype finalisation, testing and demo preparation.",
    d3e2_title: "Project Submission",         d3e2_desc: "Upload deliverables and technical documentation.",
    d3e3_title: "Pitch moment 🎤",               d3e3_desc: "Each team presents their solution to the expert jury.",
    d3e4_title: "Jury Deliberation",          d3e4_desc: "The jury evaluates projects based on innovation and feasibility.",
    d3e5_title: "Closing Ceremony 🏆",        d3e5_desc: "Winner announcement, prize giving and collective celebration.",
    // Form
    form_h2: "Join the Adventure!",
    form_slogan: "Complete registration form",
    form_required_note: "* Required field",
    form_disclaimer: "🔒 In accordance with law n°18-07 (10 June 2018), supplemented by law 25-11 (July 2025), personal data is processed with respect for privacy.",
    ph_nom: "Last Name *", ph_prenom: "First Name *", ph_age: "Age *", ph_telephone: "Phone Number *",
    ph_email: "Email Address *", ph_wilaya: "Wilaya of Residence *",
    opt_genre: "Gender", opt_femme: "Female", opt_homme: "Male",
    ph_allergies: "Allergies / chronic illness (if yes, specify)",
    opt_statut: "You are...", opt_etudiant: "Student", opt_diplome: "Recent Graduate",
    opt_employe: "Employee", opt_autre: "Other",
    ph_universite: "University (or graduated from) *", ph_matricule: "Student ID number",
    ph_cin: "National ID number *",
    ph_motivation: "What motivates you to participate? *",
    opt_thematique: "Preferred theme",
    opt_sante: "Health & Biomedical", opt_env: "Environment & Sustainability",
    opt_indus: "Industry & Processes", opt_data: "Data & Intelligent Systems",
    opt_profil_label: "In the team, you wish to be:",
    opt_marketeur: "Marketer", opt_dev: "Web/App Developer", opt_designer: "Designer",
    ph_vehicule: "Vehicle plate (if you drive)",
    ph_questions: "Additional questions",
    consent_text: "I accept the processing of my personal data.",
    submit_btn: "Submit Registration",
    // Footer
    contact_chef: "Project Manager",
    contact_sous: "Deputy Project Manager",
    contact_ext: "External Relations Manager",
    footer_org: "Organised by",
    footer_copy: "© 2026 NucleoMind — All rights reserved.",
    // Modal
    modal_title: "End of Hackathon",
    modal_msg: "Final stretch: finalise, test, pitch ✨",
    // Status messages
    status_sending: "Sending...",
    status_success: "✅ Registration submitted successfully",
    status_error: "❌ Send error. Please try again."
  }
};

// ===== LANGUAGE MANAGER =====
let currentLang = localStorage.getItem("nmLang") || "fr";

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("nmLang", lang);
  document.getElementById("html-root").setAttribute("lang", lang);

  const t = i18n[lang];

  // Text nodes via data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Placeholders via data-i18n-ph
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (t[key] !== undefined) el.setAttribute("placeholder", t[key]);
  });

  // Toggle button label
  const flag  = document.getElementById("langFlag");
  const label = document.getElementById("langLabel");
  if (lang === "fr") {
    flag.textContent  = "🇬🇧";
    label.textContent = "EN";
  } else {
    flag.textContent  = "🇫🇷";
    label.textContent = "FR";
  }
}

document.getElementById("langToggle").addEventListener("click", () => {
  applyLang(currentLang === "fr" ? "en" : "fr");
});

// Apply on load
applyLang(currentLang);

// ===== COUNTDOWN =====
function formatCountdown(diff){
  if(diff <= 0) return "00j 00h 00m 00s";
  const s = Math.floor(diff/1000);
  const d = Math.floor(s/86400);
  const h = Math.floor((s%86400)/3600);
  const m = Math.floor((s%3600)/60);
  const sec = s%60;
  return `${String(d).padStart(2,'0')}j ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(sec).padStart(2,'0')}s`;
}
function updateCountdowns(){
  const now = new Date();
  document.getElementById("eventCountdown").textContent = formatCountdown(EVENT_START - now);
  document.getElementById("hackEndCountdown").textContent = formatCountdown(HACK_END - now);
}
setInterval(updateCountdowns,1000); updateCountdowns();

// ===== MODAL =====
const modal   = document.getElementById("endModal");
const openBtn = document.getElementById("openEndCountdown");
const closeBtn = document.getElementById("closeEndCountdown");
if(openBtn)  openBtn.onclick  = ()=> modal.classList.remove("hidden");
if(closeBtn) closeBtn.onclick = ()=> modal.classList.add("hidden");
if(modal) modal.addEventListener("click",(e)=>{ if(e.target===modal) modal.classList.add("hidden"); });

// ===== REVEAL =====
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("show"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

// ===== PROGRAMME TABS =====
const progTabs   = document.querySelectorAll(".prog-tab");
const progPanels = document.querySelectorAll(".prog-panel");

progTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const day = tab.dataset.day;
    progTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    progPanels.forEach(p => {
      p.classList.remove("active");
      if (p.dataset.panel === day) p.classList.add("active");
    });
  });
});

// ===== PARTICLES =====
const c   = document.getElementById("particles");
const ctx = c.getContext("2d");
let w,h,p=[];
function resize(){
  w = c.width  = window.innerWidth;
  h = c.height = window.innerHeight;
  p = Array.from({length:70},()=>({
    x:Math.random()*w, y:Math.random()*h,
    vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, r:Math.random()*2+1
  }));
}
window.addEventListener("resize",resize); resize();
function loop(){
  ctx.clearRect(0,0,w,h);
  p.forEach(a=>{
    a.x+=a.vx; a.y+=a.vy;
    if(a.x<0||a.x>w) a.vx*=-1;
    if(a.y<0||a.y>h) a.vy*=-1;
    ctx.beginPath(); ctx.arc(a.x,a.y,a.r,0,Math.PI*2);
    ctx.fillStyle="rgba(131,68,251,.22)";
    ctx.fill();
  });
  requestAnimationFrame(loop);
}
loop();

// ===== FORM => GOOGLE SHEETS =====
const form     = document.getElementById("registrationForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const t = i18n[currentLang];
  statusEl.textContent = t.status_sending;
  statusEl.style.color = "";

  const payload = Object.fromEntries(new FormData(form).entries());
  payload.timestamp = new Date().toISOString();
  payload.langue    = currentLang;

  try{
    const res = await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      // Google Apps Script requires no-cors or a CORS-enabled endpoint
      // Using no-cors means we won't get a readable response but the data is sent
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    // With no-cors the response is opaque (type = "opaque"), we treat it as success
    statusEl.textContent = t.status_success;
    statusEl.style.color = "#4ade80";
    form.reset();
  }catch(err){
    statusEl.textContent = t.status_error;
    statusEl.style.color = "#f87171";
    console.error("Form error:", err);
  }
});
