// Store global pour gérer l'état du configurateur
export class ConfiguratorStore {
  private static instance: ConfiguratorStore;
  private currentStep: number = 1;
  private listeners: ((step: number) => void)[] = [];

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