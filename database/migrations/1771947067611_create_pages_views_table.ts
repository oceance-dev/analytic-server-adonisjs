import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pages_views'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('site_id').references('sites.id').onDelete('CASCADE')
      table.string('path').nullable()
      table.string('referrer').nullable()
      table.json('device').nullable()
      table.json('os').nullable()
      table.json('browser').nullable()
      table.datetime('created_at')
      table.datetime('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}