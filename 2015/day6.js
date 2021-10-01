const fs = require('fs').promises;

async function getInput(){
  const data = await fs.readFile("day6input.txt", "utf-8");
  return data.split('\n');
}

let lightArr = [];
//create the array of 1 mill
for(let i=0;i<=1000;i++){
  let arrToAdd = [];
  for(let j=0;j<=1000;j++){
    arrToAdd.push(0);
  }
  lightArr.push(arrToAdd);
}

// get Direction as 1,2-5,6 which means [1][2] to [5][6]
const getDirections = (str) =>{
  let noSpaceStr = str.replace(/\s/g, '');
  let directions = "";
  for(let i=0;i<noSpaceStr.length;i++){
    if(!isNaN(noSpaceStr[i]) || noSpaceStr[i]===','){
      directions += noSpaceStr[i];    
    }
    else if(i>1 && !isNaN(noSpaceStr[i-1])){
      directions+= '-';
    }
  }
  return directions;
}

// get exact values for i and j to navigate
const getExactDirection = (direction) =>{
  let [startI,startJ,endI,endJ] = [-1,-1,-1,-1];
  let num = '';
  for(let i=0;i<direction.length;i++){
    if(direction[i]===','){
      if(startI===-1){
        startI = Number(num);
        num = '';
      }else{
        endI = Number(num);
        num='';
      }
    }else if(direction[i]==='-'){
      startJ=Number(num);
      num='';
    }
    else if (i===direction.length-1){
      num+=direction[i];
      endJ = Number(num);
    }else{
      num+=direction[i];
    }
  }
  let iDistance = endI - startI ;
  let jDistance = endJ - startJ ;
  return{startI,startJ,iDistance,jDistance};
}

const turnOn = (direction)=>{
  let {startI,startJ,iDistance,jDistance} = getExactDirection(direction);
 
  for(let i=startI;i<=startI+iDistance;i++){
    for(let j=startJ;j<=startJ+jDistance;j++){
      lightArr[i][j]=1;
    }
  };
}

const turnOff = (direction)=>{
  let {startI,startJ,iDistance,jDistance} = getExactDirection(direction);

  for(let i=startI;i<=startI+iDistance;i++){
    for(let j=startJ;j<=startJ+jDistance;j++){
      lightArr[i][j]=0;
    }
  };
}

const toggle = (direction)=>{
  let {startI,startJ,iDistance,jDistance} = getExactDirection(direction);

  for(let i=startI;i<=startI+iDistance;i++){
    for(let j=startJ;j<=startJ+jDistance;j++){
      lightArr[i][j] = Number(!lightArr[i][j]);
    }
  };
}

getInput().then(input=>{
  for(let i=0;i<input.length;i++){
    let direction = getDirections(input[i]);
    if(input[i].includes('turn off')){
      turnOff(direction);
    }else if(input[i].includes('turn on')){
      turnOn(direction);
    }else{
      toggle(direction);
    }
  }

  // count all 1's in the array which means light is on
  let counter = lightArr.reduce((acc,row)=>{
    acc += row.reduce((acc,elem)=>{
      if(elem===1){
        acc++;
        return acc;
      }else{
        return acc;
      }
    },0);
    return acc;
  },0);
  
  console.log(counter);
}) 

