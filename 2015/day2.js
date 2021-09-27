const fs = require('fs').promises;

async function getInput(){
 const data = await fs.readFile("day2input.txt", "utf-8");
 return data.split('\n');
}

// This function makes string '2x5x6' an array [2,5,6]
const makeItNumArray = (elem)=>{
  let charArr = elem.split('');
  let numArray = [];
  let num = '';
  for(let i=0;i<charArr.length;i++){
     if(i+1===charArr.length){
       num+=charArr[i];
       numArray.push(Number(num));
     }
     else if(!isNaN(Number(charArr[i]))){
       num+=charArr[i];
     }else{
       numArray.push(Number(num));
       num='';
     }
  }
  return numArray;
}

const calculateResult = (numArr)=>{
  let area1 = 2*numArr[0]*numArr[1];
  let area2 = 2*numArr[1]*numArr[2];
  let area3 = 2*numArr[0]*numArr[2];
  return Math.min(area1/2,area2/2,area3/2)+area1+area2+area3;
}

const paperLength = (input)=>{
  return input.reduce((acc,elem)=>{
    // we first make it a num array and then calculate the result
    return acc + calculateResult(makeItNumArray(elem));
  },0)
}

getInput().then(input=>{
  console.log(paperLength(input));
});
