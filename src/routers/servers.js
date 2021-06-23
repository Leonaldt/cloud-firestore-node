const express = require('express')
const db = require('../db/firestore')

const router = new express.Router()

router.post('/servers', async (req, res) => {
    const user = req.body

    try {
        const uid = db.collection('servers').doc().id;
        const docRef = db.collection('servers').doc(uid)

        await docRef.set({
            id: uid,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        })

        res.status(201).send()
    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
})

router.get('/servers', async (req, res) => {
    await db.collection('servers')
        .where('owner', '==', 'QC4mRC7ziCYyi5bvgvcJ3TOjsHq2')
        .orderBy('name', 'desc')
        .limit(10)
        .get()
        .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => doc.data())
            res.send(documents)
        }) // 995313871
})

router.get('/servers/:id', async (req, res) => {
    const documentId = req.params.id

    try {
        db.collection('servers')
            .doc(documentId)
            .get()
            .then(snapshot => {
                const document = snapshot.data()

                if (!document) {
                    return res.status(404).send({ error: 'Document not found' })
                }

                res.send(document)
            })
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router