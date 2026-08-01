export default function calculMoyen(tableau: number[]) {
  let som = 0;
  for (let i = 0; i < tableau.length; i++) {
    som += tableau[i];
  };
  return som / tableau.length
}
