// PAES Trainer - Pedagogia V2: explicaciones breves, pistas progresivas y videos DEMRE.
// Las preguntas son originales de PAES Trainer; DEMRE se usa como referencia de temarios, habilidades y formato.
const PAES_PEDAGOGY_VERSION='2026-08-18';
const DEMRE_VIDEO={
  lectura:{title:'DEMRE - Pregunta comentada Competencia Lectora',url:'https://www.youtube.com/watch?v=X9oNzfVWLRk'},
  numeros:{title:'DEMRE - Pregunta comentada Competencia Matemática 1',url:'https://www.youtube.com/watch?v=ZcKwZeAt5VA'},
  algebra:{title:'DEMRE - Pregunta comentada M1, capítulo 2',url:'https://www.youtube.com/watch?v=KyLr9MqNTH4'},
  geometria:{title:'DEMRE - Pregunta comentada Competencia Matemática 1',url:'https://www.youtube.com/watch?v=ZcKwZeAt5VA'},
  datos:{title:'DEMRE - Pregunta comentada Competencia Matemática 1',url:'https://www.youtube.com/watch?v=KyLr9MqNTH4'},
  historia:{title:'DEMRE - Pregunta comentada Historia y Ciencias Sociales',url:'https://www.youtube.com/watch?v=UIUP5hNxKvo'},
  biologia:{title:'DEMRE - Pregunta comentada Ciencias Biología',url:'https://www.youtube.com/watch?v=jFUjQDyGXDQ'},
  fisica:{title:'DEMRE - Pregunta comentada Ciencias Física',url:'https://www.youtube.com/watch?v=4Q-qGNkCVHo'},
  quimica:{title:'Canal DEMRE - preguntas comentadas de Ciencias',url:'https://www.youtube.com/@DEMREuchile'},
  ciencia:{title:'Canal DEMRE - preguntas comentadas de Ciencias',url:'https://www.youtube.com/@DEMREuchile'},
  estrategia:{title:'Canal oficial DEMRE',url:'https://www.youtube.com/@DEMREuchile'}
};

