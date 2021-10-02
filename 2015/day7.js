const fs = require('fs').promises;

async function getInput(){
  const data = await fs.readFile("day7input.txt", "utf-8");
  return data.split('\n');
}

const whatToAssign = (input)=>{
  return input.reduce((acc,elem)=>{
    for(let i=0;i<elem.length;i++){
      if(elem[i]==='>'){
        acc.push(elem.slice(i+2,i+3));
      }
    }
    return acc;
  },[])
}

let obj = {};

const doLogicOperation = (elem,operation,isShift=false)=>{
  let var1='';
  let var2='';
  let spaceCounter = 0;
  let var2StartPoint = 0;
  for(let i=0;i<elem.length;i++){
    if(elem[i]===' ' && spaceCounter===0){
      var1=elem.slice(0,i);
      spaceCounter++;
    }else if(elem[i]===' ' && spaceCounter===1){
      var2StartPoint = i+1;
      spaceCounter++;
    }
    else if(elem[i]===' ' && spaceCounter===2){
      var2=elem.slice(var2StartPoint,i);
      spaceCounter++;
    }
  }
  let result = 0;
  // if it doesn't exist in the object catch it

  if(isShift){
    if(obj[var1]==undefined){
      result = 'nores';
    }else{
      result = operation(obj[var1],Number(var2))
    }
  }else{
    if(!isNaN(var1) && obj[var2]!=undefined){
      result = operation(var1,obj[var2]);
    }
    else if(!isNaN(var2) && obj[var1]!=undefined){
      result = operation(obj[var1],var2);
    }
    else if(obj[var1]==undefined || obj[var2]==undefined){
      result = 'nores';
    }
    else if(!isNaN(var1) && !isNaN(var2)){
      result = operation(var1,var2);
    }
    else{
      result = operation(obj[var1],obj[var2]);
    }
  }

  return result;

}

const allOperations = (input)=>{
  const assignToArray = whatToAssign(input);
  for(let i =0;i<input.length;i++){
    if(input[i].includes('AND')){
      let result =doLogicOperation(input[i],(a,b)=> a&b);
      if(result!='nores'){
        obj[assignToArray[i]] = result;
      }else{
        continue;
      };
    }else if(input[i].includes('OR')){
      let result =doLogicOperation(input[i],(a,b)=> a|b);
      if(result!='nores'){
        obj[assignToArray[i]] = result;
      }else{
        continue;
      };
    }else if(input[i].includes('LSHIFT')){
      let result =doLogicOperation(input[i],(a,b)=> a<<b,true);
      if(result!='nores'){
        obj[assignToArray[i]] = result;
      }else{
        continue;
      };
    }else if(input[i].includes('RSHIFT')){
      let result =doLogicOperation(input[i],(a,b)=> a>>b,true);
      if(result!='nores'){
        obj[assignToArray[i]] = result;
      }else{
        continue;
      };
    }else if(input[i].includes('NOT')){
      let wordStartPoint = 0;
      let spaceCounter = 0;
      let word = '';
      for(let j=0;j<input[i].length;j++){
        if(input[i][j]===' ' && spaceCounter===0){
          wordStartPoint = j+1;
          spaceCounter++;
        }else if(input[i][j]===' ' && spaceCounter===1){
          word = input[i].slice(wordStartPoint,j);
          spaceCounter++;
        }
      }
      if(obj[word]==undefined){
        continue;
      }else{
        obj[assignToArray[i]] = 65535 - obj[word];
      }
    }else{
      let num = '';
      for(let j=0;j<input[i].length;j++){
        //eğer sayıysa ata değilse objeye bak yoksa geç
        if(input[i][j]===' '){
          if(!isNaN(Number(num))){
            obj[assignToArray[i]]=Number(num);
            break;
          }else{
            if(obj[num]==undefined){
              break;
            }else{
              obj[assignToArray[i]] = obj[num];
              break;
            }
          }
        }else{
          num+=input[i][j];
        }
      }
    }
  }
} 

getInput().then(input=>{
  while(true){
    allOperations(input);
    if(obj['a']!=undefined){
      console.log(obj['a']);
      console.log(obj);
      break;
    }else{
      console.log('bir daha',obj);
    }
  }
}) 