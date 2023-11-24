import Class from 'App/Models/Class'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { Day } from 'App/Types/Day'
import CareerFactory from 'Database/factories/CareerFactory'

export default Factory.define(Class, ({ faker }) => ({
  day: 'monday' as Day,
  group: '1',
  startHour: '8:00',
  endHour: '10:00',
  classroom: 'A1',
  subjectName: faker.lorem.lines(1),
  subjectShortName: faker.lorem.word(1).toUpperCase(),
}))
  .relation('career', () => CareerFactory)
  .build()
