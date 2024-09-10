import Header from "@/components/Header"
import Order from "@/components/Order.js"
import moment from "moment/moment"
import { getSession, useSession } from "next-auth/react"
import db from "../../firebase.js"


const Orders = ({ orders }) => {
    console.log(orders);
    const { status, data: session } = useSession()
    return (
        <div>
            <Header />
            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>
                {
                    session ? (
                        <h2>{orders.length} Orders</h2>
                    ) : (
                        <h2>Please sign in to see your orders</h2>
                    )
                }
                <div className="mt-5 space-y-4">
                    {orders?.map(({
                        id,
                        amount,
                        item,
                        timestamp,
                        images
                    }) => <Order
                            id={id}
                            amount={amount}
                            items={item}
                            timestamp={timestamp}
                            images={images}
                        />)}
                </div>
            </main>
        </div>
    )
}
export default Orders

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const { doc, getDoc, getDocs, where, query, orderBy, collection, } = require("firebase/firestore");

    // get the users logged in credentials
    const session = getSession(context)

    if (!session) {
        return {
            props: {}
        }
    }

    const docRef = collection(db, "users", "8199829rs@gmail.com", 'orders')
    const stripeOrders = await getDocs(docRef)
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            item: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100
                })
            ).data,
        }))
    )
    return {
        props: {
            orders
        }
    }
}