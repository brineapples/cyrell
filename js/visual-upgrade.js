(()=>{
"use strict";
const $=id=>document.getElementById(id);
if(!$("stage")||!$("actors"))return;
const NS="http://www.w3.org/2000/svg";
let UID=0;
/* =================================================================
   1. ILLUSTRATED BACKGROUNDS  (viewBox 1100 x 510)
   ================================================================= */
const rain=(x,y,w,h,n,col="#cfe0ff",op=.55)=>{let s="";for(let i=0;i<n;i++){const px=x+(i*97%w),l=12+(i*13%20),d=((i*37)%16)/10;s+=`<line class="rs" x1="${px}" y1="${y}" x2="${px-4}" y2="${y+l}" stroke="${col}" stroke-opacity="${op}" stroke-width="1.4" style="--d:-${d}s;--h:${h}px;animation-duration:${(.65+(i%5)*.11).toFixed(2)}s"/>`}return s};
const drops=(x,y,w,h,n)=>{let s="";for(let i=0;i<n;i++){const px=x+(i*131%w),py=y+(i*59%(h*.5));s+=`<ellipse class="dr" cx="${px}" cy="${py}" rx="2.4" ry="4" fill="#e8f0ff" opacity=".7" style="--d:-${(i*1.3)%6}s;--h:${h*.55}px"/>`}return s};
function city(u,x,y,w,h){
 let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${u}sky)"/><circle cx="${x+w*.78}" cy="${y+h*.2}" r="${h*.09}" fill="#f1dfe6" opacity=".5"/>`;
 for(let i=0;i<17;i++){const bw=w/17+12,bh=h*(.3+((i*37)%52)/100),bx=x+i*(w/17)-6,col=i%3?"#1b2347":"#293160",top=y+h-bh;
  s+=`<rect x="${bx}" y="${top}" width="${bw}" height="${bh+4}" fill="${col}"/><rect x="${bx}" y="${top}" width="2.5" height="${bh}" fill="${i%2?"#ff7ab8":"#67e0ff"}" opacity=".75"/>`;
  if(i%4==1)s+=`<path d="M${bx+bw/2} ${top}v-24" stroke="#99a" stroke-width="1.5"/><circle class="bl" cx="${bx+bw/2}" cy="${top-26}" r="2.6" fill="#ff4a6a"/>`;
  for(let r=0;r<Math.floor(bh/22);r++)for(let c=0;c<Math.floor(bw/16);c++)if((i+r*3+c)%3)s+=`<rect ${(i+r+c)%5==0?'class="bl" ':''}x="${bx+7+c*15}" y="${top+8+r*22}" width="6" height="10" fill="${(r+c)%2?"#ffd9a0":"#9fd8ff"}" opacity=".75" style="--d:-${(i+r*c)%7}s"/>`}
 s+=`<g class="holo"><rect x="${x+w*.42}" y="${y+h*.3}" width="86" height="54" rx="4" fill="#58e1ff" opacity=".28" stroke="#9af0ff"/><path d="M${x+w*.42+10} ${y+h*.3+16}h60M${x+w*.42+10} ${y+h*.3+30}h40" stroke="#e8fbff" stroke-width="3"/></g>`;
 for(let k=0;k<3;k++)s+=`<g class="car" style="--x0:${x-120}px;--x1:${x+w+60}px;animation-duration:${8+k*3}s;--d:-${k*3.1}s"><rect x="0" y="${y+h*(.22+k*.12)}" width="34" height="7" rx="3.5" fill="#fff2d8"/><rect x="-14" y="${y+h*(.22+k*.12)+3}" width="14" height="2" fill="#ff8fb8" opacity=".7"/></g>`;
 return s}
const books=(x,y,n,h=48,seed=1)=>{let s="",cx=x;const cols=["#c4577a","#e8b17a","#6f8bb5","#8fb89a","#d98fa6","#f1d29a","#8a6fa8","#b86b5b"];for(let i=0;i<n;i++){const w=9+((i*seed*7)%9),hh=h-((i*seed*5)%16);s+=`<rect class="bk" x="${cx}" y="${y-hh}" width="${w}" height="${hh}" fill="${cols[(i+seed)%8]}" stroke="#0003"/><rect x="${cx+2}" y="${y-hh+8}" width="${w-4}" height="2" fill="#fff6"/>`;cx+=w+1}return s};
const bunting=(x1,x2,y,n,u)=>{let s=`<path d="M${x1} ${y}Q${(x1+x2)/2} ${y+36} ${x2} ${y}" stroke="#7a5a6a" fill="none"/>`;const cols=["#f5a3b9","#ffd88f","#9fd0c5","#c4a8e0"];for(let i=1;i<n;i++){const t=i/n,px=x1+(x2-x1)*t,py=y+36*4*t*(1-t);s+=`<path class="swing" d="M${px-9} ${py}h18l-9 20Z" fill="${cols[i%4]}"/>`}return s};
const ART={};
const defs=(u,a,b,c)=>`<defs><linearGradient id="${u}w" x2="0" y2="1"><stop stop-color="${a}"/><stop offset=".7" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient><linearGradient id="${u}sky" x2="0" y2="1"><stop stop-color="#0d1533"/><stop offset=".65" stop-color="#5a4a8a"/><stop offset="1" stop-color="#c286a6"/></linearGradient><radialGradient id="${u}lamp"><stop stop-color="#ffdca8" stop-opacity=".85"/><stop offset="1" stop-color="#ffdca8" stop-opacity="0"/></radialGradient><radialGradient id="${u}sun"><stop stop-color="#fff0c0" stop-opacity=".95"/><stop offset="1" stop-color="#fff0c0" stop-opacity="0"/></radialGradient><clipPath id="${u}win"><rect x="520" y="40" width="470" height="290"/></clipPath></defs>`;
/* Elara's bedroom, 2048 */
ART.future=u=>defs(u,"#262f60","#3a3566","#2a2040")+`<rect width="1100" height="510" fill="url(#${u}w)"/>
<g clip-path="url(#${u}win)">${city(u,520,40,470,290)}${rain(520,40,470,300,70)}${drops(520,40,470,300,16)}</g>
<rect x="514" y="34" width="482" height="302" fill="none" stroke="#5a4c78" stroke-width="12"/><path d="M755 40v290M520 185h470" stroke="#5a4c78" stroke-width="7"/><rect x="500" y="334" width="510" height="16" fill="#3e3358"/>
<path class="curt" d="M505 30h60q-26 150 6 306h-68Z" fill="#cdb9d8" opacity=".35"/><path class="curt" d="M1010 30h-50q24 150-6 306h66Z" fill="#cdb9d8" opacity=".3"/>
<g class="glow"><text x="86" y="92" font-family="Fraunces,serif" font-size="46" fill="#7ee8ff" opacity=".85" letter-spacing="6">2048</text><text x="90" y="116" font-family="DM Sans,sans-serif" font-size="12" fill="#7ee8ff" opacity=".7" letter-spacing="4">03:12 · RAIN</text></g>
<rect x="70" y="140" width="290" height="190" rx="6" fill="#4b3d5e" stroke="#b79ac0" stroke-width="7"/>
${[[92,160,"#8fa6c8"],[170,156,"#d4a6a6"],[252,164,"#a8c4a0"],[100,246,"#e6c28f"],[190,244,"#9aa2d0"]].map(([x,y,c],i)=>`<g class="${i==1?'twk':''}" style="--d:-${i*.8}s" transform="rotate(${(i-2)*3} ${x+30} ${y+30})"><rect x="${x}" y="${y}" width="64" height="72" fill="#f8ead8"/><rect x="${x+5}" y="${y+5}" width="54" height="50" fill="${c}"/><circle cx="${x+30}" cy="${y+26}" r="9" fill="#ecc5b7"/><circle cx="${x+30}" cy="${y+16}" r="6" fill="#453348"/></g>`).join("")}
<path d="M254 266l30-12 28 22 18-8" stroke="#e8a7ba" stroke-width="3" fill="none"/><path d="M248 252q-18-10-8-18 10 2 12 14 12-14 22-4-2 12-18 10Z" class="swing" fill="#e8a7ba" stroke="#f7d5d1"/>
<rect y="372" width="1100" height="138" fill="#241b36"/><ellipse cx="400" cy="450" rx="250" ry="30" fill="#4f3c63" opacity=".8"/><path d="M0 372h1100" stroke="#6b5a86" stroke-width="3"/>
<rect x="640" y="352" width="400" height="14" fill="#7c6191"/><path d="M670 366v130M1010 366v130" stroke="#46365a" stroke-width="16"/>
<g><rect x="690" y="318" width="62" height="34" fill="#a7757f"/><path d="M690 318h62l-10-12h-42Z" fill="#c49a9c" class="lidk"/></g>
<g class="phn"><rect x="800" y="338" width="44" height="14" rx="4" fill="#2d2640"/><rect class="scr" x="804" y="341" width="36" height="8" rx="2" fill="#f3b8d6"/></g><circle class="glow" cx="822" cy="340" r="44" fill="url(#${u}lamp)"/>
<path d="M940 352l24-70h10l24 70Z" fill="#33284a"/><ellipse class="glow" cx="978" cy="282" rx="60" ry="46" fill="url(#${u}lamp)"/><path d="M964 282q14-26 28 0Z" fill="#ffe0b0"/>
<g stroke="#a98bb5" stroke-width="2" fill="none"><path d="M40 20q150 36 300 0M340 20q130 30 300 4"/></g>${[60,140,230,310,390,480,570].map((x,i)=>`<circle class="twk" style="--d:-${i*.4}s" cx="${x}" cy="${26+Math.sin(i)*9}" r="4" fill="#ffd8a8"/>`).join("")}`;
/* Mira's bedroom, 2024 */
ART.warmroom=u=>defs(u,"#7b546c","#c79482","#6d4f62")+`<rect width="1100" height="510" fill="url(#${u}w)"/>
<g opacity=".14" fill="#fff">${Array.from({length:14},(_,i)=>`<circle cx="${40+i*80}" cy="${60+(i*53)%260}" r="3"/>`).join("")}</g>
<rect x="740" y="48" width="290" height="272" fill="#ffe9c4" stroke="#f6dcc6" stroke-width="13"/><path d="M885 48v272M740 184h290" stroke="#f6dcc6" stroke-width="8"/>
<rect x="752" y="60" width="130" height="120" fill="#ffd89b"/><circle cx="860" cy="120" r="70" fill="url(#${u}sun)"/><path d="M780 300q60-40 130-20" stroke="#8aa77a" stroke-width="8" fill="none"/>
<path d="M740 190L450 470 560 510 960 330Z" fill="#fff0c8" opacity=".16" class="glow"/>
<path class="curt" d="M728 42h62q-30 140 4 288h-70Z" fill="#fff4ee" opacity=".72"/><path class="curt" d="M1040 42h-62q30 140-4 288h70Z" fill="#fff4ee" opacity=".68"/>
<rect y="372" width="1100" height="138" fill="#7a5668"/><path d="M0 372h1100" stroke="#a9808c" stroke-width="4"/><ellipse cx="560" cy="452" rx="320" ry="34" fill="#d6a9b0" opacity=".6"/>
<!-- wedding dress on mannequin -->
<g><path d="M236 392v-110" stroke="#5a3f4d" stroke-width="7"/><ellipse cx="236" cy="396" rx="36" ry="7" fill="#4a3442"/><path d="M214 170q22-18 44 0l6 60q-28 14-56 0Z" fill="#fff4e6" stroke="#e5ccbc" stroke-width="3"/><path class="swing" d="M208 232q28 22 56 0l50 160q-80 22-156 0Z" fill="#fff0e0" stroke="#e5ccbc" stroke-width="3"/><path d="M200 330q36 14 72 0M188 362q48 14 96 0" stroke="#efd9c6" stroke-width="3" fill="none"/><path class="curt" d="M236 170q-52 30-62 150" stroke="#fff" stroke-opacity=".85" stroke-width="14" fill="none" opacity=".8"/><circle cx="236" cy="150" r="14" fill="#c9a89a"/></g>
<!-- mirror -->
<g><ellipse cx="520" cy="230" rx="82" ry="118" fill="#a8788f" stroke="#e5bb7a" stroke-width="12"/><ellipse cx="520" cy="230" rx="66" ry="102" fill="#d9c8e0"/><path d="M470 150q50-40 94 0" stroke="#fff" stroke-opacity=".6" stroke-width="8" fill="none" class="glow"/><path class="glow" d="M486 300l60-120" stroke="#fff" stroke-opacity=".4" stroke-width="10"/><path d="M520 348v40M490 392h60" stroke="#8c5d70" stroke-width="10"/></g>
<!-- dresser w/ photo + pink ribbon -->
<rect x="330" y="334" width="150" height="62" fill="#a5727c" stroke="#e5bb9a" stroke-width="3"/><rect x="346" y="296" width="52" height="40" fill="#f8ead8" stroke="#c9a08f" transform="rotate(-6 372 316)"/><rect x="352" y="302" width="40" height="28" fill="#8fa0b8" transform="rotate(-6 372 316)"/><path class="swing" d="M395 300q-22-18-30 0 10 14 28 4 24 10 30-6-8-14-28 2m-6 4l-12 40m16-38l14 38" fill="#ec9fb5" stroke="#f9d4d2" stroke-width="2"/>
<!-- bed + phone -->
<path d="M590 380h330l30 40H560Z" fill="#c995a0"/><rect x="620" y="352" width="120" height="34" rx="14" fill="#f4ddd0"/><rect x="790" y="352" width="110" height="34" rx="14" fill="#f4ddd0"/><path d="M560 420h390v90H560Z" fill="#8d5a6f"/>
<g class="phn"><rect x="758" y="362" width="22" height="34" rx="4" fill="#2d2640" transform="rotate(-12 769 379)"/><rect class="scr" x="761" y="366" width="16" height="26" rx="2" fill="#f3b8d6" transform="rotate(-12 769 379)"/></g>
<!-- desk + bookstore notebook with pink door -->
<rect x="28" y="378" width="170" height="14" fill="#8a5c68"/><path d="M44 392v118M182 392v118" stroke="#6a4558" stroke-width="12"/>
<path d="M40 380q40-26 76-4v-6q-36-18-76 8Z" fill="#fbf0e2"/><path d="M116 376q40-22 76 4v-14q-36-22-76-6Z" fill="#fff6ea"/><rect x="128" y="352" width="22" height="14" fill="#ec9fb5" opacity=".95"/><path d="M130 354h18" stroke="#fff" stroke-width="2"/>
<g class="bob"><path d="M64 345q10-40 24-40 12 0 20 36Z" fill="#7ea386" opacity=".9"/><circle cx="88" cy="300" r="10" fill="#f0a8b8"/></g>
<path d="M20 60q280 40 560-6" stroke="#6b4a5a" fill="none"/>${Array.from({length:9},(_,i)=>`<circle class="twk" style="--d:-${i*.5}s" cx="${40+i*64}" cy="${48+Math.sin(i*.9)*14}" r="5" fill="#ffe3a4"/>`).join("")}`;
/* Café in the rain */
ART.cafe=u=>defs(u,"#463d5d","#7a5468","#3e2f45")+`<rect width="1100" height="510" fill="url(#${u}w)"/>
<g><rect x="600" y="50" width="420" height="290" fill="#2c3454"/>${Array.from({length:16},(_,i)=>`<circle class="glow" style="animation-delay:-${i*.3}s" cx="${630+(i*97)%380}" cy="${110+(i*61)%190}" r="${9+i%4*5}" fill="${["#ffcf8f","#ff9fb8","#8fd0ff","#ffe7a0"][i%4]}" opacity=".55"/>`).join("")}<g clip-path="inset(0)">${rain(600,50,420,290,64,"#dfeaff",.6)}${drops(600,50,420,290,20)}</g></g>
<rect x="594" y="44" width="432" height="302" fill="none" stroke="#d7a591" stroke-width="12"/><path d="M810 50v290" stroke="#d7a591" stroke-width="8"/>
<g class="glow"><text x="650" y="330" font-family="Fraunces,serif" font-size="22" fill="#ffe3b0" opacity=".9" letter-spacing="5" transform="scale(.001)"></text></g>
<rect x="40" y="86" width="230" height="130" rx="4" fill="#2c3a2f" stroke="#caa482" stroke-width="7"/><path d="M62 118h120M62 146h170M62 174h90" stroke="#f4ead2" stroke-width="3" opacity=".8" stroke-dasharray="14 5"/><path d="M200 108q16 6 12 22" stroke="#f4a9bd" stroke-width="3" fill="none"/>
<rect y="372" width="1100" height="138" fill="#3a2b40"/><path d="M0 372h1100" stroke="#8a6670" stroke-width="3"/>
${[180,380,560].map((x,i)=>`<g class="swing" style="animation-delay:-${i}s"><path d="M${x} 0v78" stroke="#caa482" stroke-width="3"/><path d="M${x-26} 112q26-44 52 0Z" fill="#e0a78a"/><circle cx="${x}" cy="114" r="9" fill="#ffe5a8"/></g><ellipse class="glow" cx="${x}" cy="150" rx="70" ry="60" fill="url(#${u}lamp)"/>`).join("")}
<rect x="40" y="250" width="240" height="100" fill="#6b4757" stroke="#caa482" stroke-width="4"/><rect x="60" y="230" width="62" height="36" rx="5" fill="#8c8aa0"/><circle cx="91" cy="248" r="10" fill="#d9d6e6"/><path class="steam" d="M82 226q-8-12 0-22M98 226q8-12 0-22" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/>${[150,190,230].map((x,i)=>`<rect x="${x}" y="${236}" width="22" height="14" rx="4" fill="#f4e4d0"/>`).join("")}
${[[150,396],[780,402]].map(([x,y],i)=>`<g><path d="M${x} ${y}h300l-30 28H${x+30}Z" fill="#c68f86"/><path d="M${x+60} ${y+28}v100M${x+240} ${y+28}v100" stroke="#5c4152" stroke-width="16"/><rect x="${x+110}" y="${y-18}" width="26" height="18" rx="5" fill="#f9ead8"/><path class="steam" style="--d:-${i}s" d="M${x+120} ${y-24}q-8-12 0-20" stroke="#fff" stroke-width="3" fill="none"/><rect x="${x+190}" y="${y-18}" width="26" height="18" rx="5" fill="#f9ead8"/></g>`).join("")}
<g><circle cx="1050" cy="300" r="1" fill="none"/><path d="M1020 372v-90q18-50 40 0v90Z" fill="#4c7a5a"/><path class="swing" d="M1040 290q-34-24-26-60 28 18 26 60M1040 290q34-24 26-60-28 18-26 60" fill="#6fae7a"/></g>`;
/* Bookshop with the pink door */
ART.bookstore=u=>defs(u,"#8f6a72","#e3b48c","#7b5262")+`<rect width="1100" height="510" fill="url(#${u}w)"/>
<rect x="30" y="40" width="270" height="340" fill="#6a4452" stroke="#c9a082" stroke-width="7"/>${[110,190,270,350].map((y,i)=>`<path d="M30 ${y}h270" stroke="#c9a082" stroke-width="7"/>${i<4?books(40,y-4,15,52,i+1).replace(/class="bk"/g,i==1?'class="bk bk-slide"':'class="bk"'):""}`).join("")}
<rect x="330" y="60" width="270" height="260" fill="#6a4452" stroke="#c9a082" stroke-width="7"/>${[140,220,300].map((y,i)=>`<path d="M330 ${y}h270" stroke="#c9a082" stroke-width="6"/>${books(342,y-3,16,56,i+3).replace(/class="bk"/g,i==0?'class="bk bk-slide"':'class="bk"')}`).join("")}
<rect x="650" y="60" width="130" height="96" fill="#fff6e6" stroke="#d6a18c" stroke-width="5"/><text class="sign" x="662" y="100" font-family="Caveat,cursive" font-size="26" fill="#a64d70">Open · Poetry</text><text class="sign" x="662" y="134" font-family="Caveat,cursive" font-size="24" fill="#a64d70">Mira's</text>
<!-- pink door -->
<g><rect x="808" y="64" width="208" height="318" fill="#fff0c8" class="doorlight"/><circle class="glow" cx="912" cy="220" r="150" fill="url(#${u}sun)"/><path d="M830 380V160q0-90 82-90t82 90v220Z" fill="#fff2c4" opacity=".95"/><g class="door" style="--dx:808px"><path d="M808 382V164q0-100 104-100t104 100v218Z" fill="#e88aa6" stroke="#f9c6d2" stroke-width="7"/><path d="M830 190q0-70 82-70t82 70v40H830Z" fill="#fff2d6" stroke="#f9c6d2" stroke-width="4" opacity=".92"/><path d="M912 120v110M830 175h164" stroke="#f9c6d2" stroke-width="4"/><circle cx="982" cy="290" r="9" fill="#f0c36a"/><rect x="852" y="262" width="120" height="90" rx="6" fill="none" stroke="#c9577e" stroke-width="3"/></g></g>
<rect y="380" width="1100" height="130" fill="#9a6d62"/><path d="M0 380h1100" stroke="#c99a82" stroke-width="3"/><path d="M0 420h1100M0 462h1100" stroke="#85594f" stroke-width="2"/>
<rect x="330" y="334" width="250" height="70" fill="#8a5a68" stroke="#d0a584" stroke-width="4"/><rect x="360" y="312" width="52" height="28" fill="#cbb3a0"/><circle cx="500" cy="322" r="14" fill="#f6e3cc"/><path class="steam" d="M494 304q-6-10 0-18" stroke="#fff" fill="none" stroke-width="3"/>
<g><ellipse cx="640" cy="420" rx="52" ry="14" fill="#6a4452" opacity=".6"/><path d="M590 420q50-60 100 0Z" fill="#b66f86"/><ellipse cx="640" cy="404" rx="26" ry="14" fill="#f2e6dc"/></g>
${[130,420,720].map((x,i)=>`<g class="swing" style="animation-delay:-${i*1.4}s"><path d="M${x} 0v36" stroke="#8a6f50"/><path d="M${x-18} 36h36l-6 22h-24Z" fill="#c88a68"/><path d="M${x-8} 36q-16 30-22 50M${x} 36q0 34 8 66M${x+8} 36q22 26 24 44" stroke="#5f9a68" stroke-width="5" fill="none"/></g>`).join("")}${Array.from({length:10},(_,i)=>`<circle class="twk" style="--d:-${i*.5}s" cx="${50+i*105}" cy="${22+Math.sin(i)*8}" r="4" fill="#ffe2a0"/>`).join("")}`;
/* Station platform */
ART.station=u=>defs(u,"#4c5372","#9a8aa0","#4d4a62")+`<rect width="1100" height="510" fill="url(#${u}w)"/>
<rect y="130" width="1100" height="170" fill="#2c3252"/>${Array.from({length:26},(_,i)=>`<rect class="${i%4==0?'bl':''}" x="${i*46+6}" y="${150+(i*17)%80}" width="20" height="14" fill="#ffd9a0" opacity=".7" style="--d:-${i%5}s"/>`).join("")}
<g class="train"><rect x="0" y="236" width="1280" height="84" rx="10" fill="#58607f"/>${Array.from({length:12},(_,i)=>`<rect x="${14+i*106}" y="252" width="80" height="38" rx="6" fill="#ffe3a8" opacity=".9"/><circle cx="${54+i*106}" cy="271" r="6" fill="#d9a77c" opacity=".6"/>`).join("")}<path d="M0 306h1280" stroke="#2e3350" stroke-width="8"/></g>
<rect y="316" width="1100" height="40" fill="#464a67"/><rect y="352" width="1100" height="158" fill="#6a667c"/><path d="M0 366h1100" stroke="#f2cf72" stroke-width="7"/><path d="M0 410h1100M0 460h1100" stroke="#85809a" stroke-width="2"/>
<path d="M140 0v376M768 0v376M1010 0v376" stroke="#d7c2bf" stroke-width="18"/><path d="M0 112h1100" stroke="#d7c2bf" stroke-width="16"/>
<rect x="190" y="40" width="270" height="130" rx="6" fill="#20243a" stroke="#d7c2bf" stroke-width="5"/><text x="212" y="72" font-family="DM Sans,sans-serif" font-size="16" fill="#ffd98f" letter-spacing="4">DEPARTURES</text>${[["09:41","PLATFORM 2","ON TIME"],["10:05","PLATFORM 4","DELAYED"],["10:30","PLATFORM 1","BOARDING"]].map((r,i)=>`<text class="${i==1?'flap':''}" x="212" y="${98+i*24}" font-family="Space Mono,monospace" font-size="13" fill="#ffd98f">${r.join("  ")}</text>`).join("")}
<g transform="translate(640 120)"><circle r="44" fill="#f6ecd8" stroke="#3a3250" stroke-width="5"/><path d="M0 0v-30" stroke="#3a3250" stroke-width="4" class="hand"/><path d="M0 0v-20" stroke="#3a3250" stroke-width="5" class="hand2"/></g>
<path d="M820 396h230v20H820Z" fill="#7b5a62"/><path d="M830 416v36M1040 416v36" stroke="#5a4048" stroke-width="8"/>
${[200,520,900].map((x,i)=>`<g class="swing" style="animation-delay:-${i}s"><path d="M${x} 112v22" stroke="#444" stroke-width="3"/><path d="M${x-16} 134h32l-6 18h-20Z" fill="#e6c07a"/></g><ellipse class="glow" cx="${x}" cy="170" rx="86" ry="60" fill="url(#${u}lamp)"/>`).join("")}
<g opacity=".35" class="wave"><ellipse cx="300" cy="380" rx="300" ry="26" fill="#fff"/><ellipse cx="800" cy="400" rx="260" ry="20" fill="#fff"/></g>`;
/* Yellow kitchen (remembered) */
ART.kitchen=u=>defs(u,"#d4b070","#f7dfaa","#a8787a")+`<rect width="1100" height="510" fill="url(#${u}w)"/>
<rect x="60" y="54" width="390" height="260" fill="#fbe9bb" stroke="#b58f75" stroke-width="10"/><path d="M255 54v260M60 184h390" stroke="#b58f75" stroke-width="7"/><circle cx="260" cy="150" r="130" fill="url(#${u}sun)" class="glow"/><path d="M80 300q60-50 120-30M330 300q60-40 100-20" stroke="#8fb06d" stroke-width="7" fill="none"/>
<path class="curt" d="M50 46h64q-24 120 4 280h-72Z" fill="#fff6dc" opacity=".8"/><path class="curt" d="M460 46h-64q22 120-4 280h72Z" fill="#fff6dc" opacity=".8"/>
<rect x="520" y="70" width="520" height="12" fill="#a8775c"/>${[0,1,2,3,4,5,6,7].map(i=>`<g><path d="M${545+i*62} 82v14" stroke="#8a6048"/><path d="M${535+i*62} 96h30l-4 36h-22Z" fill="${["#f2b2c2","#9fcfc4","#f9d68a","#c3b0e0"][i%4]}"/></g>`).join("")}
${bunting(30,1070,34,16,u)}
<rect y="380" width="1100" height="130" fill="#b88a80"/><path d="M0 380h1100" stroke="#8e6458" stroke-width="5"/>${Array.from({length:12},(_,i)=>`<path d="M${i*100} 380l-40 130M${i*100} 380h100" stroke="#a37a72" stroke-width="2"/>`).join("")}
<rect x="760" y="300" width="290" height="90" fill="#9a6a64" stroke="#e0b9a0" stroke-width="4"/><circle cx="840" cy="300" r="26" fill="#6a4a50"/><circle cx="930" cy="300" r="26" fill="#6a4a50"/>
<g style="transform-box:fill-box;transform-origin:50% 100%;animation:kettle .3s ease-in-out infinite alternate"><path d="M820 296q4-52 44-52 40 0 44 52Z" fill="#d6cbbc" stroke="#9a8c80" stroke-width="3" transform="translate(-0 0) scale(.9) translate(60 24)"/></g><path class="steam" d="M900 250q-10-16 0-30M916 250q10-16 0-34M932 252q-8-14 2-28" stroke="#fff" stroke-width="4" fill="none"/>
<g><ellipse cx="560" cy="396" rx="150" ry="30" fill="#6a4452"/><rect x="410" y="340" width="300" height="20" fill="#c99072"/><path d="M430 360l-20 150M690 360l20 150" stroke="#8a5c58" stroke-width="16"/>
<rect x="500" y="290" width="120" height="50" rx="6" fill="#fff3e6"/><path d="M500 306q60 14 120 0" stroke="#f0a8bd" stroke-width="10" fill="none"/><text x="528" y="332" font-family="Caveat,cursive" font-size="22" fill="#b3566f">ELARA</text><g class="flk"><rect x="548" y="262" width="6" height="26" fill="#f9e0e8"/><ellipse cx="551" cy="256" rx="5" ry="9" fill="#ffd36e"/></g><g class="flk" style="animation-delay:-.7s"><rect x="580" y="262" width="6" height="26" fill="#f9e0e8"/><ellipse cx="583" cy="256" rx="5" ry="9" fill="#ffd36e"/></g></g>
${Array.from({length:14},(_,i)=>`<circle class="twk" style="--d:-${i*.3}s" cx="${60+(i*79)%980}" cy="${90+(i*53)%260}" r="3" fill="#fff6c8"/>`).join("")}`;
/* Blue house (memory changing colour) */
ART.bluehouse=u=>`<defs><linearGradient id="${u}s" x2="0" y2="1"><stop stop-color="#6c86ac"/><stop offset="1" stop-color="#e8c7c0"/></linearGradient></defs><rect width="1100" height="510" fill="url(#${u}s)"/>
<g class="wave" opacity=".6"><ellipse cx="200" cy="90" rx="110" ry="26" fill="#f6ecee"/><ellipse cx="260" cy="76" rx="70" ry="22" fill="#f6ecee"/><ellipse cx="820" cy="130" rx="120" ry="24" fill="#f6ecee"/></g>
<path d="M0 360q550-110 1100 0v150H0Z" fill="#7f9c8a"/><path d="M0 410q550-70 1100 0v100H0Z" fill="#6c8a7a"/>
<g style="animation:hue 7s ease-in-out infinite alternate"><path d="M240 214L550 40l310 174v240H240Z" fill="#7690b1" stroke="#e1d3c9" stroke-width="12"/><path d="M215 224L550 28l335 196" stroke="#4b5f7e" stroke-width="26" fill="none"/><rect x="488" y="274" width="124" height="180" fill="#d99aa6"/><circle cx="598" cy="366" r="6" fill="#f0c36a"/><rect x="290" y="250" width="110" height="80" fill="#fbe8ae" stroke="#e1d3c9" stroke-width="6"/><rect x="700" y="250" width="110" height="80" fill="#fbe8ae" stroke="#e1d3c9" stroke-width="6"/><path class="glow" d="M290 250h110v80H290ZM700 250h110v80H700Z" fill="#ffe9a8" opacity=".6"/></g>
<rect x="500" y="170" width="100" height="56" rx="4" fill="#fff3e2" opacity=".95"/><text class="fadeout" x="516" y="206" font-family="Caveat,cursive" font-size="30" fill="#b3566f">ELARA</text>
<path d="M0 420h1100" stroke="#5a4a42" stroke-width="2"/>${Array.from({length:18},(_,i)=>`<path d="M${i*66} 440v-60h30v60Z" fill="#f4ebe0" stroke="#d7c8b8"/>`).join("")}
<g transform="translate(990 380)"><rect x="-4" y="-120" width="8" height="120" fill="#6a5a4a"/><g class="swing"><path d="M0 -112q-26-20-34 0 8 14 30 6 24 14 30-2-4-16-26 4m0 6l-14 40m18-40l16 38" fill="#ec9fb5" stroke="#f9d4d2" stroke-width="2"/></g></g>
${[180,430,830,960].map((x,i)=>`<g class="bob" style="animation-delay:-${i}s"><path d="M${x} 450v-34" stroke="#4e8a5a" stroke-width="4"/><circle cx="${x}" cy="410" r="10" fill="${["#f0a8b8","#fbd68a","#c3a8e0","#f6e3ee"][i]}"/></g>`).join("")}
<g class="swing"><path d="M120 460V250" stroke="#5a4636" stroke-width="22"/><circle cx="120" cy="220" r="86" fill="#5e8f6a"/><circle cx="76" cy="258" r="56" fill="#6ca078"/></g>
<style>@keyframes hue{from{filter:hue-rotate(0deg) saturate(1)}to{filter:hue-rotate(-150deg) saturate(1.4) brightness(1.14)}}@keyframes kettle{from{transform:rotate(-2deg)}to{transform:rotate(2deg)}}</style>`;
/* Beach photograph with the empty chair */
ART.beach=u=>`<defs><linearGradient id="${u}s" x2="0" y2="1"><stop stop-color="#7189b0"/><stop offset=".55" stop-color="#f2c9bb"/><stop offset="1" stop-color="#f0d9c4"/></linearGradient><radialGradient id="${u}sun"><stop stop-color="#fff0c0"/><stop offset="1" stop-color="#fff0c000"/></radialGradient></defs><rect width="1100" height="510" fill="url(#${u}s)"/>
<circle cx="760" cy="250" r="150" fill="url(#${u}sun)" class="glow"/><circle cx="760" cy="262" r="46" fill="#ffe6b0"/>
<path d="M0 276q275-30 550 0t550-6v140H0Z" fill="#6f89a8"/>${[290,320,350].map((y,i)=>`<path class="wave" style="animation-delay:-${i}s" d="M0 ${y}q70-14 140 0t140 0 140 0 140 0 140 0 140 0 140 0 140 0" stroke="#f7e9e4" stroke-width="${3+i}" fill="none" opacity=".7"/>`).join("")}
<path d="M0 372q550-44 1100 0v138H0Z" fill="#e6c8ae"/><path class="wave" d="M0 372q550-44 1100 0" stroke="#fff" stroke-width="8" fill="none" opacity=".8"/>
<g class="gull"><path d="M0 120q10-14 22 0q12-14 22 0" stroke="#fff" stroke-width="3" fill="none"/></g><g class="gull" style="animation-delay:-6s"><path d="M0 170q8-12 18 0q10-12 18 0" stroke="#fff" stroke-width="3" fill="none"/></g>
<g><path d="M200 440l30-70h40l30 70Z" fill="#c76a82"/><path d="M200 440v50M300 440v50" stroke="#7a4a58" stroke-width="7"/><circle cx="250" cy="352" r="16" fill="#d6a898"/><path d="M232 372q18 20 36 0v40h-36Z" fill="#7a95b6"/></g>
<g><path d="M410 440l30-70h40l30 70Z" fill="#5a8fa8"/><path d="M410 440v50M510 440v50" stroke="#34566a" stroke-width="7"/><circle cx="460" cy="346" r="16" fill="#cfa08e"/><path d="M442 366q18 20 36 0v40h-36Z" fill="#f2e2cc"/></g>
<g><path d="M650 450l16-40h24l16 40Z" fill="#c9b6d8" stroke="#fff" stroke-width="3" stroke-dasharray="5 4"/><path d="M650 450v30M706 450v30" stroke="#9a86ae" stroke-width="5"/><g class="ghostkid"><circle cx="678" cy="384" r="12" fill="#e8c5b2"/><path d="M664 400q14 14 28 0v26h-28Z" fill="#f4c0cf"/><path class="swing" d="M668 372q-14-8-6-14 8 2 8 12 8-10 14-3-2 8-12 8Z" fill="#ec9fb5"/></g></g>
<path d="M560 460q14-6 24 4M590 470q14-6 24 4" stroke="#b9987f" stroke-width="5" fill="none"/>
<rect x="14" y="14" width="1072" height="482" fill="none" stroke="#fffaf0" stroke-width="28"/><rect x="0" y="0" width="1100" height="510" fill="none" stroke="#f1e4d0" stroke-width="6"/><rect class="fadeout" x="14" y="14" width="1072" height="482" fill="#2a2038" opacity=".18"/>`;
/* Memory archive */
ART.archive=u=>`<defs><linearGradient id="${u}s" x2="0" y2="1"><stop stop-color="#14102a"/><stop offset=".7" stop-color="#40306a"/><stop offset="1" stop-color="#241c44"/></linearGradient><radialGradient id="${u}g"><stop stop-color="#fff2c8" stop-opacity=".9"/><stop offset="1" stop-color="#fff2c800"/></radialGradient></defs><rect width="1100" height="510" fill="url(#${u}s)"/>
<ellipse class="glow" cx="550" cy="250" rx="260" ry="220" fill="url(#${u}g)" opacity=".5"/>
${[[60,150,"#ff9fc0"],[200,110,"#8fd0ff"],[340,80,"#ffd98f"],[760,80,"#c9a8ff"],[880,110,"#9fe8c0"],[990,150,"#ff9fc0"]].map(([x,y,c],i)=>`<g><path d="M${x} ${y+300}V${y+40}q0-50 50-50t50 50v260Z" fill="#33285a" stroke="#d9c0e6" stroke-width="5"/><path d="M${x+14} ${y+290}V${y+50}q0-34 36-34t36 34v240Z" fill="${c}" opacity=".5" class="glow" style="animation-delay:-${i*.6}s"/><circle cx="${x+50}" cy="${y+170}" r="5" fill="#f0c36a"/></g>`).join("")}
<g><path d="M440 400V150q0-100 110-100t110 100v250Z" fill="#241a48" stroke="#fff1d0" stroke-width="7"/><path d="M462 396V160q0-80 88-80t88 80v236Z" fill="#fff4d0" opacity=".7" class="glow"/></g>
<rect y="404" width="1100" height="106" fill="#2a2150"/><path d="M0 404h1100" stroke="#8e76c0" stroke-width="3"/><g opacity=".4" transform="translate(0 808) scale(1 -1)"><rect x="440" y="404" width="220" height="100" fill="#fff4d0" opacity=".25"/></g>
${Array.from({length:22},(_,i)=>`<g class="orb" style="--d:-${i*.6}s"><circle cx="${40+(i*53)%1020}" cy="${60+(i*97)%330}" r="${5+i%4*3}" fill="${["#ff9fc0","#8fd0ff","#ffd98f","#c9a8ff"][i%4]}" opacity=".7"/><circle cx="${40+(i*53)%1020}" cy="${60+(i*97)%330}" r="${14+i%4*5}" fill="${["#ff9fc0","#8fd0ff","#ffd98f","#c9a8ff"][i%4]}" opacity=".15"/></g>`).join("")}
${[[150,250],[600,300],[890,230]].map(([x,y],i)=>`<g class="orb" style="--d:-${i*2}s"><rect x="${x}" y="${y}" width="46" height="54" fill="#f8ead8" transform="rotate(${i*9-8} ${x+23} ${y+27})"/><rect x="${x+5}" y="${y+5}" width="36" height="32" fill="#8f9fc0" transform="rotate(${i*9-8} ${x+23} ${y+27})"/></g>`).join("")}`;
/* Changing mirror */
ART.mirror=u=>`<defs><radialGradient id="${u}m"><stop stop-color="#bfa6cf"/><stop offset="1" stop-color="#4a3a68"/></radialGradient></defs><rect width="1100" height="510" fill="#241c36"/>
<ellipse cx="550" cy="236" rx="226" ry="226" fill="#d4a46a" stroke="#f0d6a6" stroke-width="10"/><ellipse cx="550" cy="236" rx="196" ry="198" fill="url(#${u}m)"/>
${[0,1,2,3].map(i=>`<ellipse class="ripple" style="--d:-${i}s" cx="550" cy="236" rx="190" ry="190" fill="none" stroke="#fff0e0" stroke-width="3"/>`).join("")}
<g class="fadeout" style="animation-duration:3s"><circle cx="500" cy="200" r="36" fill="#e8c0b0" opacity=".85"/><path d="M450 300q50-60 100 0v60h-100Z" fill="#7a6690" opacity=".8"/><path d="M468 190q-20-50 32-60 56 0 36 62-14-34-68-2Z" fill="#453348"/></g>
<g class="fadeout" style="animation-duration:3.6s;animation-delay:-1.5s"><circle cx="600" cy="204" r="36" fill="#ddb09f" opacity=".85"/><path d="M552 310q50-64 104 0v50h-104Z" fill="#b9a6ce" opacity=".8"/><path d="M566 196q-18-54 36-62 52 4 34 66-12-30-70-4Z" fill="#382839"/></g>
<path class="glow" d="M440 120l60 90-30 70 60 70M650 140l-50 80 40 60" stroke="#fff4d8" stroke-width="3" fill="none"/>
${Array.from({length:16},(_,i)=>`<path class="orb" style="--d:-${i*.7}s" d="M${70+(i*71)%960} ${60+(i*89)%360}l14 -9 6 16Z" fill="#cdb8e8" opacity=".6"/>`).join("")}
<g class="swing"><path d="M880 100q-26-20-34 0 8 14 30 6 24 14 30-2-4-16-26 4m0 6l-14 40m18-40l16 38" fill="#ec9fb5" stroke="#f9d4d2" stroke-width="2"/></g>
<rect y="440" width="1100" height="70" fill="#1a142a"/><ellipse cx="550" cy="470" rx="240" ry="16" fill="#8e76c0" opacity=".3"/>`;
/* Wedding hall */
ART.wedding=u=>defs(u,"#c8b0a4","#f5ddc8","#a08a82")+`<rect width="1100" height="510" fill="url(#${u}w)"/>
<g><rect x="400" y="60" width="300" height="330" fill="#fff6e0"/><circle cx="550" cy="220" r="170" fill="url(#${u}sun)" class="glow"/><path d="M380 390V150q0-110 170-110t170 110v240Z" fill="#fff9ea" stroke="#e7cfa6" stroke-width="12"/><path d="M420 380V160q0-80 130-80t130 80v220" fill="#fff6d0" opacity=".85"/></g>
<g class="door2"><path d="M400 390V160" stroke="#e7cfa6" stroke-width="2"/></g>
${[[40,"#e7a6bd"],[190,"#f2d29a"],[860,"#b7a6e0"],[990,"#a6d0c2"]].map(([x,c],i)=>`<g><rect x="${x}" y="50" width="76" height="210" fill="${c}" opacity=".55" stroke="#fff" stroke-width="3"/><path d="M${x+38} 50v210M${x} 150h76" stroke="#fff" stroke-opacity=".6" stroke-width="3"/><rect class="glow" x="${x}" y="50" width="76" height="210" fill="${c}" opacity=".3"/></g>`).join("")}
<rect y="380" width="1100" height="130" fill="#cdb7a6"/><path d="M0 380h1100" stroke="#b49f90" stroke-width="3"/><path d="M455 380L330 510h440L645 380Z" fill="#a8556c" opacity=".92"/><path d="M455 380L330 510M645 380L770 510" stroke="#f4d9a8" stroke-width="5"/>
${Array.from({length:7},(_,i)=>{const t=i/6,y=392+t*110;return `<ellipse cx="${520+Math.sin(i*2)*28}" cy="${y}" rx="${8+t*14}" ry="${3+t*5}" fill="#fff1ea" opacity=".85"/>`}).join("")}
${[0,1,2,3,4].map(i=>{const t=i/4,y=392+t*100,sc=.5+t*.7,xl=420-t*200,xr=680+t*200;return [xl,xr].map((x,j)=>`<g class="${(i+j)%2?'guest':''}" style="--d:${i}"><g transform="translate(${x} ${y}) scale(${sc})"><rect x="-44" y="-10" width="88" height="46" rx="6" fill="#f6eee4" stroke="#d9c8b6"/><circle cx="0" cy="-34" r="15" fill="${["#e0b8a0","#c89478","#f0c8b0","#b88468","#d9a890"][(i+j)%5]}"/><path d="M-17 -34q0-24 17-24t17 24q-17-12-34 0Z" fill="${["#453348","#2a2430","#a87a52","#d0a878","#6a4a3a"][(i*2+j)%5]}"/><path d="M-22 -12q22 10 44 0v26h-44Z" fill="${["#9ab0c8","#c89aaf","#a9c4a6","#d6b88a","#b6a0cf"][(i+j*2)%5]}"/></g></g>`).join("")}).join("")}
${[[330,330],[770,330],[250,290],[850,290]].map(([x,y],i)=>`<g><rect x="${x-6}" y="${y}" width="12" height="90" fill="#d8c3a0"/><rect x="${x-14}" y="${y-4}" width="28" height="8" fill="#e5cc9a"/><g class="flk" style="animation-delay:-${i*.5}s"><ellipse cx="${x}" cy="${y-18}" rx="6" ry="12" fill="#ffd36e"/></g><circle class="glow" cx="${x}" cy="${y-18}" r="34" fill="url(#${u}lamp)"/></g>`).join("")}
<path d="M0 70q550 120 1100 0" stroke="#e5c9a0" stroke-width="5" fill="none"/>${Array.from({length:18},(_,i)=>`<circle class="twk" style="--d:-${i*.3}s" cx="${30+i*62}" cy="${70+Math.sin(i/17*Math.PI)*60}" r="5" fill="#fff0c0"/>`).join("")}`;
/* Night rain: the house not yet built */
ART.black=u=>`<rect width="1100" height="510" fill="#0b0d22"/>
<g stroke="#8fa8ff" stroke-width="3" fill="none" opacity=".7" class="glow"><path d="M300 400V220l250-130 250 130v180Z"/><path d="M300 220h500M420 400V250h110v150M600 270h140v90H600Z M550 90v130"/></g>
<g fill="#7f9cff" opacity=".14" class="glow"><rect x="600" y="270" width="140" height="90"/><rect x="420" y="250" width="110" height="150"/></g>
<rect y="420" width="1100" height="90" fill="#12142e"/><path d="M0 420h1100" stroke="#3a4682" stroke-width="2"/>${rain(0,0,1100,520,120,"#9db8ff",.5)}${Array.from({length:12},(_,i)=>`<ellipse class="ripple" style="--d:-${i*.3}s" cx="${40+(i*89)%1020}" cy="${440+(i*23)%60}" rx="26" ry="5" fill="none" stroke="#9db8ff" stroke-width="1.5"/>`).join("")}`;
/* Evening street (intro) */
ART.street=u=>`<defs><linearGradient id="${u}s" x2="0" y2="1"><stop stop-color="#4a4e80"/><stop offset=".6" stop-color="#e5a99a"/><stop offset="1" stop-color="#8a6a80"/></linearGradient></defs><rect width="1100" height="510" fill="url(#${u}s)"/>
${[[0,170],[200,230],[760,210],[940,160]].map(([x,h],i)=>`<g><rect x="${x}" y="${390-h}" width="170" height="${h+30}" fill="${["#5a4a6a","#6a5070","#554768","#664a60"][i]}"/>${Array.from({length:Math.floor(h/46)},(_,r)=>[0,1,2].map(c=>`<rect class="${(r+c+i)%3==0?'bl':''}" x="${x+16+c*50}" y="${390-h+16+r*46}" width="28" height="28" fill="#ffe0a0" opacity=".8"/>`).join("")).join("")}</g>`).join("")}
<rect x="400" y="170" width="300" height="220" fill="#7a5070"/><path d="M400 170h300l-20-34H420Z" fill="#c96b82"/><rect x="430" y="210" width="110" height="120" fill="#ffe9b0" opacity=".9"/><rect x="560" y="210" width="110" height="120" fill="#ffe9b0" opacity=".9"/><rect x="480" y="340" width="140" height="50" fill="#a8556a"/><text x="470" y="198" font-family="Fraunces,serif" font-size="17" fill="#fff0d8" letter-spacing="3">FLORIST</text>
<rect y="388" width="1100" height="122" fill="#6c5878"/><path d="M0 396h1100" stroke="#e7c4a8" stroke-width="5"/><rect y="400" width="1100" height="110" fill="#8a7090" opacity=".5"/><ellipse class="glow" cx="300" cy="470" rx="140" ry="12" fill="#ffe0b0" opacity=".35"/><ellipse class="glow" cx="800" cy="470" rx="140" ry="12" fill="#ffe0b0" opacity=".35"/>
${[300,800].map(x=>`<g><rect x="${x-4}" y="150" width="8" height="240" fill="#4a3a52"/><path d="M${x-26} 150h52" stroke="#4a3a52" stroke-width="7"/><circle cx="${x}" cy="154" r="12" fill="#ffe6b0"/><circle class="glow" cx="${x}" cy="154" r="64" fill="url(#${u}lamp0)"/></g>`).join("")}
<defs><radialGradient id="${u}lamp0"><stop stop-color="#ffdca8" stop-opacity=".7"/><stop offset="1" stop-color="#ffdca8" stop-opacity="0"/></radialGradient></defs>`;
/* Proposal terrace (intro) */
ART.proposal=u=>`<defs><linearGradient id="${u}s" x2="0" y2="1"><stop stop-color="#241d44"/><stop offset="1" stop-color="#7a5a86"/></linearGradient></defs><rect width="1100" height="510" fill="url(#${u}s)"/>
${Array.from({length:60},(_,i)=>`<circle class="twk" style="--d:-${i%7*.4}s" cx="${(i*131)%1100}" cy="${(i*47)%200}" r="${1+i%3*.6}" fill="#fff6d8"/>`).join("")}<circle cx="880" cy="90" r="40" fill="#f6e8d8" opacity=".85"/>
<path d="M0 410q550-70 1100 0v100H0Z" fill="#4a3c5c"/>
<path d="M60 70Q550 200 1040 70" stroke="#e8c690" stroke-width="3" fill="none"/>${Array.from({length:15},(_,i)=>{const t=(i+1)/16,x=60+980*t,y=70+130*4*t*(1-t)*.5+0;return `<g class="swing" style="animation-delay:-${i*.3}s"><path d="M${x} ${y} v10" stroke="#aaa"/><circle cx="${x}" cy="${y+16}" r="7" fill="#ffe0a0"/><circle class="glow" cx="${x}" cy="${y+16}" r="26" fill="#ffe0a0" opacity=".25"/></g>`}).join("")}
<g><path d="M250 420V220q0-110 120-110M850 420V220q0-110-120-110" stroke="#f3dcc8" stroke-width="12" fill="none"/>${Array.from({length:16},(_,i)=>`<circle cx="${250+Math.sin(i)*14+ (i<8?i*16:0)}" cy="${300-i*12}" r="9" fill="${["#f4a8bd","#fff0e0","#e8c0f0"][i%3]}"/>`).join("")}</g>
<path d="M0 396h1100" stroke="#8a789a" stroke-width="4"/><path d="M0 440h1100M0 480h1100" stroke="#5a4a6a" stroke-width="2"/>
${[190,910].map(x=>`<g><rect x="${x-6}" y="380" width="12" height="60" fill="#d8c8b0"/><g class="flk"><ellipse cx="${x}" cy="370" rx="6" ry="12" fill="#ffd36e"/></g><circle class="glow" cx="${x}" cy="370" r="46" fill="#ffd36e" opacity=".3"/></g>`).join("")}`;
/* Foreground (above characters) */
const FG={
 future:`<svg viewBox="0 0 1100 510" preserveAspectRatio="xMidYMid slice"><g opacity=".6">${drops(0,0,1100,510,10)}</g><path d="M0 0h8v510H0Z" fill="#0006"/></svg>`,
 warmroom:`<svg viewBox="0 0 1100 510" preserveAspectRatio="xMidYMid slice"><path class="curt" d="M1100 0h-70q40 200-10 420h80Z" fill="#fff4ee" opacity=".35"/></svg>`,
 cafe:`<svg viewBox="0 0 1100 510" preserveAspectRatio="xMidYMid slice"><path class="steam" d="M60 500q-20-40 10-90M110 500q20-40-10-90" stroke="#fff" stroke-width="10" fill="none" opacity=".25"/></svg>`,
 bookstore:`<svg viewBox="0 0 1100 510" preserveAspectRatio="xMidYMid slice"><g class="swing"><path d="M0 0q80 30 120 120M0 0q40 60 40 160M0 0q120 10 200 60" stroke="#4f8a5c" stroke-width="12" fill="none" opacity=".75"/></g></svg>`,
 wedding:`<svg viewBox="0 0 1100 510" preserveAspectRatio="xMidYMid slice"><g class="swing">${Array.from({length:14},(_,i)=>`<circle cx="${i*80}" cy="${12+Math.sin(i)*10}" r="14" fill="${["#f4a8bd","#fff0e0","#c8a6e6"][i%3]}" opacity=".85"/>`).join("")}</g></svg>`,
 kitchen:`<svg viewBox="0 0 1100 510" preserveAspectRatio="xMidYMid slice"><rect width="1100" height="510" fill="none" stroke="#fff6c8" stroke-opacity=".15" stroke-width="40"/></svg>`,
 archive:`<svg viewBox="0 0 1100 510" preserveAspectRatio="xMidYMid slice">${Array.from({length:8},(_,i)=>`<circle class="orb" style="--d:-${i}s" cx="${(i*151)%1100}" cy="${380+(i*43)%120}" r="${10+i%3*8}" fill="#ffd9f0" opacity=".25"/>`).join("")}</svg>`
};
/* =================================================================
   1b. EXTRA DETAIL LAYERS (drawn on top of each base scene)
   ================================================================= */
const DET={};
const motes=(x,y,w,h,n,u)=>Array.from({length:n},(_,i)=>`<circle class="orb" style="--d:-${(i*.7)%7}s" cx="${x+(i*83)%w}" cy="${y+(i*47)%h}" r="${1.4+i%3*.9}" fill="#fff4d0" opacity=".65"/>`).join("");
DET.warmroom=u=>`
<g opacity=".13" stroke="#fff" stroke-width="3">${Array.from({length:17},(_,i)=>`<path d="M${i*44+18} 0V372"/>`).join("")}</g>
<g opacity=".16" fill="#fff">${Array.from({length:36},(_,i)=>`<circle cx="${(i*61)%1100}" cy="${20+(i*37)%340}" r="2.2"/>`).join("")}</g>
<g><rect x="300" y="64" width="64" height="80" fill="#fff4e4" stroke="#b78b6e" stroke-width="5"/><rect x="310" y="74" width="44" height="60" fill="#fdf0d8"/><path d="M319 128V100q13-22 26 0v28Z" fill="#ec8aa6" stroke="#c9577e" stroke-width="2"/><circle cx="340" cy="114" r="2" fill="#f0c36a"/>
<rect x="382" y="86" width="74" height="56" fill="#fff4e4" stroke="#b78b6e" stroke-width="5"/><rect x="391" y="95" width="56" height="38" fill="#9db0cb"/><circle cx="412" cy="110" r="7" fill="#e8c3b2"/><circle cx="430" cy="112" r="6" fill="#d6a898"/><path d="M391 128q28-14 56 0v5h-56Z" fill="#7d94b6"/></g>
<g transform="translate(640 62)"><rect width="86" height="102" rx="4" fill="#fffaf0" stroke="#c8a58e" stroke-width="3"/><rect width="86" height="24" fill="#d46a82"/><text x="43" y="17" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="12" font-weight="800" fill="#fff" letter-spacing="3">SAT 12</text>${Array.from({length:21},(_,i)=>`<rect x="${6+(i%7)*11.5}" y="${32+Math.floor(i/7)*18}" width="9" height="12" fill="${i==4?"#f7c6d2":"#f1e6d8"}"/>`).join("")}<path class="glow" d="M63 66q-9-11-14-2 0 7 14 15 14-8 14-15-5-9-14 2Z" fill="#d94669" transform="translate(-10 -4) scale(.9)"/></g>
<path d="M740 186L460 480" stroke="none"/><g opacity=".9">${motes(520,140,300,300,16,u)}</g>
<g class="swing"><path d="M960 372q6-24 26-20 8 26-6 26h-18Z" fill="#6f9a6e"/><rect x="956" y="372" width="34" height="22" rx="4" fill="#c88a68"/></g>
<g><ellipse cx="560" cy="452" rx="300" ry="30" fill="none" stroke="#f3dce0" stroke-width="3" opacity=".6"/><ellipse cx="560" cy="452" rx="230" ry="22" fill="none" stroke="#f3dce0" stroke-width="2" opacity=".5"/><ellipse cx="560" cy="452" rx="150" ry="14" fill="none" stroke="#f3dce0" stroke-width="2" opacity=".45"/></g>
<g><ellipse cx="418" cy="478" rx="18" ry="8" fill="#e8a7ba"/><ellipse cx="452" cy="482" rx="18" ry="8" fill="#e8a7ba"/><circle cx="418" cy="474" r="3" fill="#fff"/><circle cx="452" cy="478" r="3" fill="#fff"/></g>
<g><circle cx="935" cy="366" r="16" fill="#c9965e"/><circle cx="923" cy="352" r="6" fill="#c9965e"/><circle cx="947" cy="352" r="6" fill="#c9965e"/><ellipse cx="935" cy="372" rx="8" ry="6" fill="#ecd0a8"/><circle cx="930" cy="362" r="1.6" fill="#2a1f2b"/><circle cx="940" cy="362" r="1.6" fill="#2a1f2b"/></g>
<g><rect x="28" y="300" width="170" height="8" fill="#8a5c68"/>${books(36,300,9,34,4)}<rect x="150" y="280" width="26" height="20" rx="4" fill="#f4e4d0"/></g>`;
DET.future=u=>`
<g clip-path="url(#${u}win)"><g class="car" style="--x0:520px;--x1:1020px;animation-duration:9s;--d:-2s"><rect y="96" width="22" height="9" rx="4" fill="#d7e8ff"/><path d="M-4 100h-14" stroke="#ff7ab8" stroke-width="2"/><circle class="bl" cx="22" cy="100" r="2.4" fill="#ff4a6a"/></g><g class="car" style="--x0:1020px;--x1:480px;animation-duration:12s;--d:-6s"><rect y="150" width="26" height="10" rx="5" fill="#fff0d0"/><circle class="bl" cx="0" cy="155" r="2.4" fill="#67e0ff"/></g>
<g class="holo"><rect x="650" y="206" width="110" height="38" rx="3" fill="#ff7ab8" opacity=".22" stroke="#ffb0d8"/><g class="neon" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M682 236q-18-14-18-24a10 10 0 0 1 18-6a10 10 0 0 1 18 6q0 10-18 24Z" stroke="#ff7ab8" stroke-width="3"/><path d="M722 212a14 14 0 1 0 14 14a10 10 0 0 1-14-14Z" stroke="#7ee8ff" stroke-width="3"/><path d="M742 238l8-8l8 8" stroke="#ffd6ec" stroke-width="3"/></g></g></g>
<g transform="translate(430 70)"><circle r="34" fill="#2a2342" stroke="#b79ac0" stroke-width="5"/><circle r="28" fill="#1b1730"/>${Array.from({length:12},(_,i)=>`<path d="M0 -24v4" stroke="#8fa6c8" stroke-width="2" transform="rotate(${i*30})"/>`).join("")}<path d="M0 0l-6 -16" stroke="#7ee8ff" stroke-width="3" stroke-linecap="round"/><path d="M0 0l12 4" stroke="#7ee8ff" stroke-width="2.4" stroke-linecap="round"/><path class="hand2" d="M0 0v-22" stroke="#ff7ab8" stroke-width="1.4"/></g>
<g><rect x="396" y="150" width="70" height="92" fill="#1b1730" stroke="#b79ac0" stroke-width="4"/><path d="M406 232l20-50 18 30 10-18 12 38Z" fill="#7a58b8" opacity=".8"/><circle class="glow" cx="440" cy="176" r="9" fill="#ffd8a8"/><text x="404" y="168" font-family="Space Mono,monospace" font-size="8" fill="#7ee8ff">SKYLINE</text></g>
<g><path d="M0 372h1100" stroke="#67e0ff" stroke-width="3" opacity=".5" class="glow"/><path d="M0 376h1100" stroke="#ff7ab8" stroke-width="2" opacity=".35" class="glow"/></g>
<g><rect x="1004" y="318" width="30" height="34" rx="3" fill="#7a5a7a"/><g class="swing"><path d="M1019 318q-20-30-6-44 12 14 6 44M1019 318q20-30 6-48-12 18-6 48" fill="#4ff0c0" opacity=".85"/></g><circle class="glow" cx="1019" cy="290" r="36" fill="#4ff0c0" opacity=".16"/></g>
<g><path d="M676 352l8-14h18l6 14Z" fill="#3a2f55"/><rect x="700" y="338" width="18" height="12" fill="#cfc2d8" transform="rotate(8 709 344)"/><path d="M760 348q18-10 38 0" stroke="#2a2342" stroke-width="5" fill="none"/><path d="M590 354h66" stroke="#b79ac0" stroke-width="2"/></g>
<g class="swing" style="animation-duration:5s"><path d="M690 322q-16-12-20 0 6 10 20 4 18 8 22-6-6-10-20 0m0 4l-6 24m8-24l8 22" fill="#ec9fb5" stroke="#f9d4d2"/></g>`;
DET.cafe=u=>`
<g transform="translate(330 66)"><circle r="30" fill="#f6ecd8" stroke="#8a6a58" stroke-width="5"/>${Array.from({length:12},(_,i)=>`<path d="M0 -24v4" stroke="#6a5048" stroke-width="2" transform="rotate(${i*30})"/>`).join("")}<path class="hand" d="M0 0v-17" stroke="#3a2f3a" stroke-width="3"/><path class="hand2" d="M0 0v-23" stroke="#c9577e" stroke-width="1.5"/></g>
<g><rect x="290" y="268" width="150" height="82" rx="6" fill="#d9c9d6" opacity=".35" stroke="#caa482" stroke-width="3"/><ellipse cx="330" cy="334" rx="22" ry="9" fill="#e8b46e"/><path d="M312 330q18-16 36 0" stroke="#c88a3e" stroke-width="3" fill="none"/><circle cx="378" cy="332" r="9" fill="#f4a9bd"/><circle cx="398" cy="332" r="9" fill="#a9d8c4"/><circle cx="418" cy="332" r="9" fill="#e8c9f0"/><path d="M290 268h150" stroke="#fff" stroke-opacity=".5" stroke-width="3"/></g>
<g><path d="M650 56q60 40 120 0" stroke="none"/><g class="swing"><path d="M700 44v40" stroke="#8a6a58"/><path d="M700 84q-24 10-30 40M700 84q0 36 6 54M700 84q24 16 30 34" stroke="#5f9a68" stroke-width="5" fill="none"/></g><g class="swing" style="animation-delay:-2s"><path d="M920 44v50" stroke="#8a6a58"/><path d="M920 94q-22 12-28 44M920 94q4 34 2 60M920 94q22 12 26 40" stroke="#5f9a68" stroke-width="5" fill="none"/></g></g>
<g opacity=".55"><path d="M860 150q-16-18 0-28 16 10 0 28Z" fill="none" stroke="#fff" stroke-width="3"/><path d="M820 206l20 16 30-30" stroke="#fff" stroke-width="2" fill="none" opacity=".4"/></g>
<g class="glow"><rect x="620" y="320" width="84" height="22" rx="11" fill="#ff7ab8" opacity=".25"/><text x="662" y="336" text-anchor="middle" font-family="Caveat,cursive" font-size="20" fill="#ffd6ec">open</text></g>
<g><path d="M1010 372v-60M1000 372h20" stroke="#6a4a50" stroke-width="5"/><path d="M996 312q14-26 28 0Z" fill="#6a89b5"/><path class="dr" d="M1010 318v26" stroke="#9db8ff" stroke-width="2" style="--h:50px"/></g>
<g opacity=".5">${[180,380,560].map(x=>`<ellipse cx="${x}" cy="470" rx="60" ry="8" fill="#ffd8a0"/>`).join("")}</g>
<g opacity=".7">${motes(30,100,560,260,14,u)}</g>`;
DET.bookstore=u=>`
<g><path d="M262 40v340M286 40v340" stroke="#8a6048" stroke-width="5"/>${[90,150,210,270,330].map(y=>`<path d="M262 ${y}h24" stroke="#8a6048" stroke-width="4"/>`).join("")}</g>
<g><rect x="650" y="170" width="150" height="8" fill="#8a6048"/><path d="M670 178v30M780 178v30" stroke="#8a6048" stroke-width="4"/><rect x="684" y="150" width="22" height="20" rx="3" fill="#f6e3cc"/><path class="steam" d="M692 146q-6-10 0-18" stroke="#fff" stroke-width="3" fill="none"/>${books(720,170,5,28,2)}</g>
<g><path d="M30 424q-2-46 36-46 40 0 40 46Z" fill="#b56a82"/><rect x="22" y="420" width="92" height="14" rx="7" fill="#9a5a72"/><path d="M118 380v-70" stroke="#6a4a50" stroke-width="5"/><path d="M96 310h44l-8 -24h-28Z" fill="#f3d9a0"/><circle class="glow" cx="118" cy="300" r="44" fill="#ffe3a8" opacity=".3"/></g>
<g><path d="M340 336h250v10H340Z" fill="#c99072"/><g class="catb"><ellipse cx="520" cy="320" rx="32" ry="14" fill="#d9a066"/><circle cx="496" cy="316" r="12" fill="#d9a066"/><path d="M490 306l4-10 6 8M502 304l6-8 3 10" fill="#d9a066"/><path d="M492 316q4 3 8 0" stroke="#3a2a2a" stroke-width="1.6" fill="none"/><path d="M548 322q22 2 22-14" stroke="#d9a066" stroke-width="7" fill="none" stroke-linecap="round" class="swing"/></g></g>
<g class="swing" style="--dx:0"><path d="M828 56v-14" stroke="#caa482" stroke-width="3"/><path d="M820 56h16l-4 12h-8Z" fill="#f0c36a"/><circle cx="828" cy="70" r="3" fill="#caa482"/></g>
${Array.from({length:7},(_,i)=>`<rect x="${700+i*16}" y="${400+i%2*8}" width="${44+i%3*8}" height="14" fill="${["#c4577a","#6f8bb5","#8fb89a","#e8b17a"][i%4]}" transform="translate(${i*3} ${-i*10})" opacity="0"/>`).join("")}
<g><rect x="860" y="410" width="56" height="12" fill="#c4577a"/><rect x="866" y="398" width="48" height="12" fill="#6f8bb5"/><rect x="858" y="386" width="52" height="12" fill="#e8b17a"/><rect x="868" y="374" width="40" height="12" fill="#8fb89a"/></g>
<g opacity=".8">${motes(780,80,230,300,18,u)}</g>`;
DET.station=u=>`
<g><rect x="30" y="236" width="86" height="130" rx="6" fill="#5a4a7a" stroke="#d7c2bf" stroke-width="4"/><rect x="40" y="246" width="50" height="76" fill="#1b1730"/>${[0,1,2].map(r=>[0,1].map(c=>`<rect x="${46+c*22}" y="${254+r*22}" width="16" height="16" fill="${["#ff9fc0","#9fe8c0","#ffd98f","#8fd0ff","#c9a8ff","#ffb08f"][r*2+c]}"/>`).join("")).join("")}<circle class="glow" cx="102" cy="262" r="5" fill="#9fe8c0"/></g>
<g><rect x="560" y="352" width="60" height="42" rx="6" fill="#8a5a62"/><rect x="570" y="340" width="40" height="14" rx="4" fill="#a8707a"/><path d="M572 394v16M608 394v16" stroke="#5a4048" stroke-width="5"/><path d="M590 340v-14" stroke="#caa482" stroke-width="3"/></g>
<g><rect x="1020" y="296" width="12" height="30" fill="#2a2a3a"/><circle class="bl" cx="1026" cy="304" r="4" fill="#ff4a6a"/><circle cx="1026" cy="318" r="4" fill="#2a5a3a"/></g>
<g class="steam" style="--d:-1s"><ellipse cx="300" cy="226" rx="30" ry="12" fill="#fff" opacity=".35"/></g><g class="steam" style="--d:-2.2s"><ellipse cx="600" cy="224" rx="36" ry="14" fill="#fff" opacity=".3"/></g>
<g><g class="bob"><ellipse cx="400" cy="402" rx="11" ry="7" fill="#9a96aa"/><circle cx="410" cy="396" r="5" fill="#9a96aa"/><path d="M414 396l7 2" stroke="#d9a77c" stroke-width="2"/></g><g class="bob" style="animation-delay:-2s"><ellipse cx="436" cy="410" rx="10" ry="6" fill="#aaa6ba"/><circle cx="445" cy="405" r="4.4" fill="#aaa6ba"/></g></g>
<path d="M0 480h1100M0 498h1100" stroke="#4a4660" stroke-width="3"/>${Array.from({length:20},(_,i)=>`<path d="M${i*60} 476v28" stroke="#3a3650" stroke-width="5"/>`).join("")}
<g opacity=".6">${motes(0,120,1100,240,12,u)}</g>`;
DET.wedding=u=>`
<g><path d="M400 70q150-70 300 0" stroke="#e7cfa6" stroke-width="5" fill="none"/>${[[455,50,"#c89ae0"],[520,28,"#f4a6bd"],[585,22,"#a6d0c2"],[650,32,"#f2d29a"],[700,66,"#e7a6bd"]].map(([x,y,c],i)=>`<g transform="translate(${x} ${y})"><path d="M0 0v20" stroke="#8a9a6a"/><path d="M-12 0l12-16 12 16-12 8Z" fill="${c}" opacity=".8"/></g>`).join("")}</g>
${[300,380,720,800].map((x,i)=>`<g class="swing" style="animation-delay:-${i*.7}s"><circle cx="${x}" cy="404" r="9" fill="${["#f4a8bd","#fff0e0","#c8a6e6","#a6d0c2"][i]}"/><path d="M${x} 413v18" stroke="#6e8b71" stroke-width="3"/></g>`).join("")}
${Array.from({length:7},(_,i)=>`<path d="M${400-i*50} ${400+i*16}l-16 26 6 4 18-24Z" fill="none"/>`).join("")}
<g opacity=".9">${Array.from({length:16},(_,i)=>`<path class="orb" style="--d:-${i*.5}s" d="M${430+(i*53)%240} ${140+(i*71)%240}q6-8 12 0-6 8-12 0Z" fill="${["#f6c9d4","#fff0e0","#f1b6c8"][i%3]}"/>`).join("")}</g>
<g opacity=".18">${[0,1,2].map(i=>`<path d="M${480+i*70} 70L${300+i*160} 390L${360+i*160} 390L${540+i*70} 70Z" fill="#fff0c0" class="glow"/>`).join("")}</g>`;
DET.kitchen=u=>`
<g><rect x="30" y="340" width="400" height="40" fill="none"/><rect x="540" y="86" width="500" height="6" fill="#8a6048"/>${[0,1,2,3,4].map(i=>`<g class="swing" style="animation-delay:-${i*.6}s"><path d="M${580+i*90} 92v34" stroke="#8a6048"/><ellipse cx="${580+i*90}" cy="140" rx="22" ry="14" fill="${["#b86b5b","#caa482","#9fb8c8","#d6b88a","#c88a8a"][i]}"/><path d="M${562+i*90} 140h36" stroke="#0003" stroke-width="3"/></g>`).join("")}</g>
<g><rect x="760" y="206" width="120" height="86" fill="#fff6e0" stroke="#caa482" stroke-width="4"/><text x="820" y="232" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="12" font-weight="800" fill="#c9577e" letter-spacing="2">OCTOBER</text>${Array.from({length:14},(_,i)=>`<rect x="${770+(i%7)*15}" y="${242+Math.floor(i/7)*20}" width="12" height="14" fill="${i==6?"#f7c6d2":"#f1e6d8"}"/>`).join("")}</g>
<g><ellipse cx="660" cy="396" rx="48" ry="12" fill="#d6b88a"/><circle cx="640" cy="384" r="14" fill="#d9503f"/><circle cx="668" cy="380" r="14" fill="#f2c14e"/><circle cx="690" cy="388" r="12" fill="#8fb06d"/></g>
<g opacity=".18">${[0,1,2,3].map(i=>`<path d="M${140+i*70} 54L${40+i*130} 380L${100+i*130} 380L${200+i*70} 54Z" fill="#fff0c0" class="glow"/>`).join("")}</g>
<g opacity=".8">${motes(60,60,420,300,16,u)}</g>`;
DET.bluehouse=u=>`
<g class="steam"><path d="M700 60q-14-24 4-44 18-20 0-40" stroke="#fff" stroke-width="12" fill="none" opacity=".4"/></g>
<g><rect x="600" y="380" width="30" height="40" fill="#6a5a4a"/><rect x="594" y="368" width="42" height="16" rx="3" fill="#d99aa6"/></g>
<g class="swing" style="transform-origin:120px 240px"><path d="M60 300h120" stroke="#6a5a4a" stroke-width="5"/><rect x="104" y="300" width="32" height="6" fill="#d99aa6"/><path d="M104 240v60M136 240v60" stroke="#6a5a4a" stroke-width="3"/></g>
<g>${[260,330,420,520,700,800].map((x,i)=>`<g class="bob" style="animation-delay:-${i*.8}s"><path d="M${x} 470v-26" stroke="#4e8a5a" stroke-width="3"/><circle cx="${x}" cy="438" r="9" fill="${["#f0a8b8","#fbd68a","#c3a8e0","#f6e3ee","#f0a8b8","#fbd68a"][i]}"/></g>`).join("")}</g>`;
DET.beach=u=>`
<g class="gull" style="animation-duration:20s"><path d="M0 90q8-12 18 0q10-12 18 0" stroke="#fff" stroke-width="2.5" fill="none"/></g>
<g><path d="M840 420q20-10 40 0M870 440q20-10 40 0" stroke="#c9a888" stroke-width="3" fill="none"/><path d="M910 470l8-10 8 10Z" fill="#f3d9c9"/><path d="M60 450q16-14 32 0-16 8-32 0Z" fill="#f3d9c9"/></g>
<g class="swing" style="transform-origin:860px 190px"><path d="M860 190l22-32 22 32-22 18Z" fill="#f4a6bd"/><path d="M860 190h44M882 158v50" stroke="#fff" stroke-width="1.5"/><path d="M882 208q-8 30 6 60" stroke="#fff" stroke-width="1.5" fill="none"/></g>`;
DET.archive=u=>`
<g opacity=".5">${[0,1,2].map(i=>`<ellipse cx="550" cy="440" rx="${120+i*70}" ry="${14+i*7}" fill="none" stroke="#c9a8ff" stroke-width="2" class="ripple" style="--d:-${i*1.3}s"/>`).join("")}</g>
${Array.from({length:7},(_,i)=>`<g class="orb" style="--d:-${i*.9}s"><path d="M${120+i*130} ${120+(i*53)%160}q14-12 28 0v26q-14-8-28 0Z" fill="#fff2d6" opacity=".8"/><path d="M${134+i*130} ${120+(i*53)%160}v26" stroke="#c9a8a0"/></g>`).join("")}`;
DET.mirror=u=>`
${Array.from({length:10},(_,i)=>`<path class="orb" style="--d:-${i*.8}s" d="M${340+(i*61)%420} ${60+(i*97)%360}l16-6 4 18Z" fill="#fff0e0" opacity=".55"/>`).join("")}`;
const MOOD={future:"g-cold",warmroom:"g-warm",cafe:"g-dusk",bookstore:"g-warm",station:"g-dusk",kitchen:"g-dream",bluehouse:"g-cold",beach:"g-dream",archive:"g-violet",mirror:"g-violet",wedding:"g-bright",black:"g-dark",street:"g-dusk",proposal:"g-violet"};

/* ---- epilogue illustrations: one distinct final image per ending ---- */
ART.endA=u=>ART.kitchen(u)+`<g>
<rect x="470" y="96" width="150" height="112" rx="4" fill="#f6e6d2" stroke="#b58f75" stroke-width="7"/><rect x="484" y="110" width="122" height="84" fill="#9fb3c8"/><circle cx="520" cy="146" r="14" fill="#ecc5b7"/><circle cx="570" cy="150" r="10" fill="#f0cfc2"/><path d="M484 176q60-18 122 0v18H484Z" fill="#d9c4a2"/><path d="M508 126q-8-10 0-14 8 4 2 12" fill="#e6a2b5"/>
<rect x="650" y="110" width="110" height="82" rx="4" fill="#f6e6d2" stroke="#b58f75" stroke-width="7"/><path d="M668 176V134a22 22 0 0 1 44 0v42Z" fill="#f2a8bd" stroke="#fff0e0" stroke-width="3"/><circle cx="702" cy="158" r="3" fill="#fff0e0"/>
<path d="M60 340h14M60 372h18M60 404h22M60 436h26" stroke="#7a5640" stroke-width="3"/><text x="82" y="344" font-family="Caveat,cursive" font-size="16" fill="#7a5640">E, 4</text><text x="90" y="408" font-family="Caveat,cursive" font-size="16" fill="#7a5640">E, 9</text>
<path d="M104 300q1 40-2 80" stroke="#7a5640" stroke-width="2" opacity=".0"/>
<g class="twk"><path d="M900 120l5 12 12 5-12 5-5 12-5-12-12-5 12-5Z" fill="#fff6c8"/></g></g>`;
ART.endB=u=>ART.bookstore(u)+`<g>
<rect x="150" y="300" width="130" height="14" rx="6" fill="#7b4f52"/><path d="M170 314l-14 120M262 314l14 120" stroke="#7b4f52" stroke-width="10"/><rect x="156" y="236" width="118" height="70" rx="12" fill="#b9788a" opacity=".92"/><path d="M158 248q60-20 114 0" stroke="#f8d4d1" stroke-width="5" fill="none"/>
<g class="swing"><path d="M214 232q-24-26-40-8 16 14 40 6 26 12 42-8-14-20-42 10m0 2l-12 40m16-40l14 36" fill="#f08cac" stroke="#fbd7d5" stroke-width="3"/></g>
<rect x="760" y="120" width="132" height="100" rx="4" fill="#f4e2cf" stroke="#9b6c60" stroke-width="7" style="animation:ghostfade 6s ease-in-out infinite alternate"/><rect x="774" y="134" width="104" height="72" fill="#a8b6c6" opacity=".6"/><path d="M790 206q16-40 36-30 20-10 36 30Z" fill="#d6c6bd" opacity=".35"/>
<path d="M200 462q300-18 700 0" stroke="#fff2c8" stroke-width="3" opacity=".35"/>
<rect x="470" y="40" width="160" height="36" rx="8" fill="#fff2e2" stroke="#d98aa4" stroke-width="3"/><text x="550" y="65" text-anchor="middle" font-family="Caveat,cursive" font-size="24" fill="#a64d6d">open</text></g>`;
ART.endC=u=>ART.cafe(u)+`<g>
<rect x="420" y="318" width="250" height="150" rx="6" fill="#f8ead4" stroke="#b78b6a" stroke-width="4" transform="rotate(-3 545 393)"/><path d="M440 346h200M440 364h180M440 382h200M440 400h120" stroke="#8a6a58" stroke-width="3" opacity=".6" transform="rotate(-3 545 393)"/><path d="M450 436q36-18 66 0" stroke="#2f4a7a" stroke-width="3" fill="none" transform="rotate(-3 545 393)"/><path d="M604 418l16 6M620 424l12-8" stroke="#7a2c4c" stroke-width="3"/>
<rect x="700" y="290" width="94" height="104" rx="6" fill="#fffaf2" stroke="#a7826a" stroke-width="4"/><rect x="700" y="290" width="94" height="24" rx="6" fill="#e58aa6"/><text x="747" y="308" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="12" font-weight="700" fill="#fff">APRIL</text><circle cx="764" cy="362" r="17" fill="none" stroke="#c0396b" stroke-width="3"/><path d="M718 340h60M718 356h40M718 372h60" stroke="#b9a89a" stroke-width="2"/>
<circle cx="330" cy="420" r="22" fill="#f7e5d3"/><circle cx="360" cy="440" r="22" fill="#f7e5d3"/><path class="steam" d="M326 392q-6-14 0-28M360 410q6-14 0-28" stroke="#fff" stroke-width="3" fill="none"/>
<path d="M90 450q150-90 230-200" stroke="#fbe2b4" stroke-width="3" stroke-dasharray="4 10" opacity=".7"/><g class="twk"><circle cx="900" cy="140" r="4" fill="#fff6c8"/></g></g>`;
ART.endD=u=>ART.future(u)+`<g>
<rect x="640" y="330" width="300" height="20" rx="4" fill="#5b4672" stroke="#e9c8d6" stroke-width="3"/>
<g style="transform-origin:790px 330px;animation:cbreath 5s ease-in-out infinite"><rect x="730" y="288" width="110" height="46" rx="3" fill="#fbefe0" stroke="#cdb6a0"/><path d="M730 290l55 28 55-28" fill="none" stroke="#c9a5a8" stroke-width="3"/><circle cx="785" cy="318" r="7" fill="#e07c9c"/></g>
<path d="M870 330q-34-26-52-6 22 14 52 6 30 12 44-8-16-18-44 8m0 0l-8 26" fill="#f2a0b9" stroke="#fbd4d1" stroke-width="2.5"/>
<path d="M705 60h280v270H705Z" fill="url(#${u}sky)" opacity=".35"/><path d="M705 200q140-60 280-10v140H705Z" fill="#ffd9a8" opacity=".28"/>
<g class="twk"><circle cx="840" cy="150" r="5" fill="#fff6c8"/><circle cx="900" cy="200" r="3" fill="#fff6c8"/></g></g>`;
Object.assign(MOOD,{endA:"g-bright",endB:"g-warm",endC:"g-dusk",endD:"g-violet"});
function sceneArtSvg(key,suffix=""){const u="v"+(++UID)+suffix+"_";return `<svg xmlns="${NS}" viewBox="0 0 1100 510" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${(ART[key]||ART.black)(u)}${(DET[key]||(()=>""))(u)}</svg>`}
/* =================================================================
   2. SCENE LAYERS, CAMERA, GRADE
   ================================================================= */
const stage=$("stage"),art=$("art");
function mk(cls,id){const e=document.createElement("div");e.className=cls;if(id)e.id=id;return e}
const ovs=[0,1].map(i=>{const el=mk("ovl","ov-"+i),cam=mk("cam");el.append(cam);art.after(el);return{el,cam}});
const fg=mk("","fg-layer"),grade=mk("","grade");const shade=stage.querySelector(".shade");shade.before(fg);shade.before(grade);
let flip=0,curScene="",zc=2;
const sceneOf=t=>{t=t||"";if(!$("title-overlay").classList.contains("hidden"))return"future";
 if(/Epilogue · The yellow/.test(t))return"endA";if(/Epilogue · The pink/.test(t))return"endB";if(/Epilogue · The long/.test(t))return"endC";if(/Epilogue · The letter/.test(t))return"endD";if(/Elara.s bedroom/.test(t))return"future";if(/Mira.s bedroom/.test(t))return"warmroom";if(/caf/i.test(t))return"cafe";if(/bookshop/i.test(t))return"bookstore";if(/station/i.test(t))return"station";if(/kitchen/i.test(t))return"kitchen";if(/blue house/i.test(t))return"bluehouse";if(/beach/i.test(t))return"beach";if(/archive/i.test(t))return"archive";if(/reflection/i.test(t))return"mirror";if(/wedding/i.test(t))return"wedding";return"black"};
let camKind="";
function setCam(kind,actorX){
 const L=ovs[flip].cam;L.className="cam";void L.offsetWidth;L.style.setProperty("--ox",(actorX||50)+"%");L.classList.add("c-"+kind);
 ["p-pan","p-push","p-close"].forEach(c=>stage.classList.remove(c));void stage.offsetWidth;stage.classList.add("p-"+(kind==="pull"?"push":kind));camKind=kind}
function showScene(key,why){
 if(key===curScene)return;const prev=curScene;curScene=key;
 flip^=1;const L=ovs[flip],O=ovs[flip^1];L.cam.innerHTML=sceneArtSvg(key);O.el.after(L.el);L.el.classList.add("on");setTimeout(()=>{if(ovs[flip]!==O)O.el.classList.remove("on")},1000);
 fg.innerHTML=FG[key]||"";grade.className=MOOD[key]||"";
 const yr=k=>["future","kitchen","bluehouse","beach","archive","mirror"].includes(k);
 if(prev&&yr(prev)!==yr(key)){grade.classList.remove("flash");void grade.offsetWidth;grade.classList.add("flash");sfx("whoosh")}
 setCam(prev?"pan":"pull")}
/* =================================================================
   3. CHARACTERS: detailed layered sprites
   ================================================================= */
const NAMES=["elara","adrian","celeste","officiant"];
const who=el=>{const a=(el.getAttribute("aria-label")||"").toLowerCase();return NAMES.includes(a)?a:"mira"};
const BROW={neutral:["M63 103q10-5 20-2","M105 101q10-3 20 2"],smile:["M63 102q10-7 20-3","M105 99q10-4 20 3"],sad:["M63 106q10 0 20-8","M105 98q10 8 20 8"],fear:["M62 100q10-6 21-12","M104 88q11 6 21 12"]};
Object.assign(BROW,{guarded:["M63 100q10 3 20 5","M105 105q10-3 20-5"],curious:["M63 97q10-8 20-3","M105 101q10-2 20 2"],surprise:["M62 97q10-10 21-4","M104 93q11-6 21 4"]});
const MOUTH={neutral:"M83 149Q95 152 107 149",smile:"M80 146Q95 160 110 146",sad:"M84 154Q95 145 106 154",fear:"M86 152q9-5 18 0q-9 7-18 0Z"};
Object.assign(MOUTH,{guarded:"M85 150h20",curious:"M84 148q11 5 22 0",surprise:"M89 151q6-7 12 0q-6 7-12 0Z"});
const HELD=`<g class="held h-phone"><rect x="95" y="266" width="19" height="31" rx="3.5" fill="#2b2440" stroke="#e9c8b6" stroke-width="1.6"/><rect class="scr" x="98" y="270" width="13" height="22" rx="1.5" fill="#f3b8d6"/></g>
<g class="held h-photo"><rect x="86" y="258" width="36" height="40" fill="#fbefe3" stroke="#d9c0ae"/><rect x="91" y="263" width="26" height="25" fill="#8fa0b8"/><circle cx="104" cy="273" r="5.5" fill="#ecc5b7"/><path d="M98 266q-7-6-1-9 5 3 4 8" fill="#e6a2b5"/></g>
<g class="held h-book"><path d="M84 270q12-8 24 0q12-8 24 0v24q-12-8-24 0q-12-8-24 0Z" fill="#fbf0e2" stroke="#a8808a" stroke-width="1.5"/><rect x="118" y="274" width="8" height="12" rx="3" fill="#ec9fb5"/></g>
<g class="held h-letter"><rect x="88" y="268" width="34" height="24" rx="2" fill="#f7e7d5"/><path d="M88 270l17 12 17-12" stroke="#bd98a1" fill="none" stroke-width="1.5"/></g>
<g class="held h-ticket"><path d="M90 272h32v20H90q4-6 0-10 4-4 0-10Z" fill="#f2d9b8" stroke="#fff0d5"/></g>
<g class="held h-cup"><path d="M92 276h22v18q-11 8-22 0Z" fill="#f7e5d3"/><path d="M114 281q9-1 4 8l-4 1" stroke="#f7e5d3" stroke-width="3" fill="none"/><path class="steam" d="M100 272q-4-8 0-14M106 272q4-8 0-14" stroke="#fff" stroke-width="2" fill="none"/></g>
<g class="held h-ring"><ellipse cx="104" cy="288" rx="7" ry="6" fill="none" stroke="#f5d48d" stroke-width="3"/><path class="twk" d="M104 276l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#fff6c8"/></g>
<g class="held h-bouquet"><path d="M104 300l-16-34M104 300l16-34M104 300v-38" stroke="#6e8b71" stroke-width="3"/><circle cx="86" cy="258" r="12" fill="#f6d5cd"/><circle cx="106" cy="250" r="13" fill="#fff0e2"/><circle cx="124" cy="260" r="11" fill="#f2b8c6"/></g>
<g class="held h-flowers"><path d="M104 300l-10-36M104 300l12-36" stroke="#759371" stroke-width="3"/><circle cx="92" cy="258" r="10" fill="#edafc0"/><circle cx="118" cy="256" r="10" fill="#f0bdc6"/></g>
<g class="held h-ribbon"><path d="M104 288q-14-12-20 0 8 10 20 4 16 8 20-4-6-10-20 0m0 4l-6 22m8-22l8 20" fill="#ec9fb5" stroke="#f9d4d2" stroke-width="1.5"/></g>`;
function el(tag,attrs,html){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(html)e.innerHTML=html;return e}
function frag(html){const g=document.createElementNS(NS,"g");g.innerHTML=html;return g}
function enhanceActor(a){
 if(a.dataset.enh)return;const svg=a.querySelector("svg");if(!svg)return;a.dataset.enh="1";const w=who(a);a.dataset.who=w;
 const kids=[...svg.children],pathD=(p,e)=>(e.getAttribute("d")||"").startsWith(p),find=p=>kids.find(e=>e.tagName==="path"&&pathD(p,e));
 const neck=find("M79 15"),face=find("M94 6"),mouth=find("M81 147"),arms=find("M146 248")||find("M143 258");
 if(!neck||!face||!mouth||!arms)return;
 const skin=face.getAttribute("fill")||"#ddb09f",armCol=arms.getAttribute("stroke")||skin;
 const clothesStart=kids.find(e=>["M23 400","M21 400","M74 186","M15 400","M18 400"].some(p=>pathD(p,e)));
 const clothesFill=clothesStart?clothesStart.getAttribute("fill"):"#bb8a9a";
 const nIdx=kids.indexOf(neck),cIdx=clothesStart?kids.indexOf(clothesStart):nIdx;
 const backHair=kids.slice(1,cIdx);
 const headEls=kids.slice(nIdx).filter(e=>e!==arms&&!(e.tagName==="path"&&(pathD("M139 295",e)||pathD("M72 185",e)))&&!(e.tagName==="circle"&&e.getAttribute("cy")==="220"));
 const hairBase=w==="mira"?null:kids.find(e=>e.tagName==="path"&&pathD("M42 127",e));
 const hairFill=hairBase?hairBase.getAttribute("fill"):((kids.find(e=>e.tagName==="path"&&["M43 102","M49 96","M48 96"].some(p=>pathD(p,e)))||{getAttribute:()=>"#382839"}).getAttribute("fill"));
 const head=el("g",{class:"head"}),headb=el("g",{class:"headb"});
 neck.before(head);if(backHair.length){backHair[0].before(headb);backHair.forEach(e=>headb.append(e))}
 /* body extras (under head) */
 const bodyEx={
  adrian:`<path d="M80 186l15 44 15-44z" fill="#f4efe9"/><path d="M95 196l-5 14 5 40 5-40-5-14z" fill="#8b3f55"/><path d="M60 186l22 44-26 20ZM130 186l-22 44 26 20Z" fill="#2a3a4e" stroke="#0004"/>`,
  celeste:`<path d="M50 200q45 36 92 0l14 36q-60 36-120 0Z" fill="#d4b48a" opacity=".95"/><path d="M60 214q36 18 72 0" stroke="#b5946a" stroke-width="3" fill="none"/>`,
  officiant:`<path d="M72 188l23 70 23-70" fill="#f1e8df"/><path d="M62 186l10 214h14L74 190ZM128 186l-10 214h-14l12-210Z" fill="#7d4a8a"/><circle cx="95" cy="262" r="5" fill="#e6c36a"/>`,
  elara:`<path d="M72 190q23 22 46 0" stroke="#f1d4d0" stroke-width="3" fill="none"/><circle class="twk" cx="95" cy="226" r="4.5" fill="#7ee8ff"/>`,
  mira:``};
 if(bodyEx[w])head.before(frag(bodyEx[w]));
 [...head.previousElementSibling&&bodyEx[w]?[]:[]];
 headEls.forEach(e=>head.append(e));
 if(hairBase&&w!=="elara")hairBase.style.display="none";
 /* eyes */
 const eyes=[...head.querySelectorAll("ellipse")].filter(e=>e.getAttribute("rx")==="5"),hls=[...head.querySelectorAll("circle")].filter(e=>e.getAttribute("r")==="1.2");
 const bd=(Math.random()*3.5).toFixed(2);a.style.setProperty("--bd","-"+bd+"s");
 eyes.forEach((eye,i)=>{const cx=+eye.getAttribute("cx"),ig=el("g",{class:"iris"});eye.before(ig);const scl=el("ellipse",{cx,cy:114,rx:7.6,ry:5.1,fill:"#fff8f4"});ig.before(scl);ig.append(eye);ig.append(el("circle",{cx,cy:114,r:2.2,fill:"#1c1420"}));hls.filter(h=>Math.abs(+h.getAttribute("cx")-cx)<3).forEach(h=>ig.append(h));ig.append(el("circle",{cx:cx-1.5,cy:112.6,r:1.1,fill:"#fff"}));
  const lid=el("ellipse",{class:"lid",cx,cy:113.5,rx:8.4,ry:6.2,fill:skin});ig.after(lid);
  head.insertBefore(el("path",{d:i?`M${cx-9} 111q9-7 19 1`:`M${cx-9} 112q9-7 19-2`,stroke:"#2a1f2b","stroke-width":2.2,fill:"none","stroke-linecap":"round"}),lid.nextSibling)});
 /* face detail */
 const detail=el("g",{});detail.innerHTML=`<ellipse cx="65" cy="131" rx="9" ry="5" fill="#e98f9e" opacity=".3"/><ellipse cx="125" cy="131" rx="9" ry="5" fill="#e98f9e" opacity=".3"/><path d="M95 122q-3 8 1 10" stroke="#b88873" stroke-width="1.6" fill="none" stroke-linecap="round"/>${w==="elara"?'<g fill="#b98368" opacity=".45"><circle cx="70" cy="126" r="1"/><circle cx="76" cy="129" r="1"/><circle cx="114" cy="129" r="1"/><circle cx="120" cy="126" r="1"/></g>':""}`;
 mouth.style.display="none";mouth.after(detail);
 const mo=el("g",{});const lip=w==="adrian"?"#9a5a60":"#b5606c";
 mo.innerHTML=Object.entries(MOUTH).map(([k,d])=>`<path class="mo mo-${k}" d="${d}" stroke="${lip}" stroke-width="3" fill="${k==="fear"?"#7a3445":"none"}" stroke-linecap="round"/>`).join("")+`<ellipse class="mo mo-talk" cx="95" cy="149" rx="7" ry="4.4" fill="#7a3445"/>`;
 detail.after(mo);
 const bw=w==="adrian"?4:3;
 const br=el("g",{});br.innerHTML=`<path class="brL" d="${BROW.neutral[0]}" stroke="${hairFill}" stroke-width="${bw}" fill="none" stroke-linecap="round" style="transition:d .5s"/><path class="brR" d="${BROW.neutral[1]}" stroke="${hairFill}" stroke-width="${bw}" fill="none" stroke-linecap="round" style="transition:d .5s"/>`;mo.after(br);
 const tears=el("g",{});tears.innerHTML=`<ellipse class="tear" cx="72" cy="122" rx="2.3" ry="3.6" fill="#bfe6ff"/><ellipse class="tear" cx="118" cy="122" rx="2.3" ry="3.6" fill="#bfe6ff"/>`;br.after(tears);
 /* hair highlight + character-specific hair/accessories */
 const hx={
  mira:`<path d="M60 58q22-18 48-6" stroke="#fff" stroke-opacity=".2" stroke-width="3" fill="none"/>`,
  elara:`<path d="M58 60q22-18 50-6" stroke="#fff" stroke-opacity=".2" stroke-width="3" fill="none"/><path d="M52 118q-6 50 0 100" stroke="#a89be0" stroke-width="4" fill="none" opacity=".9"/><rect x="132" y="70" width="14" height="6" rx="3" fill="#7ee8ff" transform="rotate(30 139 73)"/>`,
  adrian:`<path d="M54 100Q48 38 96 36q50 2 44 64-6-28-24-34Q86 58 66 74q-8 8-12 26Z" fill="${hairFill}"/><path d="M62 80q30-22 60-14" stroke="#fff" stroke-opacity=".15" stroke-width="3" fill="none"/><path d="M62 150q33 30 66 0" stroke="#2a2020" stroke-opacity=".3" stroke-width="7" stroke-dasharray="1 3" fill="none"/>`,
  celeste:`${[[52,70],[70,48],[96,40],[122,48],[140,70],[44,100],[146,100],[48,132],[142,132]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${y>90?15:19}" fill="${hairFill}"/>`).join("")}<g fill="none" stroke="#3b2f3a" stroke-width="2.4"><circle cx="75" cy="114" r="11"/><circle cx="114" cy="114" r="11"/><path d="M86 112q4-3 8 0"/></g><circle cx="52" cy="152" r="6" fill="none" stroke="#e7c35e" stroke-width="2"/><circle cx="138" cy="152" r="6" fill="none" stroke="#e7c35e" stroke-width="2"/>`,
  officiant:`<path d="M52 108q-10-38 12-52q-12 20-6 50Z M138 108q10-38-12-52 12 20 6 50Z" fill="${hairFill}"/><g fill="none" stroke="#7a6a5a" stroke-width="2"><rect x="63" y="108" width="24" height="15" rx="6"/><rect x="102" y="108" width="24" height="15" rx="6"/><path d="M87 114h15"/></g>`};
 const hlay=frag(hx[w]||"");head.append(hlay);
 /* arms */
 const rg=el("g",{class:"arm armR"}),lg=el("g",{class:"arm armL"});
 rg.innerHTML=`<path d="M146 248q-6 43-40 49" stroke="${armCol}" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M146 248q-3 20-14 33" stroke="${clothesFill}" stroke-width="17" stroke-linecap="round" fill="none"/><circle cx="106" cy="297" r="8" fill="${armCol}"/>${HELD}`;
 lg.innerHTML=`<path d="M35 256q7 52 44 41" stroke="${armCol}" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M35 256q2 22 14 36" stroke="${clothesFill}" stroke-width="17" stroke-linecap="round" fill="none"/><circle cx="79" cy="297" r="8" fill="${armCol}"/>`;
 arms.replaceWith(lg);lg.after(rg);
 a.dataset.emo="neutral";
}
function setEmo(a,emo){
 if(!a.dataset.enh)return;a.dataset.emo=emo;const b=BROW[emo]||BROW.neutral;
 const L=a.querySelector(".brL"),R=a.querySelector(".brR");if(L){L.setAttribute("d",b[0]);R.setAttribute("d",b[1])}
 a.classList.toggle("cry",emo==="sad"&&a._cry)}
