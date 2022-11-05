let xp = 0;
let health = 100;
let Gold = 50;
let currentWeapon = 0;
let fighting;
let inventory = ["stick"];
let monsterLife;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterName = document.querySelector("#monsterName");
const monsterHealth = document.querySelector("#monsterHealth");
const text = document.querySelector("#text");
const monsterStats = document.querySelector("#monsterStats");

const weapon = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "gun",
    power: 30,
  },
  {
    name: "shotgun",
    power: 50,
  },
  {
    name: "Sniper rifle",
    power: 100,
  },
];

const monsters = [
  {
    name: "terrorist",
    level: 2,
    health: 15,
  },
  {
    name: "Ghost",
    level: 8,
    health: 60,
  },
  {
    name: "Aliens",
    level: 20,
    health: 300,
  },
];

const locations = [
  {
    name: "town square",
    btn_text: ["Go to store", "Go to cave", "Fight Aliens"],
    btn_fuction: [goStore, goCave, fightAliens],
    text: "you are in  the town square....",
  },
  {
    name: "store",
    btn_text: ["Buy health(10 golds)", "buy weapon (30 golds)", "go to town"],
    btn_fuction: [buyHealth, buyWeapon, goTown],
    text: "you enter the store....",
  },
  {
    name: "cave",
    btn_text: ["fight terrorist", "fight Ghost", "go to town square"],
    btn_fuction: [fightSlime, fightBeast, goTown],
    text: "you enter the cave. You see some monsters...",
  },
  {
    name: "fight",
    btn_text: ["Attack", "Dodge", "Run"],
    btn_fuction: [attack, dodge, goTown],
    text: "you are fighting with monsters...",
  },
  {
    name: "Kill monster and Aliens",
    btn_text: ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
    btn_fuction: [goTown, goTown, easterEgg],
    text: "The monster screms 'Arg !' as it dies.You gain experience and find golds",
  },
  {
    name: "lose",
    btn_text: ["Replay?", "Replay?", "Replay?"],
    btn_fuction: [restart, restart, restart],
    text: "You die",
  },
  {
    name: "Win",
    btn_text: ["Replay?", "Replay?", "Replay?"],
    btn_fuction: [restart, restart, restart],
    text: "You defeated the Aliens ! You won the game",
  },
  {
    name: "Easter Egg",
    btn_text: ["2", "8","Go to Town Square" ],
    btn_fuction: [pickTwo, pickEight, goTown],
    text: "You find the secret game .pick a number above.Ten number will be randomly chosen between 0 and 10 .If the number you choose matches one of the random numbers ,you win !",
  },
  
];

button1.onclick = goStore;
// button2.addEventListener('click',goCave);
button2.onclick = goCave;
button3.onclick = fightAliens;

function update(locations) {
  monsterStats.style.display = "none";
  button1.innerText = locations.btn_text[0];
  button2.innerText = locations.btn_text[1];
  button3.innerText = locations.btn_text[2];
  // console.log('going to store');
  button1.onclick = locations.btn_fuction[0];
  button2.onclick = locations.btn_fuction[1];
  button3.onclick = locations.btn_fuction[2];
  text.innerText = locations.text;
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  // button1.innerText=
  console.log("going to cave");
  update(locations[2]);
}

function buyWeapon() {
  console.log("buying weapon");
  if (currentWeapon < weapon.length - 1) {
    if (Gold >= 30) {
      Gold -= 30;
      currentWeapon++;
      let newWeapon = weapon[currentWeapon].name;
      let power = weapon[currentWeapon].power;
      goldText.innerText = Gold;
      text.innerText = `you have new weapons ${newWeapon} and its power is ${power}.`;
      inventory.push(newWeapon);
      console.log(inventory);
      text.innerText += ` In Inventory ,you have : ${inventory}. `;
    } else {
      // alert('u r not sufficient gold')
      text.innerText = "you have not enough gold for buying weapons";
    }
  } else {
    text.innerText = `you have already  powerful weapon : ${weapon[currentWeapon].name} !`;
    button2.innerText = "sell weapons for 15 gold";
    button2.onclick = sellWeapons;
  }
  // healthText.innerText=health;
}

function sellWeapons() {
  if (inventory.length > 1) {
    Gold = Gold + 15;
    goldText.innerText = Gold;
    let newCurrentWeapon = inventory.shift();
    // console.log(newCurrentWeapon);
    text.innerText = `you sold a ${newCurrentWeapon} .`;
    text.innerText += `In inventory you have : ${inventory}`;
  } else {
    console.log("Don't sell your only weapon");
  }
}

function buyHealth() {
  console.log("buying helth");
  if (Gold >= 10) {
    Gold -= 10;
    health += 10;
    goldText.innerText = Gold;
    healthText.innerText = health;
    text.innerText = `you have now 10 additional health ,Current Health :${health} `;
  } else {
    text.innerText = "you have not enough gold for buying health";
  }
}

function goTown() {
  update(locations[0]);
}

function fightSlime() {
  console.log("fighting slime");
  fighting = 0;
  goFight();
}
function fightBeast() {
  console.log("fighting beast");
  fighting = 1;
  goFight();
}
function fightAliens() {
  // button1.innerText=
  console.log("fighting with dragon");
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterLife = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterHealth.innerText = monsterLife;
  monsterName.innerText = monsters[fighting].name;
}

function attack() {
  text.innerText = `The ${monsters[fighting].name} attacks. `;
  text.innerText += `You attack it with your ${weapon[currentWeapon].name}`;

if(isMonsterHit){
  health -= getMonsterAttackValue(monsters[fighting].level);
}
else{
  text.innerText="you miss";
}
  monsterLife -=weapon[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealth.innerText = monsterLife;
  if (health <= 0) {
    lose();
  } 
  else if (monsterLife <= 0) {
    // fighting === 2 ? winGame() : monsterDefeat();
    if(fighting===2){
      winGame();
    }
    else{
      monsterDefeat();
    }
  }
if(Math.random()<=.1 && inventory.length!==1){
    text.innerText=`Your ${inventory.pop()} breaks`
    currentWeapon--;
  }

}



function getMonsterAttackValue(level){

  let hit=(level*5)-(Math.floor(Math.random()*xp));
  // console.log(hit);
  return hit;

}

function isMonsterHit(){
  return Math.random()>.2 || health <20;
}

function dodge() {
  text.innerText = `you dodge the attack from the ${monsters[fighting].name} .`;
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function monsterDefeat() {
  Gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = Gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function restart() {
  xp = 0;
  health = 100;
  Gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = Gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg(){
  update(locations[7]);
}

function pickTwo(){
pick(2);
}
function pickEight(){
pick(8);
}

function pick(guess){

let numbers=[];
while( numbers.length<10){
  numbers.push(Math.floor(Math.random()*11));
}
text.innerText=`You picked ${guess}. Here are the random numbers:\n`;

for (let i=0;i<10;i++){
  text.innerText+= `${numbers[i]} \n` ;
}

if(numbers.indexOf(guess)){
  text.innerText +="Right ! you won the 20 gold";
  Gold+=20;
  goldText.innerText=Gold;
}
else{
  text.innerText +="Wrong ! you loss the 10 Health";
  health -=10;
  healthText.innerText=health;
  if(health<=0){
    lose();
  }
}
}