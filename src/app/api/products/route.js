import { getProducts, insertProduct  } from "@/lib/prisma/product-prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    const payload = await getProducts();
    return NextResponse.json({
        status: 200,
        message: "Get all products successfully.",
        payload
    },{ status: 200 });
}
  // Insert new product

export const POST = async (req) => {
  const body = await req.json();
 try {
    const newProduct = await insertProduct(body); // Call insertProduct function with request body
    return NextResponse.json({
      status: 201,
      message: "A new product is created successfully.",
      payload: newProduct,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error.",
    }, { status: 500 });
  }
  
};