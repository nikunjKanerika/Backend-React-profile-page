import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user_links', (table) => {
        table.increments('id').primary();  
        table.text('platform').notNullable(); 
        table.text('url'); 
        table.integer('user_id').unsigned().notNullable(); 
    
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
        // table.timestamps(true, true);  // Created at and updated at timestamps
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('user_links');
}



