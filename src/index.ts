import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num:number) {
    return _.reduce(
        numRef,
        (accum, ref) => {
            return ref.num === num ? ref.word : accum;
        },
        ''
    );
}

export function wordToNum(word:number) {
    return _.reduce(
        numRef,
        (accum, ref) => {
            // @ts-ignore
            return ref.word === word && word.toLowerCase() ? ref.num : accum;
        },
        -1
    );
}