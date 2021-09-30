const fs = require('fs').promises;

async function getInput(){
  const data = await fs.readFile("day5input.txt", "utf-8");
  return data.split('\n');
}

const hasThreeVowels = (word) =>{
  const vowels = ['a','e','i','o','u'];
    
  let vowelCounter = 0;
  for(let i=0;i<word.length;i++){
    if(vowels.includes(word[i])){
      vowelCounter++;
    }
  }
  return vowelCounter>=3;
}

const twiceInaRow = (word)=>{
  let store = word[0];
  let isThereRow = false;
  for(let i=1;i<word.length;i++){
    if(store === word[i]){
      isThereRow = true;
      break;
    }else{
      store = word[i];
    }
  }
  return isThereRow;
}

const containsBad = (word)=>{
 const notToContain = ['ab','cd','pq','xy'];
 let doesItContain = false;
 for(let i=0;i<notToContain.length;i++){
   if(word.includes(notToContain[i])){
      doesItContain = true;
      break;
   }
 }
 return doesItContain;
}

getInput().then(input=>{
   let nices = input.reduce((acc,elem)=>{
    if(hasThreeVowels(elem) && twiceInaRow(elem) && !containsBad(elem)){
      acc++;
      return acc;
    }else{
      return acc;
    }
  },0);
  console.log(nices);
})