import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SiaseService } from 'App/Services/SiaseService/SiaseService'
import { inject } from '@adonisjs/fold'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import Career from 'App/Models/Career'
import UnAuthenticatedException from 'App/Exceptions/UnAuthenticatedException'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
@inject()
export default class AuthController {
  constructor(private siaseService: SiaseService) {}
  public async loginShow({ view, auth, response }: HttpContextContract) {
    if (await auth.check()) return response.redirect().toRoute('HomeController.home')
    return view.render('auth/login')
  }
  public async login({ view, request, auth, response, session }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        enrollment: schema.string(),
        password: schema.string(),
      }),
    })
    const result = await this.siaseService.login(payload.enrollment, payload.password)
    if (result === null) throw new UnAuthenticatedException('Credenciales inválidas')
    const trx = await Database.transaction()
    try {
      const user = await User.firstOrCreate(
        { id: result.enrollment },
        { id: result.enrollment },
        {
          client: trx,
        }
      )
      await Career.createMany(result.careers, { client: trx })
      await trx.commit()
      await auth.use('web').login(user)
      response.header('HX-Redirect', '/')
      response.header('HX-Reswap', 'none')
      return view.render('components/login_form')
    } catch (e) {
      console.log(e)
      await trx.rollback()
      return response.internalServerError({ error: { message: 'Error desconocido' } })
    }
  }
}
