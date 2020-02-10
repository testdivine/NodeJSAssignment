const fs = require("fs");
const csv = require("csvtojson");
const readline = require("readline");
const csvFilePath = "./csv/data.csv";
const writableStream = fs.createWriteStream("./new.txt", "utf8");

const readlineInterface = readline.createInterface({
  input: fs.createReadStream(csvFilePath),
  crlfDelay: Infinity
});

//Read the content of csv file line by line
readlineInterface.on("line", function(line) {
  console.log(line);
});

// writing csv file content to a new text file
csv()
  .fromFile(csvFilePath)
  .then(function(jsonArray) {
    jsonArray.forEach(function(json) {
      delete json["Amount"];
      writableStream.write(JSON.stringify(json) + "\n", "utf8");
    });
  });
