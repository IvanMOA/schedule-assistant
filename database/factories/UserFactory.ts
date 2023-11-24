import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import CareerFactory from 'Database/factories/CareerFactory'

export default Factory.define(User, ({ faker }) => {
  return {
    id: faker.number.int({ min: 1_000_000, max: 9_999_999 }).toString(),
  }
})
  .relation('careers', () => CareerFactory)
  .build()
