import { useState, useEffect } from "react";

export const useCountdown = (initialTime: number) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (time > 0) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            // Cleanup the interval when the component unmounts or when time reaches zero
            return () => clearInterval(timer);
        }
    }, [time]);

    const resetCountdown = (newTime: number) => {
        setTime(newTime);
    };

    return [time, resetCountdown] as const;
};
