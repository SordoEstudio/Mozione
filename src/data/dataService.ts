// src/data/dataService.ts
import mozioneData from './clients/mozione.json';
import serData from './clients/ser.json';
import simonData from './clients/simon.json';
import keepData from './clients/keep.json';
import lotusData from './clients/lotus.json';
import adrianData from './clients/adrian.json';
import checkmedData from './clients/checkmed.json';
import triadesData from './clients/triades.json';

// Mapeo de clientes disponibles
const clients: Record<string, any> = {
    mozione: mozioneData,
    ser: serData,
    simon: simonData,
    keep: keepData,
    lotus: lotusData,
    adrian: adrianData,
    checkmed: checkmedData,
    triades: triadesData,
};

// Fuente de verdad: Primero intenta leer la variable de entorno de Astro (Vercel/Local)
// Si no existe, intenta usar una variable global de Node (para scripts)
// Por último, mozione por defecto.
const clientId = import.meta.env.PUBLIC_CLIENT_ID || 'mozione';

console.log(`🚀 Cargando datos para el cliente: ${clientId}`);

export const getSiteData = () => {
    const data = clients[clientId];
    if (!data) {
        console.warn(`⚠️ Cliente "${clientId}" no encontrado en el diccionario. Usando mozione.`);
        return clients.mozione;
    }
    return data;
};

export default getSiteData();
