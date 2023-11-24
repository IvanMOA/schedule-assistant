import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Class from 'App/Models/Class'

export default class Career extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public key: string
  @column()
  public name: string
  @column()
  public shortName: string
  @column()
  public userId: string
  @hasMany(() => Class)
  public classes: HasMany<typeof Class>
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
