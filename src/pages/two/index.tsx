import { useGetUser } from '@/services/user/user'
import { UserResponse } from '@/services/user/user.type'
import { useEffect, useState } from 'react'

interface DepartmentSummary {
  male: number
  female: number
  ageRange?: string // Optional because it's not implemented in the provided code
  hair: {
    [color: string]: number
  }
  addressUser: {
    [name: string]: string
  }
}

interface Summary {
  [department: string]: DepartmentSummary
}

const TwoPage = () => {
  const { data } = useGetUser()

  const [user, setUser] = useState<Summary>({})

  const summarizeData = (data: UserResponse) => {
    const summary: Summary = {}

    data.users.forEach((user) => {
      const department = user.company.department
      const gender = user.gender as 'male' | 'male'
      if (!summary[department]) {
        summary[department] = { male: 0, female: 0, hair: {}, addressUser: {} }
      }

      summary[department][gender] += 1

      const hairColor = user.hair.color
      if (!summary[department].hair[hairColor]) {
        summary[department].hair[hairColor] = 0
      }
      summary[department].hair[hairColor] += 1

      const fullName = user.firstName + user.lastName
      summary[department].addressUser[fullName] = user.address.postalCode
    })

    return summary
  }

  useEffect(() => {
    if (data?.data) {
      const res = summarizeData(data?.data)
      console.log('res', res)
      setUser(res)
    }
  }, [data?.data])

  return (
    <div className='max-w-[1200px] m-auto pt-4 min-h-[calc(100vh-96px)] px-4 space-y-4'>
      {Object.entries(user).map(([department, details]) => (
        <div key={department} className='border px-2 py-1'>
          <h2>{department}</h2>
          <div>Male: {details.male}</div>
          <div>Female: {details.female}</div>
          <div>
            <strong>Hair Colors:</strong>
            {Object.entries(details.hair).map(([color, count]) => (
              <div key={color}>
                {color}: {count}
              </div>
            ))}
          </div>
          <div>
            <strong>Addresses:</strong>
            {Object.entries(details.addressUser).map(([name, postalCode]) => (
              <div key={name}>
                {name}: {postalCode}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TwoPage
