# Assistant IA pour le Configurateur de Lunettes

## Configuration

### 1. Token OpenRouter

1. Créez un compte sur [OpenRouter.ai](https://openrouter.ai)
2. Obtenez votre token API 
3. Créez un fichier `.env` à la racine du projet :

```bash
OR_TOKEN=your_openrouter_token_here
```

### 2. Structure des fichiers

```
src/
├── pages/
│   ├── api/
│   │   └── modifyGlasses.ts     # API endpoint pour l'IA
│   └── configurator/
│       └── index.astro          # Page principale (IA intégrée)
├── components/
│   └── configurator/
│       ├── AIAssistant.astro    # Composant popup IA
│       └── ActionsConfigPanel.astro  # Exposé configurationData
└── .env.example                 # Template variables
```

## Utilisation

### 1. Interface utilisateur

- **Bouton flottant** : Icône IA en bas à droite avec animation
- **Popup élégant** : Interface conversationnelle avec aperçu
- **Conversation** : Historique des échanges avec l'IA
- **Aperçu temps réel** : Voir les modifications avant application

### 2. Fonctionnalités

- ✅ **Modification de formes** : "Rends les verres plus arrondis"
- ✅ **Changement de couleurs** : "Change la monture en rouge"
- ✅ **Ajustement de style** : "Fais un design plus moderne"
- ✅ **Combinaisons** : "Verres bleus et monture dorée"

### 3. Exemples de commandes

```
"Rends les verres plus arrondis et change la monture en rouge"
"Fais un style plus vintage avec des branches dorées"
"Adapte les lunettes pour un look plus moderne"
"Change les proportions pour des verres plus grands"
```

## Architecture technique

### API Endpoint (`/api/modifyGlasses`)

- **Input** : Messages de conversation + SVG actuel + configuration
- **Processing** : Appel à OpenRouter avec gpt-oss-20b (gratuit)
- **Output** : SVG modifié + réponse textuelle

### Composant AIAssistant

- **État** : Conversation, SVG courant, configuration
- **Actions** : Envoi prompts, aperçu, application
- **Integration** : Communication avec le configurateur principal

### Flux de données

1. **Capture** : SVG + configuration actuels
2. **Envoi** : Prompt utilisateur → API → OpenRouter
3. **Réception** : SVG modifié + explication IA  
4. **Aperçu** : Affichage sans modification du principal
5. **Application** : Remplacement du SVG principal

## Sécurité

- ✅ Token API sécurisé (variables d'environnement)
- ✅ Validation des entrées utilisateur
- ✅ Gestion d'erreurs robuste
- ✅ Limite de tokens pour éviter les coûts

## Personnalisation

### Modifier le prompt système

Éditez `src/pages/api/modifyGlasses.ts` ligne ~15 :

```typescript
const systemMessage = {
  role: "system", 
  content: `Votre prompt personnalisé...`
}
```

### Changer le modèle IA

Modifiez la ligne ~35 :

```typescript
model: "openai/gpt-oss-20b:free", // ou autre modèle
```

### Ajuster l'interface

Personnalisez `src/components/configurator/AIAssistant.astro` :
- Couleurs, animations, layout
- Messages par défaut
- Boutons et actions

## Dépendances

```json
{
  "openai": "^4.x.x"  // Client OpenAI compatible OpenRouter
}
```

## Troubleshooting

### Erreur "Token manquant"
- Vérifiez votre fichier `.env`
- Redémarrez le serveur de dev

### Erreur API OpenRouter  
- Vérifiez votre crédit OpenRouter
- Testez avec un autre modèle

### SVG non appliqué
- Vérifiez la console pour les erreurs
- Assurez-vous que `configurationData` est bien exposé

## Performance

- **Temps de réponse** : 2-5 secondes selon le modèle
- **Coût** : Gratuit avec gpt-oss-20b (limité)
- **Cache** : Pas de cache, chaque requête est unique