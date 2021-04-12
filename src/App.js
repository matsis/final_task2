import React, { useState} from 'react';

import Customers from './components/Customers';
import Trainings from './components/Trainings';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './App.css';



function App() {
  const [value, setValue] = useState('one');
  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Customers" />
          <Tab value="two" label="Trainings" />
        </Tabs>
      </AppBar>
      {value === 'one' && <Customers />}
      {value === 'two' && <Trainings />}   
    </div>
  );
}

export default App;