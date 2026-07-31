import { createContext } from 'react'
import type { DataContextType} from '../../types/data_type'

export const DataContext = createContext<DataContextType>({} as DataContextType)