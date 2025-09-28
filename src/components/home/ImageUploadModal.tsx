"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageUploadModal({ isOpen, onClose }: ImageUploadModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upload Image</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>
        <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg">
          {selectedImage ? (
            <div className="mb-4">
              <Image src={selectedImage} alt="Selected" width={150} height={150} className="mx-auto" />
            </div>
          ) : (
            <p className="text-gray-500 mb-4">Drag & drop images here or click to select</p>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
          <button
            onClick={handleBrowseClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Browse Files
          </button>
        </div>
        {selectedImage && (
          <div className="mt-4 text-right">
            <button
              onClick={() => {
                // Handle image submission logic here
                onClose();
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
