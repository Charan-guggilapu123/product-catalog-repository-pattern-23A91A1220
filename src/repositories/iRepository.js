/**
 * @template T
 * Interface for Repository
 */
class IRepository {
    constructor() {
      if (this.constructor === IRepository) {
        throw new Error("Cannot instantiate abstract class IRepository");
      }
    }
  
    async getById(id) { throw new Error("Method 'getById' must be implemented."); }
    async getAll(options) { throw new Error("Method 'getAll' must be implemented."); }
    async add(item) { throw new Error("Method 'add' must be implemented."); }
    async update(id, item) { throw new Error("Method 'update' must be implemented."); }
    async delete(id) { throw new Error("Method 'delete' must be implemented."); }
  }
  
  module.exports = IRepository;
