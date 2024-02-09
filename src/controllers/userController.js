
import {
  createUserCustomer,
  getUserByEmail,
} from "../services/userService";



export const addCustomer = async (req, res) => {
  try {
    if (!req.body.username || req.body.username === "" ||  !req.body.email || req.body.email === "" || !req.body.password || req.body.password === ""
  ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all information",
      });
    }


    const userExist = await getUserByEmail(req.body.email);
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const role='customer'
    req.body.role=role;
    req.body.points=100;
    const newUser = await createUserCustomer(req.body);
 


    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,  
        email: newUser.email,
        role: newUser.role,
        points: newUser.points,
 
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};














