"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
function Button() {
    return (
    // eslint-disable-next-line no-alert
    <button onClick={function () { return alert("booped"); }} type="button">
      Boop
    </button>);
}
exports.Button = Button;
