import { useRef, useState } from "react";

const paddedNum = (num) => {
    return Number(num) > 9 ? `${num}` : `0${num}`;
};

const StopWatch = () => {
    const [timer, setTimer] = useState(0);
    const [stopped, setStoppedFlag] = useState(false);
    const secondsRef = useRef();

    const startTimer = () => {
        if (secondsRef.current) clearInterval(secondsRef.current);
        secondsRef.current = setInterval(() => {
            setTimer((t) => t + 1);
        }, 10);
    };

    const stopAndResumeTimer = () => {
        if (stopped) {
            setStoppedFlag(false);
            startTimer();
        } else {
            clearInterval(secondsRef.current);
            setStoppedFlag(true);
        }
    };

    const resetTimer = () => {
        setTimer(0);
        clearInterval(secondsRef.current);
    };

    const getTimeToDisplay = () => {
        // populate minutes
        let seconds = Math.floor(timer / 100);
        let minutes = Math.floor(seconds / 60);
        let ms = Math.floor(timer % 100);

        return `${paddedNum(minutes)}:${paddedNum(seconds)}:${paddedNum(ms)}`;
    };

    return (
        <article>
            <h1>Stopwatch</h1>
            <h2>{getTimeToDisplay()}</h2>

            <section className="btns">
                {timer ? (
                    <button onClick={stopAndResumeTimer}>
                        {stopped ? `Resume` : `Stop`}
                    </button>
                ) : (
                    <button onClick={startTimer}>Start</button>
                )}
                <button onClick={resetTimer}>Reset</button>
            </section>
        </article>
    );
};

export default StopWatch;
