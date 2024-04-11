import { apiClient } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { UserResponse } from './user.type'

export const useGetUser = () => {
  return useQuery({
    queryKey: ['get-user'],
    queryFn: () => {
      return apiClient.get<UserResponse>(`/users`)
    },
    retry: false,
  })
}