const EASY_EXPLAIN={
 lectura:{quick:'Busca evidencia, no intuición. La respuesta correcta debe poder apuntarse con el dedo en el texto o inferirse con pistas claras.',easy:'Piensa que el texto es un testigo. Tú no puedes agregar cosas que el testigo nunca dijo. Primero pregunta: ¿qué parte del texto me permite defender esta respuesta? Si no encuentras evidencia, desconfía.',deep:['Lee primero qué te piden: encontrar, interpretar o evaluar.','Vuelve solo al fragmento necesario.','Di con tus palabras qué debería responderse antes de mirar las alternativas.','Elimina opciones que exageran, cambian el tema o agregan información externa.']},
 numeros:{quick:'Antes de calcular, identifica el total y qué parte de ese total estás buscando.',easy:'Si una pizza tiene 8 trozos y comes 2, comiste 2 de 8. Los porcentajes funcionan igual: siempre preguntan qué parte corresponde respecto de un total. Primero encuentra el total; después la parte.',deep:['Escribe qué cantidad es el 100%.','Traduce el porcentaje a fracción, decimal o factor.','Haz la operación con unidades.','Pregunta si el resultado tiene un tamaño razonable.']},
 algebra:{quick:'Ponle nombre a lo que no conoces y transforma cada frase en una relación.',easy:'Imagina una máquina: entra un número y sale otro. Una función te dice qué hace la máquina. Si cobra $2.000 fijo más $500 por cada kilómetro, el fijo no cambia y los $500 se repiten por cada kilómetro.',deep:['Define la variable: qué representa x.','Separa valor inicial y cambio por unidad.','Escribe la ecuación o función.','Resuelve y vuelve al contexto para interpretar.']},
 geometria:{quick:'Dibuja, marca los datos y recién después elige una fórmula.',easy:'La figura es como un mapa. Si no marcas dónde está cada medida, es fácil perderse. Área es lo que cabe dentro; perímetro es la vuelta por el borde.',deep:['Haz un esquema.','Marca medidas y unidades.','Identifica la propiedad que conecta los datos.','Calcula y revisa si la respuesta tiene sentido visual.']},
 datos:{quick:'Primero entiende qué representan los datos; después calcula.',easy:'La media es como repartir todo en partes iguales. La mediana es la persona que queda justo al medio cuando todos se ordenan. No responden exactamente la misma pregunta.',deep:['Identifica variable y muestra.','Mira escala y unidades.','Elige media, mediana, probabilidad u otra medida según lo preguntado.','Interpreta el número en palabras.']},
 historia:{quick:'Ubica época, fuente y proceso. Después pregunta qué evidencia aporta realmente.',easy:'Una fuente histórica es como escuchar a una persona contar lo que vio: sirve mucho, pero no significa que esa persona represente a todo el país. Hay que mirar quién habla, cuándo y para qué.',deep:['Ubica tiempo y espacio.','Identifica autor y propósito de la fuente.','Extrae una evidencia concreta.','Relaciona esa evidencia con el proceso histórico sin exagerar su alcance.']},
 biologia:{quick:'Relaciona estructura → función → efecto.',easy:'Piensa en una célula como una ciudad: cada parte tiene un trabajo. Si una parte falla, pregunta qué trabajo deja de hacerse y qué consecuencia produce.',deep:['Identifica el nivel: célula, organismo, población o ecosistema.','Reconoce qué estructura o proceso cambia.','Predice el efecto directo.','Contrasta la predicción con los datos.']},
 fisica:{quick:'Dibuja la situación y separa qué conoces de qué buscas.',easy:'La física cuenta una historia de cambios. Si empujas un carro, pregunta qué fuerza actúa, hacia dónde y qué cambia: su rapidez, dirección o energía.',deep:['Haz un esquema.','Define magnitudes y unidades.','Elige la relación física adecuada.','Calcula y comprueba signo, dirección y orden de magnitud.']},
 quimica:{quick:'Cuenta partículas o moles antes de hacer proporciones.',easy:'Una ecuación química se parece a una receta. Si la receta pide 2 tazas de harina por 1 de leche, no puedes cambiar esa proporción sin cambiar el resultado. Los coeficientes químicos cumplen ese papel.',deep:['Balancea o lee correctamente la ecuación.','Identifica la proporción entre sustancias.','Convierte unidades si es necesario.','Comprueba conservación y coherencia.']},
 ciencia:{quick:'Pregunta qué variable se cambia, cuál se mide y qué evidencia permitiría concluir algo.',easy:'Un experimento justo cambia una cosa a la vez. Si cambias temperatura y cantidad de agua al mismo tiempo, después no sabes cuál de las dos causó el resultado.',deep:['Identifica pregunta o hipótesis.','Separa variable independiente, dependiente y controles.','Mira si los datos realmente apoyan la conclusión.','Distingue correlación de causalidad.']},
 estrategia:{quick:'Traduce la pregunta a una tarea concreta y elimina distractores uno por uno.',easy:'No necesitas saber todo de inmediato. Pregúntate: ¿qué me están pidiendo exactamente?, ¿qué información sí sirve?, ¿qué alternativas puedo descartar sin calcular todo?',deep:['Subraya la acción pedida.','Selecciona datos relevantes.','Anticipa una respuesta.','Compara alternativas y verifica.']}
};
function pedagogicPack(skill){return EASY_EXPLAIN[classCategory(skill)]||EASY_EXPLAIN.estrategia}
function classVideo(skill){return DEMRE_VIDEO[classCategory(skill)]||DEMRE_VIDEO.estrategia}
function openTeacherVideo(skill){const v=classVideo(skill);window.open(v.url,'_blank','noopener,noreferrer')}
function cleanQuestionText(q){return String((q&&q.text)||'').replace(/\s+/g,' ').trim()}
function qnums(q){return (cleanQuestionText(q).match(/-?\d+(?:[.,]\d+)?/g)||[]).slice(0,5)}
function hasAny(s,arr){s=s.toLowerCase();return arr.some(x=>s.includes(x))}
function shortFocus(q){
  const stop=new Set('cual cuales que como cuanto cuantos cuanta cuantas para entre desde tiene tienen una uno unos unas del las los por con sin sobre segun entonces igual aproximadamente siguiente siguientes corresponde principal principalmente puede pueden esta este estas estos donde cuando'.split(' '));
  return cleanQuestionText(q).toLowerCase().replace(/[^a-záéíóúñ0-9%$ ]/gi,' ').split(/\s+/).filter(w=>w.length>3&&!stop.has(w)).slice(0,6).join(', ')
}
function qhash(q){let s=cleanQuestionText(q),h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}
function pickByQ(q,arr){return arr[qhash(q)%arr.length]}
function almostSame(a,b){const tok=x=>new Set(String(x).toLowerCase().replace(/[^a-záéíóúñ0-9 ]/g,' ').split(/\s+/).filter(w=>w.length>3));const A=tok(a),B=tok(b);let same=0;A.forEach(w=>{if(B.has(w))same++});return same/Math.max(1,Math.min(A.size,B.size))>.62}
function questionKind(q){const l=cleanQuestionText(q).toLowerCase();
 if(/%|porcentaje/.test(l))return 'percent';
 if(/precio es proporcional|cuestan/.test(l)&&/(objet|unidad|cantidad)/.test(l))return 'proportion';
 if(/f\(x\)|función|funcion/.test(l)&&/f\(/.test(l))return 'function';
 if(/\bx\b/.test(l)&&/=/.test(l))return 'equation';
 if(/máximo común divisor|maximo comun divisor|mcd/.test(l))return 'mcd';
 if(/circunferencia|círculo|circulo/.test(l)&&/radio/.test(l))return 'circle';
 if(/triángulo rectángulo|triangulo rectangulo/.test(l)&&/hipotenusa/.test(l))return 'pythagoras';
 if(/probabilidad/.test(l)&&(qnums(q).length>=2||/fichas|bolsa|dados|moneda/.test(l)))return 'probability';
 if(/promedio|media aritm/.test(l))return 'average';
 if(/mediana/.test(l))return 'median';
 if(/frecuencia/.test(l)&&/longitud de onda/.test(l))return 'wave';
 if(/velocidad constante/.test(l)&&/fuerza neta/.test(l))return 'force';
 if(/variable independiente/.test(l)||(/experimento/.test(l)&&/mide|medir|resultado/.test(l)))return 'experiment';
 if(q._context)return 'reading';
 const c=classCategory(q.skill);return c;
}
function specificHint(q){const t=cleanQuestionText(q),ns=qnums(q),k=questionKind(q),v=qhash(q)%3;
 switch(k){
  case 'percent': return ns.length>=2?[`Sin calcular todo: ubica cuál de ${ns.join(' y ')} es el porcentaje y cuál es el total. Empieza hallando 10% del total; desde ahí construye el porcentaje pedido.`,`Escribe el porcentaje como una fracción sobre 100. Luego pregúntate: “¿qué número estoy tomando como 100% en ESTA pregunta?”.`,`Antes de multiplicar, estima. Si el porcentaje es menor que 50%, tu resultado debe ser menor que la mitad del total. Usa esa idea para descartar alternativas.`][v]:`Encuentra primero la cantidad que representa el 100%.`;
  case 'proportion': return ns.length>=3?[`Haz una parada intermedia: calcula cuánto corresponde a 1 unidad usando ${ns[0]} y ${ns[1]}. No vayas directo a ${ns[2]}.`,`Arma dos columnas: cantidad y costo. La razón costo/cantidad debe mantenerse igual en ambas filas.`,`Pregunta: si la cantidad pasa de ${ns[0]} a ${ns[2]}, ¿por qué factor cambia? El costo debe cambiar por el mismo factor.`][v]:`Busca la razón que se mantiene constante.`;
  case 'function': return [`Tapa mentalmente “f( )” y mira solo la fórmula. El número que te entregan entra exactamente en cada lugar donde aparece x.`,`Haz dos líneas: 1) sustitución; 2) cálculo. Si mezclas ambas, es más fácil equivocarte con signos.`,`Primero reemplaza x; después respeta el orden de operaciones. No sumes antes de multiplicar.`][v];
  case 'equation': return [`Tu primer objetivo NO es lo que preguntan al final: primero deja x sola en la ecuación.`,`Piensa en una balanza. Deshaz las operaciones alrededor de x en orden inverso, haciendo lo mismo a ambos lados.`,`Separa el problema en dos mini problemas: hallar x y, recién entonces, evaluar la expresión final.`][v];
  case 'mcd': return ns.length>=2?[`Busca divisores comunes de ${ns[0]} y ${ns[1]}. Empieza probando divisores grandes antes de bajar.`,`Descompón ambos números en factores primos y conserva solo los factores que aparecen en los dos.`,`Imagina formar grupos iguales con ${ns[0]} y con ${ns[1]} sin que sobre nada. Buscas el grupo común más grande.`][v]:`Busca el mayor divisor que comparten ambos números.`;
  case 'circle': return ns.length?[`Te piden superficie, no borde. Usa A = π·r² con r=${ns[0]}.`,`Antes de usar π, calcula el cuadrado del radio ${ns[0]}. Ese es el dato que suele olvidarse.`,`Comprueba unidades: si preguntan área, el resultado debe quedar en cm², no en cm.`][v]:`Distingue área de perímetro y usa la fórmula correspondiente.`;
  case 'pythagoras': return ns.length>=2?[`Dibuja el ángulo recto: los lados ${ns[0]} y ${ns[1]} son catetos. La hipotenusa sale de sumar sus cuadrados, no sus longitudes.`,`Calcula por separado ${ns[0]}² y ${ns[1]}². Súmalos; solo al final busca la raíz cuadrada.`,`Haz una estimación: la hipotenusa debe ser mayor que ${Math.max(+ns[0],+ns[1])}, pero menor que ${(+ns[0])+(+ns[1])}.`][v]:`Usa Pitágoras y revisa cuál lado es la hipotenusa.`;
  case 'probability': return ns.length>=2?[`Escribe primero la fracción “casos que me sirven / casos totales”. Usa los números del enunciado, no los de las alternativas.`,`Cuenta el total real antes de mirar las opciones. Después cuenta solo los resultados favorables.`,`Tu probabilidad debe quedar entre 0 y 1. Si alguna alternativa es mayor que 1, ya sabes que no puede ser.`][v]:`Cuenta casos favorables y posibles antes de simplificar.`;
  case 'average': return [`Cuenta cuántos datos hay ANTES de dividir. El denominador del promedio es esa cantidad.`,`Haz una suma ordenada de todos los datos y revisa una vez el total antes de dividir.`,`Estima primero: el promedio debe quedar entre el menor y el mayor dato. Usa eso para detectar errores.`][v];
  case 'median': return [`No sumes. Ordena los datos y busca la posición central.`,`Primero ordena de menor a mayor. Luego cuenta posiciones desde ambos extremos hasta llegar al centro.`,`Si hay cantidad par de datos, habrá dos centrales; si es impar, uno solo.`][v];
  case 'wave': return [`Mantén fija la rapidez en v=f·λ. Si una variable sube, la otra debe compensar el cambio.`,`No calcules todavía: piensa en cuántas crestas caben en la misma distancia cuando aumenta la frecuencia.`,`Marca qué permanece constante y analiza la relación inversa entre frecuencia y longitud de onda.`][v];
  case 'force': return [`“Velocidad constante” te entrega una pista física clave: ¿hay aceleración o no?`,`Parte desde F_neta=m·a. Decide primero el valor conceptual de a antes de pensar en fuerzas individuales.`,`No confundas “estar moviéndose” con “tener fuerza neta”. Lo importante es si cambia la velocidad.`][v];
  case 'experiment': return [`Subraya dos verbos: qué cambia el investigador y qué mide. El primero apunta a la variable independiente.`,`Pregúntate: “¿qué perilla controla el experimento?” y “¿qué resultado observa?”.`,`Ignora por un momento las alternativas y nombra tú mismo variable manipulada, medida y controles.`][v];
  case 'reading': {const focus=shortFocus(q);return [`Vuelve al texto buscando SOLO evidencia relacionada con “${focus||t.slice(0,45)}”. No releas todo desde cero.`,`Antes de mirar las alternativas, responde la pregunta en 5-8 palabras usando únicamente el texto. Luego busca la opción más cercana.`,`Busca una palabra o frase del texto que permita defender tu respuesta. Si una opción necesita información externa, descártala.`][v]}
  case 'historia': return [`Ubica primero quién habla, en qué época y para qué. Esa tríada limita lo que la fuente puede demostrar.`,`Separa “lo que la fuente dice” de “lo que yo sé del periodo”. Responde primero con la evidencia disponible.`,`Busca si la pregunta pide causa, consecuencia, continuidad/cambio o interpretación de fuente. Eso define qué evidencia sirve.`][v];
  case 'biologia': return [`Haz una cadena corta: estructura o proceso → función → consecuencia. Ubica en qué eslabón pregunta el ítem.`,`Identifica el nivel biológico: célula, organismo, población o ecosistema. Después descarta opciones de otro nivel.`,`Pregúntate qué cambiaría DIRECTAMENTE si el proceso nombrado aumentara, disminuyera o fallara.`][v];
  case 'fisica': return [`Haz un dibujo mínimo con flechas y unidades. Muchas opciones incorrectas mezclan dirección, signo o magnitud.`,`Anota qué magnitud conoces y cuál te piden. Después elige UNA relación física que las conecte.`,`Antes de operar, revisa unidades: ellas suelen indicar si debes multiplicar, dividir o convertir.`][v];
  case 'quimica': return [`Lee los coeficientes como una proporción de receta. Decide primero qué relación molar necesitas.`,`Cuenta átomos o moles a ambos lados antes de elegir. La conservación te permite descartar opciones.`,`Separa conversión de unidades y proporción química: hazlas en pasos distintos.`][v];
  default:return `Localiza la palabra clave de la pregunta: “${shortFocus(q)||q.skill||'contenido central'}”. Decide qué relación concreta debes usar antes de mirar las alternativas.`;
 }
}
function easyFromExplanation(q){let e=String(q.explanation||'').trim();if(!e)return '';
 // Quitamos el resultado final más obvio para que explique el camino sin regalar la letra.
 e=e.replace(/(?:se obtiene|resulta|da|es igual a|es)\s+[-+]?\d+(?:[.,]\d+)?(?:\s*\w+\^?\d*)?\.?$/i,'llegas al resultado que debes comparar con las alternativas.');
 return e;
}
function specificEasy(q){const t=cleanQuestionText(q),ns=qnums(q),k=questionKind(q),v=qhash(q)%3,exp=easyFromExplanation(q);
 switch(k){
  case 'percent': if(ns.length>=2){const pct=parseFloat(ns[0].replace(',','.')),total=parseFloat(ns[1].replace(',','.'));const ten=Number.isFinite(total)?total/10:null;return [`🍎 Imagina que ${total} es una torta completa. Un 10% sería ${ten}. Desde ese pedazo puedes armar ${pct}%: combina decenas de 10% y, si hace falta, una mitad para 5%. Al final suma esos pedazos.`,`🍎 “${pct}% de ${total}” significa tomar ${pct} partes de cada 100. La cuenta se arma como ${total} × ${pct}/100. Haz primero la multiplicación y recién después divide por 100.`,`🍎 Haz una comprobación rápida: 50% de ${total} sería ${total/2}. Como te piden ${pct}%, tu respuesta debe quedar ${pct<50?'por debajo':'por encima'} de ese valor. Ahora calcula con ${pct}/100.`][v]}
  break;
  case 'proportion': if(ns.length>=3)return [`🍎 Si ${ns[0]} cosas cuestan ${ns[1]}, imagina repartir ese costo en ${ns[0]} partes iguales: eso te da el precio de UNA. Luego juntas ${ns[2]} de esas partes.`,`🍎 Haz una mini tabla: ${ns[0]} unidades ↔ ${ns[1]}; 1 unidad ↔ ${ns[1]}/${ns[0]}; ${ns[2]} unidades ↔ (${ns[1]}/${ns[0]})×${ns[2]}. No necesitas memorizar regla de tres.`,`🍎 Piensa en una receta: si multiplicas la cantidad de objetos por un factor, debes multiplicar el costo por exactamente el mismo factor. Calcula el factor ${ns[2]}/${ns[0]} y aplícalo al costo.`][v];
  case 'function': return [`🍎 La “x” es una casilla vacía. Si te dicen f(2), escribe la fórmula otra vez cambiando cada x por 2. Después calcula primero las multiplicaciones y al final las sumas/restas.`,`🍎 No te asustes por f(x): solo significa “resultado cuando entra x”. Mete el número que aparece dentro del paréntesis en la fórmula y sigue la cuenta paso a paso.`,`🍎 Hazlo como una máquina: ENTRA el número indicado → la máquina multiplica/suma según la fórmula → SALE f(x). Escribe cada etapa en una línea para no perder signos.`][v];
  case 'equation': return [`🍎 Imagina una balanza. Si a x le están sumando 7, quita 7 de ambos lados. Si después x está multiplicada por 3, divide ambos lados por 3. Cuando x quede sola, úsala en la segunda cuenta.`,`🍎 Hay dos puertas: primero debes descubrir x; después usar x en lo que te preguntan. Si intentas abrir la segunda sin resolver la primera, te enredas.`,`🍎 “Despejar” es deshacer operaciones al revés. Sumas se deshacen restando; multiplicaciones, dividiendo. Haz una operación por línea y conserva la igualdad.`][v];
  case 'mcd': return ns.length>=2?[`🍎 Escribe algunos divisores de ${ns[0]} y de ${ns[1]}. Marca los que aparecen en ambas listas. El MCD es simplemente el mayor de los marcados.`,`🍎 Piensa en cortar ${ns[0]} y ${ns[1]} elementos en paquetes del MISMO tamaño sin sobras. Prueba tamaños que dividan a ambos; quieres el paquete más grande posible.`,`🍎 Desarma ambos números en multiplicaciones de primos. Quédate solo con las piezas que tienen en común y multiplícalas.`][v]:exp;
  case 'circle': if(ns.length)return [`🍎 Área significa “cuánto piso cubre”. Con radio ${ns[0]}, primero calcula ${ns[0]}×${ns[0]}. Después multiplica ese número por 3,14.`,`🍎 No uses 2πr: eso mide la vuelta del círculo. Aquí necesitas πr². El cuadrado del radio ${ns[0]} es tu primer paso.`,`🍎 Imagínate pintando todo el interior del círculo. La fórmula para esa superficie es 3,14 × radio × radio. Sustituye el radio que aparece en esta pregunta.`][v];
  case 'pythagoras': if(ns.length>=2){const a=+ns[0],b=+ns[1];return [`🍎 Haz dos cuadrados imaginarios: uno de lado ${a} y otro de lado ${b}. Sus áreas son ${a*a} y ${b*b}. Súmalas; la hipotenusa es el lado del cuadrado que tendría esa área total.`,`🍎 Pitágoras no dice “suma los lados”. Dice c²=${a}²+${b}². Primero encuentra ese total; después pregunta qué número multiplicado por sí mismo produce el total.`,`🍎 Usa la fórmula como receta: cateto² + cateto² = hipotenusa². Aquí reemplazas por ${a} y ${b}. La raíz cuadrada se hace SOLO al final.`][v]}
  break;
  case 'probability': return [`🍎 Imagina que metes la mano con los ojos cerrados. Abajo de la fracción va TODO lo que podrías sacar; arriba, solo lo que cumple la condición. Esa fracción es la probabilidad.`,`🍎 No mires las alternativas todavía. Escribe “me sirven / existen en total”. Reemplaza ambas partes con los datos del enunciado y simplifica.`,`🍎 Si de cada 4 casos solo 1 sirve, la probabilidad es 1/4. Aplica la misma idea a las cantidades de ESTA pregunta: favorables dividido por total.`][v];
  case 'average': return [`🍎 Imagina repartir los valores para que todos queden iguales sin cambiar la suma total. Suma todo y divide por cuántos datos hay.`,`🍎 El promedio es “repartir parejo”. Primero haces una sola bolsa con todos los valores; luego repartes esa bolsa entre la cantidad de valores.`,`🍎 Haz dos cuentas separadas: SUMA de los datos y CANTIDAD de datos. Promedio = primera cuenta ÷ segunda. Así evitas dividir por un número equivocado.`][v];
  case 'median': return [`🍎 La mediana no reparte nada: hace una fila. Ordena de menor a mayor y busca quién quedó justo al medio.`,`🍎 Imagina personas ordenadas por altura. La mediana es la persona del centro; si quedan dos al centro, haces el promedio solo entre esas dos.`,`🍎 Primero ordena. Si no ordenas, no hay mediana confiable. Después elimina un dato de cada extremo hasta llegar al centro.`][v];
  case 'reading': {const skill=String(q.skill||'').toLowerCase();if(skill.includes('local'))return `🍎 Esta es una pregunta de encontrar. No necesitas interpretar todo el texto: busca la palabra, acción o dato que corresponde exactamente a “${t.slice(0,80)}${t.length>80?'…':''}”. Después compara esa evidencia literal con las alternativas.`;if(skill.includes('interpret'))return `🍎 Aquí no basta copiar una frase. Junta dos pistas del texto y pregúntate qué idea se desprende de ellas SIN inventar información. La mejor alternativa será la que dice esa idea con el alcance justo.`;return `🍎 Aquí debes juzgar cómo funciona el texto: propósito, tono, recurso o calidad de una idea. Busca qué efecto produce ese elemento dentro del texto, no si a ti te gusta o no.`;}
  case 'history': return `🍎 Piensa como detective histórico: primero identifica QUIÉN produjo la fuente, CUÁNDO y PARA QUÉ. Después usa solo lo que esa fuente permite afirmar. ${exp?`La explicación de fondo apunta a: ${exp}`:''}`;
  case 'biologia': return `🍎 Lleva el problema a una cadena simple: “si cambia esto → qué función cambia → qué consecuencia aparece”. ${exp?`El concepto que conecta la cadena es: ${exp}`:''}`;
  case 'fisica': return `🍎 Convierte el enunciado en un dibujo con flechas y números. Luego elige la relación física que conecte exactamente lo que te dan con lo que te piden. ${exp?`La idea física relevante es: ${exp}`:''}`;
  case 'quimica': return `🍎 Trátalo como una receta: primero fija la proporción correcta entre sustancias y después adapta las cantidades. ${exp?`La relación que debes usar es: ${exp}`:''}`;
  case 'experiment': return `🍎 Imagina un control remoto: el botón que TÚ cambias es la variable independiente; el número que OBSERVAS como resultado es la dependiente. En esta pregunta identifica ambos papeles antes de responder.`;
 }
 if(exp)return `🍎 En palabras simples: ${exp} No memorices el resultado; fíjate en el paso que conecta los datos del enunciado.`;
 return `🍎 Divide ESTA pregunta en tres partes: lo que te dan, lo que te piden y la regla que las conecta. Escribe esas tres cosas antes de elegir alternativa.`;
}
function questionHint(q,level){if(level===1)return specificHint(q);if(level===2){let h=specificHint(q),e=specificEasy(q);if(almostSame(h,e)){e='🍎 Vamos más despacio: '+(easyFromExplanation(q)||pedagogicPack(q.skill).easy)+' Fíjate en el procedimiento, no en memorizar una alternativa.'}return e}const p=pedagogicPack(q.skill);return `Hazlo en este orden: ${p.deep.join(' → ')} Después compara tu resultado con las alternativas.`}
function showPedHint(i,level){const el=document.getElementById(`pedhint-${i}`);if(el)el.innerHTML=`<strong>${level===1?'💡 Pista para ESTA pregunta':'🍎 Explícamelo fácil'}</strong><br>${esc(questionHint(preuSession.questions[i],level))}`}

function classQuestionHTML(q,i){return `<section class="question"><div class="meta"><span class="pill">Pregunta ${i+1}/10</span><span class="pill">${esc(q.difficulty||'Media')}</span><span class="pill">${esc(q.skill||'General')}</span></div>${q._context?`<details class="passage" ${i<2?'open':''}><summary><b>Texto para responder</b></summary><p>${esc(q._context)}</p></details>`:''}<h3>${esc(q.text)}</h3>${q.options.map(o=>`<label class="option"><input type="radio" name="pcq${i}" value="${o.key}" onchange="preuAnswer(${i},'${o.key}')"><b>${o.key})</b> ${esc(o.text)}</label>`).join('')}<div class="toolbar" style="margin-top:.7rem"><button class="ghost" onclick="showPedHint(${i},1)">💡 Dame una pista</button><button class="ghost" onclick="showPedHint(${i},2)">🍎 Explícamelo fácil</button></div><div id="pedhint-${i}" class="recommend" style="display:block;margin-top:.5rem">Usa una pista solo si la necesitas. Intenta pensar primero por tu cuenta.</div></section>`}

