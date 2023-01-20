import { Heading, Text } from '@anderson-silva-ui/react'
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'

import previewImage from '@/assets/app-preview.png'
import { ClaimUsernameForm } from '@/components/ClaimUsernameForm'

export function HomePage() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl">Agendamento descomplicado</Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          alt="Calendário simbolizando o agendamento"
          height={400}
          quality={100}
          priority
        />
      </Preview>
    </Container>
  )
}
