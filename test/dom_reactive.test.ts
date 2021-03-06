import nn from "../src/index";
import { nnHTMLElement } from "../src/typedefs";
beforeEach(() => {
  document.body.innerHTML = `<!DOCTYPE html>
        <body>
        <div id="app">
        <h1 id="asdf" nn-txt="asdf"></h1>
        <span id="n1n2" nn-txt="n1n2"></span>
        <span id="n1" nn-txt="n1"></span>
        <span id="inputVal" nn-txt="inputVal"></span>
        <input type="text" nn-model="inputVal" id="inputValInput">
        </div>
    </body>`;
});

test("reactive node shows data on initial load", () => {
  new nn({
    el: "#app",
    data: {
      asdf: "fasd",
    },
  });
  expect(document.getElementById("asdf").innerHTML).toBe("fasd");
});

test("reactive node content changes when nn state data prop changed", () => {
  const x = new nn({
    el: "#app",
    data: {
      asdf: "fasd",
    },
  });
  expect(document.getElementById("asdf").innerHTML).toBe("fasd");
  x.state.asdf = "cool";
  expect(document.getElementById("asdf").innerHTML).toBe("cool");
});

test("reactive node with computed property", () => {
  const x = new nn({
    el: "#app",
    data: {
      n1: 1,
      n2: 2,
    },
    computed: {
      n1n2: {
        fn: function() {
          return this.state.n1 + this.state.n2;
        },
        dependencies: ["n1", "n2"],
      },
    },
  });
  expect(x.state.n1n2).toBe(3);
  expect(Number(document.getElementById("n1").innerHTML)).toBe(1);
  expect(Number(document.getElementById("n1n2").innerHTML)).toBe(3);
  x.state.n1 = 10;
  expect(Number(document.getElementById("n1").innerHTML)).toBe(10);
  expect(Number(document.getElementById("n1n2").innerHTML)).toBe(12);
});

test("input/dom basic data binding, js set", () => {
  const x = new nn({
    el: "#app",
    data: {
      inputVal: "cool",
    },
  });
  const inputNode = document.getElementById(
    "inputValInput"
  ) as HTMLInputElement;
  const displayInputNode = document.getElementById("inputVal");
  expect(inputNode.value).toBe("cool");
  expect(displayInputNode.innerHTML).toBe("cool");
  x.state.inputVal = "nice";
  expect(inputNode.value).toBe("nice");
  expect(displayInputNode.innerHTML).toBe("nice");
});