function openPersonalizedClass(encoded){if(!learningGate())return;const skill=decodeURIComponent(encoded),stat=personalSkillStats().find(v=>v.skill===skill),th=classTheory(skill),qs=chooseClassQuestions(skill,10),p=pedagogicPack(skill),v=classVideo(skill);preuSession={skill,questions:qs,answers:{},started:Date.now()};const g=preuGrade();app.innerHTML=`<div class="toolbar"><button class="ghost" onclick="personalizedClasses()">← Mis clases</button><span class="pill">${g}° Medio</span><span class="pill">${stat?stat.p+'% actual':'Refuerzo'}</span></div><section class="card" style="border-left:5px solid #7c3aed"><div class="eyebrow">CLASE PERSONALIZADA PAES · ${g}° MEDIO</div><h1>${esc(th.title)}</h1><p><b>Tu foco:</b> ${esc(skill)}. ${g===3?'Vamos desde la base y subimos de a poco.':'Vamos directo a comprensión, estrategia y aplicación PAES.'}</p></section><section class="grid three"><article class="card"><h2>⚡ Resumen rápido</h2><p>${esc(p.quick)}</p></article><article class="card" style="border-left:5px solid #f59e0b"><h2>🍎 Explícamelo fácil</h2><p>${esc(p.easy)}</p></article><article class="card" style="border-left:5px solid #7c3aed"><h2>🎓 Aprenderlo bien</h2><ol>${p.deep.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></article></section><section class="card"><h2>▶️ ¿Prefieres verlo?</h2><p>Complementa la clase con una pregunta comentada o material del canal oficial DEMRE.</p><button class="secondary" onclick="openTeacherVideo('${encodeURIComponent(skill)}')">▶️ ${esc(v.title)}</button><p class="tiny">El video se abre en YouTube. Es material externo y complementario; PAES Trainer no copia preguntas oficiales.</p></section><section class="card"><h2>👨‍🏫 Ahora el profesor te muestra el método</h2><p>No memorices una letra. Usa siempre este camino:</p><ol>${th.method.slice(0,5).map(x=>`<li>${esc(x)}</li>`).join('')}</ol><div class="recommend"><strong>Idea clave</strong>${esc(th.tips[0]||p.quick)}</div></section><section class="grid"><article class="card"><h2>✏️ Ejemplo guiado</h2><p><b>1.</b> Lee y di qué te piden con tus palabras.</p><p><b>2.</b> Marca solo la información útil.</p><p><b>3.</b> Elige una estrategia antes de operar.</p><p><b>4.</b> Resuelve y explica por qué tu respuesta tiene sentido.</p></article><article class="card"><h2>🚨 Trampas típicas</h2><ul>${th.tips.slice(0,4).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article></section><div class="sectionTitle"><div><h2>🎯 Desafío PAES · 10 preguntas</h2><p>Preguntas originales de PAES Trainer, organizadas por eje, habilidad y dificultad con referencia a la estructura PAES/DEMRE.</p></div></div>${qs.length?qs.map((q,i)=>classQuestionHTML(q,i)).join(''):'<section class="card"><p>Aún no hay suficientes preguntas asociadas a este eje.</p></section>'}<div class="toolbar"><button class="btn" onclick="finishPreuClass()">Corregir mi clase</button><button class="secondary" onclick="personalizedClasses()">Salir</button></div>`;window.scrollTo(0,0)}

