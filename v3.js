/* PAES Trainer V3 - experiencia adaptativa, no repeticion y repaso espaciado */
(function(){
'use strict';
const V3_MEMORY='paesQuestionMemoryV3';
const V3_PLAN='paesDailyPlanV3';
const DAY=86400000;
const todayKey=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Santiago',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const nowIso=()=>new Date().toISOString();
function memory(){return safeParse(localStorage.getItem(scopedKey(V3_MEMORY)),{});}
function saveMemory(m){localStorage.setItem(scopedKey(V3_MEMORY),JSON.stringify(m));}
function normV3(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();}
function fp(q,testId=''){return `${testId||q._test||''}|${q.id||q.n||''}|${normV3(q.text).slice(0,220)}`;}
function dueDate(days){return new Date(Date.now()+days*DAY).toISOString();}
function tagLabel(tag){return tag==='new'?'🆕 Nueva':tag==='review'?'🧠 Repaso programado':tag==='reinforce'?'🔁 Refuerzo':'🎯 Entrenamiento';}
function recordQuestions(){
  if(!state?.questions?.length)return;
  const m=memory(), testId=state.test?.id||'';
  state.questions.forEach((q,i)=>{
    if(!q.scored)return;
    const k=fp(q,testId), old=m[k]||{seen:0,correct:0,wrong:0};
    const good=state.answers[i]===q.answer;
    old.seen=(old.seen||0)+1; old.correct=(old.correct||0)+(good?1:0); old.wrong=(old.wrong||0)+(good?0:1);
    old.lastSeen=nowIso(); old.testId=testId; old.skill=q.skill||'General'; old.difficulty=q.difficulty||'Referencial'; old.text=q.text;
    // Repeticion espaciada: error -> 1 dia, primera correcta -> 3, segunda -> 7, dominio -> 14.
    const days=good?(old.correct>=3?14:old.correct===2?7:3):1;
    old.nextReview=dueDate(days); m[k]=old;
  });
  saveMemory(m);
}
function questionStatus(q,testId){
  const e=memory()[fp(q,testId)];
  if(!e)return 'new';
  if(e.wrong>e.correct)return 'reinforce';
  if(e.nextReview&&new Date(e.nextReview)<=new Date())return 'review';
  return 'seen';
}
function pickNoRepeat(pool,count,testId,{intent='normal'}={}){
  const m=memory(), now=Date.now();
  const scored=pool.filter(q=>q.scored!==false);
  const unseen=[],due=[],reinforce=[],seen=[];
  scored.forEach(q=>{
    const e=m[fp(q,testId)];
    if(!e)unseen.push(q);
    else if(e.wrong>e.correct)reinforce.push(q);
    else if(e.nextReview&&new Date(e.nextReview).getTime()<=now)due.push(q);
    else seen.push(q);
  });
  const mix=a=>shuffled(a);
  let ordered;
  if(intent==='review')ordered=[...mix(due),...mix(reinforce),...mix(unseen),...mix(seen)];
  else if(intent==='errors')ordered=[...mix(reinforce),...mix(due),...mix(unseen),...mix(seen)];
  else ordered=[...mix(unseen),...mix(due),...mix(reinforce),...mix(seen).sort((a,b)=>new Date(m[fp(a,testId)]?.lastSeen||0)-new Date(m[fp(b,testId)]?.lastSeen||0))];
  const out=[],keys=new Set(),shapes=new Set();
  const shape=q=>normV3(q.text).replace(/\d+(?:[.,]\d+)?/g,'#').replace(/\$\s*#/g,'$#').slice(0,180);
  const add=q=>{const k=fp(q,testId);if(keys.has(k))return false;keys.add(k);let tag=!m[k]?'new':(m[k].wrong>m[k].correct?'reinforce':(m[k].nextReview&&new Date(m[k].nextReview)<=new Date()?'review':'seen'));out.push({...q,_v3Tag:tag});return true;};
  // Primera pasada: evita preguntas con el mismo molde dentro de una sesion.
  for(const q of ordered){const sh=shape(q);if(shapes.has(sh))continue;if(add(q))shapes.add(sh);if(out.length>=count)break;}
  // Segunda pasada: si el eje tiene pocos formatos, completa sin repetir la pregunta exacta.
  if(out.length<count)for(const q of ordered){if(add(q)&&out.length>=count)break;}
  return out;
}
function aggregateWeaknesses(){
  const h=getHistory(), map={};
  h.forEach(r=>Object.entries(r.skills||{}).forEach(([skill,v])=>{
    const key=`${r.id}|${skill}`; map[key]??={testId:r.id,skill,ok:0,n:0};map[key].ok+=v.ok||0;map[key].n+=v.n||0;
  }));
  return Object.values(map).filter(x=>x.n>=2).map(x=>({...x,pct:pct(x.ok,x.n)})).sort((a,b)=>a.pct-b.pct||b.n-a.n);
}
function targetToday(){
  const weak=aggregateWeaknesses(), tests=visibleTests();
  if(weak.length){const w=weak.find(x=>tests.some(t=>t.id===x.testId))||weak[0];return w;}
  const t=tests[0]||PAES_DATA[0]; const skills=[...new Set(t.questions.map(q=>q.skill||'General'))];
  return {testId:t.id,skill:skills[0]||'General',pct:null,n:0};
}
function v3Plan(){
  const target=targetToday(), key=`${todayKey()}|${getActiveId()}|${target.testId}|${target.skill}`;
  const old=safeParse(localStorage.getItem(scopedKey(V3_PLAN)),null);
  if(old?.key===key)return old;
  const p={key,date:todayKey(),target,steps:[{id:'learn',label:'Aprende',mins:8},{id:'train',label:'Entrena',mins:15},{id:'errors',label:'Refuerza errores',mins:8},{id:'review',label:'Repaso espaciado',mins:6}]};
  localStorage.setItem(scopedKey(V3_PLAN),JSON.stringify(p));return p;
}
function questionStats(){const vals=Object.values(memory());return {seen:vals.length,due:vals.filter(x=>x.nextReview&&new Date(x.nextReview)<=new Date()).length,mastered:vals.filter(x=>(x.correct||0)>=3&&(x.correct||0)>(x.wrong||0)).length};}
function navActive(name){document.querySelectorAll('.v3nav button').forEach(b=>b.classList.toggle('active',b.dataset.nav===name));}
function v3Home(){
  resetState(); const p=getActiveProfile(); if(!p){profileGate();return} if(!p.grade&&currentAccess?.role!=='admin'){gradeGate();return}
  window.PAES_PROFILE_SCOPE=p.id; navActive('home');
  const g=getGame(), plan=v3Plan(), target=plan.target, t=PAES_DATA.find(x=>x.id===target.testId), h=getHistory(), exams=h.filter(x=>isExamMode(x.mode)&&Number.isFinite(x.score)), latest=exams[0]?.score, previous=exams[1]?.score, delta=Number.isFinite(latest)&&Number.isFinite(previous)?latest-previous:null, qs=questionStats();
  app.innerHTML=`<section class="v3hero"><div><div class="eyebrow">${esc(gradeLabel(p))} · PREPARACIÓN ADAPTATIVA</div><h1>Hola, ${esc(p.name)} 👋</h1><p>Hoy no tienes que decidir qué estudiar. PAES Trainer prioriza lo que más puede hacerte mejorar.</p><div class="v3chips"><span>🔥 ${g.streak} días</span><span>⭐ ${g.xp.toLocaleString('es-CL')} XP</span><span>🎯 Meta ${p.goal||700}</span></div></div><div class="v3score"><small>Último ensayo</small><b>${Number.isFinite(latest)?latest:'--'}</b><span>${delta===null?'Completa un ensayo para medir evolución':delta>=0?`📈 +${delta} pts vs. anterior`:`📉 ${delta} pts vs. anterior`}</span></div></section>
  <section class="v3daily card"><div class="v3dailyHead"><div><div class="eyebrow">🎯 TU ENTRENAMIENTO DE HOY</div><h2>${esc(t?.title||'PAES')} · ${esc(target.skill)}</h2><p>${target.pct===null?'Partiremos construyendo tu línea base.':`Tu rendimiento acumulado aquí es ${target.pct}%. Por eso hoy tiene prioridad.`}</p></div><div class="v3time">≈ 35 min</div></div><div class="v3steps"><button onclick="v3LearnTarget()"><i>1</i><span><b>Aprende</b><small>Explicación breve y clase si la necesitas</small></span><strong>8 min</strong></button><button onclick="v3StartAdaptive(10)"><i>2</i><span><b>Entrena</b><small>10 preguntas nuevas antes de repetir</small></span><strong>15 min</strong></button><button onclick="practiceWrong('${target.testId}')"><i>3</i><span><b>Refuerza</b><small>Errores anteriores, solo cuando conviene</small></span><strong>8 min</strong></button><button onclick="v3StartReview()"><i>4</i><span><b>Repasa</b><small>Preguntas programadas para no olvidar</small></span><strong>6 min</strong></button></div><button class="btn v3primary" onclick="v3StartAdaptive(10)">Comenzar entrenamiento</button></section>
  <section class="v3stats"><article><span>🆕</span><div><b>${Math.max(0,visibleTests().reduce((a,t)=>a+t.questions.length,0)-qs.seen)}</b><small>preguntas sin ver</small></div></article><article><span>🧠</span><div><b>${qs.due}</b><small>repasos pendientes</small></div></article><article><span>💎</span><div><b>${qs.mastered}</b><small>preguntas consolidadas</small></div></article></section>
  <section class="v3quick"><button onclick="v3Training()"><span>🎯</span><b>Entrenar</b><small>Plan adaptativo</small></button><button onclick="v3Exams()"><span>📝</span><b>Ensayos</b><small>Simulación completa</small></button><button onclick="v3Progress()"><span>📊</span><b>Mi progreso</b><small>Diagnóstico y evolución</small></button><button onclick="personalizedClasses()"><span>🎓</span><b>Mi clase</b><small>Refuerzo personalizado</small></button></section>`;
  window.scrollTo(0,0);
}
function v3Training(){
  resetState();navActive('training');const target=targetToday(),t=PAES_DATA.find(x=>x.id===target.testId),qs=questionStats();
  app.innerHTML=`<div class="v3pageHead"><div><div class="eyebrow">ENTRENAMIENTO ADAPTATIVO</div><h1>Entrena lo que realmente necesitas</h1><p>Las preguntas nuevas tienen prioridad. Una pregunta solo reaparece como refuerzo o repaso programado.</p></div></div><section class="card v3focus"><div><span class="v3focusIcon">🎯</span><div><small>Prioridad actual</small><h2>${esc(t?.title||'PAES')} · ${esc(target.skill)}</h2><p>${target.pct===null?'Aún estamos construyendo tu diagnóstico.':`Rendimiento acumulado: ${target.pct}%`}</p></div></div><button class="btn" onclick="v3StartAdaptive(10)">Entrenar 10 preguntas</button></section><section class="grid three"><article class="card"><h3>🆕 Preguntas nuevas</h3><p>La app evita repetirlas accidentalmente.</p><b class="v3metric">${Math.max(0,visibleTests().reduce((a,t)=>a+t.questions.length,0)-qs.seen)}</b></article><article class="card"><h3>🔁 Refuerzo</h3><p>Vuelve solo a preguntas falladas o habilidades débiles.</p><button class="secondary" onclick="practiceWrong('${target.testId}')">Practicar errores</button></article><article class="card"><h3>🧠 Repaso programado</h3><p>Revisa contenidos después de 1, 3, 7 y 14 días.</p><button class="secondary" onclick="v3StartReview()">Repasar ${qs.due||''}</button></article></section><section class="card"><h3>Quiero elegir manualmente</h3><p>También puedes configurar prueba, habilidad y dificultad. Aun así, V3 priorizará preguntas que no hayas visto.</p><button class="ghost" onclick="practiceSetup()">Configurar práctica</button></section>`;
}
function v3Exams(){resetState();navActive('exams');const latest=latestByTest();app.innerHTML=`<div class="v3pageHead"><div><div class="eyebrow">SIMULACIÓN PAES</div><h1>Ensayos</h1><p>Practica con tiempo, estructura completa y puntaje estimado referencial.</p></div><button class="secondary" onclick="generatorSetup()">✨ Crear ensayo nuevo</button></div><section class="v3examGrid">${visibleTests().map(t=>{const l=latest[t.id];return `<article class="card v3examCard"><div><div class="eyebrow">${t.minutes} MIN · ${t.questions.length} PREGUNTAS</div><h2>${esc(t.title)}</h2><p>${l?`Último: <b>${l.score} pts</b> · ${l.correct}/${l.scored}`:'Aún no tienes resultado registrado.'}</p></div><div class="toolbar compact"><button class="btn" onclick="startTest('${t.id}')">Ensayo base</button><button class="secondary" onclick="startGenerated('${t.id}')">Nuevo ensayo</button></div></article>`}).join('')}</section><p class="tiny v3demreNote">Las preguntas de PAES Trainer son material original de práctica. La organización de contenidos y habilidades busca mantenerse alineada con los temarios DEMRE vigentes; los puntajes son estimaciones de estudio.</p>`;}
function v3Progress(){navActive('progress');diagnostic();setTimeout(()=>navActive('progress'),0);}
function v3Profile(){navActive('profile');account();setTimeout(()=>navActive('profile'),0);}
function v3LearnTarget(){const target=targetToday(); personalizedClasses();}
function startSession(t,qs,mode){if(!qs.length){alert('No hay suficientes preguntas disponibles para esta combinación todavía.');return}state={test:t,questions:qs,answers:{},started:Date.now(),submitted:false,timer:null,mode};renderQuiz();state.timer=setInterval(updateTimer,1000);window.scrollTo(0,0);}
function v3StartAdaptive(count=10){const target=targetToday(),t=PAES_DATA.find(x=>x.id===target.testId)||visibleTests()[0],pool=t.questions.filter(q=>(q.skill||'General')===target.skill);let qs=pickNoRepeat(pool,count,t.id);if(qs.length<count&&window.PAES_GENERATOR){const generated=PAES_GENERATOR.generatedQuestions(t.id,count*2).questions||[];const extra=generated.filter(q=>classCategory?q.skill&&classCategory(q.skill)===classCategory(target.skill):q.skill===target.skill).map(q=>({...q,source:'Variante nueva',_v3Tag:'new'}));qs=[...qs,...extra].slice(0,count);}startSession(t,qs,'adaptive');}
function v3StartReview(){const target=targetToday(),t=PAES_DATA.find(x=>x.id===target.testId)||visibleTests()[0];const all=visibleTests().flatMap(test=>test.questions.map(q=>({...q,_test:test.id})));const due=all.filter(q=>{const e=memory()[fp(q,q._test)];return e?.nextReview&&new Date(e.nextReview)<=new Date();});if(!due.length){alert('No tienes repasos programados pendientes. La app te avisará cuando corresponda.');return}const chosen=pickNoRepeat(due,Math.min(10,due.length),t.id,{intent:'review'});startSession(t,chosen,'review');}
// Reemplaza la práctica manual para evitar repetición accidental.
const oldStartPractice=window.startPractice;
window.startPractice=function(){let id=$('#ptest')?.value,skill=$('#pskill')?.value,diff=$('#pdiff')?.value,count=+($('#pcount')?.value||10),t=PAES_DATA.find(x=>x.id===id);if(!t)return oldStartPractice?.();let pool=t.questions.filter(q=>(skill==='all'||q.skill===skill)&&(diff==='all'||q.difficulty===diff));let qs=pickNoRepeat(pool,count,id);if(!qs.length){alert('No hay preguntas con esa combinación. Prueba otro filtro.');return}startSession(t,qs,'practice');};
const oldPracticeWrong=window.practiceWrong;
window.practiceWrong=function(id){let h=getHistory().filter(x=>x.id===id&&((x.wrong?.length)||(x.wrongQuestions?.length))),nums=[...new Set(h.flatMap(x=>x.wrong||[]).map(String))],t=PAES_DATA.find(x=>x.id===id),bank=t?.questions.filter(q=>nums.includes(String(q.n)))||[],generated=h.flatMap(x=>x.wrongQuestions||[]);let pool=[...bank,...generated];if(!pool.length){return oldPracticeWrong(id)}let qs=pickNoRepeat(pool,Math.min(12,pool.length),id,{intent:'errors'}).map(q=>({...q,_v3Tag:'reinforce'}));startSession(t,qs,'errors');};
const oldRenderQuiz=window.renderQuiz;
window.renderQuiz=function(){oldRenderQuiz();requestAnimationFrame(()=>{document.querySelectorAll('#questions .question').forEach((el,i)=>{const q=state.questions[i];if(!q)return;const meta=el.querySelector('.meta');if(meta&&q._v3Tag&&q._v3Tag!=='seen'){const s=document.createElement('span');s.className='pill v3tag '+q._v3Tag;s.textContent=tagLabel(q._v3Tag);meta.prepend(s);}});});};
const oldSubmit=window.submitCurrent;
window.submitCurrent=function(){if(!state.test||state.submitted)return;recordQuestions();oldSubmit();};
// Navegación V3. Las funciones comerciales (landing/login) permanecen intactas.
window.v3Home=v3Home;window.v3Training=v3Training;window.v3Exams=v3Exams;window.v3Progress=v3Progress;window.v3Profile=v3Profile;window.v3StartAdaptive=v3StartAdaptive;window.v3StartReview=v3StartReview;window.v3LearnTarget=v3LearnTarget;
window.home=v3Home;
// Si ya hay una sesión activa al cargar, refresca la interfaz a V3.
setTimeout(()=>{if((commercialMode==='member'||commercialMode==='trial')&&getActiveProfile())v3Home();},80);
})();
