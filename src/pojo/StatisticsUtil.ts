/**
 * @description 统计工具类，用于执行统计计算。
 * @description Utility class for performing statistical calculations.
 */
class StatisticsUtil {
    /**
     * 计算给定数字的阶乘。
     * Calculates the factorial of a given number.
     * @param {number} n - 要计算阶乘的数字。
     * @returns {bigint} 给定数字的阶乘。
     */
    static factorial(n: number): bigint {
        let result: bigint = BigInt(1);
        for (let i = 2; i <= n; i++) {
            result *= BigInt(i);
        }
        return result;
    }
    /**
     * 使用bigint计算m个项目中取n个的排列数。
     * Computes the number of permutations of m items taken n at a time, using bigint for large calculations.
     * @param {number} n - 选择的项目数。
     * @param {number} m - 总项目数。
     * @returns {bigint} 排列数。
     * @private
     */
    private static permutationNum_bigint(n: number, m: number): bigint {
        return this.factorial(m) / this.factorial(m - n);
    }
    /**
     * 使用bigint计算m个项目中取n个的组合数。
     * Computes the number of combinations of m items taken n at a time, using bigint for large calculations.
     * @param {number} n - 选择的项目数。
     * @param {number} m - 总项目数。
     * @returns {bigint} 组合数。
     * @private
     */
    private static combinationNum_bigint(n: number, m: number): bigint {
        return this.permutationNum_bigint(n, m) / this.permutationNum_bigint(n, n);
    }
    /**
     * 计算m个项目中取n个的排列数，并以字符串形式返回。
     * Computes the number of permutations of m items taken n at a time, and returns it as a string.
     * @param {number} n - 选择的项目数。
     * @param {number} m - 总项目数。
     * @returns {string} 排列数。
     */
    static permutationNum(n: number, m: number): string {
        return this.permutationNum_bigint(n, m).toString();
    }
    /**
     * 计算m个项目中取n个的组合数，并以字符串形式返回。
     * Computes the number of combinations of m items taken n at a time, and returns it as a string.
     * @param {number} n - 选择的项目数。
     * @param {number} m - 总项目数。
     * @returns {string} 组合数。
     */
    static combinationNum(n: number, m: number): string {
        return this.combinationNum_bigint(n, m).toString();
    }
    /**
     * 从给定数组中生成所有n元素的排列。
     * Generates all permutations of n elements from the given array.
     * @param {T[]} arr - 生成排列的数组。
     * @param {number} n - 每个排列中的元素数。
     * @returns {T[][]} 包含所有排列的数组。
     * @template T - 数组中元素的类型。
     */
    static permutations<T>(arr: T[], n: number): T[][] {
        if (n === 1) {
            return arr.map((item) => [item]);
        }

        const result: T[][] = [];
        for (let i = 0; i < arr.length; i++) {
            const remainingElements = arr.slice(0, i).concat(arr.slice(i + 1));
            const subPermutations = this.permutations(remainingElements, n - 1);
            for (const subPermutation of subPermutations) {
                result.push([arr[i], ...subPermutation]);
            }
        }

        return result;
    }
    static randomNPermutations<T>(arr: T[], k: number, count: number): T[][] {
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
    static firstNPermutations<T>(arr: T[], k: number, count: number): T[][] {
        const result: T[][] = [];
        let iterations = 0;

        // 辅助函数，用于递归生成排列
        function generatePermutations(prefix: T[], remainingArray: T[]): void {
            if (iterations >= count) return; // 达到需要的排列数量，停止生成
            if (prefix.length === k) {
                result.push([...prefix]); // 复制prefix到结果中
                iterations++;
                return;
            }
            for (let i = 0; i < remainingArray.length; i++) {
                generatePermutations([...prefix, remainingArray[i]], [...remainingArray.slice(0, i), ...remainingArray.slice(i + 1)]);
            }
        }

        generatePermutations([], arr);
        return result;
    }
    /**
     * 从给定数组中生成所有n元素的组合。
     * Generates all combinations of n elements from the given array.
     * @param {T[]} arr - 生成组合的数组。
     * @param {number} n - 每个组合中的元素数。
     * @returns {T[][]} 包含所有组合的数组。
     * @template T - 数组中元素的类型。
     */
    static combinations<T>(arr: T[], n: number): T[][] {
        if (n === 1) {
            return arr.map((item) => [item]);
        }

        const result: T[][] = [];
        for (let i = 0; i < arr.length - n + 1; i++) {
            const subCombinations = this.combinations(arr.slice(i + 1), n - 1);
            for (const subCombination of subCombinations) {
                result.push([arr[i], ...subCombination]);
            }
        }

        return result;
    }

    static randomNCombinations<T>(arr: T[], k: number, count: number): T[][] {
        const total = this.combinationNum_bigint(arr.length, k);
        const seen = new Set<string>();

        // 生成单个k元组合的函数
        function generateSingleCombination(): T[] {
            const indices = Array.from({ length: arr.length }, (_, i) => i);
            const combination: T[] = [];

            for (let i = 0; i < k; i++) {
                const randomIndex = Math.floor(Math.random() * indices.length);
                combination.push(arr[indices[randomIndex]]);
                indices.splice(randomIndex, 1); // 移除已选择的索引以防止重复选择元素
            }

            // 根据原数组中的索引对组合元素进行排序
            return combination.sort((a, b) => arr.indexOf(a) - arr.indexOf(b));
        }

        if (total < 10000 || count > (total / BigInt(10)) * BigInt(8)) {
            return this.shuffle(this.combinations(arr, k)).splice(0, count);
        } else if (count < total / BigInt(5)) {
            console.log('生成不重复的排列，直到达到所需数量');
            // 生成不重复的排列，直到达到所需数量
            const result: T[][] = [];
            while (result.length < count) {
                const newPermutation = generateSingleCombination();
                const key = JSON.stringify(newPermutation);

                if (!seen.has(key)) {
                    seen.add(key);
                    result.push(newPermutation);
                }
            }
            return result;
        } else {
            const result: T[][] = [];
            while (result.length < count) {
                result.push(generateSingleCombination());
            }

            return result;
        }
    }

    /**
     * 按顺序生成前N个k元组合。
     * @param arr 原始数组。
     * @param k 从数组中选取的元素个数作为一个组合。
     * @param count 要返回的组合数量。
     * @returns 返回包含前count个组合的数组。
     */
    static firstNCombinations<T>(arr: T[], k: number, count: number): T[][] {
        const results: T[][] = [];
        const n = arr.length;
        const indices = Array.from({ length: k }, (_, i) => i);

        // 检查是否已经有足够的组合
        while (results.length < count) {
            const currentCombination: T[] = indices.map((i) => arr[i]);
            results.push(currentCombination);

            // 找到第一个可以增加的位置
            let i = k - 1;
            while (i >= 0 && indices[i] === i + n - k) i--;

            if (i < 0) break; // 所有的组合已经生成

            // 增加当前位置，并更新后面的位置
            indices[i]++;
            for (let j = i + 1; j < k; j++) {
                indices[j] = indices[j - 1] + 1;
            }
        }

        return results;
    }

    /**
     * 随机打乱数组中的元素顺序。
     * Randomly shuffles the elements in an array.
     * @param {T[]} arr - 待打乱的数组。
     * @returns {T[]} 打乱后的数组。
     * @template T - 数组元素的类型。
     */
    static shuffle<T>(arr: T[]): T[] {
        for (let i = arr.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
        }
        return arr;
    }

    /**
     * 计算多个数组的笛卡尔积。
     * 该函数接收多个数组作为输入，返回这些数组的笛卡尔积。
     * 笛卡尔积是从每个数组中选取一个元素所形成的所有可能组合的集合。
     *
     * @param {...T[][]} arrays - 一个或多个数组，每个数组可以包含不同类型的元素。
     * @returns {T[][]} 返回所有输入数组的笛卡尔积，每个组合是一个数组。
     * @template T 表示数组元素的类型。
     */
    static cartesianProduct<T>(...arrays: T[][]): T[][] {
        return arrays.reduce<T[][]>((acc, set) => acc.flatMap((accItem) => set.map((item) => [...accItem, item])), [[]]);
    }

    /**
     * 根据索引数组从多维数组中生成随机组合。
     * 该函数接受一个多维数组和一个索引数组（maxIndex），返回一个新数组，
     * 其中每个元素都是从各个子数组中根据对应的索引限制随机选择的。
     *
     * @param {T[][]} arrays - 一个二维数组，包含了若干子数组。
     * @param {number[]} maxIndex - 一个数字数组，每个数字代表对应子数组中可以选择的最大索引限制。
     * @returns {T[]} 返回一个由各子数组随机选取元素组成的新数组。
     * @template T 子数组中元素的类型。
     */
    static _generateRandomCombination = <T>(arrays: T[][], maxIndex: number[]): T[] => {
        return maxIndex.map((len, i) => arrays[i][Math.floor(Math.random() * len)]);
    };

    /**
     * 从给定的多维数组中随机生成或计算笛卡尔积中指定数量的样本组合。
     * 如果样本数小于一个特定的阈值，则随机生成无重复的样本。否则，简单地随机生成样本，可能包含重复。
     *
     * @param {T[][]} arrays - 用于生成笛卡尔积的数组集合。
     * @param {number} numSamples - 需要生成的样本数量。
     * @returns {T[][]} 生成的样本组合数组。
     * @template T 表示数组元素的类型。
     */
    static randomCartesianProduct = <T>(arrays: T[][], numSamples: number): T[][] => {
        const maxIndex = arrays.map((arr) => arr.length);
        const totalCombinations = maxIndex.reduce((acc, val) => acc * val, 1);
        if (numSamples > 0.6 * totalCombinations || totalCombinations < 10000) {
            return this.randomChild(this.cartesianProduct(...arrays), numSamples);
        } else if (numSamples < 0.2 * totalCombinations) {
            // 生成指定数量的随机样本，确保没有重复
            const result: T[][] = [];
            const seen = new Set<string>();
            while (result.length < numSamples) {
                const combination = this._generateRandomCombination(arrays, maxIndex);
                const key = JSON.stringify(combination);
                if (!seen.has(key)) {
                    seen.add(key);
                    result.push(combination);
                }
            }
            return result;
        } else {
            // 随机生成样本，但不检查重复
            const result: T[][] = [];
            for (let index = 0; index < numSamples; index++) {
                result.push(this._generateRandomCombination(arrays, maxIndex));
            }
            return result;
        }
    };
    /**
     * 从多个数组的笛卡尔积中获取前 N 个组合。
     * 使用生成器逐步产生每一个组合，一旦生成了所需数量的组合，就停止进一步的计算。
     * 这种方法避免了生成整个笛卡尔积的计算成本，特别适合在输入大量数据或需要的组合数量远少于总组合数量时使用。
     *
     * @param {T[][]} arrays - 用于生成笛卡尔积的数组列表，每个数组可以包含任意类型的元素。
     * @param {number} count - 需要获取的组合数量。
     * @returns {T[][]} 返回包含前 N 个笛卡尔积组合的数组。
     * @template T 表示数组中元素的类型。
     */
    static getFirstNCartesianProduct<T>(arrays: T[][], count: number): T[][] {
        let results: T[][] = [];

        // 生成器函数，用于生成笛卡尔积的每一个组合
        function* generateCombinations(index = 0, current: T[] = []): Generator<T[]> {
            if (index === arrays.length) {
                // 当达到数组长度时，产生一个完整的组合
                yield current;
            } else {
                for (let item of arrays[index]) {
                    // 对当前数组的每个元素进行迭代，并递归调用生成剩余数组的组合
                    yield* generateCombinations(index + 1, [...current, item]);
                }
            }
        }

        // 创建生成器
        let generator = generateCombinations();

        // 从生成器中获取所需数量的组合
        while (results.length < count) {
            let next = generator.next();
            if (next.done) break; // 如果生成器完成，则停止循环
            results.push(next.value);
        }

        return results;
    }

    static randomChild<T>(arrays: T[], count: number) {
        return this.shuffle(arrays).slice(0, count);
    }
}

export { StatisticsUtil };
