import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SiaseService } from 'App/Services/SiaseService/SiaseService'
import { inject } from '@adonisjs/fold'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
@inject()
export default class AuthController {
  constructor(private siaseService: SiaseService) {}
  public async loginShow({ view }: HttpContextContract) {
    return view.render('auth/login')
  }
  public async login({ view, request, session, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        enrollment: schema.string(),
        password: schema.string(),
      }),
    })
    const result = await this.siaseService.login(payload.enrollment, payload.password)
    console.log('siase auth result is ', result)
    session.flash('message', {
      text: 'Credenciales inválidas',
      type: 'error',
    })
    response.redirect('/login')
  }
}
