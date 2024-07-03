const {default: prisma} = require("./prisma")

// Get all categories
export const getAllCategories = async () => {
  const payload = prisma.category.findMany();
  return payload;
};

// Get category by ID
export const getCategoryById = async (categoryId) => {
  const payload = await prisma.category.findUnique({
    where: {
      category_id: parseInt(categoryId)
    }
  });
  return payload;
}

// Delete category by ID
export const deleteCategoryById = async (categoryId) => {
  const deletedCategory = await prisma.category.delete({
    where: {
      category_id: parseInt(categoryId)
    }
  });
  return deletedCategory;
}

// Update category by ID
export const updateCategoryById = async (categoryId, newName) => {
  const category_Id = parseInt(categoryId);
  const updatedCategory = await prisma.category.update({
    where: {
      category_id: category_Id
    },
    data:{
      category_name: newName // newName should be the category name string
    }
  });
  return updatedCategory;
}


// Get category by name
export const getCategoryByName = async (categoryName) => {
  const payload = await prisma.category.findUnique({
    where: {
      category_name: categoryName
    }
  });
  return payload;
}

// Insert new category
export const insertCategory = async (categoryName) => {
  console.log("category data: ", categoryName);
  const payload = await prisma.category.create({
    data: {
      category_name: categoryName.category_name
    }
  });
  return payload;
}
