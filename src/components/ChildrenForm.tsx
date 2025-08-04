"use client";

import { Child } from "@/types/types";
import React from "react";

interface Props {
    index: number;
    child: Child;
    onChange: (index: number, updated: Child) => void;
    onRemove: (index: number) => void;
}

export default function ChildForm({ index, child, onChange, onRemove }: Props) {
    return (
        <div className="border rounded-lg p-4 mb-6 shadow-sm bg-gray-50">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-md font-semibold text-gray-800">Child {index + 1}</h4>
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="text-red-500 text-sm hover:underline"
                >
                    Remove
                </button>
            </div>

            <div className="space-y-3">
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-2 border rounded"
                    value={child.name}
                    onChange={(e) => onChange(index, { ...child, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    className="w-full p-2 border rounded"
                    value={child.age}
                    onChange={(e) => onChange(index, { ...child, age: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Class"
                    className="w-full p-2 border rounded"
                    value={child.class}
                    onChange={(e) => onChange(index, { ...child, class: e.target.value })}
                    required
                />
                <input
                    type="file"
                    className="w-full p-2 border rounded bg-white"
                    onChange={(e) => onChange(index, { ...child, image: e.target.files?.[0] || null })}
                    accept="image/*"
                />
                <input
                    type="text"
                    placeholder="School Attended"
                    className="w-full p-2 border rounded"
                    value={child.schoolAttended}
                    onChange={(e) => onChange(index, { ...child, schoolAttended: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Bootcamp Course"
                    className="w-full p-2 border rounded"
                    value={child.bootcampCourse}
                    onChange={(e) => onChange(index, { ...child, bootcampCourse: e.target.value })}
                    required
                />
            </div>
        </div>

    );
}
