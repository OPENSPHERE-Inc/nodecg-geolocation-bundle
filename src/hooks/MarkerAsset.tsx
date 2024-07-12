import type NodeCG from '@nodecg/types';
import { useEffect, useRef, useState } from "react";


export const useMarkerAsset = () => {
    const assetRef = useRef(nodecg.Replicant<NodeCG.AssetFile[]>("assets:marker"));
    const [markers, setMarkers] = useState(assetRef.current.value);

    useEffect(() => {
        const handleChange = (newValue?: NodeCG.AssetFile[]) => setMarkers(newValue && [ ...newValue ]);
        assetRef.current.on("change", handleChange);

        return () => {
            assetRef.current.off("change", handleChange);
        };
    }, []);

    return { markers };
};

