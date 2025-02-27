const audioPlayer = document.getElementById("audio-player")
const audio = document.getElementById("audio");

//----------//
// Waveform //
//----------//
{
    if (typeof Wave != typeof undefined) {
        let canvasElement = document.getElementById("wave");
        let wave = new Wave(audio, canvasElement);

        wave.addAnimation(new wave.animations.Wave({
            lineWidth: 10,
            lineColor: {gradient: ["#ff9966", "#ff5e62"]},
            count: 20
        }));
    }
}


//-------------//
// Progressbar //
//-------------//
{
    const progress = audioPlayer.querySelector(".progress")
    const barTop = progress.querySelector(".bar-top")
    audio.addEventListener("timeupdate", function() {
        barTop.style.width = `${audio.currentTime / audio.duration * 100}%`
    });

    progress.onclick = e => {
        let mousePos = e.pageX - progress.getBoundingClientRect().x
        audio.currentTime = audio.duration * mousePos / progress.offsetWidth
    }

    const ball = progress.querySelector(".ball")
    let mouseover = false

    progress.onmouseenter = _ => {
        mouseover = true
    }

    progress.onmouseleave = _ => {
        mouseover = false
    }

    window.onmousemove = e => {
        if (mouseover) {
            let newPos = e.pageX - progress.getBoundingClientRect().x
            newPos -= ball.getBoundingClientRect().width / 2
            ball.style.left = `${newPos}px`
        }
    }
}


//----------//
// controls //
//----------//
{
    audioPlayer.querySelector(".controls").onmousedown = e => {
        e.preventDefault()
    }

    const bLoop = audioPlayer.querySelector(".bLoop")
    const bHardBackward = audioPlayer.querySelector(".bHardBack")
    const bBackward = audioPlayer.querySelector(".bBack")
    const bPlay = audioPlayer.querySelector(".bPlay")
    const bForward = audioPlayer.querySelector(".bForward")
    const bHardForward = audioPlayer.querySelector(".bHardForward")
    const bSettings = audioPlayer.querySelector(".bSettings")

    const state = audioPlayer.querySelector(".state")
    bPlay.addEventListener("click", _ => {
        audio.paused ? audio.play() : audio.pause()
    })

    bForward.addEventListener("click", _ => {
        // audio.playbackRate >= 2 ? _ : audio.playbackRate += 0.25
        audio.currentTime += 10
    })

    bBackward.addEventListener("click", _ => {
        // audio.playbackRate <= 0.5 ? _ : audio.playbackRate -= 0.25
        audio.currentTime -= 10
    })

    bHardForward.addEventListener("click", _ => {
        // audio.currentTime += 10
        audio.currentTime = audio.duration
    })

    bHardBackward.addEventListener("click", _ => {
        // audio.currentTime -= 10
        audio.currentTime = 0
    })

    bLoop.addEventListener("click", e => {
        audio.loop = !audio.loop
        audio.loop ? e.target.style.backgroundColor = "#fff2" : e.target.style.backgroundColor = "#fff0"
    })

    audio.volume = 0.75



    const decos = [
        audioPlayer.querySelectorAll(".deco2"),
        audioPlayer.querySelectorAll(".deco3"),
        audioPlayer.querySelectorAll(".deco4"),
    ]

    audio.onplay = (_ => {
        bPlay.innerText = "ll"
        state.innerText = "playing"

        let delay = 0
        decos.map(deco => {
            delay += 0.3
            Array.from(deco).map(d => { d.style.animationDelay = `${delay}s` })
        })
    })

    audio.onpause = (_ => {
        bPlay.innerText = "▷"
        state.innerText = "paused"
        decos.map(deco => { Array.from(deco).map(d => { d.style.animationDelay = "0s" }) })
    })
}
