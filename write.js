const fs = require('fs');

let missions = [];

const writeDialogue = (dialogue) => {
    fs.readFile('script.json', 'utf8', (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            console.error('File not found. Creating new scripts.json...');

            missions.push(dialogue);
            let json = JSON.stringify(missions);

            fs.writeFile('script.json', json, (err) => err && console.error(err));
            console.error('File successfully created.');
          } else {
            console.error('Error reading file:', err);
          }
          return;
        }
        
        missions = JSON.parse(data);

        missions.push(dialogue);
        let json = JSON.stringify(missions);

        fs.writeFile('script.json', json, (err) => err && console.error(err));
        console.error('File successfully written.');
    });
}

module.exports = writeDialogue;