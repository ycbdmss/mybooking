import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  
    state = {
      books: [],
      searchResults: [],
      loading: true
    }
    updateBookShelf = this.updateBookShelf.bind(this);
    SearchBooks = this.SearchBooks.bind(this);
  

  componentDidMount() {
    this.init();
  }
  
  init() {
    BooksAPI.getAll().then((data) => {
      this.setState({books : data,loading: false});
    });
 }

  updateBookShelf(book, event) {
    const shelf = event.target.value;
    
      BooksAPI.update(book, shelf).then(() => {
        this.init();
      })
    
  }

  SearchBooks(query){
    BooksAPI.search(query, 20).then((Books) =>{
        if(Books.error === undefined){
          this.setState(state => ({
             searchResults: Books
          }))
        }
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
           <div>
           {!this.state.loading ?(
            <ListBooks
            books={this.state.books}
            onUpdateShelf={this.updateBookShelf} />
            ) : (            
              <div className="loader"/>
           )}
           </div>
          
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            books={this.state.searchResults}
            onUpdateShelf={this.updateBookShelf}
            onSearchBooks={this.SearchBooks}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
