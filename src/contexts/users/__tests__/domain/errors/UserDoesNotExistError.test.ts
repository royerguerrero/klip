import { UserDoesNotExistError } from "../../../domain/errors/UserDoesNotExistError";

describe("UserDoesNotExistError", () => {
  describe("constructor", () => {
    it("should create error with correct message", () => {
      const error = new UserDoesNotExistError();

      expect(error.message).toBe("User does not exist");
    });

    it("should have correct name", () => {
      const error = new UserDoesNotExistError();

      expect(error.name).toBe("UserDoesNotExistError");
    });

    it("should be instance of Error", () => {
      const error = new UserDoesNotExistError();

      expect(error).toBeInstanceOf(Error);
    });

    it("should be instance of UserDoesNotExistError", () => {
      const error = new UserDoesNotExistError();

      expect(error).toBeInstanceOf(UserDoesNotExistError);
    });
  });

  describe("error properties", () => {
    it("should have stack trace", () => {
      const error = new UserDoesNotExistError();

      expect(error.stack).toBeDefined();
    });

    it("should be throwable", () => {
      expect(() => {
        throw new UserDoesNotExistError();
      }).toThrow(UserDoesNotExistError);
    });

    it("should throw with correct message", () => {
      expect(() => {
        throw new UserDoesNotExistError();
      }).toThrow("User does not exist");
    });
  });
}); 