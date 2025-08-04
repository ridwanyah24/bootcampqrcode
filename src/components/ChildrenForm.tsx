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
    <div className="border p-4 rounded mb-4">
      <h4 className="font-semibold">Child {index + 1}</h4>

      <input
        type="text"
        placeholder="Full Name"
        className="block w-full my-2 p-2 border"
        value={child.name}
        onChange={(e) => onChange(index, { ...child, name: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Age"
        className="block w-full my-2 p-2 border"
        value={child.age}
        onChange={(e) => onChange(index, { ...child, age: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Class"
        className="block w-full my-2 p-2 border"
        value={child.class}
        onChange={(e) => onChange(index, { ...child, class: e.target.value })}
        required
      />

      <input
        type="file"
        className="block w-full my-2 p-2 border"
        onChange={(e) =>
          onChange(index, { ...child, image: e.target.files?.[0] || null })
        }
        accept="image/*"
      />

      <input
        type="text"
        placeholder="School Attended"
        className="block w-full my-2 p-2 border"
        value={child.schoolAttended}
        onChange={(e) =>
          onChange(index, { ...child, schoolAttended: e.target.value })
        }
        required
      />

      <input
        type="text"
        placeholder="Bootcamp Course"
        className="block w-full my-2 p-2 border"
        value={child.bootcampCourse}
        onChange={(e) =>
          onChange(index, { ...child, bootcampCourse: e.target.value })
        }
        required
      />

      <button
        type="button"
        onClick={() => onRemove(index)}
        className="text-red-600 text-sm"
      >
        Remove
      </button>
    </div>
  );
}
