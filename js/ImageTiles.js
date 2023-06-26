export function getImages(loaded_callback, caller){

    let game = window.location.hash.split('/')[1]
    console.log(game)
    let promises = []
    for(var i=0; i<getNumImages(game); i++){
        let num = ("" + i).padStart(2, "0");
        //set i limit to 27 for bbg and the padStart to 2
        //img.src = require(`../assets/bbg/IMG_${num}.jpeg`)

        //Library, set limit to 25, padStart to 3
        //img.src = require(`../assets/library/${num}.jpeg`)
        
        const promise = new Promise((resolve)=>{
            let img = new Image();
            img.src = "../assets/"+game+"/"+num+".jpeg"
            img.onload = () => {
                resolve(img)
            }
        }); 
        promises.push(promise)
    }
    Promise.all(promises).then((imgs) => {
        loaded_callback = loaded_callback.bind(caller)
        loaded_callback(imgs)
    });
};

function getNumImages(game){
    var res = null
    switch(game){
        case "bbg":
            res = 27
            break;
        case "megan":
            res = 26
            break;
        case "library":
            res = 25
            break;
        case "jamie":
            res=25
            break;
        default:
            res = 0
            break;
    }
    return res
}
