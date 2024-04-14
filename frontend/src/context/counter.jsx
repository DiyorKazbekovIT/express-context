import { createContext, useState } from "react";

const CounterContext = createContext();

export const CounterProvider = ({children}) => {
const [count, setCount] = useState(0)

const value = {count, setCount}

    return <CounterContext.Provider value={value}>
        {children}
    </CounterContext.Provider>
}

export default CounterContext;