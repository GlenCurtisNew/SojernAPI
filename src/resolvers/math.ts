import { Resolver, Query, Field, Arg, ObjectType, Int } from 'type-graphql';

import { average, quantifierErrorCheck, median, quantile } from '../helpers';

@ObjectType()
class Error {
    @Field({ nullable: true })
    message?: string;
}

@ObjectType()
class ArrayResponse {
    @Field(() => Error, { nullable: true })
    error?: Error;

    @Field(() => [Number], { nullable: true })
    answer?: number[];
}

@ObjectType()
class NumberResponse {
    @Field(() => Error, { nullable: true })
    error?: Error;

    @Field(() => Number, { nullable: true })
    answer?: number;
}

@Resolver()
export class MathResolver {
    @Query(() => ArrayResponse)
    min(
        @Arg('numbers', () => [Number], { nullable: false }) numbers: number[],
        @Arg('quantifier', () => Number, { nullable: false }) quantifier: number,
    ): { answer: number[] } | { error: { message: string } } {
        const error = quantifierErrorCheck(quantifier, numbers);
        if (error) {
            return error;
        }

        /*
         * I am presuming here we want to remove duplicates from the array so if we had an array like this
         * [4, 1, 1, 2] and wanted to get the two lowest numbers (q = 2) we would want to return [1,2] and not [1,1]
         * Code below does this, we first sort the array, we then use ES6 to create a unique array and the splice on the quantifier
         */
        const sort = numbers.sort((a, b) => a - b);
        const uniqueAndSplice = [...new Set(sort)].splice(0, quantifier);
        return {
            answer: uniqueAndSplice,
        };
    }

    @Query(() => ArrayResponse)
    max(
        @Arg('numbers', () => [Number], { nullable: false }) numbers: number[],
        @Arg('quantifier', () => Number, { nullable: false }) quantifier: number,
    ): { answer: number[] } | { error: { message: string } } {
        const error = quantifierErrorCheck(quantifier, numbers);
        if (error) {
            return error;
        }

        const sort = numbers.sort((a, b) => b - a);
        const uniqueAndSplice = [...new Set(sort)].splice(0, quantifier);
        return {
            answer: uniqueAndSplice,
        };
    }

    @Query(() => NumberResponse)
    avg(
        @Arg('numbers', () => [Number], { nullable: false }) numbers: number[],
    ): { answer: number } | { error: { message: string } } {
        if (!numbers.length) {
            return {
                error: { message: 'Array must contain values' },
            };
        }
        return {
            answer: average(numbers),
        };
    }

    @Query(() => NumberResponse)
    median(
        @Arg('numbers', () => [Number], { nullable: false }) numbers: number[],
    ): { answer: number } | { error: { message: string } } {
        if (!numbers.length) {
            return {
                error: { message: 'Array must contain values' },
            };
        }
        return {
            answer: median(numbers),
        };
    }

    @Query(() => NumberResponse)
    percentile(
        @Arg('numbers', () => [Number], { nullable: false }) numbers: number[],
        @Arg('quantifier', () => Int, { nullable: false }) quantifier: number,
    ): { answer: number } | { error: { message: string } } {
        if (quantifier <= 0) {
            return {
                error: { message: 'Quantifier must be > 0' },
            };
        }

        return {
            answer: quantile(numbers, quantifier / 100),
        };
    }
}
