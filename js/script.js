// Each time this function is called a GameObject
// is create based on the arguments
// In JavaScript you can consider everything an Object
// including functions
var canvas = document.getElementById("the_canvas");
var ctx = canvas.getContext("2d");

var count = 0;
////////////////////////////////////////////////////////////////////////////////////////
// Audio
////////////////////////////////////////////////////////////////////////////////////////

var tier1Audio = new Audio();
tier1Audio.src = 'tier1.mp3'
var tier2Audio = new Audio();
tier2Audio.src = 'tier2.mp3'
var tier3Audio = new Audio();
tier3Audio.src = 'tier3.mp3'

var themeMusic = new Audio();
themeMusic.src = 'themesong.mp3'


var playerImage = new Image();
playerImage.src = "./img/playerCharacter.png";
var enemyImage = new Image();
enemyImage.src = "./img/EnemyCharacter.png";
var background = new Image();
background.src = "./img/canvas.jpg";

background.onload = function(){
	ctx.drawImage(background,0,0);
}

var attackChance = 2;
var enemyAttackChance = 2;
var endMove = true;
////////////////////////////////////////////////////////////////////////////////////////
// Player related variables!
////////////////////////////////////////////////////////////////////////////////////////

var PlayerMoney = 0;
var PlayerMoneyIncrement = 1;
document.getElementById("myMoney").innerHTML = PlayerMoney;

var PlayerExperiencePoints = 0;
var PlayerExperiencePointsIncrement = 1;

var LevelUp = false;

var PlayerAttackDamage = 2;
var PlayerAttackDamageIncrement = 1;

var PlayerHealth = 25;
var RestoreHealthAmount = 10;
///////////////////////////////////////////////////////////////////////////////////////
// Enemy related variables
////////////////////////////////////////////////////////////////////////////////////////

var EnemyHealth = 25;

var EnemyAttackDamage = 2;

var EnemyExperiencePoints = 0;
var EnemyExperencePointsIncrement = 1;

var EnemyLevelUp = false;

// Functions
function AddMoneyToPlayer() {
	PlayerMoney = PlayerMoney + PlayerMoneyIncrement;
}

function AddDamagePointsToPlayer() {
	PlayerAttackDamage = PlayerAttackDamage + PlayerAttackDamageIncrement;	
}

function BuyDamagePoints() {
	if (PlayerMoney < 3) {
		alert("You do not have enough Money!");
	}
	
	if (PlayerMoney >= 3) {
		AddDamagePointsToPlayer();
		PlayerMoney = PlayerMoney - 3;
	}
}

function BuyExperiencePoints() {
	if (PlayerMoney < 2) {
		alert("You do not have enough Money!");
	}
	if (PlayerMoney >= 2) {
		AddExperiencePointsToPlayer();
		PlayerMoney = PlayerMoney - 2;
	}
}

function AddExperiencePointsToPlayer() {
	PlayerExperiencePoints = PlayerExperiencePoints + PlayerExperiencePointsIncrement;
}

function RestorePlayerHealth() {
	PlayerHealth = PlayerHealth + RestoreHealthAmount;
	
	if (PlayerHealth > 25) {
		PlayerHealth = 25;
	}
}

function CheckXPForLevelUp() {
	if (PlayerExperiencePoints == 3) {
		AddDamagePointesToPlayer();
		PlayerExperiencePoints = 0;
		//RestorePlayerHealth();
		
		//alert("You have levelled up!");
		//alert("Your damage has increased by 1!");
		//alert("Your health has been restored!");
	}
}

function getRandomInt(attackChance) {
	return Math.floor(Math.random() * Math.floor(attackChance));
}


function Tier1Attack() {
	if (endMove = true) {
		console.log("I played audio");
		tier1Audio.play();
	
		EnemyHealth = EnemyHealth - PlayerAttackDamage;
		alert ("Damage Given: " + PlayerAttackDamage);
		alert ("Enemy Health: " + EnemyHealth);
		endMove = false;
	
		enemyAttackChoice();
	}
	else {
		alert("You have to end the turn to be able to attack again!")
	}
}

