import { getWeekDays } from '@/utils/get-week-days'
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
import { useFieldArray, useForm } from 'react-hook-form'
import { Container, Header } from '../styles'

import {
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

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
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

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  })

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

      <IntervalBox as="form">
        <IntervalContainer>
          {fields.map((field, index) => (
            <IntervalItem key={field.id}>
              <IntervalDay>
                <Checkbox />
                <Text>{weekDays[field.weekDay]}</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.startTime`)}
                />
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.endTime`)}
                />
              </IntervalInputs>
            </IntervalItem>
          ))}
        </IntervalContainer>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
