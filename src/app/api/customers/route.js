import { getAllCustomers, insertCustomer } from "@/lib/prisma/customer-prisma";
import { NextResponse } from "next/server";


// Insert new customer
export const POST = async ( req ) => {
   const body = await req.json();
    try {
      const newCustomer = await insertCustomer(body);
      return NextResponse.json({
        status: 201,
        message: `New customer created successfully.`,
        payload: newCustomer
      },{ status: 201 });
    } catch (error) {
      console.error('Error inserting new customer:', error);
      return NextResponse.json({
        status: 500,
        message: 'Internal Server Error.'
      }, { status: 500 });
    }
  }

// Get all customers
export const GET = async () => {
    try {
      const payload = await getAllCustomers();
      return NextResponse.json({
        status: 200,
        message: "Get all customers successfully.",
        payload
      },{ status: 200 });
    } catch (error) {
      console.error('Error fetching customers:', error);
      return NextResponse.json({
        status: 500,
        message: 'Internal Server Error.'
      });
    }
  }
