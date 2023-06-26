import { getImages } from "./ImageTiles.js"
import { fyShuffle } from "./RandomShuffle.js";


function createAndDownload(){
  const num = document.getElementById('downloadNumber').value
  new ImageCard("downloadCanvas", num)
}
document.getElementById('downloadCardLink').addEventListener('click', createAndDownload);
document.getElementById('launchGameButton').addEventListener('click', play)


function play(){
  let game = window.location.hash.split('/')[1]
  window.location.hash = '#play/'+game
}

class ImageCard {
  constructor(canvas_id, download_count) {
    this.canvas_id = canvas_id
    this.download_count = download_count

    this.images = getImages(this.imagesLoadedCallback, this)
  }

  imagesLoadedCallback(images){
    this.images = images

    this.setupCanvas()
    this.setSizeAndDraw()
    if(this.download_count > 0){
      for(var i=0; i<this.download_count; i++){
        this.downloadPlot()
      }
    }
    else {
      this.drawImageTiles()
    }
  }

  setSizeAndDraw(){
    //set the size of the grid (always square)
    this.size = 1024;

    this.ctx.canvas.width = this.size
    this.ctx.canvas.height = this.size
    this.ctx.clearRect(0, 0, this.size, this.size)

    this.drawGridLines()
  }

  setupCanvas(){
    this.canvas = document.getElementById(this.canvas_id)
    this.ctx = this.canvas.getContext("2d")
    window.onresize = this.setSizeAndDraw
  }

  drawGridLines(){
    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.strokeStyle= "black"
    let width = 3
    let new_size = this.size - width
    this.ctx.lineWidth = width
    for(var i=0; i<6; i++){
      let start = i*(new_size/5) + width/2

      //draw horizontal
      this.ctx.beginPath()
      this.ctx.moveTo(0, start)
      this.ctx.lineTo(this.size, start)
      this.ctx.stroke()

      //draw vertical
      this.ctx.beginPath()
      this.ctx.moveTo(start, 0)
      this.ctx.lineTo(start, this.size)
      this.ctx.stroke()
    }
  }

  drawImageToCanvas(d){
    let pad = 15
    this.ctx.drawImage(d.img, d.x+pad/2, d.y+pad/2, d.s-pad, d.s-pad); 
  }

  drawImageTiles(){
    let fy_inds = fyShuffle(this.images.length - 1) //free space is included
    var cur_ind = 0
    for(var i=0; i<5; i++){
      for(var j=0; j<5; j++){
        var ind = undefined
        if(i == 2 && j == 2){
          ind = this.images.length-1 //free space 
        }
        else{
            ind = fy_inds[cur_ind]
            cur_ind ++
        }

        let data = {}
        data.img = this.images[ind]
        data.x = this.size/5*i
        data.y = this.size/5*j
        data.s = this.size/5

        this.drawImageToCanvas(data);
      }
    }
  }

  downloadPlot(){
    this.drawImageTiles()
    var element = document.createElement('a');
    let image = this.ctx.canvas.toDataURL("image/jpg")
    element.href = image
    element.download = 'bingo.jpg'

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

}

