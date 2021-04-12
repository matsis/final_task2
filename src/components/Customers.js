import React, { useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import moment from 'moment';
import 'moment/locale/fi';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = (url) => {
 //   console.log(url);
    if(window.confirm('Are you sure?')) {
      //    console.log(url);
      fetch(url, { method: 'DELETE'})
      .then(response => {
        //if response 2XX
        if (response.ok)
        //fetch Customer again
        fetchCustomers();
        else
          alert('Something went wrong!');
      })
      .catch(err => console.error(err))
    }
}

const addCustomer = (newCustomer) => {
//  console.log(newCustomer);
  fetch('https://customerrest.herokuapp.com/api/customers', {
    method: 'POST',
// Js object to JSON format
    body: JSON.stringify(newCustomer),
    headers: { 'Content-type' : 'application/json' }
  })
  .then(response => {
    //jos response 2XX
    if (response.ok)
    //haetaan asiakkaat uudestaan
    fetchCustomers();
    else
      alert('Something went wrong!');
  })
  .catch(err => console.error(err))         
}

const addTraining = (newTraining) => {
  console.log(newTraining);
  fetch('https://customerrest.herokuapp.com/api/trainings', {
    method: 'POST',
// Js object to JSON format
    body: JSON.stringify(newTraining),
    headers: { 'Content-type' : 'application/json' }  
  })
  .then(response => {
    //jos response 2XX
    if (response.ok)
    //haetaan asiakkaat uudestaan
    fetchCustomers();
    else
      alert('Something went wrong!');
  })
  .catch(err => console.error(err))  

}

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
  }

  const columns = [
    { headerName: '', 
      field: 'links[0].href',
      width: 100,
      sortable: false, filter: false,
      cellRendererFramework: params => 
      <IconButton color="secondary" onClick={() => deleteCustomer(params.data.links[0].href)}>
        <DeleteIcon />
      </IconButton>
    },
    { headerName: '', 
      field: 'addcustomer',
      width: 200,
      sortable: false, filter: false,
      cellRendererFramework: params => 
        <div>
          <AddTraining addTraining={addTraining} customer={params.data.links[0].href}/>
        </div>
    },
    { field: 'firstname', sortable: true, filter: true },
    { field: 'lastname', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },
    { field: 'streetaddress', sortable: true, filter: true },
    { field: 'postcode', sortable: true, filter: true },
    { field: 'city', sortable: true, filter: true },
  ]

  return (
    <div className="Customers">

        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
        <AddCustomer addCustomer={addCustomer} />
          <AgGridReact
                defaultColDef={{
                    flex: 1,
                    minWidth: 150,
                    filter: true,
                    sortable: true,
                    floatingFilter: true,
                }}                     
                rowData={customers}
                columnDefs={columns}
                animateRows={true}
                pagination={true}
                paginationPageSize={5}
                // poistetaan solujen valinta
                suppressCellSelection={true}
          />
        </div>      
    </div>
  );
}

export default Customers;