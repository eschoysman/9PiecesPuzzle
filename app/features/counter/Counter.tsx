import React, {useEffect, useState} from 'react'
import {decrement, increment, incrementByAmount} from './counterSlice'
import {fetchSolutionAsync} from '../puzzle/puzzleSolutionSlice'
import {useAppDispatch, useAppSelector} from '@/app/hooks/hooksSelectors';

import styles from './Counter.module.css';
import SolutionsWithStore from "@/app/components/explore/solution/SolutionsWithStore";
import {allColorsState} from "@/app/components/filters/output/ResultColorFilter";

export default function Counter() {

    // The `state` arg is correctly typed as `RootState` already
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();


    const [incrementAmount, setIncrementAmount] = useState('2');

    useEffect(() => {
        dispatch(fetchSolutionAsync(count));
    }, [count]);

    const [colorShown, setColorShown] = useState<Record<string,string>>(allColorsState);

    return (
        <>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Increment value"
                    onClick={() => dispatch(increment()) }
                >
                    +
                </button>
                <span className={styles.value}>{count}</span>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
            </div>
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={e => setIncrementAmount(e.target.value)}
                />
                <button
                    className={styles.button}
                    onClick={() =>
                        dispatch(incrementByAmount(Number(incrementAmount) || 0))
                    }
                >
                    Add Amount
                </button>
                {/*<button*/}
                {/*    className={styles.asyncButton}*/}
                {/*    onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}*/}
                {/*>*/}
                {/*    Add Async*/}
                {/*</button>*/}
            </div>
            <SolutionsWithStore showSolutions={true} cellSize={25} colorToShow={colorShown} />
        </>
    )

}
