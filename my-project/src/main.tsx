import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "./admin/context/ThemeContext.tsx"
import { AppWrapper } from "./admin/components/common/PageMeta.tsx"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import {store} from "./app/store.ts";
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
          <AppWrapper>
              <Provider store={store}>
                  <QueryClientProvider client={queryClient}>
                      <BrowserRouter>
                          <App />
                      </BrowserRouter>
                  </QueryClientProvider>
              </Provider>
          </AppWrapper>
      </ThemeProvider>
  </StrictMode>,
)
