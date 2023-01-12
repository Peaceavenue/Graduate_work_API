import superagent from "superagent";
import { URL } from "../fixtures/URL";
import { statusCode, requestHeader } from "../fixtures/statusCode";
import { expectedValues, testsValues } from "../fixtures/expected_values";
import { bodyObj } from "../fixtures/object";

describe("Status code", function () {
  test("status code === 200", async () => {
    const response = await superagent.get(URL.api_posts_1);
    expect(response.status).toBe(statusCode.OK);
  });
});

describe("Status code", () => {
  it("status code === 404", async () => {
    try {
      await superagent.get(URL.api_users_11);
    } catch (error: any) {
      expect(error.status).toBe(statusCode.NotFound);
    }
  });
});

describe("Response contains the correct value", () => {
  test("body.id contains correct value ", async () => {
    const res = await superagent.get(URL.api_posts_1);
    expect(res.body.id).toEqual(expectedValues.getBodyId);
  });
});

describe("Response contains the correct value", () => {
  test("body.name contains correct value", async () => {
    const res = await superagent.get(URL.api_posts_1);
    expect(res.body.title).toMatch(expectedValues.getBodyTitle);
  });
});

describe("Response contains the correct value", () => {
  test("body.name not contains correct value", async () => {
    const res = await superagent.get(URL.api_posts_1);
    expect(res.body.title).not.toMatch(expectedValues.getBodyUncorrectTitle);
  });
});

describe("Сreating a new entry", () => {
  test("successful creation a new entry", async () => {
    let response: any;
    try {
      response = await superagent
        .post(URL.api_posts)
        .set(requestHeader.ContentType, requestHeader.applicationJson)
        .send({
          userId: testsValues.postUserId,
          id: testsValues.postId,
        });
    } catch (error: any) {
      throw new Error(`The system gave an error ${error}`);
    }
    console.log("response => ", response.body);
    expect(response.body.userId).toEqual(testsValues.postUserId);
    expect(response.body.id).toEqual(testsValues.postId);
    expect(response.body.userId).not.toBeUndefined();
    expect(response.body.id).toBeDefined();
  });
});

describe("Сreating a new entry", () => {
  it("unsuccessful creation a new entry", async () => {
    try {
      await superagent.post(URL.api_todos_44444).set(requestHeader.ContentType, requestHeader.applicationJson).send({
        userId: testsValues.postUserId,
        title: testsValues.postTitle,
      });
    } catch (error: any) {
      expect(error.status).toBe(statusCode.NotFound);
      expect(error.body).toEqual(undefined);
    }
  });
});

describe("Entry deletion", () => {
  test("successful entry deletion", async () => {
    const res = await superagent.delete(URL.api_posts_1);
    expect(res.statusCode).toBe(statusCode.OK);
    expect(res.body).toEqual(bodyObj.bodyEmptyObject);
  });
});

describe("Entry change", () => {
  test("successful entry change", async () => {
    const result = await superagent
      .put(URL.api_posts_1)
      .set(requestHeader.ContentType, requestHeader.applicationJson)
      .send({
        id: testsValues.putId,
        title: testsValues.putTitle,
        body: testsValues.putBody,
        userId: testsValues.putUserId,
      });
    expect(result.status).toBe(statusCode.OK);
    expect(result.body.id).toEqual(testsValues.putId);
    expect(result.body.title).toEqual(testsValues.putTitle);
    expect(result.body.body).toEqual(testsValues.putBody);
    expect(result.body.userId).toEqual(testsValues.putUserId);
  });
});

describe("Entry addition", () => {
  test("successful entry addition", async () => {
    const res = await superagent
      .patch(URL.api_posts_1)
      .set(requestHeader.ContentType, requestHeader.applicationJson)
      .send({
        id: testsValues.patchId,
        title: testsValues.patchTitle,
        body: testsValues.patchBody,
        userId: testsValues.patchUserId,
      });
    expect(res.status).toBe(statusCode.OK);
    expect(res.body.id).toEqual(testsValues.patchId);
    expect(res.body.title).toEqual(testsValues.patchTitle);
    expect(res.body.body).toEqual(testsValues.patchBody);
    expect(res.body.userId).toEqual(testsValues.patchUserId);
  });
});
