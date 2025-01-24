import cloudinary from "../../../config/cloudinary/cloudinaryConfig.js"

/**
 * This function is used to Upload the image into cloudinary
 * @param { file } - This  function takes images as a aggument upload it into cloudinary
 * @returns - it returns the address of the image stored in cloudinary
*/

const uploadMedia =  async ( file ) => {
    try {
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
        return result;
    } catch (error) {
        throw new Error ( error.message );
    }
}
export default uploadMedia