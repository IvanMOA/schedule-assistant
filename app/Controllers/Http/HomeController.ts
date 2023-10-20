import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class HomeController {
  public async home({ view, request, auth, response, session }: HttpContextContract) {
    const user = await auth.check()
    return view.render('home')
  }
}
