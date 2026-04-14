import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'sites';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.string('id').primary();
            table.string('user_id').references('users.id').onDelete('CASCADE');
            table.string('domain').nullable();
            table.datetime('created_at');
            table.datetime('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1771947024123_create_sites_table.js.map