import React from "react";
import Link from "next/link";

interface BreadcrumbsWithBackProps {
    primaryCategory: string;
    primaryCategorySlug: string;
    product: {
        name: string;
    };
    }

const BreadcrumbsWithBack:React.FC <BreadcrumbsWithBackProps> = ({primaryCategory,primaryCategorySlug,product}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">
          Home &gt;{" "}
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>{" "}
          &gt;{" "}
          <Link
            href={`/products/category/${primaryCategorySlug}`}
            className="text-gray-700 font-medium hover:underline"
          >
            {primaryCategory}
          </Link>
          &nbsp;&gt;{" "}
          <span className="font-medium text-gray-700">{product.name}</span>
        </div>
        <div>
          <Link
            href={`/products/category/${primaryCategorySlug}`}
            className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:shadow"
          >
            ← Back to {primaryCategory}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbsWithBack;
