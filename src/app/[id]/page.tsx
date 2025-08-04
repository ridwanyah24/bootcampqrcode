"use client";
import { use, useEffect, useState } from "react";
import { FC } from "react";

interface Child {
  _id: string;
  name: string;
  class: string;
  age: number;
  schoolAttended: string;
  bootcampCourse: string;
  image: string;
  gender: string;
  allergies: string;
  __v: number;
}

interface Parent {
  _id: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  image: string;
  imageOfDad: string;
  thirdpartyName: string;
  thirdpartyPhoneNumber: string;
  thirdpartyRel: string;
  thirdpartyImage: string;
  children: Child[];
  __v: number;
}

interface ParentResponse {
  parent: Parent;
}

const ParentPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [data, setParents] = useState<ParentResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://summer-bootcamp-apis.onrender.com/api/parents/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setParents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#05145A]"></div>
          <p className="mt-4 text-gray-600">Loading parent data...</p>
        </div>
      </div>
    );

  if (!data?.parent)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-8 max-w-md bg-white rounded-lg shadow-lg">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">
            Failed to load data
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Please try refreshing the page or contact support.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#05145A] text-white rounded-md hover:bg-[#05145A]/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );

  const parent = data.parent;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#05145A] p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Ihifix Bootcamp Parent Details</h1>
          <p className="text-blue-100 mt-1">It's Possible...</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Parent Info */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[#05145A] border-b pb-2">Parent Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                <div className="flex-shrink-0 flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img
                      className="h-32 w-32 rounded-full border-4 border-white shadow-md"
                      src={parent.image}
                      alt={parent.name}
                    />
                    <span
                      className="absolute inset-0 shadow-inner rounded-full"
                      aria-hidden="true"
                    ></span>
                  </div>
                  <div className="relative">
                    <img
                      className="h-24 w-24 rounded-full border-4 border-white shadow-md"
                      src={parent.imageOfDad}
                      alt={`${parent.name}'s partner`}
                    />
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex-1 grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Full Name</p>
                    <p className="text-lg font-semibold text-gray-900">{parent.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-lg text-gray-900">{parent.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-lg text-gray-900">{parent.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Address</p>
                    <p className="text-lg text-gray-900">{parent.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Third Party Information */}
          {parent.thirdpartyName && (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-[#05145A] border-b pb-2">Guardian/Third Party Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                  {parent.thirdpartyImage && (
                    <div className="flex-shrink-0 mb-4 md:mb-0">
                      <img
                        className="h-24 w-24 rounded-full border-4 border-white shadow-md"
                        src={parent.thirdpartyImage}
                        alt={parent.thirdpartyName}
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-4 flex-1">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Name</p>
                      <p className="text-lg text-gray-900">{parent.thirdpartyName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <p className="text-lg text-gray-900">{parent.thirdpartyPhoneNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Relationship</p>
                      <p className="text-lg text-gray-900">{parent.thirdpartyRel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Children Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#05145A] border-b pb-2">
                Registered Children
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#05145A] text-white">
                  {parent.children.length}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {parent.children.map((child) => (
                <div key={child._id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="relative pb-48 overflow-hidden">
                    <img
                      className="absolute inset-0 h-full w-full object-cover"
                      src={child.image}
                      alt={child.name}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#05145A]/90 to-transparent">
                      <h3 className="text-lg font-bold text-white">{child.name}</h3>
                      <p className="text-sm text-blue-200">{child.bootcampCourse}</p>
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-700 truncate">Age</dt>
                        <dd className="mt-1 text-sm text-gray-900">{child.age}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-700 truncate">Gender</dt>
                        <dd className="mt-1 text-sm text-gray-900">{child.gender}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-700 truncate">Class</dt>
                        <dd className="mt-1 text-sm text-gray-900">{child.class}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-700 truncate">Allergies</dt>
                        <dd className="mt-1 text-sm text-gray-900">{child.allergies || "None"}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-700 truncate">School</dt>
                        <dd className="mt-1 text-sm text-gray-900">{child.schoolAttended}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ParentPage;