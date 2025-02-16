const userId = {
    in: [ "query"],
    isMongoId :{
        errorMessage :" Id is invalid"
    }
}

const dateRange = {
    in: [ "query"],
    isIn : {
        options : [ ["today", "week", "month"]],
        errorMessage : "Date range should be Today or Week or Month"
    }
}
export  { userId , dateRange }