const cls=(a,c,on=true)=>a&&a.classList.toggle(c,on);
const POSES=["pose-hold","pose-reachR","pose-reachL","pose-open","pose-touch","pose-photo","pose-bouquet","pose-tie","pose-gasp","pose-hug","pose-drop","pose-sad","pose-hesitate","pose-shy"];
const HOLDS=["phone","photo","book","letter","ticket","cup","ring","bouquet","flowers","ribbon"];
function clearPose(a){POSES.forEach(c=>a.classList.remove(c));HOLDS.forEach(h=>a.classList.remove("hold-"+h))}
function lookAt(a,dx,dy){if(!a)return;a.querySelectorAll(".iris").forEach(g=>g.style.translate=`${dx}px ${dy}px`)}
/* =================================================================
   4. SOUND  (own tiny synth, honours the game's effects slider)
   ================================================================= */
let AC=null,noiseBuf=null,rainGain=null,rainOn=false;
function audioInit(){if(AC){AC.state==="suspended"&&AC.resume();return}try{AC=new(window.AudioContext||window.webkitAudioContext)();const n=AC.sampleRate*2,b=AC.createBuffer(1,n,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;noiseBuf=b;const s=AC.createBufferSource();s.buffer=b;s.loop=true;const f=AC.createBiquadFilter();f.type="bandpass";f.frequency.value=2600;f.Q.value=.5;rainGain=AC.createGain();rainGain.gain.value=0;s.connect(f);f.connect(rainGain);rainGain.connect(AC.destination);s.start()}catch(_){AC=null}}
["pointerdown","keydown"].forEach(ev=>document.addEventListener(ev,audioInit,{passive:true}));
const vol=()=>document.body.classList.contains("vu-muted")?0:Math.max(0,Math.min(1,(+($("effects-volume")?.value||40))/100));
function tone(f,t,d,type="sine",g=.05,f2){if(!AC)return;const o=AC.createOscillator(),n=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,AC.currentTime+t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,AC.currentTime+t+d);n.gain.setValueAtTime(.0001,AC.currentTime+t);n.gain.linearRampToValueAtTime(g*vol(),AC.currentTime+t+.01);n.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+t+d);o.connect(n);n.connect(AC.destination);o.start(AC.currentTime+t);o.stop(AC.currentTime+t+d+.02)}
function hiss(t,d,g=.05,hp=1500,lp=9000){if(!AC||!noiseBuf)return;const s=AC.createBufferSource();s.buffer=noiseBuf;const a=AC.createBiquadFilter();a.type="highpass";a.frequency.value=hp;const b=AC.createBiquadFilter();b.type="lowpass";b.frequency.value=lp;const n=AC.createGain();n.gain.setValueAtTime(.0001,AC.currentTime+t);n.gain.linearRampToValueAtTime(g*vol(),AC.currentTime+t+.02);n.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+t+d);s.connect(a);a.connect(b);b.connect(n);n.connect(AC.destination);s.start(AC.currentTime+t);s.stop(AC.currentTime+t+d+.05)}
const SFX={
 buzz(){for(let i=0;i<4;i++)tone(95,i*.13,.1,"square",.05)},
 chime(){tone(880,0,.5,"sine",.06);tone(1320,.12,.6,"sine",.045)},
 steps(){for(let i=0;i<6;i++)hiss(i*.42,.09,.07,200,900)},
 paper(){hiss(0,.35,.06,2200,9000)},
 creak(){tone(180,0,.7,"sawtooth",.025,120)},
 door(){tone(140,0,.5,"sawtooth",.03,90);tone(1760,.5,.9,"sine",.04);tone(2349,.6,.8,"sine",.03)},
 whoosh(){hiss(0,.8,.06,300,2500)},
 heart(){for(let i=0;i<3;i++){tone(62,i*.9,.16,"sine",.12);tone(55,i*.9+.2,.14,"sine",.09)}},
 tap(){for(let i=0;i<5;i++)tone(1200+i*60,i*.11,.04,"square",.018)},
 kettle(){tone(1500,0,1.4,"sine",.02,2200)},
 gasp(){hiss(0,.25,.05,800,4000)},
 fade(){tone(520,0,2,"sine",.03,130)}
};
function sfx(n){audioInit();if(!AC||AC.state!=="running")return;try{SFX[n]&&SFX[n]()}catch(_){}}
/* =================================================================
   5. STORY-DRIVEN ANIMATION (reads the beat the game is showing)
   ================================================================= */
