const bcrypt = require('bcrypt');

const salt1 = bcrypt.genSaltSync(10);

const encryptPass1 = bcrypt.hashSync('swordfish', salt1);

console.log('     salt  :' + salt1);
console.log('swordfish-> '+ encryptPass1);

const salt2 = bcrypt.genSaltSync(10);

const encryptPass2 = bcrypt.hashSync('hello', salt2);

console.log('hello-> '+ encryptPass2);
