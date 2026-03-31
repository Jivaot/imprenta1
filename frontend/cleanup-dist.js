import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, 'dist');

// Limpiar archivos .pyserver* de forma agresiva
function cleanPyserver() {
  if (!fs.existsSync(distPath)) return;

  try {
    const files = fs.readdirSync(distPath, { withFileTypes: true });
    files.forEach(file => {
      if (file.name.startsWith('.pyserver')) {
        const filePath = path.join(distPath, file.name);
        try {
          // Cambiar permisos y eliminar
          try {
            fs.chmodSync(filePath, 0o777);
          } catch (e) {
            // Ignorar
          }
          fs.rmSync(filePath, { force: true, recursive: false });
          console.log(`✓ Eliminado: ${file.name}`);
        } catch (e) {
          console.log(`✗ No se puede eliminar: ${file.name}`);
        }
      }
    });
  } catch (e) {
    // Ignorar
  }
}

// Ejecutar limpieza
cleanPyserver();

// Esperar y ejecutar de nuevo
setTimeout(() => {
  cleanPyserver();
}, 500);


