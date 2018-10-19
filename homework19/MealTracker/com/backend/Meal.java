package com.backend;
import java.util.ArrayList;
import java.time.LocalTime;
/*
## The Meal class exposes the following API:


double getCalories
double getFat
double getCarbohydrates
double getProtein
String getName
DateTime getMealTime
void viewFoods


You don't have to save a MealTime — it's just logical to do so. If you'd like to implement this, read about Java's Date and Time Classes, or use Joda-Time.

When implementing viewFoods, simply print the name of each food in the meal.
*/

public class Meal extends Food {
    ArrayList<Food> foods = new ArrayList<Food>();

    public Meal(String Name, double Calories, double Fat, double Carbohydrates, double Protein, ArrayList<Category> Categories) {
    super(Name, Calories, Fat, Carbohydrates, Protein, Categories);
  }

  LocalTime getMealTime() {
    LocalTime mealTime = LocalTime.now();
    return mealTime;
  }

  void addFood(Food food) {
    this.foods.add(food);
  }

  void viewFoods() {
    for (int i =0; i<this.foods.size();i++) {
      System.out.println(this.foods.get(i).name);
    }
  }

public static void main(String[] args) {

    ArrayList<Category> categories = new ArrayList<Category>();
    // Fruit; Vegetable; Protein; Fat; Beverage
    categories.add(Category.Fruit);
    categories.add(Category.Vegetable);
    categories.add(Category.Protein);
    categories.add(Category.Fat);
    categories.add(Category.Beverage);

    Meal myMeal = new Meal("Milkshake", 280, 26, 89, 12, categories);
    myMeal.addFood(myMeal);

    ArrayList<Category> Watermeloncategories = new ArrayList<Category>();
    Watermeloncategories.add(Category.Fruit);
    Watermeloncategories.add(Category.Carbohydrate);
    Food watermelon = new Food( "Watermelon", 85, 0.4, 21, 1.7, Watermeloncategories);

    myMeal.addFood(watermelon);

    LocalTime currentTime = myMeal.getMealTime();

    System.out.println(currentTime);
    myMeal.viewFoods();
  }
}