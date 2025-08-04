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
    <main className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Bootcamp Registration</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        {/* Parent Info */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Parent Info</h2>
          <div className="space-y-3">
            <input type="text" placeholder="Parent Full Name" className="w-full p-2 border rounded" value={parentName} onChange={(e) => setParentName(e.target.value)} required />
            <input type="email" placeholder="Parent Email" className="w-full p-2 border rounded" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} required />
            <input type="tel" placeholder="Parent Phone" className="w-full p-2 border rounded" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} required />
            <input type="text" placeholder="Parent Address" className="w-full p-2 border rounded" value={parentAddress} onChange={(e) => setParentAddress(e.target.value)} required />
            <label htmlFor="">Image of Father</label>
            <input type="file" className="w-full p-2 border rounded bg-white" onChange={(e) => setParentImage(e.target.files?.[0] || null)} accept="image/*" />
            <label htmlFor="">Image of Mother</label>
            <input type="file" className="w-full p-2 border rounded bg-white" onChange={(e) => setImageOfDad(e.target.files?.[0] || null)} accept="image/*" />
          </div>
        </section>

        {/* Third Party Info */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Third Party Info</h2>
          <div className="space-y-3">
            <input type="text" placeholder="Third Party Full Name" className="w-full p-2 border rounded" value={thirdPartyName} onChange={(e) => setThirdPartyName(e.target.value)} />
            <input type="tel" placeholder="Third Party Phone" className="w-full p-2 border rounded" value={thirdPartyPhone} onChange={(e) => setThirdPartyPhone(e.target.value)} />
            <input type="text" placeholder="Relationship to Parent" className="w-full p-2 border rounded" value={thirdPartyRelationship} onChange={(e) => setThirdPartyRelationship(e.target.value)} />
            <label htmlFor="">Image of Guardian</label>
            <input type="file" className="w-full p-2 border rounded bg-white" onChange={(e) => setThirdPartyImage(e.target.files?.[0] || null)} accept="image/*" />
          </div>
        </section>

        {/* Children */}
        <section>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Children</h3>
          {children.map((child, index) => (
            <ChildForm key={index} index={index} child={child} onChange={handleChildChange} onRemove={handleChildRemove} />
          ))}
          <button type="button" onClick={addChild} className="text-blue-600 hover:underline text-sm">
            + Add Another Child
          </button>
        </section>

        {/* Loading Modal */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <p className="text-lg font-medium">Submitting...</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 rounded text-green-700 bg-green-100 border border-green-300">
            Form submitted successfully!
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white font-medium py-2 px-4 rounded transition`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  );
}
