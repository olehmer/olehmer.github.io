window.addEventListener('hashchange', handleRoute)
window.addEventListener("load", onload)


function onload(){
    document.getElementById('backButton').addEventListener('click', back);
    handleRoute()
}

function handleRoute(){
    document.querySelectorAll(".page").forEach((element) => {
        element.style.display = 'none'
    });

    if(window.location.hash.length>0){
        let params = window.location.hash.split("/")
        if(params.length == 2 && params[0].length>0 && params[1].length>0){
            id = params[0].slice(1)
            el = document.getElementById(id)
            if(el){
                el.style.display = 'block'
                document.querySelector("#backButton").style.display = 'inline-block'
            }
            else{
                handleBadPath()
            }
        }
        else {
            handleBadPath()
        }
    }
    else{
        document.querySelector("#backButton").style.display = 'none'
        document.querySelector("#home").style.display = 'block'
    }
};

function handleBadPath(){
    window.location.hash = ""
}

function back(){
    params = window.location.hash.split('/')
    path = params[0].slice(1)
    if(path=="game"){
        window.location.hash = ""
    }
    else if(path=="play"){
        window.location.hash = "game/"+params[1]
    }
}

function getid(){
    var result = null
    if(window.location.hash.length>0){
        let params = window.location.hash.split("/")
        if(params.length==2){
            result = params[1]
        }
    }
    return result
};