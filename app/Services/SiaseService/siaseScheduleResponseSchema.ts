import { z } from 'zod'

const scheduleResponseSuccessSchema = z.object({
  HorarioEstPerActivoResponse: z.object({
    plgError: z.literal(false),
    ttHorario: z.object({
      ttHorarioRow: z.array(
        z.object({
          DescLMateria: z.string(),
          DescCMateria: z.string(),
          Dia: z
            .number()
            .min(1)
            .max(7)
            .transform(
              (value) =>
                (
                  ({
                    1: 'monday',
                    2: 'tuesday',
                    3: 'wednesday',
                    4: 'thursday',
                    5: 'friday',
                    6: 'saturday',
                    7: 'sunday',
                  }) as const
                )[value]
            ),
          HoraInicio: z.string(),
          HoraFin: z.string(),
          Grupo: z.coerce.string(),
          Salon: z.coerce.string(),
        })
      ),
    }),
  }),
})
type ScheduleResponseSuccess = z.infer<typeof scheduleResponseSuccessSchema>
const scheduleResponseErrorSchema = z.object({
  HorarioEstPerActivoResponse: z.object({
    plgError: z.literal(true),
    pchError: z.string(),
  }),
})
type ScheduleResponseError = z.infer<typeof scheduleResponseErrorSchema>
export const scheduleResponseSchema = z.union([
  scheduleResponseSuccessSchema,
  scheduleResponseErrorSchema,
])
export const scheduleResponseIsError = (
  response: ScheduleResponseSuccess | ScheduleResponseError
): response is ScheduleResponseError => {
  return response.HorarioEstPerActivoResponse.plgError
}
