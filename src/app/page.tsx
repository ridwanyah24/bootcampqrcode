// Imports unchanged
"use client";

import ChildForm from "@/components/ChildrenForm";
import { Child } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentAddress, setParentAddress] = useState("");
  const [parentImage, setParentImage] = useState<File | null>(null);
  const [imageOfDad, setImageOfDad] = useState<File | null>(null);

  const [thirdPartyName, setThirdPartyName] = useState("");
  const [thirdPartyPhone, setThirdPartyPhone] = useState("");
  const [thirdPartyRelationship, setThirdPartyRelationship] = useState("");
  const [thirdPartyImage, setThirdPartyImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [children, setChildren] = useState<Child[]>([
    {
      name: "",
      class: "",
      image: null,
      schoolAttended: "",
      bootcampCourse: "",
      age: "",
      gender: "",
      allergies: "",
    },
  ]);

  const handleChildChange = (index: number, updated: Child) => {
    const newChildren = [...children];
    newChildren[index] = updated;
    setChildren(newChildren);
  };

  const handleChildRemove = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  const addChild = () => {
    setChildren([
      ...children,
      {
        name: "",
        class: "",
        image: null,
        schoolAttended: "",
        bootcampCourse: "",
        age: "",
        gender: "",
        allergies: "",
      },
    ]);
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("name", parentName);
    formData.append("phoneNumber", parentPhone);
    formData.append("email", parentEmail);
    formData.append("address", parentAddress);
    if (parentImage) formData.append("image", parentImage);
    if (imageOfDad) formData.append("imageOfDad", imageOfDad);

    formData.append("thirdpartyName", thirdPartyName);
    formData.append("thirdpartyPhoneNumber", thirdPartyPhone);
    formData.append("thirdpartyRel", thirdPartyRelationship);
    if (thirdPartyImage) formData.append("thirdpartyImage", thirdPartyImage);

    const childrenData = children.map((child) => ({
      name: child.name,
      class: child.class,
      schoolAttended: child.schoolAttended,
      bootcampCourse: child.bootcampCourse,
      age: child.age,
      gender: child.gender,
      allergies: child.allergies,
    }));
    formData.append("children", JSON.stringify(childrenData));

    children.forEach((child) => {
      if (child.image) {
        formData.append("childImages", child.image);
      }
    });

    try {
      const res = await fetch("https://summer-bootcamp-apis.onrender.com/api/parents", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    

    <main className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#05145A] p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Ihifix Bootcamp Registration</h1>
          <p className="text-blue-100 mt-1">It's Possible...</p>
          <p className="text-blue-100 mt-1">Complete the form below to register your children</p>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-6 space-y-8">
          {/* Parent Info */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[#05145A] border-b pb-2">Parent Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05145A] focus:border-[#05145A]" 
                  value={parentName} 
                  onChange={(e) => setParentName(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05145A] focus:border-[#05145A]" 
                  value={parentEmail} 
                  onChange={(e) => setParentEmail(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                <input 
                  type="tel" 
                  placeholder="+1234567890" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05145A] focus:border-[#05145A]" 
                  value={parentPhone} 
                  onChange={(e) => setParentPhone(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                <input 
                  type="text" 
                  placeholder="123 Main St" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05145A] focus:border-[#05145A]" 
                  value={parentAddress} 
                  onChange={(e) => setParentAddress(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image of Father</label>
                <input 
                  type="file" 
                  className="w-full p-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#05145A] file:text-white hover:file:bg-[#05145A]/90" 
                  onChange={(e) => setParentImage(e.target.files?.[0] || null)} 
                  accept="image/*" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image of Mother</label>
                <input 
                  type="file" 
                  className="w-full p-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#05145A] file:text-white hover:file:bg-[#05145A]/90" 
                  onChange={(e) => setImageOfDad(e.target.files?.[0] || null)} 
                  accept="image/*" 
                />
              </div>
            </div>
          </section>

          {/* Third Party Info */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[#05145A] border-b pb-2">Guardian/Third Party Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Guardian Name" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05145A] focus:border-[#05145A]" 
                  value={thirdPartyName} 
                  onChange={(e) => setThirdPartyName(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+1234567890" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05145A] focus:border-[#05145A]" 
                  value={thirdPartyPhone} 
                  onChange={(e) => setThirdPartyPhone(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <input 
                  type="text" 
                  placeholder="Relationship to child" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05145A] focus:border-[#05145A]" 
                  value={thirdPartyRelationship} 
                  onChange={(e) => setThirdPartyRelationship(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image of Guardian</label>
                <input 
                  type="file" 
                  className="w-full p-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#05145A] file:text-white hover:file:bg-[#05145A]/90" 
                  onChange={(e) => setThirdPartyImage(e.target.files?.[0] || null)} 
                  accept="image/*" 
                />
              </div>
            </div>
          </section>

          {/* Children */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-[#05145A] border-b pb-2">Children Information</h3>
              <button 
                type="button" 
                onClick={addChild} 
                className="flex items-center gap-1 text-sm font-medium text-[#05145A] hover:text-[#05145A]/80"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Child
              </button>
            </div>
            
            {children.map((child, index) => (
              <ChildForm key={index} index={index} child={child} onChange={handleChildChange} onRemove={handleChildRemove} />
            ))}
          </section>

          {/* Loading Modal */}
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#05145A] mx-auto mb-4"></div>
                <p className="text-lg font-medium text-[#05145A]">Submitting your form...</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Form submitted successfully!
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? "bg-[#05145A]/70 cursor-not-allowed" : "bg-[#05145A] hover:bg-[#05145A]/90"} text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all`}
            >
              {loading ? "Processing..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
