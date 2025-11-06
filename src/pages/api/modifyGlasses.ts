// API endpoint pour modifier les lunettes avec OpenRouter AI
import type { APIRoute } from 'astro';

// Fonction de parsing local en cas de rate limit
function parseUserRequestLocally(userMessage: string): any {
  const message = userMessage.toLowerCase();
  const config: any = {};

  // Couleurs personnalisées créatives
  const customColors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', 
    '#ff9ff3', '#54a0ff', '#a55eea', '#26de81', '#fd79a8',
    '#3742fa', '#2f3542', '#ff3838', '#ff6348', '#1dd1a1'
  ];

  // Générer une configuration aléatoire
  const generateRandomConfig = () => {
    const randomColor1 = customColors[Math.floor(Math.random() * customColors.length)];
    const randomColor2 = customColors[Math.floor(Math.random() * customColors.length)];
    const lensColors = ['transparent', 'gray', 'blue', 'green', 'yellow', 'pink'];
    const materials = ['Plastique', 'Métal', 'Bois'];
    
    return {
      couleur_monture: randomColor1,
      couleur_branches: randomColor2,
      couleur_verres: lensColors[Math.floor(Math.random() * lensColors.length)],
      taille_verres: 48 + Math.floor(Math.random() * 13), // 48-60
      largeur_pont: 16 + Math.floor(Math.random() * 5), // 16-20
      materiau: materials[Math.floor(Math.random() * materials.length)]
    };
  };

  // Détecter les demandes aléatoires
  if (message.includes('aléatoire') || message.includes('aleatoire') || 
      message.includes('surprise') || message.includes('choisis') ||
      message.includes('hasard') || message.includes('random')) {
    return generateRandomConfig();
  }

  // RÈGLE IMPORTANTE: Si on dit "lunettes [couleur]" sans préciser de partie, ça change TOUT
  const isGeneralColor = (color: string) => {
    return (message.includes(`lunettes ${color}`) || 
            message.includes(`lunette ${color}`) ||
            message.includes(`tout en ${color}`) ||
            (message.includes(color) && !message.includes('monture') && !message.includes('branches') && !message.includes('verres')));
  };

  // Parser les couleurs - BLEU (nouvelle palette)
  if (message.includes('bleu') || message.includes('blue')) {
    const bleuColor = '#2563eb'; // Bleu océan
    if (isGeneralColor('bleu') || message.includes('tout')) {
      config.couleur_monture = bleuColor;
      config.couleur_branches = bleuColor;
      config.couleur_verres = 'blue';
    } else if (message.includes('monture')) {
      config.couleur_monture = bleuColor;
    } else if (message.includes('branches')) {
      config.couleur_branches = bleuColor;
    } else if (message.includes('verres')) {
      config.couleur_verres = 'blue';
    }
  }

  // Parser les couleurs - ROUGE (nouvelle palette)
  if (message.includes('rouge') || message.includes('red')) {
    const rougeColor = '#dc2626'; // Rouge cerise
    if (isGeneralColor('rouge') || message.includes('tout')) {
      config.couleur_monture = rougeColor;
      config.couleur_branches = rougeColor;
      config.couleur_verres = 'pink';
    } else if (message.includes('monture')) {
      config.couleur_monture = rougeColor;
    } else if (message.includes('branches')) {
      config.couleur_branches = rougeColor;
    } else if (message.includes('verres')) {
      config.couleur_verres = 'pink';
    }
  }

  // Parser les couleurs - VERT (nouvelle palette)
  if (message.includes('vert') || message.includes('green')) {
    const vertColor = '#059669'; // Vert émeraude
    if (isGeneralColor('vert') || message.includes('tout')) {
      config.couleur_monture = vertColor;
      config.couleur_branches = vertColor;
      config.couleur_verres = 'green';
    } else if (message.includes('monture')) {
      config.couleur_monture = vertColor;
    } else if (message.includes('branches')) {
      config.couleur_branches = vertColor;
    } else if (message.includes('verres')) {
      config.couleur_verres = 'green';
    }
  }

  // Parser les couleurs - VIOLET/MAUVE
  if (message.includes('violet') || message.includes('mauve') || message.includes('purple')) {
    const violetColor = '#7c3aed'; // Violet moderne
    if (isGeneralColor('violet') || isGeneralColor('mauve') || message.includes('tout')) {
      config.couleur_monture = violetColor;
      config.couleur_branches = violetColor;
      config.couleur_verres = 'pink';
    } else if (message.includes('monture')) {
      config.couleur_monture = violetColor;
    } else if (message.includes('branches')) {
      config.couleur_branches = violetColor;
    }
  }

  // Parser les couleurs - ORANGE
  if (message.includes('orange')) {
    const orangeColor = '#ea580c'; // Orange mandarine
    if (isGeneralColor('orange') || message.includes('tout')) {
      config.couleur_monture = orangeColor;
      config.couleur_branches = orangeColor;
      config.couleur_verres = 'yellow';
    } else if (message.includes('monture')) {
      config.couleur_monture = orangeColor;
    } else if (message.includes('branches')) {
      config.couleur_branches = orangeColor;
    }
  }

  // Parser les couleurs - GRIS
  if (message.includes('gris') || message.includes('gray') || message.includes('grey')) {
    const grisColor = '#374151'; // Gris anthracite
    if (isGeneralColor('gris') || message.includes('tout')) {
      config.couleur_monture = grisColor;
      config.couleur_branches = grisColor;
      config.couleur_verres = 'gray';
    } else if (message.includes('monture')) {
      config.couleur_monture = grisColor;
    } else if (message.includes('branches')) {
      config.couleur_branches = grisColor;
    } else if (message.includes('verres')) {
      config.couleur_verres = 'gray';
    }
  }

  if (message.includes('transparent')) {
    config.couleur_verres = 'transparent';
  }

  if (message.includes('rose') || message.includes('pink')) {
    config.couleur_verres = 'pink';
  }

  if (message.includes('jaune') || message.includes('yellow')) {
    config.couleur_verres = 'yellow';
  }

  // Parser les tailles avec plus de variations
  if (message.includes('grand') || message.includes('gros') || message.includes('plus grand') || 
      message.includes('grandes') || message.includes('grosse') || message.includes('taille') && message.includes('grand')) {
    config.taille_verres = 56;
  }
  if (message.includes('petit') || message.includes('plus petit') || message.includes('petites') || 
      message.includes('petite') || message.includes('taille') && message.includes('petit')) {
    config.taille_verres = 48;
  }
  
  // Parser les tailles spécifiques
  const sizeMatch = message.match(/(\d+)\s*mm/);
  if (sizeMatch) {
    const size = parseInt(sizeMatch[1]);
    if (size >= 45 && size <= 60) {
      config.taille_verres = size;
    }
  }

  // Parser les styles spéciaux
  if (message.includes('fun') || message.includes('coloré') || message.includes('original')) {
    const funColor1 = customColors[Math.floor(Math.random() * customColors.length)];
    const funColor2 = customColors[Math.floor(Math.random() * customColors.length)];
    config.couleur_monture = funColor1;
    config.couleur_branches = funColor2;
    config.couleur_verres = ['yellow', 'pink', 'blue'][Math.floor(Math.random() * 3)];
  }

  if (message.includes('vintage') || message.includes('retro')) {
    config.couleur_monture = '#d4a574'; // Doré vintage
    config.couleur_branches = '#d4a574';
    config.materiau = 'Métal';
    config.taille_verres = 52;
  }

  if (message.includes('professionnel') || message.includes('sobre') || message.includes('bureau')) {
    config.couleur_monture = '#374151';
    config.couleur_branches = '#374151';
    config.couleur_verres = 'gray';
    config.materiau = 'Métal';
  }

  // Parser les matériaux (noms mis à jour)
  if (message.includes('métal') || message.includes('metal') || message.includes('moderne')) {
    config.materiau = 'Métal';
  }
  if (message.includes('bois') || message.includes('naturel')) {
    config.materiau = 'Bois';
  }
  if (message.includes('plastique') || message.includes('classique') || message.includes('acétate')) {
    config.materiau = 'Plastique';
  }

  // Parser le pont
  if (message.includes('pont') && (message.includes('large') || message.includes('plus large'))) {
    config.largeur_pont = 20;
  }
  if (message.includes('pont') && (message.includes('étroit') || message.includes('plus étroit'))) {
    config.largeur_pont = 16;
  }

  console.log('🤖 Configuration locale générée:', config);
  return config;
}

