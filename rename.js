const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Interface para ler a entrada do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o número da nova semana (ex: 33): ', (newWeek) => {
  if (!newWeek) {
    console.error('Erro: O número da semana não pode ser vazio. Saindo.');
    rl.close();
    return;
  }

  const currentDir = process.cwd();
  const filePattern = /^Template - WK\d{2} - (.*)\.xlsx$/;

  fs.readdir(currentDir, (err, files) => {
    if (err) {
      console.error('Erro ao ler o diretório:', err);
      rl.close();
      return;
    }

    files.forEach(file => {
      if (filePattern.test(file)) {
        const restOfName = file.match(filePattern)[1];
        const newName = `Template - WK${newWeek} - ${restOfName}.xlsx`;
        const oldPath = path.join(currentDir, file);
        const newPath = path.join(currentDir, newName);

        fs.rename(oldPath, newPath, (renameErr) => {
          if (renameErr) {
            console.error(`Erro ao renomear o arquivo ${file}:`, renameErr);
          } else {
            console.log(`Renomeado: '${file}' -> '${newName}'`);
          }
        });
      }
    });

    console.log('Processo de renomeação concluído.');
    rl.close();
  });
});