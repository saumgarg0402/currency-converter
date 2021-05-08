import React from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import CurrencyConverter from './components/CurrencyConverter';
import { Stack } from '@fluentui/react/lib/Stack';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  initializeIcons();

  return (
    <Stack verticalAlign="space-between" styles={{ root: { height: '100%'}}}>
      <Header/>
      <Stack horizontal={true} horizontalAlign="center">
          <Stack styles={{ root: { width: 700, height: 600, borderRadius: 5, border: "1px solid #c8c6c4"}}} horizontal={true} horizontalAlign="center">
            <CurrencyConverter />
          </Stack>
      </Stack>
      <Footer/>
    </Stack>
  );
}

export default App;
