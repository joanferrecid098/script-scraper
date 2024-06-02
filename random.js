const readline = require('readline-sync');
const fs = require('fs');

const lines = [];

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}  

fs.readFile('script.json', 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('File doesnt exist.');
      } else {
        console.error('Error reading file:', err);
      }
      return;
    }
    
    missions = JSON.parse(data);

    for (let mission of missions) {
        for (let line of mission.lines) {
            lines.push(line);
        }
    }

    const phrase = lines[getRandomInt(0, lines.length)];

    console.log(phrase.line);
    const res = readline.question("Character?\n- ");
    if (res == phrase.character) { console.log("correct!") }
    else {
        console.log("incorrect!")
        console.log(phrase.character)
    }
});