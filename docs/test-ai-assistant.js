// Script de test pour l'Assistant IA
// À exécuter dans la console du navigateur sur /configurator

console.log('🧪 Test Assistant IA - TaVue Configurateur');

// Test 1: Vérifier que les éléments sont présents
function testUIElements() {
  const button = document.getElementById('open-ai-assistant');
  const popup = document.getElementById('ai-assistant-popup');
  
  console.log('✅ Bouton IA:', button ? 'Présent' : '❌ Manquant');
  console.log('✅ Popup IA:', popup ? 'Présent' : '❌ Manquant');
  
  return button && popup;
}

// Test 2: Vérifier que configurationData est exposé
function testConfigurationData() {
  const config = window.configurationData;
  console.log('✅ Configuration globale:', config ? 'Présent' : '❌ Manquant');
  
  if (config) {
    console.log('📊 Données actuelles:', {
      monture: config.couleur_monture,
      branches: config.couleur_branches,
      verres: config.couleur_verres
    });
  }
  
  return !!config;
}

// Test 3: Vérifier que le SVG est accessible
function testSVGAccess() {
  const svg = document.querySelector('#glasses-container svg');
  console.log('✅ SVG lunettes:', svg ? 'Présent' : '❌ Manquant');
  
  if (svg) {
    console.log('📐 Dimensions SVG:', {
      width: svg.getAttribute('width'),
      height: svg.getAttribute('height'),
      viewBox: svg.getAttribute('viewBox')
    });
  }
  
  return !!svg;
}

// Test 4: Simuler l'ouverture du popup
function testPopupOpen() {
  const button = document.getElementById('open-ai-assistant');
  const popup = document.getElementById('ai-assistant-popup');
  
  if (button && popup) {
    console.log('🔄 Simulation ouverture popup...');
    button.click();
    
    setTimeout(() => {
      const isVisible = !popup.classList.contains('hidden');
      console.log('✅ Popup visible:', isVisible ? 'Oui' : '❌ Non');
      
      // Fermer le popup
      if (isVisible) {
        const closeBtn = document.getElementById('close-ai-popup');
        closeBtn?.click();
        console.log('🔄 Popup fermé');
      }
    }, 100);
  }
}

// Test 5: Vérifier l'API endpoint
async function testAPIEndpoint() {
  try {
    console.log('🔄 Test de l\'endpoint API...');
    
    const response = await fetch('/api/modifyGlasses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'test' }],
        currentSVG: '<svg></svg>',
        configuration: { couleur_monture: '#000000' }
      })
    });
    
    console.log('✅ Réponse API:', response.status);
    
    if (response.status === 500) {
      console.log('⚠️ Erreur 500: Vérifiez votre token OpenRouter dans .env');
    }
    
  } catch (error) {
    console.log('❌ Erreur API:', error);
  }
}

// Exécuter tous les tests
async function runAllTests() {
  console.log('🚀 Lancement des tests...\n');
  
  const uiTest = testUIElements();
  const configTest = testConfigurationData();
  const svgTest = testSVGAccess();
  
  if (uiTest) testPopupOpen();
  
  await testAPIEndpoint();
  
  console.log('\n📋 Résumé:');
  console.log('- Interface:', uiTest ? '✅' : '❌');
  console.log('- Configuration:', configTest ? '✅' : '❌'); 
  console.log('- SVG:', svgTest ? '✅' : '❌');
  console.log('\n💡 Si tout est ✅, votre Assistant IA est prêt !');
  console.log('💡 Pour tester avec un vrai token, ajoutez OR_TOKEN dans votre .env');
}

// Auto-exécution
runAllTests();