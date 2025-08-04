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
    <div className="border border-gray-200 rounded-xl p-6 mb-6 shadow-sm bg-white transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold text-indigo-700">Child #{index + 1}</h4>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Remove
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={child.name}
              onChange={(e) => onChange(index, { ...child, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              placeholder="8"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={child.age}
              onChange={(e) => onChange(index, { ...child, age: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={child.gender}
              onChange={(e) => onChange(index, { ...child, gender: e.target.value })}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <input
              type="text"
              placeholder="Grade 3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={child.class}
              onChange={(e) => onChange(index, { ...child, class: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Child's Photo</label>
            <div className="flex items-center gap-3">
              <label className="flex-1 cursor-pointer">
                <div className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                  <span className="text-gray-500 truncate">
                    {child.image?.name || "Choose file..."}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => onChange(index, { ...child, image: e.target.files?.[0] || null })}
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School Attended</label>
            <input
              type="text"
              placeholder="Sunshine Elementary"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={child.schoolAttended}
              onChange={(e) => onChange(index, { ...child, schoolAttended: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bootcamp Course</label>
            <input
              type="text"
              placeholder="Intro to Programming"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={child.bootcampCourse}
              onChange={(e) => onChange(index, { ...child, bootcampCourse: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Allergies (if any)</label>
            <input
              type="text"
              placeholder="Peanuts, dairy, etc."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={child.allergies}
              onChange={(e) => onChange(index, { ...child, allergies: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}