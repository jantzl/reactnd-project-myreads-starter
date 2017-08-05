import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class ListBooks extends Component {
	static propTypes = {
		shelves: PropTypes.object.isRequired,
		labels: PropTypes.object.isRequired,
		onChangeShelf: PropTypes.func.isRequired
	}
	
	render () {
		const {shelves, labels, onChangeShelf} = this.props

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						{Object.keys(shelves).map((shelf) => (
						<div className="bookshelf" key={shelf}>
							<h2 className="bookshelf-title">{labels[shelf]}</h2>
							<div className="bookshelf-books">
								<ol className="books-grid">
									{Object.keys(shelves[shelf]).map((bid) => {
										var book = shelves[shelf][bid];
										return (
											<Book
												key={bid} bid={bid} book={book}
												labels={labels}
												onChangeShelf={onChangeShelf} />
										)})}
								</ol>
							</div>
						</div>
						))}
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">SearchBooks</Link>
				</div>
			</div>
		)
	}
}

export default ListBooks
