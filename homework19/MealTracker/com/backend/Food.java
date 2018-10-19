package com.backend;
import java.util.ArrayList;

/*
## The Food class exposes the following API:


double getCalories
double getFat
double getCarbohydrates
double getProtein
double getName
ArrayList<Category> getCategories
void addCategory


Mind the similarities between these two classes when you start designing.
*/

public class Food {

  String name;
  double Calories;
  double Fat;
  double Carbohydrates;
  double Protein;

  ArrayList<Category> categories = new ArrayList<Category>();

public Food(String name, double Calories, double Fat, double Carbohydrates, double Protein, ArrayList<Category>categories) {

  this.name = name;
  this.Calories = Calories;
  this.Fat = Fat;
  this.Carbohydrates = Carbohydrates;
  this.Protein = Protein;
  int categoryLen = categories.size();

    for (int i=0; i<categoryLen; i++) {
      this.addCategory(categories.get(i));
    }
  }

  double getCalories() {
    return this.Calories;
  }

  double getFat() {
    return this.Fat;
  }

  double getCarbohydrates() {
    return this.Carbohydrates;
  }

  double getProtein() {
    return this.Protein;
  }

  String getName(){
    return this.name;
  }

  ArrayList<Category> getCategories(){
    return this.categories;
  }

  void addCategory(Category category){
    this.categories.add(category);
  }

  public static void main(String[] args) {

    ArrayList<Category> categories = new ArrayList<Category>();

    categories.add(Category.Vegetable);
    categories.add(Category.Carbohydrate);

    Food myFood = new Food( "Jicama", 250, 0.6, 58, 4.7, categories);

    System.out.println(myFood.getCategories());
  }

}