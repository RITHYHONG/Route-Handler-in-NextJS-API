import { getCustomerById, deleteCustomerById, updateCustomerById, getCustomerByName } from "@/lib/prisma/customer-prisma";
import { NextResponse } from "next/server";

// Get customer by ID
export const GET = async (request,{ params }) => {
  const { customerId } = params; 
  let payload;

  if (!isNaN(customerId)) {
    payload = await getCustomerById(customerId);
  } else {
    payload = await getCustomerByName(customerId);
  }

  if (!payload) {
    return NextResponse.json({
      status: 404
      message: isNaN(customerId) ? `Customer with name ${customerId} not found.` : `Customer with ID ${customerId} not found.`,
    });
  }

  return NextResponse.json({
    status: 200,
    message: isNaN(customerId) ? `Get Customer ${customerId} successfully.` : `Get Customer by ID ${customerId} successfully.`,
    payload
  },{ status: 200 });
}

  
// Delete customer by ID
export const DELETE = async (req, { params }) => {
  const { customerId } = params;
  try {
    await deleteCustomerById(customerId);
    return NextResponse.json({
      status: 200,
      message: `Customer with ID ${customerId} deleted successfully.`,
    }, { status: 200 });
  } catch (error) {
    console.error('Error deleting customer by ID:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error.',
    }, { status: 500 });
  }
}

// Update customer by ID
export const PUT = async (request, { params }) => {
  const { customerId } = params;
  const { first_name, last_name, birth_date, money_spent } = await request.json();
  try {
    const updatedCustomer = await updateCustomerById(customerId, { first_name, last_name, birth_date, money_spent });
    return NextResponse.json({
      status: 200,
      message: `Customer with ID ${customerId} updated successfully.`,
      payload: updatedCustomer,
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating customer by ID:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error.',
    }, { status: 500 });
  }
}
