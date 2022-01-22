import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import styles from '../styles/Landing.module.css';

interface Props {
  currencies: CurrenciesMetadata,
  showCurrency: () => any
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

type CurrenciesMetadata = Record<Currency, CurrencyMetadata>

const Landing: React.FC<Props> = ({ currencies }) => {
  const [currency, setCurrency] = useState<string>('AUD')

  console.log(currencies)
  Object.entries(currencies).forEach(([k, v]) => {
    console.log(`key: ${k}, val: ${JSON.stringify(v, null, 2)}`)
  })

  const showCurrency = () => {
    Object.entries(currencies).forEach(([k, v]) => (
      <option value={k}>{k}</option>
    ))
  }

  return (
    <div>
      <h1>2.5 btc</h1>
      <select className={styles.select} onChange={(e) => setCurrency(e.target.value)}>
        {showCurrency()}
      </select>
      <div className={styles.buttons}>
        <button className={styles.buy}>
          <p>BUY</p>
          <p>BUY</p>
        </button>
        <button className={styles.sell}>
          <p>SELL</p>
          <p>SELL</p>
        </button>
      </div>
    </div>
  )
};

export default Landing;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://blockchain.info/ticker');
  const currencies = await res.json();

  return {
    props: {
      currencies
    }
  }
}
