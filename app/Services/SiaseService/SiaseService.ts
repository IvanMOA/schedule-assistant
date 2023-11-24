import { XMLParser } from 'fast-xml-parser'
import axios, { AxiosInstance } from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { inject } from '@adonisjs/fold'
import {
  loginResponseIsError,
  loginResponseSchema,
} from 'App/Services/SiaseService/siaseLoginResponseSchema'
import {
  scheduleResponseIsError,
  scheduleResponseSchema,
} from 'App/Services/SiaseService/siaseScheduleResponseSchema'
import { Day } from 'App/Types/Day'

enum SiaseUserType {
  Student = '01',
}
@inject()
export class SiaseService {
  private http: AxiosInstance
  private xmlParser = new XMLParser({
    numberParseOptions: {
      skipLike: new RegExp(/Usu|[0-9]{10}/),
      hex: false,
      leadingZeros: false,
    },
  })
  private loginParams = {
    USER_TYPE: '0c19de58',
    ENROLLMENT: '108be0d',
    PASSWORD: 'd937aa6b',
    PETITION_TYPE: '6bdf3ca',
  }
  private scheduleParams = {
    ENROLLMENT: '108be0d',
    SIASE_SESSION: 'pochCtrl',
    CAREER_KEY: 'CveCarrera',
    PETITION_TYPE: '6bdf3ca',
  }
  constructor() {
    this.http = axios.create({
      baseURL: Env.get('SIASE_BASE_URL'),
      headers: {
        'SOAPAction': 'urn:SIASE:Sso',
        'Content-Type': 'text/xml; charset=utf-8',
      },
    })
  }
  public async login(enrollment: string, password: string) {
    const { data } = await this.http.get('', {
      params: {
        [this.loginParams.USER_TYPE]: SiaseUserType.Student,
        [this.loginParams.ENROLLMENT]: enrollment,
        [this.loginParams.PASSWORD]: password,
        [this.loginParams.PETITION_TYPE]: '1',
      },
    })
    const jsonResponse = this.xmlParser.parse(data)
    const response = await loginResponseSchema.safeParse(jsonResponse)
    if (!response.success) return null
    if (loginResponseIsError(response.data)) return null
    return {
      enrollment,
      siaseSession: response.data.LoginAppResponse.pochCtrl,
      careers: response.data.LoginAppResponse.ttCarrera.ttCarreraRow.map((career) => ({
        key: career.CveCarrera,
        name: career.DesCarrera,
        shortName: career.Abreviatura,
      })),
    }
  }
  public async schedule(enrollment: string, siaseSession: string, careerKey: string) {
    try {
      const { data } = await this.http.get('', {
        params: {
          [this.scheduleParams.ENROLLMENT]: enrollment,
          [this.scheduleParams.SIASE_SESSION]: siaseSession,
          [this.scheduleParams.CAREER_KEY]: careerKey,
          [this.scheduleParams.PETITION_TYPE]: '4',
        },
      })
      const jsonResponse = this.xmlParser.parse(data)
      const response = await scheduleResponseSchema.safeParse(jsonResponse)
      if (!response.success) return null
      if (scheduleResponseIsError(response.data)) return null
      return {
        classes: response.data.HorarioEstPerActivoResponse.ttHorario.ttHorarioRow.map((row) => ({
          subjectShortName: row.DescCMateria,
          subjectName: row.DescLMateria,
          day: row.Dia as Day,
          startHour: row.HoraInicio,
          endHour: row.HoraFin,
          group: row.Grupo,
          classroom: row.Salon,
        })),
      }
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
