const {default: prisma} = require("./prisma")

// Get All Product
export const getProducts = async () => {
  const payload = prisma.product.findMany();
  return payload;
};

// get product by id
export const getProductById = async (proId) => {
  const productId = parseInt(proId);
  console.log("params",proId)
  const payload = prisma.product.findUnique({
      where: {
          product_id: productId
      }
  })
  return payload
}

// Delete Product
export const deleteProductById = async (proId) => {
  const productId = parseInt(proId);
  console.log("params",proId)
  const delProduct = await prisma.product.delete({
    where: {
      product_id: productId
    }
  });
  return delProduct;
};

// Update product by ID
export const updateProductById = async (proId, data) => {
  const productId = parseInt(proId);
  const updatedProduct = await prisma.product.update({
    where: {
      product_id: productId
    },
    data
  });
  return updatedProduct;
}


export const getProductByName = async (productName) => {
  const payload = await prisma.product.findUnique({
    where: {
      product_name: productName
    }
  });
  return payload;
};

// Get products by category id
export const getProductsByCategoryId = async (categoryId) => {
  const category = await prisma.category.findUnique({
    where: {
      category_id: parseInt(categoryId)
    },
    include: {
      products: true
    }
  });
  if (!category) {
    return null; // Return null if category is not found
  }
  return category.products;
}

// Insert Product
export const insertProduct = async (proData) => {
  console.log("product data: ", proData);
  const payload = prisma.product.create({
      data: {
        product_name: proData.product_name,
        category_id: proData.category_id ,
        price: proData.price  
      }
  });
  return payload;
}


//update product
export const updateProduct = async (proId, newProData) => {
  console.log("new data", newProData)
  const productId = parseInt(proId);
  const payload = prisma.product.update({
      where:{
          product_id: productId
      },
      data:{
        product_name: newProData.product_name,
          price: newProData.price,
          category_id: newProData.category_id
      }
  });
  return payload;
}