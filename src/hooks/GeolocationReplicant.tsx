import React, { useCallback, useEffect, useState } from "react";
import type { GeolocationReplicant } from "../types/schemas";


export const useGeolocationReplicant = () => {
    const [ replicant ] = useState(() => nodecg.Replicant<GeolocationReplicant>("geolocationReplicant"));
    const [ geolocation, setGeolocation ] = useState<GeolocationReplicant | undefined>(replicant.value);

    useEffect(() => {
        const handleChange = (newValue?: GeolocationReplicant) => setGeolocation(newValue && { ...newValue });
        replicant.on("change", handleChange);

        return () => {
            replicant.off("change", handleChange);
        };
    }, [ replicant ]);

    return {
        geolocation,
        setGeolocation: useCallback(
            (newValue?: React.SetStateAction<GeolocationReplicant | undefined>) => {
                if (typeof (newValue) === "function") {
                    replicant.value = newValue(replicant.value);
                } else {
                    replicant.value = newValue;
                }
            },
            [ replicant ]
        )
    };
};

