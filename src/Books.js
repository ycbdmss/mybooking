import React ,{ Component }from 'react'

class Books extends Component {

       render(){
         const { books, onUpdateShelf }=this.props;
         return(
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined? book.imageLinks.thumbnail:''})`}}/>
                    <div className="book-shelf-changer">
                    <select value={book.shelf ? book.shelf :' '} onChange={(e) => onUpdateShelf(book, e)}>
                      <option value=" " disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                   </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
        </ol>
         )
       }
}
export default Books;
