import pb from './pb';
import type { User } from './pocketbase-types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

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

  // Connexion
  static async login(credentials: LoginCredentials): Promise<User> {
    try {
      const authData = await pb.collection('users').authWithPassword(
        credentials.email,
        credentials.password
      );
      
      console.log('Connexion réussie:', authData);
      return authData.record as User;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw new Error('Email ou mot de passe incorrect');
    }
  }

  // Inscription
  static async signup(userData: SignupData): Promise<User> {
    try {
      // Validation des mots de passe
      if (userData.password !== userData.passwordConfirm) {
        throw new Error('Les mots de passe ne correspondent pas');
      }

      if (userData.password.length < 6) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères');
      }

      // Création du compte
      const record = await pb.collection('users').create(userData);
      console.log('Compte créé:', record);

      // Connexion automatique après inscription
      const authData = await pb.collection('users').authWithPassword(
        userData.email,
        userData.password
      );
      
      console.log('Connexion automatique après inscription:', authData);
      return authData.record as User;
    } catch (error: any) {
      console.error('Erreur d\'inscription:', error);
      
      // Gestion des erreurs spécifiques PocketBase
      if (error?.data?.email) {
        throw new Error('Cette adresse email est déjà utilisée');
      }
      
      throw error;
    }
  }

  // Obtenir l'utilisateur connecté
  static getCurrentUser(): User | null {
    return pb.authStore.record as User | null;
  }

  // Vérifier si l'utilisateur est connecté
  static isAuthenticated(): boolean {
    return pb.authStore.isValid;
  }

  // Obtenir l'ID de l'utilisateur connecté
  static getCurrentUserId(): string | null {
    return pb.authStore.record?.id || null;
  }

  // Déconnexion
  static logout(): void {
    pb.authStore.clear();
    
    // Redirection vers la page d'accueil après déconnexion
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }

  // Écouter les changements d'état d'authentification
  static onAuthChange(callback: (isAuthenticated: boolean, user: User | null) => void): () => void {
    return pb.authStore.onChange((token, record) => {
      callback(!!token, record as User | null);
    });
  }

  // Rafraîchir le token d'authentification
  static async refreshAuth(): Promise<boolean> {
    try {
      if (pb.authStore.isValid) {
        await pb.collection('users').authRefresh();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement de l\'authentification:', error);
      pb.authStore.clear();
      return false;
    }
  }

  // Middleware pour protéger les routes
  static requireAuth(redirectTo: string = '/auth'): boolean {
    if (!this.isAuthenticated()) {
      if (typeof window !== 'undefined') {
        const currentUrl = window.location.pathname + window.location.search;
        window.location.href = `${redirectTo}?redirect=${encodeURIComponent(currentUrl)}`;
      }
      return false;
    }
    return true;
  }
}