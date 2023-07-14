import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import { BuscarProducto, useCartContext } from "../provider/CartProvider";

const ProductDetail = () => {
  const { dispatch } = useCartContext();
  const [product, setProduct] = useState([]);
  const { getProduct } = useAPI();
  let { productId } = useParams();

  useEffect(() => {
    getProduct(productId)
      .then((product) => {
        setProduct(product);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.title}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <div className="flex items-center">
                <p className="text-lg text-gray-900 sm:text-xl">
                  ${product.price}
                </p>
              </div>
              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">{product.category}</p>
              </div>
              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">{product.description}</p>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product form */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" className="sr-only">
                Product options
              </h2>

              <form>
                <div className="mt-10">
                  {BuscarProducto({ product }) ? (
                    <a
                      href="#"
                      className="relative flex items-center justify-center rounded-md border border-transparent bg-amber-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: product,
                        });
                        //alert("Producto añadido al carrito");
                      }}
                    >
                      Quitar del carrito
                      <span className="sr-only">, {product.title}</span>
                    </a>
                  ) : (
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      onClick={() => {
                        dispatch({ type: "ADD_TO_CART", payload: product });
                        //alert("Producto añadido al carrito");
                      }}
                    >
                      Agregar a carrito
                    </button>
                  )}
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
