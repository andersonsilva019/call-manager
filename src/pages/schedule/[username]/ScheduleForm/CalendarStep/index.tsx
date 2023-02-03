import { Calendar } from '@/components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export function CalendarStep() {
  const isDateSelected = true

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar />
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
