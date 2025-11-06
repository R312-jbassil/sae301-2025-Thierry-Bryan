import PocketBase from 'pocketbase';
import type { TypedPocketBase } from "./pocketbase-types";

// Configuration dynamique de l'URL
const getApiUrl = () => {
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:8090'; // Machine de dev
  }
  // Remplacez cette URL par l'URL de votre serveur PocketBase déployé
  return 'https://tavue.bryan-thierry.fr'; // URL de votre serveur PocketBase en production
};

const pb = new PocketBase(getApiUrl()) as TypedPocketBase;

// Configuration globale
pb.autoCancellation(false);

export default pb;