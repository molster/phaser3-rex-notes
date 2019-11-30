import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import ItemList from '../itemlist/ItemList.js';
import GetRef from '../utils/GetRef.js';
import AddUser from './AddUser.js';

class OnlineUserList {
    constructor(app, config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = app.database();
        this.rootPath = GetValue(config, 'root', '');

        this.setMaxUsers(GetValue(config, 'maxUsers', 0));
        this.userID2ItemID = {};
        this.userList = (new ItemList({
            eventEmitter: this.getEventEmitter(),
            itemIDKey: 'joinAt',
            eventNames: {
                add: 'join',
                remove: 'leave'
            }
        }))
            .on('join', function (user) {
                this.userID2ItemID[user.ID] = user.joinAt;
            }, this)
            .on('leave', function (user) {
                delete this.userID2ItemID[user.ID];
            }, this)
    }

    setMaxUsers(maxUsers) {
        this.maxUsers = maxUsers;
        return this;
    }

    clear() {
        this.userList.clear();
        return this;
    }

    forEach(callback, scope) {
        this.userList.forEach(callback, scope);
        return this;
    }

    isFull() {
        if (this.maxUsers === 0) {
            return false;
        }
        return (this.userList.getItems().length >= this.maxUsers);
    }

    isFirstUser(userID) {
        var user = this.usersList.getItems()[0];
        return (user && (user.ID === userID));
    }

    getUser(userID) {
        if (!this.contains(userID)) {
            return null;
        }
        var itemID = this.userID2ItemID[userID];
        return this.userList.getItemFromItemID(itemID);
    }

    contains(userID) {
        return this.userID2ItemID.hasOwnProperty(userID);
    }

    startUpdate() {
        var query = GetRef(this.database, this.rootPath)
        if (this.maxUsers > 0) {
            query.limitToFirst(this.maxUsers);
        }
        this.userList.startUpdate(query);
        return this;
    }

    stopUpdate() {
        this.userList.stopUpdate();
        return this;
    }
}

var methods = {
    addUser: AddUser
}
Object.assign(
    OnlineUserList.prototype,
    EventEmitterMethods,
    methods
);

export default OnlineUserList;