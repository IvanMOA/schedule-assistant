import { z } from 'zod'

const loginResponseSuccessSchema = z.object({
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
type LoginResponseSuccess = z.infer<typeof loginResponseSuccessSchema>
const loginResponseErrorSchema = z.object({
  LoginAppResponse: z.object({
    ttError: z.object({
      ttErrorRow: z.object({ lError: z.literal(true), cError: z.string() }),
    }),
  }),
})
type LoginResponseError = z.infer<typeof loginResponseErrorSchema>
export const loginResponseSchema = z.union([loginResponseSuccessSchema, loginResponseErrorSchema])
export const loginResponseIsError = (
  response: LoginResponseSuccess | LoginResponseError
): response is LoginResponseError => {
  return response.LoginAppResponse.ttError.ttErrorRow.lError
}
