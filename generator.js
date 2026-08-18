/* PAES Trainer V2 - Generador híbrido local.
   Genera variantes controladas sin exponer claves API en el navegador. */
(function(){
const letters=['A','B','C','D'];
const rnd=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const round1=x=>Math.round(x*10)/10;
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function mcq(text,correct,distractors,skill,difficulty,explanation,source='Generada'){
  let vals=[String(correct),...distractors.map(String)].filter((x,i,a)=>a.indexOf(x)===i).slice(0,4);
  while(vals.length<4) vals.push(String(Number(correct)||0 + vals.length+1));
  vals=shuffle(vals); let options=vals.map((v,i)=>({key:letters[i],text:v}));
  let answer=options.find(o=>o.text===String(correct))?.key||'A';
  return {id:'g-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,9),n:'G'+Math.random().toString(36).slice(2,8).toUpperCase(),text,options,answer,skill,difficulty,explanation,scored:true,source};
}
function mathQuestion(level){
  const hard=level==='m2';
  const types=hard?['percent','linear','equation','circle','pyth','mean','prob','prop','quadratic','expo','slope','system']:['percent','linear','equation','circle','pyth','mean','prob','prop'];
  const type=pick(types);
  if(type==='percent'){
    let p=pick([10,15,20,25,30,35,40,45,60,75]), base=pick([120,160,200,240,320,400,480,600,800,960]), ans=base*p/100;
    return mcq(`¿Cuál es el ${p}% de ${base}?`,ans,[ans+base/20,ans-base/20,base-p],'Números','Fácil',`${p}% = ${p}/100. Entonces ${base}·${p}/100 = ${ans}.`);
  }
  if(type==='linear'){
    let a=pick([-4,-3,-2,2,3,4,5]),b=rnd(-7,10),x=rnd(-3,6),ans=a*x+b;
    return mcq(`Para f(x) = ${a}x ${b>=0?'+ '+b:'- '+Math.abs(b)}, ¿cuál es f(${x})?`,ans,[ans+a,ans-a,b+x],'Álgebra y funciones','Fácil',`Se sustituye x=${x}: f(${x})=${a}·${x}${b>=0?'+':'-'}${Math.abs(b)}=${ans}.`);
  }
  if(type==='equation'){
    let x=rnd(2,12),a=rnd(2,6),b=rnd(1,12),c=a*x+b,k=rnd(2,5),d=rnd(1,9),ans=k*x+d;
    return mcq(`Si ${a}x + ${b} = ${c}, entonces ${k}x + ${d} es igual a:`,ans,[ans+k,ans-k,c-d],'Álgebra y funciones','Media',`De ${a}x+${b}=${c} se obtiene x=${x}. Luego ${k}x+${d}=${ans}.`);
  }
  if(type==='circle'){
    let r=rnd(3,12),ans=round1(3.14*r*r);
    return mcq(`Una circunferencia tiene radio ${r} cm. Usando π≈3,14, ¿cuál es su área aproximada en cm²?`,ans,[round1(2*3.14*r),r*r,round1(ans+3.14*r)],'Geometría','Media',`A=πr²≈3,14·${r}²=${ans} cm².`);
  }
  if(type==='pyth'){
    let triple=pick([[3,4,5],[5,12,13],[6,8,10],[7,24,25],[8,15,17],[9,12,15],[12,16,20]]),[a,b,c]=triple;
    return mcq(`Un triángulo rectángulo tiene catetos de ${a} cm y ${b} cm. ¿Cuánto mide la hipotenusa?`,c,[a+b,c+2,Math.abs(b-a)],'Geometría','Media',`Por Pitágoras: c=√(${a}²+${b}²)=${c}.`);
  }
  if(type==='mean'){
    let base=rnd(3,12),arr=[base,base+2,base+4,base+6,base+8],ans=base+4;
    return mcq(`El promedio de los datos [${arr.join(', ')}] es:`,ans,[ans-1,ans+1,arr[4]],'Probabilidad y estadística','Fácil',`La suma es ${arr.reduce((a,b)=>a+b,0)} y se divide por 5: promedio=${ans}.`);
  }
  if(type==='prob'){
    let total=pick([12,16,20,24,28,32]),fav=pick([2,4]); while(total%fav!==0) fav=pick([2,4]); let g=gcd(fav,total),ans=`${fav/g}/${total/g}`;
    return mcq(`En una caja hay ${total} fichas y ${fav} son verdes. Si se extrae una al azar, ¿cuál es la probabilidad de obtener una verde?`,ans,[`${total-fav}/${total}`,`${total}/${fav}`,`${fav}/${total-fav}`],'Probabilidad y estadística','Fácil',`P = casos favorables/casos posibles = ${fav}/${total} = ${ans}.`);
  }
  if(type==='prop'){
    let n1=pick([4,5,6,8,10]),pricePer=pick([2,3,4,5,6]),n2=n1+pick([2,3,4]),c1=n1*pricePer,ans=n2*pricePer;
    return mcq(`Si ${n1} cuadernos cuestan $${c1} mil y el precio es proporcional a la cantidad, ¿cuánto cuestan ${n2} cuadernos?`,ans,[ans-pricePer,ans+pricePer,c1+n2],'Números','Media',`Cada cuaderno cuesta ${c1}/${n1}=${pricePer} mil. Para ${n2}: ${n2}·${pricePer}=${ans} mil.`);
  }
  if(type==='quadratic'){
    let r1=pick([-4,-3,-2,1,2,3]),r2=pick([4,5,6,-1]); let s=-(r1+r2),p=r1*r2;
    return mcq(`Las soluciones de x² ${s>=0?'+ '+s:'- '+Math.abs(s)}x ${p>=0?'+ '+p:'- '+Math.abs(p)} = 0 son:`,`x=${r1} y x=${r2}`,[`x=${-r1} y x=${-r2}`,`x=${r1} solamente`,`x=${r2} solamente`],'Álgebra y funciones','Difícil',`El polinomio factoriza como (x-${r1})(x-${r2})=0; por tanto las raíces son ${r1} y ${r2}.`);
  }
  if(type==='expo'){
    let a=pick([2,3]),n=rnd(3,5),ans=a**n;
    return mcq(`Una cantidad se multiplica por ${a} en cada etapa. Si parte en 1, ¿qué valor alcanza después de ${n} etapas?`,ans,[a*n,ans-a,ans+a],'Álgebra y funciones','Media',`El crecimiento es exponencial: ${a}^${n}=${ans}.`);
  }
  if(type==='slope'){
    let m=pick([-3,-2,2,3,4]),x1=rnd(-2,3),y1=rnd(-4,5),x2=x1+2,y2=y1+2*m;
    return mcq(`Una recta pasa por (${x1}, ${y1}) y (${x2}, ${y2}). ¿Cuál es su pendiente?`,m,[m+1,m-1,2*m],'Álgebra y funciones','Media',`m=(y₂-y₁)/(x₂-x₁)=(${y2}-${y1})/(${x2}-${x1})=${m}.`);
  }
  let x=rnd(1,6),y=rnd(1,6),a=x+y,b=2*x+y;
  return mcq(`Si x+y=${a} y 2x+y=${b}, ¿cuál es el valor de x?`,x,[y,x+1,Math.abs(x-1)],'Álgebra y funciones','Difícil',`Al restar la primera ecuación de la segunda se obtiene x=${b}-${a}=${x}.`);
}
const bioScenarios=[
 ['Organización celular','Media',()=>{let cell=pick(['una célula animal','una célula vegetal']);return [`En ${cell}, una proteína debe ser modificada y empaquetada antes de su secreción. ¿Qué organelo participa de forma más directa?`,'Aparato de Golgi',['Ribosoma','Núcleo','Peroxisoma'],'El aparato de Golgi modifica, clasifica y empaqueta proteínas destinadas a secreción.']}],
 ['Organización celular','Media',()=>[`Una célula se coloca en una solución hipertónica. ¿Qué cambio se espera inicialmente?`,'Salida de agua desde la célula',['Entrada neta de agua','Duplicación inmediata del ADN','Aumento de síntesis proteica'],'Por ósmosis, el agua se desplaza hacia el medio con mayor concentración efectiva de solutos.']],
 ['Metabolismo celular','Media',()=>[`Una célula muscular aumenta fuertemente su consumo de ATP. ¿Qué proceso mitocondrial debería aumentar para reponerlo en condiciones aeróbicas?`,'Fosforilación oxidativa',['Transcripción','Replicación del ADN','Exocitosis'],'La fosforilación oxidativa produce gran parte del ATP celular durante respiración aeróbica.']],
 ['Metabolismo celular','Difícil',()=>{let t=pick([45,50,55]);return [`Una enzima humana pierde actividad rápidamente al ser incubada a ${t} °C. ¿Cuál es la explicación más probable?`,'Cambio en su conformación tridimensional',['Aumento permanente del número de genes','Conversión de la enzima en lípido','Duplicación del sustrato'],'Temperaturas altas pueden desnaturalizar proteínas y alterar su sitio activo.']}],
 ['Genética','Media',()=>{let trait=pick(['color de semilla','longitud del tallo','pigmentación']);return [`En un organismo diploide, un individuo heterocigoto para un gen relacionado con ${trait} produce gametos. ¿Qué principio explica que cada gameto reciba solo uno de los dos alelos?`,'Segregación de alelos',['Dominancia incompleta','Traducción','Mutación dirigida'],'Durante la meiosis los alelos se segregan al separarse los cromosomas homólogos.']}],
 ['Genética','Difícil',()=>[`Dos genes están en el mismo cromosoma, pero aparecen nuevas combinaciones de alelos en algunos gametos. ¿Qué proceso puede explicarlo?`,'Entrecruzamiento en profase I',['Citocinesis mitótica','Duplicación del centrosoma','Transcripción del ADN'],'El crossing-over intercambia segmentos entre cromosomas homólogos y genera recombinación.']],
 ['Evolución','Media',()=>{let env=pick(['sequía prolongada','bajas temperaturas','presencia de un nuevo depredador']);return [`En una población existe variación heredable. Tras varias generaciones bajo ${env}, aumenta la frecuencia de un rasgo que mejora el éxito reproductivo. ¿Qué proceso describe mejor el cambio?`,'Selección natural',['Generación espontánea','Uso y desuso como única causa','Equilibrio químico'],'La selección natural cambia frecuencias de rasgos heredables asociados a mayor éxito reproductivo.']}],
 ['Ecología','Media',()=>[`En una cadena trófica, los productores almacenan 10 000 unidades de energía y el nivel siguiente dispone de mucho menos. ¿Cuál es la causa principal?`,'Parte de la energía se disipa como calor metabólico',['La energía se crea en los consumidores','La materia desaparece por completo','Los productores no respiran'],'Las transferencias tróficas son ineficientes y parte de la energía se disipa como calor.']],
 ['Fisiología humana','Media',()=>[`Después de una comida rica en carbohidratos aumenta la glicemia. ¿Qué respuesta contribuye a restablecerla?`,'Liberación de insulina',['Liberación exclusiva de adrenalina','Bloqueo de la captación celular de glucosa','Detención de la respiración celular'],'La insulina favorece captación y almacenamiento de glucosa, reduciendo la glicemia.']],
 ['Fisiología humana','Difícil',()=>[`Durante ejercicio intenso aumenta la ventilación pulmonar. ¿Qué variable sanguínea contribuye directamente a estimular este ajuste?`,'Aumento de CO₂ y cambios de pH',['Aumento de queratina','Disminución de ADN nuclear','Aumento de bilis'],'Quimiorreceptores detectan CO₂/pH y participan en el control de la ventilación.']],
 ['Inmunología','Media',()=>[`Una persona vacunada entra en contacto meses después con el mismo patógeno. ¿Qué permite una respuesta adaptativa más rápida?`,'Linfocitos de memoria',['Plaquetas','Eritrocitos maduros','Sales biliares'],'Las células de memoria generadas en la respuesta primaria aceleran y potencian respuestas posteriores.']],
 ['Método científico','Fácil',()=>{let factor=pick(['cantidad de luz','concentración de sal','temperatura']);return [`Un experimento modifica la ${factor} y mide el crecimiento de plantas, manteniendo constantes las demás condiciones. ¿Cuál es la variable independiente?`,factor.charAt(0).toUpperCase()+factor.slice(1),['Crecimiento medido','Número final de hojas como resultado','Todas las variables mantenidas constantes'],'La variable independiente es el factor manipulado deliberadamente.']}]
];
function bioQuestion(){let [skill,diff,fn]=pick(bioScenarios),[text,correct,dist,exp]=fn();return mcq(text,correct,dist,skill,diff,exp)}
const passageSeeds=[
 ['biblioteca comunitaria','Un barrio transformó una antigua bodega en biblioteca. El proyecto comenzó con donaciones de vecinos y luego incorporó talleres de lectura. La asistencia creció especialmente los fines de semana.','La asistencia aumentó especialmente los fines de semana.','La participación comunitaria puede ampliar el acceso a espacios culturales.'],
 ['huerto escolar','Un curso instaló un huerto para estudiar ciencias. Al principio varias plantas no prosperaron por exceso de riego. Después de registrar humedad y ajustar la frecuencia, la supervivencia de las plantas mejoró.','El exceso de riego afectó a las primeras plantas.','Registrar datos permitió modificar una práctica y mejorar los resultados.'],
 ['transporte público','Una comuna amplió la frecuencia de buses durante las horas punta. Una encuesta posterior mostró menor tiempo promedio de espera, aunque algunos sectores periféricos siguieron reportando demoras.','Algunos sectores periféricos mantuvieron demoras.','La mejora fue real, pero no benefició por igual a todos los sectores.'],
 ['ciencia ciudadana','Un grupo de estudiantes registró aves en una plaza durante tres meses. Comparó horarios y observó mayor diversidad temprano en la mañana. El equipo advirtió que sus datos describían esa plaza y ese periodo, no toda la ciudad.','La mayor diversidad se observó temprano en la mañana.','Los autores reconocen límites para generalizar sus resultados.'],
 ['consumo responsable','Una feria comenzó a ofrecer descuentos a quienes llevaran recipientes reutilizables. En dos meses disminuyó el uso de envases desechables, aunque el cambio fue mayor entre clientes frecuentes.','Disminuyó el uso de envases desechables.','Un incentivo puede modificar hábitos, pero su efecto puede variar entre grupos.']
];
function readingPack(){
 let [topic,base,detail,infer]=pick(passageSeeds),place=pick(['Durante abril','Durante un semestre','En una experiencia piloto','A lo largo de varias semanas']);
 let passage=`${place}, ${base}`;
 let q1=mcq(`Según el texto sobre ${topic}, ¿qué información se afirma explícitamente?`,detail,[infer,'El texto demuestra que el resultado ocurre siempre.','El proyecto fue suspendido antes de comenzar.'],'Localizar','Fácil',`La alternativa correcta recupera una información expresada de manera directa en el texto.`);
 let q2=mcq(`¿Cuál es una inferencia razonable a partir del texto sobre ${topic}?`,infer,[detail,'No es posible obtener ninguna conclusión del texto.','Todos los casos futuros tendrán exactamente el mismo resultado.'],'Interpretar','Media',`La inferencia integra los datos del texto sin ir más allá de la evidencia disponible.`);
 let q3=mcq(`¿Qué evaluación es más adecuada respecto del alcance de la información presentada?`,'Las conclusiones deben limitarse al contexto y evidencia descritos',['El texto permite generalizar sin restricciones','Una experiencia local prueba una ley universal','Los datos dejan de ser útiles si existen excepciones'],'Evaluar','Difícil',`Una evaluación crítica distingue lo que la evidencia respalda de generalizaciones que el texto no justifica.`);
 [q1,q2,q3].forEach(q=>q.context=passage); return {passage,questions:[q1,q2,q3]};
}

function simpleGenerated(testId){
  const pools={
    historia:[
      ['Historia: Chile siglo XIX','Una fuente del siglo XIX describe debates sobre constituciones y organizacion del poder. ¿Que habilidad es clave para interpretarla?','Contextualizar la fuente y considerar su autoria y proposito',['Aceptar literalmente todo lo escrito','Ignorar la fecha del documento','Suponer que representa a toda la sociedad'],'Media','Las fuentes historicas deben analizarse considerando contexto, autoria, proposito y alcance.'],
      ['Formacion ciudadana','¿Que principio democratico se expresa cuando distintas instituciones controlan el ejercicio del poder publico?','La existencia de contrapesos y separacion de poderes',['La concentracion absoluta del poder','La eliminacion de tribunales','La ausencia de reglas constitucionales'],'Facil','Los contrapesos reducen concentracion de poder y favorecen control institucional.'],
      ['Economia y sociedad','Si los precios generales aumentan sostenidamente y el ingreso nominal no cambia, el poder adquisitivo tiende a:','Disminuir',['Aumentar necesariamente','Permanecer siempre identico','Duplicarse automaticamente'],'Media','Con precios mas altos y el mismo ingreso nominal se pueden comprar menos bienes y servicios.'],
      ['Territorio y ambiente','¿Que medida es mas coherente con una politica preventiva frente a riesgos naturales?','Identificar amenazas, educar a la poblacion y planificar evacuaciones',['Esperar el desastre antes de actuar','Eliminar mapas de riesgo','Concentrar servicios criticos en zonas expuestas'],'Media','La gestion de riesgo preventiva combina conocimiento de amenazas, preparacion e infraestructura.']
    ],
    fisica:[
      ['Fisica electiva - Mecanica','Si la fuerza neta sobre un objeto se duplica y su masa permanece constante, su aceleracion:','Se duplica',['Se reduce a la mitad','No cambia','Se hace cero'],'Facil','Por F=ma, con masa constante la aceleracion es proporcional a la fuerza neta.'],
      ['Fisica electiva - Ondas','Una onda pasa a un medio donde disminuye su rapidez y mantiene su frecuencia. ¿Que ocurre con su longitud de onda?','Disminuye',['Aumenta','No puede determinarse','Se hace infinita'],'Media','Como v=f lambda, si v disminuye y f permanece constante, lambda disminuye.'],
      ['Fisica electiva - Electricidad','En un circuito simple, al aumentar la resistencia manteniendo el voltaje constante, la corriente:','Disminuye',['Aumenta','No cambia','Se vuelve negativa necesariamente'],'Media','La ley de Ohm I=V/R muestra que mayor resistencia implica menor corriente para voltaje fijo.'],
      ['Habilidades cientificas','Un grupo repite una medicion varias veces. ¿Que ventaja principal obtiene?','Puede estimar variabilidad y mejorar la confiabilidad',['Garantiza que toda medicion sea exacta','Elimina la necesidad de unidades','Prueba causalidad por si sola'],'Dificil','Las repeticiones permiten estimar dispersion, detectar valores atipicos y evaluar precision.']
    ],
    quimica:[
      ['Quimica electiva - Estequiometria','Una ecuacion balanceada indica una proporcion 1:2 entre A y B. Si reaccionan 3 mol de A, ¿cuantos mol de B se requieren?','6 mol',['1.5 mol','3 mol','9 mol'],'Facil','La relacion estequiometrica 1:2 implica duplicar los moles de A para obtener los requeridos de B.'],
      ['Quimica electiva - Soluciones','Se diluye una solucion agregando solvente sin cambiar los moles de soluto. ¿Que ocurre con su concentracion?','Disminuye',['Aumenta','No cambia','Se vuelve cero siempre'],'Media','Al aumentar el volumen manteniendo el soluto, disminuye la concentracion.'],
      ['Quimica electiva - Organica','¿Que caracteristica distingue a un hidrocarburo?','Esta formado solo por carbono e hidrogeno',['Contiene siempre nitrogeno','Es necesariamente ionico','No posee enlaces covalentes'],'Facil','Los hidrocarburos contienen exclusivamente atomos de carbono e hidrogeno.'],
      ['Habilidades cientificas','Si un resultado contradice la hipotesis, la accion cientificamente apropiada es:','Revisar la hipotesis a la luz de la evidencia',['Cambiar los datos','Ignorar el resultado','Conservar la hipotesis sin analisis'],'Dificil','Las hipotesis son provisionales y deben contrastarse con la evidencia disponible.']
    ],
    ciencias_tp:[
      ['Ciencias TP - Seguridad','¿Que accion corresponde antes de usar un equipo desconocido en un taller?','Revisar instrucciones, riesgos y elementos de proteccion',['Operarlo inmediatamente','Anular sus protecciones','Trabajar sin registrar condiciones'],'Facil','La prevencion exige identificar riesgos y controles antes de operar equipos.'],
      ['Ciencias TP - Medicion','¿Por que conviene calibrar un instrumento de medicion?','Para comparar sus lecturas con una referencia y reducir sesgos sistematicos',['Para cambiar la unidad al azar','Para aumentar siempre el valor medido','Para evitar toda repeticion'],'Media','La calibracion verifica la respuesta del instrumento frente a referencias conocidas.'],
      ['Ciencias TP - Electricidad aplicada','¿Que dispositivo esta disenado para interrumpir un circuito ante una sobrecorriente?','Un fusible o interruptor de proteccion',['Una regla','Un termometro','Un recipiente graduado'],'Media','Los dispositivos de proteccion abren el circuito cuando la corriente supera niveles seguros.'],
      ['Ciencias TP - Ambiente','La segregacion de residuos en origen permite:','Gestionar cada residuo segun su riesgo y posibilidad de recuperacion',['Mezclar residuos peligrosos y comunes','Eliminar toda trazabilidad','Evitar cualquier tratamiento'],'Dificil','Separar residuos mejora seguridad, trazabilidad, reciclaje y disposicion adecuada.']
    ]
  };
  const row=pick(pools[testId]||pools.historia),[skill,text,correct,wrong,diff,exp]=row;
  return mcq(text,correct,wrong,skill,diff,exp);
}

function generatedQuestions(testId,count){
 let out=[],readingTexts=[];
 if(testId==='m1'||testId==='m2') while(out.length<count) out.push(mathQuestion(testId));
 else if(testId==='biologia') while(out.length<count) out.push(bioQuestion());
 else if(['historia','fisica','quimica','ciencias_tp'].includes(testId)) while(out.length<count) out.push(simpleGenerated(testId));
 else {
   let n=1; while(out.length<count){let p=readingPack();readingTexts.push({n:n++,title:'Texto generado de práctica',body:p.passage}); for(const q of p.questions){if(out.length<count){q.passageIndex=n-1;out.push(q)}}}
 }
 return {questions:out,readingTexts};
}
function usedBank(){try{return JSON.parse(localStorage.getItem(`paesUsedBankV2_${window.PAES_PROFILE_SCOPE||'none'}`)||'{}')}catch{return {}}}
function saveUsed(x){localStorage.setItem(`paesUsedBankV2_${window.PAES_PROFILE_SCOPE||'none'}`,JSON.stringify(x))}
function bankSample(test,count){let used=usedBank(),ids=new Set(used[test.id]||[]),available=test.questions.filter(q=>!ids.has(String(q.n)));
 if(available.length<count){ids=new Set();available=[...test.questions]}
 let chosen=shuffle(available).slice(0,count); chosen.forEach(q=>ids.add(String(q.n))); used[test.id]=[...ids]; saveUsed(used);
 return chosen.map(q=>({...q,source:'Banco validado'}));
}
function createHybridExam(testId,generatedRatio=0.5){
 const base=window.PAES_DATA.find(t=>t.id===testId); if(!base) throw new Error('Prueba no encontrada');
 const total=base.questions.length, genCount=Math.max(1,Math.round(total*generatedRatio)), bankCount=total-genCount;
 const gen=generatedQuestions(testId,genCount), bank=bankSample(base,bankCount), questions=shuffle([...gen.questions,...bank]);
 // Mantiene la cantidad de preguntas puntuadas de la prueba base; el resto queda como piloto.
 questions.forEach((q,i)=>q.scored=i<base.scoredCount);
 return {...base,title:`${base.title} - Ensayo generado`,questions,readingTexts:base.readingTexts||[],generated:true,generatedCount:genCount,bankCount};
}
window.PAES_GENERATOR={createHybridExam,generatedQuestions};
})();
