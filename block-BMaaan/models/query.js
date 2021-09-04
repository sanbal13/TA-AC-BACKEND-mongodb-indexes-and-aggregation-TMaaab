
db.questions.aggregate([
    { $unwind: tags},
    { $project: {
        _id: 0,
        tags: 1
    }}
]);

db.questions.find().count();

db.answers.find().count();

db.answers.aggregate([
 { $group: {
     _id: questionId,
     count: {$sum: 1}
 }}
]);

db.users.aggregate([
    {$project: {
        _id: 0,
        user:1,
        reputation: 1
    }}
]);

db.questions.aggregate([
    {$unwind: views},
    {$group: {
        _id: views
    }}
]);

db.users.aggregate([
    { $project: {
        date: {$day: '$registered'},
    }
    }
])

db.users.aggregate([     
        {
        $group: {
            _id: display_name,
            count: answerid.length
        }
    }
]);