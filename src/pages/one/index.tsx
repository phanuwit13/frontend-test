import { TODO_LIST } from '@/constants/mock-data'
import { useEffect, useState } from 'react'

interface Result {
  type: string
  item: FoodItem[]
}

interface FoodItem {
  type: string
  name: string
}

const OnePage = () => {
  const [result, setResult] = useState<Result[]>([])
  const [foodList, setFoodList] = useState<FoodItem[]>([])
  const [countdownList, setCountdownList] = useState<{ [key: string]: number }>(
    {}
  )

  const handleAddFoodInResult = (food: FoodItem) => {
    const newResult = result.map((v) => ({
      type: v.type,
      item: food.type === v.type ? [...v.item, food] : v.item,
    }))
    setResult(newResult)
    setFoodList(foodList.filter((v) => v.name !== food.name))
    const newCount = { [food.name]: 5000 }
    setCountdownList((prev) => ({ ...prev, ...newCount }))
    startCount(food)
  }

  const handleRemoveFoodInResult = (food: FoodItem) => {
    setResult((result) =>
      result.map((v) => ({
        type: v.type,
        item:
          v.type === food.type
            ? v.item.filter((v) => v.name !== food.name)
            : v.item,
      }))
    )
    setFoodList((foodList) => [...foodList, food])
    setCountdownList((prev) => {
      const newState = { ...prev }
      delete newState[food.name]
      return newState
    })
  }

  const startCount = (food: FoodItem) => {
    const intervalTask = setInterval(() => {
      setCountdownList((prevCount) => {
        const newTime = prevCount[food.name] - 100
        if (isNaN(newTime)) clearInterval(intervalTask)
        if (newTime === 0) {
          clearInterval(intervalTask)
          handleRemoveFoodInResult(food)
          setCountdownList((prev) => {
            const newState = { ...prev }
            delete newState[food.name]
            return newState
          })
        }
        return { ...prevCount, [food.name]: newTime }
      })
    }, 100)
  }

  useEffect(() => {
    if (TODO_LIST) {
      setFoodList(TODO_LIST)
      const uniqueTypes = new Set(TODO_LIST.map((item) => item.type))
      const foodType = Array.from(uniqueTypes)
      const initialResult = foodType.map((item) => ({ type: item, item: [] }))
      setResult(initialResult)
    }
  }, [])

  return (
    <div className='max-w-[1200px] m-auto pt-4 flex items-start gap-2 min-h-[calc(100vh-96px)] px-4'>
      <div className='w-[300px] space-y-2 py-1'>
        <div className='bg-gray-100 px-2 py-1 text-center'>LIST</div>
        <ul className='space-y-2'>
          {foodList.map((item) => {
            return (
              <li
                onClick={() => handleAddFoodInResult(item)}
                key={item.name}
                className='border px-2 py-1 text-center cursor-pointer'
              >
                {item.name}
              </li>
            )
          })}
        </ul>
      </div>
      <div className='w-full bg-gray-50 flex flex-wrap gap-4 px-4 py-1'>
        {result.map((resultData) => {
          return (
            <div key={resultData.type} className='flex-grow basis-[200px]'>
              <div className='bg-gray-100 px-2 py-1 text-center'>
                {resultData.type}
              </div>
              <ul className='bg-white space-y-2 overflow-auto py-2 h-[280px]'>
                {resultData.item.map((item, index) => {
                  return (
                    <li
                      onClick={() => handleRemoveFoodInResult(item)}
                      key={`food-${resultData.type}-${index}`}
                      className='border px-3 py-1 text-center cursor-pointer w-full flex items-center justify-between'
                    >
                      {item.name}{' '}
                      <span className='text-gray-400'>
                        ({countdownList[item.name] / 1000}s)
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OnePage
