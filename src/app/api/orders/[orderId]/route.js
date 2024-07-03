import { getOrderById, deleteOrderById, updateOrderById, updateOrder } from "@/lib/prisma/order-prisma";
import { NextResponse } from "next/server";

// Get order by ID
export const GET = async (require,{ params }) => {
  const { orderId } = params;
  try {
    const payload = await getOrderById(orderId);
    if (!payload) {
      return NextResponse.json({
        status: 404,
        message: `Order with ID ${orderId} not found.`
      });
    }
    return NextResponse.json({
      status: 200,
      message: `Get order with ID ${orderId} successfully.`,
      payload
    },{ status: 200 });
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error.'
    });
  }
}

// Delete order by ID
export const DELETE = async (req,{ params }) => {
  const { orderId } = params;
  try {
    await deleteOrderById(orderId);
    return NextResponse.json({
      status: 200,
      message: `Order with ID ${orderId} deleted successfully.`
    },{ status: 200 });
  } catch (error) {
    console.error('Error deleting order by ID:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error.'
    });
  }
}

// Update order by ID
export const PUT = async (request,{ params }) => {
  const { orderId } = params;
  const { customer_id, product_id, order_total, order_qty, order_date } = await request.json();
  try {
    const updatedOrder = await updateOrderById(orderId, { customer_id, product_id, order_total, order_qty, order_date });
    return NextResponse.json({
      status: 200,
      message: `Order with ID ${orderId} updated successfully.`,
      payload: updatedOrder
    },{ status: 200 });
  } catch (error) {
    console.error('Error updating order by ID:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error.'
    });
  }
}

