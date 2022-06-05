import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { addProduct, updateProduct } from '@services/api/products.js';
import { useRouter } from 'next/router';

export default function FormProduct({ setOpen, setAlert, product }) {
  const formRef = useRef(null);
  const router = useRouter();

  const {
    register,
    // handleSubmit, //react-hook-form
    formState: { errors },
  } = useForm({});

  // maneja el button ADD
  const onSubmit = (event) => {
    event.preventDefault();

    // obtener valor del formulario
    const formData = new FormData(formRef.current);

    // validar data (working)

    // estructura producto a enviar
    const data = {
      title: formData.get('title'),
      price: parseInt(formData.get('price')),
      description: formData.get('description'),
      categoryId: parseInt(formData.get('category')),
      images: [formData.get('images').name],
    };

    if (product) {
      updateProduct(product.id, data)
        .then((response) => {
          //¿Qué hago con el response?
          console.log(response);
          // setAlert({
          //   active: true,
          //   message: 'Producto agregado exitosamente',
          //   type: 'success',
          //   autoClose: false,
          // });

          router.push('/dashboard/products');
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      addProduct(data)
        .then((response) => {
          //¿Qué hago con el response?
          console.log(response);
          setAlert({
            active: true,
            message: 'Producto agregado exitosamente',
            type: 'success',
            autoClose: false,
          });

          setOpen(false);
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: error.message,
            type: 'error',
            autoClose: false,
          });
        });
    }
  };

  return (
    <form
      ref={formRef}
      // onSubmit={handleSubmit(onSubmit)} // react-hook-form
      onSubmit={onSubmit}
    >
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Nombre del producto
              </label>
              <input
                defaultValue={product?.title}
                type="text"
                {...register('title', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Min lenght is 4',
                  },
                })}
                id="title"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <p className="block text-sm font-medium text-red-600">{errors?.title?.message}</p>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Precio
              </label>
              <input
                defaultValue={product?.price}
                type="number"
                {...register('price', {
                  required: 'This is required',
                  min: {
                    value: 1,
                    message: 'Min price is 1',
                  },
                  max: {
                    value: 999,
                    message: 'Max price is 999',
                  },
                })}
                id="price"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <p className="block text-sm font-medium text-red-600">{errors?.price?.message}</p>
            </div>
            <div className="col-span-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Categoria
              </label>
              <select
                defaultValue={product?.category}
                id="category"
                {...register('category', {
                  required: 'Select a category',
                })}
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="1">Ropa</option>
                <option value="2">Electrónica</option>
                <option value="3">Muebles</option>
                <option value="4">Juguetes</option>
                <option value="5">Otros</option>
              </select>
              <p className="block text-sm font-medium text-red-600">{errors?.category?.message}</p>
            </div>

            <div className="col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                defaultValue={product?.description}
                {...register('description', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Min lenght is 4',
                  },
                })}
                id="description"
                autoComplete="description"
                rows="3"
                className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <p className="block text-sm font-medium text-red-600">{errors?.description?.message}</p>
            </div>
            <div className="col-span-6">
              <div>
                <span className="block text-sm font-medium text-gray-700">Cubierta de imagen</span>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Subir una imagen</span>
                        <input
                          // defaultValue={product?.images}
                          {...register('images', {
                            required: 'This is required',
                          })}
                          type="file"
                          id="images"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">o arratrar y soltar</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                  </div>
                </div>
                <p className="block text-sm font-medium text-red-600">{errors?.images?.message}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}
