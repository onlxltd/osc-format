import assert from "power-assert";
import Reader from "../src/Reader";

describe("Reader", function() {
  describe("constructor", function() {
    it("(buffer: Buffer|ArrayBuffer)", function() {
      let reader = new Reader(new Buffer(16));

      assert(reader instanceof Reader);
    });
  });

  describe("#read", function() {
    it("(length: number): Buffer|ArrayBuffer", function() {
      let reader = new Reader(new Buffer([
        0x00, 0x00, 0x03, 0xe8,
        0xff, 0xff, 0xff, 0xff,
      ]));

      assert.deepEqual(reader.read(5), new Buffer([ 0x00, 0x00, 0x03, 0xe8, 0xff ]));
      assert.deepEqual(reader.read(3), new Buffer([ 0xff, 0xff, 0xff ]));
    });
  });

  describe("#readUInt8", function() {
    it("(): number", function() {
      let reader = new Reader(new Buffer([
        0x00, 0x00, 0x03, 0xe8,
        0xff, 0xff, 0xff, 0xff,
      ]));

      assert(reader.readUInt8() === 0x00);
      assert(reader.readUInt8() === 0x00);
      assert(reader.readUInt8() === 0x03);
      assert(reader.readUInt8() === 0xe8);
      assert(reader.readUInt8() === 0xff);
      assert(reader.readUInt8() === 0xff);
      assert(reader.readUInt8() === 0xff);
      assert(reader.readUInt8() === 0xff);
    });
  });

  describe("#readInt32", function() {
    it("(): number", function() {
      let reader = new Reader(new Buffer([
        0x00, 0x00, 0x03, 0xe8, // int32 1000
        0xff, 0xff, 0xff, 0xff, // int32 -1
      ]));

      assert(reader.readInt32() === 1000);
      assert(reader.readInt32() ===   -1);
    });
  });

  describe("#readUInt32", function() {
    it("(): number", function() {
      let reader = new Reader(new Buffer([
        0x00, 0x00, 0x03, 0xe8, // uint32 1000
        0xff, 0xff, 0xff, 0xff, // uint32 4294967295
      ]));

      assert(reader.readUInt32() === 1000);
      assert(reader.readUInt32() === 4294967295);
    });
  });

  describe("#readInt64", function() {
    it("(): number", function() {
      let reader = new Reader(new Buffer([
        0x00, 0x00, 0x03, 0xe8,
        0xff, 0xff, 0xff, 0xff,
      ]));

      assert(reader.readInt64() === 4299262263295);
    });
  });

  describe("#readFloat32", function() {
    it("(): number", function() {
      let reader = new Reader(new Buffer([
        0x3f, 0x9d, 0xf3, 0xb6, // float32 1.234
        0x40, 0xb5, 0xb2, 0x2d, // float32 5.678
      ]));

      assert(reader.readFloat32() === 1.2339999675750732);
      assert(reader.readFloat32() === 5.6779999732971190);
    });
  });

  describe("#readFloat64", function() {
    it("(): number", function() {
      let reader = new Reader(new Buffer([
        0x3f, 0xf3, 0xc0, 0xca,
        0x2a, 0x5b, 0x1d, 0x5d, // float64 1.2345678
        0x40, 0x22, 0x06, 0x52,
        0x29, 0x98, 0x7f, 0xbe, // float64 9.0123456
      ]));

      assert(reader.readFloat64() === 1.2345678);
      assert(reader.readFloat64() === 9.0123456);
    });
  });

  describe("#readString", function() {
    it("(): string", function() {
      let reader = new Reader(new Buffer([
        0x2f, 0x66, 0x6f, 0x6f, // "/foo"
        0x00, 0x00, 0x00, 0x00,
        0x2c, 0x69, 0x69, 0x73, // ",iisff"
        0x66, 0x66, 0x00, 0x00,
      ]));

      assert(reader.readString() === "/foo");
      assert(reader.readString() === ",iisff");
    });
  });

  describe("#readBlob", function() {
    it("(): Buffer|ArrayBuffer", function() {
      let reader = new Reader(new Buffer([
        0x00, 0x00, 0x00, 0x06, // size = 6
        0x01, 0x02, 0x03, 0x04, // Buffer([ 0x01, 0x02, 0x03, 0x04, 0x05, 0x06 ])
        0x05, 0x06, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x04, // size = 4
        0x07, 0x08, 0x09, 0x00, // Buffer([ 0x07, 0x08, 0x09, 0x00 ])
      ]));

      assert.deepEqual(reader.readBlob(), new Buffer([ 0x01, 0x02, 0x03, 0x04, 0x05, 0x06 ]));
      assert.deepEqual(reader.readBlob(), new Buffer([ 0x07, 0x08, 0x09, 0x00 ]));
    });
  });

  describe("#hasNext", function() {
    it("(): boolean", function() {
      let reader = new Reader(new Buffer(8));

      assert(reader.hasNext() === true);

      reader.readInt32();
      assert(reader.hasNext() === true);

      reader.readInt32();
      assert(reader.hasNext() === false);
    });
  });
});
