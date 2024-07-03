import { getCategoryById, deleteCategoryById, updateCategoryById, getCategoryByName } from "@/lib/prisma/category-prisma"; 
import { NextResponse } from "next/server";


// get category by name and id 
export const GET = async (require,{ params }) => {
  const { categoryId } = params; 
  let payload;

  if (!isNaN(categoryId)) {
    payload = await getCategoryById(categoryId);
  } else {
    payload = await getCategoryByName(categoryId);
  }

  if (!payload) {
    return NextResponse.json({
      message: isNaN(categoryId) ? `Category with name ${categoryId} not found.` : `Category with ID ${categoryId} not found.`,
      status: 404
    });
  }

  return NextResponse.json({
    status: 200,
    message: isNaN(categoryId) ? `Get Category ${categoryId} successfully.` : `Get Category by ID ${categoryId} successfully.`,
    payload
  },{ status: 200 });
}

// Delete category by ID
export const DELETE = async (request,{ params }) => {
  const { categoryId } = params;
  try {
    await deleteCategoryById(categoryId);
    return NextResponse.json({
      status: 200,
      message: `Category with ID ${categoryId} deleted successfully.`
    },{ status: 200 });
  } catch (error) {
    console.error('Error deleting category by ID:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error.'
    });
  }
}

// Update category by ID
export const PUT = async (request, { params }) => {
  const { categoryId } = params; // Extract the categoryId parameter from the URL
  const { category_name } = await request.json(); // Extract updated category data from the request body

  // Check if the category with the given ID exists
  const existingCategory = await getCategoryById(categoryId);
  if (!existingCategory) {
    return NextResponse.json({
      message: `Category with ID ${categoryId} not found.`,
      status: 404
    });
  }

  try {
    // Update the category with the given ID
    const updatedCategory = await updateCategoryById(categoryId, category_name);

    return NextResponse.json({
      status: 200,
      message: `Category with ID ${categoryId} updated successfully.`,
      payload: updatedCategory
    },{ status: 200 });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error.'
    });
  }
}