function Tier2Attack() {
	
	if (endMove = true) {
		if (getRandomInt(attackChance) == 1) {
			console.log("I played audio");
			tier2Audio.play();
		
			EnemyHealth = EnemyHealth - (PlayerAttackDamage + 2);
			var newDamage = PlayerAttackDamage + 2;
			alert("Damage given: " + newDamage);
			alert ("Enemy Health: " + EnemyHealth);
			endMove = false;
		}
		else {
			alert("Attack missed!");
		}
		enemyAttackChoice();
	}
	else {
		alert("You have to end the turn to be able to attack again!")
	}
}

function Tier3Attack() {

	if (endMove = true) {
		attackChance = 4;
		if (getRandomInt(attackChance) == 1) {
			console.log("I played audio");
			tier3Audio.play();
		
			EnemyHealth = EnemyHealth - (PlayerAttackDamage + 3);
			var newDamage = PlayerAttackDamage + 3;
			alert("Damage given: " + newDamage);
			alert ("Enemy Health: " + EnemyHealth);
			endMove = false;
		}
		else {
			alert("Attack missed!");
		}
		enemyAttackChoice();
	}
	else {
		alert("You have to end the turn to be able to attack again!")
	}
}
/////////////////////////////////////////////////////////////////////////
// Enemy attacks
/////////////////////////////////////////////////////////////////////////
function enemyAttackChoice() {
	var randomAttackNumber = getRandomInt(3);
	
	if (randomAttackNumber == 0) {
		EnemyTier1Attack();
	}
	if (randomAttackNumber == 1) {
		EnemyTier2Attack();
	}
	if (randomAttackNumber == 2) {
		EnemyTier3Attack();
	}
}

function EnemyTier1Attack() {
	PlayerHealth = PlayerHealth - EnemyAttackDamage;
	
	alert ("Damage taken: " + EnemyAttackDamage);
	alert ("Your Health: " + PlayerHealth);
	
}

function EnemyTier2Attack() {
	if (1 == getRandomInt(enemyAttackChance)) {
		PlayerHealth = PlayerHealth - (EnemyAttackDamage + 2);
		
		var newDamage = EnemyAttackDamage + 2;
		alert("Damage taken: " + newDamage);
		alert ("Your Health: " + PlayerHealth);
	}
	else {
		alert("Enemy missed their attack");
	}
	
}
function EnemyTier3Attack() {
	attackChance = 4;
	if (1 == getRandomInt(enemyAttackChance)) {
		PlayerHealth = PlayerHealth - (EnemyAttackDamage + 3);
		
		var newDamage = EnemyAttackDamage + 3;
		alert("Damage taken: " + newDamage);
		alert ("Your Health: " + PlayerHealth);
	}
	else {
		alert("Enemy missed their attack");
	}
	
}

function HelpMenu() {
	console.log("The button is working now!");
	alert("To attack the enemy, use Tier 1, Tier 2, or Tier 3 attack");
	alert("Tier 1 Attack has 100% chance of hitting, dealing 2 damage");
	alert("Tier 2 Attack has 50% chance of hitting, dealing 4 damage");
	alert("Tier 3 Attack has 25% chance of hitting, dealing 5 damage");
	alert("You gain 1 coin after every turn, use your money to buy XP or Damage points");
	alert("End the turn after every attack!");
	
}

function checkHealth() {
	if (PlayerHealth <= 0) {
		gameOverLoss();
	}
	if (EnemyHealth <= 0) {
		gameOverWin();
	}
}

function gameOverLoss() {
	alert("You Lost! Refresh the browser to try again!");	
}

function gameOverWin() {
	alert("You Won!");
	alert("Congratulations!");
}

function endTurn() {
	// more to be added!
	endMove = true;
	AddMoneyToPlayer();
	AddExperiencePointsToPlayer();
	document.getElementById("myMoney").innerHTML = PlayerMoney;
	console.log(PlayerHealth);	
}
/////////////////////////////////////////////////////////////////////////
function drawPlayer() {
	ctx.drawImage(playerImage, 100, 100);
}

function drawEnemy() {
	ctx.drawImage(enemyImage, 1000, 100);
}
		
function gameloop() {
	checkHealth();
	CheckXPForLevelUp();
    drawPlayer();
	drawEnemy();
	count++;
	if (count == 1) {
		themeMusic.play();
		themeMusic.volume = 0.4;
	}		
    window.requestAnimationFrame(gameloop);
}
console.log("Loadan script.js!");
// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

