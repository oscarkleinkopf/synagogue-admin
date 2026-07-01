// ============================================================
// Database of all 54 Torah Portions (Parashot) in Spanish
// ============================================================

const PARASHOT_DATA = {
  // --- BEREISHIT (GÉNESIS) ---
  'Bereshit': {
    summary_kids: 'Esta semana leemos sobre cómo Dios creó todo el mundo en seis días. Primero hizo la luz, luego el cielo, los mares, los árboles, los animales y finalmente a Adán y Javá. ¡El séptimo día descansó y eso es Shabat!',
    questions: ['¿Qué fue lo primero que Dios creó?', '¿Por qué crees que Dios descansó el séptimo día?', 'Si pudieras crear un animal nuevo, ¿cómo sería?'],
    activity: '¡Dibuja tu propio Jardín del Edén con todos los animales que quieras!',
    illustration: 'images/bereshit_illustration.jpg',
    coloring: 'images/bereshit_coloring.jpg'
  },
  'Noach': {
    summary_kids: 'Dios le pide a Noaj que construya un arca enorme porque va a llover muchísimo. Noaj invitó a dos animalitos de cada especie para que estuvieran a salvo. Después del diluvio, Dios puso un arcoíris en el cielo como promesa.',
    questions: ['¿Cuál animal te hubiera gustado cuidar dentro del arca?', '¿Cómo crees que se sentía estar lloviendo por 40 días seguidos?', '¿Qué significa el arcoíris para ti?'],
    activity: '¡Colorea el Arca de Noaj y todos sus animales!',
    illustration: 'images/parasha_illustration.png',
    coloring: 'images/parasha_coloring_page.png'
  },
  'Lech Lecha': {
    summary_kids: 'Dios le dice a Abraham: "Lech Lechá" que significa "Ve por ti". Abraham dejó su casa y viajó a una tierra nueva que Dios le prometió. Fue muy valiente porque no sabía a dónde iba.',
    questions: ['¿Alguna vez te mudaste a un lugar nuevo? ¿Cómo te sentiste?', '¿Qué llevarías en tu maleta si tuvieras que irte lejos?', '¿Por qué crees que Abraham confió en Dios?'],
    activity: '¡Dibuja el mapa del viaje de Abraham!',
    illustration: 'images/lech_lecha_illustration.jpg',
    coloring: 'images/lech_lecha_coloring.jpg'
  },
  'Vayera': {
    summary_kids: 'Abraham recibe tres visitantes misteriosos en su tienda. Les da comida y agua porque era muy hospitalario. Los visitantes le dan una gran noticia: ¡Sara va a tener un bebé!',
    questions: ['¿Cómo recibes tú a los invitados en tu casa?', '¿Por qué es importante ser amable con los visitantes?', '¿Qué comida le prepararías a un invitado especial?'],
    activity: '¡Prepara una tarjeta de bienvenida para un invitado!',
    illustration: 'images/vayera_illustration.jpg',
    coloring: 'images/vayera_coloring.jpg'
  },
  'Chayei Sarah': {
    summary_kids: 'Esta semana recordamos la vida de la matriarca Sara. Abraham envía a su sirviente Eliezer a buscar una esposa para su hijo Isaac. Eliezer encuentra a Rebeca en un pozo, quien demuestra su bondad dando de beber a los camellos.',
    questions: ['¿Cómo demostró Rebeca que era una persona bondadosa?', '¿Por qué es importante ayudar a los animales?', '¿Qué cualidades buscas en un buen amigo?'],
    activity: '¡Dibuja una escena de Rebeca ayudando en el pozo!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Toldot': {
    summary_kids: 'Esta semana conocemos a los gemelos Esav y Yaakov. Eran muy diferentes: Esav era cazador y peludo, y Yaakov era tranquilo y le gustaba estudiar. A veces los hermanos son muy distintos ¡y eso está bien!',
    questions: ['¿En qué te pareces a tus hermanos o amigos?', '¿En qué eres diferente?', '¿Qué es lo especial de ser único?'],
    activity: '¡Dibuja a dos gemelos que sean totalmente diferentes!',
    illustration: 'images/toldot_illustration.jpg',
    coloring: 'images/toldot_coloring.jpg'
  },
  'Vayetze': {
    summary_kids: 'Yaakov tiene un sueño increíble: ve una escalera gigante que llega hasta el cielo con ángeles subiendo y bajando. Dios le promete que lo cuidará siempre.',
    questions: ['¿Alguna vez tuviste un sueño muy especial?', '¿Cómo te imaginas una escalera al cielo?', '¿Qué le preguntarías a un ángel?'],
    activity: '¡Dibuja la escalera de Yaakov con ángeles!',
    illustration: 'images/vayetze_illustration.jpg',
    coloring: 'images/vayetze_coloring.jpg'
  },
  'Vayishlach': {
    summary_kids: 'Yaakov se prepara para reencontrarse con su hermano Esav después de muchos años. Lucha con un ángel misterioso toda la noche y recibe el nuevo nombre de Israel, que significa "el que lucha con Dios".',
    questions: ['¿Cómo te prepara cuando tienes miedo de encontrarte con alguien?', '¿Por qué crees que Yaakov recibió un nuevo nombre?', '¿Qué significa ser valiente para ti?'],
    activity: '¡Dibuja a Yaakov encontrando paz con su hermano!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Vayeshev': {
    summary_kids: 'Esta semana leemos sobre Yosef y su hermosa túnica de muchos colores, un regalo especial de su padre Yaakov. Sus hermanos se ponen celosos, y tras una serie de sucesos, Yosef termina viajando a Egipto.',
    questions: ['¿Cómo te sentirías si te regalaran una túnica de muchos colores?', '¿Qué es la envidia y por qué puede hacernos daño?', '¿Cómo podemos resolver desacuerdos con nuestros hermanos?'],
    activity: '¡Colorea una túnica con todos los colores del arcoíris!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Miketz': {
    summary_kids: 'Yosef interpreta los sueños del Faraón: habrá 7 años de mucha comida y 7 años de hambre. Gracias a su sabiduría, Yosef se convierte en el segundo hombre más importante de Egipto.',
    questions: ['¿Alguna vez ayudaste a alguien con un problema difícil?', '¿Por qué es bueno guardar comida para después?', '¿Qué harías si fueras el rey de Egipto?'],
    activity: '¡Dibuja los sueños del Faraón!',
    illustration: 'images/miketz_illustration.jpg',
    coloring: 'images/miketz_coloring.jpg'
  },
  'Vayigash': {
    summary_kids: 'Yosef finalmente revela su verdadera identidad a sus hermanos en Egipto en una reunión muy emotiva. Los perdona y les pide que traigan a su padre Yaakov y a toda la familia a vivir con él.',
    questions: ['¿Qué se siente perdonar a alguien que te hizo daño?', '¿Cómo imaginas el abrazo de reunión de los hermanos?', '¿Por qué es valiosa la unión familiar?'],
    activity: '¡Dibuja un gran abrazo familiar!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Vayechi': {
    summary_kids: 'Yaakov bendice a sus hijos y a sus nietos Efraim y Menashé antes de despedirse. Les pide que siempre recuerden sus raíces y su tierra de Israel, y que vivan en paz mutua.',
    questions: ['¿Qué deseos o bendiciones tienes para tu familia?', '¿Por qué los abuelos son tan importantes en nuestra vida?', '¿Qué tradición familiar te gusta más?'],
    activity: '¡Dibuja a un abuelo bendiciendo a sus nietos!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },

  // --- SHEMOT (ÉXODO) ---
  'Shemot': {
    summary_kids: 'Nace Moshé (Moisés). Su mamá lo pone en una canasta en el río para salvarlo. La hija del Faraón lo encuentra y lo cría como un príncipe. Cuando crece, ve una zarza que arde pero no se quema.',
    questions: ['¿Qué harías si encontraras un bebé en una canasta?', '¿Por qué crees que la zarza no se quemaba?', '¿Cómo te sentirías si Dios te hablara?'],
    activity: '¡Dibuja la canasta de Moshé flotando en el río!',
    illustration: 'images/shemot_illustration.jpg',
    coloring: 'images/shemot_coloring.jpg'
  },
  'Vaera': {
    summary_kids: 'Moshé y su hermano Aarón le piden al Faraón que deje salir al pueblo hebreo, pero él se niega. Dios envía las primeras plagas a Egipto, mostrando señales asombrosas.',
    questions: ['¿Por qué el Faraón tenía el corazón tan duro?', '¿Cómo te sentirías al ver que el agua se convierte en algo diferente?', '¿Por qué es importante escuchar a los demás?'],
    activity: '¡Dibuja las primeras plagas o ranas divertidas!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Bo': {
    summary_kids: 'Llegan las últimas plagas a Egipto, incluyendo las langostas y la oscuridad total. El Faraón finalmente decide dejar salir a los israelitas, quienes parten de prisa sin tiempo para que el pan leude, creando la primera Matzá.',
    questions: ['¿Por qué comemos Matzá en Pésaj?', '¿Qué llevarías contigo si tuvieras que partir de prisa?', '¿Cómo imaginas que se sintió salir de la esclavitud a la libertad?'],
    activity: '¡Dibuja un trozo de Matzá crujiente!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Beshalach': {
    summary_kids: 'El pueblo cruza milagrosamente el Mar Rojo que se abre en dos. Al llegar al desierto, Dios les envía el Maná, una comida del cielo deliciosa que caía cada mañana, y el doble de cantidad los viernes por Shabat.',
    questions: ['¿Qué sabor crees que tenía el Maná?', '¿Cómo imaginas cruzar un mar con paredes de agua a los lados?', '¿Por qué recibían doble porción antes de Shabat?'],
    activity: '¡Dibuja el mar abierto con peces mirando a la gente pasar!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Yitro': {
    summary_kids: 'El suegro de Moshé, Yitró, lo visita y le aconseja organizar líderes para guiar al pueblo. Poco después, en el Monte Sinaí, todo el pueblo escucha a Dios dar los Diez Mandamientos entre truenos y shofares.',
    questions: ['¿Cuál de los Diez Mandamientos te parece más fácil de recordar?', '¿Por qué es bueno pedir consejos cuando tenemos mucho trabajo?', '¿Cómo te imaginas el sonido de un shofar gigante?'],
    activity: '¡Dibuja las dos tablas de la ley con números hebreos!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Mishpatim': {
    summary_kids: 'Dios le da al pueblo leyes justas y morales sobre cómo tratar a los vecinos, cuidar a los animales, ayudar a los pobres y celebrar las fiestas con alegría.',
    questions: ['¿Por qué necesitamos reglas y leyes en una comunidad?', '¿Cómo puedes ayudar a un vecino o amigo hoy?', '¿Qué regla de tu casa te gusta más?'],
    activity: '¡Dibuja a un grupo de amigos compartiendo sus juguetes en paz!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Terumah': {
    summary_kids: 'Dios pide al pueblo que traiga ofrendas voluntarias de oro, plata, maderas y telas hermosas para construir el Mishkán (Santuario móvil) en el desierto, para tener un espacio comunitario santo.',
    questions: ['¿Qué objeto especial te gustaría donar si construyeras un templo?', '¿Qué hace que un lugar se sientan sagrado o especial?', '¿Por qué es valioso trabajar juntos en un proyecto de la comunidad?'],
    activity: '¡Diseña tu propio templo miniatura usando colores brillantes!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Tetzaveh': {
    summary_kids: 'Leemos sobre la vestimenta especial de los sacerdotes y el encendido de la Menorá de oro puro con aceite de oliva para que la luz espiritual brille permanentemente en el santuario.',
    questions: ['¿Por qué crees que el aceite de oliva era tan especial?', '¿Cómo podemos nosotros ser como pequeñas luces en el mundo?', '¿Qué ropa especial usas en Shabat o festividades?'],
    activity: '¡Dibuja una hermosa Menorá con siete luces brillantes!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Ki Tisa': {
    summary_kids: 'Moshé tarda en bajar del monte y el pueblo construye un becerro de oro. Al regresar, Moshé rompe las tablas, pero luego sube a pedir perdón a Dios y baja con un segundo juego de tablas con el rostro radiante.',
    questions: ['¿Por qué es importante saber esperar pacientemente?', '¿Qué significa pedir disculpas sinceras cuando nos equivocamos?', '¿Qué te hace brillar de felicidad?'],
    activity: '¡Dibuja a Moshé bajando con las segundas tablas de la ley!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Vayakhel': {
    summary_kids: 'Moshé reúne a toda la comunidad y les recuerda la importancia del descanso de Shabat. Todos traen sus ofrendas con un corazón generoso y los sabios tejedores comienzan la construcción.',
    questions: ['¿Qué haces tú en Shabat para descansar y desconectarte?', '¿Qué significa dar con el corazón?', '¿Qué habilidad especial tienes tú que puedas compartir con la comunidad?'],
    activity: '¡Dibuja a personas tejiendo hermosas cortinas para el Mishkán!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Pekudei': {
    summary_kids: 'Se presenta un informe detallado con todo el oro, plata y bronce utilizados. Moshé levanta el Mishkán y una gran nube de gloria lo cubre, indicando que el pueblo está listo para avanzar bajo la guía divina.',
    questions: ['¿Por qué es importante ser honesto y transparente con el dinero?', '¿Cómo te imaginas la nube que los guiaba en el desierto?', '¿Qué sientes cuando terminas con éxito un gran proyecto?'],
    activity: '¡Dibuja el Mishkán terminado en medio del desierto bajo una nube brillante!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },

  // --- VAYIKRA (LEVÍTICO) ---
  'Vayikra': {
    summary_kids: 'Dios llama a Moshé desde el santuario y le explica cómo los israelitas pueden acercarse a Dios a través de ofrendas que expresan gratitud, perdón y amor.',
    questions: ['¿De qué maneras podemos decir "gracias" a Dios o a nuestra familia hoy?', '¿Por qué es importante pedir perdón?', '¿Qué ofrenda no material te gustaría dar a alguien?'],
    activity: '¡Escribe una carta de agradecimiento a alguien especial!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Tzav': {
    summary_kids: 'Dios instruye a Aarón y a los sacerdotes a mantener el fuego del altar encendido continuamente, enseñando que la dedicación a las buenas acciones nunca debe apagarse.',
    questions: ['¿Cómo mantienes encendido tu entusiasmo por aprender?', '¿Qué buenas acciones podemos hacer todos los días?', '¿Por qué el fuego es un símbolo de energía y fe?'],
    activity: '¡Dibuja una antorcha o fogata con llamas de colores vivos!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Shemini': {
    summary_kids: 'Aarón y sus hijos asumen sus funciones. Dios les da las leyes de Kashrut, explicando cuáles animales terrestres, aves y peces son kosher (aptos) para comer para vivir con santidad.',
    questions: ['¿Qué alimentos kosher te gustan más?', '¿Por qué es bueno cuidar lo que comemos?', '¿Qué animales terrestres kosher conoces que rumian y tienen pezuña partida?'],
    activity: '¡Dibuja una manzana y miel o alimentos saludables kosher!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Tazria': {
    summary_kids: 'Leemos sobre el cuidado de la salud física y espiritual de la piel y el cuerpo, y cómo las personas enfermas eran cuidadas con respeto por el sacerdote hasta sanar.',
    questions: ['¿Cómo cuidas tu cuerpo y tu salud diariamente?', '¿Por qué es importante visitar y animar a los enfermos?', '¿Qué te hace sentir saludable y fuerte?'],
    activity: '¡Dibuja un botiquín de primeros auxilios lleno de curitas divertidas!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Metzora': {
    summary_kids: 'Esta semana leemos sobre la purificación y limpieza de los hogares. Se nos enseña a cuidar nuestras palabras para no hablar mal de los demás, un valor judío llamado cuidar la lengua (*Shmirat HaLashón*).',
    questions: ['¿Por qué las palabras pueden sanar o lastimar como una herida?', '¿Cómo puedes usar tus palabras para alegrar el día de alguien?', '¿Qué significa hablar con la verdad?'],
    activity: '¡Dibuja una boca sonriente diciendo palabras hermosas como "Paz" y "Amistad"!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Acharei Mot': {
    summary_kids: 'Se instruye sobre el servicio especial de Yom Kipur, el Día del Perdón. Moshé enseña que debemos limpiar nuestros corazones de enojos y resentimientos.',
    questions: ['¿A quién te gustaría pedir disculpas antes de Yom Kipur?', '¿Qué se siente cuando perdonas sinceramente a un amigo?', '¿Cómo podemos comenzar de nuevo con alegría?'],
    activity: '¡Dibuja un corazón limpio rodeado de flores!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Kedoshim': {
    summary_kids: 'Dios dice: "Sean santos, porque Yo soy santo". Aquí encontramos el mandamiento fundamental: "Amarás a tu prójimo como a ti mismo", respetando a los ancianos, dejando comida para los pobres y hablando con justicia.',
    questions: ['¿Cómo podemos aplicar "amar al prójimo" en la escuela hoy?', '¿Por qué debemos respetar y escuchar a las personas mayores?', '¿Qué significa ser una persona santa o buena en la vida cotidiana?'],
    activity: '¡Dibuja un puente conectando a personas de diferentes países agarradas de la mano!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Emor': {
    summary_kids: 'Esta semana se describen las festividades del año: Pésaj, Shavuot, Rosh Hashaná, Yom Kipur y Sucot, enseñando que el tiempo es un regalo que debemos celebrar en comunidad.',
    questions: ['¿Cuál es tu festividad judía favorita y por qué?', '¿Qué costumbres de Sucot o Rosh Hashaná recuerdas con cariño?', '¿Por qué celebramos con comida y cantos especiales?'],
    activity: '¡Dibuja un calendario con dibujos de shofar, matzá y sucá!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Behar': {
    summary_kids: 'Dios introduce las leyes del año de descanso para la tierra de Israel (*Shemitá*). Cada siete años, la tierra descansa sin cultivos, recordando que el mundo es de Dios y debemos compartir su abundancia.',
    questions: ['¿Por qué la tierra y la naturaleza necesitan descansar?', '¿Cómo podemos cuidar los bosques y el agua hoy?', '¿Qué significa confiar en que siempre tendremos lo necesario?'],
    activity: '¡Dibuja un árbol lleno de frutas y animales comiendo libremente!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Bechukotai': {
    summary_kids: 'Dios promete bendiciones de lluvias y cosechas abundantes si el pueblo sigue los caminos de la Torá y vive con paz y seguridad en la tierra de Israel.',
    questions: ['¿Cómo crees que se siente vivir en un lugar con paz total?', '¿Por qué la lluvia es tan importante para la vida?', '¿Qué bendición te gustaría pedir para el mundo hoy?'],
    activity: '¡Dibuja un hermoso arcoíris sobre campos verdes de trigo!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },

  // --- BAMIDBAR (NÚMEROS) ---
  'Bamidbar': {
    summary_kids: 'Comienza el libro del desierto. Dios pide contar a las familias y tribus de Israel. Cada tribu tiene su propia bandera de colores y se organiza en un campamento alrededor del santuario.',
    questions: ['Si tuvieras una bandera familiar, ¿de qué color sería y qué dibujo tendría?', '¿Por qué es importante que cada persona cuente en una comunidad?', '¿Cómo te organizarías para viajar por el desierto?'],
    activity: '¡Diseña y colorea la bandera de tu propia familia!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Nasso': {
    summary_kids: 'Moshé enseña la hermosa Bendición Sacerdotal (*Birkat Cohanim*): "Que Dios te bendiga y te proteja, que te mire con gracia y te conceda paz", que los padres dicen a sus hijos cada viernes.',
    questions: ['¿Cómo te sientes cuando tus padres te bendicen en Shabat?', '¿Qué significa pedir protección y paz para alguien?', '¿Cómo puedes desear cosas buenas a tus amigos hoy?'],
    activity: '¡Dibuja dos manos abiertas en el gesto tradicional de la bendición sacerdotal!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Beha\'alotcha': {
    summary_kids: 'Aarón enciende la Menorá. El pueblo avanza en el desierto siguiendo una nube de día y una columna de fuego de noche. Cuando el arca se movía, Moshé cantaba "¡Levántate, Dios!".',
    questions: ['¿Cómo te imaginas una columna de fuego alumbrando el camino nocturno?', '¿Qué canción te gusta cantar cuando sales de viaje?', '¿Por qué la Menorá es un símbolo de luz para todo el pueblo?'],
    activity: '¡Dibuja la Menorá con llamas doradas apuntando al centro!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Sh\'lach': {
    summary_kids: 'Doce espías son enviados a explorar la tierra de Israel. Diez regresan asustados, pero Calev y Yehoshúa dicen con valentía: "¡La tierra es buenísima y muy dulce!". El pueblo aprende a confiar en el futuro.',
    questions: ['¿Alguna vez probaste una fruta enorme y dulce? ¿Cómo era?', '¿Por qué Calev y Yehoshúa fueron valientes y optimistas?', '¿Cómo podemos superar nuestros miedos?'],
    activity: '¡Dibuja a dos personas cargando un racimo de uvas gigante!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Korach': {
    summary_kids: 'Kóraj y sus seguidores cuestionan el liderazgo de Moshé. Para resolver la disputa, el bastón de madera de Aarón florece milagrosamente y brota almendras, mostrando que es el líder elegido con dulzura.',
    questions: ['¿Cómo se puede resolver un conflicto conversando en lugar de discutir?', '¿Cómo imaginas un bastón de madera seca floreciendo con flores y almendras?', '¿Qué hace a un buen líder comunitario?'],
    activity: '¡Dibuja una rama de almendro con hermosas flores blancas y rosadas!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Chukat': {
    summary_kids: 'El pueblo viaja y necesita agua. Moshé le habla a una roca y de ella brota un manantial de agua fresca y cristalina para calmar la sed de toda la comunidad en el desierto.',
    questions: ['¿Qué valor tiene el agua fresca en un día caluroso en el desierto?', '¿Cómo imaginas un río naciendo de una roca sólida?', '¿Por qué debemos cuidar los recursos naturales de la comunidad?'],
    activity: '¡Dibuja agua fresca brotando de una gran roca gris!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Balak': {
    summary_kids: 'El rey Balak envía al profeta Bilam a maldecir a Israel. En el camino, la burra de Bilam ve a un ángel y le habla. Al llegar, en lugar de maldiciones, Bilam exclama: "¡Qué hermosas son tus tiendas, oh Jacob!".',
    questions: ['¿Qué harías si tu mascota te hablara de repente?', '¿Por qué las palabras de Bilam se convirtieron en bendiciones?', '¿Qué hace que un hogar sea hermoso y acogedor?'],
    activity: '¡Dibuja una tienda de Shabat decorada y acogedora!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Pinchas': {
    summary_kids: 'Se organiza un censo y las hijas de Tzlofjad reclaman con valentía heredar la tierra de su padre. Moshé consulta a Dios, quien le da la razón, estableciendo derechos justos para las mujeres.',
    questions: ['¿Por qué las hijas de Tzlofjad fueron valientes al hablar?', '¿Qué significa ser justos con todos por igual?', '¿Cómo defiendes tú lo que crees que es correcto?'],
    activity: '¡Dibuja a cinco hermanas sonrientes tomadas de la mano!',
    illustration: 'images/pinchas_illustration.jpg',
    coloring: 'images/pinchas_coloring.jpg'
  },
  'Matot': {
    summary_kids: 'Moshé enseña sobre la importancia de cumplir las promesas y mantener la palabra empeñada. Las tribus de Reubén y Gad piden cuidar sus ganados en verdes praderas comprometiéndose a ayudar al resto.',
    questions: ['¿Por qué es tan importante cumplir cuando prometes algo?', '¿Qué se siente cuando alguien no cumple su palabra?', '¿Cómo podemos ser confiables para los demás?'],
    activity: '¡Dibuja a un pastor cuidando ovejas en una colina verde!',
    illustration: 'images/matot_illustration.jpg',
    coloring: 'images/matot_coloring.jpg'
  },
  'Masei': {
    summary_kids: 'Se repasan los 42 viajes del pueblo de Israel por el desierto, desde la salida de Egipto hasta las orillas del río Jordán, recordando que el camino recorrido nos hace sabios.',
    questions: ['¿Qué viaje recuerdas con más cariño?', '¿Qué aprendiste en tu última aventura o paseo?', '¿Por qué es bueno recordar el camino que hemos recorrido en la vida?'],
    activity: '¡Dibuja un mapa con caminos, desiertos y montañas!',
    illustration: 'images/masei_illustration.jpg',
    coloring: 'images/masei_coloring.jpg'
  },

  // --- DEVARIM (DEUTERONOMIO) ---
  'Devarim': {
    summary_kids: 'Moshé reúne al pueblo antes de cruzar a la Tierra Prometida y comienza su gran discurso, recordando con cariño todas las lecciones del desierto y animándolos a ser una comunidad justa.',
    questions: ['¿Qué lecciones te gustaría enseñar a niños más pequeños?', '¿Por qué los discursos y palabras de despedida son especiales?', '¿Qué significa avanzar hacia una meta con ilusión?'],
    activity: '¡Dibuja a Moshé hablando ante todo el pueblo reunido!',
    illustration: 'images/devarim_illustration.jpg',
    coloring: 'images/devarim_coloring.jpg'
  },
  'Va\'etchanan': {
    summary_kids: 'Moshé enseña el *Shemá Israel* ("Escucha Israel, Dios es Uno"), la oración más importante del judaísmo. Pide amar a Dios con todo el corazón, enseñar la Torá a los hijos y colocar la Mezuzá en las puertas.',
    questions: ['¿Cuándo rezas o piensas en el Shemá en tu rutina diaria?', '¿Qué hay dentro de una Mezuzá y por qué la tocamos al entrar?', '¿Cómo demuestras amor por las tradiciones de tu familia?'],
    activity: '¡Dibuja una hermosa Mezuzá con la letra hebrea Shin!',
    illustration: 'images/vaetchanan_illustration.jpg',
    coloring: 'images/vaetchanan_coloring.jpg'
  },
  'Eikev': {
    summary_kids: 'Moshé describe la belleza de Israel, una tierra bendecida con trigo, cebada, uvas, higos, granadas, aceitunas y dátiles (las siete especies). Nos enseña a agradecer después de comer (*Birkat Hamazón*).',
    questions: ['¿Cuál de los siete frutos de Israel te gusta comer más?', '¿Por qué daremos gracias después de comer en lugar de solo antes?', '¿Cómo te sientes después de compartir una buena comida en Shabat?'],
    activity: '¡Dibuja una canasta llena de granadas, higos y uvas!',
    illustration: 'images/eikev_illustration.jpg',
    coloring: 'images/eikev_coloring.jpg'
  },
  'Re\'eh': {
    summary_kids: 'Moshé pone ante el pueblo la bendición si siguen la justicia y la ética. Enseña a ser generosos abriendo la mano a los necesitados y a celebrar las tres fiestas de peregrinación con gran alegría comunitaria.',
    questions: ['¿Cómo podemos "abrir la mano" y compartir con alguien necesitado hoy?', '¿Qué te da más alegría de celebrar las fiestas de la sinagoga?', '¿Qué significa tener un corazón generoso?'],
    activity: '¡Dibuja una mano abierta entregando tzedaká (monedas de caridad) a otra!',
    illustration: 'images/reeh_illustration.jpg',
    coloring: 'images/reeh_coloring.jpg'
  },
  'Shoftim': {
    summary_kids: 'Moshé instruye establecer jueces justos y honestos bajo el principio de "Justicia, justicia perseguirás". También nos enseña a cuidar la naturaleza, prohibiendo talar árboles frutales incluso en tiempos difíciles.',
    questions: ['¿Por qué es importante que las reglas se apliquen de forma justa para todos?', '¿Cómo defiendes a alguien cuando ves que lo tratan de forma injusta?', '¿Por qué debemos proteger los árboles frutales y las plantas?'],
    activity: '¡Dibuja un árbol cargado de manzanas rojas y una balanza de justicia!',
    illustration: 'images/shoftim_illustration.jpg',
    coloring: 'images/shoftim_coloring.jpg'
  },
  'Ki Teitzei': {
    summary_kids: 'Esta semana se enseñan muchas leyes cotidianas de bondad: devolver los objetos perdidos a sus dueños, ayudar a descargar un animal cansado y construir una baranda de seguridad en los techos de las casas para evitar accidentes.',
    questions: ['¿Qué haces cuando encuentras algo en el patio de la escuela que no es tuyo?', '¿Cómo podemos cuidar la seguridad física en nuestras casas y escuelas?', '¿Cómo podemos ayudar a un amigo que está cansado o abrumado?'],
    activity: '¡Dibuja a un niño devolviendo un juguete perdido a su dueño sonriente!',
    illustration: 'images/kiteitzei_illustration.jpg',
    coloring: 'images/kiteitzei_coloring.jpg'
  },
  'Ki Tavo': {
    summary_kids: 'Moshé enseña a llevar las primeras frutas de la cosecha (*Bicurim*) en canastas al templo con alegría y gratitud. Dios le recuerda al pueblo que son especiales y que siempre deben vivir con regocijo por el bien recibido.',
    questions: ['Si tuvieras que hacer una canasta de gratitud con cosas de tu vida, ¿qué pondrías dentro?', '¿Por qué es bueno agradecer por las cosas sencillas que tenemos?', '¿Qué te hace sentir feliz y bendecido hoy?'],
    activity: '¡Dibuja una hermosa canasta llena de flores y las primeras frutas de la estación!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Nitzavim': {
    summary_kids: 'Moshé declara que todo el pueblo, desde los ancianos hasta los niños, está de pie firmando el pacto con Dios. Enseña que la Torá no está lejos en el cielo, sino "muy cerca de ti, en tu boca y en tu corazón para cumplirla".',
    questions: ['¿Cómo guardas tú las enseñanzas de tus padres en tu corazón?', '¿Por qué las cosas importantes de la vida a veces están más cerca de lo que pensamos?', '¿Qué significa comprometerse a ser una buena persona?'],
    activity: '¡Dibuja a personas reunidas formando un gran círculo tomadas de la mano!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Vayeilech': {
    summary_kids: 'Moshé, con 120 años, se despide con amor del pueblo y bendice a Yehoshúa (Josué) como nuevo líder, pidiéndole que sea fuerte y muy valiente para guiar a todos en la nueva etapa.',
    questions: ['¿Cómo te despides de tus maestros o amigos al terminar el año?', '¿Qué cualidades crees que necesita Josué para guiar al pueblo?', '¿Quién te da fuerzas y te inspira a ser valiente?'],
    activity: '¡Dibuja a Moshé pasando suavemente su mano sobre el hombro de Josué en señal de apoyo!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'Haazinu': {
    summary_kids: 'Moshé canta una canción poética y hermosa al pueblo, comparando las palabras de la Torá con la lluvia suave y el rocío que hacen crecer la hierba y florecer los campos.',
    questions: ['¿Por qué las buenas palabras son como gotas de lluvia en la tierra seca?', '¿Qué canción te hace sentir en paz o te recuerda a la naturaleza?', '¿Cómo imaginas el rocío de la mañana sobre las hojas?'],
    activity: '¡Dibuja gotas de lluvia cayendo sobre coloridas flores silvestres!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  },
  'V\'Zot HaBerachah': {
    summary_kids: 'La última parashá de la Torá. Moshé bendice a cada una de las tribus y sube al monte Nebó a mirar la hermosa Tierra de Israel. Al terminar, el rollo se reinicia inmediatamente para volver a empezar con Bereshit, celebrando Simjat Torá.',
    questions: ['¿Por qué crees que volvemos a empezar a leer la Torá desde el principio apenas la terminamos?', '¿Qué bendición especial te gustaría dar a toda tu comunidad judía?', '¿Cómo celebras Simjat Torá bailando con los rollos?'],
    activity: '¡Dibuja un rollo de Torá abierto decorado con cintas y coronas alegres!',
    illustration: 'images/torah_illustration.jpg',
    coloring: 'images/torah_coloring.jpg'
  }
};

const TRIVIA_DATA = {
  'Bereshit': [
    {
      q: '¿En cuántos días creó Dios el mundo?',
      a: ['6 días', '10 días', '1 día'],
      c: 0
    },
    {
      q: '¿Quiénes fueron las primeras personas en el Jardín del Edén?',
      a: ['Adán y Javá', 'Noaj y su esposa', 'Abraham y Sara'],
      c: 0
    },
    {
      q: '¿Qué día especial es para descansar y disfrutar en familia?',
      a: ['Shabat', 'Rosh Hashaná', 'Purim'],
      c: 0
    }
  ],
  'Noach': [
    {
      q: '¿Qué construyó Noaj para salvar a los animales?',
      a: ['Un arca gigante', 'Un castillo de piedra', 'Un puente de madera'],
      c: 0
    },
    {
      q: '¿Qué señal puso Dios en el cielo después de la lluvia?',
      a: ['Un arcoíris', 'Una estrella brillante', 'Una nube dorada'],
      c: 0
    },
    {
      q: '¿Cuántos animales de cada especie invitó Noaj al menos?',
      a: ['Dos (pareja)', 'Cinco', 'Diez'],
      c: 0
    }
  ],
  'Lech Lecha': [
    {
      q: '¿Qué significa "Lech Lechá"?',
      a: ['Ve por ti / Camina', 'Quédate en casa', 'Come pan'],
      c: 0
    },
    {
      q: '¿Quién fue el primer patriarca que viajó a la tierra prometida?',
      a: ['Abraham', 'Moshé', 'David'],
      c: 0
    },
    {
      q: '¿A quién llevó Abraham en su viaje?',
      a: ['A su esposa Sara y su sobrino Lot', 'Al Faraón', 'A Noaj'],
      c: 0
    }
  ],
  'Shemot': [
    {
      q: '¿Dónde puso su madre al bebé Moshé para salvarlo?',
      a: ['En una canasta en el río', 'En un cofre de oro', 'En una cueva'],
      c: 0
    },
    {
      q: '¿Quién encontró a Moshé flotando en el río Nilo?',
      a: ['La hija del Faraón', 'Sara', 'Rebeca'],
      c: 0
    },
    {
      q: '¿Qué vio Moshé en el desierto que ardía pero no se consumía?',
      a: ['Una zarza (arbusto)', 'Una antorcha', 'Una piedra mágica'],
      c: 0
    }
  ],
  'Yitro': [
    {
      q: '¿En qué montaña recibió Moshé las Tablas de la Ley?',
      a: ['Monte Sinaí', 'Monte Ararat', 'Monte Moria'],
      c: 0
    },
    {
      q: '¿Cuántos son los Mandamientos principales escritos en las Tablas?',
      a: ['10 mandamientos', '5 mandamientos', '100 mandamientos'],
      c: 0
    },
    {
      q: '¿Cómo se llama el suegro de Moshé que da nombre a esta parashá?',
      a: ['Yitró', 'Aarón', 'Abraham'],
      c: 0
    }
  ]
};

const TRIVIA_FALLBACK = [
  {
    q: '¿Cuántos libros forman la Torá?',
    a: ['Cinco (5)', 'Tres (3)', 'Diez (10)'],
    c: 0
  },
  {
    q: '¿En qué idioma está escrita la Torá originalmente?',
    a: ['Hebreo', 'Español', 'Latín'],
    c: 0
  },
  {
    q: '¿Cómo llamamos al rollo de pergamino donde se escribe la Torá?',
    a: ['Sefer Torá', 'Sidur', 'Tanaj'],
    c: 0
  }
];

const PLAY_SCRIPTS = {
  'Bereshit': {
    cast: 'Narrador, Creador (Voz de arriba), Adán, Javá',
    dialogue: [
      { p: 'Narrador', d: 'En el principio de todo, no había nada de luz. Estaba todo muy oscuro.' },
      { p: 'Voz (Arriba)', d: '¡Que se haga la luz! (Enciende la linterna de su móvil y sonríe).' },
      { p: 'Narrador', d: 'Y apareció la luz. Luego hizo los árboles, los animales y a Adán y Javá.' },
      { p: 'Adán', d: '¡Hola! Qué lindo lugar. Mira todos estos frutos deliciosos.' },
      { p: 'Javá', d: '¡Sí! Pero recuerda que el séptimo día descansamos. ¡Feliz Shabat a todos!' }
    ]
  },
  'Noach': {
    cast: 'Narrador, Noaj, Jirafa, Elefante',
    dialogue: [
      { p: 'Narrador', d: 'Noaj está construyendo un barco enorme porque va a llover mucho.' },
      { p: 'Noaj', d: '¡Suban todos al barco, rápido! ¡De dos en dos, no se empujen!' },
      { p: 'Jirafa', d: '¡Cuidado con mi cuello largo al entrar, casi toco el techo!' },
      { p: 'Elefante', d: '¡Y cuidado con mis orejas gigantes! (Hace sonido de trompa: ¡Pruuu!).' },
      { p: 'Narrador', d: 'Todos se salvaron y al final vieron un hermoso arcoíris de promesa en el cielo.' }
    ]
  },
  'Lech Lecha': {
    cast: 'Narrador, Abraham, Sara',
    dialogue: [
      { p: 'Narrador', d: 'Dios le habla a Abraham y le pide viajar a una tierra nueva.' },
      { p: 'Abraham', d: 'Sara, empaca las maletas, ¡emprendemos un gran viaje!' },
      { p: 'Sara', d: 'Pero Abraham, ¿a dónde vamos? ¿Tenemos mapa?' },
      { p: 'Abraham', d: 'No lo sé exactamente, pero confío en que Dios nos guiará y cuidará en el camino.' },
      { p: 'Narrador', d: 'Y así, con fe y mucha valentía, iniciaron su gran aventura familiar.' }
    ]
  },
  'Shemot': {
    cast: 'Narrador, Moshé, Princesa de Egipto',
    dialogue: [
      { p: 'Narrador', d: 'Un bebé flota en una canasta en el río Nilo. La princesa lo ve.' },
      { p: 'Princesa', d: '¡Oh, miren! Un bebé hermoso. Lo llamaré Moshé, porque lo salvé de las aguas.' },
      { p: 'Narrador', d: 'Años después, Moshé ve un arbusto ardiendo en el desierto.' },
      { p: 'Moshé', d: '¡Wow! Este arbusto tiene fuego pero no se quema. ¡Es una señal de Dios!' },
      { p: 'Narrador', d: 'Así fue elegido para guiar al pueblo hacia la libertad.' }
    ]
  },
  'Yitro': {
    cast: 'Narrador, Moshé, Pueblo de Israel',
    dialogue: [
      { p: 'Narrador', d: 'Moshé baja del Monte Sinaí con las Tablas de los Diez Mandamientos.' },
      { p: 'Moshé', d: '¡Traigo las palabras más importantes para vivir en paz y amor!' },
      { p: 'Pueblo', d: '¡Naasé Vnishmá! ¡Haremos todo lo que dice la Torá con alegría!' },
      { p: 'Narrador', d: 'Y desde ese momento, la Torá se convirtió en el tesoro de nuestro pueblo.' }
    ]
  }
};

const PLAY_SCRIPT_FALLBACK = {
  cast: 'Narrador, Padre A (Preguntón), Padre B (Sabio)',
  dialogue: [
    { p: 'Narrador', d: 'Dos padres conversan sobre la enseñanza de la parashá de la semana en la sinagoga.' },
    { p: 'Padre A', d: '¡Qué historia tan bonita leímos hoy en la Torá! Pero, ¿cómo se la explicamos a los niños?' },
    { p: 'Padre B', d: 'Es simple: nos enseña a ser buenos amigos, compartir lo que tenemos y festejar el Shabat con amor.' },
    { p: 'Padre A', d: '¡Tienes toda la razón! Vamos a actuarlo para ellos. ¡Shabat Shalom!' },
    { p: 'Narrador', d: 'Y todos los niños aplaudieron y compartieron jalá.' }
  ]
};

