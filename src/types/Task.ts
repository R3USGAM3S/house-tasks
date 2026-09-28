export interface Task {
  name: string
  id: number
  frequency: string
  completed: boolean
  instructions: string[]
  supplies: string[]
  supplyLocation: string
  estimatedTime: number
}