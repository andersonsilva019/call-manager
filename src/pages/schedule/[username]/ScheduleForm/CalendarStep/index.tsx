import { Calendar } from '@/components/Calendar'
import { useState } from 'react'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            Terça-feira <span>20 de Setembro</span>
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
