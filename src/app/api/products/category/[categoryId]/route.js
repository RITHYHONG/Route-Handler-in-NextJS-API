// import { getCategoryById, updateCategoryById } from "@/lib/prisma/category-prisma";
import { getProductsByCategoryId } from "@/lib/prisma/product-prisma";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { categoryId } = params;

  try {
    // Check if categoryId is undefined
    if (!categoryId) {
      return NextResponse.json({
        status: 400,
        message: "Category ID is undefined.",        
      });
    }

    const payload = await getProductsByCategoryId(categoryId);
    if (!payload || payload.length === 0) {
      return NextResponse.json({
        status: 404,
        message: `Products with category ID ${categoryId} not found.`,    
      });
    }

    return NextResponse.json({
      status: 200,
      message: `Get products by category ID ${categoryId} successfully.`,
      payload,      
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products by category ID:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error.",      
    }, { status: 500 });
  }
}

