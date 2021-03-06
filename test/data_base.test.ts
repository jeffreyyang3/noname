import nn from "../src/index";

test("nn data set", () => {
  const x = new nn({
    data: {
      x: "x",
      y: "y",
    },
  });
  expect(x.state.x).toBe("x");
  expect(x.state.y).toBe("y");
});

test("basic nn object set", () => {
  const x = new nn({ data: { x: "y", z: "asdf" } });
  expect(x.state.x).toBe("y");
  x.state.x = "z";
  expect(x.state.x).toBe("z");
  expect("hello").toBe("hello");
});