export const POST: APIRoute = async ({ request }) => {
  let requestData: any = null;
  
  try {
    requestData = await request.json();
    const { messages, configuration } = requestData;
    
    console.log('🤖 Requête de modification IA reçue:', { messages, configuration });

    // Configuration OpenRouter
    const API_KEY = import.meta.env.OR_TOKEN;
    const BASE_URL = "https://openrouter.ai/api/v1";

    if (!API_KEY) {
      throw new Error('Token OpenRouter manquant');
    }

    // Message système pour analyser et définir la configuration des lunettes
    const systemMessage = {
      role: "system",
      content: `Tu es un assistant IA expert en design de lunettes. Tu comprends parfaitement les demandes en langage naturel et peux créer des configurations créatives et aléatoires.

Tu dois analyser la demande et retourner un objet JSON avec les modifications à appliquer.

COULEURS DE LA PALETTE HARMONIEUSE:
- couleur_monture et couleur_branches peuvent utiliser:
  * Palette prédéfinie: "#2563eb" (bleu océan), "#7c3aed" (violet moderne), "#059669" (vert émeraude), "#dc2626" (rouge cerise), "#ea580c" (orange mandarine), "#0891b2" (cyan tropical), "#4338ca" (indigo profond), "#374151" (gris anthracite)
  * OU couleurs personnalisées: n'importe quel code hex valide (ex: "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff")

- couleur_verres: "transparent", "gray", "dark-gray", "brown", "green", "blue", "yellow", "pink"
- taille_verres: nombre entre 45-60 (52=standard, 56=grand, 48=petit)
- largeur_pont: nombre entre 14-22 (18=standard, 20=large, 16=étroit)
- materiau: "Plastique", "Métal", "Bois"

INTELLIGENCE CRÉATIVE:
Pour les demandes "aléatoire", "surprise-moi", "choisis pour moi":
- Choisis des couleurs harmonieuses et créatives (palette + personnalisées)
- Varie les matériaux et dimensions pour créer des styles uniques
- Crée des combinaisons intéressantes (ex: monture rouge + branches violettes)

INTERPRÉTATION NATURELLE:
- "lunettes bleues/rouges/etc" → applique la couleur à monture ET branches (+ verres assortis)
- "style vintage" → matériau "Métal", couleurs classiques, dimensions moyennes
- "lunettes fun/colorées" → couleurs vives et personnalisées
- "sobres/professionnelles" → gris anthracite, métal, dimensions standard
- "grandes lunettes" → taille_verres 56
- "petites lunettes" → taille_verres 48
- "pont large/étroit" → largeur_pont 20/16

CONFIGURATION ACTUELLE:
Monture: ${configuration.couleur_monture}
Branches: ${configuration.couleur_branches}  
Verres: ${configuration.couleur_verres}
Taille: ${configuration.taille_verres}mm
Pont: ${configuration.largeur_pont}mm
Matériau: ${configuration.materiau || 'Plastique'}

EXEMPLES DE CONFIGURATIONS CRÉATIVES:
1. "lunettes aléatoires" → {"couleur_monture": "#ff6b6b", "couleur_branches": "#4ecdc4", "couleur_verres": "blue", "taille_verres": 54, "materiau": "Métal"}

2. "surprise-moi" → {"couleur_monture": "#7c3aed", "couleur_branches": "#ea580c", "couleur_verres": "yellow", "taille_verres": 50, "largeur_pont": 17}

3. "quelque chose de fun" → {"couleur_monture": "#45b7d1", "couleur_branches": "#feca57", "couleur_verres": "pink", "materiau": "Plastique"}

4. "lunettes bleues" → {"couleur_monture": "#2563eb", "couleur_branches": "#2563eb", "couleur_verres": "blue"}

5. "style vintage doré" → {"couleur_monture": "#d4a574", "couleur_branches": "#d4a574", "materiau": "Métal", "taille_verres": 52}

6. "lunettes professionnelles" → {"couleur_monture": "#374151", "couleur_branches": "#374151", "couleur_verres": "gray", "materiau": "Métal"}

7. "monture rouge custom" → {"couleur_monture": "#e74c3c"}

CRÉATIVITÉ REQUISE:
- Pour "aléatoire": mélange couleurs palette + personnalisées de manière harmonieuse
- Pour "surprise": crée des combinaisons uniques et audacieuses
- N'hésite pas à utiliser des codes hex créatifs: #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff, #a55eea, #26de81, #fd79a8

Réponds UNIQUEMENT avec du JSON valide, sans texte supplémentaire.`
    };

    // Appel à l'API OpenRouter
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "microsoft/phi-3-mini-128k-instruct:free",
        messages: [systemMessage, ...messages],
        max_tokens: 300,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      console.log(`⚠️ Erreur API OpenRouter: ${response.status}, utilisation du parsing local...`);
      // Fallback automatique : parser la demande localement pour toutes les erreurs API
      const localConfig = parseUserRequestLocally(messages[messages.length - 1].content);
      return new Response(JSON.stringify({ 
        success: true,
        configuration: localConfig,
        aiResponse: `Configuration générée localement (API indisponible: ${response.status})`
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    console.log('🤖 Réponse IA brute:', aiMessage);

    // Extraire la configuration JSON de la réponse
    let newConfiguration = {};
    
    try {
      console.log('🔍 Réponse IA à parser:', aiMessage);
      
      // Nettoyer le message d'abord
      let cleanMessage = aiMessage.trim();
      
      // Enlever les balises markdown si présentes
      cleanMessage = cleanMessage.replace(/```json\n?/, '').replace(/```\n?/, '');
      
      // Chercher un JSON dans la réponse
      const jsonMatch = cleanMessage.match(/\{[\s\S]*?\}/);
      if (jsonMatch) {
        console.log('🔍 JSON trouvé:', jsonMatch[0]);
        newConfiguration = JSON.parse(jsonMatch[0]);
        console.log('✅ Configuration extraite:', newConfiguration);
      } else {
        console.log('⚠️ Aucun JSON trouvé, tentative de parsing direct...');
        console.log('📝 Message nettoyé:', cleanMessage);
        newConfiguration = JSON.parse(cleanMessage);
      }
      
      // Vérification que l'objet contient au moins un paramètre valide
      const validKeys = ['couleur_monture', 'couleur_branches', 'couleur_verres', 'taille_verres', 'largeur_pont', 'materiau'];
      const hasValidKeys = Object.keys(newConfiguration).some(key => validKeys.includes(key));
      
      if (!hasValidKeys) {
        throw new Error('Aucun paramètre valide trouvé dans la réponse');
      }
      
    } catch (e) {
      console.error('❌ Erreur parsing JSON:', e);
      console.error('📝 Message original:', aiMessage);
      throw new Error(`L'IA n'a pas retourné une configuration valide. Erreur: ${e instanceof Error ? e.message : 'Format incorrect'}`);
    }

    return new Response(JSON.stringify({ 
      success: true,
      configuration: newConfiguration,
      aiResponse: aiMessage
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Erreur modification IA:', error);
    
    // Si l'API échoue complètement, utiliser le parsing local
    try {
      console.log('🔄 Fallback final vers parsing local...');
      if (requestData && requestData.messages && requestData.messages.length > 0) {
        const lastMessage = requestData.messages[requestData.messages.length - 1].content;
        const localConfig = parseUserRequestLocally(lastMessage);
        return new Response(JSON.stringify({ 
          success: true,
          configuration: localConfig,
          aiResponse: 'Configuration générée localement (IA hors ligne)'
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } catch (fallbackError) {
      console.error('❌ Erreur fallback:', fallbackError);
    }
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: `Erreur IA et fallback: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
};