import React from 'react';
import ReactDOM from 'react-dom/client';
import { loadMyNoctoPlugins } from './utils';
import { noctoConfig } from './../nocto-config'
import App from "@rsc-labs/nocto"
import "./index.css"
import "./themes/theme-oceanic.css"

async function bootstrap() {
  await loadMyNoctoPlugins(noctoConfig);

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App noctoConfig={noctoConfig} />
    </React.StrictMode>
  );
}

bootstrap();