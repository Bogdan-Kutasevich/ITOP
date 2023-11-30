import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Converter } from 'components/Converter';
import { Header } from 'components/Header';
import { Currency } from 'types/Currency';
import { ErrorNotification } from 'components/ErrorNotification';

const UAH = {
  r030: 980,
  txt: 'Гривня',
  rate: 1,
  cc: 'UAH',
  exchangedate: '30.11.2023',
};

export const App = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [currency1, setCurrency1] = useState<Currency | null>(UAH);
  const [currency2, setCurrency2] = useState<Currency | null>(null);
  const [isError, setIsError] = useState(false);

  const fetchExchangeRate = async () => {
    try {
      const { data } = await axios.get<Currency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
      const currentCurrency2 = data.find((currency) => currency.cc === 'USD') || null;
      setCurrencies([...data, UAH]);
      setCurrency2(currentCurrency2);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>, isInput1: boolean) => {
    const value = parseFloat(event.target.value);

    if (!currency2 || !currency1 || value < 0) {
      return;
    }

    if (isInput1) {
      setAmount1(value);
      setAmount2((value * currency1.rate) / currency2.rate);
      return;
    }

    setAmount2(value);
    setAmount1((value * currency2.rate) / currency1.rate || 0);
  };

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    isCurrency1: boolean
  ) => {
    const { value } = event.target;

    const changedCurrency = currencies.find((currency) => currency.cc === value) || null;

    if (!currency2 || !currency1 || !changedCurrency) {
      return;
    }

    if (isCurrency1) {
      setCurrency1(changedCurrency);
      return;
    }

    setCurrency2(changedCurrency);
  };

  useEffect(() => {
    if (currency2 && currency1) {
      setAmount2((amount1 * currency1.rate) / currency2.rate || 0);
    }
  }, [currency1]);

  useEffect(() => {
    if (currency2 && currency1) {
      setAmount1((amount2 * currency2.rate) / currency1.rate || 0);
    }
  }, [currency2]);

  const handleSetError = (isErrorDisplay: boolean) => {
    setIsError(isErrorDisplay);
  };

  return (
    <div className="relative h-screen">
      <Header currencies={currencies} />
      <Converter
        currencies={currencies}
        currency1={currency1}
        currency2={currency2}
        amount1={amount1}
        amount2={amount2}
        handleAmountChange={handleAmountChange}
        handleCurrencyChange={handleCurrencyChange}
      />
      {isError && <ErrorNotification handleSetError={handleSetError} />}
    </div>
  );
};
