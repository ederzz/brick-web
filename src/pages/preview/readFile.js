const fs = require('fs');

const main = (path, type) => {
  let code = ''
  fs.readFile(`${path.replace('-','_')}.${type}`, function (err, data) {
    if (err) throw err;
    code = data.toString()
  });
  return code
}

export default main