import { useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Todos } from './components/Todos'
import { TODO_FILTERS } from './consts'
import { type TodoTitle, type FilterValue, type Todo as TodoType, type TodoId } from './types'

const mockToDos = [
  {
    id: '1',
    title: 'todo 1',
    completed: true
  },

  {
    id: '2',
    title: 'todo 2',
    completed: false
  },

  {
    id: '3',
    title: 'todo 3',
    completed: false
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockToDos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter(todo => !todo.completed).length

  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false

    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return (
   <div className="todoapp">
    <Header onAddTodo={handleAddTodo} />

      <Todos todos={filteredTodos}
      onRemoveTodo={handleRemove}
      onToggleCompletedTodo={handleCompleted}
       />
       <Footer
       activeCount={activeCount}
       filterSelected={filterSelected}
       handleFilterChange={handleFilterChange}
       completedCount={completedCount}
       onClearCompleted={handleRemoveAllCompleted}
        />
    </div>
  )
}

export default App
