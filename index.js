const Wreck = require('@hapi/wreck');
const fs = require('fs');
const jobs = [
    "132243377",
    "132243379",
    "132243379",
    "132243381",
]

jobs.forEach((job) => {
    const jobLink = 'https://sqs-new.app.2adv.me/api/job/' + job
    Wreck.get(jobLink).then(({ payload }) => {

        const json = JSON.parse(payload.toString());
        const numberProcess = json.data.data.process.dadosBasicos.attributes.numero
        const fileName = json.data.result.guia.conteudo
        const linkPDF = 'https://gateway.app.2adv.me/api/storage/' + fileName;

        Wreck.get(linkPDF).then(({ payload }) => {
            const pathFileName = `./arquive/${numberProcess}-|-${fileName}`
            console.log(pathFileName)
            fs.writeFile(pathFileName, payload, (err) => {
                if (!err) console.log('Data written');
            })
        })
    })
});