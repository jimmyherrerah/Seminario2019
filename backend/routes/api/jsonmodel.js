var fs = require('fs');

module.exports = {
  "write": function(data, handler){
    fs.writeFile('data.json', JSON.stringify(data) , handler);
  },
  "read": function(handler){
    fs.readFile('data.json', handler);
  }
}
