import { test } from '@japa/runner'
import Env from '@ioc:Adonis/Core/Env'
import nock from 'nock'
import Career from 'App/Models/Career'
import { useGlobalTransaction } from '../../useGlobalTransaction'
import User from 'App/Models/User'
import { LoginPage } from '../pages/LoginPage'

test.group('home', (group) => {
  group.each.setup(useGlobalTransaction)
  test('shows the user schedule', async ({ visit }) => {})
})
