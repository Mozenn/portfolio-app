import { createContext, useContext } from 'react';
import useLocalStorage from './useLocalStorage';
import { useRouter } from 'next/router';

interface LocaleContextInterface {
  locale: any;
  setLocale: any;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextInterface | undefined>(
  undefined,
);

const LocaleProvider = ({
  children,
  initLocale = 'en',
}: {
  children: React.ReactNode;
  initLocale?: string;
}) => {
  const [locale, setLocale] = useLocalStorage('locale', initLocale, true);
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale == 'en' ? 'fr' : 'en';
    setLocale(newLocale);
    changeLocale(newLocale);
  };

  const changeLocale = (locale: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: router.query,
      },
      router.asPath,
      { locale },
    );
  };

  const value: LocaleContextInterface = {
    locale,
    setLocale,
    toggleLocale,
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleContext');
  }
  return context;
};

export { LocaleProvider, LocaleContext, useLocale };
