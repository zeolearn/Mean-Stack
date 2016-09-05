"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var io = require('socket.io-client');
var DBSocketService = (function () {
    /**
     * Constructor.
     *
     * @class SocketService
     * @constructor
     */
    function DBSocketService() {
        this.url = 'http://localhost:3333';
        this.host = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
        this.socket = io(this.url);
        console.log("SOCKET SERVICE CONNECT WITH: ", this.host);
    }
    /**
     * Get items observable
     *
     * @class SocketService
     * @method get
     * @param name string
     * @return Observable<any>
     */
    DBSocketService.prototype.get = function (name) {
        var _this = this;
        this.name = name;
        var socketUrl = this.host + "/" + this.name;
        console.log("SOCKET URL IS:", socketUrl);
        this.socket = io.connect(socketUrl);
        this.socket.on("connect", function () { return _this.connect(); });
        this.socket.on("disconnect", function () { return _this.disconnect(); });
        this.socket.on("info", function (info) {
            console.log("INFO: \"" + info + "\" (" + socketUrl + ")");
        });
        this.socket.on("error", function (error) {
            console.log("ERROR: \"" + error + "\" (" + socketUrl + ")");
        });
        // Return observable which follows "create" and "remove" signals from socket stream
        return Observable_1.Observable.create(function (observer) {
            _this.socket.on("create", function (item) { return observer.next({ action: "create", item: item }); });
            _this.socket.on("remove", function (item) { return observer.next({ action: "remove", item: item }); });
            return function () { return _this.socket.close(); };
        });
    };
    /**
     * Create signal
     *
     * @class SocketService
     * @method create
     * @param name string
     * @return void
     */
    DBSocketService.prototype.create = function (name) {
        this.socket.emit("create", name);
    };
    /**
     * Remove signal
     *
     * @class SocketService
     * @method remove
     * @param name string
     * @return void
     */
    DBSocketService.prototype.remove = function (name) {
        this.socket.emit("remove", name);
    };
    DBSocketService.prototype.sendMessage = function (message) {
        this.socket.emit('add-message', message);
    };
    DBSocketService.prototype.onSave = function () {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socket = io(_this.url);
            _this.socket.on('save', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    DBSocketService.prototype.onDelete = function () {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socket = io(_this.url);
            _this.socket.on('remove', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    /**
    * Handle connection opening
    *
    * @class SocketService
    * @method connect
    * @return void
    */
    DBSocketService.prototype.connect = function () {
        console.log("Connected to \"" + this.name + "\"");
        // Request initial list when connected
        this.socket.emit("list");
    };
    /**
     * Handle connection closing
     *
     * @class SocketService
     * @method disconnect
     * @return void
     */
    DBSocketService.prototype.disconnect = function () {
        console.log("Disconnected from \"" + this.name + "\"");
    };
    DBSocketService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DBSocketService);
    return DBSocketService;
}());
exports.DBSocketService = DBSocketService;
//# sourceMappingURL=dbsocket.service.js.map