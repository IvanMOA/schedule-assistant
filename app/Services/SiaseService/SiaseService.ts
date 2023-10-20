import { XMLParser } from 'fast-xml-parser'
import axios, { AxiosInstance } from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { inject } from '@adonisjs/fold'
import {
  loginResponseIsError,
  loginResponseSchema,
} from 'App/Services/SiaseService/siaseLoginResponseSchema'

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
    SOMETHING: '6bdf3ca',
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
        [this.loginParams.SOMETHING]: '1',
      },
    })
    const jsonResponse = this.xmlParser.parse(data)
    const response = await loginResponseSchema.safeParse(jsonResponse)
    if (!response.success) return null
    if (loginResponseIsError(response.data)) return null
    return {
      enrollment,
      careers: response.data.LoginAppResponse.ttCarrera.ttCarreraRow.map((career) => ({
        key: career.CveCarrera,
        name: career.DesCarrera,
        shortName: career.Abreviatura,
      })),
    }
  }
}
