'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Child {
  _id: string;
  name: string;
  class: string;
  image: string;
  schoolAttended: string;
  bootcampCourse: string;
  age: number;
}

interface Parent {
  _id: string;
  name: string;
  phoneNumber: string;
  image: string;
  thirdpartyName: string;
  thirdpartyPhoneNumber: string;
  thirdpartyImage: string;
  children: Child[];
}

export default function Page() {
  const [parents, setParents] = useState<Parent[]>([]);

  const router = useRouter();

  useEffect(() => {
    // Replace with actual API call if needed
    fetch('https://summer-bootcamp-apis.onrender.com/api/parents') // mock endpoint
      .then((res) => res.json())
      .then((data) => setParents(data.parents))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Parents & Children Info</h1>

      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Parent Name</th>
            <th className="border px-4 py-2">Parent Image</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">Third-party Name</th>
            <th className="border px-4 py-2">Third-party Image</th>
            <th className="border px-4 py-2">Third-party Phone</th>
            <th className="border px-4 py-2">Children</th>
            <th>Detailed Information Url</th>
          </tr>
        </thead>
        <tbody>
          {parents.map((parent) => (
            <tr key={parent._id}>
              <td className="border px-4 py-2">{parent.name}</td>
              <td className="border px-4 py-2">
                <img src={parent.image} alt="Parent" className="w-16 h-16 rounded-full object-cover" />
              </td>
              <td className="border px-4 py-2">{parent.phoneNumber}</td>
              <td className="border px-4 py-2">{parent.thirdpartyName}</td>
              <td className="border px-4 py-2">
                <img src={parent.thirdpartyImage} alt="Third-party" className="w-16 h-16 rounded-full object-cover" />
              </td>
              <td className="border px-4 py-2">{parent.thirdpartyPhoneNumber}</td>
              <td className="border px-4 py-2">
                <ul className="space-y-2">
                  {parent.children.map((child) => (
                    <li key={child._id} className="border p-2 rounded bg-gray-50">
                      <div className="flex items-center gap-2">
                        <img src={child.image} alt={child.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <p><strong>Name:</strong> {child.name}</p>
                          <p><strong>Age:</strong> {child.age}</p>
                          <p><strong>Class:</strong> {child.class}</p>
                          <p><strong>School:</strong> {child.schoolAttended}</p>
                          <p><strong>Course:</strong> {child.bootcampCourse}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border px-4 py-2 " >
                <p className='underline text-blue-500 cursor-pointer ' onClick={()=>router.push(`/${parent?._id}`)}>{`localhost:3000/${parent?._id}`}</p>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
