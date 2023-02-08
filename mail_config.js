export const emailConfig = (to,title,subject) => {
    return {
        from: 'dangkhanh.dev@gmail.com',
        to: to,
        subject: subject,
        text: title
    }
}