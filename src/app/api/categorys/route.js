import { getAllCategories,insertCategory  } from "@/lib/prisma/category-prisma";
import { NextResponse } from "next/server";

// Get all categories
export const GET = async () => {
  const payload = await getAllCategories();
  return NextResponse.json({
      status: 200,
      message: "Get all categories successfully.",
      payload
  },{ status: 200 });
}

// Insert new category
export const POST = async (req) => {
    const body = await req.json();
    try {
      const newCategory = await insertCategory(body);
      return NextResponse.json({
        status: 201,
        message: `New category created successfully.`,
        payload: newCategory
      },{ status: 201 });
    } catch (error) {
      console.error('Error inserting new category:', error);
      return NextResponse.json({
        status: 500,
        message: 'Internal Server Error.'
      }, { status: 500 });
    }
  }