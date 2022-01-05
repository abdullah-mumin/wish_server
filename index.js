
// stripe secret key get from .env file put this on the upper side
const stripe = require('stripe')(process.env.STRIPE_SECRET);



// payment main part
//    ---------------Payment Section started---------------
// define payment data get for stripe payments
app.post('/create-payment-intent', async (req, res) => {
    const paymentInfo = req.body;
    const paymentAmount = parseInt(paymentInfo?.cost)
    const amount = paymentAmount * 100;
    const paymentIntent = await stripe.paymentIntents.create({
        currency: 'usd',
        amount: amount,
        payment_method_types: ['card']
    });
    res.json({ clientSecret: paymentIntent.client_secret })
});

//---put api
app.put('/orders/:id', async (req, res) => {
    const id = req.params.id;
    const payment = req.body;
    const filter = { _id: ObjectId(id) };
    const updateDoc = {
        $set: {
            payment: payment
        }
    }
    const result = await ordersCollection.updateOne(filter, updateDoc);
    res.json(result)
});
        //----------payment section done-----