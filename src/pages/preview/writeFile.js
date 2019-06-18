const fs = require('fs');

const main = (type, path, file) => {

  console.log('write',`/${path}.${type}`, file)

  fs.writeFile(`/${path}.${type}`, file , function(err) {
    if (err) throw err;
  });
}

export default main