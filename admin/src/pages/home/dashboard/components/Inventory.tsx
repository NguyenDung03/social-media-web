/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion } from "framer-motion";
import { FONTS, SPRING } from "./theme";
import { useGetProducts } from "../../../../hooks/useProduct";
import type { TProduct } from "../../../../types/product.type";

export const Inventory = () => {
  const { data: productResponse } = useGetProducts();
  const [products, setProducts] = React.useState<TProduct[]>([]);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items =
      (productResponse as any)?.docs || (productResponse as any)?.data || [];

    if (items.length <= 4) {
      setProducts(items);
      return;
    }

    // Randomize and pick 4
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    setProducts(shuffled.slice(0, 4));
  }, [productResponse]);

  return (
    <div className="mt-24 space-y-8">
      <div className="flex items-center justify-between">
        <h3
          className="text-2xl pl-2 font-bold text-[#111111]"
          style={{ fontFamily: FONTS.sans }}
        >
          Sản phẩm bán chạy
        </h3>
      </div>

      {!products.length ? (
        <div className="text-[#787774] text-xs font-mono opacity-50">
          Loading curated inventory...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              variants={{
                hidden: { opacity: 0, scale: 0.96 },
                visible: { opacity: 1, scale: 1, transition: SPRING },
              }}
              whileHover={{ y: -8, transition: SPRING }}
              className="group cursor-pointer flex flex-col gap-4"
            >
              <div className="aspect-[4/5] bg-[#EAEAEA] rounded-[1rem] overflow-hidden relative  group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_20px_40px_rgba(0,0,0,0)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                <img
                  alt={product.nameProduct}
                  src={
                    product.images?.[0]?.url ||
                    `https://picsum.photos/seed/${product._id}/400/500`
                  }
                  className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-[1.5s]"
                />
                {/* Inner Refraction */}
                <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] rounded-[1rem] pointer-events-none" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#111111] line-clamp-1">
                  {product.nameProduct}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <p
                    className="text-[10px] font-medium text-[#111111]"
                    style={{ fontFamily: FONTS.mono }}
                  >
                    {product.price?.toLocaleString()} VNĐ
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
