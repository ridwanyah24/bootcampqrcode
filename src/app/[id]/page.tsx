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
        <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
            {/* Parent Info */}
            <div className="flex items-center gap-4 border-b pb-4 mb-6">
                <img
                    src={data.parent.image}
                    alt="Parent"
                    className="w-28 h-28 object-cover rounded-full border-2 border-blue-500"
                />
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Parent: {data.parent.name}</h1>
                    <p className="text-gray-600">Phone: {data.parent.phoneNumber}</p>
                </div>
            </div>

            {/* Children Info */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Children</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.parent.children.map((child) => (
                        <li key={child._id} className="bg-gray-50 p-4 rounded-lg shadow-sm border">
                            <img
                                src={child.image}
                                alt={child.name}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <div className="space-y-1 text-sm text-gray-700">
                                <p><span className="font-medium">Name:</span> {child.name}</p>
                                <p><span className="font-medium">Class:</span> {child.class}</p>
                                <p><span className="font-medium">Age:</span> {child.age}</p>
                                <p><span className="font-medium">School:</span> {child.schoolAttended}</p>
                                <p><span className="font-medium">Course:</span> {child.bootcampCourse}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ParentPage;
