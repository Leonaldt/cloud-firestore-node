const express = require('express')
const db = require('../db/firestore')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = req.body

    try {
        const uid = db.collection('users').doc().id;
        const docRef = db.collection('users').doc(uid)

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

router.get('/users', async (req, res) => {
    db.collection('users')
        .get()
        .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => doc.data())
            res.send(documents)
        })
})

router.get('/users/:id', async (req, res) => {
    const documentId = req.params.id

    try {
        db.collection('users')
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