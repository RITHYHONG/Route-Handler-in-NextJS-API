const {default: prisma} = require("./prisma")
import { getProductById } from '@/lib/prisma/product-prisma'; // Import getProductById function

// Get all orders
export const getAllOrders = async () => {
    const payload = await prisma.order.findMany();
    return payload;
  };
  
  // Get order by ID
  export const getOrderById = async (orderId) => {
    const payload = await prisma.order.findUnique({
      where: {
        order_id: parseInt(orderId)
      }
    });
    return payload;
  }
  
  // Get orders by customer ID
  export const getOrdersByCustomerId = async (customerId) => {
    const orders = await prisma.order.findMany({
      where: {
        customer_id: parseInt(customerId)
      }
    });
    return orders;
  }

  // Delete order by ID
  export const deleteOrderById = async (orderId) => {
    const deletedOrder = await prisma.order.delete({
      where: {
        order_id: parseInt(orderId)
      }
    });
    return deletedOrder;
  }
  
  // Update order by ID
  export const updateOrderById = async (orderId, newData) => {
    const updatedOrder = await prisma.order.update({
      where: {
        order_id: parseInt(orderId)
      },
      data: newData
    });
    return updatedOrder;
  }
  
 // Insert new order
// Insert new order
export const insertOrder = async (orderData) => {
  console.log("Order data: ", orderData);
  const { customer_id, product_id, order_qty, order_date } = orderData;
  
  try {
    // Retrieve the product information
    const product = await getProductById(product_id);
  
    // Check if the product exists
    if (!product) {
      throw new Error(`Product with ID ${product_id} not found.`);
    }
    
    // Calculate the order total
    const order_total = product.price * order_qty;

    // Create the new order
    const newOrder = await prisma.order.create({
      data: {
        customer_id,
        product_id,
        order_qty,
        order_total,
        order_date // Include the order_date property
      }
    });

    return newOrder;
  } catch (error) {
    throw new Error(`Error inserting new order: ${error.message}`);
  }
}
  // Update order
  export const updateOrder = async (orderId, newData) => {
    const updatedOrder = await prisma.order.update({
      where: {
        order_id: parseInt(orderId)
      },
      data: newData
    });
    return updatedOrder;
  }