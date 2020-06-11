//const { dbAdapter } = require('../config/db');
const { Pool } = require('pg');


class BaseRepository {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.pool = new Pool();
  }

  handleError(err) {
    console.error('DB error \n' + err);
    throw err;
  }


  async getClient() {
    try {
      const client = await this.pool.connect();
      return client;
    } catch  (err) {
      this.handleError(new Error('Invalid data'));
    }
  }

  async getAll() {
    try {
      const query = `SELECT * FROM ${this.collectionName};`;
      const client = await this.getClient();
      const { rows } = await client.query(query);
      client.release();
      return rows;
    } catch (err) {
      this.handleError(new Error('Invalid data'));
    }
      
  }

  async getOne(search) {
    try {
      const query = 'SELECT * ' + 
        `FROM ${this.collectionName} ` +
        `WHERE id = '${search.id}';`;
      const client = await this.getClient();
      const { rows } = await client.query(query);
      client.release();
      return rows[0];
    } catch (err) {
      this.handleError(new Error('Invalid data'));
    }
  }

  async create(data) {
    try {
      const fields = Object.keys(data).join(', ');
      const values = Object.values(data)
        .map(val => typeof val === "string" ? `'${val}'` : val)
        .join(', ');

      const query = `INSERT INTO ${this.collectionName} (${fields}) ` +
        `VALUES (${values}) RETURNING *;`;

      const client = await this.getClient();

      const { rows } = await client.query(query);
      client.release();
      return rows[0];
    } catch (err){
      this.handleError(new Error('Invalid data'));
    }
  }

  async update(id, dataToUpdate) {
    try {
      const rowData = [];
      Object.entries(dataToUpdate).forEach(arr => {
        rowData.push(`${arr[0]} = '${arr[1]}'`);
      });
      rowData.push(`updating_date = CURRENT_TIMESTAMP`);
      const setClause = rowData.join(', ');
      const query = `UPDATE ${this.collectionName} ` +
        `SET ${setClause} ` +
        `WHERE id = ${id} ` +
        'RETURNING * ;';

      const client = await this.getClient();

      const { rows } = await client.query(query);
      client.release();
      return rows[0];
    } catch (err) {
      this.handleError(new Error('Invalid data'));
    }   
  }

  async delete(id) {
    try {    
      const query = `DELETE FROM ${this.collectionName} ` +
      `WHERE id = ${id} ` +
      'RETURNING * ;';

      const client = await this.getClient();
      const { rows } = await client.query(query);
      client.release();

      return rows[0];
    } catch (err) {
      this.handleError(new Error('Invalid data'));
    }
  }
}

exports.BaseRepository = BaseRepository;