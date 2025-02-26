let audioElement = document.getElementById("audio");
let canvasElement = document.getElementById("wave");
let wave = new Wave(audioElement, canvasElement);

wave.addAnimation(new wave.animations.Wave({
    lineWidth: 10,
    lineColor: "red",
    count: 20
}));
