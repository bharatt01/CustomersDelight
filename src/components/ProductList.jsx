// import React, { useState } from 'react';

// const productsData = [
//   { id: 1, name: 'Shoes',price:'150', color:'red' },
//   { id: 2, name: 'T-Shirt' },
//   { id: 3, name: 'Jeans' },
//   { id: 4, name: 'Jacket' },
//   { id: 5, name: 'Hat' },
// ];

// const ProductList = ({ searchTerm }) => {
//   const filteredProducts = productsData.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       {filteredProducts.length > 0 ? (
//         filteredProducts.map((product) => (
//           <div key={product.id}>{product.name}{product.price}{product.color}</div>
//         ))
//       ) : (
//         <p>No results found</p>
//       )}
//     </div>
//   );
// };

// export default ProductList;
