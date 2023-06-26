

import { getImages } from "./ImageTiles.js"
import { fyShuffle } from "./RandomShuffle.js";


var ns = null;
function spin(){
    ns.spin(ns.curInd)
}
window.addEventListener("load", () => {
    ns = new Spinner()
    document.getElementById('spinButton').addEventListener('click', spin)
})


class Spinner{
    constructor(){
        getImages(this.imagesLoaded, this)

        this.size = 0
        this.curInd = 0
        this.handle = null
    }

    imagesLoaded(images){
        this.images = images
        this.randOrder = fyShuffle(this.images.length - 1)
        this.init()

        document.getElementById("loadingSpinner").style.display = "none"
        document.getElementById("spinnerContainer").style.display = "block"
    }

    init(){
        this.canvas = document.getElementById('canvasSpinner')
        this.ctx = this.canvas.getContext('2d')
        window.onresize = this.setupCanvas
        this.setupCanvas()
    }

    setupCanvas(){
        let scale = 0.7

        if(window.innerWidth > window.innerHeight){
            this.width = window.innerHeight*scale
            this.height = window.innerHeight*scale
        } 
        else{
            this.width = window.innerWidth*scale
            this.height = window.innerWidth*scale
        }

        this.ctx.canvas.width = this.width
        this.ctx.canvas.height = this.height
        this.ctx.clearRect(0, 0, this.width, this.height)
    }


    drawImageToCanvas(d){
        let pad = 15
        this.ctx.drawImage(d.img, d.x+pad/2, d.y+pad/2, d.s-pad, d.s-pad); 
    }

    drawImage(ind){
        let data = {}
        data.img = this.images[ind]
        data.x = 0
        data.y = 0
        data.s = this.width

        if(this.images[ind].complete){
            this.drawImageToCanvas(data); 
        }
        else{
            this.images[ind].onload = () => {
                this.drawImageToCanvas(data); 
            };

        }
    }

    spin(ind){
        if(!ind){
            ind = this.curInd
        }
        if(this.handle){
            clearTimeout(this.handle)
        }
        this.ctx.clearRect(0, 0, this.width, this.height)
        let len = this.images.length - 1
        if(ind/len > 1 && ind%len == this.randOrder[this.curInd]){
            //reached the end
            this.drawImage(this.randOrder[this.curInd])
            this.curInd += 1
            this.handle = null
        }
        else{
            this.ctx.globalCompositeOperation = "source-over"
            this.drawImage(ind%len)
            this.ctx.fillStyle = "gray"
            this.ctx.globalCompositeOperation = "darken"
            this.ctx.fillRect(0, 0, this.width, this.width)

            this.handle = setTimeout(() => {this.spin(ind + 1)}, 50)
        }
    }
}



