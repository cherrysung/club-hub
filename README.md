# Club Hub Guide

### How to deploy changes to live site

The live site is hosted using Firebase Hosting. Before we can deploy, we first need to build the application:

```
npm run build
```

This will create a `/build` folder with the compiled app. After, you can deploy the new app to Firebase Hosting:

```
npm run deploy
```

### Filtering clubs by semesters

The club list data used throughout the app is fetched, stored, and made available in `clubsProvider.js`. The data is then filtered to only use clubs within the current semester. These are the semester configurations:

- **Semester 1**: May 14 ~ Dec 3
- **Semester 2**: Dec 4 ~ May 13

The `getCurrentSemester` function calculates whether the current date (`now`) is within the range of start & end dates of semester 1:

```
const getCurrentSemester = () => {
  const now = new Date();
  const year = now.getFullYear();

  const sem1Start = new Date(year, 4, 14); // May 14
  const sem1End = new Date(year, 11, 3); // Dec 3

  if (now >= sem1Start && now <= sem1End) {
    return true;
  } else {
    return false;
  }
};
```

\*\*Note that in JavaScript, when creating a `Date` object using the `new Date(year, month, day)` constructor, the `month` parameter is zero-based; meaning that `0` corresponds to January, `1` corresponds to February, and so on.

The returned boolean value from `getCurrentSemester` is then used to check and filter the total list of clubs initially fetched from Firestore:

```
const isSem1 = getCurrentSemester();

const filteredClubs = clubs.filter((club) => {
  const { semesters } = club;
  if (
    semesters === 'Both, optional' ||
    semesters === 'Both, mandatory'
  ) {
    return true;
  }
  if (semesters === 'Sem 1 only' && isSem1) {
    return true;
  }
  if (semesters === 'Sem 2 only' && !isSem1) {
    return true;
  }
  return false;
});
```

#### How to change semester dates

The current dates are based on semester dates for 2024-2025. To change the dates, simply change the date parameters used to create the `Date` objects for both `sem1Start` and `sem1End` accordingly.
