import { type FilterValue } from '../types'
import { Filters } from './Filters'

interface Props {
  activeCount: number
  completedCount: number
  filterSelected: FilterValue
  onClearCompleted: () => void
  handleFilterChange: (filter: FilterValue) => void
}

export const Footer: React.FC<Props> = ({
  activeCount = 0,
  onClearCompleted,
  filterSelected,
  handleFilterChange,
  completedCount = 0
}) => {
  return (
        <footer className="footer">
            <span className="todo-count">
                <strong> {activeCount}</strong> Tareas pendientes
            </span>

            <Filters
            filterSelected={filterSelected}
             onFilterChange={handleFilterChange}/>

             {
              completedCount > 0 && (
                <button className="clear-completed" onClick={onClearCompleted}>
                  <span>Borrar completadas</span>
                </button>
              )
             }
        </footer>
  )
}
