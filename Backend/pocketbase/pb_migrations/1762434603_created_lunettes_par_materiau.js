/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_rmZg",
        "max": 0,
        "min": 0,
        "name": "materiau",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number789648372",
        "max": null,
        "min": null,
        "name": "nombre_lunettes",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number538441130",
        "max": null,
        "min": null,
        "name": "taille_moyenne",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number3676954775",
        "max": null,
        "min": null,
        "name": "utilisateurs_uniques",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      }
    ],
    "id": "pbc_1180767650",
    "indexes": [],
    "listRule": null,
    "name": "lunettes_par_materiau",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  m.libelle as materiau,\n  COUNT(l.id) as nombre_lunettes,\n  CAST(AVG(l.taille_verres) AS INTEGER) as taille_moyenne,\n  COUNT(DISTINCT l.id_utilisateur) as utilisateurs_uniques\nFROM Materiau m\nLEFT JOIN Lunette l ON m.id = l.id_materiau\nGROUP BY m.id, m.libelle\nORDER BY nombre_lunettes DESC",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1180767650");

  return app.delete(collection);
})
