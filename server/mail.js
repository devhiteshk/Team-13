

const nodemailer = require("nodemailer")
const User = require("./modals/user")

const transportar = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user:"a.m2001nov@gmail.com",
        pass:"gamgzrftbkzvrdry"
    }
});


sendMail =  (email) => {
    const mailOptions = {
        from:"a.m2001nov@gmail.com",
        to:email,
        subject: "You are running out of Money!!!",
        text: `
        Greeting from SmartDmc, 
        Hey, You are running out of money in your wallet. You have to add money so that you can do smooth journeys.

        Regards,
        SmartDmc
        `,
    }
    transportar.sendMail(mailOptions, (err,info) => {
        
        if(err)
        {
            console.log("Email Sent Successfully")
          
        }
        console.log(email)

    })
}

exports.sendRechargeReminders = () => {
    User.find({})
    .then( (users) => {
        users.map( user => {
            if(user.wallet <= 50 )
            {
                sendMail(user.email)
            }
        })
    })
}
