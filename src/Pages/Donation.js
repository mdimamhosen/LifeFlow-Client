import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";

import Modal from "react-modal";
import { toast } from "react-hot-toast";
import useUserInfo from "../Hooks/useUserInfo";
import { axiosOpen } from "../Hooks/useAxiosCommon";
import { axiosSecure } from "../Hooks/useAxiosSecure";

const stripePromise = loadStripe(
  "pk_test_51PJJ5FP1qIb85z5F2ZxxQf4E2v3stKkzPo13JFRjplF2t0OvKKm9FYJFR6kDG6mk0xBSHNbmJrkzcYkphrVsNY5x00wkCwhHbQ"
);

const Donation = () => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { data: donate = [], refetch } = useQuery({
    queryKey: ["donate"],
    queryFn: async () => {
      try {
        const response = await axiosOpen.get("/donate", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFunds(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching funds:", error);
        setLoading(false);
      }
    },
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>LifeFlow || Donation</title>
      </Helmet>
      <div
        className="relative bg-cover bg-center h-64 flex items-center justify-center mb-8"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold">Donate to Save Lives</h1>
          <p className="mt-2 text-lg">
            Your contribution can make a difference
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Funds</h2>
        <button
          onClick={openModal}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          Give Fund
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">
                  User
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Amount
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {funds.map((fund) => (
                <tr key={fund.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    {fund.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {fund.amount}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {new Date(fund.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Donate Modal"
        className="border-4 border-red-600 md:w-[90%] lg:w-[40%] mx-auto bg-white shadow-lg rounded-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <Elements stripe={stripePromise}>
          <DonationForm closeModal={closeModal} refetch={refetch} />
        </Elements>
      </Modal>
    </div>
  );
};

const DonationForm = ({ closeModal, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    zipCode: "",
    state: "",
    country: "",
    division: "",
    phoneNumber: "",
    amount: "",
  });

  const stripe = useStripe();
  const elements = useElements();
  const [userInfo, refetchUserInfo, isLoading] = useUserInfo();

  const getClientSecret = async (amount) => {
    try {
      const response = await axiosOpen.post(
        "/create-payment-intent",

        { amount },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe has not loaded properly.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!clientSecret) {
      setError("Client secret not set.");
      setLoading(false);
      return;
    }

    try {
      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: userInfo?.name,
              email: formData?.email,
            },
          },
        });

      if (paymentError) {
        console.error("Payment error:", paymentError);
        setError(paymentError.message);
        setLoading(false);
        toast.error(paymentError.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        console.log("Payment successful:", paymentIntent);
        setLoading(false);
        toast.success("Payment successful!");
        try {
          const response = await axiosSecure.post(
            "/donate",
            {
              name: userInfo?.name,
              email: userInfo?.email,
              amount: parseFloat(formData?.amount),
              date: new Date().toISOString(),
            },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log(response.data);
        } catch (error) {
          console.error("Error saving donation:", error);
        } finally {
          refetch();
          closeModal();
        }
      }
    } catch (err) {
      console.error("Error confirming card payment:", err);
      setError("Payment failed. Please try again.");
      toast.error("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData?.amount) {
      getClientSecret(formData.amount);
    }
  }, [formData?.amount]);

  return (
    <div className="z-30 mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg sm:p-6 lg:p-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Amount to Donate</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mt-1 focus:outline-none text-black bg-gray-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Card Details</label>
          <CardElement className="p-2 border rounded mt-1 focus:outline-none" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-800 text-white p-2 rounded mt-4 hover:bg-blue-600 focus:outline-none disabled:cursor-not-allowed"
          disabled={!stripe || !clientSecret || loading}
        >
          {loading ? "Processing..." : "Donate"}
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </form>
    </div>
  );
};

export default Donation;
