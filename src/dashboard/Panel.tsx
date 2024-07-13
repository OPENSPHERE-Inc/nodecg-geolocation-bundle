import React, { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGeolocationReplicant } from "../hooks/GeolocationReplicant";
import { GeolocationReplicant } from "../types/schemas";
import "./panel.scss";


interface FormData {
    position: number[];
    address: string;
}

interface FormProps {
	geolocation?: GeolocationReplicant,
	onSubmit: (values: FormData) => unknown
}

const Form = ({ geolocation, onSubmit }: FormProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        getFieldState,
        formState: { isSubmitting, isValid }
    } = useForm<FormData>({
        defaultValues: {
            position: geolocation?.position,
            address: geolocation?.address,
        }
    });

    useEffect(() => {
        const positionState = getFieldState("position");
        if (geolocation?.position && !positionState.isDirty) {
            setValue("position", geolocation.position);
        }

        const addressState = getFieldState("address");
        if (geolocation?.address && !addressState.isDirty) {
            setValue("address", geolocation.address);
        }
    }, [ geolocation?.position, geolocation?.address ]);

    return (<form onSubmit={ handleSubmit(onSubmit) }>
        <label className="label">
            Position <span className="has-text-danger is-size-7">※必須</span>
        </label>
        <div className="columns is-mobile">
            <div className="column">
                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            step={ 0.000001 }
                            required={ true }
                            disabled={ isSubmitting }
                            { ...register("position.0", {
                                required: true,
                                valueAsNumber: true
                            }) }
                        />
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            step={ 0.000001 }
                            required={ true }
                            disabled={ isSubmitting }
                            { ...register("position.1", {
                                required: true,
                                valueAsNumber: true
                            }) }
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className="field">
            <label className="label">
                Address
            </label>
            <div className="control">
                <input
                    className="input"
                    type="text"
                    disabled={ isSubmitting }
                    { ...register("address") }
                />
            </div>
        </div>

        <div className="field is-grouped">
            <button
                className={ `button is-link ${ isSubmitting ? "is-loading" : "" }` }
                type="submit"
                disabled={ isSubmitting || !isValid }
            >送信
            </button>
        </div>
    </form>);
};

export const Panel = () => {
    const { geolocation, setGeolocation } = useGeolocationReplicant();

    const submit: SubmitHandler<FormData> = useCallback(async (data) => {
        console.debug(data.position);
        setGeolocation((prev) => ({
            timestamp: Date.now(),
            ...prev,
            position: data.position,
            address: data.address,
        }));
    }, []);

    return (
        <section className="section">
            <div className="container">
                <div className="content">
                    { geolocation ? <Form geolocation={ geolocation } onSubmit={ submit }/> : null }
                </div>
            </div>
        </section>
    );
};
