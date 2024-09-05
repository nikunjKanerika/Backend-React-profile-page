import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();  // Primary key: auto-incremented
        table.text('firstName').notNullable();  // First name: non-nullable
        table.text('lastName').notNullable();   // Last name: non-nullable
        table.text('password').notNullable(); // Last name: non-nullable
        table.text('email').notNullable().unique();  // Email: non-nullable and unique
        table.text('profile_url');  // Profile URL: optional
        // table.timestamps(true, true);  // Created at and updated at timestamps
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}



