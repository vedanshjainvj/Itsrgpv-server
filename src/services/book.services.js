import BooksRepository from "../repository/book.repository.js";

class BookServices{

    static  async createBook(data) {
          const newBook = await BooksRepository.create(data);
          return newBook;
    }
    
    static  async getAllBook(page,limit) {
          const getBooks = await BooksRepository.getAll(page,limit);
          return getBooks;
    }

    static  async findBookById(id) {
          const findData = await BooksRepository.getById(id);
          return findData;
    }

    static  async editBook(id,updateData) {
          const editData = await BooksRepository.edit(id,updateData);
          return editData;
    }

    static  async deleteBook(id) {
          const deleteData = await BooksRepository.delete(id);
          return deleteData;
    }

}

export default BookServices;