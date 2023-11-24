import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { bind } from '@adonisjs/route-model-binding'
import Career from 'App/Models/Career'

export default class HomeController {
  public async home({ view, auth, session }: HttpContextContract) {
    await auth.user!.load('careers', (careersQuery) => careersQuery.preload('classes'))
    let selectedCareerId = session.get('selectedCareerId')
    if (!selectedCareerId) {
      const firstCareerWithClasses = auth.user!.careers.find((career) => career.classes.length > 0)
      selectedCareerId = firstCareerWithClasses?.id ?? auth.user!.careers[0].id
      session.put('selectedCareerId', selectedCareerId)
    }
    const selectedCareer = auth.user!.careers.find((career) => career.id === selectedCareerId)
    return view.render('home', { selectedCareer })
  }
  @bind()
  public async selectCareer({ session, response }: HttpContextContract, career: Career) {
    session.put('selectedCareerId', career.id)
    return response.redirect().toRoute('HomeController.home')
  }
}
