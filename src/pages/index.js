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
        <div className="h-screen flex flex-col">
            <title>Is BTC 100k Yet?</title>

            <main className="flex-1">
                <div className="h-full flex flex-col justify-center items-center">
                    <h1 className="text-center text-3xl leading-8 font-bold tracking-tight text-gray-800 sm:text-4xl">
                        Is BTC 100k Yet?

                        <span className="ml-2 font-black text-gray-900">{is100k ? 'Yes! 😱' : 'Not yet. 😴'}</span>
                    </h1>

                    <div className="mt-6">
                        {price &&
                        <h2 className="text-center text-6xl font-extrabold text-yellow-500">
                            <a href="https://www.coindesk.com/price/bitcoin">
                                {numberFormat.format(price)}
                            </a>
                        </h2>}
                    </div>
                </div>
            </main>

            <footer className="flex justify-between px-6 py-2">
                <p className="text-gray-800">Made by <a href="https://vrymel.com" className="text-yellow-500 font-bold">Vrymel</a></p>
                <p className="text-gray-800">Powered by <a href="https://www.coindesk.com/price/bitcoin" className="text-yellow-500 font-bold">CoinDesk</a></p>
            </footer>
        </div>
    )
}

export default IndexPage
