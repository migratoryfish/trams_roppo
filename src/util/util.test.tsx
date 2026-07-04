import { describe, expect, test } from "vitest";
import { kanjiToken2arabiaToken, kanjiNumber2arabiaNumber } from "./util";

describe("sampleTest!", () => {
  test("kanjiToken2arabiaTokenTest", () => {
    expect(kanjiToken2arabiaToken("一")).toBe(1);
    expect(kanjiToken2arabiaToken("二")).toBe(2);
    expect(kanjiToken2arabiaToken("三")).toBe(3);
    expect(kanjiToken2arabiaToken("四")).toBe(4);
    expect(kanjiToken2arabiaToken("五")).toBe(5);
    expect(kanjiToken2arabiaToken("六")).toBe(6);
    expect(kanjiToken2arabiaToken("七")).toBe(7);
    expect(kanjiToken2arabiaToken("八")).toBe(8);
    expect(kanjiToken2arabiaToken("九")).toBe(9);
    expect(kanjiToken2arabiaToken("十")).toBe(10);
    expect(kanjiToken2arabiaToken("百")).toBe(100);
    expect(kanjiToken2arabiaToken("千")).toBe(1000);
    expect(kanjiToken2arabiaToken("壱")).toBe(0);
  });

  test("kanjiNumber2arabiaNumber", () => {
    expect(kanjiNumber2arabiaNumber("一")).toBe(1);
    expect(kanjiNumber2arabiaNumber("十")).toBe(10);
    expect(kanjiNumber2arabiaNumber("十一")).toBe(11);
    expect(kanjiNumber2arabiaNumber("二十")).toBe(20);
    expect(kanjiNumber2arabiaNumber("二十一")).toBe(21);
    expect(kanjiNumber2arabiaNumber("百")).toBe(100);
    expect(kanjiNumber2arabiaNumber("百一")).toBe(101);
    expect(kanjiNumber2arabiaNumber("百十")).toBe(110);
    expect(kanjiNumber2arabiaNumber("百十一")).toBe(111);
    expect(kanjiNumber2arabiaNumber("百二十")).toBe(120);
    expect(kanjiNumber2arabiaNumber("百二十一")).toBe(121);
    expect(kanjiNumber2arabiaNumber("二百")).toBe(200);
    expect(kanjiNumber2arabiaNumber("二百一")).toBe(201);
    expect(kanjiNumber2arabiaNumber("二百十")).toBe(210);
    expect(kanjiNumber2arabiaNumber("二百十一")).toBe(211);
  });

  test("kanjiNumber2arabiaNumber 千の位", () => {
    expect(kanjiNumber2arabiaNumber("千")).toBe(1000);
    expect(kanjiNumber2arabiaNumber("千一")).toBe(1001);
    expect(kanjiNumber2arabiaNumber("千十")).toBe(1010);
    expect(kanjiNumber2arabiaNumber("千五十")).toBe(1050); //民法の末端条文(第千五十条)
    expect(kanjiNumber2arabiaNumber("千四十四")).toBe(1044);
    expect(kanjiNumber2arabiaNumber("千百")).toBe(1100);
    expect(kanjiNumber2arabiaNumber("千百十一")).toBe(1111);
    expect(kanjiNumber2arabiaNumber("千二百三十四")).toBe(1234);
    expect(kanjiNumber2arabiaNumber("二千")).toBe(2000);
    expect(kanjiNumber2arabiaNumber("二千二十五")).toBe(2025);
    expect(kanjiNumber2arabiaNumber("九千九百九十九")).toBe(9999);
  });
});
