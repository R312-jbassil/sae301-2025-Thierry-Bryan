// filepath: Backend/pocketbase/pb_hooks/email_verification.pb.js
// Hook pour personnaliser les URLs de vérification d'email

onAfterBootstrap((e) => {
  console.log("📧 Configuration des emails de vérification personnalisés");
});

// Hook pour intercepter l'envoi d'email de vérification
onMailerBeforeRecordVerificationSend((e) => {
  console.log("� Envoi d'email de vérification pour:", e.record.email());
  
  // Modifier l'URL de vérification pour pointer vers notre app Astro
  const baseUrl = process.env.APP_URL || "http://localhost:4321";
  e.message.html = e.message.html.replace(
    /http:\/\/localhost:8090\/auth\/confirm-verification\//g,
    `${baseUrl}/auth/confirm-verification/`
  );
  
  e.message.text = e.message.text.replace(
    /http:\/\/localhost:8090\/auth\/confirm-verification\//g,
    `${baseUrl}/auth/confirm-verification/`
  );
  
  console.log("� URL de vérification modifiée vers:", baseUrl);
});

// Hook pour les nouvelles inscriptions
onRecordAfterCreateRequest((e) => {
  if (e.record.collection().name === "users") {
    console.log("👤 Nouvel utilisateur créé:", e.record.email());
  }
});
