// ===== CONFIG =====
const EVENT_START = new Date("2026-04-23T08:00:00+01:00");
const HACK_END = new Date("2026-04-25T18:00:00+01:00");
const SHEETS_WEBHOOK_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE";
const CHAT_API_URL = "/api/chat";

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
const modal = document.getElementById("endModal");
const openBtn = document.getElementById("openEndCountdown");
const closeBtn = document.getElementById("closeEndCountdown");
if(openBtn) openBtn.onclick = ()=> modal.classList.remove("hidden");
if(closeBtn) closeBtn.onclick = ()=> modal.classList.add("hidden");
if(modal) modal.addEventListener("click",(e)=>{ if(e.target===modal) modal.classList.add("hidden"); });

// ===== REVEAL =====
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("show"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

// ===== PARTICLES =====
const c = document.getElementById("particles");
const ctx = c.getContext("2d");
let w,h,p=[];
function resize(){
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  p = Array.from({length:70},()=>({
    x:Math.random()*w,y:Math.random()*h,
    vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*2+1
  }));
}
window.addEventListener("resize",resize); resize();
function loop(){
  ctx.clearRect(0,0,w,h);
  p.forEach(a=>{
    a.x+=a.vx;a.y+=a.vy;
    if(a.x<0||a.x>w)a.vx*=-1;
    if(a.y<0||a.y>h)a.vy*=-1;
    ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,Math.PI*2);
    ctx.fillStyle="rgba(131,68,251,.22)";
    ctx.fill();
  });
  requestAnimationFrame(loop);
}
loop();

// ===== FORM => GOOGLE SHEETS =====
const form = document.getElementById("registrationForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  statusEl.textContent = "Envoi en cours...";
  const payload = Object.fromEntries(new FormData(form).entries());
  payload.timestamp = new Date().toISOString();

  try{
    const res = await fetch(SHEETS_WEBHOOK_URL,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(payload)
    });
    if(!res.ok) throw new Error("Erreur d'envoi.");
    statusEl.textContent = "✅ Inscription envoyée avec succès";
    form.reset();
  }catch(err){
    statusEl.textContent = "❌ " + err.message;
  }
});

// ===== REAL AI CHAT =====
const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");

chatToggle.onclick = ()=> chatBox.classList.toggle("hidden");

function addMsg(role,text){
  const d = document.createElement("div");
  d.className = `msg ${role}`;
  d.textContent = text;
  chatMessages.appendChild(d);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
addMsg("bot","Salut 👋 Je suis l’assistant IA NucleoMind. Pose-moi ta question.");

async function sendChat(){
  const q = chatInput.value.trim();
  if(!q) return;
  addMsg("user",q);
  chatInput.value = "";
  addMsg("bot","⏳ ...");

  try{
    const res = await fetch(CHAT_API_URL,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({message:q})
    });
    const data = await res.json();
    chatMessages.lastChild.remove();
    addMsg("bot", data.reply || "Je n’ai pas de réponse pour le moment.");
  }catch{
    chatMessages.lastChild.remove();
    addMsg("bot","Erreur réseau. Réessayez.");
  }
}
chatSend.onclick = sendChat;
chatInput.addEventListener("keydown",(e)=>{ if(e.key==="Enter") sendChat(); });