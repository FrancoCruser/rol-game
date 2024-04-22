/*En javaScript las variables son 
utilizadas para contener valores.
para usa una variable primero tenemos que declararla.
Por ejemplo para declarar una variable llamada
"camperbot" utilizaremos la siguiente expresion*/

const locations = [
  //estamos creando un array de objetos, que va a ser pasado como argumento
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  },
];

const weapons = [
  { name: "stick", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 },
];
const monsters = [
  { name: "slime", level: 2, health: 15 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 },
];

/* la palabra let le dice a javaScript que estas
declarando una variable*/

/* a las variables se les puede asignar un valor,
cuando hacemos esto mientras la estamos declarando
se llama "initialization" */

let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0; // El valor corresponde al index en weapons array

/*Cuando el nombre de la variable contiene muchas
palabras se javaScript se utiliza camelCase, es decir
que la primer palabra va en minuscula y la primer letra
de cada palaba que le siga debe ser mayuscula*/

let fighting; //la vamos a utilizar dentro de una funcion de pelea
let monsterHealth;

/* Todas la variables aca arriba tienen como valor
lo que denominamos numbers, javaScript posee muchos
tipos de valores, el siguiente a utilizar sera "strings"
que se utilizan para guardar texto o palabras, veamos*/

/* Las variables que se crean dentro de un bloque de codigo, puede ser en el caso de un if
solo puede ser scoped (accedida) dentro de ese bloque de codigo. esto se llama block scope. */
//let inventory = "stick";

/*Lo siguiente que aprenderemos son los ARRAY, es un tipo de datos
que permite contener multiples valores*/

let inventory = ["stick"];

/* javaScript interactua de manera dinamica con el HTML
utilizando el "DOM" "Document Objetc Model"
el DOM es un arbol de objetos que representan al HTML.
podemos acceder al HTML utilizando "document" que representa
el documento entero del HTML.
Uno de los tantos metodos para encontrar elementos especificos en el HTML
es utilizar el "querySelector()" que lo que hace es tomar un CSS selector 
como argumento y retorna el primer elemento que machea con ese selector
por ejemplo para encontrar el elemento <h1> escribiriamos

let h1 = document.querySelector("h1"); */

//let button1 = document.querySelector("#button1");

/* La variable button1 no va a ser reasignada, en estos casos, en los que 
no reasignaremos un valor a una variable es buena practica utilizar 
la declaracion "const" para que en caso de querer reasignarla nos tire error*/

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth"); //aca estamos llamando diferente a la variable porque ya la habiamos declarado

/* Functions son una herramienta especial que nos permite correr 
secciones de codigo en tiempos especificos. Para declarar una Fx
utilizamos la palabra "function"*/

function goTown() {
  update(locations[0]); //llamamos a la funcion update y le pasamos los argumentos de locations que es un array que contiene objetos. con [] lo que hacemos es llamar en base al numero de index el elemento que queremos
  //lo que estoy haciendo aca es basicamente llamando al primer elemento del array location
  // que seria Town square
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10; //En este caso, gold -= 10 es una forma abreviada de escribir gold = gold - 10.
    health += 10;
    goldText.innerText = gold; //una vez actualizado el valor lo tenemos que plasmar en
    healthText.innerText = health; //el juego por lo que modificamos las variables
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

/* IF el condicional if es utilizado para tomar decisiones en el codigo.
la palabra clave if es seguida de una (condicion). Si la condicion es true, el codigo
dentro de {} se ejecutrara, si la condicion es falsa, el codigo dentro de {} es saltado */
/*ELSE es lo que pasa si la condicion no se cumple*/

function attack() {
  text.innerText = "the " + monsters[fighting].name + " attacks.";
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + ".";
  //Tanto currentWeapon como fighting son referencia numericas que utilizamos como index para llamar al objeto en los arrays correspondientes
  health -= getMonsterAttackValue(monsters[fighting].level); //aca estoy recibiendo el ataque del monster correspondiente
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; // aca estoy atacando basandome en el poder del arma actual
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    //aca estamos usando otro operador logico que pide que ambos elementos sean verdaderos, en la segunda parte de la condicion lo que ese esta diciendo es si la longitud del array no es 1 es verdadero, si hay 1 solo elemento sera falso
    //aca nuevamente estamos buscando de manera random valores booleanos
    text.innerText += " Your " + inventory.pop() + " breaks.";
    //el method pop() de un array lo que hace es remover el ultimo elemento de un array
    //y retornarlo como un string
    currentWeapon--;
    //lo que estamos haciendo aca es basicamente una funcion random que retorne valores booleanos
    //cuando el valor de esta misma sea TRUE va agarrar el ultimo elemento del array inventory con el metho pop
    //y lo va a eliminar y mostrar, luego va a decrementar el valor de currentWeapon ya que bajaria su numero de index para poder ser utilzado en el resto del codigo
  }
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    //lo que estamos haciendo es que si el arma actual tiene menos valor de indice que la longitud del array de WEAPONS  podria comprar
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++; // el operador ++ incrementa en 1 el numero
      goldText.innerText = gold;
      let newWeapon = weapons;
      newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon); // utilizando el method push lo que hacemos es meter en el array de inventory la variable newWeapon
      text.innerText += " In your inventory you have: " + inventory; //estamos sumandole  mas texto en vez de ser borrado y actualizado.
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell Weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

