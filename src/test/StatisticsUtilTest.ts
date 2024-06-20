function randomNPermutations<T>(arr: T[], k: number, count: number): T[][] {
  const total = this.permutationNum_bigint(arr.length, k);

  const seen = new Set<string>();

  // 生成单个k元排列的函数
  function generateSinglePermutation(): T[] {
    let tempArray = [...arr];
    let permutation: T[] = [];

    for (let i = 0; i < k; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      permutation.push(tempArray[randomIndex]);
      tempArray.splice(randomIndex, 1); // 移除已选择的元素
    }

    return permutation;
  }
  if (total < 10000 || count > (total / BigInt(10)) * BigInt(8)) {
    return this.shuffle(this.permutations(arr, k)).splice(0, count);
  } else if (count < total / BigInt(5)) {
    // 生成不重复的排列，直到达到所需数量
    const result: T[][] = [];
    while (result.length < count) {
      const newPermutation = generateSinglePermutation();
      const key = JSON.stringify(newPermutation);

      if (!seen.has(key)) {
        seen.add(key);
        result.push(newPermutation);
      }
    }
    return result;
  } else {
    const result: T[][] = [];
    result.push(generateSinglePermutation());
    return result;
  }
}
const ls = randomNPermutations([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 6, 20);
console.log(ls);
