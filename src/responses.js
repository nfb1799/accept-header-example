const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  return respond(request, response, index, 'text/html');
};

const getCats = (request, response, acceptedTypes) => {
  const cat = {
    name: "Mr. Meow",
    age: 5,
  };

  // xml looks like this: 
  // <response> <name>Mr. Meow</name> <age>5</age> </response>
  if(acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <name>${cat.name}</name>`;
    responseXML = `${responseXML} <age>${cat.age}</age>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml');
  }

  const catString = JSON.stringify(cat);
  return respond(request, response, catString, 'application/json');
};

module.exports = {
  getCats,
  getIndex,
};
