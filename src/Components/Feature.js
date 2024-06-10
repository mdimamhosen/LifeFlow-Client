import React from "react";

const Feature = () => {
  return (
    <div className="px-4 lg:px-20 bg-gray-200 py-12">
      <h1 className="text-2xl lg:text-3xl font-bold mb-10 text-center">
        LEARN ABOUT DONATION
      </h1>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border-black flex flex-col h-[30rem] pb-8">
          <section className="flex flex-col justify-between h-full">
            <div className="mb-4">
              <h2 className="text-xl lg:text-2xl font-semibold mb-4">
                One Donation Can Save Three Lives
              </h2>
              <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                After donating blood, the body works to replenish the blood
                loss. This stimulates the production of new blood cells and in
                turn, helps in maintaining good health.
              </p>
            </div>
            <img
              src="https://s3sdghub.s3.eu-west-1.amazonaws.com/core-cms/public/styles/media_image_large/public/images/projects/alg-blood-donation-jpg.jpg?itok=7oQvNkAd"
              alt="Blood Donation"
              className="w-full h-[15rem] lg:h-[20rem] object-cover"
            />
          </section>
        </div>
        <div className="border-black flex flex-col h-[30rem]">
          <section className="flex flex-col justify-between h-full">
            <div className="mb-4">
              <h2 className="text-xl lg:text-2xl font-semibold mb-4">
                Compatible Blood Type Donors
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full h-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-red-500 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">Blood Type</th>
                      <th className="py-3 px-4 text-left">Donate Blood To</th>
                      <th className="py-3 px-4 text-left">
                        Receive Blood From
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 text-sm lg:text-base">A+</td>
                      <td className="py-3 px-4 text-sm lg:text-base">A+ AB+</td>
                      <td className="py-3 px-4 text-sm lg:text-base">
                        A+ A- O+ O-
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="py-3 px-4 text-sm lg:text-base">O+</td>
                      <td className="py-3 px-4 text-sm lg:text-base">
                        O+ A+ B+ AB+
                      </td>
                      <td className="py-3 px-4 text-sm lg:text-base">O+ O-</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 text-sm lg:text-base">B+</td>
                      <td className="py-3 px-4 text-sm lg:text-base">B+ AB+</td>
                      <td className="py-3 px-4 text-sm lg:text-base">
                        B+ B- O+ O-
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="py-3 px-4 text-sm lg:text-base">AB+</td>
                      <td className="py-3 px-4 text-sm lg:text-base">AB+</td>
                      <td className="py-3 px-4 text-sm lg:text-base">
                        Everyone
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 text-sm lg:text-base">A-</td>
                      <td className="py-3 px-4 text-sm lg:text-base">
                        A+ A- AB+ AB-
                      </td>
                      <td className="py-3 px-4 text-sm lg:text-base">A- O-</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="py-3 px-4 text-sm lg:text-base">O-</td>
                      <td className="py-3 px-4 text-sm lg:text-base">
                        Everyone
                      </td>
                      <td className="py-3 px-4 text-sm lg:text-base">O-</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 text-sm lg:text-base">B-</td>
                      <td className="py-3 px-4 text-sm lg:text-base">
                        B+ B- AB+ AB-
                      </td>
                      <td className="py-3 px-4 text-sm lg:text-base">B- O-</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="py-3 px-4 text-sm lg:text-base">AB-</td>
                      <td className="py-3 px-4 text-sm lg:text-base">
                        AB+ AB-
                      </td>
                      <td className="py-3 px-4 text-sm lg:text-base">
                        AB- A- B- O-
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Feature;
