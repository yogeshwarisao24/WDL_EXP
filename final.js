// Start Test
function startTest(){

let area = document.querySelector(".test-area");
let text = document.getElementById("testText");

area.classList.add("active");
text.innerText = "Testing...";

document.getElementById("loader").classList.remove("d-none");

let status = document.getElementById("status");

status.innerText = "Checking Ping...";

setTimeout(()=>{
let ping = Math.floor(Math.random()*40)+10;
document.getElementById("ping").innerText = ping + " ms";

status.innerText = "Testing Download...";
text.innerText = "Downloading...";

animateValue("download", Math.random()*100);

setTimeout(()=>{
status.innerText = "Testing Upload...";
text.innerText = "Uploading...";

animateValue("upload", Math.random()*50);

setTimeout(()=>{
status.innerText = "Test Completed ✅";
text.innerText = "Test Again";

area.classList.remove("active");
document.getElementById("loader").classList.add("d-none");

saveData(
ping,
document.getElementById("download").innerText.replace(" Mbps",""),
document.getElementById("upload").innerText.replace(" Mbps","")
);

},2000);

},2000);

},1000);
}

// Smooth value animation
function animateValue(id, max){
let el = document.getElementById(id);
let value = 0;

let interval = setInterval(()=>{
value += max/20;
if(value >= max){
value = max;
clearInterval(interval);
}
el.innerText = value.toFixed(2) + " Mbps";
},100);
}

// Save history
function saveData(ping, download, upload){
let date = new Date().toLocaleString();
let history = JSON.parse(localStorage.getItem("speedData")) || [];
history.push({date, ping, download, upload});
localStorage.setItem("speedData", JSON.stringify(history));
loadHistory();
}

// Load history
function loadHistory(){
let history = JSON.parse(localStorage.getItem("speedData")) || [];
let table = document.getElementById("historyTable");
table.innerHTML = "";

history.slice().reverse().forEach(item=>{
table.innerHTML += `
<tr>
<td>${item.date}</td>
<td>${item.ping} ms</td>
<td>${item.download} Mbps</td>
<td>${item.upload} Mbps</td>
</tr>`;
});
}

// Dark mode
function toggleMode(){
document.body.classList.toggle("light-mode");
}

// Clear history
function clearHistory(){
localStorage.removeItem("speedData");
loadHistory();
}

// Load on start
window.onload = loadHistory;

// Floating particles
for(let i=0;i<20;i++){
let p = document.createElement("div");
p.className = "particle";
p.style.left = Math.random()*100 + "vw";
p.style.animationDuration = (5 + Math.random()*5) + "s";
document.body.appendChild(p);
}
