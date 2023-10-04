import { XMLParser } from 'fast-xml-parser'
import axios, { AxiosInstance } from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { path } from 'ramda'
import { inject } from '@adonisjs/fold'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import { HttpException } from '@adonisjs/http-server/build/src/Exceptions/HttpException'
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
    const { data } = await this.http.get('/', {
      params: {
        [this.loginParams.USER_TYPE]: SiaseUserType.Student,
        [this.loginParams.ENROLLMENT]: enrollment,
        [this.loginParams.PASSWORD]: password,
        [this.loginParams.SOMETHING]: '1',
      },
    })
    console.log(data)
    const isErrorPath = path(['LoginAppResponse', 'ttError', 'ttErrorRow', 'lError'])
    const jsonResponse = this.xmlParser.parse(data)
    const isError = isErrorPath(jsonResponse)
    if (isError === false) {
      return 'ok'
    } else {
      return null
    }
  }
}
