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
        "cascadeDelete": false,
        "collectionId": "pbc_3620903986",
        "hidden": false,
        "id": "relation2196385364",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "commande_id",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "_clone_Wu0t",
        "name": "date_commande",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "exceptDomains": null,
        "hidden": false,
        "id": "_clone_lCYi",
        "name": "client_email",
        "onlyDomains": null,
        "presentable": false,
        "required": true,
        "system": true,
        "type": "email"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_kRA4",
        "max": 255,
        "min": 0,
        "name": "client_name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_YPnC",
        "max": 0,
        "min": 0,
        "name": "nom_modele",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_Jyi1",
        "max": 0,
        "min": 0,
        "name": "couleur_monture",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_g7Ew",
        "max": 0,
        "min": 0,
        "name": "couleur_branches",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_HPXf",
        "max": 0,
        "min": 0,
        "name": "materiau",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      }
    ],
    "id": "pbc_1214799020",
    "indexes": [],
    "listRule": null,
    "name": "commandes_details",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  c.id as commande_id,\n  c.created as date_commande,\n  u.email as client_email,\n  u.name as client_name,\n  l.nom_modele,\n  l.couleur_monture,\n  l.couleur_branches,\n  m.libelle as materiau\nFROM Commande c\nLEFT JOIN users u ON c.id_utilisateur = u.id  \nLEFT JOIN Lunette l ON c.id_lunette = l.id\nLEFT JOIN Materiau m ON l.id_materiau = m.id\nORDER BY c.created DESC",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1214799020");

  return app.delete(collection);
})
