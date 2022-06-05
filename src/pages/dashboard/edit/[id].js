import React, { useEffect, useState } from 'react';
import FormProduct from '@components/FormProduct';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api/index';

export default function Edit() {
  const router = useRouter();
  const [product, setProduct] = useState({});

  // escucha cuando carga el router
  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;

    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));

      setProduct(response.data);
    }

    try {
      getProduct();
    } catch (error) {
      console.log(error);
    }

  }, [router.isReady, router.query]);

  return <FormProduct product={product} />;
}