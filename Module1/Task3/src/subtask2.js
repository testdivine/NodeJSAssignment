const fs = require("fs");
const csv = require("csvtojson");
const readline = require("readline");
const csvFilePath = "../csv/data.csv";
const writableStream = fs.createWriteStream("../lib/new.txt", "utf8");

const readlineInterface = readline.createInterface({
  input: fs.createReadStream(csvFilePath),
  crlfDelay: Infinity
});

//Read the content of csv file line by line
readlineInterface.on("line", line => {
  console.log(line);
});

// writing csv file content to a new text file
csv()
  .fromFile(csvFilePath)
  .then(jsonArray => {
    jsonArray.forEach(json => {
      delete json["Amount"];
      writableStream.write(JSON.stringify(json) + "\n", "utf8");
    });
  });
