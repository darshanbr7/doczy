import  OpenCage  from "opencage-api-client";
const { geocode } = OpenCage

/**
 * This function used Retrieves the latitude and longitude of a given address using the OpenCage Geocoding API. 
 * @param {Object} address - The address object containing the building number, street, city, 
 *                            state, and country.
 * @returns {Object} - An object containing the `latitude` and `longitude` of the address.
 */

const getCoordinates = async ( address ) => {
    try {
        const fullAddress = `${address.buildingNo}, ${address.street}, ${address.city}, ${address.state}, ${address.country}`;
        const apiKey = process.env.OPENCAGE_API;
        const response = await geocode( { q : fullAddress, key : apiKey } );
        if( response.status.code === 200 && response.results.length > 0 ){
            const result = response.results[0];
            const latitude = result.geometry.lat;
            const longitude = result.geometry.lng;
            return { latitude, longitude };
        } else{
            throw new Error("No result found this address")
        }
    } catch (error) {
        throw error;
    }
}

export default getCoordinates