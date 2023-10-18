import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.raw(`CREATE TABLE users(
      id TEXT PRIMARY KEY,
      remember_me_token TEXT,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL
                     ) WITHOUT ROWID;`)
    // this.schema.createTable(this.tableName, (table) => {
    //   table.string('id').primary()
    //   table.string('remember_me_token').nullable()
    //   table.timestamp('created_at', { useTz: true }).notNullable()
    //   table.timestamp('updated_at', { useTz: true }).notNullable()
    // })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
