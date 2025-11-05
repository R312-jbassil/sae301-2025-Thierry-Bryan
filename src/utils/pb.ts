import PocketBase from 'pocketbase';
import type { TypedPocketBase } from "./pocketbase-types";

// Configuration dynamique de l'URL
const getApiUrl = () => {
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:8090'; // Machine de dev
  }
  return 'http://localhost:8092'; // Machine de déploiement
};

const pb = new PocketBase(getApiUrl()) as TypedPocketBase;

// Configuration globale
pb.autoCancellation(false);

export default pb;