const timers=new Set();let planKey="",state={};
const later=(fn,ms)=>{const id=setTimeout(()=>{timers.delete(id);fn()},ms);timers.add(id)};
const clearTimers=()=>{timers.forEach(clearTimeout);timers.clear()};
const A=n=>stage.querySelector(`#actors .actor[data-who="${n}"]`);
const allActors=()=>[...stage.querySelectorAll("#actors .actor")];
const CHAR={elara:/elara/i,mira:/mira/i,adrian:/adrian/i,celeste:/celeste/i,officiant:/officiant/i};
function emoFor(t){t=t.toLowerCase();if(/afraid|frighten|fear|scared|terrif|disappear/.test(t))return"fear";if(/hurt|grief|sorrow|alone|loss|fade|dim|disconnect|release|letter|cannot say yes|cannot decide|can.t promise|quiet|silence/.test(t))return"sad";if(/smile|relief|small, brave|kindly|steady|together|delight|returns it|warm/.test(t))return"smile";return"neutral"}
function nounOf(s){const m=s.match(/phone|photograph|photo|picture|letter|notebook|poetry|book|collection|ring|bouquet|ticket|cup|flowers|cosmos|ribbon/i);if(!m)return null;const k=m[0].toLowerCase();return{photograph:"photo",picture:"photo",notebook:"book",poetry:"book",collection:"book",cosmos:"flowers"}[k]||k}
function sentences(t){return t.split(/(?<=[.!?;:])\s+/).filter(Boolean)}
function propDefault(){const p=stage.querySelector("#props .prop");return p?.dataset.kind||null}
function holderFor(kind,cast,scene,speaker){
 const has=n=>cast.includes(n);
 if(kind==="phone"||kind==="photo")return scene==="future"||scene==="beach"||scene==="archive"||scene==="mirror"?"elara":has("mira")?"mira":null;
 if(kind==="flowers")return has("adrian")?"adrian":"mira";
 if(kind==="ring")return has("adrian")?"adrian":null;
 return has("mira")?"mira":null}
