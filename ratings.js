(function(){
  let selected=0;
  const escR=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  async function client(){ try{return await initSupabase()}catch{return null} }
  function starButtons(current=0){return `<div class="ratingStars" role="radiogroup" aria-label="Valoración de 1 a 5 estrellas">${[1,2,3,4,5].map(n=>`<button type="button" class="ratingStar ${n<=current?'on':''}" aria-label="${n} estrella${n>1?'s':''}" onclick="PAES_RATINGS.pick(${n})">★</button>`).join('')}</div>`}
  async function summary(){
    const c=await client(); if(!c)return {avg:null,count:0};
    const {data,error}=await c.from('ratings').select('stars'); if(error||!data?.length)return {avg:null,count:0};
    const avg=data.reduce((a,x)=>a+Number(x.stars||0),0)/data.length; return {avg,count:data.length};
  }
  async function mine(){
    const c=await client(); if(!c)return null; const {data:s}=await c.auth.getSession(); const uid=s?.session?.user?.id; if(!uid)return null;
    const {data}=await c.from('ratings').select('*').eq('user_id',uid).maybeSingle(); return data||null;
  }
  async function mountPublic(){
    const el=document.getElementById('ratingPublicMount'); if(!el)return;
    const s=await summary();
    el.innerHTML=`<section class="ratingPublicCard"><div><div class="eyebrow">⭐ OPINIONES REALES</div><h2>¿Te está ayudando PAES Trainer?</h2><p>Tu opinión nos ayuda a mejorar la plataforma para más estudiantes.</p></div><div class="ratingPublicScore">${s.count?`<strong>${s.avg.toFixed(1)}</strong><span>★★★★★</span><small>${s.count} valoración${s.count===1?'':'es'}</small>`:`<strong>—</strong><span>☆☆☆☆☆</span><small>Aún no hay valoraciones</small>`}</div><button class="secondary" onclick="loginScreen()">Inicia sesión para valorar</button></section>`;
  }
  async function mountMember(){
    const el=document.getElementById('ratingMemberMount'); if(!el)return;
    const current=await mine(); selected=Number(current?.stars||0);
    el.innerHTML=`<section class="card ratingMemberCard"><div class="eyebrow">💙 TU OPINIÓN IMPORTA</div><h2>¿Te está ayudando PAES Trainer?</h2><p>Selecciona de 1 a 5 estrellas. Puedes cambiar tu valoración cuando quieras.</p>${starButtons(selected)}<div id="ratingChoice" class="ratingChoice">${selected?`${selected}/5 estrellas seleccionadas`:'Selecciona una valoración'}</div><textarea id="ratingComment" class="ratingComment" maxlength="500" placeholder="Opcional: ¿Qué te gustó o qué mejorarías?">${escR(current?.comment||'')}</textarea><div class="toolbar"><button class="btn" onclick="PAES_RATINGS.submit()">Enviar valoración</button></div><div id="ratingNotice"></div></section>`;
  }
  function pick(n){ selected=n; document.querySelectorAll('.ratingStar').forEach((b,i)=>b.classList.toggle('on',i<n)); const c=document.getElementById('ratingChoice'); if(c)c.textContent=`${n}/5 estrellas seleccionadas`; }
  async function submit(){
    if(selected<1||selected>5){notice('Selecciona entre 1 y 5 estrellas.',true);return}
    const c=await client(); if(!c){notice('No se pudo conectar con Supabase.',true);return}
    const {data:s}=await c.auth.getSession(); const uid=s?.session?.user?.id; if(!uid){notice('Debes iniciar sesión para valorar.',true);return}
    const p=typeof getActiveProfile==='function'?getActiveProfile():null; const comment=(document.getElementById('ratingComment')?.value||'').trim();
    const row={user_id:uid,stars:selected,comment,display_name:p?.name||currentAccess?.display_name||'Estudiante',username:currentAccess?.username||'',updated_at:new Date().toISOString()};
    const {error}=await c.from('ratings').upsert(row,{onConflict:'user_id'}); if(error){notice(error.message,true);return}
    notice('¡Gracias! 💙 Tu valoración quedó guardada.');
  }
  function notice(msg,bad=false){const e=document.getElementById('ratingNotice');if(e)e.innerHTML=`<div class="${bad?'adminError':'adminSuccess'}">${escR(msg)}</div>`}
  async function mountAdmin(){
    const el=document.getElementById('adminRatings'); if(!el)return; const c=await client(); if(!c)return;
    const {data,error}=await c.from('ratings').select('*').order('updated_at',{ascending:false}); if(error){el.innerHTML=`<div class="adminError">${escR(error.message)}</div>`;return}
    const rows=data||[],avg=rows.length?rows.reduce((a,x)=>a+Number(x.stars||0),0)/rows.length:0;
    el.innerHTML=`<section class="sectionTitle"><div><h2>⭐ Opiniones de alumnos</h2><p>${rows.length?`Promedio ${avg.toFixed(1)}/5 · ${rows.length} valoración${rows.length===1?'':'es'}`:'Aún no hay valoraciones.'}</p></div></section><div class="card">${rows.length?rows.map(r=>`<div class="ratingAdminRow"><div><b>${escR(r.display_name||r.username||'Alumno')}</b><small>@${escR(r.username||'usuario')} · ${'★'.repeat(Number(r.stars||0))}${'☆'.repeat(5-Number(r.stars||0))}</small></div><p>${escR(r.comment||'Sin comentario')}</p><small>${new Date(r.updated_at).toLocaleDateString('es-CL')}</small></div>`).join(''):'<div class="empty">Sin opiniones todavía.</div>'}</div>`;
  }
  window.PAES_RATINGS={pick,submit,mountPublic,mountMember,mountAdmin};
  setTimeout(()=>{mountPublic();mountMember();mountAdmin();},120);
})();
