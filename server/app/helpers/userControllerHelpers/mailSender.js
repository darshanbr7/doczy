import nodemailer from "nodemailer";
/**
 * This is the helper function to send an email to the user 
 * @param { email}  - recive a user email
 * @param {subject } -  Regarding  the mail Sending Purpose 
 * @param { templet }  - html templet for the mail 
 */
const mailSender = async ( email, subject, templet ) => {
    try {
        const transporter =   nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : process.env.ADMIN_EMAIL,
                pass : process.env.ADMIN_PASS
            }
        })
        let mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email, 
            subject: subject , 
            html : templet
        };
        const info = await transporter.sendMail(mailOptions)
        if( !info ){
            throw new Error ( "something went wrong in mail config")
        }
        console.log( "mail sent succesfully")
    } catch (error) {
        throw new Error( error.message );
    }
}
export default mailSender;