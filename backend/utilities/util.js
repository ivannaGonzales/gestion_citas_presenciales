
const getTextUser = async (body) => {
    const type = body.entry[0].changes[0].value.messages[0].type
    console.log(type)
    if (type === "text") {
        return body.entry[0].changes[0].value.messages[0].text.body

    } else if (type == "button") {
        return body.entry[0].changes[0].value.messages[0].button.text
    }
}

export {
    getTextUser
}
