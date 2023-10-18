import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SiaseService } from 'App/Services/SiaseService/SiaseService'
import { inject } from '@adonisjs/fold'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
@inject()
export default class AuthController {
  constructor(private siaseService: SiaseService) {}
  public async loginShow({ view }: HttpContextContract) {
    return view.render('auth/login')
  }
  public async login({ view, request, auth, response, session }: HttpContextContract) {
    await sleep(1000)
    const payload = await request.validate({
      schema: schema.create({
        enrollment: schema.string(),
        password: schema.string(),
      }),
    })
    const result = await this.siaseService.login(payload.enrollment, payload.password)
    if (result === null)
      return response.unauthorized({ error: { message: 'Credenciales inválidas' } })
    const user = await User.firstOrCreate({ id: result.enrollment })
    await auth.use('web').login(user)
    response.header('HX-Redirect', '/')
    response.header('HX-Reswap', 'none')
    return view.render('components/login_form')
  }
}
