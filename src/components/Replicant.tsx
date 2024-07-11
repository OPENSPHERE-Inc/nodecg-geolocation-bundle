import React, { useCallback, useEffect, useRef, useState } from "react";
import type { GeolocationReplicant } from "../types/schemas";

export const useReplicant = () => {
    const replicantRef = useRef(nodecg.Replicant<GeolocationReplicant>("geolocationReplicant"));
    const [value, setValue] = useState<GeolocationReplicant | undefined>(replicantRef.current.value);

    useEffect(() => {
        const handleChange = (newValue?: GeolocationReplicant) => setValue(newValue && { ...newValue });

        replicantRef.current.on("change", handleChange);

        return () => {
            replicantRef.current.removeListener("change", handleChange);
        };
    }, []);

    return {
        value,
        setValue: useCallback(
            (newValue?: React.SetStateAction<GeolocationReplicant | undefined>) => {
                if (typeof(newValue) === "function") {
                    replicantRef.current.value = newValue(replicantRef.current.value);
                } else {
                    replicantRef.current.value = newValue;
                }
            },
            []
        )
    };
};
