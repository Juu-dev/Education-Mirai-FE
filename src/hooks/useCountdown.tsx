import { useState, useEffect, useCallback } from "react";

export const useCountdown = (initialTime: number) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (time <= 0) return;

        const interval = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    const resetCountdown = useCallback((newTime: number) => {
        setTime(newTime);
    }, []);

    return [time, resetCountdown] as const;
};
