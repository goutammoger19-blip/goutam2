const screens=[...document.querySelectorAll(".screen")];
const personName="Rajani"; // Change this name
const birthday={day:1,month:1}; // Change to the real birthday: DD / MM
const letterText=`Today is more than just another date on the calendar.

It is a reminder that someone truly wonderful came into this world.

I hope this new chapter brings you endless reasons to smile, beautiful memories to keep, and the courage to chase every dream in your heart.

Thank you for being you. Never forget how special you are.

Happy Birthday, ${personName}. ❤️`;

document.getElementById("personName").textContent=personName;
document.getElementById("letterName").textContent=personName;

function go(id){
  screens.forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
document.querySelectorAll("[data-next]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.next)));

document.getElementById("unlock").addEventListener("click",()=>{
  const d=Number(document.getElementById("day").value);
  const m=Number(document.getElementById("month").value);
  if(d===birthday.day && m===birthday.month){go("celebrate")}
  else document.getElementById("error").textContent="That date isn't the key. Try again ❤️";
});
document.getElementById("skip").addEventListener("click",()=>go("celebrate"));

document.getElementById("blow").addEventListener("click",()=>{
  document.querySelectorAll(".flame").forEach(f=>f.style.display="none");
  document.querySelector(".cake-note").textContent="Wish made. ✨ May it come true.";
  setTimeout(()=>go("wishes"),1300);
});

let popped=0;
document.querySelectorAll(".balloon").forEach(balloon=>{
  balloon.addEventListener("click",()=>{
    if(balloon.dataset.popped)return;
    balloon.dataset.popped="1";
    balloon.style.transform="scale(.1)";
    balloon.style.opacity="0";
    const box=document.getElementById("balloonMessage");
    box.textContent=balloon.dataset.message;
    box.classList.add("show");
    popped++;
    if(popped===5)document.getElementById("toGift").classList.remove("hidden");
  });
});
document.getElementById("toGift").addEventListener("click",()=>go("gift"));

document.getElementById("giftBox").addEventListener("click",()=>{
  const g=document.getElementById("giftBox");
  g.animate([{transform:"scale(1)"},{transform:"scale(1.12) rotate(3deg)"},{transform:"scale(.1) rotate(20deg)"}],{duration:900,easing:"ease-in"});
  setTimeout(()=>{go("letter");typeLetter()},700);
});

let typingStarted=false;
function typeLetter(){
  if(typingStarted)return;
  typingStarted=true;
  const el=document.getElementById("typed");
  let i=0;
  const timer=setInterval(()=>{
    el.textContent=letterText.slice(0,i++);
    if(i>letterText.length)clearInterval(timer);
  },22);
}
document.getElementById("restart").addEventListener("click",()=>{
  document.getElementById("typed").textContent="";
  typingStarted=false;
  document.querySelectorAll(".balloon").forEach(b=>{b.dataset.popped="";b.style.opacity="1";b.style.transform=""});
  document.getElementById("balloonMessage").classList.remove("show");
  document.getElementById("toGift").classList.add("hidden");
  document.querySelectorAll(".flame").forEach(f=>f.style.display="block");
  go("intro");
});

const hearts=document.getElementById("hearts");
for(let i=0;i<28;i++){
  const h=document.createElement("span");
  h.className="heart";
  h.textContent=Math.random()>.5?"♥":"✦";
  h.style.left=Math.random()*100+"%";
  h.style.animationDuration=(8+Math.random()*13)+"s";
  h.style.animationDelay=(-Math.random()*18)+"s";
  h.style.fontSize=(8+Math.random()*16)+"px";
  hearts.appendChild(h);
}

// Lightweight 3D starfield
const canvas=document.getElementById("scene"),ctx=canvas.getContext("2d");
let w,h,stars=[];
function resize(){
  w=canvas.width=innerWidth*devicePixelRatio;
  h=canvas.height=innerHeight*devicePixelRatio;
  canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";
  stars=Array.from({length:140},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.6*devicePixelRatio,a:Math.random(),s:.15+Math.random()*.45}));
}
resize();addEventListener("resize",resize);
function draw(){
  ctx.clearRect(0,0,w,h);
  for(const s of stars){
    s.y-=s.s*devicePixelRatio;
    if(s.y<0){s.y=h;s.x=Math.random()*w}
    ctx.globalAlpha=.18+s.a*.55;
    ctx.fillStyle="#fff";
    ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
  }
  ctx.globalAlpha=1;requestAnimationFrame(draw);
}
draw();

// Optional music: put your own MP3 at assets/music.mp3
const music=document.getElementById("music");
music.src="assets/music.mp3";
document.getElementById("musicBtn").addEventListener("click",async()=>{
  try{
    if(music.paused){await music.play();document.getElementById("musicBtn").textContent="Ⅱ"}
    else{music.pause();document.getElementById("musicBtn").textContent="♫"}
  }catch(e){alert("Add your own MP3 as assets/music.mp3, then tap the music button.");}
});
