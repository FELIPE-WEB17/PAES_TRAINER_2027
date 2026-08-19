/* PAES Trainer V3.2 - control global de diversidad y duplicados */
(function(){
'use strict';
const clean=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9áéíóúñü%$+\-=/ ]/gi,' ').replace(/\s+/g,' ').trim();
const exactKey=q=>clean(q.text);
const templateKey=q=>clean(q.text).replace(/\b\d+(?:[.,]\d+)?\b/g,'#').replace(/\b[a-z]\b/g,'x');
const words=s=>new Set(clean(s).split(' ').filter(w=>w.length>3));
function jaccard(a,b){const A=words(a),B=words(b);if(!A.size||!B.size)return 0;let inter=0;A.forEach(x=>B.has(x)&&inter++);return inter/(A.size+B.size-inter);}
function equivalent(a,b){if(exactKey(a)===exactKey(b))return true;const ta=templateKey(a),tb=templateKey(b);if(ta===tb)return true;return jaccard(a.text,b.text)>=0.88;}
function dedupe(list,{maxTemplate=2}={}){const out=[],templates=new Map();for(const q of list){if(out.some(x=>equivalent(x,q)))continue;const tk=templateKey(q),n=templates.get(tk)||0;if(n>=maxTemplate)continue;templates.set(tk,n+1);out.push(q);}return out;}
function markScored(qs,scoredCount){qs.forEach((q,i)=>q.scored=i<scoredCount);return qs;}
function shuffledLocal(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a;}
function buildExam(testId,{titleSuffix='Ensayo diverso',preferBank=true}={}){
 const base=window.PAES_DATA.find(t=>t.id===testId);if(!base)throw new Error('Prueba no encontrada');
 const total=base.questions.length;
 // Primero conserva preguntas del banco realmente distintas; luego completa con variantes originales.
 const bank=dedupe(shuffledLocal(base.questions),{maxTemplate:1}).map(q=>({...q,source:q.source||'Banco PAES Trainer'}));
 let out=preferBank?[...bank]:[];
 let attempts=0;
 while(out.length<total&&attempts<20){attempts++;const need=total-out.length;const gen=window.PAES_GENERATOR.generatedQuestions(testId,Math.max(need*2,20)).questions||[];const candidates=shuffledLocal(gen).map(q=>({...q,source:q.source||'Variante original'}));for(const q of candidates){if(out.some(x=>equivalent(x,q)))continue;out.push(q);if(out.length>=total)break;}}
 // Último recurso: permite variantes numéricas/contextuales, pero jamás el mismo enunciado exacto.
 if(out.length<total){let attempts2=0,seen=new Set(out.map(exactKey));while(out.length<total&&attempts2<40){attempts2++;const gen=window.PAES_GENERATOR.generatedQuestions(testId,total).questions||[];for(const q of gen){const k=exactKey(q);if(seen.has(k))continue;seen.add(k);out.push({...q,source:q.source||'Variante original'});if(out.length>=total)break;}}}
 out=shuffledLocal(out.slice(0,total));markScored(out,base.scoredCount);
 return {...base,title:`${base.title} - ${titleSuffix}`,questions:out,generated:true,diversityChecked:true,demreFramework:'Temarios y habilidades DEMRE vigentes - Admisión 2027'};
}
function trainingPool(testId,skill='all',diff='all',target=40){const base=window.PAES_DATA.find(t=>t.id===testId);if(!base)return[];let bank=base.questions.filter(q=>(skill==='all'||q.skill===skill)&&(diff==='all'||q.difficulty===diff));let out=dedupe(shuffledLocal(bank),{maxTemplate:1});let tries=0;while(out.length<target&&tries<12){tries++;const gen=window.PAES_GENERATOR.generatedQuestions(testId,target*2).questions||[];for(const q of gen){if(skill!=='all'&&q.skill!==skill)continue;if(diff!=='all'&&q.difficulty!==diff)continue;if(out.some(x=>equivalent(x,q)))continue;out.push(q);if(out.length>=target)break;}}return out;}
window.PAES_DIVERSITY={buildExam,trainingPool,equivalent,dedupe,exactKey,templateKey};
})();
