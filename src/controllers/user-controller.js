import User from "../models/user-model.js"
import uploadOnCloudinary from "../utils/cloudinary-config.js";


//Retrieving users 
export const getUsers = async (req,res) =>{

    try{
        const users = await User.find();
        return res.status(200).json({messgae: 'here are users',users});
    }catch(error){
        return res.status(500).json({message: 'Error in finding the user'});
    }
}


//Saving user in database
export const saveUser = async (req,res) =>{

    
    try{
        const {firstName, lastName, email } = req.body;
         if(!firstName || !lastName || !email){
            return res.status(400).json({message: 'send the valid data'})
         }
        
        let profileUrl = '';
        
        if (req.file && req.file.path) {
            const uploadResult = await uploadOnCloudinary(req.file.path);

            if (uploadResult && uploadResult.secure_url) {
                profileUrl = uploadResult.secure_url;
            } else {
                return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
            }
        }

        const user = new User({
            firstName,
            lastName,
            email,
            profileImg: profileUrl
         })
        
        
        await user.save();
         
        return res.status(201).json({message: 'user created succesfully',user});
    }catch(error){
        return res.status(500).json({message: 'Failed to save user', errorMsg:error.message}) 
    }
}


//Saving each user links
export const saveUserLinks = async(req,res) =>{

    const {firstName, userLinks} = req.body;
 
    try {
        // Find the user by firstName and update their links
        const user = await User.findOneAndUpdate(
            { firstName }, 
            { $set: { links: userLinks } },
            { new: true, upsert: true } 
        );

        if (user) {
            return res.status(200).json({ message: 'User links updated successfully', userLinks: user.links });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update user links', error });
    }
}


//Retrieving user by first name
export const getUser = async (req, res) => {
    const { firstName } = req.params;
    try {
        const user = await User.findOne({ firstName });

        if (user) {
    
            return res.status(200).json({ message: 'User links retrieved successfully', user: user });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {

        return res.status(500).json({ message: 'Failed to retrieve user links', error });
    }
};

