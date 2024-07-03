import { getProductById, getProductByName, deleteProductById, updateProductById  } from "@/lib/prisma/product-prisma"; // Import getProductByName function
import { NextResponse } from "next/server";

export const GET = async (require,{ params }) => {
  const { proId } = params; 
  let payload;

  if (!isNaN(proId)) {
    payload = await getProductById(proId);
  } else {
    payload = await getProductByName(proId);
  }

  if (!payload) {
    return NextResponse.json({
      status: 404
      message: isNaN(proId) ? `Product with name ${proId} not found.` : `Product with ID ${proId} not found.`,
    });
  }

  return NextResponse.json({
    status: 200,
    message: isNaN(proId) ? `Get product ${proId} successfully.` : `Get product by ID ${proId} successfully.`,
    payload
  },{ status: 200 });
}
// Delete product by ID
export const DELETE = async (request, { params }) => {
  const { proId } = params; 
  try {
    await deleteProductById(params.proId); 
    // console.log("proId",params);
    return NextResponse.json({
      status: 200,
      message: `Product with ID ${proId} deleted successfully.`,
    }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({
      status: 404,
      message: "Product ID not fount.",
    }, { status: 404 });
  }
};


export const PUT = async (request,{ params}) => {
  const { proId } = params; // Extract the proId parameter from the URL
  const { product_name, product_id, price } = await request.json(); // Extract updated product data from the request body

  // Check if the product with the given ID exists
  const existingProduct = await getProductById(proId);
  if (!existingProduct) {
    return NextResponse.json({
      status: 404
      message: `Product with ID ${proId} not found.`,
    });
  }

  try {
    // Update the product with the given ID
    const updatedProduct = await updateProductById(proId, {
      product_name,
      product_id,
      price
    });

    return NextResponse.json({
      status: 200,
      message: `Product with ID ${proId} updated successfully.`,
      payload: updatedProduct
    },{ status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error.'
    });
  }
}