function giveHold(name,kind,delay=350){const a=A(name);if(!a)return;later(()=>{clearPose(a);cls(a,"hold-"+kind);const pose=kind==="photo"?"pose-photo":kind==="bouquet"?"pose-bouquet":"pose-hold";cls(a,pose);state[name]={...(state[name]||{}),hold:kind,pose};syncHeld()},delay)}
function syncHeld(){const held=new Set(allActors().flatMap(a=>HOLDS.filter(h=>a.classList.contains("hold-"+h))));const props=$("props");props.classList.toggle("is-held",held.size>0);props.querySelectorAll(".prop").forEach(p=>p.classList.toggle("holdable",held.has(p.dataset.kind)))}
function propFx(kind,c,ms){const p=stage.querySelector(`#props .prop[data-kind="${kind}"]`)||stage.querySelector("#props .prop");if(!p)return;p.classList.add(c);if(ms)later(()=>p.classList.remove(c),ms)}
function stageFx(c,ms){stage.classList.add(c);if(ms)later(()=>stage.classList.remove(c),ms)}
function typingDots(ms=2600){const chat=$("chat");if(!chat||$("phone").classList.contains("hidden"))return;const t=document.createElement("div");t.className="typing2";t.innerHTML="<i></i><i></i><i></i>";chat.append(t);chat.scrollTop=chat.scrollHeight;sfx("tap");later(()=>t.remove(),ms)}
function walk(a,dx,opts={}){if(!a)return;a.style.setProperty("--wx",dx+"%");a.style.setProperty("--wd",(opts.d||3)+"s");a.classList.remove("walked");a.classList.add("walking");if(opts.door)a.classList.add("walk-door");sfx("steps");later(()=>{a.classList.remove("walking","walk-door");a.classList.add("walked")},(opts.d||3)*1000)}
function applyVerbs(text,cast,speakerName,scene){
 const sents=sentences(text);let t0=0,last=null;const solo=cast.length===1?cast[0]:null;
 sents.forEach((s,si)=>{
  let subj=null,pos=1e9;for(const [n,re] of Object.entries(CHAR)){const m=s.search(re);if(m>=0&&m<pos&&cast.includes(n)){pos=m;subj=n}}
  if(!subj)subj=last||solo||(speakerName&&cast.includes(speakerName)?speakerName:cast[0]);last=subj;
  const T=s.toLowerCase(),at=Math.min(si*1500,5600)+250,a=A(subj),other=cast.find(n=>n!==subj),oa=other&&A(other);
  const xOf=n=>{const e=A(n);return e?parseFloat(e.style.getPropertyValue("--actor-x")):50};
  const toward=other?Math.sign(xOf(other)-xOf(subj)):1;
  const doit=(re,fn)=>{if(re.test(T))later(fn,at)};
  doit(/keepsake box|opens .*box/,()=>{if(a){clearPose(a);cls(a,"pose-open");lookAt(a,0,2)}propFx("box","open");sfx("creak");later(()=>sfx("paper"),700)});
  doit(/lights up|new message|glows|buzz|vibrat|message arrives|phone glows/,()=>{propFx("phone","buzz",1300);$("phone").querySelector(".phone-device")?.classList.add("buzz");later(()=>$("phone").querySelector(".phone-device")?.classList.remove("buzz"),900);stageFx("fx-buzz",1000);sfx("buzz");later(()=>sfx("chime"),520)});
  doit(/pick(s|ed)? up|lift(s|ed)?|holds?|holding|clutch/,()=>{const k=nounOf(s)||propDefault();if(k&&HOLDS.includes(k)){const n=holderFor(k,cast,scene)||subj;const ha=A(n);if(ha){clearPose(ha);cls(ha,"hold-"+k);cls(ha,k==="photo"?"pose-photo":k==="bouquet"?"pose-bouquet":"pose-hold");state[n]={hold:k};syncHeld();sfx("paper")}}});
  doit(/reach(es|ed)?|stretch/,()=>{if(a){clearPose(a);cls(a,toward>=0?"pose-reachR":"pose-reachL")}});
  doit(/touch(es|ed)?|trac(es|ed)|straighten|runs? (a|her|his) hand/,()=>{if(a){const k=nounOf(s);clearPose(a);cls(a,"pose-touch");if(/fabric|dress/.test(T))stageFx("fx-dress",2500);if(k==="book")sfx("paper")}});
  doit(/walks?|steps? (toward|forward|into)|takes the (last|first)( careful)? step|toward the open doors|leaves|approach/,()=>{const door=/doors?/.test(T)&&scene==="wedding";if(a)walk(a,door?(50-xOf(subj))*.6:toward*9,{door,d:door?3.6:3})});
  doit(/steps? back|backs? away|lets his hand fall|steps away/,()=>{if(a){walk(a,-toward*6,{d:1.6});cls(a,"pose-sad");setEmo(a,"sad")}});
  doit(/turns? (from|away|toward)|turned|turns? and|turns from the aisle/,()=>{if(a&&!/page|photograph|key/.test(T)){cls(a,"turned",!/toward/.test(T)||true)}});
  doit(/turns? (a|the) page/,()=>{sfx("paper");propFx("book","buzz",600)});
  doit(/turns? the photograph/,()=>{const ha=A(subj);if(ha){clearPose(ha);cls(ha,"hold-photo");cls(ha,"pose-photo");syncHeld()}sfx("paper")});
  doit(/looks? (up|away|toward|from|at)|glances?|gaze|stares|watch/,()=>{if(a){const dir=/away/.test(T)?-toward*3:/down|from the dress/.test(T)?0:toward*3;lookAt(a,dir,/down|from the dress|ring/.test(T)?2:0);if(/up|doors|doorway/.test(T))lookAt(a,0,-2);later(()=>lookAt(a,0,0),2600)}});
  doit(/hesitat|pauses?|lingers|long breath|breathes?|stands with the question|waits|silence settle/,()=>{if(a){cls(a,"pose-hesitate")}});
  doit(/lowers?|set(s)? (the|a|it)|sets down|puts? down|rests?|lets go|falls|take(s)? the ring from her hand|drop/,()=>{if(a&&!/hand fall/.test(T)){const had=HOLDS.some(h=>a.classList.contains("hold-"+h));clearPose(a);cls(a,"pose-drop");syncHeld();if(/ring/.test(T)){cls(a,"hold-ring");later(()=>{cls(a,"hold-ring",false);syncHeld()},1400)}if(had)sfx("paper")}});
  doit(/typ(es|ing)|rereads|sends|then sends/,()=>{if(a){const k="phone";clearPose(a);cls(a,"hold-phone");cls(a,"pose-hold");syncHeld()}typingDots();});
  doit(/hug|embrace|together toward|step toward it together/,()=>{allActors().forEach(x=>{clearPose(x);cls(x,"pose-hug")});cast.length>1&&walk(A(cast[0]),4,{d:2.2})});
  doit(/unlock|turns the key|open doorway|open doors|steps into the quiet shop/,()=>{if(scene==="bookstore"){stageFx("fx-door");sfx("door")}});
  doit(/arrang|shelves|straighten|reading corner|familiar sign|writes the/,()=>{stageFx("fx-arrange");sfx("paper")});
  doit(/begins to change|fades?|fade|loses its detail|blurred|disappear|missing|empty chair/,()=>{stageFx("fx-fade");propFx("photo","fade");allActors().forEach(x=>{if(x.classList.contains("hold-photo"))x.classList.add("fx-photofade")});sfx("fade")});
  doit(/whisper|hush|guests|officiant (waits|pauses|stills)|settle/,()=>{stageFx("fx-guests",3800)});
  doit(/kettle|singing/,()=>{sfx("kettle")});
  doit(/connection|signal|bars/,()=>{$("phone").classList.add("weak");later(()=>$("phone").classList.remove("weak"),3500)});
  doit(/screen goes quiet|goes quiet|dim one by one/,()=>{$("phone").classList.add("dead");sfx("fade")});
  doit(/typing dots appear|dots appear/,()=>typingDots(3200));
  doit(/scared|frightened|afraid/,()=>{if(a){a._cry=true;a.classList.add("recoil");later(()=>a.classList.remove("recoil"),650);sfx("gasp")}});
  doit(/ribbon/,()=>{if(scene==="warmroom"||scene==="future"){propFx("ribbon","buzz",0)}});
  extraVerbs({doit,a,oa,subj,other,toward,T,s,cast,scene,xOf});
 })}
