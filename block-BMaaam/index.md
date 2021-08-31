writeCode

Insert the data present in users.json into local mongodb database using `mongoimport` into a database called sample and collection named as users.

Write aggregation queries to perform following tasks.

1. Find all users who are active.  
<pre> db.users.aggregate([{$match: {isActive: true}}, {$project: {name:1, isActive: 1}}]); </pre>

2. Find all users whose name includes `blake` case insensitive.
<pre>
db.users.createIndex({name: "text"});
db.users.find({$text: {$search: "blake"}});
</pre>
3. Find all males.
<pre> db.users.aggregate({$match: {gender: "male"}}, {$project: {name: 1, gender: 1}}); </pre>

4. Find all active males.
<pre> db.users.aggregate([{$match: {$and: [{gender:"male"}, {isActive: true}]}}, {$project: {name: 1, isActive: 1}}]); </pre>

5. Find all active females whose age is >= 25.
<pre> db.users.aggregate([{$match: {$and: [{gender:"female"}, {isActive: true}, {age: {$gt: 25} }]}}, {$project: {name: 1, isActive: 1, age: 1}}]); </pre>

6. Find all 40+ males with green eyecolor.
<pre> db.users.aggregate([
    { $match :
       { $and: [
          { gender: "male"},
          { eyeColor: "green"},
          { age: {$gt: 40}}
       ]
       }
     },
    { $project:
      {
        name: 1,
        gender: 1,
        eyeColor: 1,
        age: 1
      }
    } 
]); </pre>

7. Find all blue eyed men working in 'USA'.  
<pre> db.users.aggregate([
    { $match :
       { $and: [
          { gender: "male"},
          { eyeColor: "blue"},
          { 'company.location.country': "USA"}
       ]
       }
     },
    { $project:
      {
        name: 1,
        gender: 1,
        eyeColor: 1,
        location: '$company.location.country'
      }
    } 
]); </pre> 

8. Find all female working in Germany with green eyes and apple as favoriteFruit.
<pre> db.users.aggregate([
    { $match :
       { $and: [
          { gender: "female"},
          { eyeColor: "green"},
          { 'company.location.country': "Germany"},
          { favoriteFruit: "apple"}
       ]
       }
     },
    { $project:
      {
        name: 1,
        gender: 1,
        eyeColor: 1,
        location: '$company.location.country',
        favoriteFruit: 1
      }
    } 
]); </pre>

9. Count total male and females.
<pre> db.users.aggregate([
    { $group: {
        _id: "$gender",
        count: {$sum: 1}
    } }
]); </pre>

10. Count all whose eyeColor is green.
<pre> db.users.aggregate([
    { $match: {eyeColor: 'green'} },
    { $group: {
        _id: "eyeColor-green",
        count: {$sum: 1},
    }
    }
]); </pre>

11. Count all 20+ females who have brown eyes.
<pre> db.users.aggregate([
    { $match: { $and: [{ gender: 'female'}, {eyeColor: 'brown'}, {age: {$gt: 20}}]}},
    { $group: {
        _id: "20+ females with brown eyes",
        count: {$sum: 1},
    }}
]); </pre>

12. Count all occurences of all eyeColors.
    Something like:-

```
blue -> 30
brown -> 67
green -> 123
```
<pre> db.users.aggregate([
    { $group: {
        _id: "$eyeColor",
        count: {$sum: 1},
    }}
]); </pre>

13. Count all females whose tags array include `amet` in it.
<pre> db.users.aggregate([
    { $unwind: "$tags" },
    { $match: { $and: [{ tags: "amet"}, { gender: "female" }]}},
    { $group: {
       _id: "emet-count",
       count: {$sum: 1}
    }
}
]) </pre>

14. Find the average age of entire collection
<pre> db.users.aggregate([
    { $group: {
        _id: "avg-age",
        count: {$avg: "$age"}
    }
    }
]); </pre>

