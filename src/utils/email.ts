import nodemailer from "nodemailer" 
import * as ENV from "../config/env"

let transporter = nodemailer.createTransport(
  /*{
    service: "gmail",
    // secure: false,
    auth: {
      user: ENV.mailUrl,
      pass: ENV.mailPassword,
    },
  }*/
  );
  

  // send mail with defined transport object

 export const mailer = async (receiver) => {
    try{
      let info = await transporter.sendMail({
        from: 'noreply@me.com', 
        to: receiver, 
        subject: "Hello you now have an active account",
        html: "<b>Hello world</b>",
      });

    } catch (err) {
      console.log(err)
    }
      // console.log("mkf")
  }

  // transporter.sendMail()
console.log(mailer("oreeyomi@gmail.com"))