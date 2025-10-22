"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageUploadModal({ isOpen, onClose }: ImageUploadModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
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

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.dataTransfer.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform duration-300 ease-in-out ${isOpen ? 'scale-100' : 'scale-95'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Upload Image</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">
            &times;
          </button>
        </div>
        <div
          className={`border-2 border-dashed border-gray-300 p-6 text-center rounded-lg ${
            isDragging ? "bg-blue-100" : ""
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {selectedImage ? (
            <div className="mb-4">
              <Image src={selectedImage} alt="Selected" width={150} height={150} className="mx-auto" />
            </div>
          ) : (
            <p className="text-gray-500 mb-4">Drag & drop images here or click to browse</p>
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
          <div className="mt-4 flex justify-end gap-4">
            <button
              onClick={handleRemoveImage}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
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
