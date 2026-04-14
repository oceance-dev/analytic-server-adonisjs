import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Site from './site.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class PagesView extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare siteId: string

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

  @belongsTo(() => Site)
  declare site: BelongsTo<typeof Site>
}