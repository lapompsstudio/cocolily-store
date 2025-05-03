import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "./types";

interface ProductsGridProps {
  viewMode: "small" | "large";
  products: Product[];
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ viewMode, products }) => {
  return (
    <>
      {viewMode === "small" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-20d gap-y-60d pb-160d grid-anim small-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-20d gap-y-60d pb-160d grid-anim large-grid">
          {products.map((product) => (
            <ProductCard small={false} key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsGrid;
