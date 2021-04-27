import * as React from "react"
import {useEffect, useState} from "react";
import {useInterval} from "../hooks";
import {parseISO, formatDistance} from 'date-fns';

const TARGET_PRICE = 100000;

const IndexPage = () => {
    const [response, setResponse] = useState(null);

    function doFetchPrice() {
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => response.json())
            .then(data => {
                setResponse(data);

                // let string = data.bpi?.USD?.rate || '';
                // string = string.replace(',', '');
                // let number = parseFloat(string).toFixed(2)
                // setPrice(number);
            })
            .catch(error => console.error(error));
    }

    function getPrice() {
        if (!response) {
            return null;
        }

        let string = response.bpi?.USD?.rate || '';
        string = string.replace(',', '');

        return parseFloat(string).toFixed(2)
    }

    useEffect(function onLoad() {
        doFetchPrice();
    }, []);

    useInterval(function () {
        doFetchPrice();
    }, 10000);

    const price = getPrice();

    const numberFormat = new Intl.NumberFormat();
    const priceFormatted = price ? '$' + numberFormat.format(price) : null;
    const is100k = price >= TARGET_PRICE;

    const timestampDisplay = response ? 'Last updated ' + formatDistance(parseISO(response.time.updatedISO), new Date()) + ' ago' : null;

    const title = priceFormatted ? `${priceFormatted} | Is BTC 100k Yet?` : 'Is BTC 100k Yet?';

    return (
        <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
            <title>{title}</title>

            <main className="flex-1">
                <div className="h-full flex flex-col justify-center items-center">
                    <h1 className="text-center text-2xl md:text-3xl leading-8 font-bold tracking-tight text-gray-800 dark:text-white sm:text-4xl">
                        Is BTC 100k Yet?

                        <span className="ml-2 font-black text-gray-900 dark:text-white">{is100k ? 'Yes! 😱' : 'Not yet. 😴'}</span>
                    </h1>

                    <div className="mt-6 text-center">
                        {price &&
                        <>
                            <h2 className="text-center text-4xl md:text-6xl font-extrabold text-yellow-500">
                                <a href="https://www.coindesk.com/price/bitcoin">
                                    {priceFormatted}
                                </a>
                            </h2>
                        </>
                        }
                    </div>
                </div>
            </main>

            <footer className="flex flex-col md:flex-row justify-between px-6 py-2">
                <p className="text-gray-800 dark:text-white text-center md:text-left">Made by <a href="https://vrymel.com"
                                                                                 className="text-yellow-500 font-bold">Vrymel</a>
                </p>
                <p className="text-gray-800 dark:text-white text-center md:text-left">
                    <span>Powered by <a href="https://www.coindesk.com/price/bitcoin"
                                        className="text-yellow-500 font-bold">CoinDesk</a></span>
                    <span
                        className={"ml-2 text-gray-500 text-center md:text-left"}>{timestampDisplay ? timestampDisplay : 'Fetching data...'}</span>
                </p>
            </footer>
        </div>
    )
}

export default IndexPage
