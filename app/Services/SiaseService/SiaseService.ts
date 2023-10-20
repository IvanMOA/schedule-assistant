import { XMLParser } from 'fast-xml-parser'
import axios, { AxiosInstance } from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { inject } from '@adonisjs/fold'
import { z } from 'zod'

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
    const response = await this.loginResponseSchema.safeParse(jsonResponse)
    if (!response.success) return null
    if (this.loginResponseIsError(response.data)) return null
    return {
      enrollment,
      careers: response.data.LoginAppResponse.ttCarrera.ttCarreraRow.map((career) => ({
        key: career.CveCarrera,
        name: career.DesCarrera,
        shortName: career.Abreviatura,
      })),
    }
  }
  private loginResponseSuccessSchema = z.object({
    LoginAppResponse: z.object({
      pochTipCve: z.string(),
      pochNombre: z.string(),
      pochCtrl: z.string(),
      Usu: z.string(),
      TipCve: z.string(),
      ttError: z.object({
        ttErrorRow: z.object({ lError: z.literal(false), cError: z.string() }),
      }),
      ttCarrera: z.object({
        ttCarreraRow: z.array(
          z.object({
            CveCarrera: z.string(),
            Abreviatura: z.string(),
            DesCarrera: z.string(),
          })
        ),
      }),
    }),
  })
  private loginResponseErrorSchema = z.object({
    LoginAppResponse: z.object({
      ttError: z.object({
        ttErrorRow: z.object({ lError: z.literal(true), cError: z.string() }),
      }),
    }),
  })
  private loginResponseSchema = z.union([
    this.loginResponseSuccessSchema,
    this.loginResponseErrorSchema,
  ])
  private loginResponseIsError = (
    response: z.infer<typeof this.loginResponseSuccessSchema | typeof this.loginResponseErrorSchema>
  ): response is z.infer<typeof this.loginResponseErrorSchema> => {
    return response.LoginAppResponse.ttError.ttErrorRow.lError
  }
}
