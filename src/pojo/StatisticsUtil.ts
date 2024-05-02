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
}

export { StatisticsUtil };
