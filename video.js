const videoPlayer = document.getElementById("video")
const video = videoPlayer.getElementsByTagName("video")[0];

//-------------//
// Progressbar //
//-------------//
{
    const progress = videoPlayer.querySelector(".progress")
    const progressBarTop = progress.querySelector(".bar-top")
    video.addEventListener("timeupdate", function() {
        progressBarTop.style.width = `${video.currentTime / video.duration * 100}%`
    });

    progress.onclick = e => {
        let mousePos = e.pageX - progress.getBoundingClientRect().x
        video.currentTime = video.duration * mousePos / progress.offsetWidth
    }

    const progressBall = progress.querySelector(".ball")
    let mouseOverProgress = false

    progress.onmouseenter = _ => {
        mouseOverProgress = true
    }

    progress.onmouseleave = _ => {
        mouseOverProgress = false
    }

    progress.onmousemove = e => {
        if (mouseOverProgress) {
            let newPos = e.pageX - progress.getBoundingClientRect().x
            newPos -= progressBall.getBoundingClientRect().width / 2
            progressBall.style.left = `${newPos}px`
        }
    }
}


//----------//
// controls //
//----------//
{
    videoPlayer.querySelector(".controls").onmousedown = e => {
        e.preventDefault()
    }

    const bLoop = videoPlayer.querySelector(".bLoop")
    const bHardBackward = videoPlayer.querySelector(".bHardBack")
    const bBackward = videoPlayer.querySelector(".bBack")
    const bPlay = videoPlayer.querySelector(".bPlay")
    const bForward = videoPlayer.querySelector(".bForward")
    const bHardForward = videoPlayer.querySelector(".bHardForward")
    const bVolume = videoPlayer.querySelector(".bSettings")

    const state = videoPlayer.querySelector(".state")
    bPlay.addEventListener("click", _ => {
        video.paused ? video.play() : video.pause()
    })

    bForward.addEventListener("click", _ => {
        video.currentTime += 10
    })

    bBackward.addEventListener("click", _ => {
        video.currentTime -= 10
    })

    bHardForward.addEventListener("click", _ => {
        video.currentTime = video.duration
    })

    bHardBackward.addEventListener("click", _ => {
        video.currentTime = 0
    })

    bLoop.addEventListener("click", e => {
        video.loop = !video.loop
        video.loop ?
            e.target.classList.add("triggered") :
            e.target.classList.remove("triggered")
    })

    video.volume = 0.75


    const decos = [
        videoPlayer.querySelectorAll(".deco2"),
        videoPlayer.querySelectorAll(".deco3"),
        videoPlayer.querySelectorAll(".deco4"),
    ]

    video.onplay = (_ => {
        bPlay.innerText = "ll"
        state.innerText = "playing"

        let delay = 0
        decos.map(deco => {
            delay += 0.3
            Array.from(deco).map(d => { d.style.animationDelay = `${delay}s` })
        })
    })

    video.onpause = (_ => {
        bPlay.innerText = "▷"
        state.innerText = "paused"
        decos.map(deco => { Array.from(deco).map(d => { d.style.animationDelay = "0s" }) })
    })

    const audioControl = videoPlayer.querySelector(".videoControl")
    const barBack = audioControl.querySelector(".bar-back")
    const barTop = audioControl.querySelector(".bar-top")
    const volumeBall = audioControl.querySelector(".ball")
    let mouseOverVolume = false

    audioControl.onmouseenter = _ => {
        mouseOverVolume = true
    }

    audioControl.onmouseleave = _ => {
        mouseOverVolume = false
    }

    audioControl.onmousemove = e => {
        if (mouseOverVolume) {
            let newPos = audioControl.getBoundingClientRect().top + window.pageYOffset + audioControl.getBoundingClientRect().height - e.pageY
            newPos -= volumeBall.getBoundingClientRect().height / 2

            let em = parseFloat(getComputedStyle(audioControl).fontSize)
            newPos += 0.5 * em


            if (newPos < 0) newPos = 0

            let max = barBack.getBoundingClientRect().height - 0.5 * em
            if (newPos > max) newPos = max
            volumeBall.style.bottom = `calc(${newPos}px - 0.25em)`
        }
    }

    audioControl.onclick = e => {
        let newPos = audioControl.getBoundingClientRect().top + window.pageYOffset + audioControl.getBoundingClientRect().height - e.pageY
        let em = parseFloat(getComputedStyle(audioControl).fontSize)
        newPos += 0.5 * em

        if (newPos < 0) newPos = 0

        let max = barBack.getBoundingClientRect().height - 0.5 * em
        if (newPos > max) newPos = max

        video.volume = newPos / max
    }

    video.onvolumechange = e => {
        barTop.style.height = `calc(${e.target.volume * 100}% - 1.25em)`
    }

    let volButtonTriggered = false
    bVolume.onclick = e => {
        if (e.target != bVolume) return
        volButtonTriggered = !volButtonTriggered
        switch (volButtonTriggered) {
            case true:
                bVolume.classList.add("triggered")
                break
            case false:
                bVolume.classList.remove("triggered")
                break
        }
    }

    videoPlayer.onclick = e => {
        if (
            volButtonTriggered &&
            e.target != bVolume
        ) {
            volButtonTriggered = false
            bVolume.classList.remove("triggered")
        }
    }
}
