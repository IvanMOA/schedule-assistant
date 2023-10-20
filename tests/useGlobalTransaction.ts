import Database from '@ioc:Adonis/Lucid/Database'

export async function useGlobalTransaction() {
  await Database.beginGlobalTransaction()
  return () => Database.rollbackGlobalTransaction()
}
