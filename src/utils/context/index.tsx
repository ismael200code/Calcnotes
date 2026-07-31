import type {DataTypeState } from "../../types/data_type";
import { DataContext } from "./data_context";
import { useState } from "react";


function DataProvider({children}) {
  
  const [data,setData] = useState<DataTypeState>({
    etudiant: [
      {id:1,coef:5,name:"something 1", data: [
        {name:"matiere 1",coef:1,difficultyExam:"good",difficultyTest:"good",id:1,unitesId:1},
        {name:"matiere 2",coef:1,difficultyExam:"good",difficultyTest:"good",id:2,unitesId:1}
      ]},
      {id:2,coef:5,name:"something 2", data: [
        {name:"matiere 3",coef:1,difficultyExam:"good",difficultyTest:"good",id:1,unitesId:2},
        {name:"matiere 4",coef:1,difficultyExam:"good",difficultyTest:"good",id:2,unitesId:2}
      ]},
    ],
    eleve: [
      {id:1,coef:5,difficultyMoyenne:"good",name:"matiere 1"},
      {id:2,coef:5,difficultyMoyenne:"good",name:"matiere 2"},
      {id:3,coef:5,difficultyMoyenne:"good",name:"matiere 3"},
    ],
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