const qr = require('qr-image');
const QrSchema = require("../modals/qr")

exports.generateQr = (req,res) =>{

    const dataIn = { name: req.name , qrIn: true, qrOut: false}
    const dataOut = {name : req.name, qrOut: true, qrIn: false}
    
    const qr_svg_in = qr.imageSync(JSON.stringify(dataIn) + { type: 'svg' });
    const qr_svg_out = qr.imageSync(JSON.stringify(dataOut), { type: 'svg' });

    new QrSchema({ name: req.name , inQr: qr_svg_in, outQr: qr_svg_out }).save( (err) => {
        if (err) {
            res.send(err)
            return;
        };
        res.send('QR code inserted into MongoDB');
      })

    

}

