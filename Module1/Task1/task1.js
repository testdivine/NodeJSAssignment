process.stdin.on("data", function(line) {
  var inputTokens = line
    .toString()
    .trim()
    .split(" ");
  var reversedTokens = inputTokens.map(function(input) {
    return input
      .split("")
      .reverse()
      .join("");
  });
  process.stdout.write(reversedTokens.reverse().join(" "));
});
