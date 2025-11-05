import pb from './pb';
import type { Lunette } from './pocketbase-types';

export interface LunetteConfig {
  nom_modele: string;
  couleur_verres?: string;
  couleur_monture: string;
  couleur_branches: string;
  largeur_pont: number;
  taille_verres: number;
  id_materiau: string;
  code_svg?: string;
}

/**
 * Enregistre une nouvelle paire de lunettes dans PocketBase
 */
export async function saveLunette(config: LunetteConfig): Promise<Lunette> {
  try {
    // Vérifier que l'utilisateur est connecté
    if (!pb.authStore.isValid) {
      throw new Error('Utilisateur non connecté');
    }

    // Préparer les données pour PocketBase
    const lunetteData = {
      nom_modele: config.nom_modele || 'Ma création',
      date_enregistrement: new Date().toISOString(),
      code_svg: config.code_svg || '', // SVG sera généré plus tard si nécessaire
      largeur_pont: config.largeur_pont,
      taille_verres: config.taille_verres,
      couleur_verres: config.couleur_verres || 'transparent',
      couleur_monture: config.couleur_monture,
      couleur_branches: config.couleur_branches,
      id_utilisateur: pb.authStore.record?.id,
      id_materiau: config.id_materiau
    };

    console.log('Données à enregistrer:', lunetteData);

    // Enregistrer dans PocketBase
    const record = await pb.collection('Lunette').create(lunetteData);
    
    console.log('Lunette enregistrée avec succès:', record);
    return record as Lunette;

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la lunette:', error);
    throw error;
  }
}

/**
 * Récupère les lunettes d'un utilisateur
 */
export async function getUserLunettes(): Promise<Lunette[]> {
  try {
    if (!pb.authStore.isValid) {
      throw new Error('Utilisateur non connecté');
    }

    const records = await pb.collection('Lunette').getFullList({
      filter: `id_utilisateur = "${pb.authStore.record?.id}"`,
      sort: '-date_enregistrement',
      expand: 'id_materiau'
    });

    return records as Lunette[];
  } catch (error) {
    console.error('Erreur lors de la récupération des lunettes:', error);
    throw error;
  }
}

/**
 * Récupère tous les matériaux disponibles
 */
export async function getMateriaux() {
  try {
    const records = await pb.collection('Materiau').getFullList({
      sort: 'libelle'
    });
    return records;
  } catch (error) {
    console.error('Erreur lors de la récupération des matériaux:', error);
    throw error;
  }
}

/**
 * Vérifie si l'utilisateur est connecté
 */
export function isUserLoggedIn(): boolean {
  return pb.authStore.isValid;
}

/**
 * Obtient l'utilisateur actuel
 */
export function getCurrentUser() {
  return pb.authStore.record;
}