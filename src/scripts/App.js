// import {Todo} from './Model';
var Course = (function () {
    function Course() {
    }
    Object.defineProperty(Course.prototype, "theName", {
        get: function () {
            return theName;
        },
        enumerable: true,
        configurable: true
    });
    return Course;
}());
