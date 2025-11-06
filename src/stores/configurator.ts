// Interface pour la configuration des lunettes
export interface GlassesConfiguration {
  // Couleurs
  frameColor: string;
  templeColor: string;
  lensColor: string;
  
  // Matériau
  material: 'acetate' | 'metal' | 'titanium';
  
  // Type de verres
  lensType: 'clear' | 'sun' | 'blue-light';
  
  // Dimensions (en mm)
  frameWidth: number;
  templeLength: number;
  bridgeWidth: number;
  
  // Forme (optionnel pour l'instant)
  frameShape?: 'round' | 'square' | 'cat-eye' | 'aviator';
}

// Configuration par défaut
const DEFAULT_CONFIG: GlassesConfiguration = {
  frameColor: '#1a1a1a',
  templeColor: '#1a1a1a', 
  lensColor: '#87CEEB',
  material: 'acetate',
  lensType: 'clear',
  frameWidth: 140,
  templeLength: 140,
  bridgeWidth: 16,
  frameShape: 'round'
};

// Store global pour gérer l'état du configurateur
export class ConfiguratorStore {
  private static instance: ConfiguratorStore;
  private currentStep: number = 1;
  private listeners: ((step: number) => void)[] = [];
  private configuration: GlassesConfiguration = { ...DEFAULT_CONFIG };
  private configListeners: ((config: GlassesConfiguration) => void)[] = [];

  static getInstance(): ConfiguratorStore {
    if (!ConfiguratorStore.instance) {
      ConfiguratorStore.instance = new ConfiguratorStore();
    }
    return ConfiguratorStore.instance;
  }

  getCurrentStep(): number {
    return this.currentStep;
  }

  setCurrentStep(step: number): void {
    if (step >= 1 && step <= 5) {
      this.currentStep = step;
      this.notifyListeners();
    }
  }

  nextStep(): void {
    this.setCurrentStep(this.currentStep + 1);
  }

  prevStep(): void {
    this.setCurrentStep(this.currentStep - 1);
  }

  subscribe(listener: (step: number) => void): void {
    this.listeners.push(listener);
  }

  unsubscribe(listener: (step: number) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  // Méthodes pour la configuration des lunettes
  getConfiguration(): GlassesConfiguration {
    return { ...this.configuration };
  }

  updateConfiguration(updates: Partial<GlassesConfiguration>): void {
    this.configuration = { ...this.configuration, ...updates };
    this.notifyConfigListeners();
  }

  resetConfiguration(): void {
    this.configuration = { ...DEFAULT_CONFIG };
    this.notifyConfigListeners();
  }

  subscribeToConfig(listener: (config: GlassesConfiguration) => void): void {
    this.configListeners.push(listener);
  }

  unsubscribeFromConfig(listener: (config: GlassesConfiguration) => void): void {
    this.configListeners = this.configListeners.filter(l => l !== listener);
  }

  private notifyConfigListeners(): void {
    this.configListeners.forEach(listener => listener(this.configuration));
    
    // Émettre un événement global pour la config
    window.dispatchEvent(new CustomEvent('configChange', { 
      detail: { configuration: this.configuration } 
    }));
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentStep));
    
    // Émettre un événement global
    window.dispatchEvent(new CustomEvent('stepChange', { 
      detail: { currentStep: this.currentStep } 
    }));
  }
}

// Instance globale
export const configuratorStore = ConfiguratorStore.getInstance();