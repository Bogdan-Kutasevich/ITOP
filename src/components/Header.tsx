import { Currency } from 'types/Currency';

type Props = {
  currencies: Currency[];
};

const currentCurrencies = ['USD', 'EUR'];

export const Header = ({ currencies }: Props) => {
  const checkedCurrencies = currencies.filter(
    (currency) => currentCurrencies.includes(currency.cc)
  );
  return (
    <header className="w-full text-gray-700 bg-white border-t border-gray-100 shadow-lg body-font">
      <div className="container max-w-screen-lg mx-auto p-5 flex sm:flex-row flex-col gap-[20px] flex-wrap sm:justify-between justify-center  items-center">
        <div className="border-4 w-[70px] h-[70px] border-100 rounded-full border-black flex justify-center items-center font-medium">
          Logo
        </div>
        <div className="flex flex-wrap flex-row flex-end">
          {checkedCurrencies.map((currency) => (
            <div className="mr-5 font-medium">
              {currency.cc}
              :
              {' '}
              {currency.rate}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
