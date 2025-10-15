import React from "react";

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Basic",
      price: "$9",
      features: ["Access to basic auctions", "1 active bid at a time", "Email support"],
      buttonText: "Choose Basic",
    },
    {
      name: "Pro",
      price: "$29",
      features: ["Unlimited active bids", "Priority support", "Access to premium auctions"],
      buttonText: "Choose Pro",
    },
    {
      name: "Enterprise",
      price: "$99",
      features: ["Dedicated account manager", "Custom auction options", "Advanced reporting"],
      buttonText: "Contact Sales",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Pricing Plans</h1>
        <p className="mt-4 text-lg text-gray-600">
          Choose the plan that suits your auction needs.
        </p>
      </div>

      <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="border rounded-lg shadow-sm p-6 bg-white flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
            <p className="mt-4 text-4xl font-extrabold text-gray-900">{plan.price}<span className="text-base font-medium text-gray-500">/mo</span></p>
            
            <ul className="mt-6 space-y-4 flex-1">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-green-500">✔</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
