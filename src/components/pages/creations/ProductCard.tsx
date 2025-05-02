import React from "react";
import { HeartIcon } from "lucide-react";
import { Product } from "./types";
import GradientImage from "@/components/ui/GradientImage";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
  };

  const handleAddToWishlist = () => {
    console.log("Adding to wishlist:", product);
  };

  return (
    <div className="relative flex flex-col">
      {/* Product Image */}
      <div className="relative rounded-lg overflow-hidden mb-3">
        <div className="w-full h-246d rounded-32d overflow-hidden">
          <GradientImage src={product.image} />
        </div>
        {product.isBestSeller && (
          <div className="absolute top-3 right-3 bg-ruby-red text-white text-10d px-3 py-1 rounded-full">
            BEST SELLER
          </div>
        )}
        {product.isSoldOut && (
          <div className="absolute top-3 left-3 bg-ruby-red text-white text-10d px-3 py-1 rounded-full">
            SOLD OUT
          </div>
        )}
      </div>

      {/* Product Title with Heart */}
      <div className="flex justify-between items-start">
        <p className="text-12d font-abc leading-tight font-bold text-ruby-red uppercase max-w-[80%]">
          {product.name}
        </p>
        <button
          className="text-ruby-red hover:text-red-700 transition"
          onClick={handleAddToWishlist}
        >
          <HeartIcon size={20} />
        </button>
      </div>

      <div className="flex justify-between items-end">
        {/* Price Info */}
        <div className="flex flex-col gap-0 text-12d mt-12d">
          <span className="font-bold text-ruby-red">
            AED {product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-8d">
            <span className="line-through text-gray-400">
              AED {product.originalPrice.toFixed(2)}
            </span>
            <span className="text-ruby-red">-{product.discount}</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="text-ruby-red text-10d" onClick={handleAddToCart}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
