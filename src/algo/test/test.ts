



function Test(multiplication: number | null = 0): number | string {
  if (multiplication) {
    return multiplication
  }
  return "null"
}

console.log(Test(23))