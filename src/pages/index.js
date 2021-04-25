import * as React from "react"
import {useEffect, useState} from "react";

const IndexPage = () => {
    const [price, setPrice] = useState(null);

    useEffect(() => {
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => response.json())
            .then(data => {
                let string = data.bpi?.USD?.rate || '';
                string = string.replace(',', '');
                let number = parseFloat(string).toFixed(2)
                setPrice(number);
            })
            .catch(error => console.error(error))
    }, []);

    const numberFormat = new Intl.NumberFormat();
    const is100k = price >= 100000;

    return (
        <main>
            <title>Is BTC 100k Yet?</title>

            <div className="h-screen flex flex-col justify-center items-center">
                <div className="">
                    <h1 className="text-center text-3xl leading-8 font-bold tracking-tight text-gray-800 sm:text-4xl">
                        Is BTC 100k Yet?

                        <span className="ml-2 font-black text-gray-900">{is100k ? 'Yes! 😱' : 'Not yet. 😴'}</span>
                    </h1>

                    <div className="mt-6">
                        {price &&
                        <h2 className="text-center text-6xl font-extrabold text-yellow-500">{numberFormat.format(price)}</h2>}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default IndexPage
