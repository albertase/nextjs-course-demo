// api/new-meetup

import { MongoClient } from "mongodb"

const handler = async (req, res) => {
    if(req.method === 'POST'){
        const data = req.body

        // const {title, image, address, description} = data

        const client = await MongoClient.connect('mongodb+srv://nextjs:albert12345@cluster0.f97vrjv.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db()

        const meetupsCollection = db.collection('meetups')
        const result = await meetupsCollection.insertOne(data)
        console.log(result)

        client.close()

        res.status(201).json({message: 'Inserted Successfully'})
    }
}

export default handler