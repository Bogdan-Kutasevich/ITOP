import { Currency } from 'types/Currency';

type Props = {
  currencies: Currency[];
  currency1: Currency | null;
  currency2: Currency | null;
  amount1: number;
  amount2: number;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>, isInput1: boolean) => void;
  handleCurrencyChange: (event: React.ChangeEvent<HTMLSelectElement>, isCurrency1: boolean) => void;
};

export const Converter = ({
  currencies,
  currency1,
  currency2,
  amount1,
  amount2,
  handleAmountChange,
  handleCurrencyChange
}: Props) => (
  <div className="container max-w-screen-sm mx-auto mt-20 p-5 pb-10 bg-white border-t border-gray-100 shadow-lg body-font rounded-md">
    <h1 className="text-2xl font-bold mb-6">Конвертер валют</h1>
    <div className="flex mb-4">
      <input
        type="number"
        value={amount1}
        onChange={(e) => handleAmountChange(e, true)}
        className="w-1/2 p-2 border border-gray-300 mr-2"
      />
      <select
        value={currency1?.cc}
        onChange={(e) => handleCurrencyChange(e, true)}
        className="w-1/2 p-2 border border-gray-300"
      >
        {currencies.map((currency) => (
          <option key={currency.r030} value={currency.cc}>{currency.txt}</option>
        ))}
      </select>
    </div>
    <div className="flex">
      <input
        type="number"
        value={amount2}
        onChange={(e) => handleAmountChange(e, false)}
        className="w-1/2 p-2 border border-gray-300 mr-2"
      />
      <select
        value={currency2?.cc}
        onChange={(e) => handleCurrencyChange(e, false)}
        className="w-1/2 p-2 border border-gray-300"
      >
        {currencies.map((currency) => (
          <option key={currency.r030} value={currency.cc}>{currency.txt}</option>
        ))}
      </select>
    </div>
  </div>
);
