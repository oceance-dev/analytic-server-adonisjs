import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Site from './site.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class PagesView extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare site_id: string

  @column()
  declare path: string

  @column()
  declare referrer: string

  @column()
  declare device: Object

  @column()
  declare os: Object

  @column()
  declare browser: Object

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Site)
  declare site: HasOne<typeof Site>
}