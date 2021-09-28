const fs = require('fs').promises;

async function getInput(){
  const data = await fs.readFile("day3input.txt", "utf-8");
  return data.split('');
}

const getHouses = (input)=>{
  let xDir = 0;
  let yDir = 0;
  
  let houses = input.reduce((acc,elem)=>{
    if(elem==='<'){
      xDir--;
    }
    else if(elem==='>'){
      xDir++;
    }
    else if(elem==='^'){
      yDir++;
    }else{
      yDir--;
    }
    //taking all the coordinates
    acc.push(String(xDir)+'x'+String(yDir));
    return acc;
  },['0x0']);

  return houses;
}

const getUniqueHouseNum = (houses)=>{
  let eachHouse = houses.reduce((acc,elem)=>{
    //we only add it to each house if it's not in it
    if(!acc.includes(elem)){
      acc.push(elem);
      return acc;
    }
    else{
      return acc;
    }
  },[])

  return eachHouse.length;
}

getInput().then(input =>{
  //we first get all houses then reduce it to unique ones
  let eachHouse = getUniqueHouseNum(getHouses(input));
  console.log(eachHouse);
});
