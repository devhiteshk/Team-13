const qr = require('qr-image');
const QrSchema = require("../modals/qr")

exports.generateQr = (req,res) =>
{


    const dataIn = { name: req.body.name , qrIn: true, qrOut: false}
    const dataOut = {name : req.body.name, qrOut: true, qrIn: false}
    
    const qr_svg_in = qr.imageSync(JSON.stringify(dataIn) , { type: 'svg' });
    const qr_svg_out = qr.imageSync(JSON.stringify(dataOut), { type: 'svg' });

    new QrSchema({ name: req.body.name , inQr: qr_svg_in, outQr: qr_svg_out }).save( (err) => {
        if (err) {
            res.status(500).json({ success: false, message:err})
            return;
        };

        QrSchema.find({})
        .then( data =>  res.json({success: true,data})
        )
    
      })

    

}


exports.allQrs = ( req, res) => {
    console.log("h")
    QrSchema.find({})
    .then( data =>  res.json({success: true,data})
    )
}
