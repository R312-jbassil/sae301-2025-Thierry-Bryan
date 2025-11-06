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
        "id": "number3888531348",
        "max": null,
        "min": null,
        "name": "total_lunettes",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number3639163914",
        "max": null,
        "min": null,
        "name": "utilisateurs_actifs",
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
        "id": "number1572899779",
        "max": null,
        "min": null,
        "name": "pont_moyen",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      }
    ],
    "id": "pbc_3630109122",
    "indexes": [],
    "listRule": null,
    "name": "statistiques_lunettes",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  COUNT(*) as total_lunettes,\n  COUNT(DISTINCT id_utilisateur) as utilisateurs_actifs,\n  CAST(AVG(taille_verres) AS INTEGER) as taille_moyenne,\n  CAST(AVG(largeur_pont) AS INTEGER) as pont_moyen\nFROM Lunette",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3630109122");

  return app.delete(collection);
})
