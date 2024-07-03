import { getOrdersByCustomerId } from "@/lib/prisma/order-prisma";
import { NextResponse } from "next/server";

// Get orders by customer ID
export const GET = async (request,{ params }) => {
  const { customerId } = params;
  try {
    const orders = await getOrdersByCustomerId(customerId);
    if (!orders || orders.length === 0) {
      return NextResponse.json({
        status: 404,
        message: `No orders found for customer with ID ${customerId}.`
      });
    }
    return NextResponse.json({
      status: 200,
      message: `Get orders for customer with ID ${customerId} successfully.`,
      payload: orders
    },{ status: 200 });
  } catch (error) {
    console.error('Error fetching orders by customer ID:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error.'
    });
  }
}