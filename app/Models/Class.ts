import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Career from 'App/Models/Career'
import { Day } from 'App/Types/Day'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public subjectName: string
  @column()
  public subjectShortName: string
  @column()
  public day: Day
  @column()
  public startHour: string
  @column()
  public endHour: string
  @column()
  public group: string
  @column()
  public classroom: string
  @column()
  public careerId: number
  @belongsTo(() => Career)
  public career: BelongsTo<typeof Career>
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
