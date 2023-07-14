import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon as XMarkIconOutline,
} from "@heroicons/react/24/outline";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";

import { useCartContext } from "../provider/CartProvider";

const CartItem = ({ product }) => {
  const { dispatch } = useCartContext();

  return (
    <li key={product.id} className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <a
                  href={product.href}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {product.name}
                </a>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">{product.color}</p>
              {product.size ? (
                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                  {product.size}
                </p>
              ) : null}
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">
              ${product.price}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <label htmlFor={`quantity-`} className="sr-only">
              {product.name}
            </label>

            <div className="absolute right-0 top-0">
              <button
                onClick={() => {
                  dispatch({ type: "REMOVE_FROM_CART", payload: product });
                }}
                type="button"
                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Remove</span>
                <XMarkIconMini className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