function planBeat(){
 const text=($("story-line").textContent||"").trim();if(!text)return;
 const spk=($("speaker").textContent||"").toLowerCase(),place=$("scene-place").textContent||"";
 const key=$("chapter-tag").textContent+"|"+spk+"|"+text;
 if(key===planKey)return;planKey=key;clearTimers();state={};
 $("phone").classList.remove("dead","weak");stage.classList.remove("fx-buzz","fx-door","fx-arrange","fx-fade","fx-guests","fx-dress");
 const scene=curScene,cast=allActors().map(a=>a.dataset.who).filter(Boolean);
 const speakerName=NAMES.concat(["mira"]).find(n=>spk.startsWith(n));
 const e=emoFor(text),mentioned=cast.filter(n=>CHAR[n].test(text));
 const talkers=speakerName&&cast.includes(speakerName)?[speakerName]:[];
 const isNarr=/narration|system/.test(spk);
 cast.forEach(n=>{const a=A(n);if(!a)return;clearPose(a);a.classList.remove("walked","walking","turned","walk-door","talk","cry","fx-photofade","listen","shake","clutch");a._cry=false;lookAt(a,0,0);
  let em="neutral";if(talkers.includes(n))em=e;else if(isNarr){em=(mentioned.includes(n)||cast.length===1)?e:"neutral"}else em=(e==="sad"||e==="fear")?"sad":(e==="smile"?"smile":"neutral");
  if(/(grief|hurt|afraid|disappear)/i.test(text)&&em!=="neutral"&&(n==="elara"||n==="mira"))a._cry=em==="sad"||em==="fear";
  setEmo(a,em);
  const o=cast.find(c=>c!==n),dx=o?Math.sign(parseFloat(A(o).style.getPropertyValue("--actor-x"))-parseFloat(a.style.getPropertyValue("--actor-x"))):0;lookAt(a,dx*2,0);
  if(em==="sad")cls(a,"pose-sad");});
 baseEmotions(cast,talkers,text);
 talkers.forEach(n=>{const a=A(n);if(!a)return;cls(a,"talk");later(()=>cls(a,"talk",false),Math.min(4200,Math.max(1200,text.length*52)))});
 const kind=propDefault();
 if(kind&&HOLDS.includes(kind)&&!/box|mirror/.test(kind)){const h=holderFor(kind,cast,scene);if(h&&!A(h).classList.contains("pose-sad"))giveHold(h,kind,500)}
 if(kind==="phone"&&scene==="future")later(()=>lookAt(A("elara"),0,2),700);
 syncHeld();applyVerbs(text,cast,speakerName,scene);
 const choicesUp=!!$("controls").querySelector(".choice");
 const emotional=e==="fear"||e==="sad";
 if(planKey&&curScene)shotDirector(text,spk,cast,scene,talkers,e,choicesUp);
}
/* chat observer: new bubbles pop, vibrate, chime */
const seenBubbles=new WeakSet();
function chatSync(){if(stage.classList.contains("vu-chat")||stage.classList.contains("vu-scene"))return;const chat=$("chat");chat.querySelectorAll(".bubble").forEach(b=>{if(seenBubbles.has(b))return;seenBubbles.add(b);b.classList.add("pop");b.addEventListener("animationend",()=>b.classList.remove("pop"),{once:true});if(!b.classList.contains("mine")&&$("intro").classList.contains("hidden")){const d=$("phone").querySelector(".phone-device");d?.classList.add("buzz");later(()=>d?.classList.remove("buzz"),900);sfx("buzz");later(()=>sfx("chime"),560)}else if(b.classList.contains("mine"))sfx("tap")})}
/* particles */
(function(){const w=$("weather");for(let i=0;i<22;i++){const p=document.createElement("i");p.className="petal2";p.style.cssText=`--x:${(i*47)%100}%;--d:-${(i*.9)%9}s;--t:${8+i%5}s`;w.append(p)}for(let i=0;i<26;i++){const p=document.createElement("i");p.className="mote";p.style.cssText=`--x:${(i*37)%100}%;--y:${20+(i*29)%70}%;--d:-${(i*.7)%9}s;--t:${8+i%6}s`;w.append(p)}for(let i=0;i<20;i++){const p=document.createElement("i");p.className="spark2";p.style.cssText=`--x:${(i*53)%100}%;--y:${(i*31)%90}%;--d:-${(i*.4)%3}s;--t:${2+i%3}s`;w.append(p)}})();
/* =================================================================
   6. OPENING FILM REEL
   ================================================================= */
const intro=$("intro");
(function(){["film-grain","film-scratch","film-leak"].forEach(c=>{const d=document.createElement("div");d.className=c;d.setAttribute("aria-hidden","true");intro.insertBefore(d,$("film-black"))})})();
let filmSig="";
const KIND_SIG={box:"M12 34h76",phone:"M28 5",photo:"M10 7",ring:'rx="25"',ribbon:"M47 38Q8",book:"M8 17q21",cup:"M17 29h61",flowers:"M50 90L33",bouquet:"M50 90L28",mirror:'rx="32"',ticket:"M10 22h80",letter:"M10 18"};
const kindOfObj=e=>{const h=e.innerHTML;return Object.keys(KIND_SIG).find(k=>h.includes(KIND_SIG[k]))||""};