15. Find the average age of males and females i.e. group them by gender.
<pre> db.users.aggregate([
    { $group: {
        _id: "$gender",
        count: {$avg: "$age"}
    }
    }
]); </pre>

16. Find the user with maximum age.
<pre> db.users.aggregate([
    {
        $group: {
            _id: "",
            max_age:{ $max: '$age'}
        }
    }
]); </pre>

17. Find the document with minimum age.
<pre> db.users.aggregate([
    {$match: {age: {$nin: [null]}}},
    {$sort: {age: 1}},
    {$group: {
        _id:"Minimum Age",
        min_age: {$first: "$age"},
    }}
]); </pre>

18. Find the sum of ages of all males and females.
<pre> db.users.aggregate([
    { $group: { 
        _id: "$gender",
        age_sum: { $sum: "$age"},
    }
    }
]); </pre>

19. Group all males by their eyeColor.
<pre> db.users.aggregate([
    { $match: {gender: "male"}},
    { $group: {
        _id: "$eyeColor",
        count: {$sum: 1}
    }}
]); </pre>

20. group all 30+ females by their age.
<pre> db.users.aggregate([
    { $match: {$and: [{ gender: "female" }, { age: {$gt: 30}}]}},
    { $group: {
        _id: "$age",
        count: {$sum: 1}
    }
    }
]); </pre>

21. Group all 23+ males with blue eyes working in Germany.
<pre> db.users.aggregate([
    { $match: {$and: [{ gender: "male" }, { age: {$gt: 23}}, {eyeColor:"blue"}, {'company.location.country': "Germany"}]}},
    { $group: {
        _id: "$age",
        count: {$sum: 1}
    }
    }
]); </pre>

22. Group all by tag names i.e. use \$unwind since tags are array.
<pre> db.users.aggregate([
    { $unwind: "$tags" },
    { $group: {
        _id: "$tags",
        count: { $sum: 1 }
    }}
]); </pre>

23. Group all males whose favoriteFruit is `banana` who have registered before 2015.
<pre> db.users.aggregate([
    { $match: {$and: [{gender:"male"}, {favoriteFruit:'banana'}]}},
    { $project: {
        year: {$year: '$registered'}
    }},
    { $out: "male_group"}
]);

db.male_group.aggregate([
    {$match: {year: {$lt: 2015 }}},
    {$group: {
        _id:'$year',
        count: {$sum: 1}
    }}
]); </pre>

24. Group all females by their favoriteFruit.
<pre> db.users.aggregate([
    {$match: { gender:"female" }},
    {
        $group: {
            _id: "$favoriteFruit",
            count: {$sum: 1},
        }
    }
]); </pre>

25. Scan all the document to retrieve all eyeColors(use db.COLLECTION_NAME.distinct);
<pre> db.users.distinct("eyeColor");
 </pre>

26. Find all apple loving blue eyed female working in 'USA'. Sort them by their registration date in descending order.
<pre> db.users.aggregate([
    { $match: { $and: [ { gender: "female" }, { eyeColor: "blue" }, { favoriteFruit: "apple" },{ 'company.location.country': "USA" } ] } },
    {$sort: {registered: -1}},
    {$project: {
        _id: 0,
        gender:1,
        eyeColor:1,
        favoriteFruit:1,
        country: '$company.location.country',
        registered:1
    }}
]); </pre>

27. Find all 18+ inactive men and return only the fields specified below in the below provided format

```js
{
  name: "",
  email: '';
  identity: {
    eye: '',
    phone: '',
    location: ''
  }
}
```
<pre> db.users.aggregate([
    {$match: {$and : [{gender:'male'}, {isActive: false}, {age: {$gt: 18}}]}},
    { $project: {
        _id: 0,
        name: 1,
        email: '$company.email',
        identity: {
            eye: '$eyeColor',
            phone: '$company.phone',
            location: '$company.location.country'
        }
    }}
]); </pre>
