/**
 * This function used to generates an aggregation pipeline for MongoDB queries based on provided filters and pagination options.
 * 
 * @param {Object} params - The parameters to filter and paginate the aggregation.
 * @param {string} params.name - The name of the user to filter by (optional). If provided, a case-insensitive regex match is applied.
 * @param {boolean} params.isVerified - The verification status to filter by. Filters for users with the specified verification status.
 * @param {number} params.skip - The number of documents to skip for pagination.
 * @param {number} params.pageLimit - The maximum number of documents to return (limit) for pagination.
 * @returns {Array} The MongoDB aggregation pipeline with various stages based on the input parameters.
*/


export const aggrigatorForAdmin = ({ name, isVerified, skip, pageLimit }) => {
    const pipeLine = [];
    pipeLine.push({
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
        }
    });
    pipeLine.push({
        $unwind: "$user"
    })
    pipeLine.push({
        $project: {
            "user.password": 0,
            "user.role": 0,
            "user.createdAt": 0,
            "user.updatedAt": 0,
            "user.isSubscriber": 0,
            "user.isVerified": 0,
            "user.__v": 0,
            "user._id": 0
        }
    })
    pipeLine.push({
        $lookup: {
            from: "profiles",
            localField: 'profileId',
            foreignField: "_id",
            as: "profile"
        }
    }
    )
    pipeLine.push({
        $unwind: {
            path: "$profile"
        }
    })
    pipeLine.push({
        $project: {
            "profile._id": 0,
            "profile.userId": 0,
            "profile.createdAt": 0,
            "profile.updatedAt": 0,
            "profile.isSubscriber": 0,
            "profile.dob": 0,
            "profile.__v": 0
        }
    })
    if (name && name.trim() !== "") {
        pipeLine.push({
            $match: {
                "user.name": { $regex: name, $options: "i" }  // Case-insensitive match
            }
        });
    }
    pipeLine.push({
        $match: { isVerified }
    })
    pipeLine.push({
        $project: {
            "profileId": 0, 
            "__v": 0, 
            "updatedAt": 0, 
            "createdAt": 0, 
        }
    });

    pipeLine.push({
        $skip: skip
    });
    pipeLine.push({
        $limit: pageLimit
    });


    return pipeLine;
}


export const aggrigatorForCustomer = ({ name, isVerified, skip, pageLimit, location, specialization }) => {

    const pipeLine = [];
    pipeLine.push({
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
        }
    });
    pipeLine.push({
        $unwind: "$user"
    })
    pipeLine.push({
        $project: {
            "user.password": 0,
            "user.role": 0,
            "user.createdAt": 0,
            "user.updatedAt": 0,
            "user.isSubscriber": 0,
            "user.isVerified": 0,
            "user.__v": 0,
            "user._id": 0
        }
    })

    pipeLine.push({
        $lookup: {
            from: "profiles",
            localField: 'profileId',
            foreignField: "_id",
            as: "profile"
        }
    }
    )
    pipeLine.push({
        $unwind: {
            path: "$profile"
        }
    })
    pipeLine.push({
        $project: {
            "profile._id": 0,
            "profile.userId": 0,
            "profile.createdAt": 0,
            "profile.updatedAt": 0,
            "profile.isSubscriber": 0,
            "profile.dob": 0,
            "profile.__v": 0
        }
    })
    if (name && name.trim() !== "") {
        pipeLine.push({
            $match: {
                "user.name": { $regex: name, $options: "i" }  // Case-insensitive match
            }
        });
    }
    pipeLine.push({
        $match: { isVerified }
    })
    if (specialization.length > 0) {
        pipeLine.push({
            $match: {
                "specialization": { 
                    $in: specialization.map(spec => new RegExp(spec, "i")) 
                }
            }
        });
    }
    if (location && location.trim() !== "") {
        const locationRegex = new RegExp(location, "i");
        pipeLine.push({
            $match: {
                $or: [
                    { "address.city": { $regex: locationRegex } },
                    { "address.street": { $regex: locationRegex } }
                ]
            }
        });
    }
    pipeLine.push({
        $project: {
            "profileId": 0, 
            "__v": 0, 
            "updatedAt": 0, 
            "createdAt": 0, 
            "licenceImage": 0, 
            "isVerified": 0, 
            "licenceExpiryDate": 0, 
            "licenceNumber": 0
        }
    });
    pipeLine.push({
        $skip: skip
    });

    pipeLine.push({
        $limit: pageLimit
    });


    return pipeLine;
};
