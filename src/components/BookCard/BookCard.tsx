import React from "react";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

export const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  image,
  price,
}) => {
  return (
    <div className="
      border rounded-lg
      p-3 sm:p-4
      bg-white
      hover:shadow-lg
      transition
    ">
      <Link to={`/product/${id}`} className="block">

        {/* Image */}
        <div className="w-full h-36 sm:h-44 md:h-48 overflow-hidden rounded">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain hover:scale-105 transition"
          />
        </div>

        {/* Text */}
        <h2 className="
          mt-2
          font-semibold
          text-sm sm:text-base
          line-clamp-2
        ">
          {title}
        </h2>

        <p className="mt-1 text-green-600 font-bold text-sm sm:text-base">
          ${price}
        </p>

      </Link>
    </div>
  );
};
