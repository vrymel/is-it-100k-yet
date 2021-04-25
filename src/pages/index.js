import * as React from "react"
import {useEffect, useState} from "react";

const IndexPage = () => {
    const [price, setPrice] = useState(null);

    useEffect(() => {
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => response.json())
            .then(data => {
                setPrice(data.bpi?.USD?.rate);
            })
            .catch(error => console.error(error))
    }, []);

    return (
        <main>
            <title>Is It 100k Yet?</title>
            <h1 className="font-bold">Is It 100k Yet?</h1>
            <p>{price}</p>
        </main>
    )
}

export default IndexPage
