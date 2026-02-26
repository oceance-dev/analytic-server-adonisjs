import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pages_views'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('site_id').references('sites.id').onDelete('CASCADE')
      table.string('path').nullable()
      table.string('referrer').nullable()
      table.string('device').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}