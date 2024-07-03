import { getAllOrders, insertOrder } from "@/lib/prisma/order-prisma";
import { NextResponse } from "next/server";

// Get all orders
export const GET = async () => {
  try {
    const payload = await getAllOrders();
    return NextResponse.json({
      status: 200,
      message: "Get all orders successfully.",
      payload
    },{ status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error.'
    });
  }
}

// Insert new order
export const POST = async ( req ) => {
  const body = await req.json();
  
  try {
    const newOrder = await insertOrder( body );
    return NextResponse.json({
      status: 201,
      message: `New order created successfully.`,
      payload: newOrder
    },{ status: 201 });
  } catch (error) {
    console.error('Error inserting new order:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal Server Error.'
    }, { status: 500 });
  }
}