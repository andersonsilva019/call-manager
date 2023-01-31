import { getWeekDays } from '@/utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useMemo } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Header } from '../styles'

import {
  FormError,
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from './styles'

enum WEEK_DAYS {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string().regex(/^\d{2}:\d{2}$/),
        endTime: z.string().regex(/^\d{2}:\d{2}$/),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Selecione pelo menos um dia da semana',
    }),
})

type TimeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TimeIntervalsFormData>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        {
          weekDay: WEEK_DAYS.SUNDAY,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: WEEK_DAYS.MONDAY,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: WEEK_DAYS.TUESDAY,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: WEEK_DAYS.WEDNESDAY,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: WEEK_DAYS.THURSDAY,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: WEEK_DAYS.FRIDAY,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: WEEK_DAYS.SATURDAY,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
      ],
    },
  })

  const weekDays = useMemo(() => getWeekDays(), [])

  const intervals = watch('intervals')

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  })

  async function handlerSetTimeIntervals(data: TimeIntervalsFormData) {
    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horário que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handlerSetTimeIntervals)}>
        <IntervalContainer>
          {fields.map((field, index) => (
            <IntervalItem key={field.id}>
              <IntervalDay>
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                      checked={field.value}
                    />
                  )}
                />
                <Text>{weekDays[field.weekDay]}</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.startTime`)}
                />
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.endTime`)}
                />
              </IntervalInputs>
            </IntervalItem>
          ))}
        </IntervalContainer>

        {errors.intervals && (
          <FormError size="sm">{errors.intervals.message}</FormError>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
