import React, { useState, useEffect } from 'react';
import styles from '../styles/Landing.module.css';

interface Props {
  currencies: CurrenciesMetadata
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
"USD";

const USD_FX = {
  AUD: 1.39,
  BRL: 5.46,
  CAD: 1.26,
  CHF: 0.91,
  CLP: 798.61,
  CNY: 6.34,
  CZK: 21.52,
  DKK: 6.56,
  EUR: 0.88,
  GBP: 0.74,
  HKD: 7.79,
  HRK: 6.64,
  HUF: 316.15,
  INR: 74.42,
  ISK: 128.36,
  JPY: 113.67,
  KRW: 1192.60,
  NZD: 1.49,
  PLN: 3.99,
  RON: 4.36,
  RUB: 77.59,
  SEK: 9.19,
  SGD: 1.34,
  THB: 32.99,
  TRY: 13.45,
  TWD: 27.71,
}

type CurrenciesMetadata = Record<Currency, CurrencyMetadata>

const Landing: React.FC<Props> = ({}) => {
  const [currencies, setCurrencies] = useState<CurrenciesMetadata>();
  const [currency, setCurrency] = useState<Currency>('USD');
  const [btcBalance, setBtcBalance] = useState(2.5);
  const [moneyBalance, setMoneyBalance] = useState(1000000);

  const onChangeCurrency = (e: any) => {
    setCurrency(e.target.value);
  }
  // console.log('currencies', currencies);
  // console.log('last', currencies && (currencies[currency]).last);

  const getData = async () => {
    fetch('https://blockchain.info/ticker')
      .then(res => res.json())
      .then(data => {
        setCurrencies(data)
      })
      .catch(err => console.log('Error:', err))
  } 
  
  useEffect(() => {
    getData();
  }, [currency])

  return (currencies && currency) ? (
    <div className={styles.landing}>
      <h2>Balance: {btcBalance} btc</h2>
      <h2>Your Wallet: {moneyBalance} {currency}</h2>
      <select className={styles.select} value={currency} onChange={onChangeCurrency}>
        {
          Object.entries(currencies).map(([k, v]) => (
            <option key={k} value={k}>{k}</option>
          ))
        }
      </select>
      <div className={styles.buttons}>
        <button className={styles.buy} onClick={() => setBtcBalance(btcBalance + 1)}>
          <p className={styles.p}>{`BUY for ${(currencies[currency]).buy} ${currency}`}</p>
        </button>
        <button className={styles.sell}>
          <p className={styles.p}>{`SELL for ${(currencies[currency]).sell} ${currency}`}</p>
        </button>
      </div>
    </div>
  ) : <p>...loading</p>
};

export default Landing;