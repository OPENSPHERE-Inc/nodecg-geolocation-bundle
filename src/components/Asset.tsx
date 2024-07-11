import type NodeCG from '@nodecg/types';
import { useEffect, useRef, useState } from "react";


export const useAsset = () => {
    const assetRef = useRef(nodecg.Replicant<NodeCG.AssetFile[]>("assets:marker"));

    const [value, setValue] = useState(assetRef.current.value);

    useEffect(() => {
        const handleChange = (newValue?: NodeCG.AssetFile[]) => setValue(newValue && [ ...newValue ]);

        assetRef.current.on("change", handleChange);

        return () => {
            assetRef.current.removeListener("change", handleChange);
        };
    }, []);

    return { value };
};

