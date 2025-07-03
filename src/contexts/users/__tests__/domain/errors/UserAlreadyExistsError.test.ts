import { UserAlreadyExistsError } from "../../../domain/errors/UserAlreadyExits";

describe("UserAlreadyExistsError", () => {
  describe("constructor", () => {
    it("should create error with correct message", () => {
      const error = new UserAlreadyExistsError();

      expect(error.message).toBe("User already exists");
    });

    it("should have correct name", () => {
      const error = new UserAlreadyExistsError();

      expect(error.name).toBe("UserAlreadyExistsError");
    });

    it("should be instance of Error", () => {
      const error = new UserAlreadyExistsError();

      expect(error).toBeInstanceOf(Error);
    });

    it("should be instance of UserAlreadyExistsError", () => {
      const error = new UserAlreadyExistsError();

      expect(error).toBeInstanceOf(UserAlreadyExistsError);
    });
  });

  describe("error properties", () => {
    it("should have stack trace", () => {
      const error = new UserAlreadyExistsError();

      expect(error.stack).toBeDefined();
    });

    it("should be throwable", () => {
      expect(() => {
        throw new UserAlreadyExistsError();
      }).toThrow(UserAlreadyExistsError);
    });

    it("should throw with correct message", () => {
      expect(() => {
        throw new UserAlreadyExistsError();
      }).toThrow("User already exists");
    });
  });
}); 