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
}

interface Parent {
  name: string;
  phoneNumber: string;
  image: string;
  children: Child[];
}

interface ParentResponse {
  parent: Parent;
}


const ParentPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
  const [data, setParents] = useState<ParentResponse | null>(null);

  useEffect(() => {
    fetch(`https://summer-bootcamp-apis.onrender.com/api/parents/${id}`)
      .then((res) => res.json())
      .then((data) => setParents(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Parent: {data.parent.name}</h1>
      <p>Phone: {data.parent.phoneNumber}</p>
      <img src={data.parent.image} alt="Parent" className="w-32 h-32 object-cover mt-2" />

      <h2 className="mt-4 text-lg font-semibold">Children:</h2>
      <ul className="space-y-4 mt-2">
        {data.parent.children.map((child) => (
          <li key={child._id} className="border p-2 rounded-md">
            <img src={child.image} alt={child.name} className="w-24 h-24 object-cover mb-2" />
            <div>
              <p><strong>Name:</strong> {child.name}</p>
              <p><strong>Class:</strong> {child.class}</p>
              <p><strong>Age:</strong> {child.age}</p>
              <p><strong>School:</strong> {child.schoolAttended}</p>
              <p><strong>Course:</strong> {child.bootcampCourse}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParentPage;
