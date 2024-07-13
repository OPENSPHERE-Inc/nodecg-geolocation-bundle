import type NodeCG from "@nodecg/types";
import { useEffect, useState } from "react";


export const useMarkerAsset = () => {
    const [ asset ] = useState(() => nodecg.Replicant<NodeCG.AssetFile[]>("assets:marker"));
    const [ markers, setMarkers ] = useState(asset.value);

    useEffect(() => {
        const handleChange = (newValue?: NodeCG.AssetFile[]) => setMarkers(newValue && [ ...newValue ]);
        asset.on("change", handleChange);

        return () => {
            asset.off("change", handleChange);
        };
    }, [ asset ]);

    return { markers };
};

