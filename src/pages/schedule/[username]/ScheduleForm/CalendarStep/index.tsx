import { Calendar } from '@/components/Calendar'
import { http } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const router = useRouter()

  const isDateSelected = !!selectedDate
  const username = String(router.query.username)
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const discreteDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = dayjs(selectedDate).format('YYYY-MM-DD')

  const { data: availability } = useQuery<Availability>(
    ['availability', username, selectedDateWithoutTime],
    async () => {
      const response = await http.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })
      return response.data
    },
    {
      enabled: !!selectedDate,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  )

  function handleSelectTime(hour: number) {
    const selectedDateTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()
    onSelectDateTime(selectedDateTime)
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{discreteDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePickerItem
                  key={hour}
                  onClick={() => handleSelectTime(hour)}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
