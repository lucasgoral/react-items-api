import { strToArray } from "./index";

test("Strinng to array", () => {
    expect(strToArray(",,,,,,one,,")).toStrictEqual(["one"]);
    expect(strToArray(",,  two  ,,,,one,,")).toStrictEqual(["two", "one"]);
    expect(strToArray(",,,,,,,  , , , ,    ,,")).toStrictEqual([]);
    expect(strToArray("")).toStrictEqual([]);
    expect(strToArray("1,2,3,4,5,6,7")).toStrictEqual([
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ]);
});