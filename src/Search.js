import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Search extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		labels: PropTypes.object.isRequired,
		onChangeShelf: PropTypes.func.isRequired
	}
	
	state = {
		query: ''
	}

  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }

  clearQuery = () => {
    this.setState({query:''})
  }

	render () {
		const {books, labels, onChangeShelf} = this.props
		const {query} = this.state

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query),'i')
      showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors))
    } else {
      showingBooks = books
    }

    showingBooks.sort(sortBy('title'))

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
					<ol className="books-grid">
						{showingBooks.map((book) => {
							var bid = book.id;
							return (
								<Book
									key={bid} bid={bid} book={book}
									labels={labels}
									onChangeShelf={onChangeShelf} />
							)})}
					</ol>
				</div>
			</div>
		)
	}
}


export default Search
