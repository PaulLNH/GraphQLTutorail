const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(parent, args, context, info) {
    // Encrypt the users password using bcrypt library
    const password = await bcrypt.hash(args.password, 10)
    // Use prisma client instance to store the new user in the database
    const user = await context.prisma.createUser({ ...args, password })
    // Generate a JSON Web Token which is signed with an APP_SECRET.
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    // Return the token and the user in an object that adheres to the shape of AuthPayload object from GraphQL schema
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    // Retreiving the existing user object from the prisma client by email
    const user = await context.prisma.user({ email: args.email })
    if (!user) {
        throw new Error('No such user found')
    }
    // Compares the provided password with the one thats stored in the database
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // Return the token and the user
    return {
        token,
        user,
    }
}

function post(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
    })
}

module.exports = {
    signup,
    login,
    post,
}