import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('users', function (table) {
        table.increments('id').primary()
        table.string('email').unique().notNullable()
        table.string('password', 180).notNullable()
        table.string('remember_me_token').nullable()
        table.timestamps(true)
     })
     .createTable('products', function (table) {
        table.increments('id')
        table.string('title').notNullable()
        table.string('price').notNullable()
        table.string('image').notNullable()
        table.text('description')
        table.timestamps(true)
     })
     .createTable('api_tokens', function (table) {
        table.increments('id').primary()
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
        table.string('name').notNullable()
        table.string('type').notNullable()
        table.string('token', 64).notNullable()
  
        /**
         * "useTz: true" utilizes timezone option in PostgreSQL and MSSQL
         */
        table.timestamp('expires_at', { useTz: true }).nullable()
        table.timestamp('created_at', { useTz: true }).notNullable()
     })
     .createTable('carts', function (table) {
        table.increments('id')
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
        table.string('name')
        table.timestamps(true)
     })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable("api_tokens")
    .dropTable("products")
    .dropTable("carts")
    .dropTable("users")
}

