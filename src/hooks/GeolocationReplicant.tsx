import React, { useCallback, useEffect, useRef, useState } from "react";
import type { GeolocationReplicant } from "../types/schemas";

export const useGeolocationReplicant = () => {
    const replicantRef = useRef(nodecg.Replicant<GeolocationReplicant>("geolocationReplicant"));
    const [geolocation, setGeolocation] = useState<GeolocationReplicant | undefined>(replicantRef.current.value);

    useEffect(() => {
        const handleChange = (newValue?: GeolocationReplicant) => setGeolocation(newValue && { ...newValue });
        replicantRef.current.on("change", handleChange);

        return () => {
            replicantRef.current.off("change", handleChange);
        };
    }, []);

    return {
        geolocation,
        setGeolocation: useCallback(
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