// === Correccion V3: ayudas realmente especificas por enunciado ===
// Regla: la pista orienta el primer paso. "Explicamelo facil" ensena el procedimiento
// usando los datos de ESA pregunta. No reutiliza la misma plantilla como respuesta final.
function _numList(text){return (String(text||'').match(/-?\d+(?:[.,]\d+)?/g)||[]).map(x=>x.replace(',','.'));}
function _correctText(q){const o=(q.options||[]).find(x=>x.key===q.answer);return String(o?.text||'').trim();}
function _safeExplanation(q){let e=String(q.explanation||'').trim();const ans=_correctText(q);if(ans){const escAns=ans.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');e=e.replace(new RegExp('(?:=|:|es|son|da|resulta|raíces son|raices son)\\s*'+escAns.replace(/\s+/g,'\\s*')+'(?:\\s*\\w*)?\\.?','ig'),' y desde ahí comparas con las alternativas.');}return e;}
function _assistSpecific(q){
 const t=cleanQuestionText(q), l=t.toLowerCase(), nums=_numList(t), exp=String(q.explanation||'');
 // Compra de varios articulos con precio unitario.
 let m=t.match(/se compran\s+(\d+)\s+cuadernos\s+y\s+(\d+)\s+l[aá]pices.*?cada art[ií]culo.*?\$?(\d+(?:[.,]\d+)?)\s*mil/i);
 if(m){const a=m[1],b=m[2],p=m[3];return {
  hint:`Tienes dos cantidades de artículos: ${a} cuadernos y ${b} lápices. Primero júntalas para saber cuántos artículos se compraron en total. Recién después usa el precio de $${p} mil por cada artículo.`,
  easy:`Piensa en una compra real: hay ${a} cuadernos + ${b} lápices. Paso 1: cuenta cuántas cosas hay en total (${a}+${b}). Paso 2: como CADA cosa cuesta $${p} mil, multiplica ese total por ${p}. No necesitas despejar x ni usar una fórmula de álgebra.`
 }};
 // Ecuacion cuadratica ax^2+bx+c=0.
 m=t.match(/soluciones de\s*([+-]?\d+(?:[.,]\d+)?)x\^2\s*\+\s*\(([+-]?\d+(?:[.,]\d+)?)\)x\s*\+\s*\(([+-]?\d+(?:[.,]\d+)?)\)\s*=\s*0/i);
 if(m){const a=m[1],b=m[2],c=m[3];return {
  hint:`Ojo: esta NO es una ecuación lineal porque aparece x². Identifica a=${a}, b=${b} y c=${c}. Tu primer paso es calcular el discriminante Δ=b²−4ac.`,
  easy:`Aquí no sirve “dejar x sola” como en 3x+7=19. Es una cuadrática. Usa x = (−b ± √Δ)/(2a). En ESTA pregunta: a=${a}, b=${b}, c=${c}. Primero calcula Δ=(${b})²−4·(${a})·(${c}); luego usa el + y el − para obtener las dos soluciones.`
 }};
 // Ecuacion lineal y segunda expresion.
 m=t.match(/si\s*([+-]?\d+)x\s*([+-]\s*\d+)\s*=\s*([+-]?\d+).*?entonces\s*([+-]?\d+)x\s*([+-]\s*\d+)/i);
 if(m){const a=m[1],b=m[2].replace(/\s/g,''),r=m[3],c=m[4],d=m[5].replace(/\s/g,'');return {
  hint:`Primero trabaja solo con ${a}x ${b} = ${r}. Deshaz ${b.startsWith('+')?'la suma':'la resta'} y luego divide por ${a} para encontrar x. Todavía no calcules ${c}x ${d}.`,
  easy:`Son dos mini problemas. 1) Encuentra x en ${a}x ${b} = ${r}: mueve el término ${b} al otro lado haciendo la operación contraria y después divide por ${a}. 2) Cuando tengas x, reemplázala en ${c}x ${d}. Así no mezclas las dos cuentas.`
 }};
 // Evaluacion de funcion lineal.
 m=t.match(/funci[oó]n\s+f\(x\)\s*=\s*([+-]?\d+)x\s*([+-]\s*\d+).*?f\(([+-]?\d+)\)/i);
 if(m){const a=m[1],b=m[2].replace(/\s/g,''),x=m[3];return {
  hint:`f(${x}) significa que debes reemplazar cada x de f(x)=${a}x${b} por ${x}. Haz primero esa sustitución, sin calcular mentalmente todo de una vez.`,
  easy:`Imagina que f es una máquina. Entra ${x}. La máquina hace: 1) ${a}×${x}; 2) después aplica ${b}. Escribe esas dos operaciones en ese orden y obtendrás la salida f(${x}).`
 }};
 // Evaluacion de funcion cuadratica trasladada.
 m=t.match(/g\(x\)\s*=\s*\(x\s*\+\s*1\)\^2\s*-\s*1.*?g\((\d+)\)/i);
 if(m){const x=m[1];return {
  hint:`Reemplaza x por ${x} dentro del paréntesis. La potencia ² se aplica a TODO (${x}+1), y el −1 va al final.`,
  easy:`Hazlo como tres escalones: entra ${x} → súmale 1 → eleva ese resultado al cuadrado → resta 1. No eleves solo el 1 ni restes antes de hacer el cuadrado.`
 }};
 // Crecimiento exponencial P(t)=A(1+r)^t.
 m=t.match(/P\(t\)\s*=\s*(\d+(?:[.,]\d+)?)\(1\+([\d.,]+)\)\^t.*?P\((\d+)\)/i);
 if(m){const A=m[1],r=m[2],tt=m[3];return {
  hint:`En P(t)=${A}(1+${r})^t, reemplaza t por ${tt}. Primero resuelve el paréntesis, luego la potencia y al final multiplica por ${A}.`,
  easy:`Piensa en crecimiento por etapas. Partes con ${A}. En cada etapa multiplicas por 1+${r}. Como t=${tt}, ese mismo factor se aplica ${tt} veces. Por eso la potencia va antes de multiplicar por el valor inicial.`
 }};
 // Porcentaje directo.
 m=t.match(/(?:cu[aá]l es el\s*)?(\d+(?:[.,]\d+)?)%\s+de\s+(\d+(?:[.,]\d+)?)/i);
 if(m){const p=m[1],total=m[2];return {
  hint:`El ${p}% es una parte de ${total}. Convierte ${p}% en ${p}/100 y úsalo como factor sobre ${total}.`,
  easy:`Si ${total} fuera una torta completa (100%), quieres solo ${p} de cada 100 partes. La cuenta es ${total}×${p}/100. Puedes hacer primero ${total}÷100 y luego multiplicar por ${p}.`
 }};
 // Proporcion directa de objetos y costo.
 m=t.match(/si\s*(\d+)\s+objetos\s+cuestan\s*\$?(\d+(?:[.,]\d+)?)\s*mil.*?cu[aá]nto\s+cuestan\s*(\d+)\s+objetos/i);
 if(m){const a=m[1],cost=m[2],b=m[3];return {
  hint:`Primero averigua cuánto cuesta 1 objeto: divide ${cost} entre ${a}. Después usa ese precio unitario para ${b} objetos.`,
  easy:`Haz una mini tabla: ${a} objetos → $${cost} mil. Para llegar a 1 objeto, divide el costo por ${a}. Luego multiplica ese valor por ${b}. La misma proporción debe mantenerse.`
 }};
 // MCD.
 m=t.match(/m[aá]ximo com[uú]n divisor entre\s*(\d+)\s+y\s+(\d+)/i);
 if(m){const a=m[1],b=m[2];return {
  hint:`Busca números que dividan exactamente tanto a ${a} como a ${b}. Te interesa el mayor que comparten.`,
  easy:`Imagina que tienes ${a} y ${b} objetos y quieres hacer grupos del MISMO tamaño sin que sobre ninguno. Prueba divisores comunes; el tamaño de grupo más grande posible es el MCD.`
 }};
 // Area circulo.
 m=t.match(/radio\s+(\d+(?:[.,]\d+)?)\s*cm.*?[aá]rea/i);
 if(m){const r=m[1];return {
  hint:`Te piden área, no el borde. Usa A=πr² con r=${r}. Primero calcula ${r}².`,
  easy:`Imagina que quieres pintar todo el interior del círculo. La superficie se calcula con π×radio×radio. Aquí es 3,14×${r}×${r}. El ² significa multiplicar el radio por sí mismo.`
 }};
 // Pitagoras.
 m=t.match(/catetos de\s*(\d+(?:[.,]\d+)?)\s*cm\s+y\s*(\d+(?:[.,]\d+)?)\s*cm.*?hipotenusa/i);
 if(m){const a=m[1],b=m[2];return {
  hint:`Como te dan los dos catetos (${a} y ${b}), usa Pitágoras: c²=${a}²+${b}². La raíz cuadrada va al final.`,
  easy:`Hazlo en tres pasos: 1) multiplica ${a}×${a}; 2) multiplica ${b}×${b}; 3) suma esos resultados. El número que al multiplicarse por sí mismo da esa suma es la hipotenusa.`
 }};
 // Probabilidad bolsa.
 m=t.match(/bolsa hay\s*(\d+)\s*fichas\s+y\s*(\d+)\s*son\s+rojas/i);
 if(m){const total=m[1],fav=m[2];return {
  hint:`Casos posibles=${total}. Casos favorables=${fav}. Arma primero la fracción favorables/posibles.`,
  easy:`Imagina que cierras los ojos y sacas una ficha. Hay ${total} fichas que podrían salir, pero solo ${fav} te sirven porque son rojas. Entonces partes con ${fav}/${total} y después simplificas esa fracción.`
 }};
 // Promedio explicito con lista.
 if(/promedio de los datos\s*\[/.test(l)){const vals=(t.match(/\[([^\]]+)\]/)||[])[1];if(vals){const arr=vals.split(',').map(x=>x.trim()).filter(Boolean);return {
  hint:`Hay ${arr.length} datos. Súmalos todos y divide esa suma por ${arr.length}.`,
  easy:`Piensa en repartir todos estos valores en partes iguales: ${arr.join(', ')}. Primero júntalos en una sola suma; luego reparte el total entre ${arr.length}, porque esa es la cantidad de datos.`
 }};}
 // Lectura: aprovechar texto y habilidad concreta.
 if(q._context){const skill=normText(q.skill);const snippet=String(q._context).slice(0,180);if(/localizar/.test(skill))return {hint:`Esta es de localizar: busca en el texto una frase que responda literalmente “${t}”. No interpretes todavía.`,easy:`Aquí juegas a “buscar evidencia”. Recorre el texto hasta encontrar la acción, objeto o dato que pregunta el enunciado. Copia mentalmente esa frase y recién después busca la alternativa que dice lo mismo sin cambiarlo.`};if(/interpretar/.test(skill))return {hint:`Busca dos pistas del texto relacionadas con “${t}” y únelas. La respuesta debe inferirse de esas pistas, no de información externa.`,easy:`No necesitas adivinar qué quiso decir el autor. Pregunta: “¿qué muestran juntos estos detalles del texto?”. Explica esa idea con tus palabras y elige la alternativa que coincide sin exagerar.`};return {hint:`Identifica qué aspecto debes evaluar en “${t}”: propósito, tono, recurso o efecto. Después busca evidencia textual que lo sostenga.`,easy:`Esta pregunta te pide mirar CÓMO funciona el texto. No basta decir de qué trata. Piensa qué efecto produce la forma de escribir, el tono o el recurso señalado y busca la alternativa que mejor describe ese efecto.`};}
 // Fallback basado en la explicacion especifica de la propia pregunta.
 const safe=_safeExplanation(q);
 if(safe){return {hint:`La idea matemática/conceptual que necesitas aquí es esta: ${safe.split(/[;:.]/)[0]}. Úsala como primer paso y luego vuelve a los datos del enunciado.`,easy:`Vamos con ESTA pregunta paso a paso. ${safe} Haz cada operación o relación en una línea distinta y al final compara lo obtenido con las alternativas.`};}
 return {hint:`Identifica exactamente qué te piden en esta pregunta y anota solo los datos que sirven para responderlo.`,easy:`Tradúcela a tres cosas: qué sé, qué necesito encontrar y qué regla conecta ambas. Si no puedes escribir esas tres cosas, vuelve a leer el enunciado antes de mirar alternativas.`};
}
questionHint=function(q,level){const a=_assistSpecific(q);return level===1?a.hint:a.easy;};
showPedHint=function(i,level){const el=document.getElementById(`pedhint-${i}`);if(!el||!preuSession?.questions?.[i])return;const q=preuSession.questions[i],a=_assistSpecific(q);el.innerHTML=`<strong>${level===1?'💡 Pista para ESTA pregunta':'🍎 Explícamelo fácil'}</strong><br>${esc(level===1?a.hint:a.easy)}`;};
