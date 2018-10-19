package com.backend;

/* 
Category
## The Category class simply allows you to track which of the following categories a food belongs to:

Fruit;
Vegetable;
Protein;
Fat;
Beverage.

You're free to add additional categories (dessert, etc.). Hint: Implement this with enum types.
*/

public enum Category {
  Fruit,
  Vegetable,
  Protein,
  Dessert,
  Beverage,
  Fat,
  Carbohydrate;
}

class CategoryTest {

    Category category;

    public CategoryTest(Category name) {
    this.category = name;
    System.out.println("Category name: " + name);
    }

    public void Categories() {
        switch (category) {
        case Beverage:
            System.out.println("Beverage");
            break;
        case Carbohydrate:
            System.out.println("Carbohydrate");
            break;
        case Dessert:
            System.out.println("Dessert");
            break;
        case Fat:
            System.out.println("Fat");
            break;
        case Fruit:
            System.out.println("Fruit");
            break;
        case Protein:
            System.out.println("Protein");
            break;
        case Vegetable:
            System.out.println("Vegetables");
            break;
        default:
            System.out.println("Undefined Category. Please try again.");
            break;
        }
    }
    public static void main (String[] args) {
      CategoryTest myCategory = new CategoryTest(Category.Beverage);
      myCategory.Categories();
    }
}