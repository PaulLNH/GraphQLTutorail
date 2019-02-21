/**
 * Resolver for postedBy
 *
 * @param {*} parent
 * @param {*} args
 * @param {*} context
 * @returns
 */
function postedBy(parent, args, context) {
    return context.prisma.link({ id: parent.id }).postedBy()
}

module.exports = {
    postedBy,
}