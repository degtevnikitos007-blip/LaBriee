const P={home:document.getElementById('site'),contact:document.getElementById('p2'),collection:document.getElementById('p3'),about:document.getElementById('p4'),shop:document.getElementById('p5')},HT={home:2479,contact:2331,collection:2331,about:2490,shop:2502};let cur='home',busy=false;
const K=()=>innerWidth/1440;
function fit(){Object.values(P).forEach(e=>e.style.transform='scale('+K()+')');document.body.style.height=(HT[cur]*K())+'px'}
const EZ='cubic-bezier(.22,.8,.2,1)';
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const el=e.target,wide=el.offsetWidth>=900;el.style.opacity='';el.animate(wide?[{opacity:0},{opacity:1}]:[{opacity:0,transform:'translateY(30px)'},{opacity:1,transform:'translateY(0)'}],{duration:1100,delay:el._d||0,easing:EZ,fill:'backwards'})}),{threshold:0.01});
function prep(pg,base){const sel=pg.id==='site'?'#site>section>*,#site>footer>*':'#'+pg.id+' .p2>*,#'+pg.id+' form>*';pg.querySelectorAll(sel).forEach(el=>{if(el.tagName==='FORM'||el.classList.contains('fade'))return;const t=parseFloat(getComputedStyle(el).top)||0,pt=el.closest('section,footer');let off=0;if(pt&&pt.id==='top')off=0;el.style.opacity=0;el._d=base+(t<900?t*0.28:0);io.observe(el)})}
const cur_=document.getElementById('cur'),lg=cur_.querySelector('.lg'),bar=cur_.querySelector('.bar');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function swap(page,after){busy=true;const D=800,E='cubic-bezier(.76,0,.24,1)';
const a=cur_.animate([{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:D,easing:E,fill:'forwards'});
[...lg.children].forEach((s,i)=>s.animate([{opacity:0,transform:'translateY(24px)',filter:'blur(8px)'},{opacity:1,transform:'translateY(0)',filter:'blur(0)'}],{duration:750,delay:380+i*120,easing:EZ,fill:'both'}));
bar.animate([{opacity:0,transform:'scaleX(0)'},{opacity:1,transform:'scaleX(1)'}],{duration:800,delay:500,easing:EZ,fill:'forwards'});
await a.finished;await sleep(250);
P[cur].style.display='none';P[page].style.display='block';cur=page;fit();after();prep(P[page],150);
const o=cur_.animate([{clipPath:'inset(0 0 0 0)'},{clipPath:'inset(0 0 100% 0)'}],{duration:D,easing:E,fill:'forwards'});
lg.animate([{opacity:1},{opacity:0}],{duration:350,fill:'forwards'});bar.animate([{opacity:1},{opacity:0}],{duration:350,fill:'forwards'});
await o.finished;cur_.getAnimations().forEach(x=>x.cancel());cur_.getAnimations({subtree:true}).forEach(x=>x.cancel());bar.getAnimations().forEach(x=>x.cancel());busy=false}
function target(n){const t=n==='sell'?document.getElementById('sell'):n==='story'?document.getElementById('story'):null;return t?t.offsetTop*K():0}
function go(n){if(busy)return;const page=['contact','collection','about','shop'].includes(n)?n:'home';
if(page===cur){scrollTo({top:page==='home'?target(n):0,behavior:'smooth'});return}
swap(page,()=>scrollTo({top:page==='home'?target(n):0,behavior:'auto'}))}
document.addEventListener('click',e=>{const pl=e.target.closest('.pl');if(pl){if(pl.classList.contains('ok'))return;pl.classList.add('ok');document.querySelectorAll('.p2>svg,#p5 .p2 svg').forEach(s=>{});document.querySelectorAll('#p5 .p2>svg').forEach((s,i)=>{if(i===2){s.classList.remove('bagp');void s.getBoundingClientRect();s.classList.add('bagp')}});setTimeout(()=>pl.classList.remove('ok'),1800);return}const a=e.target.closest('a');if(!a)return;if(a.dataset.go){e.preventDefault();const n=a.dataset.go;go(n==='top'?'home':n)}else if(a.getAttribute('href')==='#')e.preventDefault()});
const cf=document.getElementById('cf'),sb=cf.querySelector('.send'),sbH=sb.innerHTML;
cf.addEventListener('submit',e=>{e.preventDefault();if(!cf.checkValidity()){cf.reportValidity();return}cf.reset();sb.innerHTML='THANK YOU';sb.disabled=true;setTimeout(()=>{sb.innerHTML=sbH;sb.disabled=false},2600)});
document.querySelectorAll('.p2>svg,#site .hero>div svg').forEach(s=>{const sibs=[...s.parentElement.querySelectorAll(':scope>svg')];s.classList.add('hic','i'+Math.min(sibs.indexOf(s),2))});addEventListener('resize',fit);fit();prep(P.home,150);