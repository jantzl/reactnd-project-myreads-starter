import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
		shelves : {
			'currentlyReading' : {},
			'wantToRead' : {},
			'read' : {} 
		},
		shelfLabels : {
			'currentlyReading' : 'Currently Reading',
			'wantToRead' : 'Want to Read',
			'read' : 'Read',
			//'none' : 'None'
		}
  }

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState( 
				books.map((book) => {
					var shelves = this.state.shelves
					shelves[book.shelf][book.id] = book;
					return shelves;
				})
			)
		});
		console.log(this.state.shelves);
	}

	changeShelf(book, shelf) {
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
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
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
                      <li key={bid}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ 
															width: 128, height: 193, 
															backgroundImage: `url(${book.imageLinks.smallThumbnail})` 
														}}></div>
                            <div className="book-shelf-changer">
                              <select 
																	value={book.shelf}
																	onChange={(event) => this.changeShelf(book, event.target.value)}>
                                <option value="none" disabled>Move to...</option>
																{Object.keys(this.state.shelfLabels).map((label) => (
                                <option key={label} value={label}>{this.state.shelfLabels[label]}</option>
																))}
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">
														{book.authors.map((author, index) => 
															(<div key={index}>{author}</div>)
														)}
													</div>
                        </div>
                      </li>
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
