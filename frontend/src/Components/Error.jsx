import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError() // it will fetch the error which we are thrown in the getVans function in api.js file
    return (
        <>
        <h1>Error:{error.message}</h1>
        <pre>{error.status} - {error.statusText}</pre>
        </>
    )
}