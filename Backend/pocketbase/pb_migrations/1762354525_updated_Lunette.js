/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3690071135")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number1396272600",
    "max": null,
    "min": null,
    "name": "largeur_pont",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number438371369",
    "max": null,
    "min": null,
    "name": "taille_verres",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2480739828",
    "max": 0,
    "min": 0,
    "name": "couleur_verres",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text345886070",
    "max": 0,
    "min": 0,
    "name": "couleur_monture",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3264248446",
    "max": 0,
    "min": 0,
    "name": "couleur_branches",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2716722970",
    "hidden": false,
    "id": "relation1208889792",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "id_materiau",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3690071135")

  // remove field
  collection.fields.removeById("number1396272600")

  // remove field
  collection.fields.removeById("number438371369")

  // remove field
  collection.fields.removeById("text2480739828")

  // remove field
  collection.fields.removeById("text345886070")

  // remove field
  collection.fields.removeById("text3264248446")

  // remove field
  collection.fields.removeById("relation1208889792")

  return app.save(collection)
})
