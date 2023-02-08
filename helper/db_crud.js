export const save = async (data) => {

    try {
        let oldData = await FileReaderSync('../db.json')
    } catch (e) {
        console.log(e)
    }

}