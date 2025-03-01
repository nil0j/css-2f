const svgSection = document.getElementById("svg-section")
const svgNodes = Array.from(svgSection.querySelectorAll(".svg"))
let carrouselX = svgSection.getBoundingClientRect().width
let time = 0

window.addEventListener("resize", _ => {
    carrouselX = svgSection.getBoundingClientRect().width
    Svg.jump = svgNodes.length * 300 - carrouselX
})

class Svg{
    static id = 0
    static jump = svgNodes.length * 300 - carrouselX
    static speed = -2

    constructor (element) {
        this.element = element
        this.id = Svg.id++
        this.x = 300 * this.id - 300
        this.width = this.element.getBoundingClientRect().width
        this.fixY()
    }

    fixY() {
        let rect = this.element.getBoundingClientRect()
        let maxH = svgSection.getBoundingClientRect().height
        if (rect.height < maxH) this.element.style.top = `${(maxH - rect.height) / 2}px`
    }

    toMiddle() {
        this.x = 0
        this.updatePosition()
    }

    update() {
        this.move(Svg.speed)
        this.checkLimit()
    }

    move(x) {
        this.x += x
        this.updatePosition()
    }

    updatePosition() {
        let newLeft = (carrouselX - this.width) / 2 + this.x
        this.element.style.left = `${newLeft}px`
    }

    checkLimit() {
        if (Svg.speed < 0) {

        } else if (Svg.speed < 0) {
        } else {
        }

        let s = Svg.speed < 0 ? -1 : Svg.speed > 0 ? 1 : 0
        if (s == 0) return
        

        if (
            this.x * s > 0 &&
            this.x * s > (carrouselX + 300) / 2
        ) this.x += -(carrouselX + Svg.jump) * s
    }
}

const svgs = svgNodes.map(element => new Svg(element))

function prepare() {
    svgs.map(svg => {
    })
}

function update() {
    setInterval(() => {
        svgs.map(svg => {
            svg.update()
        })

            time++;
    }, 10);
}

prepare()
update()
