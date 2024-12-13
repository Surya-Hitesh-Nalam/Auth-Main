import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async(email,verificationToken)=>{
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verification"
        })

        console.log("email sent successfully")
    } catch (error) {
        console.log(error)
        throw new Error(`Error sending verification email : ${error}`)
    }
}

export const sendWelcomeMail = async(email,name)=>{
    const recipient = [{email}];
    try {
        
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            template_uuid:"e65925d1-a9d1-4a40-ae7c-d92b37d593df",
            template_variables:{
                "company_info_name":"Auth Company",
                "name":name
            }
        })

        console.log(response)
    } catch (error) {
        
    }
}

export const sendPasswordResetEmail=async(email,resetUrl)=>{

    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"reset your password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetUrl}",resetUrl),
            category:"Password Reset"
        })
    } catch (error) {
        console.log("Error sending password reset email",error)
        console.log('error sending password reset email:')
    }
}

export const sendResetSuccessEmail=async(email)=>{
    const recipient=[{email}]
    try {
        const response= await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"password reset succeesful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"password reset"
        })
    } catch (error) {
        console.log("error sendong password reset success mail",error)
        throw new Error("Error sending password reset mail",error)
    }
}