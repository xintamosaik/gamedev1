
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");



function draw() {

    let randomColor = Math.random() > 0.5 ? '#ff8080' : '#0099b0';
    context.fillStyle = randomColor;
    context.fillRect(100, 50, 200, 175);

}
function gameLoop() {
    console.log("running")
    draw()
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);