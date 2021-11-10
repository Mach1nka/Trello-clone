import {
  useState,
  Context,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';

interface LoaderContextValue {
  loaderState: boolean;
  setLoaderState: Dispatch<SetStateAction<boolean>>;
}

export const LoaderContext: Context<LoaderContextValue> =
  createContext<LoaderContextValue>({
    loaderState: false,
    setLoaderState: () => {},
  });

const LoaderProvider: React.FC = ({ children }) => {
  const [loaderState, setLoaderState] = useState(false);

  return (
    <LoaderContext.Provider value={{ loaderState, setLoaderState }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
