import React, {Component} from 'react'
import PropTypes from 'prop-types'
import question from '../public/images/questionmark.png'

class Book extends Component {
	static propTypes = {
		bid:    PropTypes.string.isRequired,
		book:   PropTypes.object.isRequired,
		labels: PropTypes.object.isRequired,
		onChangeShelf: PropTypes.func.isRequired
	}

	render() {
		const {bid, book, labels, onChangeShelf} = this.props
		return(
			<li key={bid}>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{
							width: 128, height: 193,
							backgroundImage: book.imageLinks && book.imageLinks.smallThumbnail ? `url(${book.imageLinks.smallThumbnail})`: `url(${question})`
						}}></div>
						<div className="book-shelf-changer">
							<select
									value={book.shelf}
									onChange={(event) => onChangeShelf(book, event.target.value)}>
								<option value="none" disabled>Move to...</option>
								{Object.keys(labels).map((label) => (
								<option key={label} value={label}>{labels[label]}</option>
								))}
							</select>
						</div>
					</div>
					<div className="book-title">{book.title}</div>
					{book.authors && (
						<div className="book-authors">
							{book.authors.map((author, index) =>
								(<div key={index}>{author}</div>)
							)}
						</div>
					)}
				</div>
			</li>
		)
	}
}

export default Book
