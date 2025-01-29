const aggrigator = ({ name, isVerified, skip, pageLimit }) => {
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
    pipeLine.push( {
            $lookup: {
                from: "profiles",
                localField: 'profileId',
                foreignField : "_id",
                as : "profile"
            }
        }
    )
    pipeLine.push( {
        $unwind: {
            path : "$profile"
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
        $skip: skip
    })
    pipeLine.push({
        $limit: pageLimit
    })
    return pipeLine;
}
export default aggrigator;