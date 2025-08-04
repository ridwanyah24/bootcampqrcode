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
    gender: string;
    allergies: string;
}

export interface Parent {
    _id: string;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    image: string;
    imageOfDad: string;
    thirdpartyName: string;
    thirdpartyPhoneNumber: string;
    thirdpartyImage: string;
    thirdpartyRel: string;
    children: Child[];
}

export default function Page() {
    const [parents, setParents] = useState<Parent[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch('https://summer-bootcamp-apis.onrender.com/api/parents')
            .then((res) => res.json())
            .then((data) => setParents(data.parents))
            .catch((err) => console.error(err));
    }, []);

    const exportToCSV = () => {
        const rows = [];

        // Header
        rows.push([
            "Parent Name",
            "Parent Phone",
            "Parent Email",
            "Parent Address",
            "Third-party Name",
            "Third-party Phone",
            "Third-party Relationship",
            "Child Name",
            "Child Age",
            "Child Gender",
            "Child Class",
            "School Attended",
            "Bootcamp Course",
            "Allergies",
        ]);

        // Data
        parents.forEach((parent) => {
            parent.children.forEach((child) => {
                rows.push([
                    parent.name,
                    parent.phoneNumber,
                    parent.email,
                    parent.address,
                    parent.thirdpartyName,
                    parent.thirdpartyPhoneNumber,
                    parent.thirdpartyRel,
                    child.name,
                    child.age,
                    child.gender,
                    child.class,
                    child.schoolAttended,
                    child.bootcampCourse,
                    child.allergies,
                ]);
            });
        });

        const csvContent =
            "data:text/csv;charset=utf-8," +
            rows.map((e) => e.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "parents_and_children.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="p-6 overflow-x-auto bg-white shadow-md rounded-lg">
            <div className="flex justify-end mb-4">
                <button
                    onClick={exportToCSV}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Export as CSV
                </button>
            </div>
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">Parents & Children Info</h1>

            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                    <tr>
                        <th className="border px-4 py-3">Parent Name</th>
                        <th className="border px-4 py-3">Parent Image</th>
                        <th className="border px-4 py-3">Phone</th>
                        <th className="border px-4 py-3">Email</th>
                        <th className="border px-4 py-3">Address</th>
                        <th className="border px-4 py-3">Image of Dad</th>
                        <th className="border px-4 py-3">Third-party Name</th>
                        <th className="border px-4 py-3">Third-party Phone</th>
                        <th className="border px-4 py-3">Relationship</th>
                        <th className="border px-4 py-3">Third-party Image</th>
                        <th className="border px-4 py-3">Children</th>
                        <th className="border px-4 py-3">Details URL</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {parents.map((parent) => (
                        <tr key={parent._id} className="hover:bg-gray-50 transition-colors">
                            <td className="border px-4 py-3">{parent.name}</td>
                            <td className="border px-4 py-3">
                                <img src={parent.image} alt="Parent" className="w-12 h-12 rounded-full object-cover mx-auto" />
                            </td>
                            <td className="border px-4 py-3">{parent.phoneNumber}</td>
                            <td className="border px-4 py-3">{parent.email}</td>
                            <td className="border px-4 py-3">{parent.address}</td>
                            <td className="border px-4 py-3">
                                <img src={parent.imageOfDad} alt="Dad" className="w-12 h-12 rounded-full object-cover mx-auto" />
                            </td>
                            <td className="border px-4 py-3">{parent.thirdpartyName}</td>
                            <td className="border px-4 py-3">{parent.thirdpartyPhoneNumber}</td>
                            <td className="border px-4 py-3">{parent.thirdpartyRel}</td>
                            <td className="border px-4 py-3">
                                <img src={parent.thirdpartyImage} alt="Third-party" className="w-12 h-12 rounded-full object-cover mx-auto" />
                            </td>
                            <td className="border px-4 py-3">
                                <ul className="space-y-3">
                                    {parent.children.map((child) => (
                                        <li key={child._id} className="bg-gray-50 border rounded-md p-3">
                                            <div className="flex items-start gap-3">
                                                <img src={child.image} alt={child.name} className="w-12 h-12 object-cover rounded-md" />
                                                <div className="text-sm space-y-1">
                                                    <p><span className="font-medium">Name:</span> {child.name}</p>
                                                    <p><span className="font-medium">Gender:</span> {child.gender}</p>
                                                    <p><span className="font-medium">Age:</span> {child.age}</p>
                                                    <p><span className="font-medium">Class:</span> {child.class}</p>
                                                    <p><span className="font-medium">School:</span> {child.schoolAttended}</p>
                                                    <p><span className="font-medium">Course:</span> {child.bootcampCourse}</p>
                                                    <p><span className="font-medium">Allergies:</span> {child.allergies || 'None'}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="border px-4 py-3 text-center">
                                <button
                                    className="text-blue-600 underline hover:text-blue-800 transition"
                                    onClick={() => router.push(`/${parent._id}`)}
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}