/* operador logico OR || : El operador logico or usara el primer valor si es verdadero 
es decir cualquier cosa aparte de NaN,null,undefined,0, -0, On, "", y false. De lo
contrario, usara el segundo valor*/

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20; //aca estamos haciendo basicamente que retorne de manera random un valor booleano (true or false)
}

function getMonsterAttackValue(level) {
  //esto va hacer que el ataque se base en el nivel del monsters.level y la xp del pj
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit > 0 ? hit : 0; // Las funciones pueden retornar un valor para que sea utilizado en todo el codigo
}

function dodge() {
  text.innerText =
    "You dodge the attack from the " + monsters[fighting].name + ".";
}

function fightDragon() {
  fighting = 2; //index correspondiente al dragon
  goFight();
}

function fightBeast() {
  fighting = 1; //index correspondiente a fanged beast
  goFight();
}

function fightSlime() {
  fighting = 0; //index correspondiente al slime
  goFight();
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon;
    currentWeapon = inventory.shift(); //el metodo shift retorna el primer elemento del array
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory; //estamos sumandole  mas texto en vez de ser borrado y actualizado.
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0]; //aca lo que hacemos es usar los argumentos que le estamos pasando a la funcion update a travez de location
  button2.innerText = location["button text"][1]; // como "button text" es un array aclaramos que se trata del segundo index element
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text; // aca se utiliza "dot notation" en vez de "bracket notation"
}
/*la funcion update va usar la informacion de location que le pasan*/

//inicializando botones
/* Los botones tienen una property especial llamada onClick
que nos permite determinar que sucede cuando alguien clickea ese boton.
Hay diferentes formas de acceder a las propiedades en javaScript:
la primera es con un "punto"* por ejemplo:
button.onclick = unaFuncion;
*/

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

/* la propiedad "innerText" controla el texto que aparece en el HTML 
EJEMPLO:

<p id="info"> Demo </p>
const info = document.querySelector("#info"); 
info.innerText = "Hello World"; 

lo que estoy haciendo es utilizando DOM nombro una constante/variable que su contenido
va a ser #info es decir "demo", ese contenido va a ser modificado con la propiedad
innerText haciendo que cambie a "hello world"
*/
/*En el juego de rol podremos visitar diferentes location por lo que vamos a necesitar
crear una estructura de datos que contenga diferentes location, eso se hace con los array*/

/* esta vez utilizaremos otro tipo de dato, los llamados "OBJECTS", son similares
a los array pero con unas diferencias. Una de ellas es que los objetos usan propiedades,
o keys, para acceder y modificar datos 
los objetos se definen con {} 
y sus propiedades se escriben { key: value }
key es el nombre de la propiedad y value es el valor que contiene, ejemplo:
{ 
    name:"Franco Cruser"
}  */

/* Math object contiene propiedades estaticas y methods 
para constantes matematicas y funciones, unas de estas propiedades son:
Math.random() que lo que hace es generar un numero random entre 0(inclusive) y 1(exclusive)
Math.floor() redondea para abajo un numero dado. */

/* utilizando esto podriamos generar un numero random redondo entre cierto rango:
por ejemplo esto genera un numero redondo entre 1 y 5:
Math.floor(Math.random()*5) + 1; 
aca math floor va a redondear el numero que salga de Math.random * 5, y
como queremos que sea entre 1 y 5 tenemos que sumarle uno para que no redondee a 0*/

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  xpText.innerText = xp;
  healthText.innerText = health;
  goldText.innerText = gold;
  goTown();
}

/* a continuacion vamos a resolver un bug que ocurre cuando el user xp
es lo suficientemente alto como para que la funcion getMonsterAttackValue
retorne un numero negativo haciendo que en vez de restar HP lo sume al PJ
esto se soluciona con un operador ternario/ternary operator
el operador ternario es un condicional y puede ser usado como un
if-else de una linea, asi es la sintaxys:
"return condition ? expressionIfTrue : expressionIfFalse" */

function easterEgg() {
  update(locations[7]);
}

// FOR & WHILE FOR & WHILE FOR & WHILE

function pick(guess) {
  const numbers = [];
  // WHILE LOOP: el while loop accepta una condicion y corre el codigo en el bloque
  //hasta que la condicion deje de ser verdadera
  //vamos a crear un while que correra hasta que numbers.length es menor a 10
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers: \n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

// FOR LOOP: el loop a diferencia del while corre una especifica cantidad de veces
// son declarados con 3 expresiones separadas por punto y coma (a;b;c)
// a: la expresion de inicializacion
// b: es la condicion
// c: es la expresion final
//la expresion "a" se ejecuta una vez, antes de que empiece el loop, y es utilizada por lo general para definir y setear la variable del loop
//es como declarar un contador para usar en nuestro loop
//por lo general se usa la expresion "i" como contador y empiezan de 0
// La expresion "b", de condicion, se evalua all principio de cada interaccion del loop
// El loop continua siempre y cuando la condicion evaluada sea true
// Por ultimo, la ultima expresion "c", se ejecuta al final de cada interaccion del loop
//

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}
