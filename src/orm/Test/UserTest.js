const User = require('./Model/User');

const user_admin = new User({
    userName: 'booding',
    password: 'booding'
})

// create
// user_admin.save().then(() => {
//   console.log("save success")
// })


// read
// User.find({}, (err, docs) => {
//     console.log(docs)
// });

// User.deleteOne({userName: 'booding'}, function (err) {
//     if (err) {
//         console.log(err);
//     };
// });

// update
