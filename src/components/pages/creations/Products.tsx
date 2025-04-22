import React, { useMemo } from "react";
import CardProduct from "./CardProduct";
import CategoryProduct from "./CategoryProduct";

// Enhanced Product interface with all required properties
interface Product {
  id: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  isSoldOut: boolean;
  isBestSeller: boolean;
  isVegan: boolean;
}

export default function Products() {
  const productData = [
    {
      id: 1,
      title: "Signature Box",
      imageSrc: "/images/our-products/image.png",
    },
    {
      id: 2,
      title: "Premium Collection",
      imageSrc: "/images/our-products/image.png",
    },
    {
      id: 3,
      title: "Limited Edition",
      imageSrc: "/images/our-products/image.png",
    },
    {
      id: 4,
      title: "Seasonal Favorites",
      imageSrc: "/images/our-products/image.png",
    },
  ];

  // Enhanced product data with all required properties
  const shopProducts: Product[] = useMemo(
    () => [
      {
        id: 1,
        title: "Classic Chocolate",
        imageSrc: "/images/our-products/image.png",
        imageAlt: "Assorted chocolate truffles in a luxury box",
        price: "$39.95",
        isSoldOut: true,
        isBestSeller: true,
        isVegan: true,
      },
      {
        id: 2,
        title: "Gourmet Macarons",
        imageSrc: "/images/our-products/image1.png",
        imageAlt: "Colorful French macarons arranged in a gift box",
        price: "$42.50",
        isSoldOut: false,
        isBestSeller: false,
        isVegan: true,
      },
      {
        id: 3,
        title: "Artisanal Pralines",
        imageSrc: "/images/our-products/image2.png",
        imageAlt: "Handcrafted Belgian pralines with elegant designs",
        price: "$45.75",
        isSoldOut: true,
        isBestSeller: false,
        isVegan: false,
      },
      {
        id: 4,
        title: "Luxury Bonbon Collection",
        imageSrc: "/images/our-products/image.png",
        imageAlt: "Assorted bonbons with decorative finishes",
        price: "$52.95",
        isSoldOut: false,
        isBestSeller: true,
        isVegan: false,
      },
      {
        id: 5,
        title: "Dark Chocolate Assortment",
        imageSrc: "/images/our-products/image1.png",
        imageAlt: "Premium dark chocolate selection in a gift box",
        price: "$47.50",
        isSoldOut: false,
        isBestSeller: false,
        isVegan: true,
      },
      {
        id: 6,
        title: "Seasonal Berry Chocolates",
        imageSrc: "/images/our-products/image2.png",
        imageAlt: "Chocolates with seasonal berry fillings",
        price: "$44.99",
        isSoldOut: false,
        isBestSeller: false,
        isVegan: false,
      },
      {
        id: 7,
        title: "Hazelnut Chocolate Bars",
        imageSrc: "/images/our-products/image.png",
        imageAlt: "Artisanal chocolate bars with hazelnut pieces",
        price: "$38.75",
        isSoldOut: true,
        isBestSeller: false,
        isVegan: false,
      },
      {
        id: 8,
        title: "Spiced Caramel Collection",
        imageSrc: "/images/our-products/image1.png",
        imageAlt: "Assorted caramel-filled chocolates with exotic spices",
        price: "$49.95",
        isSoldOut: false,
        isBestSeller: true,
        isVegan: false,
      },
      {
        id: 9,
        title: "Ruby Chocolate Selection",
        imageSrc: "/images/our-products/image2.png",
        imageAlt: "Luxurious ruby chocolate assortment in gift packaging",
        price: "$54.99",
        isSoldOut: false,
        isBestSeller: false,
        isVegan: true,
      },
    ],
    []
  );

  return (
    <div className="w-full flex flex-col gap-142d mb-142d">
      <div className="grid grid-cols-2 gap-x-20d gap-y-32d">
        {productData.map((product) => (
          <CardProduct
            key={product.id}
            title={product.title}
            imageSrc={product.imageSrc}
          />
        ))}
      </div>
      <CategoryProduct
        shopProducts={shopProducts}
        categoryTitle="Best Selling Chocolates"
      />
      <CategoryProduct
        shopProducts={shopProducts}
        categoryTitle="Coming Soon"
      />
      <div className="grid grid-cols-2 gap-x-20d gap-y-32d">
        {productData.slice(0, 2).map((product) => (
          <CardProduct
            key={product.id}
            title={product.title}
            imageSrc={product.imageSrc}
          />
        ))}
      </div>
      <CategoryProduct
        shopProducts={shopProducts}
        categoryTitle="Chocolate Bars"
      />
      <div className="grid grid-cols-2 gap-x-20d gap-y-32d">
        {productData.slice(0, 2).map((product) => (
          <CardProduct
            key={product.id}
            title={product.title}
            imageSrc={product.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}
