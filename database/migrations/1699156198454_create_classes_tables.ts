import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'classes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('subject_name').notNullable()
      table.string('subject_short_name').notNullable()
      table
        .enum('day', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])
        .notNullable()
      table.string('start_hour')
      table.string('end_hour')
      table.string('group')
      table.integer('classroom')
      table.integer('career_id').unsigned().references('id').inTable('careers').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
