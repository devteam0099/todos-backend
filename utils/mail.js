import nodemailer from 'nodemailer'

const mailSender = (reciever)=>{
    const transprter = nodemailer.createTransport({
        service : 'gmail',
        port : 465,
        secure : 'TLS',
        auth : {
            user : "hm.abdullah825@gmail.com",
            pass : "imyliuvbkxinujwx"
        }
    })

    const mailOptions = {
        from : 'hm.abdullah825@gmail.com',
        to : reciever,
        subject : 'testing mail',
        Text : "mail is send using nodemailer",
        html : "<h1>Welcome to our App</h1></br><p>we are very happy to get you here.your account has been registered successfully.Just go to application and start exploring!</p>"
    }
    
    transprter.sendMail(mailOptions,(err,info)=>{
        if (err) {
            console.log(err)
        }else{
            console.log(info)
        }
    })
}
export default mailSender