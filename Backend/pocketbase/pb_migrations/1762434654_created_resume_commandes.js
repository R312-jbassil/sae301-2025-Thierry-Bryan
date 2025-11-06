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
        "hidden": false,
        "id": "json2917126107",
        "maxSize": 1,
        "name": "date_commande",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "number3296125494",
        "max": null,
        "min": null,
        "name": "nombre_commandes",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number296155373",
        "max": null,
        "min": null,
        "name": "utilisateurs_distincts",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number3228569886",
        "max": null,
        "min": null,
        "name": "couleurs_distinctes",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      }
    ],
    "id": "pbc_2734343118",
    "indexes": [],
    "listRule": null,
    "name": "resume_commandes",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  DATE(c.created) as date_commande,\n  COUNT(*) as nombre_commandes,\n  COUNT(DISTINCT c.id_utilisateur) as utilisateurs_distincts,\n  COUNT(DISTINCT l.couleur_monture) as couleurs_distinctes\nFROM Commande c\nLEFT JOIN Lunette l ON c.id_lunette = l.id\nGROUP BY DATE(c.created)\nORDER BY date_commande DESC",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2734343118");

  return app.delete(collection);
})
