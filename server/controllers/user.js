const User = require("../modals/user")
const StationDensity = require("../modals/StationDensity")

const stations = {
    "rohini sector": 1,
    "haiderpur badli mor": 2,
    "jahangirpuri": 3,
    "adarsh nagar": 4,
    "azadpur": 5,
    "model town": 6,
    "gtb nagar": 7,
    "viswavidyalaya": 8,
    "vidhan sabha": 9,
    "rajiv":10
}


const updateInJourney = (req,res,name) => {
    // user is stored in req.auth

    User.findById(req.auth._id)
    .then((user) => {

        // if it scanned first time
        if(user.enter.length === 0 )
        {
            // check for minimum balacne
            if(user.wallet < 60)
            return res.status(400).json({success: false, message: "Minimum amount of 60 is required in wallet"})

            const time = new Date().toUTCString();
            user.enter = [true,time]
            user.sourceStation = name
            user.save()
            .then( (user) => 
            {
                // Making entry in density table of current in
                const a = new StationDensity({name: name,creationTime: new Date()});
                a.save().then( () =>   res.status(200).json({success: true, message: "Entered Succefully, Enjoy your journey!"})  )
              
            } 
            )
            .catch( errr =>  res.status(400).json({success: false, message: errr}) )
        }
        // check if user as already entered
        else
        {
            return res.status(400).json({success: false, message: "User has already scanned entry qr"})
        }
    } )
    .catch( errr =>  res.status(400).json({success: false, message: "Something went wrong"}))
}


const updateOutJourney = (req,res, name ) => {
    User.findById(req.auth._id)
    .then((user) => {
        // we can out only if anyone has entered 
        if(user.enter.length > 0 )
        {
            // if the enter and & exit station are same we cannot exit ( emergency case solved later on basis of time)
            if(name.toLowerCase() === user.sourceStation.toLowerCase())
            {
                return res.status(500).json({success: false, message: "User cannot exit from same station\n in case of emergeny contact support staff."})
            }
            // Make the transaction and clear the entry array
            const outTime = new Date().toUTCString();
            const travelCost = Math.abs(stations[user.sourceStation.toLowerCase()] - stations[name.toLowerCase()])*10;
            // handling less amount in wallet
            if ( user.wallet < travelCost)
            return res.status(400).json({success: false, message: "Insuffcient Amount"})
            


            const newTransaction = {

                amount: travelCost,
                time: outTime,
                boarding: user.sourceStation,
                destination: name
            }

            user.wallet = user.wallet - travelCost;
            user.transactions.push(newTransaction)
            user.enter  = [];

            user.save()
            .then( (user) =>  res.status(200).json({success: true, message: "Exited successfully", transaction: newTransaction}) )
            .catch( errr =>  res.status(400).json({success: false, message: errr}) )

        }
        else
        {
            return res.status(400).json({success: false, message: "User is alrady exited"})
        }
    } )
    .catch( errr =>  res.status(400).json({success: false, message: "Something went wrong"}))
}

exports.updateJourneyStatus = (req,res) => 
{
    
    const {name,qrIn, qrOut} = req.body;
    // user has scanned the in url
    if(qrIn)
    {
        updateInJourney(req,res,name)
    }
    // user has sacnned the out url
    else
    {
        updateOutJourney(req,res,name)
    }

}

exports.getJourneyTransactions = (req,res) => {
    User.findById(req.auth._id)
    .then( user => {
        return res.status(200).json({ "transactions" : user.transactions})
    })
    .catch( () => res.status(400).json({success: false, message: "Something went wrong"}))

}
exports.getWalletTransactions = (req,res) => {
    User.findById(req.auth._id)
    .then( user => {
        return res.status(200).json({ "transactions" : user.walletTransactions})
    })
    .catch( () => res.status(400).json({success: false, message: "Something went wrong"}))

}

exports.getStationDensity = async  (req,res) => {

    var d = new Date();
    d.setMinutes(d.getMinutes()-30);

    var stationsData = {
        "rohini sector": 0,
        "haiderpur badli mor": 0,
        "jahangirpuri": 0,
        "adarsh nagar": 0,
        "azadpur": 0,
        "model town": 0,
        "gtb nagar": 0,
        "viswavidyalaya": 0,
        "vidhan sabha": 0,
        "rajiv":0
    }

    let data = await StationDensity.find({creationTime: {$gte: d}, "name":"rohini sector"})
    stationsData["rohini sector"]+= data.length

    data = await StationDensity.find({creationTime: {$gte: d}, "name":"haiderpur badli mor"})
    stationsData["haiderpur badli mor"]+= data.length

    data = await StationDensity.find({creationTime: {$gte: d}, "name":"jahangirpuri"})
    stationsData["jahangirpuri"]+= data.length

    data = await StationDensity.find({creationTime: {$gte: d}, "name":"adarsh nagar"})
    stationsData["adarsh nagar"]+= data.length

    data = await StationDensity.find({creationTime: {$gte: d}, "name":"azadpur"})
    stationsData["azadpur"]+= data.length

    data = await StationDensity.find({creationTime: {$gte: d}, "name":"model town"})
    stationsData["model town"]+= data.length

    data = await StationDensity.find({creationTime: {$gte: d}, "name":"gtb nagar"})
    stationsData["gtb nagar"]+= data.length

    data = await StationDensity.find({creationTime: {$gte: d}, "name":"viswavidyalaya"})
    stationsData["viswavidyalaya"]+= data.length

    data = await StationDensity.find({creationTime: {$gte: d}, "name":"gtb nagar"})
    stationsData["gtb nagar"]+= data.length

    data = await StationDensity.find({creationTime: {$gte: d}, "name":"rajiv"})
    stationsData["rajiv"]+= data.length

    data = await StationDensity.find({creationTime: {$gte: d}, "name":"vidhan sabha"})
    stationsData["vidhan sabha"]+= data.length

    res.send(stationsData)


    
}

exports.getUser = (req,res) => {
    User.findById(req.auth._id)
    .then( user => res.json(user))
    .catch( err => res.json(err))
}