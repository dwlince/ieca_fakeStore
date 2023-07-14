import { BuscarProducto, useCartContext } from "../provider/CartProvider";
import CartItem from "./CartItem";

const ProductItem = ({ product }) => {
  const { dispatch } = useCartContext();
  //console.log(product);

  //console.log(CartItem);
  console.log(product);
  //console.log(dispatch.allCart);
  //console.log(dispatch({ type: "IN_CART", payload: product }));
  // console.log(dispatch({ type: "FROM_CART_IF_ADD", payload: product }));

  return (
    <div key={product.id}>
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
          <p className="mt-1 text-sm text-gray-500">${product.price}</p>
        </div>
        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <p className="relative text-lg font-semibold text-white">
            ${product.price}
          </p>
        </div>
      </div>

      <div className="mt-6">
        {BuscarProducto({ product }) ? (
          <a
            href="#"
            className="relative flex items-center justify-center rounded-md border border-transparent bg-amber-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
            onClick={() => {
              dispatch({ type: "REMOVE_FROM_CART", payload: product });
              //alert("Producto añadido al carrito");
            }}
          >
            Quitar del carrito<span className="sr-only">, {product.title}</span>
          </a>
        ) : (
          <a
            href="#"
            className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
            onClick={() => {
              dispatch({ type: "ADD_TO_CART", payload: product });
              //alert("Producto añadido al carrito");
            }}
          >
            Agregar al carrito<span className="sr-only">, {product.title}</span>
          </a>
        )}
      </div>
      <div className="mt-3">
        <a
          href={"/producto/" + product.id}
          className="relative flex items-center justify-center rounded-md border border-transparent bg-teal-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
        >
          Ver detalle<span className="sr-only">, {product.title}</span>
        </a>
      </div>
    </div>
  );
};

export default ProductItem;
