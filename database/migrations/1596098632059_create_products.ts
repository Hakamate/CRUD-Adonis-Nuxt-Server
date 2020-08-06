import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateProducts extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('price').notNullable()
      table.string('image').notNullable()
      table.text('description')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
