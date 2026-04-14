var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm';
import User from './user.js';
import { randomUUID } from 'crypto';
export default class Site extends BaseModel {
    static assingUuid(site) {
        site.id = randomUUID();
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], Site.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Site.prototype, "user_id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Site.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Site.prototype, "domain", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Site.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Site.prototype, "updatedAt", void 0);
__decorate([
    hasOne(() => User),
    __metadata("design:type", Object)
], Site.prototype, "user", void 0);
__decorate([
    beforeCreate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Site]),
    __metadata("design:returntype", void 0)
], Site, "assingUuid", null);
//# sourceMappingURL=site.js.map