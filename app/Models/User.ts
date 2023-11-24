import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Career from 'App/Models/Career'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public rememberMeToken: string | null

  @hasMany(() => Career)
  public careers: HasMany<typeof Career>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
