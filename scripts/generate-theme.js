import ColorThief from 'colorthief';
import path from 'path';
import fs from 'fs';

const logoPath = process.argv[2];
const clientJsonPath = process.argv[3];

if (!logoPath) {
  console.error('❌ Especifica la ruta del logo: npm run extract-colors public/images/ser/ser-logo.jpg');
  process.exit(1);
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

async function run() {
  const absoluteLogoPath = path.resolve(logoPath);
  
  if (!fs.existsSync(absoluteLogoPath)) {
    console.error(`❌ El archivo no existe: ${absoluteLogoPath}`);
    process.exit(1);
  }

  try {
    console.log(`🎨 Analizando logo: ${logoPath}...`);
    const palette = await ColorThief.getPalette(absoluteLogoPath, 5);
    
    // Filtrar colores demasiado claros o demasiado oscuros si es necesario
    // Pero por ahora tomamos los principales
    const primary = rgbToHex(...palette[0]);
    const secondary = palette[1] ? rgbToHex(...palette[1]) : primary;
    const accent = palette[2] ? rgbToHex(...palette[2]) : secondary;

    console.log('\n✨ Paleta sugerida:');
    console.log(`- Primary: ${primary}`);
    console.log(`- Secondary: ${secondary}`);
    console.log(`- Accent: ${accent}`);

    if (clientJsonPath) {
      const fullJsonPath = path.resolve(clientJsonPath);
      if (fs.existsSync(fullJsonPath)) {
        const data = JSON.parse(fs.readFileSync(fullJsonPath, 'utf8'));
        data.theme = {
          primary,
          secondary,
          accent,
          bg: "#ffffff",
          text: "#1e293b",
          whatsapp: "#25d366"
        };
        fs.writeFileSync(fullJsonPath, JSON.stringify(data, null, 2));
        console.log(`\n✅ Archivo ${path.basename(fullJsonPath)} actualizado.`);
      }
    }
  } catch (err) {
    console.error('❌ Error al procesar el logo:', err);
  }
}

run();
