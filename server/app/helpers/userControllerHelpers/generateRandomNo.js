/**
 * This function generates a 6-digit random number.
 * @returns {number} - A 6-digit random number between 100000 and 999999.
*/
const generateRandomNumber = ( ) => Math.floor( 100000 + Math.random() * 900000 );
export default generateRandomNumber;