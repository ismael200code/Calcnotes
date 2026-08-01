
export default function moyenGeneral(tableauMoyen: number[][] | [number, number, string][]): number {
  let moyenBrute: number = 0
  let coefTotal: number = 0
  for (let i = 0; i < tableauMoyen.length; i++) {
    moyenBrute += tableauMoyen[i][0] * tableauMoyen[i][1]
    coefTotal += tableauMoyen[i][1]
  }
  return moyenBrute / coefTotal
}

