// "use client";

// import React, { useState } from "react";
// import { ChevronLeft, CreditCard } from "lucide-react";
// import { motion } from "framer-motion";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { supabase } from "@terapias/db/supabase";
// import { useRouter } from "next/navigation";

// interface PaymentStepProps {
//   formData: {
//     name: string;
//     email: string;
//     title: string;
//     location: string;
//     specialties: string[];
//     bio: string;
//     experience: string;
//     languages: string[];
//     certifications: string[];
//     availability: string[];
//     image: string;
//     sessionTypes: { name: string; duration: string; price: string; description: string }[];
//   };
//   userId: string | null;
//   prevStep: () => void;
//   router: ReturnType<typeof useRouter>;
//   setError: (error: string | null) => void;
// }

// export default function PaymentStep({ formData, userId, prevStep, router, setError }: PaymentStepProps) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [paymentError, setPaymentError] = useState<string | null>(null);
//   const [paymentLoading, setPaymentLoading] = useState(false);

//   const handlePaymentSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements || !userId) return;

//     setPaymentLoading(true);
//     setPaymentError(null);

//     try {
//       const response = await fetch("/api/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: 1000, userId }), // CHF 10 = 1000 centavos
//       });

//       if (!response.ok) throw new Error("Erro ao criar PaymentIntent");

//       const { clientSecret } = await response.json();

//       const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement)!,
//           billing_details: { name: formData.name },
//         },
//       });

//       if (paymentResult.error) {
//         throw new Error(paymentResult.error.message);
//       }

//       const { error: dbError } = await supabase.from("seller").insert({
//         useruid: userId,
//         name: formData.name,
//         email: formData.email,
//         title: formData.title,
//         location: formData.location,
//         bio: formData.bio || null,
//         experience: formData.experience || null,
//         languages: formData.languages.length > 0 ? formData.languages : null,
//         certifications: formData.certifications.length > 0 ? formData.certifications : null,
//         availability: formData.availability.length > 0 ? formData.availability : null,
//         image: formData.image || null,
//         session_types: formData.sessionTypes.length > 0 ? formData.sessionTypes : null,
//         verified: false,
//         featured: false,
//         lat: null,
//         lng: null,
//         rating: null,
//         reviews: null,
//         student_count: null,
//         price: "CHF 10/month",
//         next_available: null,
//         teaching_style: null,
//         created_at: new Date().toISOString(),
//       });

//       if (dbError) throw dbError;

//       router.push("/myaccount");
//     } catch (err: ) {
//       setPaymentError(err.message || "Erro ao processar o pagamento");
//       setError(err.message || "Erro ao processar o pagamento");
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
//       className="bg-white rounded-lg p-8 shadow-sm"
//     >
//       <h2 className="text-3xl font-bold text-[#4A6670] mb-6">Step 4: Payment</h2>
//       <p className="text-[#7C9A92] mb-6">Subscription: CHF 10/month to list your practice.</p>
//       <form onSubmit={handlePaymentSubmit}>
//         <div className="mb-6">
//           <label className="block text-[#4A6670] font-semibold mb-2">Card Information</label>
//           <CardElement
//             className="p-4 bg-[#F8F5F1] rounded-lg border border-[#E8DED1]"
//             options={{ style: { base: { fontSize: "16px", color: "#4A6670" } } }}
//           />
//         </div>
//         {paymentError && <p className="text-red-500 mb-4">{paymentError}</p>}
//         <div className="flex justify-between">
//           <button
//             type="button"
//             onClick={prevStep}
//             className="inline-flex items-center px-6 py-3 bg-[#7C9A92] text-white rounded-lg hover:bg-[#6A8B83] transition-colors"
//           >
//             <ChevronLeft className="h-5 w-5 mr-2" /> Previous
//           </button>
//           <button
//             type="submit"
//             disabled={!stripe || paymentLoading}
//             className="inline-flex items-center px-6 py-3 bg-[#E6B17E] text-white rounded-lg hover:bg-[#D9A066] transition-colors disabled:opacity-50"
//           >
//             {paymentLoading ? "Processing..." : "Complete Registration"} <CreditCard className="h-5 w-5 ml-2" />
//           </button>
//         </div>
//       </form>
//     </motion.div>
//   );
// }