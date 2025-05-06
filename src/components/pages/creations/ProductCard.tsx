import GradientImage from "@/components/ui/GradientImage";
import clsx from "clsx";
import { HeartIcon } from "lucide-react";
import React from "react";
import { Product } from "./types";

interface ProductCardProps {
  product: Product;
  imageWrapperClass?: string;
  small?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  small = true,
  imageWrapperClass,
}) => {
  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
  };

  const handleAddToWishlist = () => {
    console.log("Adding to wishlist:", product);
  };

  // Check if product has a discount
  const hasDiscount = product.price < product.originalPrice;

  return (
    <div className="relative flex flex-col creations-anim-product">
      {/* Product Image */}
      <div className="relative rounded-lg overflow-hidden mb-3 shrink-0">
        <div
          className={clsx(
            "w-full rounded-32d overflow-hidden",
            small ? "h-246d" : "h-512d",
            imageWrapperClass
          )}
        >
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

      <div className="flex flex-col w-full justify-between h-full">
        {/* Product Title with Heart */}
        <div className="flex justify-between items-start">
          <p
            className={clsx(
              "font-abc leading-tight font-bold text-ruby-red uppercase max-w-[80%]",
              small ? "text-12d" : "text-24d"
            )}
          >
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
            <span
              className={clsx("text-ruby-red", small ? "text-12d" : "text-16d")}
            >
              AED {product.price.toFixed(2)}
            </span>

            {/* Only show discount information if there is a discount */}
            {hasDiscount && (
              <div className="flex items-center gap-8d">
                <span className="line-through text-gray-400">
                  AED {product.originalPrice.toFixed(2)}
                </span>
                {product.discount && (
                  <span className="text-ruby-red">-{product.discount}</span>
                )}
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            className={clsx("text-ruby-red", small ? "text-10d" : "text-12d")}
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
