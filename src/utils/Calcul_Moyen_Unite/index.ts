import calculMoyenMatiere from "../Calcul_Moyen_Matiere"
import tronquerNombre from "../Trunc"



export default function calculMoyenUnite(id:number,data:{id:number,name:string,coef:number,examNote:number,controlNote:number} []) {

  const moyenCoefMatiere: {moyen: number, coef: number} [] = []
  let generalCoef = 0

  for (let i = 0; i < data.length; i++) {
    if (data[i].id===id) {
      generalCoef += data[i].coef

      const moyenCoef = {moyen: calculMoyenMatiere(data[i].controlNote,data[i].examNote),coef:data[i].coef}
      moyenCoefMatiere.push(moyenCoef)
    }
  }

  let sommeMoyeneCoef = 0
  for (let i = 0; i < moyenCoefMatiere.length; i++) {
    sommeMoyeneCoef += moyenCoefMatiere[i].coef*moyenCoefMatiere[i].moyen
  }

  return tronquerNombre(sommeMoyeneCoef/generalCoef)

}