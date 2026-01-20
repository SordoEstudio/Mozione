import fs from 'fs';
import path from 'path';

const client = process.argv[2];

if (!client) {
  console.error('❌ Por favor especifica un cliente (ejemplo: npm run switch ser)');
  process.exit(1);
}

const sourcePath = path.join(process.cwd(), `src/data/clients/${client}.json`);
const targetPath = path.join(process.cwd(), 'src/config/site.json');

if (!fs.existsSync(sourcePath)) {
  console.error(`❌ El cliente "${client}" no existe en src/data/clients/`);
  process.exit(1);
}

try {
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`✅ ¡Éxito! Cliente cambiado a: ${client.toUpperCase()}`);
} catch (err) {
  console.error('❌ Error al cambiar el cliente:', err);
}
