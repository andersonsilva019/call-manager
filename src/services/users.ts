import { http } from '@/lib/axios'

type CreateParams = {
  name: string
  username: string
}

export const usersService = {
  async create(data: CreateParams) {
    const response = await http.post('/users', {
      name: data.name,
      username: data.username,
    })

    return response.data
  },
}
