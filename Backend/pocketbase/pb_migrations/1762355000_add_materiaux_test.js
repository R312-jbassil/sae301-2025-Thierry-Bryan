/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2716722970");

  // Ajouter des matériaux de test
  const materiaux = [
    { libelle: "Acétate Artisanal" },
    { libelle: "Titane Premium" },
    { libelle: "Acier Inoxydable" },
    { libelle: "Corne Naturelle" },
    { libelle: "Plastique Recyclé" }
  ];

  materiaux.forEach((materiau) => {
    try {
      app.save(new Record(collection, materiau));
    } catch (e) {
      console.log("Matériau déjà existant ou erreur:", e);
    }
  });

}, (app) => {
  // Optionnel : supprimer les matériaux de test en rollback
  // const collection = app.findCollectionByNameOrId("pbc_2716722970");
  // const records = app.findRecordsByFilter(collection.id, "libelle != ''");
  // records.forEach(record => app.delete(record));
});