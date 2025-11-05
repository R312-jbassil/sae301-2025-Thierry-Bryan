import type PocketBase from 'pocketbase';

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  created: string;
  updated: string;
}

export interface Lunette {
  id: string;
  nom_modele: string;
  date_enregistrement: string;
  code_svg: string;
  id_utilisateur: string;
  created: string;
  updated: string;
}

export interface Materiau {
  id: string;
  libelle: string;
  created: string;
  updated: string;
}

export interface Personnalisation {
  id: string;
  largeur_pont: number;
  taille_verres: string;
  couleur_monture: string;
  couleur_branches: string;
  id_materiau: string;
  id_lunette: string;
  created: string;
  updated: string;
}

export interface Commande {
  id: string;
  date_commande: string;
  statut: string;
  id_utilisateur: string;
  id_lunette: string;
  created: string;
  updated: string;
}

export interface TypedPocketBase extends PocketBase {
  collection(idOrName: 'users'): any;
  collection(idOrName: 'Lunette'): any;
  collection(idOrName: 'Materiau'): any;
  collection(idOrName: 'Personnalisation'): any;
  collection(idOrName: 'Commande'): any;
}