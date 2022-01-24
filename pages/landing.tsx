import React, { useState, useEffect } from 'react';
import styles from '../styles/Landing.module.css';

interface Props {
  currencies?: CurrenciesMetadata
}

interface CurrencyMetadata {
  '15m': number, 
  'last': number,
  'buy': number,
  'sell': number,
  'symbol': number
}

type Currency = "AUD" |
"BRL" |
"CAD" |
"CHF" |
"CLP" |
"CNY" |
"CZK" |
"DKK" |
"EUR" |
"GBP" |
"HKD" |
"HRK" |
"HUF" |
"INR" |
"ISK" |
"JPY" |
"KRW" |
"NZD" |
"PLN" |
"RON" |
"RUB" |
"SEK" |
"SGD" |
"THB" |
"TRY" |
"TWD" |
"USD" ;

const USD_FX = {
  "AUD": 1.39,
  "BRL": 5.46,
  "CAD": 1.26,
  "CHF": 0.91,
  "CLP": 798.61,
  "CNY": 6.34,
  "CZK": 21.52,
  "DKK": 6.56,
  "EUR": 0.88,
  "GBP": 0.74,
  "HKD": 7.79,
  "HRK": 6.64,
  "HUF": 316.15,
  "INR": 74.42,
  "ISK": 128.36,
  "JPY": 113.67,
  "KRW": 1192.60,
  "NZD": 1.49,
  "PLN": 3.99,
  "RON": 4.36,
  "RUB": 77.59,
  "SEK": 9.19,
  "SGD": 1.34,
  "THB": 32.99,
  "TRY": 13.45,
  "TWD": 27.71,
  "USD": 1,
}

type CurrenciesMetadata = Record<Currency, CurrencyMetadata>

const Landing: React.FC<Props> = ({}) => {

  const [currencies, setCurrencies] = useState<CurrenciesMetadata>();
  const [currency, setCurrency] = useState<Currency>('USD');
  const [usdBalance, setUsdBalance] = useState(500000);
  const [btcBalance, setBtcBalance] = useState(3);
  const [moneyBalance, setMoneyBalance] = useState(500000);

  useEffect(() => {
    setMoneyBalance(Math.round(usdBalance * USD_FX[currency] * 100) / 100)
    getData();
    console.log('moneybalance', moneyBalance)
    console.log('usdbalance', usdBalance)
  }, [currency]);

  const onChangeCurrency = (e: any) => {
    setCurrency(e.target.value);
  }

  const getData = async () => {
    fetch('https://blockchain.info/ticker')
      .then(res => res.json())
      .then(data => {
        setCurrencies(data)
      })
      .catch(err => console.log('Error:', err))
  } 

  const plusBtc = () => {
    if (currencies && (moneyBalance < currencies[currency].buy)) {
      alert('not enough money to buy bitcoins')
    } else {
      setBtcBalance(btcBalance + 1);
      (currencies && setMoneyBalance(Math.round((moneyBalance - currencies[currency].buy) * 100) / 100));
      (currencies && setUsdBalance(Math.round((usdBalance - currencies['USD'].buy) * 100) / 100));
    }
    console.log('usdbalance', usdBalance);
  }
  
  const minusBtc = () => {
    if (btcBalance > 0) {
      setBtcBalance(btcBalance - 1);
      (currencies && setMoneyBalance(Math.round((moneyBalance + currencies[currency].sell) * 100) / 100));
      (currencies && setUsdBalance(Math.round((usdBalance + currencies['USD'].sell) * 100) / 100));
    } else {
      alert('no more bitcoins to sell')
    }
    console.log('usdbalance', usdBalance);
  }

  return (currencies && currency) ? (
    <div className={styles.landing}>
      <h2>Balance: {btcBalance} btc</h2>
      <h2>Your Wallet: {Math.round(moneyBalance * 100) / 100} {currency}</h2>
      <select className={styles.select} value={currency} onChange={onChangeCurrency}>
        {
          Object.entries(currencies).map(([k, v]) => (
            <option key={k} value={k}>{k}</option>
          ))
        }
      </select>
      <div className={styles.buttons}>
        <button className={styles.buy} onClick={plusBtc}>
          <p className={styles.p}>{`BUY 1 btc for ${(currencies[currency]).buy} ${currency}`}</p>
        </button>
        <button className={styles.sell} onClick={minusBtc}>
          <p className={styles.p}>{`SELL 1 btc for ${(currencies[currency]).sell} ${currency}`}</p>
        </button>
      </div>
    </div>
  ) : <p>...loading</p>
};

export default Landing;