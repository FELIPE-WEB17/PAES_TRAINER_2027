/* PAES Trainer V3.3 - Biblioteca oficial DEMRE 2020-2025 */
(function(){
'use strict';
const years=[
 {year:'2020',label:'PDT · Admisión 2021',note:'Modelos oficiales de Pruebas de Transición, resoluciones y claves.',url:'https://www.psu.demre.cl/publicaciones/listado-2021'},
 {year:'2021',label:'PDT · Admisión 2022',note:'Modelos, resoluciones, temarios y material oficial de preparación.',url:'https://portaldemre.demre.cl/publicaciones/listado-2022'},
 {year:'2022',label:'PDT Invierno + primera PAES',note:'Incluye PDT de Invierno 2022 y PAES Regular rendida en noviembre de 2022.',url:'https://portaldemre.demre.cl/publicaciones/listado-2023'},
 {year:'2023',label:'PAES · Admisión 2024',note:'Pruebas oficiales PAES Regular e Invierno, con sus clavijeros.',url:'https://portaldemre.demre.cl/publicaciones/listado-2024'},
 {year:'2024',label:'PAES · Admisión 2025',note:'PAES de Invierno completa y selección oficial de preguntas PAES Regular.',url:'https://portaldemre.demre.cl/publicaciones/2025/pruebas-oficiales-y-seleccion-preguntas-paes-p2025'},
 {year:'2025',label:'PAES · Admisión 2026',note:'Material oficial publicado por DEMRE durante 2025 para el proceso 2026.',url:'https://portaldemre.demre.cl/publicaciones/'}
];
function openOfficial(url){window.open(url,'_blank','noopener,noreferrer')}
function library(){
  if(typeof navActive==='function')navActive('exams');
  app.innerHTML=`<div class="v3pageHead"><div><div class="eyebrow">BIBLIOTECA OFICIAL</div><h1>Material DEMRE 2020–2025</h1><p>Consulta pruebas, modelos, selecciones de preguntas y clavijeros directamente en DEMRE. Los enlaces abren el material oficial para visualizar o descargar sus PDF.</p></div><button class="secondary" onclick="v3Exams()">← Volver a ensayos</button></div>
  <section class="demreArchiveNote"><b>Importante:</b> 2020 y 2021 corresponden a Pruebas de Transición (PDT). La PAES comenzó a aplicarse en 2022. El material histórico sirve para practicar, pero para preparar la prueba actual prioriza siempre los temarios DEMRE vigentes.</section>
  <section class="demreYearGrid">${years.map(y=>`<article class="demreYearCard"><div class="demreYear">${y.year}</div><div><h2>${y.label}</h2><p>${y.note}</p><button class="btn" onclick="PAES_DEMRE_LIBRARY.open('${y.url}')">Ver / descargar en DEMRE ↗</button></div></article>`).join('')}</section>
  <section class="card demreLegal"><h3>Fuente oficial</h3><p>Estos accesos apuntan al sitio oficial DEMRE. PAES Trainer no modifica ni presenta esos documentos como propios.</p></section>`;
  window.scrollTo(0,0);
}
window.PAES_DEMRE_LIBRARY={years,open:openOfficial,render:library};
window.v3DemreLibrary=library;
})();
