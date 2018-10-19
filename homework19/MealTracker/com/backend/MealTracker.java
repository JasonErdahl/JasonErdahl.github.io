package com.backend;
import java.util.ArrayList;
import java.time.LocalTime;

public class MealTracker extends User {

  ArrayList<Meal> meals = new ArrayList<Meal>();

  public MealTracker(String firstName, String lastName, String email, int age) {
    super(firstName, lastName, email, age);
  }

  void addMeal(Meal myMeal) {
    this.meals.add(myMeal);
  }

  void viewMeals() {
    for (int i = 0; i < this.meals.size(); i++) {
      Meal test = this.meals.get(i);
      System.out.println(test.name);
    }
  }

  int getMealCount() {
    System.out.println("Meal Count: " + this.meals.size());
    return this.meals.size();
  }

  double getAdherence(ArrayList<Meal> meals) {

    double adherance = 0;
    int[] anArray;
    int numMeals = meals.size();
    anArray = new int[numMeals];
    int fat = 0;
    int fruit = 0;
    int vegetable = 0;
    int protein = 0;

    for (int h = 0; h< numMeals; h++) {
      Meal tempMeal = meals.get(h);
      ArrayList<Category> mealcategories = new ArrayList<Category>();
      for (int i = 0; i<tempMeal.foods.size(); i++) {
        for (int j = 0; j< tempMeal.foods.get(i).categories.size(); j++) {
          mealcategories.add(tempMeal.foods.get(i).categories.get(j));
        }
      }

      for (int k = 0; k<mealcategories.size(); k++) {
          Category temp = mealcategories.get(k);
          switch (temp) {
            case Fat:
              fat = 1;
              break;
            case Fruit:
              fruit = 1;
              break;
            case Vegetable:
              vegetable = 1;
              break;
            case Protein:
              protein = 1;
              break;
          }
      }

      if ((fat + protein + fruit + vegetable) == 4) {
          anArray[h] = 1;
      }
    }

    double sum=-0;
    for (int l = 0; l<numMeals; l++) {
      sum += anArray[l];
    }
    adherance = sum/numMeals;

    return adherance;
  }

  boolean isOnTrack(double adherance) {
    if (adherance >= 0.5){
      System.out.println("Adherance TRUE");
      return true;
    } else {
      System.out.println("Adherance FALSE");
      return false;
    }
  }

  public static void main(String[] args) {
    MealTracker myMealTracker = new MealTracker( "Jason", "Erdahl", "jasonerdahl@gmail.com", 44);
    System.out.println("Meal Tracker User name: " + myMealTracker.firstName + " " + myMealTracker.lastName);

    ArrayList<Category> milkshakecategories = new ArrayList<Category>();
    milkshakecategories.add(Category.Fat);
    milkshakecategories.add(Category.Beverage);
    milkshakecategories.add(Category.Protein);

    ArrayList<Category> macarooncategories = new ArrayList<Category>();
    macarooncategories.add(Category.Fat);
    macarooncategories.add(Category.Dessert);

    ArrayList<Category> cakecategories = new ArrayList<Category>();
    cakecategories.add(Category.Fat);
    cakecategories.add(Category.Dessert);

    ArrayList<Category> dessertCat = new ArrayList<Category>();
    Meal dessert = new Meal("dessert", 0, 0, 0, 0, dessertCat );
    Food macaroon = new Food("macaroon", 97, 3, 17, 0.9, macarooncategories);
    Food milkshake = new Food("milkshake", 280, 26, 89, 12, milkshakecategories);
    Food cake = new Food("cake", 80, 2, 14, 1, cakecategories);
    dessert.addFood(macaroon);
    dessert.addFood(milkshake);
    dessert.addFood(cake);
    myMealTracker.addMeal(dessert);

    ArrayList<Category> watermeloncategories = new ArrayList<Category>();
    watermeloncategories.add(Category.Fruit);
    watermeloncategories.add(Category.Vegetable);

    ArrayList<Category> fruitCat = new ArrayList<Category>();
    Meal fruit = new Meal("fruit", 0, 0, 0, 0, fruitCat );
    Food watermelon = new Food("watermelon", 85, 0.4, 21, 1.7, watermeloncategories);
    fruit.addFood(watermelon);
    fruit.addFood(milkshake);
    myMealTracker.addMeal(fruit);

    myMealTracker.viewMeals();
    myMealTracker.getMealCount();

    myMealTracker.isOnTrack(myMealTracker.getAdherence(myMealTracker.meals));
  }

}