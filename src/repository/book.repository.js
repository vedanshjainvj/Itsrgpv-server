import bookModel from "../models/book.model.js";

class BookRepository{
    
    //to create Book
    static  async create(data) {
          const newBook = await bookModel.create(data);
           return newBook;
     }
     //get all Book
    static  async getAll(page,limit) {
        const skip = (page-1)* limit;
          const getAllBook = await bookModel.find().sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
           return getAllBook;
     }

     //get single Book
    static  async getById(id) {
          const getdata = await bookModel.findById(id);
           return getdata;
     }

     //update Book
    static  async edit(id,updateData) {
               const updatedBook = await bookModel.findByIdAndUpdate(
                 id,
                  { $set: updateData },
                 { new: true, runValidators: true }
               );
           return updatedBook;
     }

     //delete Book
    static  async delete(id) {
         const deleteBook = await bookModel.findByIdAndDelete(id);
           return deleteBook;
     }

}

export default  BookRepository;