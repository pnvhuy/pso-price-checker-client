import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Form from './components/form/Form';
import List from './components/list/List';
import Search from './components/search/Search';

const dbUrl = "http://ec2-54-201-217-62.us-west-2.compute.amazonaws.com:4200";

class App extends Component {

    constructor(props) {

		super(props);

		this.state = {
            itemTypes: [],
            itemSpecials: [],
            itemBaseList: [],
            itemList: [],
            priceList: [],
            search: {
                name: '',
                hit: '',
            }
        };

        fetch(`${dbUrl}/items-type`, {
			method: 'GET',
		})
		.then(response => response.json())
		.then(data => {
            this.setState({
                itemTypes: data, 
            })
		})
		.catch((error) => {
			console.error('Error:', error);
        });
        
        fetch(`${dbUrl}/items-special`, {
			method: 'GET',
		})
		.then(response => response.json())
		.then(data => {
            this.setState({
                itemSpecials: data, 
            })
		})
		.catch((error) => {
			console.error('Error:', error);
		});

        fetch(`${dbUrl}/items-base`, {
			method: 'GET',
		})
		.then(response => response.json())
		.then(data => {
            this.setState({
                itemBaseList: data, 
            })
		})
		.catch((error) => {
			console.error('Error:', error);
        });

        fetch(`${dbUrl}/items`, {
			method: 'GET',
		})
		.then(response => response.json())
		.then(data => {
            this.setState({
                itemList: data, 
            })
		})
		.catch((error) => {
			console.error('Error:', error);
        });

        fetch(`${dbUrl}/prices`, {
			method: 'GET',
		})
		.then(response => response.json())
		.then(data => {
            this.setState({
                priceList: data, 
            })
		})
		.catch((error) => {
			console.error('Error:', error);
        });
        
        this.updateItemBaseList = this.updateItemBaseList.bind(this);
        this.updateItemList = this.updateItemList.bind(this);
        this.updatePriceList = this.updatePriceList.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }
        
    updateItemBaseList() {
        fetch(`${dbUrl}/items-base`, {
			method: 'GET',
		})
		.then(response => response.json())
		.then(data => {
            this.setState({
                itemBaseList: data, 
            })
		})
		.catch((error) => {
			console.error('Error:', error);
        });
    }

    updateItemList() {
        fetch(`${dbUrl}/items`, {
			method: 'GET',
		})
		.then(response => response.json())
		.then(data => {
            this.setState({
                itemList: data, 
            })
		})
		.catch((error) => {
			console.error('Error:', error);
        });
    }

    updatePriceList() {
        const queryString = this.state.search.name ? `?search=${this.state.search.name}` : '';

        fetch(`${dbUrl}/prices${queryString}`, {
			method: 'GET',
		})
		.then(response => response.json())
		.then(data => {
            this.setState({
                priceList: data, 
            })
		})
		.catch((error) => {
			console.error('Error:', error);
        });
    }

    updateSearch(name, hit) {
        this.setState({
            search: {
                name,
                hit,
            }
        }, () => {
            this.updatePriceList();
        })
    }

  render() {
    const { itemTypes, itemSpecials, itemBaseList, itemList, priceList } = this.state;

    return (
      <div className="App">
		  
        <div className="main-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to PSO Price Checker</h2>
        </div>

        <div>
            <Form 
                data={{
                    itemTypes,
                    itemSpecials,
                    itemBaseList,
                    itemList,
                    priceList,
                }}
                methods={{
                    updateItemBaseList: this.updateItemBaseList,
                    updateItemList: this.updateItemList,
                    updatePriceList: this.updatePriceList,
                }}
            />
        </div>

        <div>
            <Search 
                methods={{
                    updateSearch: this.updateSearch,
                }}
            />
        </div>

        <div>
            <List 
                data={{ 
                    itemBaseList,
                    itemList,
                    priceList
                }}
                methods={{
                    updateItemBaseList: this.updateItemBaseList,
                    updateItemList: this.updateItemList,
                    updatePriceList: this.updatePriceList,
                }}
            />
        </div>
      </div>
    );
  }
}

export default App;
