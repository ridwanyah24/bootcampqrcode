"use client";

import ChildForm from "@/components/ChildrenForm";
import { Child } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentImage, setParentImage] = useState<File | null>(null);

  const [thirdPartyName, setThirdPartyName] = useState("");
  const [thirdPartyPhone, setThirdPartyPhone] = useState("");
  const [thirdPartyImage, setThirdPartyImage] = useState<File | null>(null);

  const [children, setChildren] = useState<Child[]>([
    {
      name: "",
      class: "",
      image: null,
      schoolAttended: "",
      bootcampCourse: "",
      age: "",
    },
  ]);

  // const [qrUrl, setQrUrl] = useState("");
  // const [viewLink, setViewLink] = useState("");

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
      },
    ]);
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", parentName);
    formData.append("phoneNumber", parentPhone);
    if (parentImage) formData.append("image", parentImage);

    formData.append("thirdpartyName", thirdPartyName);
    formData.append("thirdpartyPhoneNumber", thirdPartyPhone);
    if (thirdPartyImage) formData.append("thirdpartyImage", thirdPartyImage);

    // Send children data as a single JSON string
    const childrenData = children.map((child) => ({
      name: child.name,
      class: child.class,
      schoolAttended: child.schoolAttended,
      bootcampCourse: child.bootcampCourse,
      age: child.age,
    }));
    formData.append("children", JSON.stringify(childrenData));

    // Send all child images under the same key as an array
    children.forEach((child) => {
      if (child.image) {
        formData.append("childImages", child.image);
      }
    });

    const res = await fetch("https://summer-bootcamp-apis.onrender.com/api/parents", {
      method: "POST",
      body: formData,
    });

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // const result = await res.json();
    // setQrUrl(result.qr);
    // setViewLink(result.viewUrl);
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bootcamp Registration</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2 className="text-lg font-semibold">Parent Info</h2>
        <input
          type="text"
          placeholder="Parent Full Name"
          className="block w-full my-2 p-2 border"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Parent Phone"
          className="block w-full my-2 p-2 border"
          value={parentPhone}
          onChange={(e) => setParentPhone(e.target.value)}
          required
        />
        <input
          type="file"
          className="block w-full my-2 p-2 border"
          onChange={(e) => setParentImage(e.target.files?.[0] || null)}
          accept="image/*"
        />

        <h2 className="text-lg font-semibold mt-4">Third Party Info</h2>
        <input
          type="text"
          placeholder="Third Party Full Name"
          className="block w-full my-2 p-2 border"
          value={thirdPartyName}
          onChange={(e) => setThirdPartyName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Third Party Phone"
          className="block w-full my-2 p-2 border"
          value={thirdPartyPhone}
          onChange={(e) => setThirdPartyPhone(e.target.value)}
        />
        <input
          type="file"
          className="block w-full my-2 p-2 border"
          onChange={(e) => setThirdPartyImage(e.target.files?.[0] || null)}
          accept="image/*"
        />

        <h3 className="text-lg font-semibold mt-6">Children</h3>
        {children.map((child, index) => (
          <ChildForm
            key={index}
            index={index}
            child={child}
            onChange={handleChildChange}
            onRemove={handleChildRemove}
          />
        ))}

        <button type="button" onClick={addChild} className="mt-2 mb-6 text-blue-600">
          + Add Another Child
        </button>

        <button type="submit" className="block w-full bg-blue-600 text-white p-2 rounded">
          Submit
        </button>
      </form>

      {/* 
      {qrUrl && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold">Your QR Code</h3>
          <img src={qrUrl} alt="QR Code" className="mx-auto mt-2" />
          <a href={viewLink} target="_blank" className="text-blue-600 underline">
            View Submission
          </a>
        </div>
      )} */}
      {/* <p className="underline tetx-blue" onClick={()=>router.push(`/${}`)}>go to link</p> */}

    </main>
  );
}
