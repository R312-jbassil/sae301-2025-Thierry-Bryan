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
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "relation4220051791",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "utilisateur_id",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "exceptDomains": null,
        "hidden": false,
        "id": "_clone_yK6b",
        "name": "email",
        "onlyDomains": null,
        "presentable": false,
        "required": true,
        "system": true,
        "type": "email"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_FEEm",
        "max": 255,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
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
        "id": "number886001582",
        "max": null,
        "min": null,
        "name": "lunettes_creees",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "json1421237099",
        "maxSize": 1,
        "name": "derniere_creation",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json1840412770",
        "maxSize": 1,
        "name": "derniere_commande",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_90033419",
    "indexes": [],
    "listRule": null,
    "name": "activite_utilisateurs",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  u.id as utilisateur_id,\n  u.email,\n  u.name,\n  COUNT(DISTINCT c.id) as nombre_commandes,\n  COUNT(DISTINCT l.id) as lunettes_creees,\n  MAX(l.created) as derniere_creation,\n  MAX(c.created) as derniere_commande\nFROM users u\nLEFT JOIN Commande c ON u.id = c.id_utilisateur\nLEFT JOIN Lunette l ON u.id = l.id_utilisateur\nGROUP BY u.id, u.email, u.name\nHAVING COUNT(DISTINCT l.id) > 0 OR COUNT(DISTINCT c.id) > 0\nORDER BY lunettes_creees DESC, nombre_commandes DESC",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_90033419");

  return app.delete(collection);
})
