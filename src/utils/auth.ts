import pb from './pb';
import type { User } from './pocketbase-types';

export class AuthService {
  // Test de connexion à PocketBase
  static async testConnection(): Promise<boolean> {
    try {
      await pb.health.check();
      return true;
    } catch (error) {
      console.error('Erreur de connexion PocketBase:', error);
      return false;
    }
  }

  // Obtenir l'utilisateur connecté
  static getCurrentUser(): User | null {
    return pb.authStore.model as User | null;
  }

  // Vérifier si l'utilisateur est connecté
  static isAuthenticated(): boolean {
    return pb.authStore.isValid;
  }

  // Déconnexion
  static logout(): void {
    pb.authStore.clear();
  }
}