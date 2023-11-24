import Career from 'App/Models/Career'
import Factory from '@ioc:Adonis/Lucid/Factory'
import ClassFactory from 'Database/factories/ClassFactory'

export default Factory.define(Career, ({ faker }) => ({
  key: faker.string.uuid(),
  name: faker.lorem.lines(1),
  shortName: faker.lorem.word(1).toUpperCase(),
}))
  .relation('classes', () => ClassFactory)
  .build()
