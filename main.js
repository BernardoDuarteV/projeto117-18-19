quickDrawDataset=["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus", "axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear", "beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang", "bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly", "cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot", "castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup", "compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond"];

randomNumber = Math.floor((Math.random() * quickDrawDataset.length) + 1 );
console.log(quickDrawDataset[randomNumber]);
sketch = quickDrawDataset[randomNumber];
document.getElementById('sketchName').innerHTML = 'Esboço a ser Desenhado: ' + sketch;

timerCounter = 0;
timerCheck = "";
drawnSketch = "";
answerHolder = "";
Score = 0;

function updateCanvas() {
background("white");
randomNumber = Math.floor((Math.random() * quickDrawDataset.length) + 1 );
console.log(quickDrawDataset[randomNumber]);
sketch = quickDrawDataset[randomNumber];
document.getElementById('sketchName').innerHTML = 'Esboço a ser Desenhado: ' + sketch;
}

function preload() {
classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
canvas = createCanvas(280, 280);
canvas.center();
background("white")
canvas.mouseReleased(classifyCanvas);
}

function draw() {
strokeWeight(13);
stroke(0);

if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
}

checkSketch();
if (drawnSketch == sketch)
{
    answerHolder = "set";
    score++;
    document.getElementById("score").innerHTML = 'Pontuação: ' + score;
}
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
if (error) {
    console.error(error);
}
console.log(results);
drawnSketch = results[0].label;
document.getElementById('label').innerHTML = 'Seu esboço: ' + drawnSketch.replace("_", " ");

document.getElementById('confidence').innerHTML = 'Precisão: ' + Math.round(results[0].confidence * 100) + '%';
}

function checkSketch() {
timerCounter++;
document.getElementById('time').innerHTML = 'Tempo: ' + timerCounter;
console.log(timerCounter);
if(timerCounter > 400) {
    timerCounter = 0;
    timerCheck = "completed";
}
if(timerCheck == "completed" || answerHolder == "set") {
    timerCheck = "";
    answerHolder = "";
    updateCanvas();
}
}

 