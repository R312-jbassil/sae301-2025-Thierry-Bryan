// filepath: Backend/pocketbase/pb_hooks/email_verification.pb.js
// Hook pour personnaliser les URLs de vérification d'email

onAfterBootstrap((e) => {
  console.log("📧 Configuration des emails de vérification personnalisés");
});

// Hook pour modifier les URLs de vérification
onRecordAfterCreateRequest((e) => {
  if (e.record.collection().name === "users") {
    console.log("👤 Nouvel utilisateur créé, email de vérification à envoyer");

    // Personnaliser l'URL de vérification
    // Cette URL sera utilisée dans l'email automatique de PocketBase
    const verificationUrl = `${
      process.env.APP_URL || "http://localhost:4321"
    }/auth/confirm-verification`;

    console.log("🔗 URL de vérification:", verificationUrl);
  }
});

// Hook pour les requêtes de vérification d'email
onRecordBeforeRequestEmailVerificationRequest((e) => {
  console.log("📧 Demande de vérification d'email pour:", e.record.email());

  // Définir l'URL de redirection personnalisée
  e.record.set(
    "verification_url",
    `${
      process.env.APP_URL || "http://localhost:4321"
    }/auth/confirm-verification`
  );
});
