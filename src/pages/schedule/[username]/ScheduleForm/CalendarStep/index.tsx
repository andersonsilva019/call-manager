import { Calendar } from '@/components/Calendar'
import { http } from '@/lib/axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState()
  const router = useRouter()

  const isDateSelected = !!selectedDate
  const username = String(router.query.username)
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const discreteDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  useEffect(() => {
    if (!selectedDate) {
      return
    }

    http
      .get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })
      .then((response) => {
        console.log(response.data)
      })
  }, [selectedDate, username])

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{discreteDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            <TimePickerItem>9:00h</TimePickerItem>
            <TimePickerItem>9:00h</TimePickerItem>
            <TimePickerItem>9:00h</TimePickerItem>
            <TimePickerItem>9:00h</TimePickerItem>
            <TimePickerItem>9:00h</TimePickerItem>
            <TimePickerItem>9:00h</TimePickerItem>
            <TimePickerItem>9:00h</TimePickerItem>
            <TimePickerItem>9:00h</TimePickerItem>
            <TimePickerItem>9:00h</TimePickerItem>
            <TimePickerItem>9:00h</TimePickerItem>
            <TimePickerItem>9:00h</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
