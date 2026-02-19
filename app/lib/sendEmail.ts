'use server';

import nodemailer from 'nodemailer'

const host = process.env.SMTP_HOST
const user = process.env.SMTP_USER
const pass = process.env.SMTP_PASS
const port = process.env.SMTP_PORT
const appHost = process.env.APP_HOST

const smtpOptions : any = {
    host,
    auth: { user, pass },
    ...(port && {port})
} 

const transporter = nodemailer.createTransport(smtpOptions)

export async function sendEmail(messageParams: {html:string, to:string, subject: string, from: string, cc?: string, bcc?: string}) {
    console.log("the object passed to sendmail:")
    console.log(messageParams)
    await transporter.sendMail(messageParams)
}



