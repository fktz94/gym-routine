# Gym Tracker 🏋️‍♀️

This is an app I made for track my weight changes in my gym routine upon the days.

It´s a [React Native](https://reactnative.dev/) project, written in [TypeScript](https://typescript.org) and created using [Expo](https://expo.dev).

The interface was created with modularized components...

Various React´s functionalities and hooks have been used, such as **useState**, **useEffect**, **useContext** or **useReducer**, and **custom hooks** have been written to modularize the program functionalities.

I´ve used third-party libraries as well, of which we could find: **React Native Reanimated** to create animations, **Lodash** to manipulate objects and arrays, or **React Redux Toolkit** to handle global states.

---

## How it works

- **Create a routine**: You've got to select the amount of days it has and if it has a warm-up session (this one will be the same for every day). You can add/delete exercises, or you can just create it with empty days and then fill them whenever you want.
- **Add/edit an exercise**:
  - _Name_
  - _Sets_
  - _Checkbox_: To check if it has a different amount of repetitions along the weeks.
  - _Repetitions_: The quantity of repetitions. It can be one or multiple. If multiple, all spaces must be filled.
  - _Repetitions text customization_: If needed to write something different instead of just numbers in the repetitions data. E.g: "10 c/l" or "RIR 2". (It changes the keyboard mode)
- **Edit a routine**: You will have the possibility of editing the routine (or even deleting it) at any moment. You also can add or delete exercises from it.
- **Add the weights**: The weights can be modify in the corresponding day of the routine. A modal window will be opened when clicking on the _pencil_ button. There, the value can be changed, even customized and change the current repetitions set.
- **Day completed**: Once you've finished doing all your exercises, you just have to click the _Routine done_ button. It'll automatically update all the current repetitions and the day to the proper ones setting up the data for the next time you're using the app. It'll also redirect you back home.

---

## Side information and next steps

**TO DO**:

1. Possibility of joining group of exercises in "circuits".
2. Add **rest** time when wanted.
3. Add chronometer.
4. Create a _hang & drop_ animation to re-order the items (exercises) when creating or editing a routine.
5. Autoscroll to bottom when creating new exercise (just when needed).

- For the moment, and since I don't own no hosting (yet), all the information is stored in the local storage of the phone.
