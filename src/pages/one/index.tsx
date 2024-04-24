import { TODO_LIST } from '@/constants/mock-data'
import { useEffect, useState } from 'react'

interface FoodItemResult {
  type: string
  name: string
  time: number
  count: number
}
interface Result {
  type: string
  item: FoodItemResult[]
}

interface FoodItem {
  type: string
  name: string
}

const OnePage = () => {
  const [result, setResult] = useState<Result[]>([])
  const [foodList, setFoodList] = useState<FoodItem[]>([])

  const handleAddFoodInResult = (food: FoodItem) => {
    setResult(
      result.map((v) => ({
        type: v.type,
        item:
          food.type === v.type
            ? [
                ...v.item,
                { ...food, time: new Date().getTime() + 5000, count: 5 },
              ]
            : v.item,
      }))
    )
    setFoodList(foodList.filter((v) => v.name !== food.name))
  }

  const handleRemoveFoodInResult = (food: FoodItem) => {
    setResult(
      result.map((v) => ({
        type: v.type,
        item:
          v.type === food.type
            ? v.item.filter((v) => v.name !== food.name)
            : v.item,
      }))
    )
    if (
      !foodList.some(
        (item) => item.name === food.name && item.type === food.type
      )
    ) {
      setFoodList([...foodList, food])
    }
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

  const countResult = result.reduce((acc, cur) => {
    return (acc += cur.item.length)
  }, 0)

  useEffect(() => {
    let intervalTask: number = 0
    intervalTask = setInterval(() => {
      const newResult: Result[] = []
      const newFood: FoodItem[] = []
      result.forEach((item) => {
        const value = item.item.reduce(
          (acc: FoodItemResult[], cur: FoodItemResult) => {
            const currentTime = new Date().getTime()
            const diff = cur.time - currentTime
            if (diff <= 0) {
              newFood.push(cur)
              return acc
            }
            return [...acc, { ...cur, count: Number((diff / 1000).toFixed(2)) }]
          },
          []
        )
        newResult.push({ ...item, item: value })
      })
      setFoodList([...foodList, ...newFood])
      setResult(newResult)
    }, 100)
    if (countResult === 0) clearInterval(intervalTask)
    return () => clearInterval(intervalTask)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countResult, result])

  return (
    <div className='max-w-[1200px] m-auto pt-4 flex gap-2 min-h-[calc(100vh-96px)] px-4'>
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
      <div className='w-full bg-gray-50 grid grid-cols-2 gap-4 px-4 py-1'>
        {result.map((resultData) => {
          return (
            <div key={resultData.type} className='max-h-[200px]'>
              <div className='bg-gray-100 px-2 py-1 text-center'>
                {resultData.type}
              </div>
              <ul className='bg-white h-full space-y-2 overflow-auto py-2'>
                {resultData.item.map((item, index) => {
                  return (
                    <li
                      onClick={() => handleRemoveFoodInResult(item)}
                      key={`food-${resultData.type}-${index}`}
                      className='border px-3 py-1 text-center cursor-pointer w-full flex items-center justify-between'
                    >
                      {item.name}{' '}
                      <span className='text-gray-400'>({item.count}s)</span>
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
