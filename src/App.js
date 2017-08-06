import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {
  state = {
		books : [ ],
		shelfLabels : {
			'currentlyReading' : 'Currently Reading',
			'wantToRead'       : 'Want to Read',
			'read'             : 'Read',
			'none'             : 'None',
		}
  }

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState( {books: books})
		});
	}

	changeShelf = (book, shelf) => {
		BooksAPI.update(book,shelf).then(result => {
			console.log('setting shelf to [' + shelf + ']');
			book.shelf = shelf;
			//this.setState( {books: this.state.books})
			BooksAPI.getAll().then((books) => {
				this.setState( {books: books})
			});
		})
	}

  render() {
    return (
			<div>
				<Route exact path="/" render={() => (
					<ListBooks 
						books={this.state.books} 
						labels={this.state.shelfLabels} 
						onChangeShelf={this.changeShelf} />
				)}/>
				<Route exact path="/search" render={() => (
					<Search 
						labels={this.state.shelfLabels} 
						onChangeShelf={this.changeShelf} />
				)}/>
			</div>
    )
  }
}

export default BooksApp
