// BookController.js
import {
  createBook,
  getAllBookes,
  deleteOneBook,
  checkExistingBook,
  getone,
 
  

} from "../services/BookService";

export const addBookController = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  admin",
      });
    }

    req.body.title = req.body.title.toUpperCase();
    req.body.image ="https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"

    if (!req.body.title) {
      return res.status(400).json({
        success: false,
        message: "title is required",
      });
    }
      if (!Array.isArray(req.body.tags)) {
      return res.status(400).json({
        success: false,
        message: "Tags should be an array",
      });
    }

    const existingBook = await checkExistingBook(req.body.title);
    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: "book with the same title already exists",
      });
    }
    req.body.status = "active";
    console.log(req.body)
    const newBook = await createBook(req.body);

    return res.status(201).json({
      success: true,
      message: "book created successfully",
      book: newBook,

    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export const BookWithAllController = async (req, res) => {
  try {

  
    let allbooks = await getAllBookes();
    let  data;

    if(req.user.role==="admin"){
      
      data= allbooks;
    }
    if(req.user.role==="customer"){ 

      data= allbooks.filter(book => book.status==="active");
    }


   
    return res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};



export const deleteOneBookController = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not  admin",
      });
    }

    const Book = await deleteOneBook(req.params.id);
    if (!Book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      Book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};



export const getOneBookController = async (req, res) => {


  try {
    const { id } = req.params;
    const data = await getone(id);
    if (!data) {
      return res.status(404).json({
        message: "book not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "book retrieved successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

