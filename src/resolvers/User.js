/**
 * Resolver for links
 *
 * @param {*} parent
 * @param {*} args
 * @param {*} context
 * @returns
 */
function links(parent, args, context) {
    return context.prisma.user({ id: parent.id }).links()
}

MSBlobBuilder.exports = {
    links,
}