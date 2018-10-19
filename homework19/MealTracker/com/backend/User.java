package com.backend;
import java.time.LocalTime;

/*
User

The User class is straightforward. It keeps track of a user's 
first and last names; email address; and age, as one would expect. 
The only application-specific field is targetAdherence. 
If we imagine that people use this application to improve their eating habits and eat more complete meals, targetAdherence represents their goal for healthy eating — i.e., what percentage of their meals they want to be complete.

For example, my goal might be to get to a point where nine out of every ten meals I eat are "complete." In that case, my targetAdherence would be 90.
*/

public class User {
  String firstName;
  String lastName;
  String email;
  int age;


  public User(String firstName, String lastName, String email, int age){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.age = age;
  }

  double targetAdherence() {
    return 1;
  }

  public static void main(String[] args) {
    User myUser = new User( "Jason", "Erdahl", "jasonerdahl@gmail.com", 44);
    System.out.println("First name: " + myUser.firstName);
    System.out.println("Last name: " + myUser.lastName);
    System.out.println("User email: " + myUser.email);
    System.out.println("User age: " + myUser.age);
  }  
}

