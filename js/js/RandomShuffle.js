export function fyShuffle(num){
    let ints = Array.from({length: num}, (_, i) => i)
    for(var i=num-1; i>0; i--){
      let j = Math.floor(Math.random()*i)
      let j_temp = ints[j]
      ints[j] = ints[i] 
      ints[i] = j_temp
    }
    return ints
};