export const quantifierErrorCheck = (quantifier: number, numbers: number[]): { error: { message: string } } | null => {
    if (quantifier > numbers.length) {
        return {
            error: { message: 'Quantifier is larger than the array size' },
        };
    }

    if (quantifier <= 0) {
        return {
            error: { message: 'Quantifier needs to be > 0' },
        };
    }
    return null;
};

// Code from https://stackoverflow.com/questions/10359907/how-to-compute-the-sum-and-average-of-elements-in-an-array
export const average = (list: number[]): number => list.reduce((prev, curr) => prev + curr) / list.length;
export const median = (list: number[]): number => {
    const sorted = list.sort((a, b) => a - b);
    const mid = sorted.length / 2;
    return mid % 1 ? sorted[mid - 0.5] : (sorted[mid - 1] + sorted[mid]) / 2;
};
// Code from https://stackoverflow.com/questions/48719873/how-to-get-median-and-quartiles-percentiles-of-an-array-in-javascript-or-php
export const quantile = (list: number[], quantifier: number): number => {
    const sorted = list.sort((a, b) => a - b);
    const pos = (sorted.length - 1) * quantifier;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
};
