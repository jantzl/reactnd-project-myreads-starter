import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {
  state = {
		books : [ ],
		shelves : {
			'currentlyReading' : { },
			'wantToRead'       : { },
			'read'             : { } 
		},
		shelfLabels : {
			'currentlyReading' : 'Currently Reading',
			'wantToRead'       : 'Want to Read',
			'read'             : 'Read',
		}
  }

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState( {books: books})
			this.setState( 
				books.map((book) => {
					var shelves = this.state.shelves
					shelves[book.shelf][book.id] = book;
					return shelves;
				})
			)
		});
	}

	changeShelf = (book, shelf) => {
		BooksAPI.update(book,shelf).then(result => {
			var shelves = this.state.shelves
			delete shelves[book.shelf][book.id];
			book.shelf = shelf;
			shelves[shelf][book.id] = book;
			this.setState(shelves);
		})
	}

  render() {
    return (
			<div>
				<Route exact path="/" render={() => (
					<ListBooks 
						shelves={this.state.shelves} 
						labels={this.state.shelfLabels} 
						onChangeShelf={this.changeShelf} />
				)}/>
				<Route exact path="/search" render={() => (
					<Search 
						books={this.state.books} 
						labels={this.state.shelfLabels} 
						onChangeShelf={this.changeShelf} />
				)}/>
			</div>
    )
  }
}

export default BooksApp
