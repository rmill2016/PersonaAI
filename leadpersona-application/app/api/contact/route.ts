import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'rmill2016@gmail.com',
    pass: 'znvlgqfcjskwdiom'
  }
})

export async function GET(req: Request) {
  const name = (await req.formData()).get('name')
  const position = (await req.formData()).get('position')
  const company = (await req.formData()).get('company')
  const message = (await req.formData()).get('message')

  const info = await transporter.sendMail({
    from: `${name}`, // sender address
    to: 'rmill2016@gmail.com', // list of receivers
    subject: 'A New Message From LeadPersona!', // Subject line
    html: `<div>
                <p>Name: ${name}</p>
                <p>Position: ${position}</p>
                <p>Company: ${company}</p>
                <br />
                <p>Message: ${message}</p>
           </div>`
  })

  console.log('Message sent: %s', info.messageId)
}
