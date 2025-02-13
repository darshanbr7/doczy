import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineCancel } from "react-icons/md";
import { paymentPageClose, setPaymentError, setPaymentProcessing } from "../../slices/slotSlice";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const Payment = ({ amount, formData, doctorId }) => {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    console.log("amount", amount );
    console.log( "formdata", formData)
    console.log( "doctorId", doctorId)
    
    const { isLoading, clientSecret, paymentError, paymentProcessing } = useSelector((state) => state.payment);

    useEffect(() => {
        if (!clientSecret) {
            dispatch(paymentPageClose());
        }
    }, [clientSecret, dispatch]);

    const handlePaymentSubmit = async (event) => {
        event.preventDefault();
        setPaymentProcessing(true);
        setPaymentError(null);
        const cardNumber = elements.getElement(CardNumberElement);
        const cardExpiry = elements.getElement(CardExpiryElement);
        const cardCvc = elements.getElement(CardCvcElement);

        if (!cardNumber || !cardExpiry || !cardCvc) {
            setPaymentError("Missing card details.");
            setPaymentProcessing(false);
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: cardNumber,
                },
            }
        );

        if (error) {
            setPaymentError(error.message);
            setPaymentProcessing(false);
        } else if (paymentIntent.status === 'succeeded') {
            setPaymentProcessing(false);
            toast.success("Payment was successful");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            {isLoading && <Spinner />}
            <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[500px] relative">
                <MdOutlineCancel
                    className="absolute top-4 right-4 text-gray-600 text-2xl cursor-pointer hover:text-gray-800"
                    onClick={() => {
                        dispatch(paymentPageClose());
                    }}
                />
                <div className=" flex justify-center items-center"><p className="text-2xl font-semibold opacity-85"> Payment Page</p></div>
                <div>
                    <p className="my-2 font-semibold opacity-85"> Payment Details</p>
                    <p className="text-sm font-semibold mb-2"> Total Amount : { amount } </p>
                </div>
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <div className="border rounded-lg p-3">
                            <CardNumberElement
                                autoFocus={true}
                                className="w-full focus:outline-none font-semibold focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date (MM/YY)</label>
                            <div className="border rounded-lg p-3">
                                <CardExpiryElement
                                    className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                            <div className="border rounded-lg p-3">
                                <CardCvcElement
                                    className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {paymentError && (
                        <div className="text-red-500 text-sm text-center">{paymentError}</div>
                    )}

                    <button
                        type="submit"
                        className={`w-full py-3 bg-blue-500 text-white rounded-lg mt-4 text-lg font-semibold focus:outline-none disabled:opacity-50 ${paymentProcessing ? 'bg-blue-300' : 'hover:bg-blue-600'}`}
                        disabled={paymentProcessing || isLoading}
                    >
                        {paymentProcessing ? 'Processing...' : 'Confirm Payment'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
