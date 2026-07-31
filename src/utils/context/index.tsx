import type {DataTypeState } from "../../types/data_type";
import { DataContext } from "./data_context";
import { useState } from "react";


function DataProvider({children}) {
  
  const [data,setData] = useState<DataTypeState>({
    etudiant: [],
    eleve: [],
    moyenneEleve: 0,
    moyenneEtudiant: 0
  })


  return (
    <DataContext.Provider value={[data,setData]}>
      <div className="py-4 px-3">
        {children}
      </div>
    </DataContext.Provider>
  )
}

export default DataProvider