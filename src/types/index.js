// Product and Cart types are now handled with JSDoc comments for better IDE support

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {number} [originalPrice]
 * @property {string[]} images
 * @property {string} description
 * @property {string} longDescription
 * @property {string} category
 * @property {string} collection
 * @property {string} scent
 * @property {string} burnTime
 * @property {string} size
 * @property {string} weight
 * @property {boolean} inStock
 * @property {boolean} [featured]
 * @property {string[]} ingredients
 * @property {Object} careInstructions
 */

/**
 * @typedef {Product & {quantity: number}} CartItem
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} [phone]
 * @property {Object} [address]
 */

/**
 * @typedef {Object} Collection
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} image
 * @property {string} slug
 */

export {};