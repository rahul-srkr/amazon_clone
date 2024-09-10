import { addToBasket, removeFromBasket } from "@/slices/basketSlice"
import StarIcon from "@heroicons/react/24/solid/StarIcon"
import Image from "next/image"
import { useDispatch } from "react-redux"

const CheckoutProduct = ({
    id,
    title,
    rating,
    price,
    description,
    category,
    image,
    hasPrime }) => {

    const dispatch = useDispatch()

    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
            hasPrime
        }
        dispatch(addToBasket(product))
    }

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }))
    }
    return (
        <div className="grid grid-cols-5">
            <Image
                src={image}
                height={200}
                width={200}
                className="object-contain"
                alt=""
            />

            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating).fill().map((_, i) => <StarIcon key={i} className="h-5 text-yellow-500" />)}
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                ${price}

                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img src="https://links.papareact.com/fdw" className="w-12" loading="lazy" alt="" />
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}
            </div>
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <button className="button mt-auto" onClick={addItemToBasket}>Add to Basket</button>
                <button className="button mt-auto" onClick={removeItemFromBasket}>Remove from Basket</button>
            </div>

        </div>
    )
}
export default CheckoutProduct