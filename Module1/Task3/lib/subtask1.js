process.stdin.on("data", line => {
  var inputTokens = line.toString().trim().split(" ");
  var reversedTokens = inputTokens.map(input => {
    return input.split("").reverse().join("");
  });
  process.stdout.write(reversedTokens.reverse().join(" "));
});