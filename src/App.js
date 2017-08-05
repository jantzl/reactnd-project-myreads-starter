import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
		query : '',
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

  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }

  clearQuery = () => {
    this.setState({query:''})
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
		const {query} = this.state

		let showingBooks
		if (query) {
			const match = new RegExp(escapeRegExp(query),'i')
			showingBooks = this.state.books.filter((book) => match.test(book.title) || match.test(book.authors))
		} else {
			showingBooks = this.state.books
		}

		showingBooks.sort(sortBy('title'))

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
											labels={this.state.shelfLabels} 
											onChangeShelf={this.changeShelf} />
									)})}
							</ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
								{Object.keys(this.state.shelves).map((shelf) => (
                <div className="bookshelf" key={shelf}>
                  <h2 className="bookshelf-title">{this.state.shelfLabels[shelf]}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
											{Object.keys(this.state.shelves[shelf]).map((bid) => {
												var book = this.state.shelves[shelf][bid];
												return (
													<Book 
														key={bid} bid={bid} book={book} 
														labels={this.state.shelfLabels} 
														onChangeShelf={this.changeShelf} />
												)})}
                    </ol>
                  </div>
                </div>
								))}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
