async function f0(x, void) { "f0" }

async function f1(void, x) { "f1" }

async function f2(void) { "f2" }

expect(f0.length).toBe(2);
expect(f1.length).toBe(2);
expect(f2.length).toBe(1);

class C {
  static async m0(x, void) { "m0" }

  static async m1(void, x) { "m1" }

  static async m2(void) { "m2" }
}

expect(C.m0.length).toBe(2);
expect(C.m1.length).toBe(2);
expect(C.m2.length).toBe(1);
