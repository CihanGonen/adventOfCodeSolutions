const crypto = require('crypto');
const INPUT = 'bgvyzdsv';
const md5 = data => crypto.createHash('md5').update(data).digest('hex');

let combine = 0;
let answer = 0;

while(true){
	if(md5(INPUT+String(combine)).slice(0,5)==='00000'){
		answer = combine;
		break;
	}else{
		combine++;
	}
}

console.log(answer);