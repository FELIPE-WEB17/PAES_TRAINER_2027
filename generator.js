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

function generatedQuestionsBase(testId,count){
 let out=[],readingTexts=[];
 if(testId==='m1'||testId==='m2') while(out.length<count) out.push(mathQuestion(testId));
 else if(testId==='biologia') while(out.length<count) out.push(bioQuestion());
 else if(['historia','fisica','quimica','ciencias_tp'].includes(testId)) while(out.length<count) out.push(simpleGenerated(testId));
 else {
   let n=1; while(out.length<count){let p=readingPack();readingTexts.push({n:n++,title:'Texto generado de práctica',body:p.passage}); for(const q of p.questions){if(out.length<count){q.passageIndex=n-1;out.push(q)}}}
 }
 return {questions:out,readingTexts};
}

// ===== V3.2: generador diverso, orientado a habilidades PAES/DEMRE =====
function richQ(text,correct,wrong,skill,diff,exp,family,demreSkill='Resolver problemas'){
  const q=mcq(text,correct,wrong,skill,diff,exp,'Generada · marco DEMRE');
  q.family=family; q.demreSkill=demreSkill; q.demreAligned=true;
  return q;
}
function bioRich(i){
  const f=i%16;
  if(f===0){const org=pick([['Aparato de Golgi','modificar y empaquetar proteínas para secreción'],['Mitocondria','producir ATP mediante respiración aeróbica'],['Ribosoma','sintetizar proteínas'],['Núcleo','almacenar la mayor parte del ADN celular'],['Lisosoma','degradar macromoléculas y organelos dañados']]);return richQ(`En una célula eucarionte se necesita ${org[1]}. ¿Qué estructura participa más directamente en esa función?`,org[0],['Membrana plasmática','Centríolo','Vacuola'], 'Organización celular','Media',`La función descrita corresponde principalmente a ${org[0]}.`,'bio-organelos','Analizar evidencia');}
  if(f===1){const inside=pick([0.2,0.3,0.4]),outside=inside+pick([0.2,0.3]);return richQ(`Una célula con una concentración efectiva de solutos de ${inside.toFixed(1)} unidades se coloca en un medio de ${outside.toFixed(1)} unidades. Si la membrana es permeable al agua, ¿qué movimiento neto se espera inicialmente?`,'El agua sale de la célula',['El agua entra a la célula','No existe movimiento de agua','Los solutos atraviesan necesariamente la membrana'],'Organización celular','Media','Por ósmosis, el agua se desplaza hacia el medio con mayor concentración efectiva de solutos.','bio-osmosis','Modelar');}
  if(f===2){const temp=pick([50,55,60,65]);return richQ(`Una enzima humana presenta máxima actividad cerca de 37 °C, pero al incubarla a ${temp} °C su actividad disminuye de forma marcada. ¿Cuál es la explicación más adecuada?`,'La proteína puede perder su conformación funcional',['Se duplica el número de genes','La enzima se transforma en carbohidrato','El sustrato deja de existir por definición'],'Metabolismo celular','Media','Temperaturas elevadas pueden alterar la estructura tridimensional de una enzima y su sitio activo.','bio-enzimas','Explicar fenómenos');}
  if(f===3){const factor=pick(['intensidad lumínica','concentración de CO₂','temperatura']);return richQ(`Se cultivan plantas idénticas y se modifica solo la ${factor}, manteniendo constantes las demás condiciones. Se mide la tasa de fotosíntesis. ¿Cuál es la variable independiente?`,factor,['La tasa de fotosíntesis','La masa final de todas las plantas','El tiempo, en todos los diseños'],'Habilidades científicas','Fácil',`La variable independiente es el factor que el experimento modifica deliberadamente: ${factor}.`,'bio-experimento','Planificar investigaciones');}
  if(f===4){const n=pick([8,10,12,14]);return richQ(`Una especie presenta células somáticas con ${2*n} cromosomas. ¿Cuántos cromosomas se espera encontrar normalmente en un gameto de esa especie?`,n,[2*n,n*2+2,Math.max(1,n-2)],'Genética','Media',`La meiosis reduce a la mitad el número cromosómico: de ${2*n} a ${n}.`,'bio-meiosis','Resolver problemas');}
  if(f===5){const dom=pick(['semillas lisas','pelaje oscuro','flores violetas']);return richQ(`Para un carácter con dominancia completa, dos individuos heterocigotos (Aa × Aa) se cruzan. ¿Cuál es la probabilidad de obtener descendencia con fenotipo recesivo?`,'1/4',['1/2','3/4','1'],'Genética','Media','El cruce Aa × Aa produce AA, Aa, Aa y aa; solo aa expresa el fenotipo recesivo.','bio-mendel','Representar');}
  if(f===6){const env=pick(['una sequía prolongada','un aumento sostenido de depredadores','un descenso de temperatura']);return richQ(`En una población existe variación heredable. Después de varias generaciones bajo ${env}, aumenta la frecuencia de un rasgo que mejora la supervivencia y reproducción. ¿Qué mecanismo explica mejor el cambio?`,'Selección natural',['Uso y desuso como única causa','Generación espontánea','Mutaciones dirigidas por necesidad'],'Evolución','Media','La selección natural favorece variantes heredables asociadas a mayor éxito reproductivo en ese ambiente.','bio-seleccion','Explicar fenómenos');}
  if(f===7){const energy=pick([5000,8000,10000,12000]),pctE=pick([8,10,12]);const ans=Math.round(energy*pctE/100);return richQ(`Un nivel trófico dispone de ${energy} unidades de energía y cerca del ${pctE}% pasa al nivel siguiente. ¿Cuánta energía aproximada recibiría ese nivel?`,ans,[energy-ans,energy+ans,pctE],'Ecología','Media',`${pctE}% de ${energy} = ${energy}×${pctE}/100 ≈ ${ans}.`,'bio-energia','Resolver problemas');}
  if(f===8){return richQ('Después de una comida rica en carbohidratos aumenta la glicemia. ¿Qué respuesta hormonal contribuye directamente a disminuirla?','Aumento de la secreción de insulina',['Aumento exclusivo de glucagón','Bloqueo de entrada de glucosa a las células','Detención de la respiración celular'],'Fisiología humana','Media','La insulina favorece la captación y almacenamiento de glucosa, ayudando a reducir la glicemia.','bio-homeostasis','Explicar fenómenos');}
  if(f===9){return richQ('Una persona vacunada entra en contacto meses después con el mismo patógeno. ¿Qué componente explica una respuesta adaptativa más rápida?','Linfocitos de memoria',['Eritrocitos','Plaquetas','Sales biliares'],'Inmunología','Media','Las células de memoria generadas en la respuesta primaria permiten una respuesta secundaria más rápida y eficaz.','bio-inmunidad','Analizar evidencia');}
  if(f===10){const organ=pick(['riñón','pulmón','piel']);return richQ(`Al estudiar la homeostasis, se analiza la función del ${organ}. ¿Qué idea describe mejor un mecanismo homeostático?`,'Regular una variable interna mediante respuestas que compensan sus cambios',['Mantener todas las variables exactamente constantes','Eliminar toda variación del ambiente','Aumentar cualquier variable sin retroalimentación'],'Fisiología humana','Media','La homeostasis mantiene variables dentro de rangos funcionales mediante mecanismos de regulación y retroalimentación.','bio-homeostasis2','Explicar fenómenos');}
  if(f===11){const drug=pick(['antibiótico A','antibiótico B','desinfectante C']);return richQ(`En placas bacterianas se prueban distintas concentraciones de ${drug}. A mayor concentración se observa una zona de inhibición mayor. ¿Qué conclusión está mejor respaldada?`,'En las condiciones del experimento, una mayor concentración se asoció con mayor inhibición',['El producto elimina todas las bacterias en cualquier contexto','La concentración no influye','El experimento prueba efectos en seres humanos'],'Habilidades científicas','Difícil','La conclusión debe limitarse a la asociación observada y a las condiciones experimentales descritas.','bio-evidencia','Evaluar evidencia');}
  if(f===12){return richQ('Durante la replicación del ADN ocurre una sustitución de una base. ¿Qué afirmación es más adecuada?','Puede originar una mutación y su efecto dependerá de dónde ocurra',['Siempre cambia el fenotipo','Siempre es letal','Nunca afecta la información genética'],'Genética','Difícil','Una sustitución es una mutación puntual; sus consecuencias dependen de la región y del cambio producido.','bio-mutacion','Argumentar');}
  if(f===13){const rate=pick([20,30,40]);return richQ(`En un ecosistema, una población aumenta rápidamente al inicio y luego su crecimiento se desacelera cerca de ${rate} mil individuos. ¿Qué concepto ayuda a explicar la estabilización?`,'Capacidad de carga del ambiente',['Generación espontánea','Ausencia total de competencia','Crecimiento ilimitado obligatorio'],'Ecología','Media','La capacidad de carga corresponde al tamaño poblacional que el ambiente puede sostener de manera aproximada dadas sus limitaciones.','bio-poblaciones','Modelar');}
  if(f===14){return richQ('Un estudiante compara dos grupos de plantas, pero además de cambiar la luz también cambia el tipo de suelo. ¿Cuál es el principal problema del diseño?','Hay más de una variable cambiando y se dificulta atribuir el efecto a la luz',['Faltan nombres para las plantas','Toda comparación requiere solo una planta','La variable dependiente debe ser siempre la temperatura'],'Habilidades científicas','Media','Si cambian simultáneamente luz y suelo, aparece una variable de confusión que dificulta interpretar causalmente el resultado.','bio-diseno','Planificar investigaciones');}
  return richQ('En una investigación se observa una diferencia entre dos grupos, pero las muestras son pequeñas y muy variables. ¿Qué acción fortalecería la conclusión?','Aumentar el tamaño muestral y repetir mediciones',['Eliminar los datos que no coinciden','Cambiar la hipótesis después de ver cada dato','Generalizar de inmediato a toda la población'],'Habilidades científicas','Difícil','Más observaciones y repeticiones permiten estimar mejor la variabilidad y la estabilidad del resultado.','bio-confiabilidad','Evaluar evidencia');
}
function physicsRich(i){
  const f=i%14;
  if(f===0){const m=pick([2,3,4,5]),a=pick([2,3,4,5]),F=m*a;return richQ(`Un objeto de ${m} kg experimenta una fuerza neta constante de ${F} N. ¿Cuál es su aceleración?`,a,[F,m,F+m],'Física - Mecánica','Fácil',`Por F=ma, a=F/m=${F}/${m}=${a} m/s².`,'fis-fma','Resolver problemas');}
  if(f===1){const v=pick([5,8,10,12]),t=pick([3,4,5,6]),d=v*t;return richQ(`Un móvil se desplaza con rapidez constante de ${v} m/s durante ${t} s. ¿Qué distancia recorre?`,d,[v+t,Math.abs(d-v),t],'Física - Mecánica','Fácil',`d=v·t=${v}·${t}=${d} m.`,'fis-mru','Resolver problemas');}
  if(f===2){const m=pick([1,2,3]),h=pick([2,4,5]),g=10,ans=m*g*h;return richQ(`Se eleva una masa de ${m} kg hasta ${h} m. Usando g≈10 m/s², ¿cuál es el aumento aproximado de energía potencial gravitatoria?`,ans,[m*h,g*h,ans+10],'Física - Energía','Media',`ΔEp=mgh=${m}·${g}·${h}=${ans} J.`,'fis-energia','Resolver problemas');}
  if(f===3){const f0=pick([2,4,5]),lam=pick([2,3,4]),v=f0*lam;return richQ(`Una onda tiene frecuencia ${f0} Hz y longitud de onda ${lam} m. ¿Cuál es su rapidez de propagación?`,v,[f0+lam,lam/f0,f0/lam],'Física - Ondas','Media',`v=fλ=${f0}·${lam}=${v} m/s.`,'fis-ondas','Resolver problemas');}
  if(f===4){const V=pick([6,9,12,18]),R=pick([2,3,6]);const I=V/R;return richQ(`En un circuito, una resistencia de ${R} Ω está conectada a ${V} V. ¿Qué corriente circula?`,I,[V*R,R/V,V+R],'Física - Electricidad','Media',`I=V/R=${V}/${R}=${I} A.`,'fis-ohm','Resolver problemas');}
  if(f===5){return richQ('Un rayo de luz pasa del aire a un medio donde su rapidez es menor. ¿Qué fenómeno puede acompañar el cambio de dirección?','Refracción',['Difracción por definición','Inducción electromagnética','Desintegración nuclear'],'Física - Óptica','Fácil','La refracción corresponde al cambio de dirección asociado al cambio de rapidez al pasar entre medios.','fis-optica','Explicar fenómenos');}
  if(f===6){return richQ('Dos objetos a distinta temperatura se ponen en contacto térmico en un sistema aislado. ¿Qué se espera con el tiempo?','Transferencia de energía desde el más caliente al más frío hasta acercarse al equilibrio térmico',['El frío fluye como sustancia','Ambos aumentan su temperatura indefinidamente','No ocurre transferencia alguna'],'Física - Termodinámica','Media','El calor es transferencia de energía debida a una diferencia de temperatura y ocurre espontáneamente del cuerpo más caliente al más frío.','fis-termica','Explicar fenómenos');}
  if(f===7){const p=pick([2,3,4]),q=pick([3,4,5]);return richQ(`Dos mediciones de una misma magnitud son ${p}.0 y ${q}.0 unidades. Para evaluar la precisión del procedimiento, ¿qué conviene hacer?`,'Repetir más mediciones y analizar su dispersión',['Escoger solo el valor mayor','Cambiar la unidad hasta que coincidan','Eliminar la medición menor'],'Habilidades científicas','Media','La repetición y el análisis de dispersión ayudan a evaluar la precisión y variabilidad.','fis-medicion','Evaluar evidencia');}
  if(f===8){const p=pick([20,30,40]),t=pick([2,3,4]),e=p*t;return richQ(`Un dispositivo opera con potencia constante de ${p} W durante ${t} s. ¿Qué energía transfiere?`,e,[p+t,p/t,t/p],'Física - Energía','Media',`E=P·t=${p}·${t}=${e} J.`,'fis-potencia','Resolver problemas');}
  if(f===9){return richQ('En un gráfico posición-tiempo, un tramo recto con pendiente constante y positiva representa:','Movimiento con velocidad constante positiva',['Aceleración necesariamente creciente','Reposo absoluto','Velocidad negativa'],'Física - Mecánica','Media','En un gráfico posición-tiempo, la pendiente representa la velocidad. Una pendiente positiva constante implica velocidad positiva constante.','fis-grafico','Representar');}
  if(f===10){return richQ('Un experimento busca estudiar cómo cambia la corriente al variar el voltaje en una resistencia. ¿Qué variable debería mantenerse controlada?','La resistencia utilizada',['El voltaje','La corriente medida','El número de datos, que debe ser uno'],'Habilidades científicas','Media','Para aislar el efecto del voltaje sobre la corriente, la resistencia debe mantenerse constante.','fis-diseno','Planificar investigaciones');}
  if(f===11){return richQ('Si la rapidez de una onda disminuye al pasar a otro medio y la frecuencia se mantiene, ¿qué ocurre con su longitud de onda?','Disminuye',['Aumenta','Permanece necesariamente igual','Se hace cero'],'Física - Ondas','Media','Como v=fλ, con frecuencia constante una menor rapidez implica menor longitud de onda.','fis-lambda','Modelar');}
  if(f===12){return richQ('Dos resistencias iguales se conectan en serie. Comparada con una sola resistencia, la resistencia equivalente es:','El doble',['La mitad','La misma','Cero'],'Física - Electricidad','Fácil','En serie, las resistencias se suman: R_eq=R+R=2R.','fis-serie','Resolver problemas');}
  return richQ('Un resultado experimental no coincide con la predicción inicial. ¿Cuál es la acción científicamente más adecuada?','Revisar la hipótesis y el procedimiento a la luz de la evidencia',['Modificar los datos para que coincidan','Descartar automáticamente el experimento','Mantener la explicación sin analizar el resultado'],'Habilidades científicas','Difícil','Las explicaciones científicas deben contrastarse con la evidencia y pueden revisarse.','fis-evidencia','Evaluar evidencia');
}
function chemRich(i){
  const f=i%14;
  if(f===0){const a=pick([2,3,4]),ratio=pick([2,3]),b=a*ratio;return richQ(`Una ecuación química balanceada indica una relación molar 1:${ratio} entre A y B. Si reaccionan ${a} mol de A, ¿cuántos mol de B se requieren?`,b,[a,b-a,a+ratio],'Química - Estequiometría','Fácil',`La proporción 1:${ratio} implica ${a}×${ratio}=${b} mol de B.`,'qui-esteq','Resolver problemas');}
  if(f===1){const n=pick([1,2,3]),V=pick([2,4,5]),c=n/V;return richQ(`Una solución contiene ${n} mol de soluto en ${V} L. ¿Cuál es su concentración molar?`,c,[n*V,V/n,n+V],'Química - Soluciones','Media',`M=n/V=${n}/${V}=${c} mol/L.`,'qui-molaridad','Resolver problemas');}
  if(f===2){return richQ('Se agrega solvente a una solución sin cambiar la cantidad de soluto. ¿Qué ocurre con su concentración?','Disminuye',['Aumenta','Permanece siempre igual','Se vuelve necesariamente cero'],'Química - Soluciones','Fácil','Al aumentar el volumen y mantener los moles de soluto, la concentración disminuye.','qui-dilucion','Explicar fenómenos');}
  if(f===3){return richQ('¿Qué propiedad periódica tiende, en términos generales, a aumentar hacia la derecha de un período?','Electronegatividad',['Radio atómico','Número de niveles electrónicos','Carácter metálico'],'Química - Estructura atómica','Media','A lo largo de un período suele aumentar la carga nuclear efectiva, favoreciendo una mayor electronegatividad.','qui-periodica','Interpretar modelos');}
  if(f===4){return richQ('Dos átomos comparten pares de electrones para alcanzar configuraciones más estables. ¿Qué tipo de enlace describe mejor la situación?','Covalente',['Iónico necesariamente','Metálico','Nuclear'],'Química - Enlace químico','Fácil','El enlace covalente se caracteriza por compartir pares de electrones.','qui-enlace','Explicar fenómenos');}
  if(f===5){const ph=pick([2,3,4]);return richQ(`Una solución acuosa tiene pH ${ph}. ¿Cómo se clasifica?`,'Ácida',['Básica','Neutra','No acuosa'],'Química - Ácido-base','Fácil','Un pH menor que 7 corresponde a una solución ácida en condiciones habituales.','qui-ph','Resolver problemas');}
  if(f===6){return richQ('En una reacción redox, una especie pierde electrones. ¿Qué proceso experimenta?','Oxidación',['Reducción','Neutralización obligatoria','Precipitación por definición'],'Química - Redox','Media','Oxidación corresponde a pérdida de electrones; reducción, a ganancia.','qui-redox','Explicar fenómenos');}
  if(f===7){return richQ('¿Qué característica define a un hidrocarburo?','Está compuesto solo por carbono e hidrógeno',['Contiene siempre oxígeno','Es necesariamente iónico','No presenta enlaces covalentes'],'Química - Orgánica','Fácil','Los hidrocarburos contienen exclusivamente carbono e hidrógeno.','qui-organica','Reconocer');}
  if(f===8){const mass=pick([10,20,25]),vol=pick([50,100,200]);return richQ(`Se disuelven ${mass} g de soluto y se prepara un volumen final de ${vol} mL. ¿Qué dato adicional sería necesario para calcular la molaridad?`,'La masa molar del soluto',['El color de la solución','La forma del recipiente','La temperatura ambiente siempre'],'Química - Soluciones','Media','Para convertir masa a moles se necesita la masa molar; luego se divide por el volumen en litros.','qui-datos','Modelar');}
  if(f===9){return richQ('En un sistema cerrado, la masa total medida antes y después de una reacción química se mantiene aproximadamente constante. ¿Qué principio respalda esta observación?','Conservación de la masa',['Conservación de la velocidad','Ley de gravitación universal','Principio de incertidumbre'],'Química - Reacciones','Fácil','En una reacción química ordinaria la materia se reorganiza; la masa total del sistema cerrado se conserva aproximadamente.','qui-masa','Explicar fenómenos');}
  if(f===10){return richQ('Un experimento compara la rapidez de reacción a distintas temperaturas, manteniendo constantes concentración y cantidad de reactivos. ¿Cuál es la variable independiente?','La temperatura',['La rapidez de reacción','La cantidad de producto final en todos los casos','El tiempo medido, necesariamente'],'Habilidades científicas','Media','La variable independiente es la que se modifica deliberadamente: la temperatura.','qui-diseno','Planificar investigaciones');}
  if(f===11){return richQ('Una sustancia conduce electricidad en solución acuosa porque forma iones móviles. ¿Qué tipo de comportamiento describe mejor?','Electrolítico',['Radiactivo por definición','Óptico exclusivamente','No conductivo'],'Química - Soluciones','Media','Los electrolitos forman iones móviles en solución, lo que permite conducción eléctrica.','qui-electrolito','Explicar fenómenos');}
  if(f===12){return richQ('En una reacción reversible en equilibrio se aumenta la concentración de un reactivo. ¿Qué idea permite predecir la respuesta del sistema?','Principio de Le Châtelier',['Ley de Ohm','Segunda ley de Newton','Selección natural'],'Química - Equilibrio','Difícil','El principio de Le Châtelier permite analizar cómo un sistema en equilibrio responde a perturbaciones.','qui-equilibrio','Argumentar');}
  return richQ('Un conjunto de mediciones presenta un valor muy distinto de los demás. ¿Qué acción es más adecuada antes de eliminarlo?','Revisar el procedimiento y justificar con evidencia si es un valor atípico',['Borrarlo automáticamente','Cambiarlo por el promedio sin registrar','Repetir solo hasta obtener el valor esperado'],'Habilidades científicas','Difícil','Un dato atípico debe investigarse y cualquier exclusión debe estar justificada y documentada.','qui-evidencia','Evaluar evidencia');
}
function historyRich(i){
  const f=i%14;
  const source=pick(['una carta','un discurso','una estadística','un afiche','una ley','una fotografía']);
  if(f===0)return richQ(`Al analizar ${source} producida en un contexto histórico específico, ¿qué acción fortalece su interpretación?`,'Identificar autoría, propósito, fecha y contexto',['Tomarla como descripción neutral de toda la sociedad','Ignorar quién la produjo','Suponer que no tiene perspectiva'],'Análisis de fuentes','Media','La contextualización permite evaluar perspectiva, propósito, alcance y limitaciones de una fuente.','his-fuentes','Analizar fuentes');
  if(f===1)return richQ('Dos fuentes describen de manera diferente un mismo proceso histórico. ¿Qué estrategia es más adecuada?','Comparar sus contextos, propósitos y evidencias',['Elegir la más extensa sin analizarla','Descartar ambas por discrepar','Asumir que solo una fuente puede aportar información'],'Análisis de fuentes','Difícil','Las discrepancias entre fuentes pueden analizarse considerando contexto, perspectiva y evidencia.','his-contraste','Pensamiento crítico');
  if(f===2)return richQ('¿Qué principio democrático busca evitar la concentración del poder estatal en una sola autoridad?','Separación de poderes y contrapesos',['Supresión de tribunales','Eliminación de elecciones','Concentración de funciones'],'Formación ciudadana','Fácil','La separación de poderes distribuye funciones y crea mecanismos de control recíproco.','his-democracia','Comprender instituciones');
  if(f===3)return richQ('Una ciudadanía participa mediante elecciones, organizaciones y deliberación pública. ¿Qué dimensión democrática refleja principalmente?','Participación ciudadana',['Aislamiento político','Ausencia de derechos','Supresión de representación'],'Formación ciudadana','Media','La democracia incluye mecanismos de participación y deliberación además de la elección de autoridades.','his-participacion','Aplicar conceptos');
  if(f===4)return richQ('Si el nivel general de precios aumenta sostenidamente y el ingreso nominal de una persona no cambia, ¿qué tiende a ocurrir con su poder adquisitivo?','Disminuye',['Aumenta necesariamente','Permanece idéntico por definición','Se duplica'],'Economía y sociedad','Media','Con los mismos ingresos y precios más altos, se puede comprar una menor cantidad de bienes y servicios.','his-inflacion','Resolver problemas');
  if(f===5)return richQ('Cuando aumenta la demanda de un bien y la oferta permanece constante, ¿qué presión suele generarse sobre su precio?','Al alza',['A la baja necesariamente','Ninguna en cualquier situación','A cero'],'Economía y sociedad','Media','Con mayor demanda y oferta constante, suele existir presión para que el precio de equilibrio aumente.','his-mercado','Modelar');
  if(f===6)return richQ('Una ciudad crece rápidamente hacia zonas expuestas a inundaciones. ¿Qué política es más coherente con una gestión preventiva del riesgo?','Planificar el uso de suelo considerando mapas de amenaza y evacuación',['Construir sin considerar amenazas','Eliminar información de riesgo','Concentrar servicios críticos en las zonas más expuestas'],'Territorio y ambiente','Media','La prevención integra planificación territorial, información de amenazas y preparación de la población.','his-territorio','Aplicar conceptos');
  if(f===7)return richQ('La expansión de ferrocarriles y puertos en el siglo XIX chileno se relacionó, entre otros factores, con:','La articulación de mercados y actividades exportadoras',['La desaparición total del comercio exterior','El fin inmediato de las ciudades','La eliminación de toda migración interna'],'Historia de Chile siglo XIX','Media','La infraestructura de transporte favoreció la conexión de territorios, mercados y circuitos exportadores.','his-xix','Comprender procesos');
  if(f===8)return richQ('Para establecer una relación causal en Historia, ¿qué práctica es más adecuada?','Examinar múltiples factores y evidencias, distinguiendo causas de condiciones y consecuencias',['Atribuir todo a una sola causa sin evidencia','Confundir sucesión temporal con causalidad automática','Evitar comparar fuentes'],'Pensamiento histórico','Difícil','Los procesos históricos suelen ser multicausales y requieren argumentación apoyada en evidencia.','his-causalidad','Pensamiento crítico');
  if(f===9)return richQ('Un gráfico muestra un aumento sostenido de población urbana durante varias décadas. ¿Qué afirmación es metodológicamente correcta?','El gráfico evidencia una tendencia de urbanización, pero no explica por sí solo todas sus causas',['El gráfico demuestra una única causa','La tendencia permite predecir con certeza cualquier año futuro','Los datos cuantitativos no requieren contexto'],'Análisis de fuentes','Media','Los datos permiten describir tendencias, pero explicar causas requiere contexto y otras evidencias.','his-grafico','Analizar fuentes');
  if(f===10)return richQ('¿Qué característica se asocia al Estado de derecho?','Autoridades y ciudadanía están sujetas a normas e instituciones',['Las autoridades están por sobre la ley','No existen tribunales independientes','Los derechos dependen solo de decisiones privadas'],'Formación ciudadana','Fácil','El Estado de derecho supone sujeción al orden jurídico y mecanismos institucionales de protección y control.','his-derecho','Comprender instituciones');
  if(f===11)return richQ('Una política pública tiene efectos distintos entre regiones. ¿Qué información sería más útil para evaluarla?','Datos comparables por territorio antes y después de su implementación',['Solo una opinión sin contexto','Un único dato nacional sin desglose','Eliminar los resultados menos favorables'],'Formación ciudadana','Difícil','La evaluación requiere evidencia pertinente y comparable para analizar resultados y diferencias territoriales.','his-politica','Evaluar evidencia');
  if(f===12)return richQ('En un mapa temático, colores más intensos representan mayor concentración de una variable. ¿Qué habilidad se usa al comparar regiones?','Interpretar información espacial y patrones territoriales',['Memorizar solo nombres','Ignorar la leyenda','Suponer que todos los territorios son equivalentes'],'Territorio y ambiente','Media','La lectura cartográfica requiere usar leyenda, escala y distribución espacial para comparar patrones.','his-mapa','Pensamiento espacial');
  return richQ('Una afirmación histórica se apoya en una sola fuente de autoría desconocida. ¿Qué evaluación es más adecuada?','La evidencia es insuficiente y conviene contrastarla con otras fuentes',['La afirmación queda probada definitivamente','La autoría nunca importa','Toda fuente aislada representa a toda la sociedad'],'Análisis de fuentes','Difícil','La confiabilidad de una interpretación aumenta al contextualizar y contrastar evidencias diversas.','his-evidencia','Pensamiento crítico');
}
function tpRich(i){
  const f=i%12;
  if(f===0)return richQ('Antes de operar una máquina desconocida en un taller, ¿qué acción corresponde primero?','Revisar instrucciones, riesgos y elementos de protección',['Operarla para aprender por ensayo y error','Desactivar sus protecciones','Trabajar sin registrar condiciones'],'Ciencias TP - Seguridad','Fácil','La prevención comienza identificando peligros, controles y procedimientos seguros.','tp-seguridad','Aplicar protocolos');
  if(f===1)return richQ('¿Cuál es el propósito principal de calibrar un instrumento de medición?','Comparar su respuesta con una referencia conocida',['Aumentar siempre el valor medido','Cambiar arbitrariamente la unidad','Evitar repetir mediciones'],'Ciencias TP - Medición','Media','La calibración permite detectar y controlar desviaciones sistemáticas respecto de una referencia.','tp-calibracion','Evaluar mediciones');
  if(f===2)return richQ('Un fusible en un circuito eléctrico está diseñado principalmente para:','Interrumpir el circuito ante una corriente excesiva',['Aumentar el voltaje','Medir temperatura','Almacenar combustible'],'Ciencias TP - Electricidad','Fácil','El fusible protege el circuito al abrirse cuando la corriente supera un valor seguro.','tp-fusible','Aplicar conceptos');
  if(f===3)return richQ('Separar residuos peligrosos de residuos comunes en el lugar donde se generan permite:','Gestionarlos según su riesgo y tratamiento correspondiente',['Eliminar toda trazabilidad','Mezclar sustancias incompatibles','Evitar cualquier tratamiento posterior'],'Ciencias TP - Ambiente','Media','La segregación en origen mejora seguridad, trazabilidad y gestión adecuada de residuos.','tp-residuos','Aplicar protocolos');
  if(f===4){const V=pick([12,24,48]),I=pick([1,2,3]),P=V*I;return richQ(`Un equipo funciona a ${V} V y consume ${I} A. ¿Cuál es su potencia eléctrica aproximada?`,P,[V+I,V/I,I/V],'Ciencias TP - Electricidad','Media',`P=V·I=${V}·${I}=${P} W.`,'tp-potencia','Resolver problemas');}
  if(f===5)return richQ('En un procedimiento técnico se registran tres mediciones muy distintas entre sí. ¿Qué conviene hacer antes de informar el resultado?','Revisar instrumento, procedimiento y repetir mediciones',['Promediarlas sin revisar nada','Elegir solo la mayor','Eliminar cualquier dato diferente'],'Ciencias TP - Medición','Media','Una alta dispersión puede indicar problemas de procedimiento o medición y debe investigarse.','tp-medicion','Evaluar evidencia');
  if(f===6)return richQ('¿Qué práctica reduce el riesgo al manipular una sustancia química desconocida?','Consultar su ficha de seguridad y usar protección adecuada',['Olerla directamente','Mezclarla con otra sustancia al azar','Usarla sin etiquetado'],'Ciencias TP - Seguridad','Fácil','La ficha de seguridad informa peligros, controles, almacenamiento y respuesta ante emergencias.','tp-quimica','Aplicar protocolos');
  if(f===7)return richQ('Una pieza metálica se calienta durante una operación mecánica. ¿Qué medida preventiva es más adecuada?','Controlar temperatura y usar protección según el riesgo',['Tocar inmediatamente para comprobar','Eliminar ventilación','Ignorar el calentamiento si la pieza funciona'],'Ciencias TP - Seguridad','Media','El control térmico y los EPP adecuados reducen riesgos de quemaduras y fallas.','tp-termica','Aplicar protocolos');
  if(f===8)return richQ('Para comparar el rendimiento de dos equipos, ¿qué diseño es más válido?','Operarlos bajo condiciones equivalentes y medir la misma variable',['Usar condiciones distintas para cada uno','Comparar solo impresiones personales','Medir variables diferentes'],'Ciencias TP - Investigación','Media','Una comparación válida requiere condiciones controladas y medidas equivalentes.','tp-comparacion','Planificar investigaciones');
  if(f===9)return richQ('Una instalación presenta consumo eléctrico mayor al esperado. ¿Qué dato sería útil revisar primero?','Potencia de los equipos y horas de funcionamiento',['Color de los cables solamente','Nombre del operador','Número de ventanas'],'Ciencias TP - Energía','Media','El consumo energético depende de la potencia y del tiempo de uso de los equipos.','tp-energia','Modelar');
  if(f===10)return richQ('Un procedimiento escrito se modifica después de detectar un riesgo no considerado. ¿Qué principio refleja esta decisión?','Mejora continua basada en evidencia y prevención',['Ocultar incidentes','Mantener siempre el procedimiento original','Eliminar registros'],'Ciencias TP - Gestión','Media','Los procedimientos deben revisarse cuando la evidencia muestra oportunidades de mejora o riesgos.','tp-mejora','Evaluar evidencia');
  return richQ('Un sensor entrega valores estables pero sistemáticamente 5 unidades por encima de una referencia. ¿Qué tipo de problema sugiere?','Un sesgo sistemático de medición',['Variación aleatoria exclusivamente','Ausencia total de error','Cambio de unidad correcto'],'Ciencias TP - Medición','Difícil','Una desviación consistente respecto de una referencia sugiere un error o sesgo sistemático.','tp-sesgo','Evaluar mediciones');
}
function uniqueBatch(factory,count){
 const out=[],seen=new Set();let tries=0;
 const frames=[
  'En una situación de análisis PAES, ',
  'Considera ahora este caso: ',
  'Durante una actividad de preparación, ',
  'A partir de la siguiente situación, ',
  'En un contexto aplicado, ',
  'Para resolver un problema nuevo, ',
  'En una experiencia distinta, ',
  'Al analizar un caso semejante, '
 ];
 while(out.length<count&&tries<count*160){
  let q=factory(tries), variant=Math.floor(tries/Math.max(1,16));tries++;
  let k=q.text.toLowerCase().replace(/\s+/g,' ').trim();
  if(seen.has(k)){
    // No basta con barajar alternativas: cambia el contexto de lectura del mismo concepto.
    const frame=frames[variant%frames.length];
    q={...q,text:`${frame}${q.text.charAt(0).toLowerCase()+q.text.slice(1)}`,id:q.id+'-v'+variant,source:'Generada · variante contextual'};
    k=q.text.toLowerCase().replace(/\s+/g,' ').trim();
  }
  if(seen.has(k))continue;seen.add(k);out.push(q);
 }
 return out;
}
function generatedQuestions(testId,count){
  if(testId==='biologia')return {questions:uniqueBatch(bioRich,count),readingTexts:[]};
  if(testId==='fisica')return {questions:uniqueBatch(physicsRich,count),readingTexts:[]};
  if(testId==='quimica')return {questions:uniqueBatch(chemRich,count),readingTexts:[]};
  if(testId==='historia')return {questions:uniqueBatch(historyRich,count),readingTexts:[]};
  if(testId==='ciencias_tp')return {questions:uniqueBatch(tpRich,count),readingTexts:[]};
  // Para Matemática y Lectora reintenta hasta evitar enunciados idénticos dentro de una sesión.
  const out=[],seen=new Set(),readingTexts=[];let tries=0;
  while(out.length<count&&tries<count*60){tries++;const pack=generatedQuestionsBase(testId,Math.max(3,Math.min(12,count-out.length)));(pack.readingTexts||[]).forEach(x=>readingTexts.push(x));for(const q of pack.questions||[]){const k=q.text.toLowerCase().replace(/\s+/g,' ').trim();if(seen.has(k))continue;seen.add(k);out.push(q);if(out.length>=count)break;}}
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
