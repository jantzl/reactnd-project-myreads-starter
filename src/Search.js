import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
	static propTypes = {
		labels: PropTypes.object.isRequired,
		onChangeShelf: PropTypes.func.isRequired
	}
	
	state = {
		books: [ ],
		query: '',
		error: false 
	}

	maxResults = 100

  updateQuery = (query) => {
		this.setState( { query: query.trim(), 
										 books: [ ], 
										 error: false
 									} )
    if (query) {
			BooksAPI.search(query,this.maxResults).then((books) => {
				if (books.error) {
					console.log('got error');
					this.setState( {error:true} )
				} else 
					this.setState( {books:books} )
			});
    }
  }

  clearQuery = () => {
    this.setState({query:''})
  }

	render () {
		const {labels, onChangeShelf} = this.props
		const {query} = this.state.query

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							value={query}
							onChange={(event) => this.updateQuery(event.target.value)}
							placeholder="Search by title or author"/>
					</div>
				</div>
				<div className="search-books-results">
					{this.state.error ?
						( <div>No results</div> )
					 : (
						<ol className="books-grid">
							{Object.keys(this.state.books).map((key) => {
								var book = this.state.books[key];
								var bid = book.id;
								return (
									<Book
										key={bid} bid={bid} book={book}
										labels={labels}
										onChangeShelf={onChangeShelf} />
								)
							})}
						</ol>
					)}
				</div>
			</div>
		)
	}
}


export default Search
