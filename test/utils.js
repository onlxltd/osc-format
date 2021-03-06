"use strict";

const assert = require("power-assert");
const utils = require("../src/utils");

describe("utils", () => {
  describe(".size4(num: number): number", () => {
    it("works", () => {
      assert(utils.size4(0) === 0);
      assert(utils.size4(1) === 4);
      assert(utils.size4(2) === 4);
      assert(utils.size4(3) === 4);
      assert(utils.size4(4) === 4);
      assert(utils.size4(5) === 8);
      assert(utils.size4(6) === 8);
      assert(utils.size4(7) === 8);
      assert(utils.size4(8) === 8);
    });
  });
  describe(".isNone(value: any): boolean", () => {
    it("works", () => {
      assert(utils.isNone(-1) === false);
      assert(utils.isNone(10) === false);
      assert(utils.isNone(4294967295) === false);
      assert(utils.isNone(1.5) === false);
      assert(utils.isNone(Infinity) === false);
      assert(utils.isNone(NaN) === false);
      assert(utils.isNone(true) === false);
      assert(utils.isNone(false) === false);
      assert(utils.isNone(null) === true);
      assert(utils.isNone(undefined) === true);
      assert(utils.isNone("0") === false);
      assert(utils.isNone(new Buffer(0)) === false);
      assert(utils.isNone(new Uint8Array(0).buffer) === false);
    });
  });
  describe(".isInteger", () => {
    it("(value: any): boolean", () => {
      assert(utils.isInteger(-1) === true);
      assert(utils.isInteger(10) === true);
      assert(utils.isInteger(4294967295) === true);
      assert(utils.isInteger(1.5) === false);
      assert(utils.isInteger(Infinity) === false);
      assert(utils.isInteger(NaN) === false);
      assert(utils.isInteger(true) === false);
      assert(utils.isInteger(false) === false);
      assert(utils.isInteger(null) === false);
      assert(utils.isInteger(undefined) === false);
      assert(utils.isInteger("0") === false);
      assert(utils.isInteger(new Buffer(0)) === false);
      assert(utils.isInteger(new Uint8Array(0).buffer) === false);
    });
  });
  describe(".isFloat", () => {
    it("(value: any): boolean", () => {
      assert(utils.isFloat(-1) === true);
      assert(utils.isFloat(10) === true);
      assert(utils.isFloat(4294967295) === true);
      assert(utils.isFloat(1.5) === true);
      assert(utils.isFloat(Infinity) === true);
      assert(utils.isFloat(NaN) === false);
      assert(utils.isFloat(true) === false);
      assert(utils.isFloat(false) === false);
      assert(utils.isFloat(null) === false);
      assert(utils.isFloat("0") === false);
      assert(utils.isFloat(undefined) === false);
      assert(utils.isFloat(new Buffer(0)) === false);
      assert(utils.isFloat(new Uint8Array(0).buffer) === false);
    });
  });
  describe(".isDouble", () => {
    it("(value: any): boolean", () => {
      assert(utils.isDouble(-1) === true);
      assert(utils.isDouble(10) === true);
      assert(utils.isDouble(4294967295) === true);
      assert(utils.isDouble(1.5) === true);
      assert(utils.isDouble(Infinity) === true);
      assert(utils.isDouble(NaN) === false);
      assert(utils.isDouble(true) === false);
      assert(utils.isDouble(false) === false);
      assert(utils.isDouble(null) === false);
      assert(utils.isDouble("0") === false);
      assert(utils.isDouble(undefined) === false);
      assert(utils.isDouble(new Buffer(0)) === false);
      assert(utils.isDouble(new Uint8Array(0).buffer) === false);
    });
  });
  describe(".isTimeTag", () => {
    it("(value: any): boolean", () => {
      assert(utils.isTimeTag([ 0, 1 ]) === true);
      assert(utils.isTimeTag([ 0 ]) === false);
      assert(utils.isTimeTag(-1) === false);
      assert(utils.isTimeTag(10) === true);
      assert(utils.isTimeTag(4294967295) === true);
      assert(utils.isTimeTag(1.5) === false);
      assert(utils.isTimeTag(Infinity) === false);
      assert(utils.isTimeTag(NaN) === false);
      assert(utils.isTimeTag(true) === false);
      assert(utils.isTimeTag(false) === false);
      assert(utils.isTimeTag(null) === false);
      assert(utils.isTimeTag("0") === false);
      assert(utils.isTimeTag(undefined) === false);
      assert(utils.isTimeTag(new Buffer(0)) === false);
      assert(utils.isTimeTag(new Uint8Array(0).buffer) === false);
      assert(utils.isTimeTag(new Date()) === true);
    });
  });
  describe(".isString", () => {
    it("(value: any): boolean", () => {
      assert(utils.isString(-1) === false);
      assert(utils.isString(10) === false);
      assert(utils.isString(4294967295) === false);
      assert(utils.isString(1.5) === false);
      assert(utils.isString(Infinity) === false);
      assert(utils.isString(NaN) === false);
      assert(utils.isString(true) === false);
      assert(utils.isString(false) === false);
      assert(utils.isString(null) === false);
      assert(utils.isString("0") === true);
      assert(utils.isString(undefined) === false);
      assert(utils.isString(new Buffer(0)) === false);
      assert(utils.isString(new Uint8Array(0).buffer) === false);
    });
  });
  describe(".isBlob", () => {
    it("(value: any): boolean", () => {
      assert(utils.isBlob(-1) === false);
      assert(utils.isBlob(10) === false);
      assert(utils.isBlob(4294967295) === false);
      assert(utils.isBlob(1.5) === false);
      assert(utils.isBlob(Infinity) === false);
      assert(utils.isBlob(NaN) === false);
      assert(utils.isBlob(true) === false);
      assert(utils.isBlob(false) === false);
      assert(utils.isBlob(null) === false);
      assert(utils.isBlob(undefined) === false);
      assert(utils.isBlob("0") === false);
      assert(utils.isBlob(new Buffer(0)) === true);
      assert(utils.isBlob(new Uint8Array(0).buffer) === true);
    });
  });
  describe(".toString(value: any): string", () => {
    it("works", () => {
      assert(utils.toString(null) === "");
      assert(utils.toString(undefined) === "");
      assert(utils.toString(100) === "100");
      assert(utils.toString("0") === "0");
    });
  });
  describe(".toArray(value: any): any[]", () => {
    it("works", () => {
      assert.deepEqual(utils.toArray(null), []);
      assert.deepEqual(utils.toArray(undefined), []);
      assert.deepEqual(utils.toArray(100), [ 100 ]);
      assert.deepEqual(utils.toArray([ 100, 200, 300 ]), [ 100, 200, 300 ]);
    });
  });
  describe(".toBlob(value: any): Buffer", () => {
    it("works", () => {
      const blob = new Buffer([ 0x62, 0x6c, 0x6f, 0x62 ]);

      assert(utils.toBlob(blob) === blob);
      assert(utils.toBlob([ 0x62, 0x6c, 0x6f, 0x62 ]) instanceof Buffer);
      assert.deepEqual(utils.toBlob([ 0x62, 0x6c, 0x6f, 0x62 ]), blob);
      assert(utils.toBlob("blob") instanceof Buffer);
      assert.deepEqual(utils.toBlob("blob"), blob);
      assert(utils.toBlob(4) instanceof Buffer);
      assert(utils.toBlob(4).length === 4);
      assert(utils.toBlob(null) instanceof Buffer);
    });
  });
  describe(".toTimeTag(value: number[]): number[]", () => {
    it("works", () => {
      assert.deepEqual(utils.toTimeTag([ 2208988800, 0 ]), [ 2208988800, 0 ]);
      assert.deepEqual(utils.toTimeTag([ 2208988800, 2147483648 ]), [ 2208988800, 2147483648 ]);
    });
  });
  describe(".toTimeTag(value: number): number[]", () => {
    it("works", () => {
      assert.deepEqual(utils.toTimeTag(9487534653230285000), [ 2208988800, 0 ]);
      assert.deepEqual(utils.toTimeTag(9487534655377768000), [ 2208988800, 2147483648 ]);
    });
  });
  describe(".toTimeTag(value: Date): number[]", () => {
    assert.deepEqual(utils.toTimeTag(new Date(0)), [ 2208988800, 0 ]);
  });
  describe(".toAddress(value: number|string): number|string", () => {
    it("works", () => {
      assert(utils.toAddress("/foo") === "/foo");
      assert(utils.toAddress(100) === 100);
    });
  });
});
