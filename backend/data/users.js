import bcrypt from 'bcryptjs';
// We do not need _id here. 
// When data is entered into mongodb, it autiomatically creates an _id fields.

const users = [
  {
    name: 'Admin User', // here we are creating users
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    // isAdmin: true   <-- we can get rid of this here, because by default it is false
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];


export default users;


// This users arr above there have to have only the fields we have in the user model (name, email, password, isAdmin).
// Otherwise mongoose won't allow us insert it to the database.

// npm i bcryptjs 