/* ---- teaser montage art (full-frame drawn shots for the film trailer) ---- */
const TZ_W=(inner,extra="")=>`<svg viewBox="0 0 1100 510" preserveAspectRatio="xMidYMid slice" class="tzs ${extra}" xmlns="${NS}">${inner}</svg>`;
const TZ={
 t_venue:()=>{let ch="";for(let r=0;r<6;r++){const y=300+r*34,sc=.55+r*.2;for(const sd of[-1,1]){for(let c=0;c<3;c++){const x=550+sd*(120+c*70)*sc+sd*30;ch+=`<g transform="translate(${x} ${y}) scale(${sc})"><rect x="-17" y="-48" width="34" height="38" rx="5" fill="#f4e6d8" stroke="#cfae9c"/><rect x="-19" y="-12" width="38" height="10" rx="3" fill="#e9d2c0"/><path d="M-14 -2v22M14 -2v22" stroke="#a98a7a" stroke-width="3"/><path d="M-17 -44h34" stroke="#f0a9be" stroke-width="3"/></g>`}}}
  return TZ_W(`<defs><linearGradient id="tvs" x2="0" y2="1"><stop stop-color="#2a2140"/><stop offset=".6" stop-color="#d8a79a"/><stop offset="1" stop-color="#f2d4b8"/></linearGradient></defs><rect width="1100" height="510" fill="url(#tvs)"/><g fill="#fdf1e2" opacity=".9"><rect x="120" y="40" width="70" height="260" rx="35"/><rect x="910" y="40" width="70" height="260" rx="35"/></g><path d="M300 300q250-300 500 0" fill="none" stroke="#f9ede4" stroke-width="22"/><g>${[0,1,2,3,4,5,6,7].map(i=>`<circle cx="${330+i*62}" cy="${150-Math.sin(i/7*Math.PI)*0+(i%2)*6}" r="9" fill="#ffe6a8" class="tzb" style="animation-delay:-${i*.3}s"/>`).join("")}</g><path d="M500 510L535 270h30l35 240Z" fill="#fff3e6"/><path d="M505 500l30-230" stroke="#e8c9bb" stroke-width="2"/>${ch}<path d="M452 330h196" stroke="#f0a9be" stroke-width="3" opacity=".6"/>${Array.from({length:14},(_,i)=>`<ellipse class="tzp" cx="${420+i*20}" cy="-10" rx="5" ry="3" fill="#f6b6c8" style="animation-delay:-${i*.5}s"/>`).join("")}<rect width="1100" height="510" fill="#10091e" opacity=".28"/>`,"tz-dolly")},
 t_ring:()=>TZ_W(`<rect width="1100" height="510" fill="#17101f"/>${[[180,120,60],[900,90,80],[760,400,50],[110,380,70],[980,300,40]].map(([x,y,r],i)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#ffd9a0" opacity=".18" class="tzb" style="animation-delay:-${i*.4}s"/>`).join("")}<path d="M0 400q550-70 1100 0v110H0Z" fill="#5a2f45"/><ellipse cx="550" cy="330" rx="150" ry="125" fill="none" stroke="#f5d48d" stroke-width="30"/><ellipse cx="550" cy="330" rx="150" ry="125" fill="none" stroke="#fff3c4" stroke-width="5" opacity=".6" transform="translate(-6 -6)"/><path d="M505 198l45-62 45 62-45 34Z" fill="#eaf8ff" stroke="#bcd8ec" stroke-width="4"/><path d="M505 198h90M527 170l23 62 23-62" stroke="#ffffff" stroke-width="2" opacity=".8"/><path class="tzt" d="M690 130l9 24 24 9-24 9-9 24-9-24-24-9 24-9Z" fill="#fff6c8"/><path class="tzt" style="animation-delay:-.7s" d="M420 110l6 16 16 6-16 6-6 16-6-16-16-6 16-6Z" fill="#fff6c8"/>`,"tz-push"),
 t_cake:()=>TZ_W(`<rect width="1100" height="510" fill="#2a1d33"/><circle cx="550" cy="220" r="320" fill="#ffcf86" opacity=".14"/><path d="M0 410h1100v100H0Z" fill="#8b5a62"/><ellipse cx="550" cy="420" rx="340" ry="40" fill="#cf9a82"/><rect x="270" y="250" width="560" height="170" rx="26" fill="#fff3e6"/><path d="M270 292q280 70 560 0" stroke="#f0a8bd" stroke-width="34" fill="none"/><text x="550" y="385" text-anchor="middle" font-family="Caveat,cursive" font-size="92" fill="#b3566f">${"ELARA".split("").map((c,i)=>`<tspan class="tzl" style="animation-delay:${1.0+i*.22}s">${c}</tspan>`).join("")}</text>${[400,550,700].map((x,i)=>`<g class="tzf" style="animation-delay:-${i*.5}s"><rect x="${x-9}" y="170" width="18" height="82" fill="#f9e0e8"/><ellipse cx="${x}" cy="150" rx="15" ry="30" fill="#ffd36e"/></g>`).join("")}`,"tz-push"),
 t_beach:()=>TZ_W(`<rect width="1100" height="510" fill="#2b2437"/><g transform="rotate(-3 550 255)"><rect x="220" y="40" width="660" height="430" fill="#fffaf0" stroke="#d8c8b0" stroke-width="3"/><rect x="250" y="70" width="600" height="320" fill="#f2cdb9"/><rect x="250" y="70" width="600" height="150" fill="#8aa0c4"/><circle cx="740" cy="130" r="38" fill="#ffe3b0"/><path d="M250 215q120-24 240 0t360 0V240H250Z" fill="#6f8aa8"/><path d="M250 250q300-30 600 0v140H250Z" fill="#e6c8ae"/><path d="M250 232q80 14 160 0t200 8" stroke="#fff" stroke-width="5" fill="none" opacity=".7"/><g><path d="M420 380l24-80h42l24 80Z" fill="#c76a82"/><circle cx="465" cy="280" r="20" fill="#e8c5b2"/><path d="M445 270q20-26 40 0" fill="#453348"/></g><g><path d="M560 380l24-76h42l24 76Z" fill="#5a8fa8"/><circle cx="605" cy="286" r="20" fill="#d9ab98"/><path d="M585 276q20-26 40 0" fill="#2d2535"/></g><g class="tzfade"><path d="M690 380l16-52h32l16 52Z" fill="#f4c0cf"/><circle cx="722" cy="316" r="15" fill="#e8c5b2"/><path d="M707 308q15-20 30 0" fill="#6a4a58"/></g><text x="270" y="440" font-family="Caveat,cursive" font-size="34" fill="#7a6a62">the three of us</text></g>`,"tz-push"),
 t_door:()=>TZ_W(`<rect width="1100" height="510" fill="#0b0814"/><g><rect x="330" y="60" width="440" height="400" fill="#2a2036"/><rect x="350" y="80" width="400" height="380" fill="#3b2b2f"/><rect x="350" y="80" width="400" height="380" fill="#ffd9a0" opacity=".0" class="tzroomlight"/><path d="M350 460h400l60 50H290Z" fill="#7a5a48"/><rect x="560" y="300" width="130" height="120" rx="10" fill="#6a4a60"/><rect x="590" y="270" width="70" height="40" rx="12" fill="#8a6a7a"/><rect x="420" y="170" width="70" height="90" fill="#35456a"/><circle cx="650" cy="240" r="44" fill="#ffe2a8" opacity=".25"/></g><g class="tzdoor"><rect x="350" y="80" width="400" height="380" fill="#6b4a52" stroke="#a87b76" stroke-width="8"/><rect x="385" y="115" width="140" height="130" fill="none" stroke="#8c6268" stroke-width="5"/><rect x="575" y="115" width="140" height="130" fill="none" stroke="#8c6268" stroke-width="5"/><rect x="385" y="285" width="330" height="130" fill="none" stroke="#8c6268" stroke-width="5"/><circle cx="715" cy="290" r="12" fill="#f0c36a"/></g><g class="tzfig"><path d="M520 460q10-110 35-120t35 120Z" fill="#05040a"/><circle cx="555" cy="326" r="22" fill="#05040a"/></g><rect width="1100" height="510" fill="#05040a" opacity=".3"/>`,"tz-dolly"),
 t_letter:()=>TZ_W(`<rect width="1100" height="510" fill="#1b1424"/><circle cx="260" cy="120" r="260" fill="#ffd9a0" opacity=".16"/><path d="M0 380h1100v130H0Z" fill="#5a3b40"/><g transform="rotate(-4 550 280)"><rect x="330" y="90" width="440" height="320" fill="#fffaf0" stroke="#d6c6ae" stroke-width="3"/><text x="370" y="150" font-family="Caveat,cursive" font-size="44" fill="#4a3a52">Dear Mira,</text><g stroke="#cbbfb0" stroke-width="3">${[200,240,280,320,360].map((y,i)=>`<path d="M370 ${y}h${300-i*24}"/>`).join("")}</g><path class="tzpen" d="M370 215q40-14 80 0t80 0t80 0" fill="none" stroke="#3a4a8a" stroke-width="4"/></g><g class="tzhand"><path d="M650 430q-20-90 40-160 24-26 44-6 16 20-10 52l-6 30q40-10 56 20 12 30-50 70Z" fill="#e8bda8" stroke="#c99a84" stroke-width="3"/><path d="M690 270q-10 36 0 56M716 262q-6 38 6 60" stroke="#c99a84" stroke-width="3" fill="none"/></g><path d="M880 420q30-60 14-120" stroke="#c99a84" stroke-width="0"/>`,"tz-push")
};
function filmSync(){
 if(intro.classList.contains("hidden"))return;
 const world=$("film-world"),mid=$("film-mid"),scene=world.dataset.scene||"black";
 const isCity=!!$("film-back").querySelector("#citysky");
 const key=isCity?"future":scene==="street"?"street":scene==="proposal"?"proposal":scene;
 if(!mid.querySelector(".ovf")){
  const o=mk("ovf");
  if(scene==="split"){o.innerHTML=`<div style="position:absolute;left:0;top:0;bottom:0;width:50%;overflow:hidden">${sceneArtSvg("future","f")}</div><div style="position:absolute;right:0;top:0;bottom:0;width:50%;overflow:hidden">${sceneArtSvg("warmroom","f")}</div><div style="position:absolute;left:calc(50% - 2px);top:0;bottom:0;width:4px;background:linear-gradient(#fff0,#ffd0e8,#fff0);filter:blur(1px)" class="glow"></div>`}
  else o.innerHTML=isCity?`<svg viewBox="0 0 1100 510" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="fcs" x2="0" y2="1"><stop stop-color="#0d1533"/><stop offset=".65" stop-color="#5a4a8a"/><stop offset="1" stop-color="#c286a6"/></linearGradient></defs>${city("fc",0,0,1100,510).replace(/url\(#fcsky\)/,"url(#fcs)")}${rain(0,0,1100,520,120)}</svg>`:sceneArtSvg(key,"f");
  mid.prepend(o)}
 const shotId=world.dataset.shot||"",objs=[...$("film-objects").querySelectorAll(":scope>.film-object")].map(kindOfObj),sig=shotId+"|"+scene+"|"+(isCity?"city":"")+"|"+objs.join(",")+"|"+$("film-actors").children.length+"|"+($("film-caption-text").textContent||"");
 if(sig===filmSig)return;filmSig=sig;clearTimers();
 const acts=[...$("film-actors").children].filter(a=>a.dataset.enh);
 const names=acts.map(a=>a.dataset.who),g=n=>acts.find(a=>a.dataset.who===n);
 acts.forEach(a=>{clearPose(a);a.classList.remove("walked","walking","turned")});
 const has=k=>objs.includes(k);
 if(has("box")&&g("elara")){const a=g("elara");setEmo(a,"sad");later(()=>{clearPose(a);cls(a,"pose-open");$("film-objects").querySelector(".film-object")?.classList.add("open");sfx("creak")},700)}
 if(has("photo")&&g("elara")){const a=g("elara");later(()=>{cls(a,"hold-photo");cls(a,"pose-photo");sfx("paper")},800)}
 if(has("phone")&&g("elara")&&scene==="future"){const a=g("elara");setEmo(a,"fear");later(()=>{sfx("buzz");later(()=>sfx("chime"),520);cls(a,"hold-phone");cls(a,"pose-hold");lookAt(a,0,3)},900)}
 if(scene==="warmroom"&&g("mira")&&names.length===1&&shotId!=="t_mira"){const a=g("mira");setEmo(a,"smile");later(()=>{cls(a,"hold-ribbon");cls(a,"pose-tie");sfx("paper")},900)}
 if(scene==="cafe"){g("mira")&&setEmo(g("mira"),"smile");g("adrian")&&setEmo(g("adrian"),"smile");later(()=>{g("adrian")&&(cls(g("adrian"),"hold-flowers"),cls(g("adrian"),"pose-hold"))},900)}
 if(scene==="street"){acts.forEach(a=>{setEmo(a,"smile");walk(a,10,{d:4})})}
 if(scene==="proposal"){g("adrian")&&(setEmo(g("adrian"),"smile"),later(()=>{const a=g("adrian");cls(a,"hold-ring");cls(a,"pose-reachR");sfx("gasp")},1200));g("mira")&&(setEmo(g("mira"),"smile"),later(()=>{cls(g("mira"),"pose-gasp")},1800))}
 if(scene==="wedding"&&names.includes("celeste")){setEmo(g("mira"),"fear");later(()=>{cls(g("celeste"),"pose-touch");sfx("paper")},900)}
 if(scene==="warmroom"&&names.includes("adrian")){setEmo(g("mira"),"sad");setEmo(g("adrian"),"neutral");cls(g("adrian"),"turned");sfx("fade")}
 if(scene==="future"&&has("photo")&&has("phone")){acts.forEach(a=>{setEmo(a,"fear");a._cry=true;a.classList.add("cry")});sfx("buzz")}
 if(scene==="split"){const e=g("elara"),m=g("mira");e&&(setEmo(e,"sad"),cls(e,"pose-reachR"));m&&(setEmo(m,"sad"),cls(m,"pose-reachL"));sfx("heart")}
 if(scene==="wedding"&&!names.length)sfx("heart");
 const FO=$("film-objects"),fx=(cls_,html)=>{const d=mk("vfx "+cls_);d.innerHTML=html||"";FO.append(d);return d};
 if(TZ[shotId]){fx("tz "+shotId,TZ[shotId]());const fl=fx("tz-flash");({t_venue:()=>sfx("heart"),t_ring:()=>sfx("chime"),t_cake:()=>sfx("fade"),t_beach:()=>sfx("fade"),t_door:()=>sfx("creak"),t_letter:()=>sfx("paper")}[shotId]||(()=>{}))();FO.style.opacity=1}
 if(shotId==="t_mira"){const a=g("mira");a&&(setEmo(a,"sad"),later(()=>lookAt(a,-3,2),700),later(()=>{cls(a,"pose-hold");cls(a,"hold-ring")},900))}
 if(shotId==="strip")fx("fx-flick");
 if(shotId==="box"){later(()=>fx("fx-dust",'<i></i><i></i><i></i><i></i><i></i>'),900)}
 if(shotId==="phone"){fx("fx-glow")}
 if(shotId==="street"){$("film-back").classList.add("fx-pan");acts.forEach(a=>a.classList.add("walkbob"))}else $("film-back").classList.remove("fx-pan");
 if(shotId==="proposal"){later(()=>{fx("fx-sparkle",'<i></i><i></i><i></i><i></i><i></i><i></i>');sfx("chime")},1500);later(()=>fx("fx-hearts",'<i>♥</i><i>♥</i><i>♥</i>'),2400)}
 if(shotId==="veil"){fx("fx-veil")}
 if(shotId==="crack"){later(()=>{fx("fx-crack",'<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M50 0L47 18L54 32L45 50L53 66L48 82L51 100" /></svg>');sfx("fade")},900)}
 if(shotId==="change"){const p=FO.querySelector(".film-object");p&&p.classList.add("fx-fadephoto");later(()=>sfx("fade"),700)}
 if(shotId==="ribbon"){const r=FO.querySelector(".film-object");r&&r.classList.add("fx-tie");later(()=>sfx("paper"),600)}
 if(shotId==="aisle"){fx("fx-doors",'<b></b><b></b><u></u>');sfx("creak")}
 if(shotId==="connection"){later(()=>fx("fx-spark2",'<i></i><i></i><i></i><i></i><i></i>'),1400)}
 syncHeld()}
function filmFrames(){const fr=$("film-strip").querySelectorAll(".strip-frame");if(!fr.length||fr[0].dataset.vu)return;["future","warmroom","wedding","kitchen","future"].forEach((k,i)=>{if(fr[i]){fr[i].dataset.vu="1";fr[i].innerHTML=sceneArtSvg(k,"s"+i)}})}
/* =================================================================
   7. SYNC LOOP
   ================================================================= */
let queued=0;
function q(){if(queued)return;queued=requestAnimationFrame(()=>{queued=0;try{sync()}catch(e){console.warn("visual upgrade:",e)}})}
function sync(){
 /* props get a kind for CSS */
 stage.querySelectorAll("#props .prop").forEach(p=>{if(!p.dataset.kind)p.dataset.kind=p.getAttribute("aria-label")||"";if(p.dataset.kind==="cup"&&!p.querySelector(".steam"))p.querySelector("svg")?.insertAdjacentHTML("beforeend",'<path class="steam" d="M40 24q-8-12 0-22M56 24q8-12 0-22" stroke="#fff" stroke-width="4" fill="none"/>')});
 document.querySelectorAll("#actors .actor,#film-actors .actor").forEach(enhanceActor);
 showScene(sceneOf($("scene-place").textContent),"sync");
 if(intro.classList.contains("hidden")){filmSig="";planBeat();const pd=$("phone");/*phone state reset handled in planBeat*/}
 else{filmFrames();filmSync()}
 /* reapply persisted holds to rebuilt actors (rendering rebuilds sprites on choice) */
 chatSync();threadSync();
 const rainNow=($("weather").classList.contains("rain")&&intro.classList.contains("hidden"))||(!intro.classList.contains("hidden")&&!$("film-rain").classList.contains("hidden"));
 if(AC&&rainGain&&rainNow!==rainOn){rainOn=rainNow;rainGain.gain.setTargetAtTime(rainNow?.05*vol()*3:0,AC.currentTime,.6)}
 if(AC&&rainGain&&rainOn)rainGain.gain.setTargetAtTime(.05*vol()*3,AC.currentTime,.4)}
/* =================================================================
   8. CONVERSATION ENGINE: paced phone chat + in-person live scenes
   ================================================================= */
SFX.pop=()=>tone(660,0,.08,"sine",.035,900);
SFX.send=()=>tone(520,0,.07,"sine",.04,780);
const body=document.body;
const thread=document.createElement("div");thread.id="vu-thread";thread.setAttribute("role","log");thread.setAttribute("aria-label","Story conversation");$("chat").after(thread);
const live=document.createElement("div");live.id="vu-live";live.setAttribute("aria-hidden","true");stage.append(live);
let mirrored=new Set(),lastBeat="",lastPlace="",lastChoice="",queue=[],tTimer=0,recent=[],lastWho="",lastFigs=[],miraName="Mira",lastMode="off",liveFig="",liveFigScene="",liveType=null,playSince=0;
const norm=s=>(s||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
const titleCase=s=>s.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());
function whoFromSpeaker(s){s=(s||"").toLowerCase();if(s.startsWith("narration"))return"narr";if(s.startsWith("system"))return"sys";if(s.startsWith("adrian"))return"adrian";if(s.startsWith("celeste"))return"celeste";if(s.startsWith("officiant"))return"officiant";if(s.startsWith("elara"))return"elara";if(/· 2024$/.test(s)){miraName=titleCase(s.split(" · ")[0]);return"mira"}return"narr"}
const nameOf=w=>({mira:miraName,elara:"Elara",adrian:"Adrian",celeste:"Celeste",officiant:"Officiant"})[w]||"";
const flower=(cx,cy,r,col)=>{let s="";for(let i=0;i<8;i++)s+=`<ellipse cx="${cx}" cy="${cy-r}" rx="${r*.38}" ry="${r}" fill="${col}" transform="rotate(${i*45} ${cx} ${cy})"/>`;return s+`<circle cx="${cx}" cy="${cy}" r="${r*.28}" fill="#f6c453"/>`};
const SV=(inner,bg="#eddde6")=>`<svg viewBox="0 0 240 140" xmlns="${NS}"><rect width="240" height="140" fill="${bg}"/>${inner}</svg>`;
const FIG={
 photoribbon:()=>SV(`<g transform="rotate(-5 120 70)"><rect x="62" y="12" width="116" height="116" fill="#fbf1e6" stroke="#d8c3b5"/><rect x="70" y="20" width="100" height="80" fill="#9fb0c8"/><path d="M70 84q25-14 50 0t50 0v16H70Z" fill="#6f8aa8"/><circle cx="108" cy="52" r="12" fill="#ecc5b7"/><path d="M96 46q0-18 14-16 16 0 14 18-12-10-28-2Z" fill="#453348"/></g><g class="swing"><path d="M150 32q-18-16-26 0 8 12 24 4 20 10 26-6-6-12-24 2m0 6l-10 34m14-34l12 30" fill="#ec9fb5" stroke="#f9d4d2"/></g>`),
 notebook:()=>SV(`<path d="M20 22q50-14 100 4v98q-50-16-100 0Z" fill="#fbf0e2" stroke="#a8808a" stroke-width="2"/><path d="M120 26q50-18 100-4v100q-50-16-100 0Z" fill="#fff6ea" stroke="#a8808a" stroke-width="2"/><g stroke="#b9a29a" stroke-width="1.5"><path d="M34 44h70M34 56h60M34 68h66M34 80h50"/></g><path d="M150 108V62q0-26 24-26t24 26v46Z" fill="#fff" stroke="#c9577e" stroke-width="2"/><path class="dooropen" d="M150 108V62q0-26 24-26t24 26v46Z" fill="#ec8aa6" stroke="#c9577e" stroke-width="2"/><circle cx="190" cy="84" r="2.5" fill="#f0c36a"/><path d="M140 112h68" stroke="#6f8bb5" stroke-width="2"/>`),
 cosmos:()=>SV(`${flower(70,78,24,"#f1b6c8")}${flower(130,60,28,"#f6c9d4")}${flower(184,86,22,"#eaa6bd")}<path d="M70 102q-4 30-12 40M130 88q4 30 0 52M184 108q-4 22-10 32" stroke="#6f9a6e" stroke-width="3" fill="none"/>${Array.from({length:18},(_,i)=>`<line class="rs" x1="${10+i*13}" y1="0" x2="${6+i*13}" y2="12" stroke="#7a8fb8" stroke-width="1.3" style="--h:140px;--d:-${i*.17}s"/>`).join("")}`,"#c8d4e8"),
 lease:()=>SV(`<rect x="62" y="10" width="116" height="122" fill="#fffdf6" stroke="#cdbfae"/><text x="74" y="32" font-family="Fraunces,serif" font-size="13" font-weight="700" fill="#4a3a52" letter-spacing="2">LEASE</text><g stroke="#cbbfb0" stroke-width="2"><path d="M74 46h92M74 58h80M74 70h90M74 82h60"/></g><path class="signp" d="M78 112q10-18 18 0t18-4 16 6 18-6" stroke="#3a4a8a" stroke-width="2.5" fill="none"/><circle cx="168" cy="22" r="9" fill="#d48aa5" opacity=".8"/>`,"#d9ccd6"),
 ring:()=>SV(`<rect x="40" y="86" width="160" height="40" rx="8" fill="#5a2f45"/><ellipse cx="120" cy="82" rx="26" ry="22" fill="none" stroke="#f5d48d" stroke-width="8"/><path d="M110 58l10-12 10 12-10 8Z" fill="#e8f6ff" stroke="#bcd8ec"/><path class="twk" d="M150 40l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="#fff6c8"/><path class="twk" style="--d:-1s" d="M88 36l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#fff6c8"/>`,"#3a2e52"),
 dress:()=>SV(`<path d="M120 10v18" stroke="#8a6a58" stroke-width="3"/><path d="M96 34q24-14 48 0" stroke="#8a6a58" stroke-width="3" fill="none"/><g class="swing"><path d="M100 36q20-10 40 0l4 40q-24 12-48 0Z" fill="#fff6ea" stroke="#e0cbb8" stroke-width="2"/><path d="M96 76q24 14 48 0l30 56q-54 10-108 0Z" fill="#fff0e0" stroke="#e0cbb8" stroke-width="2"/><path d="M80 112q40 14 80 0" stroke="#efd9c6" stroke-width="2" fill="none"/></g>`,"#e0c9d6"),
 cake:()=>SV(`<ellipse cx="120" cy="124" rx="76" ry="9" fill="#c99072"/><rect x="58" y="78" width="124" height="44" rx="8" fill="#fff3e6"/><path d="M58 92q62 16 124 0" stroke="#f0a8bd" stroke-width="10" fill="none"/><text x="86" y="114" font-family="Caveat,cursive" font-size="22" fill="#b3566f">ELARA</text><g class="flk"><rect x="92" y="52" width="5" height="24" fill="#f9e0e8"/><ellipse cx="94.5" cy="46" rx="5" ry="9" fill="#ffd36e"/></g><g class="flk" style="animation-delay:-.7s"><rect x="144" y="52" width="5" height="24" fill="#f9e0e8"/><ellipse cx="146.5" cy="46" rx="5" ry="9" fill="#ffd36e"/></g>`,"#f6e0a8"),
 beach:()=>SV(`<rect x="14" y="10" width="212" height="120" fill="#fffaf0" stroke="#d8c8b0"/><rect x="24" y="20" width="192" height="90" fill="#f2cdb9"/><rect x="24" y="20" width="192" height="40" fill="#8aa0c4"/><path d="M24 70q96-12 192 0v40H24Z" fill="#e6c8ae"/><path d="M80 98l8-22h14l8 22Z" fill="#c76a82"/><path d="M130 98l8-22h14l8 22Z" fill="#5a8fa8"/><path d="M172 98l5-14h8l5 14Z" fill="#c9b6d8"/><g class="fadeout"><circle cx="181" cy="74" r="6" fill="#e8c5b2"/><path d="M175 80q6 6 12 0v12h-12Z" fill="#f4c0cf"/></g>`,"#cdb8a6"),
 bluehouse:()=>SV(`<rect y="100" width="240" height="40" fill="#7f9c8a"/><g style="animation:hue 5s ease-in-out infinite alternate"><path d="M52 62l68-40 68 40v66H52Z" fill="#7690b1" stroke="#e1d3c9" stroke-width="3"/><rect x="104" y="84" width="32" height="44" fill="#d99aa6"/><rect x="66" y="74" width="26" height="22" fill="#fbe8ae"/><rect x="148" y="74" width="26" height="22" fill="#fbe8ae"/></g><g class="swing"><path d="M206 66q-10-8-14 0 4 6 14 2 10 6 14-2-2-8-14 2" fill="#ec9fb5"/></g>`,"#a8bad2"),
 mirror:()=>SV(`<ellipse cx="120" cy="72" rx="52" ry="62" fill="#d4a46a" stroke="#f0d6a6" stroke-width="4"/><ellipse cx="120" cy="72" rx="44" ry="54" fill="#8e7aa8"/><g class="fadeout" style="animation-duration:3s"><circle cx="108" cy="62" r="13" fill="#e8c0b0"/><path d="M90 108q18-26 36 0v10H90Z" fill="#7a6690"/></g><g class="fadeout" style="animation-duration:3.6s;animation-delay:-1.5s"><circle cx="134" cy="66" r="13" fill="#ddb09f"/><path d="M116 110q18-26 36 0v8h-36Z" fill="#b9a6ce"/></g>`,"#2c2440"),
 board:()=>SV(`<rect x="14" y="14" width="212" height="112" rx="6" fill="#20243a" stroke="#d7c2bf" stroke-width="3"/><text x="26" y="36" font-family="DM Sans,sans-serif" font-size="11" fill="#ffd98f" letter-spacing="3">DEPARTURES</text>${[["09:41","PLATFORM 2","ON TIME"],["10:05","PLATFORM 4","DELAYED"],["10:30","PLATFORM 1","BOARDING"]].map((r,i)=>`<text class="${i==1?"flap":""}" x="26" y="${62+i*24}" font-family="Space Mono,monospace" font-size="11" fill="#ffd98f">${r.join("  ")}</text>`).join("")}`,"#3a3f5c"),
 city:()=>SV(`<defs><linearGradient id="cfg" x2="0" y2="1"><stop stop-color="#1a1440"/><stop offset=".7" stop-color="#7a4a8a"/><stop offset="1" stop-color="#e08aa8"/></linearGradient></defs><rect width="240" height="140" fill="url(#cfg)"/><circle cx="190" cy="30" r="14" fill="#f3e0e6" opacity=".8"/>${Array.from({length:12},(_,i)=>{const h=40+(i*37%60),x=i*20;return `<rect x="${x}" y="${120-h}" width="17" height="${h+20}" fill="#241c4a"/>${[0,1,2].map(r=>`<rect x="${x+4}" y="${126-h+r*14}" width="4" height="6" fill="${(i+r)%2?"#7ee8ff":"#ffd98f"}" opacity=".85"/>`).join("")}`}).join("")}<g class="neon" fill="none" stroke-linecap="round"><path d="M40 40h40" stroke="#ff7ab8" stroke-width="3"/><path d="M150 52a10 10 0 1 0 10 10a7 7 0 0 1-10-10Z" stroke="#7ee8ff" stroke-width="3"/></g><g class="car" style="--x0:0px;--x1:240px;animation-duration:6s"><rect y="72" width="14" height="5" rx="2" fill="#d7e8ff"/></g>`,"#1a1440"),
 letter:()=>SV(`<rect x="52" y="10" width="136" height="120" fill="#fffaf0" stroke="#d6c6ae" transform="rotate(-3 120 70)"/><g transform="rotate(-3 120 70)"><text x="66" y="34" font-family="Caveat,cursive" font-size="17" fill="#4a3a52">Dear Mira,</text><g stroke="#cbbfb0" stroke-width="1.6"><path d="M66 48h96M66 60h88M66 72h96M66 84h70"/></g><path class="signp" d="M70 108q12-12 22 0t22-2 18 4" stroke="#3a4a8a" stroke-width="2.2" fill="none"/></g><g class="swing"><path d="M178 112q-8-30 8-52 6-8 12-2 4 6-2 16l-2 10q14-4 18 6 4 10-14 24Z" fill="#e8bda8" stroke="#c99a84"/></g>`,"#d9ccd6"),
 ticket:()=>SV(`<g transform="rotate(-6 120 70)"><rect x="46" y="36" width="148" height="68" rx="6" fill="#fff6e0" stroke="#d1b98e" stroke-width="2"/><path d="M150 36v68" stroke="#d1b98e" stroke-dasharray="4 4"/><text x="58" y="60" font-family="Space Mono,monospace" font-size="11" fill="#4a3a52" letter-spacing="2">ONE WAY</text><text x="58" y="80" font-family="Space Mono,monospace" font-size="10" fill="#7a6a72">PLATFORM 2</text><circle cx="172" cy="70" r="10" fill="none" stroke="#c9577e" stroke-width="2"/></g>`,"#cfc6dc"),
 key:()=>SV(`<g class="swing"><circle cx="86" cy="70" r="24" fill="none" stroke="#e1b85f" stroke-width="10"/><path d="M110 70h92M178 70v22M196 70v16" stroke="#e1b85f" stroke-width="10" stroke-linecap="round"/></g><path d="M20 118h200" stroke="#a88a8a" stroke-width="3"/>`,"#e6d7d2"),
 door:()=>SV(`<rect x="70" y="14" width="100" height="116" fill="#3b2b2f"/><rect x="82" y="26" width="76" height="104" fill="#ffd9a0" opacity=".55"/><g class="dooropen"><rect x="70" y="14" width="100" height="116" fill="#9a6a72" stroke="#6b4a52" stroke-width="3"/><rect x="82" y="26" width="30" height="40" fill="none" stroke="#7a525a" stroke-width="2"/><rect x="124" y="26" width="30" height="40" fill="none" stroke="#7a525a" stroke-width="2"/><rect x="82" y="76" width="72" height="44" fill="none" stroke="#7a525a" stroke-width="2"/><circle cx="160" cy="74" r="4" fill="#f0c36a"/></g>`,"#2c2440")
};
const CAP={photoribbon:"The photograph",notebook:"Her notebook",cosmos:"Pale pink cosmos",lease:"The lease",ring:"The ring",dress:"The wedding dress",cake:"A remembered birthday",beach:"The beach photograph",bluehouse:"The blue house",mirror:"The mirror",board:"Departure board"};
function figFor(t){t=t.toLowerCase();
 const R=[[/cosmos|small, brave suns/,"cosmos"],[/\blease\b/,"lease"],[/birthday|kettle|yellow kitchen/,"cake"],[/beach|empty chair/,"beach"],[/blue house|at its gate/,"bluehouse"],[/\bring\b/,"ring"],[/\bdress\b|fabric/,"dress"],[/pink door|pink-door|bookshop|bookstore|notebook|poetry/,"notebook"],[/pink ribbon|photograph on my dresser|ribbon in the photograph/,"photoribbon"],[/mirror|reflection/,"mirror"],[/departure|platform/,"board"],[/neon|skyline|city lights|hover-?car|towers? of light/,"city"],[/\bletter\b/,"letter"],[/ticket/,"ticket"],[/\bkeys?\b/,"key"],[/\bdoors?\b/,"door"]];
 for(const [re,k] of R)if(re.test(t)&&!lastFigs.slice(-2).includes(k))return k;return null}


function scrollEnd(){thread.scrollTo({top:thread.scrollHeight,behavior:document.body.classList.contains("reduced")?"auto":"smooth"})}
function showTyping(it){const row=document.createElement("div");row.className="vt-row vt-tp w-"+it.who+(it.who==="elara"?" me":"");row.innerHTML=`<span class="vt-av"></span><div class="vt-typing"><i></i><i></i><i></i></div>`;row.querySelector(".vt-av").textContent=nameOf(it.who).charAt(0);thread.append(row);scrollEnd();return row}
function appendItem(it){
 let node;
 if(it.kind==="chip"){node=document.createElement("div");node.className="vt-chip"+(it.pill?(it.up?" up":" down"):"");node.textContent=it.text;lastWho=""}
 else if(it.kind==="sys"){node=document.createElement("div");node.className="vt-sys";node.textContent=it.text;lastWho="";sfx("buzz")}
 else if(it.kind==="narr"){node=document.createElement("div");node.className="vt-narr";node.innerHTML='<span class="vt-tag">SCENE</span><p></p>';node.querySelector("p").textContent=it.text;lastWho="";sfx("pop")}
 else{node=document.createElement("div");node.className="vt-row w-"+it.who+(it.who==="elara"||it.who==="you"?" me":"")+(lastWho===it.who?" cont":"");node.innerHTML='<span class="vt-av"></span><div class="vt-col"><span class="vt-name"></span><div class="vt-b"><p></p></div></div>';node.querySelector(".vt-av").textContent=nameOf(it.who).charAt(0);node.querySelector(".vt-name").textContent=nameOf(it.who);node.querySelector("p").textContent=it.text;lastWho=it.who;sfx(it.who==="mira"||it.who==="elara"?"chime":"pop")}
 if(it.kind==="narr"||(it.kind==="bub"&&it.who!=="you")){const k=figFor(it.text);if(k){lastFigs.push(k);const f=document.createElement("figure");f.className="vt-fig";f.innerHTML=FIG[k]()+`<figcaption>${CAP[k]}</figcaption>`;(node.querySelector(".vt-b")||node).append(f)}}
 thread.append(node);while(thread.childElementCount>90)thread.firstElementChild.remove();scrollEnd()}




/* ---- smooth flow, natural replies, recall scenes ---- */
const CHOICES=new Map();
[["someone who knows you better than you think.","someone who knows you better than you think.",[["mira","okay, that's either very kind or very unsettling."],["mira","how would a stranger know me at all?"]]],
["i'm your daughter.","i'm your daughter.",[["mira","…my what."],["mira","i'm twenty-two. i'm not even married yet."]]],
["i'm someone who doesn't want you to get hurt.","i'm someone who doesn't want you to get hurt.",[["mira","hurt? by who?"],["mira","you're a stranger. so why does that sound like you mean it?"]]],
["Ask what she wants, without mentioning the wedding.","forget the wedding for a second. what do you actually want, mira?",[["mira","nobody's asked me that in weeks."],["mira","not what i want for dinner. what i want."]]],
["Warn her that Adrian might make her shrink.","be careful. i think adrian could make you smaller without ever meaning to.",[["mira","that's a harsh thing to say about someone you've never met."],["mira","…and it's the thing i've been too scared to think."]]],
["Tell her you are frightened of losing her.","i'm scared of losing you. i don't know how else to say it.",[["mira","hey. hey. i'm right here."],["mira","you really are scared, aren't you."]]],
["Name the pressure without denying their affection.","he can love you and still be pressuring you. both can be true.",[["mira","both can be true."],["mira","i don't think i'd let myself believe that until you said it."]]],
["Ask whether Adrian would hear a clear boundary.","if you said it plainly, with no guilt attached, do you think he'd hear it?",[["mira","honestly? i don't know."],["mira","i've never said it plainly. i've only softened it until it disappeared."]]],
["Tell her to leave him now.","leave him, mira. now. before the wedding.",[["mira","elara, i can't just…"],["mira","three days. i love him. it's not that simple."]]],
["Hold on to the memory of Mira's love.","i'm holding on to how she loved me. that part is mine.",[["celeste","then hold it like something alive. gently, not tightly."]]],
["Admit you are afraid to disappear.","i'm scared i'll just stop. like i was never here.",[["celeste","that fear makes sense. you don't have to hide it from me."]]],
["Try to force the old photograph back.","no. put it back. it has to stay.",[["celeste","elara, look at your hands. you're gripping a picture, not a person."]]],
["Tell Mira the truth and ask what she wants.","i'm your daughter. i'm scared. but i still need to know what YOU want.",[["mira","…daughter."],["mira","i've read that three times now."]]],
["Ask her to keep the wedding so you can stay.","please keep the wedding. i don't want to disappear.",[["mira","oh, elara."],["mira","i can hear how scared you are."]]],
["Stop pressing her. Send a letter with no instructions.","no instructions this time. i just want you to know you're loved, whatever you choose.",[["mira","no instructions…"],["mira","you really mean that, don't you."]]],
["Let Mira decide without another message.","i'll stay quiet now. this one is yours.",[["mira","…thank you for trusting me."]]],
["Send one final promise: your love is not conditional.","one last thing: i love you whether you say yes or no. that never depended on the wedding.",[["mira","that's the kindest thing anyone's said to me all week."]]]
].forEach(([k,say,re])=>CHOICES.set(norm(k),{say,re}));
function chunks(t,max){const s=(t.match(/[^.!?…]+(?:[.!?…]+["”’)]*)?\s*/g)||[t]).map(x=>x.trim()).filter(Boolean),out=[];let cur="";for(const x of s){if(cur&&(cur+" "+x).length>max){out.push(cur);cur=x}else cur=cur?cur+" "+x:x}if(cur)out.push(cur);return out}
const FIRST=/\b(i|i'm|i’m|my|me|our|we|us|you|your)\b/i;
let sceneBusy=false,mode="",seq=null,sceneTimers=[],pendingBack=false;
const say=mk("","vu-say"),cap=mk("","vu-cap"),ins=mk("","vu-ins");[say,cap,ins].forEach(e=>{e.setAttribute("aria-hidden","true");stage.append(e)});
const busyNow=()=>queue.length>0||!!tTimer||sceneBusy;
function lockSync(){$("controls").classList.toggle("vu-wait",busyNow())}
const fastMode=()=>{const sp=$("text-speed")?.value;return sp==="instant"||document.body.classList.contains("reduced")};
function typeText(el,txt,done,instant){el.textContent="";if(instant||fastMode()){el.textContent=txt;done&&done();return}const ms=($("text-speed")?.value==="slow")?44:26;let i=0;const tick=()=>{i++;el.textContent=txt.slice(0,i);if(i<txt.length)sceneTimers.push(setTimeout(tick,ms+(/[,.;:!?]/.test(txt[i-1])?150:0)));else done&&done()};tick()}
function sceneClear(){sceneTimers.forEach(clearTimeout);sceneTimers=[];seq=null;sceneBusy=false;say.className="";cap.className="";ins.className="";say.textContent="";cap.textContent="";ins.innerHTML="";allActors().forEach(a=>a.classList.remove("talk"));lockSync()}
function sceneRun(list){sceneClear();seq={list,i:0};stepScene(false)}
function stepScene(instant){
 if(!seq)return;const it=seq.list[seq.i];if(!it){sceneBusy=false;lockSync();return}
 sceneBusy=true;lockSync();
 const last=seq.i===seq.list.length-1,a=it.kind==="line"?A(it.who):null;let target;
 allActors().forEach(x=>x.classList.remove("talk"));
 let ax=50;
 if(a){ax=parseFloat(a.style.getPropertyValue("--actor-x"))||50;cap.className="";say.className="show";say.style.setProperty("--x",Math.max(24,Math.min(76,ax))+"%");say.innerHTML="<b></b><span></span>";say.querySelector("b").textContent=nameOf(it.who);target=say.querySelector("span");a.classList.add("talk")}
 else{say.className="";cap.className="show";cap.innerHTML=it.kind==="line"?"<b></b><span></span>":"<span></span>";if(it.kind==="line")cap.querySelector("b").textContent=nameOf(it.who);target=cap.querySelector("span")}
 const f=figFor(it.text);if(f){lastFigs.push(f);ins.innerHTML=FIG[f]()+`<small>${CAP[f]}</small>`;ins.className=(ax<50?"r ":"l ")+"show";sfx("paper")}
 const finish=()=>{a&&a.classList.remove("talk");if(last){seq=null;sceneBusy=false;lockSync()}else sceneTimers.push(setTimeout(()=>{seq.i++;stepScene(false)},fastMode()?250:800+it.text.length*20))};
 typeText(target,it.text,finish,instant)}
function sceneSkip(){if(!seq)return;sceneTimers.forEach(clearTimeout);sceneTimers=[];seq.i=seq.list.length-1;stepScene(true)}
function skipAll(){flushQueue();sceneSkip();lockSync()}
$("controls").addEventListener("click",e=>{if(busyNow()){e.preventDefault();e.stopPropagation();skipAll()}},true);
document.addEventListener("keydown",e=>{if(busyNow()&&(e.key===" "||e.key==="Enter")&&(e.target===document.body)){e.preventDefault();e.stopImmediatePropagation();skipAll()}},true);
thread.addEventListener("click",()=>{if(busyNow())skipAll()});[say,cap].forEach(e=>{e.style.pointerEvents="auto";e.addEventListener("click",()=>{if(busyNow())skipAll()})});
function setMode(m){if(m===mode)return;mode=m;stage.classList.toggle("vu-chat",m==="chat");stage.classList.toggle("vu-scene",m==="scene");if(m!=="scene"){sceneClear()}else{flushQueue()}}
/* ---- text pacing ---- */
const speed=()=>body.classList.contains("reduced")?"instant":($("text-speed")?.value||"gentle");
function chunks(t,max=118){const parts=t.match(/[^.!?…]+(?:[.!?…]+["”’')]*|$)\s*/g)||[t],out=[];let cur="";for(const p of parts){const s=p.trim();if(!s)continue;if(cur&&(cur+" "+s).length>max){out.push(cur);cur=s}else cur=cur?cur+" "+s:s}if(cur)out.push(cur);return out.length?out:[t]}
function typingMs(it){const sp=speed();if(sp==="instant")return 80;const f=sp==="slow"?1.6:1;if(it.quick)return 320*f;return Math.min(2100,(560+(it.text||"").length*17))*f}
function holdMs(it){const sp=speed();if(sp==="instant")return 0;const f=sp==="slow"?1.6:1;return(REVEAL.test(it.text||"")?1700:0)+(it.kind==="chip"?260:it.kind==="narr"?Math.min(1500,520+it.text.length*7):it.kind==="sys"?380:300)*f}
const playing=()=>!!(queue.length||tTimer||liveType);
let sawElara=false;
function pushItem(it){if(it.kind==="bub"&&it.who==="elara")sawElara=true;if(it.kind==="chip"&&it.text==="Back to the messages"&&!sawElara)return;if(it.kind==="bub"||it.kind==="narr"){const n=norm(it.text);if(n&&recent.slice(-6).some(r=>r===n||(n.length>8&&r.includes(n))))return;recent.push(n);if(recent.length>30)recent.shift()}queue.push(it)}
function pushText(kind,who,text,extra={}){chunks(text).forEach((c,i)=>pushItem({kind,who,text:c,first:i===0,...extra}))}
let userHold=false;
function nearEnd(){return thread.scrollHeight-thread.scrollTop-thread.clientHeight<90}
function scrollEnd(force){if(userHold&&!force&&!nearEnd()){jumpBtn.classList.add("on");return}userHold=false;jumpBtn.classList.remove("on");thread.scrollTo({top:thread.scrollHeight,behavior:speed()==="instant"?"auto":"smooth"})}
const jumpBtn=document.createElement("button"),upBtn=document.createElement("button"),dnBtn=document.createElement("button"),logBtn=document.createElement("button");
jumpBtn.id="vu-jump";jumpBtn.type="button";jumpBtn.textContent="↓ Latest";upBtn.className="vu-scr up";upBtn.type="button";upBtn.textContent="▲";upBtn.setAttribute("aria-label","Scroll conversation up");dnBtn.className="vu-scr dn";dnBtn.type="button";dnBtn.textContent="▼";dnBtn.setAttribute("aria-label","Scroll conversation down");logBtn.id="vu-log";logBtn.type="button";logBtn.textContent="↺ Earlier lines";
(function(){const dev=$("phone").querySelector(".phone-device");(dev||$("phone")).append(upBtn,dnBtn,jumpBtn);stage.append(logBtn)})();
upBtn.addEventListener("click",()=>{userHold=true;thread.scrollBy({top:-thread.clientHeight*.7,behavior:"smooth"})});
dnBtn.addEventListener("click",()=>{thread.scrollBy({top:thread.clientHeight*.7,behavior:"smooth"});setTimeout(()=>{if(nearEnd()){userHold=false;jumpBtn.classList.remove("on")}},450)});
jumpBtn.addEventListener("click",()=>scrollEnd(true));
logBtn.addEventListener("click",()=>{const h=$("history-toggle");h&&h.click();$("history-panel")?.scrollIntoView({behavior:"smooth",block:"center"})});
thread.addEventListener("scroll",()=>{if(nearEnd()){userHold=false;jumpBtn.classList.remove("on")}else userHold=true},{passive:true});
thread.addEventListener("wheel",()=>{if(!nearEnd())userHold=true},{passive:true});
function showTyping(it){const row=document.createElement("div");row.className="vt-row vt-tp w-"+it.who+(it.who==="elara"?" me":"");row.innerHTML=`<span class="vt-av"></span><div class="vt-typing"><i></i><i></i><i></i></div>`;row.querySelector(".vt-av").textContent=nameOf(it.who).charAt(0);thread.append(row);scrollEnd();return row}
function buzzPhone(){const d=$("phone").querySelector(".phone-device");if(!d)return;d.classList.add("buzz");setTimeout(()=>d.classList.remove("buzz"),900)}
function appendItem(it){
 let node;
 if(it.kind==="chip"){node=document.createElement("div");node.className="vt-chip"+(it.pill?(it.up?" up":" down"):"");node.textContent=it.text;lastWho=""}
 else if(it.kind==="sys"){node=document.createElement("div");node.className="vt-sys";node.textContent=it.text;lastWho="";sfx("buzz");buzzPhone();setTimeout(()=>sfx("chime"),520)}
 else if(it.kind==="narr"){node=document.createElement("div");node.className="vt-narr";node.innerHTML=(it.first?'<span class="vt-tag">SCENE</span>':"")+"<p></p>";node.querySelector("p").textContent=it.text;lastWho="";sfx("pop")}
 else{const me=it.who==="elara";node=document.createElement("div");node.className="vt-row w-"+it.who+(me?" me":"")+(lastWho===it.who?" cont":"");node.innerHTML='<span class="vt-av"></span><div class="vt-col"><span class="vt-name"></span><div class="vt-b"><p></p></div></div>';node.querySelector(".vt-av").textContent=nameOf(it.who).charAt(0);node.querySelector(".vt-name").textContent=nameOf(it.who);node.querySelector("p").textContent=it.text;if(!me&&lastWho!==it.who)buzzPhone();lastWho=it.who;sfx(me?"send":"chime")}
 if(it.kind==="narr"||it.kind==="bub"){const k=figFor(it.text);if(k){lastFigs.push(k);const f=document.createElement("figure");f.className="vt-fig";f.innerHTML=FIG[k]()+`<figcaption>${CAP[k]}</figcaption>`;(node.querySelector(".vt-b")||node).append(f)}}
 thread.append(node);while(thread.childElementCount>110)thread.firstElementChild.remove();scrollEnd()}
function pump(){
 if(tTimer||!queue.length){if(!queue.length&&!tTimer)playSince=0;return}
 if(!playSince)playSince=Date.now();
 const it=queue[0];
 const step=()=>{tTimer=0;queue.shift();appendItem(it);if(!queue.length){playSince=0;return}tTimer=setTimeout(()=>{tTimer=0;pump()},it.kind==="ghost"?0:holdMs(it))};
 if(it.kind==="ghost"){const t=showTyping({who:"elara"});tTimer=setTimeout(()=>{t.remove();tTimer=0;queue.shift();pump()},1700);return}
 if(it.kind==="bub"){const t=showTyping(it);tTimer=setTimeout(()=>{t.remove();step()},typingMs(it));return}
 tTimer=setTimeout(step,it.kind==="chip"?120:holdMs(it)*.6)}
function flushQueue(){clearTimeout(tTimer);tTimer=0;thread.querySelectorAll(".vt-tp").forEach(e=>e.remove());while(queue.length){const it=queue.shift();if(it.kind!=="ghost")appendItem(it)}playSince=0}
function resetThread(){sawElara=false;flushQueue();thread.replaceChildren();mirrored=new Set();recent=[];lastBeat="";lastPlace="";lastChoice="";lastWho="";lastFigs=[];liveFig="";hideLive();completeLive(true)}
/* ---- in-person (live) scenes: speech bubbles over the characters ---- */
function hideLive(){live.classList.remove("on");live.innerHTML=""}
function completeLive(silent){if(!liveType)return;clearInterval(liveType.iv);const l=liveType;liveType=null;l.el.textContent=l.text;if(!silent)playSince=0}
function liveFigure(text,count){
 const k=figFor(text);if(k&&k!==liveFig){liveFig=k;liveFigScene=curScene}
 else if(liveFig&&liveFigScene!==curScene){liveFig="";liveFigScene=""}
 const old=live.querySelector(".lv-fig");
 if(!liveFig){old&&old.remove();return}
 if(old&&old.dataset.k===liveFig)return;old&&old.remove();
 const f=document.createElement("figure");f.className="lv-fig c"+Math.min(3,Math.max(1,count));f.dataset.k=liveFig;f.innerHTML=FIG[liveFig]()+`<figcaption>${CAP[liveFig]}</figcaption>`;live.append(f);sfx("paper")}
function liveShow(who,kind,text){
 completeLive(true);live.querySelectorAll(".lv-bub,.lv-narr").forEach(e=>e.remove());
 const cast=allActors().map(a=>a.dataset.who).filter(Boolean);
 let box,el;
 if(kind==="narr"){box=document.createElement("div");box.className="lv-narr";box.innerHTML='<span class="txt"><span class="full"></span><span class="typed"></span></span>'}
 else{box=document.createElement("div");box.className="lv-bub w-"+who;box.innerHTML='<span class="nm"></span><span class="txt"><span class="full"></span><span class="typed"></span></span>';box.querySelector(".nm").textContent=nameOf(who)}
 box.querySelector(".full").textContent=text;el=box.querySelector(".typed");live.append(box);live.classList.add("on");
 if(kind!=="narr"){
  const sr=stage.getBoundingClientRect(),a=A(who),W=sr.width;
  let cx=W/2;if(a){const r=a.getBoundingClientRect();cx=r.left+r.width/2-sr.left}
  const bw=box.offsetWidth,left=Math.max(8,Math.min(W-bw-8,cx-bw/2));
  box.style.left=left+"px";box.style.top=Math.max(8,sr.height*.05)+"px";box.style.setProperty("--tx",Math.max(22,Math.min(bw-22,cx-left))+"px");sfx(who==="mira"?"chime":"pop")}
 else sfx("pop");
 liveFigure(text,cast.length);
 const sp=speed();
 if(sp==="instant"){el.textContent=text;return}
 const per=sp==="slow"?30:17;let i=0;liveType={el,text,iv:setInterval(()=>{i+=1;el.textContent=text.slice(0,i);if(i>=text.length){completeLive()}},per)}}
/* ---- which kind of moment is this? ---- */
function modeNow(sel){
 const spk=($("speaker").textContent||"").toLowerCase(),cast=allActors().map(a=>a.dataset.who);
 if(sel){try{return JSON.parse(sel.dataset.vu||"{}").live?"live":"chat"}catch(_){return"chat"}}
 if(/^Opening/.test($("chapter-tag").textContent||"")&&!sawElara&&!spk.startsWith("elara")&&!spk.startsWith("system")&&!spk.startsWith("phone"))return"live";
 if(spk.startsWith("system")||spk.startsWith("phone")||spk.startsWith("elara"))return"chat";
 if(spk.startsWith("narration")||spk.startsWith("adrian")||spk.startsWith("celeste")||spk.startsWith("officiant"))return"live";
 if(cast.some(n=>["adrian","celeste","officiant"].includes(n)))return"live";
 if(["cafe","station","wedding","bookstore"].includes(curScene))return"live";
 return"chat"}
function setMode(m){if(m===lastMode)return;if(m==="live"){liveFig="";live.querySelector(".lv-fig")?.remove()}[stage,body].forEach(e=>{e.classList.toggle("vu-chat",m==="chat");e.classList.toggle("vu-live",m==="live")});if(m!=="live"){completeLive(true);hideLive()}lastMode=m}
function thirdPerson(t){return!/\b(I|I'm|I've|my|me|mine|you|your|we|our|us)\b/i.test(t)}
function chatBeat(text,spk,place,fromLive){
 const who=whoFromSpeaker(spk);
 if(fromLive)pushItem({kind:"chip",text:"Back to the messages"});
 if(place!==lastPlace){lastPlace=place;const yr=/^end[A-D]$/.test(curScene)?"":["future","kitchen","bluehouse","beach","archive","mirror"].includes(curScene)?"2048":curScene==="black"?"":"2024";if(!fromLive)pushItem({kind:"chip",text:(yr?yr+" · ":"")+place.split(" · ")[0]})}
 if(who==="sys")pushItem({kind:"sys",text});
 else if(who==="narr"||(who==="elara"&&thirdPerson(text)))pushText("narr","",text);
 else pushText("bub",who,text,{quick:who==="elara"})}
const STAT={trust:"Mira trusts Elara",self:"Mira's confidence",attachment:"Pull toward the wedding",acceptance:"Elara's acceptance",stability:"Timeline stability",honesty:"Honesty with Adrian",respect:"Elara respects her choice"};
function pillsOf(delta){return Object.entries(delta||{}).filter(([k,v])=>v&&STAT[k]).map(([k,v])=>({txt:(v>0?"▲ ":"▼ ")+STAT[k],up:v>0}))}
function livePills(list){if(!list.length)return;live.querySelector(".lv-pills")?.remove();const row=document.createElement("div");row.className="lv-pills";list.forEach(p=>{const s=document.createElement("span");s.className=p.up?"up":"down";s.textContent=p.txt;row.append(s)});live.append(row);setTimeout(()=>row.remove(),4200)}
function dataOf(sel){let d={};try{d=JSON.parse(sel.dataset.vu||"{}")}catch(_){}return d}
function commitChoice(sel,fromLive){
 const d=dataOf(sel),as=d.as||"elara",other=as==="elara"?"mira":"elara",pl=pillsOf(d.delta);
 flushQueue();
 if(d.live){const line=(d.say||[]).join(" ")||sel.textContent;try{liveShow("mira","bub",line)}catch(err){console.warn(err)}livePills(pl);return}
 if(fromLive)pushItem({kind:"chip",text:"Back to the messages"});
 const send=(d.send&&d.send.length)||d.ghost?d.send||[]:[sel.textContent.charAt(0).toLowerCase()+sel.textContent.slice(1)];
 send.forEach(t=>pushItem({kind:"bub",who:as,text:t,quick:true}));
 if(d.ghost){pushItem({kind:"ghost"});pushItem({kind:"chip",text:"Elara lets the typing dots fade. Mira decides alone."})}
 (d.re||[]).forEach(t=>pushItem({kind:"bub",who:other,text:t}));
 pl.forEach(p=>pushItem({kind:"chip",text:p.txt,up:p.up?1:0,pill:1}))}

/* ---- flashbacks ---- */
const vig=document.createElement("div");vig.id="vu-vig";const ftag=document.createElement("div");ftag.id="vu-flashtag";ftag.textContent="FLASHBACK";const grain2=document.createElement("div");grain2.className="film-grain2";const wipe=document.createElement("div");wipe.id="vu-wipe";
stage.append(vig,ftag,grain2,wipe);let lastFlash=false;
function setFlash(on){if(on===lastFlash)return;lastFlash=on;wipe.classList.remove("go");void wipe.offsetWidth;wipe.classList.add("go");stage.classList.toggle("vu-flash",on);sfx("whoosh");if(on)setTimeout(()=>tone(392,0,1.2,"sine",.03,330),200)}
function threadSync(){
 const title=!$("title-overlay").classList.contains("hidden"),film=!intro.classList.contains("hidden");
 const active=!$("dialogue-panel").classList.contains("hidden")&&!film&&!title;
 if(!active){setMode("off");setFlash(false);if((film||title)&&(thread.childElementCount||lastBeat))resetThread();return}
 const text=($("story-line").textContent||"").trim(),spk=$("speaker").textContent||"",place=$("scene-place").textContent||"";
 const sel=$("controls").querySelector("p.choice"),mode=modeNow(sel),prev=lastMode;
 const key=$("chapter-tag").textContent+"|"+spk+"|"+text+"|"+$("beat-count").textContent;
 const newBeat=text&&key!==lastBeat,selKey=sel?key+"|"+sel.textContent:"",newChoice=sel&&selKey!==lastChoice;
 const fromLive=prev==="live";
 setMode(mode);setFlash(/flashback/i.test($("scene-label").textContent)&&!$("scene-label").classList.contains("hidden")&&mode==="live");
 if(newBeat&&!newChoice){
  lastBeat=key;flushQueue();
  if(mode==="live"){const who=whoFromSpeaker(spk);try{liveShow(who==="narr"||who==="sys"?"narr":who,who==="narr"||who==="sys"?"narr":"bub",text)}catch(err){console.warn("live scene:",err);setMode("chat")}}
  else chatBeat(text,spk,place,fromLive)}
 else if(newBeat){lastBeat=key}
 if(newChoice){lastChoice=selKey;commitChoice(sel,fromLive)}
 const fresh=[...$("chat").querySelectorAll("[data-message-id]")].filter(e=>!mirrored.has(e.dataset.messageId));
 const skipFirst=thread.childElementCount===0&&!queue.length?Math.max(0,fresh.length-2):0;
 fresh.forEach((e,i)=>{const mid=e.dataset.messageId;mirrored.add(mid);if(/:(sent|reply)$/.test(mid)||mode!=="chat"||i<skipFirst)return;const t=e.querySelector("span")?.textContent||"",w=/ELARA/.test(e.querySelector("small")?.textContent||"")?"elara":"mira";if(t)pushItem({kind:"bub",who:w,text:t,quick:w==="elara"})});
 pump()}
/* Continue / choice buttons wait for the conversation to finish building; one click fast-forwards */
$("controls").addEventListener("click",e=>{const b=e.target.closest("button");if(!b||!playing())return;e.stopImmediatePropagation();e.preventDefault();if(b.classList.contains("primary")){completeLive();flushQueue();$("controls").classList.remove("vt-wait")}},true);
setInterval(()=>{const w=playing();$("controls").classList.toggle("vt-wait",w);if(w&&playSince&&Date.now()-playSince>30000){completeLive();flushQueue()}},180);
window.addEventListener("resize",()=>{const b=live.querySelector(".lv-bub");if(b&&!liveType)threadSync()});

const mo=new MutationObserver(q);
[["actors",{childList:true}],["props",{childList:true}],["art",{childList:true}],["story-line",{childList:true,characterData:true,subtree:true}],["speaker",{childList:true,characterData:true,subtree:true}],["scene-place",{childList:true,characterData:true,subtree:true}],["chat",{childList:true}],["controls",{childList:true}],["weather",{attributes:true,attributeFilter:["class"]}],["film-actors",{childList:true}],["film-mid",{childList:true}],["film-strip",{childList:true}],["film-objects",{childList:true}],["film-caption-text",{childList:true,characterData:true,subtree:true}],["film-world",{attributes:true,attributeFilter:["data-scene"]}],["intro",{attributes:true,attributeFilter:["class"]}],["scene-label",{childList:true,characterData:true,subtree:true,attributes:true,attributeFilter:["class"]}],["dialogue-panel",{attributes:true,attributeFilter:["class"]}],["title-overlay",{attributes:true,attributeFilter:["class"]}]].forEach(([id,o])=>{const n=$(id);n&&mo.observe(n,o)});
q();
window.addEventListener("pagehide",()=>{clearTimers()});
/*@@MODULES_BEGIN*/
/* =================================================================
   9. MUSIC DIRECTOR + AMBIENCE + EXTRA SFX
   Generative score (piano, strings, music-box, bells) built on Web Audio.
   One bus per mood, cross-faded; ducking for dialogue/revelations; silence.
   ================================================================= */
Object.assign(SFX,{
 page(){hiss(0,.22,.05,1800,8000);hiss(.26,.16,.035,2400,9000)},
 rustle(){hiss(0,.5,.04,900,5000);hiss(.2,.4,.03,1500,7000)},
 thud(){tone(90,0,.2,"sine",.1,50);hiss(0,.08,.04,100,600)},
 doorclose(){tone(120,0,.18,"sine",.1,60);hiss(0,.1,.05,150,900);tone(300,.18,.3,"triangle",.02,200)},
 shimmer(){[0,1,2,3].forEach(i=>tone(1046*(1+i*.25),i*.07,1.4,"sine",.018,1046*(1+i*.25)*.97))},
 breath(){hiss(0,.5,.03,500,2200)},
 sob(){hiss(0,.14,.03,600,2400);hiss(.22,.14,.03,600,2400);tone(300,0,.4,"sine",.01,240)},
 tick(){tone(1800,0,.03,"square",.02);tone(1200,.5,.03,"square",.014)},
 bell(){tone(1318,0,1.8,"sine",.03);tone(1976,0,1.2,"sine",.015)},
 murmur(){hiss(0,1.4,.02,300,900)}
});
const MU={ctx:null,master:null,send:null,cur:null,prev:null,duck:1,duckUntil:0,timer:0,mood:"",silence:0};
const mvolume=()=>{if(document.body.classList.contains("vu-muted"))return 0;const t=$("music-toggle");if(t&&t.getAttribute("aria-pressed")==="false")return 0;return Math.max(0,Math.min(1,(+($("music-volume")?.value||25))/100))};
function muInit(){
 if(MU.ctx||!AC||!noiseBuf)return;MU.ctx=AC;
 const comp=AC.createDynamicsCompressor();comp.threshold.value=-18;comp.ratio.value=3;
 MU.master=AC.createGain();MU.master.gain.value=0;MU.master.connect(comp);comp.connect(AC.destination);
 const len=AC.sampleRate*2.6,ir=AC.createBuffer(2,len,AC.sampleRate);
 for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6)}
 const conv=AC.createConvolver();conv.buffer=ir;MU.send=AC.createGain();MU.send.gain.value=.55;MU.send.connect(conv);conv.connect(MU.master);
 MU.timer=setInterval(muLoop,140);
}
const hz=m=>440*Math.pow(2,(m-69)/12);
function voice(bus,type,f,t,att,dur,g,lp,detune=0){
 const o=AC.createOscillator(),n=AC.createGain(),fl=AC.createBiquadFilter();o.type=type;o.frequency.value=f;o.detune.value=detune;fl.type="lowpass";fl.frequency.value=lp;
 n.gain.setValueAtTime(.0001,t);n.gain.linearRampToValueAtTime(g,t+att);n.gain.exponentialRampToValueAtTime(.0001,t+dur);
 o.connect(fl);fl.connect(n);n.connect(bus);o.start(t);o.stop(t+dur+.1)}
function piano(bus,m,t,vel=.5,dur=2.6){const f=hz(m),lp=1800+vel*3200;voice(bus,"sine",f,t,.006,dur,.16*vel,lp);voice(bus,"triangle",f*2,t,.004,dur*.5,.05*vel,lp);voice(bus,"sine",f*3,t,.003,dur*.25,.018*vel,lp)}
function strings(bus,ms,t,dur,bright=900,g=.03){ms.forEach(m=>{const f=hz(m);voice(bus,"sawtooth",f,t,dur*.4,dur,g,bright,-7);voice(bus,"sawtooth",f,t,dur*.4,dur,g,bright,7)})}
function box(bus,m,t,vel=.5){const f=hz(m);voice(bus,"sine",f,t,.004,1.1,.07*vel,6000);voice(bus,"sine",f*4,t,.003,.35,.02*vel,9000)}
function bellN(bus,m,t,vel=.5){const f=hz(m);voice(bus,"sine",f,t,.01,3,.05*vel,5000);voice(bus,"sine",f*2.4,t,.01,1.4,.012*vel,7000)}
function clickN(bus,t,vel=.5){const s=AC.createBufferSource();s.buffer=noiseBuf;const f=AC.createBiquadFilter();f.type="bandpass";f.frequency.value=3000;f.Q.value=9;const g=AC.createGain();g.gain.setValueAtTime(.05*vel,t);g.gain.exponentialRampToValueAtTime(.0001,t+.05);s.connect(f);f.connect(g);g.connect(bus);s.start(t,Math.random(),.08)}
function pulse(bus,t,vel=.5){voice(bus,"sine",58,t,.01,.22,.16*vel,200);voice(bus,"sine",52,t+.2,.01,.2,.1*vel,200)}
const rnd=a=>a[Math.floor(Math.random()*a.length)];
/* each mood: bpm, beats per bar, chord progression (midi), bar scheduler */
const MOODS={
 opening:{bpm:58,beats:4,prog:[[57,60,64,67],[53,57,60,64],[48,55,60,64],[52,55,59,64]],bar(b,t,c,i,d){[0,1,2,3,2,1].forEach((k,j)=>{if(Math.random()<.78)piano(b,c[k]+12,t+j*d/6,.32+Math.random()*.1,3.2)});strings(b,c.slice(0,3),t,d*1.1,700,.02);if(i%4===3)bellN(b,c[3]+24,t+d*.5,.4)}},
 tender:{bpm:64,beats:4,prog:[[57,60,64,67],[53,57,60,64],[48,55,60,64],[55,59,62,64]],bar(b,t,c,i,d){piano(b,c[0]-12,t,.4,d*1.2);[0,1,2,3,2,1,2,3].forEach((k,j)=>{if(Math.random()<.72)piano(b,c[k]+12,t+j*d/8,.28+Math.random()*.12,2.4)});strings(b,c,t,d*1.15,750,.028)}},
 mystery:{bpm:54,beats:4,prog:[[50,57,62,65],[46,53,58,62],[43,55,58,62],[45,52,57,62]],bar(b,t,c,i,d){strings(b,[c[0]-12,c[1],c[2]],t,d*1.2,520,.03);for(let k=0;k<4;k++)clickN(b,t+k*d/4,.35+(k%2?0:.2));if(i%2===0)bellN(b,rnd(c)+24,t+Math.random()*d*.7,.4);if(i%4===1)piano(b,c[2]+12,t+d*.5,.3,3)}},
 tense:{bpm:50,beats:4,prog:[[40,47,52,55],[36,43,48,52],[45,52,55,60],[47,51,54,57]],bar(b,t,c,i,d,inst){const up=Math.min(1,(inst.bars||0)/16);strings(b,c,t,d*1.2,420+up*900,.034+up*.016);piano(b,c[2]+12,t+d*.5,.26+up*.1,3.4);if(i%2===0)pulse(b,t,.25+up*.3)}},
 sad:{bpm:46,beats:4,prog:[[57,60,64],[53,57,60],[50,57,62],[52,56,59]],bar(b,t,c,i,d){if(i%2===0){piano(b,c[0]+12,t,.34,5);if(Math.random()<.7)piano(b,c[2]+12,t+d*.55,.28,5)}else if(Math.random()<.6)piano(b,c[1]+24,t+d*.3,.24,5);strings(b,[c[0]-12,c[1]],t,d*1.3,520,.018)}},
 hope:{bpm:76,beats:4,prog:[[48,55,64,67],[43,50,59,62],[45,52,60,64],[41,48,57,60]],bar(b,t,c,i,d){[0,1,2,3,2,3,1,2].forEach((k,j)=>{if(Math.random()<.85)piano(b,c[k]+12,t+j*d/8,.34+Math.random()*.12,2.2)});strings(b,c,t,d*1.1,1300,.034);if(i%2===1)box(b,c[3]+24,t+d*.75,.4)}},
 wedding:{bpm:92,beats:3,prog:[[50,57,62,66],[45,57,61,64],[47,59,62,66],[43,55,59,62]],bar(b,t,c,i,d){piano(b,c[0]-12,t,.4,d);piano(b,c[1]+12,t+d/3,.28,d*.7);piano(b,c[2]+12,t+2*d/3,.26,d*.7);if(i%2===0)piano(b,c[3]+24,t+d*.1,.3,2);strings(b,c,t,d*1.1,1100,.032)}},
 weddingTense:{bpm:66,beats:3,prog:[[47,54,59,62],[43,50,55,58],[45,52,57,60],[40,47,52,55]],bar(b,t,c,i,d){piano(b,c[0]-12,t,.36,d*1.3);if(Math.random()<.7)piano(b,c[2]+12,t+d/3,.26,d*1.2);strings(b,c,t,d*1.2,620,.032);if(i%3===2)pulse(b,t+d*.5,.25)}},
 memory:{bpm:60,beats:4,prog:[[48,55,60,64],[45,52,57,60],[41,48,53,57],[43,50,55,59]],bar(b,t,c,i,d){[0,2,1,3,2,1].forEach((k,j)=>{if(Math.random()<.8)box(b,c[k%4]+24,t+j*d/6,.4)});strings(b,c.slice(0,3),t,d*1.1,560,.022)}},
 endA:{bpm:72,beats:4,prog:[[43,50,59,62],[50,57,62,66],[52,55,59,64],[48,55,60,64]],bar(b,t,c,i,d){piano(b,c[0]-12,t,.42,d);[0,1,2,3,2,1,2,3].forEach((k,j)=>{if(Math.random()<.9)piano(b,c[k]+12,t+j*d/8,.3+Math.random()*.12,2.4)});strings(b,c,t,d*1.15,1400,.036);if(i%2===0)box(b,c[2]+24,t+d*.5,.4)}},
 endB:{bpm:44,beats:4,prog:[[45,52,57,60],[41,48,53,57],[50,57,62,65],[40,47,52,56]],decay:70,bar(b,t,c,i,d){if(i%2===0)piano(b,c[3]+12,t,.3,6);else if(Math.random()<.5)piano(b,c[1]+24,t+d*.4,.22,6);strings(b,[c[0]-12],t,d*1.3,420,.016)}},
 endC:{bpm:60,beats:4,prog:[[48,55,62],[43,50,57],[41,48,55,57],[43,50,55,62]],bar(b,t,c,i,d,inst){const up=Math.min(1,(inst.bars||0)/24);[0,1,2,1].forEach((k,j)=>{if(Math.random()<.75)piano(b,c[k%c.length]+12,t+j*d/4,.28,3)});strings(b,c,t,d*1.2,600+up*900,.026+up*.012);if(i%2===0)pulse(b,t,.18)}},
 endD:{bpm:56,beats:4,prog:[[53,57,60,64],[50,57,62,65],[46,53,58,62],[48,55,60,64]],bar(b,t,c,i,d){piano(b,c[0]-12,t,.36,d*1.2);[0,1,2,3,2,1].forEach((k,j)=>{if(Math.random()<.7)piano(b,c[k]+12,t+j*d/6,.26,2.8)});if(i%2===1)box(b,c[2]+24,t+d*.4,.35);strings(b,c.slice(0,3),t,d*1.1,700,.018)}}
};
function muStart(name){
 const m=MOODS[name];if(!m||!MU.master)return;
 if(MU.prev){try{MU.prev.bus.disconnect()}catch(_){}}
 MU.prev=MU.cur;if(MU.prev){MU.prev.bus.gain.cancelScheduledValues(AC.currentTime);MU.prev.bus.gain.setTargetAtTime(0,AC.currentTime,1.0);MU.prev.dying=AC.currentTime+4.5}
 const bus=AC.createGain();bus.gain.value=0;bus.connect(MU.master);const sd=AC.createGain();sd.gain.value=.5;bus.connect(sd);sd.connect(MU.send);
 bus.gain.setTargetAtTime(1,AC.currentTime,.9);
 MU.cur={name,m,bus,nextT:AC.currentTime+.25,bars:0,born:AC.currentTime};MU.mood=name}
function muLoop(){
 if(!MU.ctx||AC.state!=="running")return;const now=AC.currentTime;
 const lvl=mvolume()*.55*MU.duck;MU.master.gain.setTargetAtTime(lvl,now,.35);
 if(MU.prev&&MU.prev.dying&&now>MU.prev.dying){try{MU.prev.bus.disconnect()}catch(_){}MU.prev=null}
 for(const inst of [MU.prev,MU.cur]){if(!inst||inst.dying&&now>inst.dying)continue;const m=inst.m,d=60/m.bpm*m.beats;
  if(inst===MU.cur&&m.decay){const k=Math.max(.12,1-(now-inst.born)/m.decay);inst.bus.gain.setTargetAtTime(k,now,.8)}
  let guard=0;while(inst.nextT<now+.7&&guard++<3){if(inst===MU.cur||inst.nextT<inst.dying){const ch=m.prog[inst.bars%m.prog.length];try{m.bar(inst.bus,inst.nextT,ch,inst.bars,d,inst)}catch(_){}}inst.bars++;inst.nextT+=d}}
 if(MU.duckUntil&&now>MU.duckUntil){MU.duckUntil=0;MU.duck=Math.max(MU.duck,MU.base||1)}
}
/* mood selection from what is on screen */
const REVEAL=/never be born|won.t be born|never begun|never began|erase|stopped breathing|you left when|i can.t say yes|cannot say yes|i can.t make the promise|never been born|was never born|you'?d never be born|left when i was four/i;
const SILENT=/silence|held silence|only rain|goes quiet|phone goes (warm|dark)|stays dark|the room waits|room waits/i;
function moodNow(){
 if(!intro.classList.contains("hidden"))return"mystery";
 if(!$("title-overlay").classList.contains("hidden"))return"opening";
 const mo=$("mira-opening"),mc=$("mira-customizer");if((mo&&!mo.classList.contains("hidden"))||(mc&&!mc.classList.contains("hidden")))return"opening";
 const text=($("story-line").textContent||""),spk=($("speaker").textContent||"").toLowerCase(),sc=curScene,chap=$("chapter-tag").textContent||"";
 if(sc==="endA")return"endA";if(sc==="endB")return"endB";if(sc==="endC")return"endC";if(sc==="endD")return"endD";
 if(/Epilogue/.test(chap)&&/ELARA|NARRATION/.test($("speaker").textContent||"")&&!/endA|endB|endC|endD/.test(sc)){/* ending sequence before the final card */
  const e=emoFor(text),rt=MU.route;if(rt==="B")return"sad";if(rt==="C")return"endC";if(rt==="D")return"endD";if(REVEAL.test(text)||e==="fear"||/fade|fades|disappear/.test(text.toLowerCase()))return"sad";return"hope"}
 if(stage.classList.contains("vu-flash"))return"memory";
 if(REVEAL.test(text))return"sad";
 if(sc==="wedding"){const t=text.toLowerCase();return(/true|afraid|doors|question|breath|cannot|can.t|silence|hurt|shop|decision|waits|decide|moment/.test(t)||/chapter five/i.test(chap)&&/MIRA/.test($("speaker").textContent||"")&&!/will marry/.test(t))?"weddingTense":"wedding"}
 if(sc==="archive"||sc==="mirror")return"mystery";
 const e=emoFor(text);
 if(sc==="kitchen"||sc==="bluehouse"||sc==="beach")return e==="sad"||e==="fear"?"sad":"memory";
 if(sc==="bookstore")return/imagin|sunlight|pink door|bell|shelves|key/.test(text.toLowerCase())?"hope":"tender";
 if(e==="fear")return"tense";if(e==="sad")return"sad";
 if(/villain|afraid|scared|can.t tell|stuck|hiding|prank|scam|block|prove it|a trick|scammer|elaborate/i.test(text))return sc==="future"||/elara/.test(spk)?"tender":"tense";
 return"tender"}
function muDuckFor(text,spk){
 const narr=/narration|system/.test(spk);let d=narr?.9:.7;const e=emoFor(text);
 if(e==="sad"||e==="fear")d=.5;if(REVEAL.test(text))d=.22;
 MU.base=d;MU.duck=d;MU.duckUntil=0;
 if(SILENT.test(text)){MU.duck=.06;MU.duckUntil=AC?AC.currentTime+6:0;MU.base=.4}}
let muKey="";
function muSync(){
 if(!AC)return;if(SONG.on)return;if(!MU.ctx)muInit();if(!MU.ctx)return;
 if(!$("title-overlay").classList.contains("hidden"))MU.route="";let m=moodNow();const soft=["tender","tense","hope","memory","sad"];if(m!==MU.mood&&MU.cur&&soft.includes(m)&&soft.includes(MU.mood)&&AC.currentTime-MU.cur.born<14&&!REVEAL.test($("story-line").textContent||""))m=MU.mood;if(m!==MU.mood)muStart(m);
 const text=($("story-line").textContent||""),spk=($("speaker").textContent||"").toLowerCase(),k=m+"|"+spk+"|"+text;
 if(k!==muKey){muKey=k;muDuckFor(text,spk)}}
setInterval(()=>{try{muSync()}catch(_){}},400);
/* ambience beds */
let bedNow="",bedNodes=[];
function bedSet(name){
 if(!AC||!noiseBuf||name===bedNow)return;bedNow=name;bedNodes.forEach(n=>{try{n.g.gain.setTargetAtTime(0,AC.currentTime,.8);setTimeout(()=>{try{n.s.stop()}catch(_){}},3500)}catch(_){}});bedNodes=[];
 const mk=(f,q,g,lfo)=>{const s=AC.createBufferSource();s.buffer=noiseBuf;s.loop=true;const b=AC.createBiquadFilter();b.type="bandpass";b.frequency.value=f;b.Q.value=q;const gn=AC.createGain();gn.gain.value=0;s.connect(b);b.connect(gn);gn.connect(AC.destination);s.start();gn.gain.setTargetAtTime(g,AC.currentTime,1.2);
  if(lfo){const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=lfo;lg.gain.value=g*.6;l.connect(lg);lg.connect(gn.gain);l.start()}bedNodes.push({s,g:gn});return gn};
 if(name==="wedding"){mk(520,.6,.011,.18);mk(1400,.8,.004,.11)}
 if(name==="wind"){mk(380,.5,.012,.07)}
 if(name==="street"){mk(300,.4,.008,.05)}
 if(name==="cafe"){mk(700,.5,.006,.2)}}
let birdT=0;
function bedSync(){
 if(!AC||AC.state!=="running"||!MU.ctx)return;
 const sc=curScene,on=!document.body.classList.contains("vu-muted")&&vol()>0;
 let want=!on?"":sc==="wedding"?"wedding":sc==="endB"?"wind":sc==="endC"?"street":sc==="cafe"?"cafe":"";
 bedSet(want);
 if(on&&sc==="endA"&&Date.now()>birdT){birdT=Date.now()+2500+Math.random()*3500;const f=2600+Math.random()*1400;tone(f,0,.09,"sine",.02,f*1.18);tone(f*1.1,.14,.08,"sine",.016,f*1.3)}
 if(on&&sc==="wedding"&&Math.random()<.04)sfx("page")}
setInterval(()=>{try{bedSync()}catch(_){}},500);
/* mute button */
(function(){const b=document.createElement("button");b.id="vu-mute";b.type="button";b.setAttribute("aria-label","Mute all sound");b.setAttribute("aria-pressed","false");b.textContent="♪";
 b.addEventListener("click",()=>{const m=document.body.classList.toggle("vu-muted");b.setAttribute("aria-pressed",String(m));b.textContent=m?"×":"♪";b.setAttribute("aria-label",m?"Unmute all sound":"Mute all sound");if(AC&&rainGain)rainGain.gain.setTargetAtTime(0,AC.currentTime,.2)});
 stage.append(b)})();
let route="";
$("controls").addEventListener("click",e=>{const b=e.target.closest(".final-choice");if(!b)return;const t=b.textContent||"";MU.route=/Proceed/.test(t)?"A":/Stop the wedding/.test(t)?"B":/Postpone/.test(t)?"C":/letter/i.test(t)?"D":""},true);

/* ---- Intro / customization theme: user-supplied "Stop the Wedding" (Ashe). The track itself is not bundled. ---- */
const SONG={a:null,has:false,tried:false,on:false,url:"",vol:.7};try{SONG.vol=Math.max(0,Math.min(1,(+localStorage.getItem("vu-song-vol")||70)/100))}catch(_){}
const IDB={open:()=>new Promise((res,rej)=>{try{const r=indexedDB.open("vu-song",1);r.onupgradeneeded=()=>r.result.createObjectStore("f");r.onsuccess=()=>res(r.result);r.onerror=()=>rej()}catch(e){rej(e)}}),async put(b){const d=await IDB.open();d.transaction("f","readwrite").objectStore("f").put(b,"song")},async get(){const d=await IDB.open();return new Promise(res=>{const q=d.transaction("f").objectStore("f").get("song");q.onsuccess=()=>res(q.result);q.onerror=()=>res(null)})}};
const songPhase=()=>{if(!$("title-overlay").classList.contains("hidden"))return false;const vis=id=>{const e=$(id);return e&&!e.classList.contains("hidden")};return vis("mira-opening")||vis("mira-customizer")||!intro.classList.contains("hidden")};
(function(){
 const a=document.createElement("audio");a.loop=true;a.preload="auto";a.setAttribute("aria-hidden","true");SONG.a=a;document.body.append(a);
 a.addEventListener("error",()=>{SONG.has=false});a.addEventListener("canplay",()=>{SONG.has=true;pill.classList.add("have")});
 const pill=document.createElement("label");pill.id="vu-song";pill.className="hidden";pill.innerHTML='<span>♫ Add “Stop the Wedding” (your file)</span><input type="file" accept="audio/*,video/mp4,.mp4,.m4a,.mp3,.wav,.ogg" aria-label="Choose your copy of Stop the Wedding by Ashe">';
 stage.append(pill);SONG.pill=pill;
 pill.querySelector("input").addEventListener("change",e=>{const f=e.target.files&&e.target.files[0];if(!f)return;if(SONG.url)URL.revokeObjectURL(SONG.url);SONG.url=URL.createObjectURL(f);a.src=SONG.url;SONG.tried=true;a.load();a.play().catch(()=>{});pill.querySelector("span").textContent="♫ Song loaded";IDB.put(f).catch(()=>{})});
 IDB.get().then(f=>{if(f&&!SONG.url){SONG.url=URL.createObjectURL(f);SONG.tried=true;a.src=SONG.url;a.load();pill.querySelector("span").textContent="♫ Song loaded"}}).catch(()=>{});
})();
function songTick(){
 const a=SONG.a,ph=songPhase(),story=!ph&&$("title-overlay").classList.contains("hidden");
 SONG.pill.classList.toggle("hidden",!(ph||(story&&!SONG.has)));SONG.pill.classList.toggle("mini",story);
 if((ph||story)&&!SONG.tried){SONG.tried=true;a.src="stop-the-wedding.mp3"}
 /* full level in intro/customization; in the story a clear layer UNDER the instrumentals and effects, ducked during dialogue */
 const m=mvolume(),sv=SONG.vol;
 const goal=SONG.has&&m>0?(ph?Math.min(1,sv*Math.max(.5,m*2.4)):story?Math.min(.55,sv*(.25+m*.9))*Math.max(.4,MU.duck||1):0):0;
 const full=ph&&goal>0;
 if(goal>0&&a.paused)a.play().catch(()=>{});
 if(full&&!SONG.on){SONG.on=true}
 if(full&&MU.master&&AC)MU.master.gain.setTargetAtTime(0,AC.currentTime,.15);
 const d=goal-a.volume;a.volume=Math.max(0,Math.min(1,Math.abs(d)<.03?goal:a.volume+Math.sign(d)*.03));
 if(!full&&SONG.on){SONG.on=false;MU.mood=""}
 if(goal===0&&a.volume===0&&!a.paused)a.pause();
}
(function(){const set=$("settings-panel"),row=document.createElement("div");row.className="setting-row";row.innerHTML='<label for="song-volume">Song layer volume</label><input id="song-volume" type="range" min="0" max="100" value="'+Math.round(SONG.vol*100)+'">';const anchor=$("effects-volume")?.closest(".setting-row");(anchor||set.firstElementChild).after(row);row.querySelector("input").addEventListener("input",e=>{SONG.vol=e.target.value/100;try{localStorage.setItem("vu-song-vol",e.target.value)}catch(_){}})})();
setInterval(()=>{try{songTick()}catch(_){}},120);

window.__vu={song:()=>({has:SONG.has,on:SONG.on,paused:SONG.a.paused,vol:+SONG.a.volume.toFixed(2)}),mood:()=>MU.mood,duck:()=>+MU.duck.toFixed(2),ctx:()=>AC&&AC.state,bed:()=>bedNow,vol:()=>mvolume(),master:()=>MU.master?+MU.master.gain.value.toFixed(3):null};

/* =================================================================
   10. ACTION, EXPRESSION AND SHOT DIRECTOR
   Extra narration verbs, listener reactions, emotion arcs, camera grammar.
   ================================================================= */
function enter(a,dir){if(!a)return;a.classList.remove("enter-l","enter-r");void a.offsetWidth;a.classList.add(dir<0?"enter-l":"enter-r");sfx("steps");later(()=>a.classList.remove("enter-l","enter-r"),2000)}
function extraVerbs(c){
 const {doit,a,oa,subj,other,toward,T,s,cast,scene,xOf}=c;
 doit(/meets (her|him|mira)|arrives|comes in|comes to|joins|enters|appears at/,()=>{if(a)enter(a,-toward||-1)});
 doit(/approach|walks? (up|over|to)|crosses to|comes? closer|draws? (her |his )?chair/,()=>{if(a){walk(a,toward*6,{d:2.2});lookAt(a,toward*3,0)}});
 doit(/hand in hers|holds? (his|her) hand|takes? (her|his) hand|squeezes|hands meet|hand in his/,()=>{if(cast.length>1){[subj,other].forEach(n=>{const x=A(n);if(x){clearPose(x);cls(x,"pose-touch");cls(x,"pose-reach"+(xOf(n)<xOf(n===subj?other:subj)?"R":"L"))}});sfx("breath")}});
 doit(/palms?|hands? will not stay still|trembl|shak(es|ing)|fidget|twist(s|ing)? /,()=>{if(a){cls(a,"shake");later(()=>cls(a,"shake",false),3400)}});
 doit(/cried|crying|\bcry\b|grieves|tears|\bsob|weep|good crying/,()=>{if(a){a._cry=true;setEmo(a,"sad");cls(a,"cry");sfx("sob")}});
 doit(/smiles?|relieved|laughs?|grin|grins/,()=>{if(a)setEmo(a,"smile")});
 doit(/exhale|breathes out|relief/,()=>{if(a){sfx("breath");cls(a,"pose-hesitate",false)}});
 doit(/goes dark|stays dark|then dark|warm and dark|goes warm|thread closes|signal offers no answer|goes quiet/,()=>{$("phone").classList.add("dead");sfx("shimmer")});
 doit(/\bdress\b|fabric|gown/,()=>{stageFx("fx-dress",3200);sfx("rustle");if(a)lookAt(a,-3,1)});
 doit(/candle|flames?/,()=>{stageFx("fx-candle",5000)});
 doit(/sunlight|light (catches|moves|falls)|dust turns|afternoon light|dawn|morning light/,()=>{stageFx("fx-sun",4800)});
 doit(/possibilit|the ledger|archive holds|memory archive|hall of doors/,()=>{stageFx("fx-possible",4400);sfx("shimmer")});
 doit(/colou?r|house changes|goes yellow|yellow|blue house/,()=>{stageFx("fx-hue",3600);sfx("shimmer")});
 doit(/\breads?\b|reread/,()=>{if(a){const k=/letter/.test(T)?"letter":/notebook|book|collection/.test(T)?"book":"phone";giveHold(subj,k,150);lookAt(a,0,3)}sfx("page")});
 doit(/drops?\b|lets? (it )?fall|slips? from|falls? (from|to)/,()=>{const k=nounOf(s)||propDefault();if(k)propFx(k,"fall",1800);if(a){clearPose(a);cls(a,"pose-drop");syncHeld()}sfx("thud")});
 doit(/silence|held silence|neither of them|looks? at each other|pause/,()=>{cast.forEach(n=>{const x=A(n);if(x){cls(x,"pose-hesitate");const o=cast.find(q=>q!==n);if(o)lookAt(x,Math.sign(xOf(o)-xOf(n))*3,0)}})});
 doit(/rain (begins|starts|finds|falls)|starts to rain|raindrops/,()=>{$("weather").classList.add("rain");stageFx("fx-rain",4000)});
 doit(/years later|that night|next morning|morning before|later,|that evening|two days before|three days before|the next/,()=>{stageFx("fx-dip",1800);sfx("whoosh")});
 doit(/aisle|programs|head of the aisle|stands at the head|guests|rows/,()=>{stageFx("fx-guests",4200)});
 doit(/turns? (her|his) (face|head|back)|turns? away|turns? from|faces? (the|her|him)/,()=>{if(a)cls(a,"turned")});
 doit(/lowers? (her|his) (head|eyes|gaze)|bows? (her|his)|hangs? (her|his) head/,()=>{if(a){clearPose(a);cls(a,"pose-sad")}});
 doit(/lift(s|ed)? (her|his) (head|eyes|gaze|face)|looks? up/,()=>{if(a){lookAt(a,0,-3);cls(a,"pose-sad",false)}});
 doit(/knot|thread|window is still open/,()=>{sfx("shimmer")});
 doit(/^(the life they expected|a life of her own|a different tomorrow|the letter)\./,()=>{stageFx("fx-finale",12000)});
 doit(/keeps|keep|holds on|does not let go|close(s)? (her|his) (hand|fingers)/,()=>{if(a)cls(a,"clutch");later(()=>a&&cls(a,"clutch",false),3000)});
 doit(/step(s|ped)? (toward|to)|walks? toward|first careful step|last step/,()=>{if(a&&!a.classList.contains("walking"))walk(a,toward*7,{d:2.6})});
 doit(/holds?|hold|waiting|waits/,()=>{if(a)cls(a,"pose-hesitate")});
 doit(/hovers?|thumb/,()=>{if(a){giveHold(subj,"phone",100);cls(a,"pose-hesitate");lookAt(a,0,3)}stageFx("fx-hover",5200);sfx("tick")});
 doit(/adrian:|almost-wife|love you/,()=>{if(a){giveHold(subj,"phone",100);setEmo(a,"smile")}sfx("chime")});
 doit(/has loved|three years|careful way/,()=>{if(a){setEmo(a,"smile");lookAt(a,-3,1)}});
 doit(/will not resolve|says only|^hello\.?$|hello\./,()=>{stageFx("fx-buzz",1000);propFx("phone","buzz",1200);sfx("shimmer")});
 doit(/held away|as if it might|expensive later|kind first/,()=>{if(a){giveHold(subj,"phone",100);cls(a,"pose-hesitate");lookAt(a,0,2)}sfx("breath")});
 doit(/forecast|alarm|clear all week/,()=>{if(a){giveHold(subj,"phone",100);lookAt(a,0,3)}sfx("tick");later(()=>sfx("tick"),1200)});
 doit(/accuse|simply listen|could accuse/,()=>{if(a){cls(a,"pose-hesitate");lookAt(a,0,2)}});
 doit(/\btea\b|to the window|daylight|smaller and stranger/,()=>{if(a){giveHold(subj,"cup",100);lookAt(a,-4,-1)}stageFx("fx-sun",4200)});
 doit(/loosens|memory loosens|^flashback/,()=>{stageFx("fx-dip",1800);sfx("whoosh")});
 doit(/gone cold|a year ago|rain on the/,()=>{propFx("cup","fade",2000);stageFx("fx-rain",3000)});
 doit(/homework|peonies|theo|plants/,()=>{if(a)setEmo(a,"smile");cast.forEach((n,i)=>{const x=A(n);if(x){later(()=>{cls(x,"talk");later(()=>cls(x,"talk",false),1100)},300+i*1300)}})});

 doit(/pink door is|bookshop she means|girl on the other end/,()=>{propFx("book","buzz",900);if(a)lookAt(a,0,3)});
 doit(/first anniversary|first said goodbye|cosmos/,()=>{stageFx("fx-sun",4000)});
 doit(/coffee|window seat|saved her|spine/,()=>{if(a)giveHold(subj,/notebook|spine/.test(T)?"book":"cup",120);sfx("rustle")});
 doit(/squeeze/,()=>{if(cast.length>1){[subj,other].forEach(n=>{const x=A(n);if(x){clearPose(x);cls(x,"pose-touch")}})}sfx("breath")});
 doit(/closes the subject|closes? (the|a) door|door on/,()=>{sfx("doorclose");if(oa||a){const x=oa||a;lookAt(x,0,3);cls(x,"pose-sad")}});
 doit(/easy things|right places|small talk|talk like/,()=>{cast.forEach((n,i)=>{const x=A(n);if(x){later(()=>{cls(x,"talk");later(()=>cls(x,"talk",false),1400)},300+i*1500);later(()=>{cls(x,"talk");later(()=>cls(x,"talk",false),1400)},2900+i*1200);setEmo(x,"smile")}})});
 doit(/lease|folded|unsaid|third chair/,()=>{propFx("book","buzz",900);if(a)lookAt(a,0,3)});
 doit(/one breath|breath before|moment passes/,()=>{if(a){cls(a,"pose-hesitate");sfx("breath");lookAt(a,0,2)}});
 doit(/stay(s|ed) dark|dark all night/,()=>{$("phone").classList.add("dead");later(()=>$("phone").classList.remove("dead"),3800)});
 doit(/breaks her|carry this|before it breaks/,()=>{if(a){clearPose(a);cls(a,"pose-sad");cls(a,"shake");later(()=>cls(a,"shake",false),2600)}});
 doit(/checklist|list gets/,()=>{sfx("page");if(a)lookAt(a,0,3);propFx("book","buzz",700)});
 doit(/believes|because he wants|so, almost|almost, does/,()=>{if(a)setEmo(a,"smile");if(oa)lookAt(oa,-toward*3,2)});
 doit(/\bopens\b/,()=>{if(a){giveHold(subj,/letter/.test(T)?"letter":"book",100);sfx("page")}});
 doit(/no door|promises that|possibility|another possib|third possib|proceeds|afterward|nothing here/,()=>{stageFx("fx-possible",4200);sfx("shimmer")});
 doit(/last message|cannot answer|messages wait|waits? for/,()=>{typingDots(3000);if(a)lookAt(a,0,3)});
 doit(/decides what|decides$|decides\b/,()=>{if(a){lookAt(a,toward*4,-2);sfx("breath")}});
 doit(/voice|twenty-four years|cross the/,()=>{stageFx("fx-buzz",1200);sfx("shimmer")});
 doit(/decide what to send|can only decide|how much of this|how she tells/,()=>{typingDots(3000)});
 doit(/into the rain|back to the rain|the rain/,()=>{$("weather").classList.add("rain");stageFx("fx-rain",4000)});
 doit(/never born|dissolved|will not remember|nowhere to go|not been told|the cost/,()=>{stageFx("fx-fade",4500);propFx("photo","fade");sfx("fade")});
 doit(/shop is real|signed for spring|postponed to spring|lease beside|the shop/,()=>{stageFx("fx-sun",4800)});
 doit(/chosen|chose|choose|chooses/,()=>{stageFx("fx-sun",4000);if(a)cls(a,"pose-sad",false)});
 doit(/vows|hard thing|asks for|answers yes|says spring/,()=>{if(cast.length>1)cast.forEach(n=>{const x=A(n),o=cast.find(q=>q!==n);if(x&&o)lookAt(x,Math.sign(xOf(o)-xOf(n))*3,0)});stageFx("fx-guests",3600)});
 doit(/alone|asked for nothing|stair is still a stair|has to sit down/,()=>{if(a){cls(a,"pose-sad");lookAt(a,0,3)}});
 doit(/comes? back|back in her|back to/,()=>{stageFx("fx-dip",1700);sfx("whoosh")});
 doit(/in 20(24|48)|girl on a|station platform/,()=>{stageFx("fx-dip",1700);sfx("whoosh")});
 doit(/keeps it|has kept|kept the|glow carries|somewhere past/,()=>{stageFx("fx-possible",4200);if(a)giveHold(subj,"book",200);sfx("shimmer")});
 doit(/will not be easy|not guaranteed|is a different one|different life/,()=>{if(a)lookAt(a,0,-1);stageFx("fx-sun",4200)});
}
let shotScene="";
function shotDirector(text,spk,cast,scene,talkers,e,choicesUp){
 const T=text.toLowerCase(),narr=/narration|system/.test(spk);
 const x=talkers.length?parseFloat(A(talkers[0])?.style.getPropertyValue("--actor-x")||50):50;
 stage.classList.remove("ots");let kind;
 const prop=stage.querySelector("#props .prop");
 if(shotScene!==scene){shotScene=scene;kind="pull"}
 else if(REVEAL.test(text))kind="close";
 else if(SILENT.test(text))kind="hold";
 else if(narr&&prop&&/photograph|photo|letter|ring|notebook|poetry|phone|ribbon|lease|ticket|bouquet|cake/.test(T))kind="focus";
 else if(e==="sad"||e==="fear")kind="close";
 else if(cast.length>=2&&talkers.length){kind="push";stage.classList.add("ots")}
 else if(choicesUp)kind="push";
 else kind=camKind==="slow"?"pan":"slow";
 setCam(kind,x);
 if(kind==="focus"&&prop){const r=prop.getBoundingClientRect(),s=stage.getBoundingClientRect();const ox=((r.left+r.width/2-s.left)/s.width*100).toFixed(1),oy=((r.top+r.height/2-s.top)/s.height*100).toFixed(1);const cam=ovs[flip].cam;cam.style.setProperty("--ox",ox+"%");cam.style.setProperty("--oy",oy+"%")}
 else ovs[flip].cam.style.setProperty("--oy","45%")}
function baseEmotions(cast,talkers,text){
 const chap=$("chapter-tag").textContent||"",bc=($("beat-count").textContent||"").match(/(\d+)\s*\/\s*(\d+)/),f=bc?(+bc[1])/(+bc[2]):.5;
 const ci=/Chapter One|Opening/.test(chap)?1:/Chapter Two/.test(chap)?2:/Chapter Three/.test(chap)?3:/Chapter Four/.test(chap)?4:/Chapter Five/.test(chap)?5:0;
 const set=(n,emo)=>{const a=A(n);if(a&&a.dataset.emo==="neutral")setEmo(a,emo)};
 let m="neutral",el="neutral";
 if(ci===1){m=f<.4?"guarded":f<.75?"surprise":"curious";el=f<.5?"curious":"smile"}
 else if(ci===2){m=f<.5?"curious":"smile";el=f<.5?"neutral":"smile"}
 else if(ci===3){m=f<.45?"smile":"sad";el=f<.45?"smile":"sad"}
 else if(ci===4){m=f<.6?"sad":"neutral";el="sad"}
 else if(ci===5){m="sad";el="sad"}
 else if(/Epilogue/.test(chap)){m="sad";el="sad"}
 set("mira",m);set("elara",el);
 const talk=talkers[0];cast.forEach(n=>{const x=A(n);if(!x)return;cls(x,"listen",!!talk&&n!==talk)});
 if(ci===3&&f>=.45&&/never be born|erase|exist/.test(text.toLowerCase())){const x=A("elara");if(x){x._cry=true;setEmo(x,"sad")}}}

/*@@MODULES_END*/
})();

/* ---- polish: emotes, parallax, choice stagger ---- */
(function(){
const stage=document.getElementById("stage");if(!stage)return;
const st=document.createElement("style");st.textContent=`
.vu-emote{position:absolute;z-index:7;font:700 1.5rem/1 "DM Sans",system-ui,sans-serif;pointer-events:none;animation:emo 1.6s ease-out forwards;text-shadow:0 2px 8px #0008}
@keyframes emo{0%{transform:translateY(8px) scale(.3);opacity:0}18%{transform:translateY(-4px) scale(1.25);opacity:1}35%{transform:translateY(-8px) scale(1)}100%{transform:translateY(-34px) scale(1);opacity:0}}
#controls .choice,#controls button.choice{animation:chIn .45s cubic-bezier(.3,1.3,.5,1) both;animation-delay:calc(var(--i,0)*90ms)}
@keyframes chIn{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:none}}
#art{transform:translate(calc(var(--px,0)*-6px),calc(var(--py,0)*-4px));transition:transform .25s ease-out}
#actors{transform:translate(calc(var(--px,0)*5px),calc(var(--py,0)*2px));transition:transform .25s ease-out}`;
document.head.append(st);
window.addEventListener("pointermove",e=>{const r=stage.getBoundingClientRect();stage.style.setProperty("--px",((e.clientX-r.left)/r.width-.5).toFixed(2));stage.style.setProperty("--py",((e.clientY-r.top)/r.height-.5).toFixed(2))},{passive:true});
const RX=[[/\b(love|miss|heart|kiss|dear|always)\b/i,"💗"],[/\?/,"❔"],[/(!|\bno\b|stop|can't|cannot|afraid|scared|run)/i,"❗"],[/(sorry|cry|tears|lost|alone|goodbye|gone)/i,"💧"],[/\b(thank|smile|laugh|happy|yes)\b/i,"✨"]];
let last=0;
function emote(text){
 if(Date.now()-last<2500)return;const hit=RX.find(r=>r[0].test(text));if(!hit)return;
 const acts=[...stage.querySelectorAll("#actors .actor")];if(!acts.length)return;
 const spk=(document.getElementById("speaker")?.textContent||"").toLowerCase();
 const a=acts.find(x=>spk.includes(x.dataset.who||"~"))||acts[0];
 const r=a.getBoundingClientRect(),s=stage.getBoundingClientRect();
 const e=document.createElement("div");e.className="vu-emote";e.textContent=hit[1];
 e.style.left=(r.left-s.left+r.width*.5-12)+"px";e.style.top=(r.top-s.top+r.height*.06)+"px";
 stage.append(e);setTimeout(()=>e.remove(),1700);last=Date.now();
}
const sl=document.getElementById("story-line");
if(sl)new MutationObserver(()=>emote(sl.textContent||"")).observe(sl,{childList:true,characterData:true,subtree:true});
const ctl=document.getElementById("controls");
if(ctl)new MutationObserver(()=>{ctl.querySelectorAll(".choice").forEach((b,i)=>b.style.setProperty("--i",i))}).observe(ctl,{childList:true});
})();