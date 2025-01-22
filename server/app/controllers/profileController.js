const profileController = {}
import Profile from "../models/profileModel.js";
import cloudinary from "../../config/cloudinary/cloudinaryConfig.js";

profileController.upload = async (req, res) => {

    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: [{ msg: 'No file uploaded' }] });
      }
      const uploadStream = ( fileBuffer ) => {
        return new Promise( ( resolve, reject ) => {
            const upload = cloudinary.v2.uploader.upload_stream({ resource_type :"auto"}, ( error, result ) =>{
                if( error ){
                    reject( error );
                } else {
                    resolve( result );
                }
            })
            upload.end( fileBuffer );
        })
      }
      const result = await uploadStream(file.buffer);
      console.log( result );
      res.json(result );
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: [{ msg: 'Something went wrong while uploading image' }] });
    }
};
  
export default profileController;