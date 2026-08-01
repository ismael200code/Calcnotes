export default function calculMoyenWithPercentage(pourcentagecompos: number, notesCompos: number, moyenControl: number) {
  const pourcentageControl = 1 - pourcentagecompos;
  return (notesCompos * pourcentagecompos + moyenControl * pourcentageControl)
}
